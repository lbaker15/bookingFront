import { mongoose } from 'mongoose';

const SessionSchema = new mongoose.Schema({
  session: {
    type: String,
  },
});

const Session = mongoose.model('Session', SessionSchema);

export default Session;
