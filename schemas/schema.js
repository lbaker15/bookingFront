import { gql } from 'graphql-tag';
import fs from 'fs';

const userSchema = fs.readFileSync('./schemas/user.graphql', 'utf-8');
const eventSchema = fs.readFileSync('./schemas/event.graphql', 'utf-8');
const dataSchema = fs.readFileSync('./schemas/data.graphql', 'utf-8');
const miscSchema = fs.readFileSync('./schemas/misc.graphql', 'utf-8');

export const typeDefs = gql`
  ${userSchema}
  ${eventSchema}
  ${dataSchema}
  ${miscSchema}
  type Query {
    users: [User]
    user: User
    bookingsPage(page: Int): DataPagination
    events: [Event]
    data: [DataEdit]
    userEvent: [EventUser]
    eventsFuture(input: EventFutureInput!): FutureEvents
  }

  type Mutation {
    createUser(input: CreateUser!): User
    deleteData(input: DeleteData!): Data
    deleteDataMultiple(input: [DeleteDataMultiple]!): DataDeleted
    createData(input: CreateData!): [Data]
    createEvent(input: CreateEvent!): Event
    updateUser(input: EditUser!): User
    fileUpload(file: Upload!): FileUploadResponse!
    changePassword(input: ChangePassword!): User
  }
`;
