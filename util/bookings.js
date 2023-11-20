import User from '../models/user.js';
import Data from '../models/data.js';
import { sendEmail } from './email.js';

export const createOne = async ({ title, pi, userId, eventId, event, session, paymentCheck }) => {
  const d = new Data({ title, pi, userId: String(userId), eventId, multipleBooking: false, session });
  if (!d) {
    throw new Error('Failed to create booking');
  }
  await d.save();
  Data;
  const dataId = d.id;
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }
  user.data = [...user.data, dataId];
  await user.save();

  if (!event) {
    throw new Error('Event not found');
  }
  event.bookings = event.bookings.concat(dataId);
  await event.save();
  sendEmail(paymentCheck);
  return [d];
};
export const createMultiple = async ({ userId, count, input, event, pi, paymentCheck }) => {
  const arr = [];
  const ids = [];
  input.multipleBooking = true;
  input.pi = pi;

  [...Array(count)].map(() => {
    arr.push(input);
  });
  const d = await Data.create(arr);
  d.map((id) => {
    ids.push(id.id);
  });

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.data = [...user.data, ...ids];
  await user.save();

  event.bookings = [...event.bookings, ...ids];
  await event.save();
  sendEmail(paymentCheck);
  return d;
};
