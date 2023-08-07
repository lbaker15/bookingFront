import React from 'react';
import record from '../../images/record.png';

const Parallax = React.forwardRef(({ width, src, classes }: any, ref: any) => {
  return <img alt='parallax effect of a record' width={width} src={src} ref={ref} className={classes} />;
});

const ParallaxImages = ({ parallaxes }: any) => {
  return (
    <>
      <Parallax
        width={120}
        src={record}
        classes={'mt-6 opacity-60 absolute bottom-0 left-0 sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[0] = el)}
      />
      <Parallax
        width={90}
        src={record}
        classes={'mt-6 opacity-60 absolute blur-sm bottom-[30%] left-[2%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[1] = el)}
      />
      <Parallax
        width={120}
        src={record}
        classes={'mt-6 opacity-60 absolute top-[30%] sm:top-[8%] -left-[5%] sm:left-[8%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[2] = el)}
      />
      <Parallax
        width={100}
        src={record}
        classes={'mt-6 opacity-60 blur-sm absolute top-[20%] sm:top-[28%] left-[32%] sm:left-[22%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[3] = el)}
      />
      <Parallax
        width={120}
        src={record}
        classes={'mt-6 opacity-60 absolute blur-sm -bottom-[5%] left-[60%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[4] = el)}
      />
      <Parallax
        width={80}
        src={record}
        classes={'mt-6 opacity-60 absolute bottom-[28%] left-[20%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[5] = el)}
      />
      <Parallax
        width={120}
        src={record}
        classes={'mt-6 opacity-60 absolute blur-sm bottom-[35%] right-[5%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[6] = el)}
      />
      <Parallax
        width={90}
        src={record}
        classes={'mt-6 opacity-60 absolute top-[16%] sm:top-[20%] right-0 sm:right-[5%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[7] = el)}
      />
      <Parallax
        width={100}
        src={record}
        classes={'mt-6 opacity-60 absolute top-[2.5%] right-[50%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[8] = el)}
      />
      <Parallax
        width={110}
        src={record}
        classes={'mt-6 opacity-60 absolute bottom-[15%] sm:bottom-[5%] right-0 sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[9] = el)}
      />
      <Parallax
        width={80}
        src={record}
        classes={'mt-6 opacity-60 absolute blur-sm top-[5%] right-[20%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[10] = el)}
      />
      <Parallax
        width={80}
        src={record}
        classes={'mt-6 opacity-60 absolute blur-sm top-[10%] sm:top-[30%] right-[90%] sm:right-[30%] sm:scale-100 scale-75'}
        ref={(el) => (parallaxes.current[11] = el)}
      />
    </>
  );
};

export default ParallaxImages;
