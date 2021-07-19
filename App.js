import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Navbar} from "./src/components/Navbar";
import {MainScreen} from "./src/screens/MainScreen";
import {TodoScreen} from "./src/screens/TodoScreen";


export default function App() {
  const [todoId, setTodoId] = useState('2')
  const [todos, setTodos] = useState([
    {id: '1', title: 'Learn'},
    {id: '2', title: 'Work'},
  ])


  const addTodo = title => {
    const newTodo = {
      id: Date.now().toString(),
      title
    }
    setTodos(prev => [...prev, newTodo])
  }

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }


  const clearAll = () => {
    setTodos([])
  }

  let content =
    <MainScreen
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
      clearAll={clearAll}
      todos={todos}
    />

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = <TodoScreen goBack={() => setTodoId(null)} todo={selectedTodo}/>
  }

  return (
    <View>
      <Navbar title='TODO APP'/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  }
})
