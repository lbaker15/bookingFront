import { QueryObserverResult } from 'react-query';
import { Event } from '../dashboard/types';

export interface Booking {
  address: string;
  count: number;
  description: string;
  imgUrl?: string;
  lat: number;
  lng: number;
  name: string;
  userBookingId: string;
  userBookingIds: string[];
  _id: string;
}
type Data = {};
type Error = {};
export type RefetchFunction = () => Promise<QueryObserverResult<Data, Error>>;

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  admin: string;
  data: [Booking];
  events: [Event];
};
