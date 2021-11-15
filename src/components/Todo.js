import React from "react";
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {AppText} from "./ui/AppText";

export const Todo = ({todo, onRemove, onOpen}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(todo.id)}
      onLongPress={() => onRemove(todo.id)}
    >
      <View style={styles.todo}>
        <AppText>
          {todo.title}
        </AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    justifyContent: 'flex-start',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  }
})
