import React, {useState} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import {Navbar} from "./src/Navbar";
import {AddTodo} from "./src/AddTodo";
import {Todo} from "./src/Todo";


export default function App() {
  const [todos, setTodos] = useState([])

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

  const clearAll = e => {
    setTodos([])
  }

  return (
    <View>
      <Navbar title='TODO APP'/>
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo}/>
        <FlatList
          data={todos}
          renderItem={({item}) => <Todo todo={item} onRemove={removeTodo}/>}
          keyExtractor={item => item.id.toString()}
        />
        <Button title='CLEAR ALL' onPress={clearAll}/>
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
