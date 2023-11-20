import { mongoose } from 'mongoose';

export const EventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  bookings: {
    type: Array,
  },
  tickets: {
    type: Number,
  },
  time: {
    type: Number,
  },
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
  },
  category: {
    type: Array,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
  },
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
