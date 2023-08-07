import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  useEffect(() => {
    document.cookie = 'httpCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'httpAdmin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'httpEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }, []);
  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      <div className='py-12 text-center u-wrapper'>
        <h1 className='text-4xl uppercase'>We are sad to see you go</h1>
        <div className='flex justify-center gap-8 py-8'>
          <Link className='u-button--outline w-fit' to='/login'>
            Log me back in
          </Link>
          <Link className='u-button--outline w-fit' to='/dashboard'>
            Browse events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logout;
