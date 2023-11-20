import User from '../models/user.js';
import Event from '../models/event.js';
import Data from '../models/data.js';
import { createOne, createMultiple } from '../util/bookings.js';
import { ApolloError } from 'apollo-server-express';
import { processRefund } from '../util/refund.js';
import Session from '../models/session.js';
import { redisClient } from '../redis.js';
import Stripe from 'stripe';
import { sendEmail } from '../util/email.js';
import { validateToken } from '../middleware.js';

const stripe = new Stripe(process.env.STRIPE_KEY);

const bookingsAll = async (_root, { page }, context) => {
  const number = 4;
  const { auth } = context;
  const token = context.req.headers.authorization;
  validateToken(token);
  //View all bookings on admin page
  const num = page;
  const results = await Data.find().limit(num);
  const results2 = await Data.find().limit(num + number);

  const eventTotals = await Data.aggregate([{ $group: { _id: '$eventId', count: { $sum: 1 } } }]);

  return Promise.all(
    results.map(async (item) => {
      const e = await Event.findById(item.eventId);
      const u = await User.findById(item.userId);
      item.user = u;
      item.event = e;
      // if (!eventTotals.some((obj) => obj.hasOwnProperty(e._id))) {
      //   console.log('doesnt exist');
      //   eventTotals.push({ [e._id]: 1 });
      // } else {
      //   console.log('exists');
      //   eventTotals.forEach((obj) => {
      //     if (obj.hasOwnProperty(e._id)) {
      //       obj[e._id] += 1;
      //     }
      //   });
      // }
    })
  ).then(() => {
    const bool = results2.length > results.length;
    return { eventTotals: eventTotals, results: results, count: num, hasMore: bool };
  });
};
const bookingsNoPagination = async () => {
  const results = await Data.find();

  return Promise.all(
    results.map(async (item) => {
      const e = await Event.findById(item.eventId);
      item.event = e;
    })
  ).then(() => {
    return results;
  });
};

const createBooking = async (_root, { input }, context) => {
  const { auth } = context;
  const token = context.req.headers.authorization;
  validateToken(token);
  let { title, eventId, count, session } = input;
  //Check session doesnt already exist
  const s = await Session.findOne({ session: session });

  if (s) {
    throw new ApolloError('Session booking already exists', 'SESSION_BOOKING_ALREADY_EXISTS', {
      statusCode: 403,
    });
  }
  Session.create({ session: session });
  const paymentCheck = await stripe.checkout.sessions.retrieve(session);
  console.log(paymentCheck);
  const pi = paymentCheck.payment_intent;
  if (paymentCheck.payment_status !== 'paid') {
    throw new ApolloError('Payment error', 'PAYMENT_ERROR', {
      statusCode: 404,
    });
  }

  const userId = auth;
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApolloError('Event does not exist', 'EVENT_NOT_FOUND', {
      statusCode: 404,
    });
  }

  const max = event.tickets ? event.tickets : 50;
  if (event.bookings.length + count <= max) {
    if (count === 1) {
      return createOne({ session, title, pi, userId, eventId, event, paymentCheck });
    } else {
      return createMultiple({ input, userId, count, event, pi, paymentCheck });
    }
  } else {
    throw new ApolloError('Booking limit exceeded', 'BOOKING_LIMIT_EXCEEDED', {
      statusCode: 400,
    });
  }
};
const bookingsDelete = async (_root, { input }, context) => {
  const { auth } = context;
  const token = context.req.headers.authorization;
  validateToken(token);
  let event;
  let pi;
  let si;
  let multipleBooking;
  let allSame;

  for (const [i, inp] of input.entries()) {
    const data = await Data.findById(inp._id);
    if (!data) {
      throw new ApolloError('Booking not found.', 'DATA_NOT_FOUND', {
        statusCode: 404,
      });
    }
    if (i === 0) {
      pi = data.pi;
      si = data.session;
      multipleBooking = data.multipleBooking;
      allSame = data.eventId;
    }

    event = await Event.findById(data.eventId);
    if (!event) {
      throw new ApolloError('Event not found.', 'EVENT_NOT_FOUND', {
        statusCode: 404,
      });
    }
    if (allSame && allSame !== event.id) {
      throw new ApolloError('Bookings must be from the same event.', 'BOOKINGS_NOT_SAME_EVENT', {
        statusCode: 400,
      });
    }
    allSame = event.id;
  }
  try {
    await processRefund({ input, pi, si, multipleBooking });
  } catch (e) {
    throw new ApolloError('Refund failed.', 'REFUND_FAILED', {
      statusCode: 500,
    });
  }
  const d = await Data.deleteMany({ _id: { $in: input } });
  if (!d) {
    throw new ApolloError('Failed to delete data.', 'DATA_DELETION_ERROR', {
      statusCode: 500,
    });
  }

  const user = await User.findById(auth);
  if (!user) {
    throw new ApolloError('User not found.', 'USER_NOT_FOUND', {
      statusCode: 401,
    });
  }

  // Event bookings - remove the booking IDs
  user.data = user.data.filter((item) => {
    return !input.find((inputI) => inputI._id === item);
  });
  await user.save();

  event.bookings = event.bookings.filter((item) => {
    return !input.find((inputI) => inputI._id === item);
  });
  await event.save();

  return d;
};

//Deprecated - use bookingsDelete
const deleteOne = async (_root, { input }, { auth }) => {
  const { id } = input;
  const d = await Data.deleteOne({ _id: id });
  const user = await User.findById(auth);
  //Event bookings - remove the bookings id NOT DELETING THE EVENT FROM EVENT BOOKINGS
  user.data = user.data.filter((item) => item !== id);
  user.save();
  return user;
};
export default { deleteOne, bookingsDelete, createBooking, bookingsAll, bookingsNoPagination };
