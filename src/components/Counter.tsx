import {useState} from 'react';

function Counter({initialValue}: {initialValue: number}) {
    const [counter, setCounter] = useState(initialValue);

  const increaseNumber = () =>  {
    setCounter( (counter) => counter + 1);
  }

  const decreaseNumber = () => {
      setCounter((counter) => counter - 1);
  }

  return (
      <div data-testid="counter-component">
          <div>Counter Component</div>
          <div>{counter}</div>
          <button onClick={increaseNumber}>Increase number</button>
          <button onClick={decreaseNumber}>Decrease number</button>
      </div>
  );
}

export default Counter;
