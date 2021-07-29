import React, {useReducer} from "react";
import {TodoContext} from "./todoContext";
import {todoReducer} from "./todoReducer";
import {ADD_TODO, EDIT_TODO, REMOVE_ALL_TODOS, REMOVE_TODO} from "../types";
import {useScreen} from "../screen/screenContext";
import {Alert} from "react-native";

export const TodoState = ({children}) => {
  const {changeScreen} = useScreen()

  const initialState = {
    todos: []
  }
  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = title => dispatch({type: ADD_TODO, title})
  const editTodo = (id, title) => dispatch({type: EDIT_TODO, id, title})
  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)
    Alert.alert(
      'DELETE TASK',
      `Delete "${todo.title}" task?`,
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'DELETE', onPress: () => {
            changeScreen(null)
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
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'DELETE ALL', onPress: () => dispatch({type: REMOVE_ALL_TODOS})
        }
      ],
      {cancelable: false}
    )
  }

  return (
    <TodoContext.Provider value={{
      todos: state.todos, addTodo, removeTodo, removeAllTodos, editTodo
    }}>
      {children}
    </TodoContext.Provider>
  )
}