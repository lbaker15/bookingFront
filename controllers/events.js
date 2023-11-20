import User from '../models/user.js';
import Event from '../models/event.js';
import Data from '../models/data.js';
import { createUploadStream } from '../util/stream.js';
import { uploadFunc } from '../util/upload.js';
import { ApolloError } from 'apollo-server-express';
import { validateToken } from '../middleware.js';

const eventsFuture = async (_root, { input }) => {
  const { timestamp, num } = input;
  const results = await Event.find({ time: { $gte: timestamp } }).limit(num);
  const results2 = await Event.find({ time: { $gte: timestamp } }).limit(num + 2);
  const bool = results2.length > results.length;
  const data = await uploadFunc(results);
  if (!data) {
    throw new ApolloError('Error retrieving images from bucket', 'IMAGE_RETRIEVAL_ERROR', {
      statusCode: 500,
    });
  }
  return { ...data, hasMore: bool, count: num };
};

const eventsUser = async (_root, {}, context) => {
  const { auth } = context;
  const token = context.req.headers.authorization;
  validateToken(token);

  //Queries all users bookings on profile
  const user = await User.findById(auth);
  const arr = [];
  return Promise.all(
    user.data.map(async (item) => {
      const d = await Data.findById(item);
      if (!d || !d.eventId) {
        throw new ApolloError('Error retrieving data', 'DATA_RETRIEVAL_ERROR', {
          statusCode: 500,
        });
      }
      const e = await Event.findById(d.eventId);
      if (!e) {
        throw new ApolloError('Error retrieving event', 'EVENT_RETRIEVAL_ERROR', {
          statusCode: 500,
        });
      }
      const event = { ...e._doc, userBookingId: item };
      delete event.bookings;
      arr.push(event);
    })
  )
    .then(() => {
      return arr;
    })
    .catch((err) => {
      throw new ApolloError(err);
    });
};

const createEvent = async (_root, { input }, { auth }) => {
  const { file } = input;

  const saveEvent = async (result) => {
    const { name, userId, time, lat, lng, address, description, tickets, category, price } = input;
    const user = await User.findById(auth);

    if (user.admin) {
      const bookings = [];
      const obj = result
        ? { name, bookings, userId, time, lat, lng, address, description, category, tickets, image: result?.key, price }
        : { name, bookings, userId, time, lat, lng, address, description, category, tickets, price };
      const d = new Event(obj);

      d.save();

      const arr = user.events.concat(d.id);
      user.events = arr;

      await user.save();
      return d;
    } else {
      throw new ApolloError('User is not an admin', 'USER_NOT_ADMIN', {
        statusCode: 403,
      });
    }
  };

  if (file) {
    const { filename, createReadStream } = await file;
    const stream = createReadStream();
    let result;

    try {
      const uploadStream = createUploadStream(filename);
      stream.pipe(uploadStream.writeStream);
      result = await uploadStream.promise;

      if (result) {
        return saveEvent(result);
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  } else {
    return saveEvent();
  }
};

export default { createEvent, eventsFuture, eventsUser };
