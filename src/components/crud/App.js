import React, { useState, useEffect, useContext, useReducer } from 'react';
import TodosContext from './Context';
import TodosReducer from './Reducer';
import TodosList from './TodosList';
import TodoForm from './TodoForm';

export default function App() {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodosList />
    </TodosContext.Provider>
  );
}
