import React, { useCallback, useContext, useEffect } from 'react';
import { gsap } from 'gsap';
import { AppDispatch, Context, State } from '../../store/store';

const FilterBy = ({ dispatch, categories }: { dispatch: AppDispatch; categories: string[] }) => {
  const dropdown = React.useRef(null);
  const { state }: State = useContext(Context);
  const [show, setShow] = React.useState(false);
  const [display, setDisplay] = React.useState('Show');
  const clickEvent = useCallback(
    (e: React.MouseEvent) => {
      if (dropdown.current) {
        setShow(!show);
      }
    },
    [show]
  );
  const dispatchEvent = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLButtonElement;
    dispatch({
      type: 'category',
      payload: String(target.dataset.value).toLocaleLowerCase(),
    });
  }, []);

  useEffect(() => {
    if (show) {
      gsap.to(dropdown.current, { maxHeight: 1000, duration: 0.75 });
      setTimeout(() => {
        setDisplay('Hide');
      }, 250);
    } else {
      gsap.to(dropdown.current, { maxHeight: '0px', duration: 0.75 });
      setTimeout(() => {
        setDisplay('Show');
      }, 250);
    }
  }, [show]);

  return (
    <div className='relative z-20 hidden lg:flex flex-col px-2 w-[250px]'>
      <p className='uppercase text-[12px] text-pink dark:text-white-100 mb-2 px-4'>Filter by category:</p>
      <div onClick={clickEvent} className='relative cursor-pointer h-[50px] flex items-center text-[1rem] uppercase px-4 select-none'>
        {display} filters +
      </div>
      <div className=' absolute top-[100%] max-h-[0px] overflow-hidden bg-purple dark:bg-blackR-100 flex flex-col gap-2 z-20 w-full px-2 pt-4' ref={dropdown}>
        <div
          data-value={''}
          className={`relative flex items-center text-[1rem] hover:bg-blackR-20 py-2 px-2 uppercase cursor-pointer transition-all transition-ease duration-300 select-none dark:hover:bg-white-20 ${
            String(state.category).toLocaleLowerCase() === '' ? 'bg-white-20' : ''
          }`}
          onClick={dispatchEvent}>
          All
        </div>
        {categories.map((category: string, i: number) => {
          return (
            <div
              key={'cat' + i}
              data-value={category}
              className={`relative flex items-center text-[1rem] hover:bg-blackR-20 py-2 px-2 uppercase cursor-pointer transition-all transition-ease duration-300 select-none dark:hover:bg-white-20 ${
                String(state.category).toLocaleLowerCase() === String(category).toLocaleLowerCase() ? 'bg-white-20' : ''
              }`}
              onClick={dispatchEvent}>
              {category}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FilterBy;
