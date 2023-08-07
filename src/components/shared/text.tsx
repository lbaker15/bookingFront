import React, { Fragment, useEffect, useState } from 'react';

type Props = {
  elementTag: string;
  content: string;
  classes?: string;
};
const Text = ({ elementTag, content, classes }: Props) => {
  const [el, setEl] = useState<React.ReactNode | null>(null);
  useEffect(() => {
    let el: React.ReactNode = React.createElement(elementTag, { className: classes }, content);
    setEl(el);
  }, [content]);
  return <Fragment>{el}</Fragment>;
};

export default Text;
