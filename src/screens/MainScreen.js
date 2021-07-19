import React from "react";
import {Button, FlatList, StyleSheet, View} from "react-native";
import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {THEME} from "../theme";

export const MainScreen = ({todos, addTodo, removeTodo, openTodo, clearAll}) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo}/>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo}/>}
      />
      <Button title='CLEAR ALL' color={THEME.MAIN_COLOR} onPress={clearAll}/>
    </View>
  )
}

const styles = StyleSheet.create({})