import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [on, setOn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  // ⬆️☝ that means I can set state directly from props

  useEffect(() => {
    document.title = `Clicked ${count} Times.`;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [count]);

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const handleMouseMove = event => {
    setMousePos({
      x: event.pageX,
      y: event.pageY
    });
  };

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

      <h2>Mouse Position</h2>
      {JSON.stringify(mousePos, null, 2)}

      <h2>Online Status</h2>
      <p>
        You are <strong>{status ? 'online' : 'offline'}</strong>
      </p>
    </>
  );
};

export default App;
