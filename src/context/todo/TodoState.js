import React, {useReducer} from "react";
import {TodoContext} from "./todoContext";
import {todoReducer} from "./todoReducer";
import {
  ADD_TODO,
  EDIT_TODO, FETCH_TODOS,
  HIDE_ERROR,
  HIDE_LOADER,
  REMOVE_ALL_TODOS,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER
} from "../types";
import {useScreen} from "../screen/screenContext";
import {Alert} from "react-native";


export const TodoState = ({children}) => {
  const {changeScreen} = useScreen()

  const initialState = {
    todos: [],
    loading: false,
    error: null,
  }
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const fetchTodos = async () => {
    showLoader()
    hideError()

    try {
      const res = await fetch('https://react-native-todo-1-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })

      const data = await res.json()
      const todos = Object.keys(data || []).map(key => ({...data[key], id: key}))
      console.log('todos', todos)
      dispatch({type: FETCH_TODOS, todos})
    } catch (e) {
      showError('Something went wrong...')
      console.log(e)
    } finally {
      hideLoader()
    }
  }

  const addTodo = async title => {
    const res = await fetch('https://react-native-todo-1-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title})
    })

    const data = await res.json()
    console.log('data', data.name)
    dispatch({type: ADD_TODO, title, id: data.name})
  }
  const editTodo = async (id, title) => {
    hideError()
    try {
      await fetch(`https://react-native-todo-1-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
      })
      dispatch({type: EDIT_TODO, id, title})
    } catch (e) {
      showError('Something went wrong...')
      console.log(e)
    }

  }
  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'DELETE TASK',
      `Delete "${todo.title}" task?`,
      [
        {
          text: 'CANCEL',
          style: 'cancel'
        },
        {
          text: 'DELETE', onPress: async () => {
            changeScreen(null)
            await fetch(`https://react-native-todo-1-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {
              method: 'DELETE',
              headers: {'Content-Type': 'application/json'},
            })
            dispatch({type: REMOVE_TODO, id})
          }
        }
      ],
      {cancelable: false}
    )
  }

  const removeAllTodos = () => {
    Alert.alert(
      'DELETE TASKS',
      `Delete all tasks?`,
      [
        {
          text: 'CANCEL',
          style: 'cancel'
        },
        {
          text: 'DELETE ALL', onPress: async () => {
            await fetch(`https://react-native-todo-1-default-rtdb.europe-west1.firebasedatabase.app/todos.json`, {
              method: 'DELETE',
              headers: {'Content-Type': 'application/json'},
            })
            dispatch({type: REMOVE_ALL_TODOS})
          }
        }
      ],
      {cancelable: false}
    )
  }

  const showLoader = () => dispatch({type: SHOW_LOADER})
  const hideLoader = () => dispatch({type: HIDE_LOADER})
  const showError = error => dispatch({type: SHOW_ERROR, error})
  const hideError = () => dispatch({type: HIDE_ERROR})

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      loading: state.loading,
      error: state.error,
      fetchTodos,
      addTodo,
      removeTodo,
      removeAllTodos,
      editTodo
    }}>
      {children}
    </TodoContext.Provider>
  )
}