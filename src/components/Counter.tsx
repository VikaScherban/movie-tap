import {useState} from 'react';

function Counter() {
    const [counter, setCounter] = useState(0);

  const increaseNumber = () =>  {
    setCounter( (counter) => counter + 1);
  }

  const decreaseNumber = () => {
      setCounter((counter) => counter - 1);
  }

  return (
      <div>
          <div> Counter Component</div>
          <div>{counter}</div>
          <button onClick={increaseNumber}>Increase number</button>
          <button onClick={decreaseNumber}>Decrease number</button>
      </div>
  );
}

export default Counter;
