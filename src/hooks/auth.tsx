import { useQuery } from 'react-query';
import { useMemo, useContext, useEffect } from 'react';
import axios from 'axios';
import { Context, DispatchContext } from '../store/store';

const query = async (args: any) => {
  try {
    const url = 'http://localhost:4000/signin';
    const config = {
      body: JSON.stringify(args),
    };
    const { data } = await axios.post(url, config);
    return data;
  } catch (err: any) {
    if (err.response) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

export const Auth = (args: any) => {
  // const dispatch: any = useContext(DispatchContext);
  // const { state }: any = useContext(Context);

  const { data, error, status, isLoading, refetch }: any = useQuery('siginquery', async () => {
    const data = query(args);
    return data;
  });

  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: 'auth',
  //       payload: true,
  //     });
  //   }
  // }, [data]);
  return {
    isSignedIn: data,
    error,
    signIn: refetch,
    isLoading,
  };
};
