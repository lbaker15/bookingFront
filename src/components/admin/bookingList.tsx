import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getCookie } from '../../helpers/main';
import InfiniteScroll from 'react-infinite-scroller'; //
import { GetBookingsUser } from '../../hooks/getAllBookings';
import { GetBookingsPage } from '../../hooks/getBookingsPage';
import { Context, DispatchContext } from '../../store/store';
import Loader from '../dashboard/loader';

type Props = {};
const Scroll = React.memo(({ data2, hasMore, dispatch, eventTotals }: any) => {
  const loading = () => {
    dispatch({ type: 'scroll' });
  };

  return (
    <div>
      <InfiniteScroll
        className='grid gap-4 md:grid-cols-2'
        loader={
          <div key={'iloader'} className='md:col-span-2'>
            <Loader disableHeight={true} fixed={false} />
          </div>
        }
        loadMore={loading}
        hasMore={hasMore}>
        {data2 &&
          data2.map((item: any, i: number) => {
            const total =
              eventTotals.length && eventTotals.filter((t: any) => t._id === item.event._id).length
                ? eventTotals.filter((t: any) => t._id === item.event._id)[0].count
                : '';

            return (
              <div className='p-4 pb-4 mb-6 border-b rounded-sm border-pink bg-white-20' key={'eventl' + i}>
                <div>
                  <span className='font-semibold'>Ticket ID:</span> <span>{item._id}</span>
                </div>
                <div>
                  <span className='font-semibold'>EVENT:</span> <span>{item.event.name}</span>
                </div>
                <div>
                  <span className='font-semibold'>EVENT CURRENT BOOKINGS:</span> <span>{String(total)}</span>
                </div>
                <div>
                  <span className='font-semibold'>EVENT MAX TICKETS:</span> <span>{item.event.tickets}</span>
                </div>
                <div>
                  <span className='font-semibold'>USER EMAIL:</span> <span>{item.user && item.user.email}</span>
                </div>
                <div>
                  <span className='font-semibold'>PI:</span> <span>{item.pi}</span>
                </div>
              </div>
            );
          })}
      </InfiniteScroll>
    </div>
  );
});

const BookingList = ({}: any) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useContext(DispatchContext);
  const token = getCookie('httpCookie');
  const st: any = useContext(Context);
  const { scrollData } = st.state;
  const { isLoading, data, refetch }:any = GetBookingsPage({ token, dispatch });
  useEffect(() => {
    if (data && data.bookingsPage) {
      setLoaded(true);
    }
  }, [data]);

  return (
    <div>{loaded ? <Scroll dispatch={dispatch} hasMore={scrollData.hasMore} data2={scrollData.data} eventTotals={scrollData.eventTotals} /> : <Loader />}</div>
  );
};
export default BookingList;
