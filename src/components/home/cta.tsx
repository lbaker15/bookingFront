import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Arrow from '../shared/arrow';

const CTA = ({ data }: any) => {
  const parentRef: any = useRef(null);
  useEffect(() => {
    const parentElement = parentRef.current;

    gsap.fromTo(
      parentElement,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        scrollTrigger: {
          trigger: parentElement,
          start: 'top 80%',
          toggleActions: 'restart none none reverse',
        },
      }
    );
  }, []);

  return (
    <div ref={parentRef} className='grid py-20 overflow-hidden lg:grid-cols-3 u-wrapper '>
      <div className='lg:col-start-2 lg:col-span-2'>
        <h2 className='pb-20 text-6xl lg:px-20 text-pink dark:text-white-100'>
          Explore <span className='italic'>Events</span> Yourself
        </h2>
        <div className='relative flex flex-col flex-wrap w-full gap-10 mb-20 lg:flex-nowrap sm:flex-row'>
          {data.acf.categories.map((cat: any, i: number) => (
            <Link key={'ctaCat' + i} className='u-button--outline' to={`/dashboard?filter=${encodeURIComponent(cat.text)}`}>
              <span>{cat.text}</span>
            </Link>
          ))}
        </div>
        <div className='relative flex items-center justify-between py-8 mb-20 border-t border-b border-pink dark:border-white-100 group'>
          <Link className='absolute z-20 w-full h-full' to='/contact'></Link>
          <h3 className='pr-2 text-3xl font-medium uppercase group-hover:italic xl:text-4xl'>{data.acf.category_text}</h3>
          <button>
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
