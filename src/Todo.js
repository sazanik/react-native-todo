import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";

export const Todo = ({todo, onRemove}) => {
  return (
    <TouchableOpacity
      activeOpacity={.5}
      onPress={() => console.log(todo.id)}
      // onLongPress={() => onRemove(todo.id)}
      onLongPress={onRemove.bind(null, todo.id)}
    >
      <View style={styles.todo}>
        <Text>
          {todo.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  }
})