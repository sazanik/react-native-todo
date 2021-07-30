import React, {useState} from "react";
import {View, TextInput, StyleSheet, Modal, Alert} from "react-native";
import {THEME} from "../theme";
import {AppButton} from "./ui/AppButton";

export const EditModal = ({visible, onCancel, value, onSave}) => {


  const [title, setTitle] = useState(value)
  const saveHandler = () => {
    if (title.trim().length === 0) {
      Alert.alert('Error!', 'This Field do not can empty!')
    } else {
      onSave(title)
    }
  }

  const cancelHandler = () => {
    setTitle(value)
    onCancel()
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent={false}
    >
      <View style={style.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={style.input}
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Input name task'
          maxLength={100}
        />
        <View style={style.buttons}>
          <AppButton onPress={saveHandler} color={THEME.MAIN_COLOR}>SAVE</AppButton>
          <AppButton onPress={cancelHandler} color={THEME.GREY_COLOR}>CANCEL</AppButton>
        </View>
      </View>
    </Modal>
  )
}

const style = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  },

  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})