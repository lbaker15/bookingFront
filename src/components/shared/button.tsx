import { Fragment } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  type?: string;
  text: string;
  href: string;
};
const Button = ({ type, text, href }: Props) => {
  if (type === 'link') {
    return (
      <Fragment>
        <Link className='u-button' to={href}>
          <span className='u-hidden'>Link to {href}</span>
          <span className='u-button__inner'>{text}</span>
        </Link>
      </Fragment>
    );
  } else if (type === 'a') {
    return (
      <a href={href} className='u-button'>
        <span className='u-hidden'>Link to {href}</span>
        <span className='u-button__inner'>{text}</span>
      </a>
    );
  } else {
    return (
      <button className='u-button'>
        <span className='u-button__inner'>{text}</span>
      </button>
    );
  }
};
export default Button;
