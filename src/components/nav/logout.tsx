import React, { SetStateAction, useContext } from 'react';
import { AppDispatch, DispatchContext } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }: { setAuth: React.Dispatch<SetStateAction<string>> }) => {
  const dispatch: AppDispatch | null = useContext(DispatchContext);
  const navigate = useNavigate();

  return (
    <li className='block mr-4 overflow-hidden h-fit before:content-[""] before:w-full before:absolute before:bottom-0 before:left-0 before:h-[1px] dark:before:bg-white-100 before:bg-pink relative before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-all before:duration-500'>
      <button
        onClick={() => {
          console.log('here here');
          document.cookie = 'httpCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'httpAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'httpEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          setAuth('');
          if (dispatch) {
            dispatch({ type: 'auth', payload: '' });
          }
          navigate('/logout');
        }}
        className={`block text-sm uppercase dark:text-white-100 text-pink lg:text-md`}>
        Logout
      </button>
    </li>
  );
};
export default Logout;
