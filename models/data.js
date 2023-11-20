import { mongoose } from 'mongoose';

const DataSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  userId: {
    type: String,
  },
  eventId: {
    type: String,
  },
  pi: {
    type: String,
  },
  session: {
    type: String,
  },
  multipleBooking: {
    type: Boolean,
  },
});

const Data = mongoose.model('Data', DataSchema);

export default Data;
