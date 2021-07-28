import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";


import {Navbar} from "./src/components/Navbar";
import {MainScreen} from "./src/screens/MainScreen";
import {TodoScreen} from "./src/screens/TodoScreen";
import {StatusBar} from "expo-status-bar";
import {THEME} from "./src/theme";

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    // {id: '1', title: 'Learn'},
  ])

  if (!isReady) {
    return <AppLoading
      startAsync={loadApplication}
      onFinish={() => setIsReady(true)}
      onError={err => console.log(err)}
    />
  }


  const addTodo = title => {
    const newTodo = {
      id: Date.now().toString(),
      title
    }
    setTodos(prev => [...prev, newTodo])
  }

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)
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
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
          }
        }
      ],
      {cancelable: false}
    )
  }

  const updateTodo = (id, title) => {
    setTodos(prev => prev.map(todo => {
        if (todo.id === id) todo.title = title
        return todo
      })
    )
  }

  const clearAll = () => {
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
          text: 'DELETE ALL', onPress: () => {
            setTodoId(null)
            setTodos([])
          }
        }
      ],
      {cancelable: false}
    );
  }

  let content = (
    <MainScreen
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
      clearAll={clearAll}
      todos={todos}
    />
  )


  if (todoId) {
    const selectedTodo = todos.find(t => t.id === todoId)
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
      <StatusBar style="auto"/>
      <Navbar title='TODO APP'/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  }
})
