import { mongoose } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  admin: {
    type: String,
  },
  data: {
    type: Array,
  },
  events: {
    type: Array,
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
