import useSWR from 'swr';
import React from 'react';
import { fetcher } from './swr';
import { Suspense } from 'react';
import Loader from '../dashboard/loader';
import { motion } from 'framer-motion';
import Motion from '../../wrappers/motion';

const Hero = React.lazy(() => import('./hero'));
const TextAnimation = React.lazy(() => import('./textAnimation'));
const Gallery = React.lazy(() => import('./gallery'));
const Image = React.lazy(() => import('./image'));
const MovingText = React.lazy(() => import('./movingText'));
const CTA = React.lazy(() => import('./cta'));
const TextSection = React.lazy(() => import('./textSection'));

type Props = {};
const Home = ({}: Props) => {
  const { data, error } = useSWR('https://headless.local/wp-json/wp/v2/pages/5/?acf', fetcher);

  return (
    <>
      <Motion>
        <Suspense fallback={<Loader />}>
          {data && !error && (
            <>
              <Hero data={data} />
              <div className='py-20 pt-40'>
                <TextSection data={data} />
                <Gallery data={data.acf.gallery} />
                <div className='my-40 u-wrapper'>
                  <div className='flex w-full'>
                    <Image half={false} image={data.acf.image_one} />
                  </div>
                  <div className='w-full flex justify-end mt-[25px] pb-20  lg:-mt-[50px]'>
                    <Image half={true} image={data.acf.image_two} />
                  </div>
                  <TextAnimation string={data.acf.closing_text} classes='text-2xl uppercase pb-20 lg:text-4xl w-full lg:w-1/2' heading={3} clip={true} />
                </div>
                <MovingText data={data} />
                <CTA data={data} />
              </div>
            </>
          )}
        </Suspense>
      </Motion>
    </>
  );
};

export default Home;
