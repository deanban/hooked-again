import React, { useContext } from 'react';
import TodosContext from './Context';
import axios from 'axios';

export default function TodosList() {
  const { state, dispatch } = useContext(TodosContext);

  const title =
    state.todos.length > 0
      ? `${state.todos.length} thing to do`
      : 'Nothing to do';

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold p-6">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
          >
            <span
              onDoubleClick={async () => {
                const resp = await axios.patch(
                  `https://hooks-api-f0kgitji5.now.sh/todos/${todo.id}`,
                  {
                    complete: !todo.complete
                  }
                );
                dispatch({ type: 'TOGGLE_TODO', payload: resp.data });
              }}
              className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                'line-through text-grey-darkest'}`}
            >
              {todo.text}
            </span>

            <button
              onClick={() => dispatch({ type: 'SET_CURRENT', payload: todo })}
            >
              <img
                src="http://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
                className="h-6"
              />
            </button>
            <button
              onClick={async () => {
                await axios.delete(
                  `https://hooks-api-f0kgitji5.now.sh/todos/${todo.id}`
                );
                dispatch({
                  type: 'REMOVE_TODO',
                  payload: todo
                });
              }}
            >
              <img
                src="http://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
                className="h-6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
