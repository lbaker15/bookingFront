import React from 'react';
import SortBy from './sortBy';
import FilterBy from './filterBy';
import { AppDispatch } from '../../store/store';

const Topbar = ({
  filterUI,
  props,
  title,
  links,
  centralText,
}: {
  filterUI: boolean;
  props?: {
    categories: any;
    sortBy: string;
    sortByValues: string[];
    dispatch: AppDispatch;
    open: string;
    setOpen: React.Dispatch<React.SetStateAction<string>>;
    category: string;
  };
  title: string;
  links?: {
    name: string;
    callback: any;
  }[];
  centralText?: boolean;
}) => {
  if (filterUI && props) {
    const { categories, sortByValues, dispatch } = props;
    return (
      <div className='py-12 pt-28'>
        <div className='border-t border-b border-pink dark:border-white-100'>
          <div
            className={
              centralText
                ? 'relative flex justify-between py-8 u-wrapper items-center w-full max-w-full sm:flex-row flex-col '
                : 'relative flex justify-between items-center py-8 u-wrapper sm:flex-row flex-col'
            }>
            <h1
              className={
                centralText
                  ? 'w-full leading-[2] text-center px-8 font-sans uppercase  text-[1.75rem] sm:text-[2.25rem] lg:text-[3rem]'
                  : 'font-sans leading-[2] uppercase  text-[1.9rem] sm:text-[2.25rem] lg:text-[3rem] mb-4 sm:mb-0'
              }>
              {title}
            </h1>

            <FilterBy categories={categories} dispatch={dispatch} />

            <div className='flex items-center gap-4 sm:flex-col lg:flex-row'>
              <SortBy dispatch={dispatch} sortByValues={sortByValues} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='py-12 pt-28'>
        <div className='b-topbar__title'>
          <div
            className={
              centralText
                ? 'relative flex justify-between py-8 u-wrapper items-center w-full max-w-full sm:flex-row flex-col gap-8'
                : 'relative flex justify-between py-8 u-wrapper items-center sm:flex-row flex-col gap-8'
            }>
            <h1
              className={
                centralText
                  ? 'w-full leading-[2] text-center px-8 font-sans uppercase text-[1.9rem] sm:text-[2.25rem] lg:text-[3rem]'
                  : 'font-sans leading-[2] uppercase text-[1.75rem] sm:text-[2.25rem] lg:text-[3rem]'
              }>
              {title}
            </h1>
            {links && (
              <div className='flex flex-wrap items-center justify-center gap-4 sm:flex-col lg:flex-row'>
                {links &&
                  links.map((item: any, i: number) => {
                    return (
                      <button key={'topbar' + item.name + i} className='whitespace-pre border u-button--pink order' data-index={i} onClick={item.callback}>
                        {item.name}
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default Topbar;
