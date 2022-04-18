import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest-styled-components';
import { Button } from '../';

test('hello world', () => {
  render(<Button>Hello</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Hello');
});

test('ui', () => {
  const { container } = render(<Button>Hello</Button>);
  expect(container.firstChild).toMatchSnapshot();
});

test('onClick', () => {
  const onClick = jest.fn();
  render(<Button onClick={onClick}>submit</Button>);
  userEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledTimes(1);
});
