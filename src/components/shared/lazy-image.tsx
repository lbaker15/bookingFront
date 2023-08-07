import React from 'react';

type Props = {
  url: string;
  className?: string;
  alt?: string;
};
const LazyImage = ({ url, alt, className }: Props) => {
  return <img src={url} alt={alt} className={!className ? 'u-image' : `u-image ${className}`} />;
};

export default LazyImage;
