import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [on, setOn] = useState(false);

  useEffect(() => {
    document.title = `Clicked ${count} Times.`;
  });

  const incrementCount = () => {
    setCount(count + 1);
  };

  const toggleLight = () => {
    setOn(on => !on);
  };

  return (
    <>
      <button onClick={incrementCount}>Clicked {count} times</button>

      <h2>Toggle Light</h2>
      <img
        src={
          on
            ? 'https://icon.now.sh/highlight/fd0'
            : 'https://icon.now.sh/highlight/aaa'
        }
        style={{
          height: '50px',
          width: '50px'
        }}
        alt="Flashlight"
        onClick={toggleLight}
      />
    </>
  );
};

export default App;
