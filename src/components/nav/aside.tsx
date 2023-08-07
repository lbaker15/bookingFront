import gsap from 'gsap';
import React, { startTransition, useEffect, useRef } from 'react';
import MenuItem from './menuItem';
import { WpPostObject } from './types';

const Aside = ({ menuState, data }: { menuState: boolean; data: WpPostObject[] }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (menuState) {
        startTransition(() => {
          gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        });
      } else {
        startTransition(() => {
          gsap.fromTo(ref.current, { opacity: 1 }, { opacity: 0, duration: 0.3 });
        });
      }
    }
  }, [menuState]);

  return (
    <aside
      ref={ref}
      className={`w-full h-screen fixed z-0 top-0 left-0 bg-purple dark:bg-blackR-100 opacity-0 pointer-events-none  transition-all duration-300 ${
        menuState ? 'opacity-100 flex z-20 pointer-events-auto' : ''
      } `}>
      <div className='flex flex-col items-center justify-center w-full h-full gap-8'>
        {data &&
          data.map((item: any, i: number) => {
            return <MenuItem key={'asidemenu' + i} aside={true} string={item.post_title} url={item.url} />;
          })}
      </div>
    </aside>
  );
};

export default Aside;
