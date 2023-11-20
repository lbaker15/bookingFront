import { readFile } from 'fs/promises';
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload';
import User from './models/user.js';
import Data from './models/data.js';
import Event from './models/event.js';
import events from './controllers/events.js';
import bookings from './controllers/bookings.js';
import users from './controllers/users.js';
import general from './controllers/general.js';

const resolvers = {
  Query: {
    data: bookings.bookingsNoPagination,
    bookingsPage: bookings.bookingsAll,
    users: async () => {
      const result = await User.find();
      return result;
    },
    user: (_root, { id }) => {
      return User.findById(id);
    },
    events: async () => {
      const result = await Event.find();
      return result;
    },
    eventsFuture: events.eventsFuture,
    userEvent: events.eventsUser,
  },

  Mutation: {
    fileUpload: general.upload,
    createUser: users.userCreate,
    createData: bookings.createBooking,
    createEvent: events.createEvent,
    deleteData: bookings.deleteOne,
    deleteDataMultiple: bookings.bookingsDelete,
    changePassword: general.changePassword,
  },
  Upload: GraphQLUpload,
  User: {
    data: async (user) => {
      const d = await Data.find({ userId: user.id });
      let data = d ? d : [];
      return data;
    },
  },
  Event: {
    bookings: async (event) => {
      const d = await Data.find({ eventId: event.id });
      let data = d ? d : [];
      return data;
    },
    userId: async (event) => {
      return User.findById(event.userId);
    },
  },
};

export { resolvers };
