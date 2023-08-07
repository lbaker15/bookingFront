import React, { useContext, createRef, useEffect, useRef, useTransition, useLayoutEffect, useCallback } from 'react';
import { AppDispatch, Context, DispatchContext } from '../../store/store';

const DarkMode = ({ darkMode }: { darkMode: boolean | undefined }) => {
  const dispatch: AppDispatch | null = useContext(DispatchContext);

  const darkModeFunc = useCallback((e: any) => {
    if (e.target.dataset.value === 'dark') {
      if (dispatch) {
        dispatch({ type: 'darkMode', payload: false });
      }
    } else {
      if (dispatch) {
        dispatch({ type: 'darkMode', payload: true });
      }
    }
  }, []);
  return (
    <>
      <button className='relative flex items-center gap-2 w-fit h-fit' data-value={darkMode ? 'dark' : 'light'} onClick={darkModeFunc}>
        {darkMode ? (
          <>
            <span className='border pointer-events-none bg-white-100 border-white-100 w-[20px] h-[20px] block rounded-full'></span>
            <span className='uppercase pointer-events-none whitespace-wrap text-[12px] '>Light mode</span>
          </>
        ) : (
          <>
            <span className='border pointer-events-none bg-blackR-100 border-white-100 w-[20px] h-[20px] block rounded-full'></span>
            <span className='uppercase pointer-events-none whitespace-wrap text-[12px] '>Dark mode</span>
          </>
        )}
      </button>
    </>
  );
};
export default DarkMode;
