import { useContext, useEffect, useState } from 'react';
import { getCookie } from '../../helpers/main';
import { CreateEvent } from '../../hooks/createEvent';

import Form from '../shared/form';

const AddEvent = ({}) => {
  const token = getCookie('httpCookie');
  const [enabled, setEnabled] = useState(false);
  const [file, setFile] = useState(null);

  const [state, setState] = useState<any>({
    name: { value: '', validity: false },
    lat: { value: 0, validity: false },
    lng: { value: 0, validity: false },
    description: { value: '', validity: false },
    time: { value: 0, validity: false },
    category: { value: '', validity: false },
    address: { value: '', validity: false },
    tickets: { value: 0, validity: false },
    price: { value: '', validity: false },
  });

  const submit = () => {
    let sub = true;
    Promise.all(
      Object.entries(state).map((el: any) => {
        if (!el[1].valid && el[0] !== 'image') {
          sub = false;
        }
      })
    ).then(() => {
      if (sub) {
        setEnabled(true);
      }
    });
  };

  const { data }:any = CreateEvent({ file, input: { ...state }, enabled, token });
  return (
    <>
      {data && data.createEvent && (
        <div className='b-modal'>
          <div className='b-modal__inner'>
            <span>Event Created</span>
          </div>
        </div>
      )}
      <Form
        setFile={setFile}
        hideLabel={true}
        arr={[
          { type: 'text', text: 'name' },
          { type: 'number', text: 'lat' },
          { type: 'number', text: 'lng' },
          { type: 'text', text: 'description' },
          { type: 'number', text: 'time' },
          { type: 'text', text: 'category' },
          { type: 'text', text: 'address' },
          { type: 'number', text: 'tickets' },
          { type: 'text', text: 'price' },
          { type: 'file', text: 'image' },
        ]}
        submitFunc={submit}
        setStateParent={setState}
        stateParent={state}
        submitText='Create Event'
      />
    </>
  );
};

export default AddEvent;
