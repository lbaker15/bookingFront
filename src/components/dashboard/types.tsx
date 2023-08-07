import { RefetchOptions } from 'react-query';
import { Dispatch, SetStateAction } from 'react';
import { AppDispatch } from '../../store/store';
export type DashboardProps = {
  token?: string | null;
};
export type EventProps = {
  token?: string | null;
  bookings?: boolean;
  rerender?: boolean;
  setRerender?: Dispatch<SetStateAction<number>>;
  item: any;
  refetch?: (options?: RefetchOptions) => Promise<any>;
};
export type Event = {
  _id: string;
  name: string;
  time: number;
  lat?: number;
  lng?: number;
  address?: string;
  category: [string];
  description?: string;
  tickets: number;
  image?: string;
  imgUrl?: string;
  price: string;
};
export type EventType = {
  _id: string;
  name: string;
  time: number;
  lat?: number;
  lng?: number;
  address?: string;
  category: [string];
  description?: string;
  tickets: number;
  image?: string;
  imgUrl?: string;
  price: string;
};

export type EventListProps = {
  data: [Event];
  hasMore?: boolean;
  dispatch: AppDispatch;
  sortBy?: string | boolean | undefined | null;
  filterBy?: string | boolean | undefined | null;
};

export type ModalProps = {
  modal: boolean;
  handleModal: (value: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: number;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  item: Event;
};
