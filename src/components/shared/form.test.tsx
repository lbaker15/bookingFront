import { render, screen, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import exp from 'constants';
import { act } from 'react-dom/test-utils';
import Form from './form';

//findByRole findAllByRole - ARIA (CAN SET SELF VIA ROLE ATTR) findByTitle findAllByTitle - TITLE ATTR
//find vs get vs query - throws error if multiple or no matches found - find returns promise can use await will equal false if none/multiple, query will just equal null if no matches throw error if multiple, get will throw error for no & multiple use expect(() => {screen.getBy}).toThrow()
test('testing form', async () => {
  const arr = [
    { text: 'input1', type: 'text' },
    { text: 'input2', type: 'text' },
    { text: 'input3', type: 'text' },
  ];
  const mock = jest.fn();

  const { container } = render(<Form arr={arr} />);

  await screen.findAllByRole('textbox');
  //const [input1, input2, input3] = screen.getAllByRole('textbox');
  // const input1 = screen.getByTitle('input1');

  // for (let value of arr) {
  //   const str = value.text;
  //   const input = screen.getByRole('textbox', {
  //     name: value.text,
  //   });
  //   expect(input).toBeInTheDocument();
  // }

  const input1 = screen.getByRole('textbox', {
    name: /input1/i,
  });
  user.click(input1);
  user.keyboard('name');
  // expect(input1).toHaveValue('name');

  // const form = within(screen.getByTestId('form')).getAllByRole('textbox');
  // expect(form).toHaveLength(3);

  // const form = container.querySelector('form');
  // expect(form).toBeInTheDocument();
});
