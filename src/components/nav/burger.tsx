import { useContext } from 'react';
import { AppDispatch, Context, DispatchContext, State } from '../../store/store';

const Burger = ({}) => {
  const dispatch: AppDispatch | null = useContext(DispatchContext);
  const st: State = useContext(Context);
  const { state } = st;

  const handleClick = () => {
    const value: boolean = !state.menuState;
    if (dispatch) {
      dispatch({ type: 'menu', payload: value });
    }
  };
  const { menuState } = state;

  return (
    <div className='flex md:hidden'>
      <div className={`flex flex-col gap-2 w-12C h-24C cursor-pointer ${menuState ? 'u-burger--active' : 'u-burger--closed'} `} onClick={handleClick}>
        <div className='absolute h-[1px] mb-8 translate-y-0 bg-pink dark:bg-white-100 pointer-events-none w-12C'></div>
        <div className='absolute h-[1px] mb-8 translate-y-12 bg-pink dark:bg-white-100 pointer-events-none w-12C'></div>
        <div className='absolute h-[1px] mb-8 translate-y-24 bg-pink dark:bg-white-100 pointer-events-none w-12C'></div>
      </div>
    </div>
  );
};

export default Burger;
