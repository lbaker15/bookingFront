import { ApolloError } from 'apollo-server-express';
import User from '../models/user.js';

const upload = async (parent, { file }) => {
  const { filename, createReadStream } = await file;
  const stream = createReadStream();
  let result;
  try {
    const uploadStream = createUploadStream(filename);
    stream.pipe(uploadStream.writeStream);
    result = await uploadStream.promise;
    return result;
  } catch (error) {
    return null;
  }
};

const changePassword = async (parent, { input }, { auth }) => {
  const { id, password, newPassword } = input;
  const user = await User.findById(auth);
  if (!user || user.password !== password) {
    throw new ApolloError('User not found', 'USER_NOT_FOUND', {
      statusCode: 404,
    });
  } else {
    user.password = newPassword;
    await user.save();
    return user;
  }
};

export default { upload, changePassword };
