import React from 'react';

const TodosContext = React.createContext({
  todos: [
    { id: 1, text: 'Eat breakfast', completed: true },
    { id: 2, text: 'Do laundry', completed: true },
    { id: 3, text: 'Finish project', completed: false },
    { id: 4, text: 'Pick up date', completed: false },
    { id: 5, text: 'Eat dinner', completed: false },
    { id: 6, text: 'Get lucky', completed: false }
  ]
});

export default TodosContext;
