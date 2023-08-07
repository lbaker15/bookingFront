import { createRef, useEffect, useRef, useState } from 'react';
import Input from '../shared/input';

type InputType = {
  text: string;
  type: string;
};
type Props = {
  arr: InputType[];
  stateParent?: any;
  setStateParent?: any;
  submitFunc?: any;
  submitText?: string;
  setFile?: any;
  hideLabel?: boolean;
};
const Form = ({ submitText, arr, stateParent, setStateParent, submitFunc, hideLabel, setFile }: Props) => {
  const [state, setState] = useState<any>({});
  const [loaded, setLoaded] = useState(false);
  const refs: any = useRef([]);
  refs.current = arr.map((element, i) => refs.current[i] ?? createRef());

  const handleChange = (e: any) => {
    if (!setStateParent) {
      if (e.target.files) {
        setFile(e.target.files[0]);
        const newState = { ...state, [e.target.name]: { value: null, valid: e.target.validity.valid } };
        setState(newState);
      } else {
        const newState = { ...state, [e.target.name]: { value: e.target.value, valid: e.target.validity.valid } };
        setState(newState);
      }
    } else {
      if (e.target.files) {
        setFile(e.target.files[0]);
      } else {
        console.log(e.target.value, e.target.type);
        const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
        const newState = { ...stateParent, [e.target.name]: { value: value, valid: e.target.validity.valid } };
        setStateParent(newState);
      }
    }
  };
  useEffect(() => {
    let obj: any = {};
    Promise.all(
      arr.map((item: InputType) => {
        obj[item.text] = { value: '', valid: false };
      })
    ).then(() => {
      if (!setStateParent) {
        setState(obj);
      } else {
        setStateParent(obj);
      }
      setLoaded(true);
    });
  }, []);

  const handleSubmit = (e: any) => {
    if (submitFunc) {
      e.preventDefault();
      submitFunc();
    }
  };

  const st = !setStateParent ? state : stateParent;
  return (
    <form data-testid='form' className='grid gap-8 md:grid-cols-2'>
      {loaded &&
        arr.map((item: InputType, i: number) => {
          return (
            <Input
              key={'form_input' + i}
              ref={refs[i]}
              hideLabel={hideLabel}
              name={item.text}
              label={item.text}
              value={st[item.text].value}
              type={item.type}
              valid={st[item.text].valid}
              onChange={handleChange}
            />
          );
        })}
      <div className='w-full md:col-span-2'>
        <button className='mx-auto u-button' onClick={handleSubmit} type='submit'>
          {submitText ? submitText : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default Form;
