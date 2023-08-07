import { useEffect, useState } from 'react';
import { GetBookings } from '../../hooks/getBookings';

import Event from '../dashboard/event';
import { Booking } from './types';
import { EventType } from '../dashboard/types';

const Bookings = ({ token }: { token?: string }) => {
  const { data, error, isLoading, refetch } = GetBookings({ token });
  const [rerender, setRerender] = useState<number>(0);

  useEffect(() => {
    refetch();
  }, [rerender]);
  return (
    <div className='py-20'>
      <div className='grid grid-cols-12 gap-8 overflow-hidden u-wrapper'>
        {data &&
          !error &&
          !isLoading &&
          data
            .sort(function (a: Booking, b: Booking) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            })
            .map((item: EventType) => {
              const date = new Date(item.time).toLocaleDateString();

              return <Event refetch={refetch} token={token} bookings={true} key={item._id} item={item} setRerender={setRerender} />;
            })}
      </div>
    </div>
  );
};

export default Bookings;
