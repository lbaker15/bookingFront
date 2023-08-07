import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch, DispatchContext } from '../../store/store';

const MenuItem = ({ string, url, aside }: { string: string; url: string; aside?: boolean }) => {
  const dispatch: AppDispatch | null = useContext(DispatchContext);
  return (
    <li className='block mr-4 overflow-hidden h-fit before:content-[""] before:w-full before:absolute before:bottom-0 before:left-0 before:h-[1px] dark:before:bg-white-100 before:bg-pink relative before:scale-x-0 hover:before:scale-x-100 before:origin-left before:transition-all before:duration-500'>
      <Link
        onClick={() => {
          if (dispatch) {
            dispatch({ type: 'menu', payload: false });
          }
        }}
        className={`block ${aside ? 'text-4xl' : 'text-sm'} uppercase dark:text-white-100 text-pink lg:text-md`}
        to={url}>
        {string}
      </Link>
    </li>
  );
};

export default MenuItem;
