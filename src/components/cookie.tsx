import { useContext, useEffect, useState } from 'react';
import { getCookie } from '../helpers/main';
import { useNavigate } from 'react-router-dom';
import { Context, DispatchContext } from '../store/store';

const Cookie = ({ children }: any) => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useState(false);
  const dispatch: any = useContext(DispatchContext);

  useEffect(() => {
    if (!cookie) {
      const cookieCheck = getCookie('httpCookie');
      if (!cookieCheck) {
        navigate('/login');
      } else {
        setCookie(true);
        dispatch({ type: 'token', payload: cookieCheck });
      }
    }
  }, []);
  const { state }: any = useContext(Context);

  return (
    <>
      <Child children={children} token={state.token} />
    </>
  );
};
const Child = ({ children, token }: any) => {
  if (token) {
    return <>{token && { ...children }}</>;
  } else {
    return <></>;
  }
};
export default Cookie;
