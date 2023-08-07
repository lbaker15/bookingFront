import React, { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { sortByValues } from '../../helpers/main';
import { Context, DispatchContext } from '../../store/store';
import Loader from './loader';
import { Event } from './types';
const ListWrapper = React.lazy(() => import('./listWrapper'));
const Topbar = React.lazy(() => import('../shared/topbar'));

type Props = {};
const Events = ({}: Props) => {
  const dispatch: any = useContext(DispatchContext);
  const state: any = useContext(Context);
  const { category, sortBy, displayData } = state?.state;
  const [categories, setCategories] = useState<string[]>([]);
  const [open, setOpen] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  useEffect(() => {
    if (displayData && displayData.data) {
      const array: any = [];
      Promise.all(
        displayData.data.map((item: Event) => {
          const { category } = item;
          return category.map((cat: String) => {
            if (!array.includes(cat)) {
              return array.push(cat);
            }
            return null;
          });
        })
      ).then(() => {
        setCategories(array);
        setCompleted(true);
      });
    }
  }, [displayData]);

  return (
    <>
      {completed ? (
        <>
          <Topbar title={'All Upcoming Events'} filterUI={true} props={{ open, setOpen, categories, category, sortBy, sortByValues, dispatch }} />
          <ListWrapper />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default Events;
