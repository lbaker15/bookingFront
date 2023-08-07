const Arrow = () => {
  return (
    <svg
      viewBox='0 0 56 56'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMidYMid'
      className='w-10 h-10 transition-all duration-300 md:w-14 md:h-14 2xl:w-21 2xl:h-21 group-hover:fill-pink'>
      <circle className='transition-all duration-300 group-hover:stroke-purple' cx='28' cy='28' r='27' stroke='currentColor'></circle>
      <path
        className='transition-all duration-300 group-hover:stroke-purple'
        d='M18 28L37.5 28'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'></path>
      <path
        className='transition-all duration-300 group-hover:stroke-purple'
        d='M31 21L38 28L31 35'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'></path>
    </svg>
  );
};
export default Arrow;
