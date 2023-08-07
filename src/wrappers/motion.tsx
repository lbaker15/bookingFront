import { motion } from 'framer-motion';
import { useContext } from 'react';
import { Context } from '../store/store';

const Motion = ({ children }: any) => {
  const value = useContext(Context);
  return (
    <div className='relative overflow-hidden wrapperBody'>
      <motion.div
        style={{ width: '100vw', height: '100vw' }}
        className={
          value.state.darkMode
            ? 'w-[100vw] motionPink z-[9999] h-[100vw]  absolute top-0 bg-purple left-0 rounded-full'
            : 'w-[100vw] motionPink z-[9999] h-[100vw]  absolute top-0 bg-pink left-0 rounded-full'
        }
        onAnimationStart={() => {
          const pink = document.querySelector('.motionPink') as HTMLElement;
          const header = document.querySelector('.headerMotion') as HTMLElement;
          const footer = document.querySelector('.footerMotion') as HTMLElement;
          header.classList.add('bg-transparent');
          footer.classList.add('hidden');
          setTimeout(() => {
            pink.style.zIndex = '1';
          }, 500);
        }}
        animate={{ transform: 'scale(10)', transition: { duration: 0.6 } }}
        initial={{ transform: 'scale(0.01)' }}></motion.div>
      <motion.div
        onAnimationStart={() => {
          const wrapper = document.querySelector('.wrapperBody') as HTMLElement;
          document.body.style.overflow = 'hidden';
          wrapper.style.maxHeight = '100vh';
        }}
        onAnimationComplete={() => {
          const wrapper = document.querySelector('.wrapperBody') as HTMLElement;
          const header = document.querySelector('.headerMotion') as HTMLElement;
          const footer = document.querySelector('.footerMotion') as HTMLElement;
          document.body.style.overflow = 'scroll';
          header.classList.remove('bg-transparent');
          footer.classList.remove('hidden');
          wrapper.style.maxHeight = '100%';
        }}
        initial={{ clipPath: 'circle(0%)' }}
        animate={{ clipPath: 'circle(100%)', transition: { duration: 1, delay: 0.5 } }}
        className={value.state.darkMode ? 'background--dark dark relative z-10' : 'background relative z-10'}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 1 } }} exit={{ opacity: 0, transition: { duration: 1 } }}>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};
export default Motion;
