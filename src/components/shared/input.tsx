import { useEffect, useState } from 'react';

type Props = {
  type: string;
  name: string;
  value: string;
  ref?: any;
  valid?: boolean;
  onChange: (e: any) => void;
  label?: string;
  hideLabel?: boolean;
};
const Input = ({ label, type, hideLabel, onChange, ref, name, value, valid }: Props) => {
  const [blur, setBlur] = useState(false);
  useEffect(() => {}, []);
  valid = type === 'file' ? true : valid;

  return (
    <div className='w-full mb-4'>
      <label className={hideLabel ? 'h-[1px] absolute opacity-0' : ''} htmlFor={name}>
        {label ? label : name}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          title={name}
          placeholder={hideLabel ? label : ''}
          onBlur={() => setBlur(true)}
          className={
            valid || !blur
              ? 'border-b dark:border-white-100 mb-4 border-pink placeholder:font-light placeholder:capitalize px-2 py-1 w-full bg-transparent'
              : 'border-b dark:border-white-100 mb-4 border-pink placeholder:font-light placeholder:capitalize px-2 py-1 w-full bg-transparent input--danger'
          }
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}></textarea>
      ) : (
        <input
          id={name}
          title={name}
          placeholder={hideLabel ? label : ''}
          onBlur={() => setBlur(true)}
          className={
            valid || !blur
              ? 'border-b dark:border-white-100 mb-4 border-pink placeholder:font-light placeholder:capitalize px-2 py-1 w-full bg-transparent'
              : 'border-b dark:border-white-100 mb-4 border-pink placeholder:font-light placeholder:capitalize px-2 py-1 w-full bg-transparent input--danger'
          }
          name={name}
          ref={ref}
          value={value}
          type={type}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default Input;
