import React, { useState, useEffect, useContext } from 'react';
import TodosContext from './Context';
import axios from 'axios';
import uuidv4 from 'uuid/v4';

export default function TodoForm() {
  const [todo, setTodo] = useState('');

  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo('');
    }
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (currentTodo.text) {
      const resp = await axios.patch(
        `https://hooks-api-f0kgitji5.now.sh/todos/${currentTodo.id}`,
        { text: todo }
      );
      dispatch({ type: 'UPDATE_TODO', payload: resp.data });
    } else {
      const resp = await axios.post(
        'https://hooks-api-f0kgitji5.now.sh/todos',
        {
          id: uuidv4(),
          text: todo,
          complete: false
        }
      );
      dispatch({ type: 'ADD_TODO', payload: resp.data });
    }

    setTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        value={todo}
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
      />
    </form>
  );
}
