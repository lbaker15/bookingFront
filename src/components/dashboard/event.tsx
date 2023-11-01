import React, { MouseEvent, useEffect, useLayoutEffect, useState } from 'react';
import { getCookie } from '../../helpers/main';
import getStripe from '../../hooks/stripe';
import { checkout } from '../../helpers/checkout';
import ModalBuy from './modal';
import Modal from '../profile/modal';
import BookingCancel from '../profile/bookingCancel';
import { gsap } from 'gsap';
import { EventProps } from './types';

type Props = {
  item: any;
  bookings: boolean;
  refetch?: any;
  token?: string;
};
const Event = ({ item, bookings, refetch, token, rerender, setRerender }: EventProps) => {
  const ref: React.RefObject<HTMLDivElement> = React.useRef(null);
  const imgRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [value, setValue] = useState(1);
  const [modal, setModal] = useState(false);

  const [state, setState] = useState<any>({ title: null, eventId: null, count: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const { id, title, price } = target.dataset;

    if (id && title && price) {
      const email = getCookie('httpEmail');

      const obj = { eventId: id, title, count: value };
      setState(obj);
      const date = new Date(Date.now() + 15 * 60 * 1000);
      checkout({ id, title, value, email, price, date });
    }
  };

  const date = new Date(item.time);
  const options = { month: 'short', day: 'numeric', year: 'numeric' } as Intl.DateTimeFormatOptions;
  const formattedDate = date.toLocaleDateString('en-US', options);

  const handleModal = (value: boolean) => {
    setModal(value);
  };

  useLayoutEffect(() => {
    if (imgRef.current) {
      gsap.set(imgRef.current, { opacity: 0 });
    }
  }, []);
  const handleOver = (e: MouseEvent<HTMLDivElement>) => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { opacity: 1, duration: 0.5 });
    }
  };
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (imgRef.current && ref.current) {
      const r = ref.current;
      const i = imgRef.current;
      const containerRect = r.getBoundingClientRect();
      const x = e.clientX - containerRect.left - i.clientWidth / 2;
      const y = e.clientY - containerRect.top - i.clientHeight / 2;

      gsap.to(imgRef.current, { x, y, duration: 0.5 });
    }
  };
  const handleOut = (e: MouseEvent<HTMLDivElement>) => {
    if (imgRef.current) {
      gsap.to(imgRef.current, { opacity: 0, duration: 0.5 });
    }
  };
  const img = item.imgUrl;

  return (
    <>
      <ModalBuy modal={modal} handleModal={handleModal} handleChange={handleChange} value={value} handleClick={handleClick} item={item} />

      <div
        ref={ref}
        onMouseOver={handleOver}
        onMouseMove={handleMove}
        onMouseOut={handleOut}
        className='relative col-span-12 pt-6 border border-t border-b-0 border-l-0 border-r-0 sm:col-span-6 md:col-span-4 lg:col-span-3 border-pink dark:border-white-100'>
        {!bookings && img && (
          <div ref={imgRef} className='absolute top-0 left-0 z-50 overflow-hidden rounded-lg opacity-0 pointer-events-none w-fit h-fit'>
            <div className='relative w-[70px] h-[70px]'>
              <img src={'data:image/png;base64,' + img} className='z-30 object-cover w-full h-full ' />
            </div>
          </div>
        )}
        {item.category && item.category.length && <span className='block mb-8 text-sm uppercase pointer-events-none '> {item.category[0]}</span>}
        <h2 className='mb-8 text-lg font-semibold uppercase pointer-events-none lg:text-3xl'>{item.name}</h2>
        <p className='relative block pointer-events-none line-clamp-3 '>{item.description}</p>
        {bookings ? (
          <p className='flex items-center gap-2 mt-8 mb-8 pointer-events-none '>
            <span className='text-sm font-light uppercase'>No of tickets:</span> {item.count}
          </p>
        ) : (
          <time className='relative block mt-8 mb-8 text-sm pointer-events-none opacity-60'>{formattedDate} </time>
        )}
        {bookings ? (
          <>
            <BookingCancel setRerender={setRerender} refetch={refetch} token={token} item={item} />
          </>
        ) : (
          <button onClick={(e) => setModal(true)} className='text-sm u-button--pink z-[100]'>
            Purchase tickets
          </button>
        )}
      </div>
    </>
  );
};

export default Event;
