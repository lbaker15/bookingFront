import React, { Suspense, useCallback, useContext, useEffect, useState } from 'react';

import { AppDispatch, Context, ContextProvider, DispatchContext, State } from '../../store/store';

import { useLocation } from 'react-router-dom';
import List from './list';

const ListWrapper = React.memo(() => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get('filter');
  const p: any = useContext(Context);
  const dispatch: AppDispatch | null = useContext(DispatchContext);

  useEffect(() => {
    //cancel loader within this hook?
    if (filterValue && dispatch) {
      dispatch({
        type: 'category',
        payload: decodeURIComponent(filterValue),
      });
    }
  }, [filterValue]);
  if (p) {
    const { displayData, sortBy, category } = p.state;
    return (
      <>{dispatch && <List data={p.state.displayData.data} hasMore={p.state.displayData.hasMore} dispatch={dispatch} filterBy={category} sortBy={sortBy} />}</>
    );
  } else {
    return <></>;
  }
});

export default ListWrapper;
