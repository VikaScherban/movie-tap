import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Counter from "./Counter";

describe('Counter', () => {
  it('should renders with initial value', () => {
    const value = 4;
    render(<Counter initialValue={value} />);

    const counterValue =  screen.getByText(value);

    expect(screen.getByText(/Counter Component/i)).toBeInTheDocument();
    expect(screen.getByTestId('counter-component')).toBeInTheDocument();
    expect(counterValue).toBeInTheDocument();
    expect(counterValue).toHaveTextContent('4');
  });

  it('should decrease the counter', () => {
    const value = 2;

    render(<Counter initialValue={value} />);

    const decreaseButton = screen.getByText('Decrease number');
    const counterValue =  screen.getByText(value);

    fireEvent.click(decreaseButton);

    expect(counterValue).toHaveTextContent('1');
  });

  it('should increase the counter', () => {
    const value = 2;

    render(<Counter initialValue={value} />);

    const increaseButton = screen.getByText('Increase number');
    const counterValue =  screen.getByText(value);

    fireEvent.click(increaseButton);

    expect(counterValue).toHaveTextContent('3');
  });
});
