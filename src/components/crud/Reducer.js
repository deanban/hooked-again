import TodosContext from './Context';

export default function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_TODO':
      const toggleTodos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...action.payload, completed: !action.payload.completed }
          : todo
      );
      return {
        ...state,
        todos: toggleTodos
      };

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };

    default:
      return state;
  }
}
