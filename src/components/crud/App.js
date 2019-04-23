import React, { useState, useEffect, useContext, useReducer } from 'react';
import TodosContext from './Context';
import TodosReducer from './Reducer';
import TodosList from './TodosList';
import TodoForm from './TodoForm';
import axios from 'axios';

const useApi = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(endpoint)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return data;
};

export default function App() {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer, initialState);

  const todoApi = useApi('https://hooks-api-f0kgitji5.now.sh/todos');

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: todoApi
    });
  }, [todoApi]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodosList />
    </TodosContext.Provider>
  );
}
