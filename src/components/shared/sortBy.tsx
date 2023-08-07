import React, { useCallback, useTransition } from 'react';
import { gsap } from 'gsap';
import Tab from './tab';
import { AppDispatch } from '../../store/store';
const SortBy = ({ dispatch, sortByValues }: { dispatch: AppDispatch; sortByValues: string[] }) => {
  const hover = React.useRef(null);
  const left = React.useRef(null);
  const right = React.useRef(null);
  const [hovered, setHovered] = React.useState('l');
  const [isPending, startTransition] = useTransition();

  const classAdjust = useCallback((r: HTMLElement, l: HTMLElement, action: string) => {
    console.log(r, l, action);
    if (action === 'remove') {
      r.classList.add('text-pink');
      r.classList.add('dark:text-white-100');
      l.classList.remove('text-pink');
      l.classList.remove('dark:text-white-100');
      r.classList.remove('text-purple');
      r.classList.remove('dark:text-blackR-100');
      l.classList.add('text-purple');
      l.classList.add('dark:text-blackR-100');
    } else {
      r.classList.remove('text-pink');
      r.classList.remove('dark:text-white-100');
      l.classList.add('text-pink');
      l.classList.add('dark:text-white-100');
      r.classList.add('text-purple');
      r.classList.add('dark:text-blackR-100');
      l.classList.remove('text-purple');
      l.classList.remove('dark:text-blackR-100');
    }
  }, []);
  const hoverEvent = (e: React.MouseEvent) => {
    if (hover.current && left.current && right.current) {
      const target = e.target as HTMLElement;
      const value = target.dataset.value === 'l' ? '-0%' : '100%';
      if (target.dataset.value === 'l') {
        const r = right.current as HTMLElement;
        const l = left.current as HTMLElement;

        if (r.classList && l.classList) {
          classAdjust(r, l, 'remove');
        }
      } else {
        const r = right.current as HTMLElement;
        const l = left.current as HTMLElement;
        if (r.classList && l.classList) {
          classAdjust(r, l, 'add');
        }
      }
      gsap.to(hover.current, { x: value, duration: 0.5 });
    }
  };
  const clickEvent = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (hover.current && target) {
      const value = target.dataset.value === 'l' ? '0%' : '100%';
      gsap.to(hover.current, { x: value, duration: 0.5 });
      startTransition(() => setHovered(String(target.dataset.value)));
    }
    const officialVal = target.dataset.value === 'l' ? sortByValues[1] : sortByValues[0];
    dispatch({
      type: 'sortBy',
      payload: officialVal,
    });
  }, []);
  const outEvent = (e: React.MouseEvent) => {
    if (hover.current && left.current && right.current) {
      const value = hovered === 'l' ? '0%' : '100%';
      if (hovered === 'l') {
        const r = right.current as HTMLElement;
        const l = left.current as HTMLElement;
        if (r.classList && l.classList) {
          classAdjust(r, l, 'remove');
        }
      } else {
        const r = right.current as HTMLElement;
        const l = left.current as HTMLElement;
        if (r.classList && l.classList) {
          classAdjust(r, l, 'add');
        }
      }
      gsap.to(hover.current, { x: value, duration: 0.5 });
    }
  };
  return (
    <div className='flex flex-col'>
      <p className='uppercase text-[12px] text-pink dark:text-white-100 mb-2 text-center sm:text-left'>Sort by date:</p>
      <div
        className='relative cursor-pointer h-[50px] flex dark:border-white-100 border-pink
                overflow-hidden
                rounded-full border items-center  py-1'>
        <Tab string='Coming Soon' value='l' ref={left} hoverEvent={hoverEvent} outEvent={outEvent} clickEvent={clickEvent} />
        <Tab white={true} string='After 2023' value='r' ref={right} hoverEvent={hoverEvent} outEvent={outEvent} clickEvent={clickEvent} />
        <div className='absolute left-0 z-10 w-1/2 h-full rounded-full pointer-events-none dark:bg-white-100 bg-pinkDark' ref={hover}></div>
      </div>
    </div>
  );
};
export default SortBy;
