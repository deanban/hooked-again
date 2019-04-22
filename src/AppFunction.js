import React, { useState, useEffect } from 'react';

const initLocationState = {
  lat: null,
  lng: null,
  speed: null
};
const App = () => {
  const [count, setCount] = useState(0);
  const [on, setOn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  // ⬆️☝ that means I can set state directly from props
  const [location, setLocation] = useState(initLocationState);

  //⬇️ Creating a boolean for cleaning up getCurrentPosition()
  //since it doesn't have a easy clean up method
  let mounted = true;

  useEffect(() => {
    document.title = `Clicked ${count} Times.`;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation);
    const watchId = navigator.geolocation.watchPosition(handleGeolocation);

    //return to clean up any side effects
    //sort of like componentWillUnmount()
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      navigator.geolocation.clearWatch(watchId);
      mounted = false;
    };

    //⬇️ for an empty array useEffect is run twice
    //on mount and unmount
    //specifying something e.g. count means
    //that the side effects rely on count
  }, [count]);

  const handleGeolocation = event => {
    if (mounted) {
      setLocation({
        lat: event.coords.latitude,
        lng: event.coords.longitude,
        speed: event.coords.speed
      });
    }
  };

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

      <h2>Geo Location</h2>
      <p>Lat: {location.lat}</p>
      <p>Lng: {location.lng}</p>
      <p>Your Speed is {location.speed ? location.speed : '0'}</p>
    </>
  );
};

export default App;
