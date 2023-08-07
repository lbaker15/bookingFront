import gsap from 'gsap';
import React, { ReactElement, useTransition, useRef, createRef, useEffect, useState } from 'react';

type accordianData = {
  title: string;
  content: string;
};

type Props = {
  content: accordianData[];
  multi: boolean;
};

const Accordian = ({ content, multi }: Props) => {
  const duration = 0.4;
  const myRefs = useRef([]);
  const [heights, setHeights] = useState([]);
  //Rewrite prev & open to be within object rather than seperate values?
  //Remove update - object assign?
  const [open, setOpen] = useState<any>(null);
  const [update, setUpdate] = useState<any>(null);
  const [prev, setPrev] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  myRefs.current = content.map((element, i) => myRefs.current[i] ?? createRef());

  useEffect(() => {
    if (myRefs.current.length === content.length) {
      const arr: any = [];
      Promise.all(
        myRefs.current.map((item: any) => {
          const d = item.current.querySelector('.accordian__content__inner').getBoundingClientRect();
          const h = d.height;
          arr.push(h);
        })
      ).then(() => {
        setHeights(arr);
      });
    }
  }, [myRefs]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const previous = open;
    setPrev(previous);

    if (e !== null && e.target instanceof HTMLElement && myRefs) {
      const num = Number(e.target.dataset.value);
      const el: any = myRefs.current[num];
      setOpen(num);
      startTransition(() => setUpdate(Date.now()));
    }
  };

  useEffect(() => {
    const el: any = myRefs.current[open];
    if (el) {
      if (multi) {
        if (!el.current.classList.contains('active')) {
          const h = heights[open];
          gsap.to(el.current, { height: h, duration });
          el.current.classList.add('active');
        } else {
          gsap.to(el.current, { height: 0, duration });
          el.current.classList.remove('active');
        }
      } else {
        console.log(prev, open);
        if (prev === open) {
          if (!el.current.classList.contains('active')) {
            const h = heights[open];
            gsap.to(el.current, { height: h, duration });
            el.current.classList.add('active');
          } else {
            gsap.to(el.current, { height: 0, duration });
            el.current.classList.remove('active');
          }
        } else {
          const h = heights[open];
          const curr: any = myRefs.current[open];
          gsap.to(curr.current, { height: h, duration });
          el.current.classList.add('active');

          const last: any = myRefs.current[prev];
          if (last.current.classList.contains('active')) {
            gsap.to(last.current, { height: 0, duration });
            last.current.classList.remove('active');
          }
        }
      }
    }
  }, [update]);
  useEffect(() => {
    setOpen(0);
    const num = 0;
    const el: any = myRefs.current[num];
    const h = heights[num];
    const curr: any = myRefs.current[num];
    gsap.fromTo(curr.current, { height: 0 }, { height: h, duration });
    el.current.classList.add('active');
  }, [heights]);

  return (
    <div className='py-12 mb-96'>
      {content.map((item: accordianData, index: number) => {
        return (
          <div key={'accordian' + index} className='pb-6 mb-6 border-b-2 border-black'>
            <div data-value={index} className='accordian__title' onClick={handleClick}>
              <span className='flex pointer-events-none'>{item.title}</span>
            </div>
            <div ref={myRefs.current[index]} className='flex h-0 overflow-hidden'>
              <span className='block h-fit'>{item.content}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
