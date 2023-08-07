import React, { Fragment, lazy, Suspense } from 'react';
// import LazyImage from './lazy-image';
const LazyImage = lazy(() => import('./lazy-image'));

type Props = {
  url: string;
  background: boolean;
  className?: string;
  alt?: string;
  lazy: boolean;
};
const Image = ({ url, background, className, alt, lazy }: Props) => {
  if (background) {
    return (
      <Fragment>
        <div style={{ backgroundImage: `url(${url})` }} className={!className ? 'u-bgImage' : `u-bgImage ${className}`}></div>
      </Fragment>
    );
  } else {
    if (lazy) {
      return (
        <Fragment>
          <Suspense fallback={<p>Loading...</p>}>
            <LazyImage url={url} className={className} alt={alt} />
          </Suspense>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <img src={url} alt={alt} className={!className ? 'u-image' : `u-image ${className}`} />
        </Fragment>
      );
    }
  }
};

export default Image;
