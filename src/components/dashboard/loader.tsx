import React from 'react';

const Loader = ({ fixed, disableHeight }: { fixed?: boolean; disableHeight?: boolean }) => {
  if (fixed) {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-[9999] bg-blackR-100'>
        <span className='loader w-[48px] h-[48px] inline-block relative before:w-[48px] before:h-[48px] before:border-[2px] before:border-white-100 before:absolute before:top-0  before:rounded-full before:left-0  after:w-[48px] after:h-[48px] after:border-[2px] after:border-white-100 after:opacity-0 after:absolute after:top-0  after:rounded-full after:left-0 before:content-[""] after:content-[""] '></span>
      </div>
    );
  }

  return (
    <div
      className={
        disableHeight
          ? 'relative z-[9999] flex items-center justify-center w-full h-fit my-12'
          : 'relative z-[9999] flex items-center justify-center w-full h-screen '
      }>
      <span className='loader w-[48px] h-[48px] inline-block relative before:w-[48px] before:h-[48px] before:border-[2px] before:border-white-100 before:absolute before:top-0  before:rounded-full before:left-0  after:w-[48px] after:h-[48px] after:border-[2px] after:border-white-100 after:opacity-0 after:absolute after:top-0  after:rounded-full after:left-0 before:content-[""] after:content-[""] '></span>
    </div>
  );
};

export default Loader;
