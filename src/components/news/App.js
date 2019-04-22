import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchInputRef = useRef();

  useEffect(() => {
    getResults();

    // ⬇️ can't use async inside useEffect
    //.then() works fine
    // const resp = await axios.get(
    //   'http://hn.algolia.com/api/v1/search?query=reacthooks'
    // );
    // // .then(resp => setResults(resp.data.hits));
    // setResults(resp.data.hits);
  }, []);
  // ⬆ empty array for running useEffect only on mount and unmount
  // now it runs on mount and when query state is updated

  const getResults = async () => {
    setLoading(true);

    try {
      const resp = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(resp.data.hits);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    getResults();
  };

  const handleClear = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="search"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url}>{result.title}</a>
            </li>
          ))}
        </ul>
      )}
      {error && <div>{error.message}</div>}
    </>
  );
}
