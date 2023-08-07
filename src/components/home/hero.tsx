import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import record from '../../images/record.png';
import ParallaxImages from './parallax';
import Title from './title';
gsap.registerPlugin(ScrollTrigger);

type Props = {
  data: any;
};
const Hero = ({ data }: Props) => {
  const acfFields = data.acf;
  const elementRef = useRef(null);
  const main = useRef(null);
  const titles: any = useRef([]);
  const parallaxes: any = useRef([]);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (element) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top top',
            scrub: true,
            pin: element,
            pinSpacing: true,
          },
        });
        const mm = gsap.matchMedia();
        mm.add('(min-width: 768px)', (context: any) => {
          const number = 100;
          titles.current.map((item: any, i: number) => {
            const num = i % 2 === 0 ? -number : number;
            tl.to(item, { x: num, duration: 1.5 }, 0);
          });
          tl.to(main.current, { y: -100, duration: 3 }, 0);
          parallaxes.current.map((item: any, i: number) => {
            const num = i % 2 === 0 ? -100 : -50;
            const num2 = i % 2 === 0 ? -180 : 180;

            tl.to(item, { y: num, duration: 3, rotate: num2 }, 0);
          });
        });
        mm.add('(max-width: 768px)', (context: any) => {
          const number = 50;
          titles.current.map((item: any, i: number) => {
            const num = i % 2 === 0 ? -number : number;
            tl.to(item, { x: num, duration: 1.5 }, 0);
          });
          tl.to(main.current, { y: -100, duration: 3 }, 0);
          parallaxes.current.map((item: any, i: number) => {
            const num = i % 2 === 0 ? -100 : -50;
            console.log(num);
            tl.to(item, { y: num, duration: 3 }, 0);
          });
        });
      });

      return () => ctx.revert();
    }
  }, []);
  return (
    <div className='relative w-full overflow-hidden'>
      <div ref={elementRef} className='h-screen'>
        <ParallaxImages parallaxes={parallaxes} />
        <div ref={main} className='absolute h-[50vh] sm:h-[60vh]   bottom-0 w-full flex  items-end justify-center'>
          <img className='w-fit max-w-[80vw] h-full object-contain' src={acfFields.image.url} alt={acfFields.image.alt} />
        </div>
        <div className='relative flex flex-col justify-center h-full font-sans font-light font-bold text-center b-hero__title'>
          <Title titles={titles} field={acfFields.title_one} i={0} />
          <Title titles={titles} field={acfFields.title_two} i={1} />
          <Title titles={titles} field={acfFields.title_three} i={2} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
