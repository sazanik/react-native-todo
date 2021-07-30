import {
  ADD_TODO,
  EDIT_TODO,
  FETCH_TODOS,
  HIDE_ERROR,
  HIDE_LOADER,
  REMOVE_ALL_TODOS,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER
} from "../types";

const handlers = {
  [ADD_TODO]: (state, {id, title}) => ({
    ...state,
    todos: [...state.todos, {id, title}]
  }),
  [REMOVE_TODO]: (state, {id}) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  }),

  [REMOVE_ALL_TODOS]: state => ({...state, todos: []}),

  [EDIT_TODO]: (state, {id, title}) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === id) todo.title = title
      return todo
    })
  }),
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [HIDE_LOADER]: state => ({...state, loading: false}),
  [SHOW_ERROR]: (state, {error}) => ({...state, error}),
  [HIDE_ERROR]: state => ({...state, error: null}),
  [FETCH_TODOS]: (state, {todos}) => ({...state, todos}),


  DEFAULT: state => state
}

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}