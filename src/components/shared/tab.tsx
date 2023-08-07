import React, { useCallback, useTransition } from 'react';

import { gsap } from 'gsap';
const Tab = React.forwardRef<
  HTMLDivElement,
  {
    string: string;
    value: string;
    hoverEvent: (e: React.MouseEvent) => void;
    clickEvent: (event: React.MouseEvent<HTMLElement>) => void;
    outEvent: (e: React.MouseEvent) => void;
    white?: boolean;
  }
>(({ string, value, hoverEvent, clickEvent, outEvent, white }, ref) => {
  return (
    <div
      ref={ref}
      data-value={value}
      onMouseOver={hoverEvent}
      onClick={clickEvent}
      onMouseOut={outEvent}
      className={`px-4 min-w-[120px] uppercase text-[0.8rem] flex justify-center text-center z-20 select-none ${
        white ? 'text-pink dark:text-white-100' : 'text-purple dark:text-blackR-100'
      }`}>
      {string}
    </div>
  );
});

export default Tab;
