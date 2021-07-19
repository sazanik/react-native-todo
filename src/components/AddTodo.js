import React, {useState} from "react";
import {View, StyleSheet, TextInput, Button, Alert} from "react-native";
import {THEME} from "../theme";

export const AddTodo = ({onSubmit}) => {

  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (!value.trim()) Alert.alert("The field don't can empty")
    else {
      onSubmit(value)
      setValue('')
    }
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder='Enter Task Name'
        autoCorrect={false}
        autoCapitalize='none'
        // keyboardType='number-pad'
      />
      <Button
        title='Add Task'
        onPress={pressHandler}
        color={THEME.MAIN_COLOR}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
})