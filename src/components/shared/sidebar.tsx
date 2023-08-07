import { useEffect } from 'react';

type Props = {
  arr: any;
};
const Sidebar = ({ arr }: Props) => {
  useEffect(() => {});
  return (
    <div className='b-sidebar'>
      {arr.map((item: any, i: number) => {
        return (
          <div key={'sidebar' + item.name + i} className='b-sidebar__item'>
            <button data-index={i} onClick={item.callback}>
              {item.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Sidebar;
