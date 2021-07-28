import React, {useState} from "react";
import {View, StyleSheet, TextInput, Alert, Keyboard} from "react-native";
import {THEME} from "../theme";
import {AntDesign} from '@expo/vector-icons';

export const AddTodo = ({onSubmit}) => {

  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (!value.trim()) Alert.alert("The field don't can empty")
    else {
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
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

      <AntDesign.Button
        name="pluscircleo"
        size={24}
        title='Add Task'
        onPress={pressHandler}
        color='white'
        style={{backgroundColor: THEME.GREEN_COLOR}}
      >
        ADD
      </AntDesign.Button>
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