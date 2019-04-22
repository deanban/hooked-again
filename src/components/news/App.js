import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(resp => setResults(resp.data.hits));
  }, []);
  // ⬆ empty array for running useEffect only on mount  ️

  return (
    <>
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
