const userCreate = async (_root, { input }) => {
  const { name, email, password, admin } = input;
  const data = [];
  const events = [];
  const users = await User.find({ email: email });
  if (users.length === 0) {
    const user = new User({ name, email, password, data, admin, events });
    try {
      await user.save();
      return user;
    } catch (err) {
      return err;
    }
  } else {
    return { error: 'User already exists' };
  }
};
export default { userCreate };
