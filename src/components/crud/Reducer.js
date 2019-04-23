export default function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_TODO':
      const toggleTodos = state.todos.map(todo =>
        todo.id === action.payload.id ? action.payload : todo
      );
      return {
        ...state,
        todos: toggleTodos
      };

    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload
      };

    case 'REMOVE_TODO':
      return {
        ...state,

        currentTodo:
          state.currentTodo.id === action.payload.id ? {} : state.currentTodo,

        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };

    case 'ADD_TODO':
      if (!action.payload) return state;

      if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state;
      }

      // const newTodo = {
      //   id: uuid(),
      //   text: action.payload,
      //   completed: false
      // };

      const addedTodos = [...state.todos, action.payload];

      return {
        ...state,
        todos: addedTodos
      };

    case 'SET_CURRENT':
      return {
        ...state,
        currentTodo: action.payload
      };

    case 'UPDATE_TODO':
      if (!action.payload) return state;

      if (state.todos.findIndex(todo => todo.text === action.payload) > -1) {
        return state;
      }

      // const update = { ...state.currentTodo, text: action.payload };

      const update = { ...action.payload };

      const updatedTodoIndex = state.todos.findIndex(
        todo => todo.id === state.currentTodo.id
      );

      const updatedTodo = [
        ...state.todos.slice(0, updatedTodoIndex),
        update,
        ...state.todos.slice(updatedTodoIndex + 1)
      ];

      return {
        ...state,
        currentTodo: {},
        todos: updatedTodo
      };

    default:
      return state;
  }
}
