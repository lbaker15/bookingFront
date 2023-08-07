import { useContext, useEffect, useState } from 'react';
import { getCookie } from '../../helpers/main';
import Topbar from '../shared/topbar';
import Motion from '../../wrappers/motion';
import BookingList from './bookingList';
import AddEvent from './addEvent';
import { Context } from '../../store/store';

const Admin = () => {
  const admin = getCookie('httpAdmin');
  const token = getCookie('httpCookie');
  const [display, setDisplay] = useState('event');
  const state = useContext(Context);
  if (state.state.auth === 'admin' && token) {
    return (
      <Motion>
        <Topbar
          links={[
            {
              name: 'Add Event',
              callback: () => {
                setDisplay('event');
              },
            },
            {
              name: 'View Bookings',
              callback: () => {
                setDisplay('bookings');
              },
            },
          ]}
          filterUI={false}
          centralText={false}
          title={'Admin Panel'}
        />
        <div className='pb-20 u-wrapper'>
          {display === 'event' && <AddEvent />}
          {display === 'bookings' && <BookingList />}
        </div>
      </Motion>
    );
  } else {
    return <>Not authorized to view this page</>;
  }
};
export default Admin;
