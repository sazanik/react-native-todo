import React, {useEffect, useState} from "react";
import {StyleSheet, View, Dimensions} from "react-native";
import {THEME} from "../theme";
import {FontAwesome, AntDesign} from "@expo/vector-icons";
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";
import {AppButton} from "../components/ui/AppButton";
import {useScreen} from "../context/screen/screenContext";
import {useTodos} from "../context/todo/todoContext";

export const TodoScreen = () => {
  const {todos, editTodo, removeTodo} = useTodos()
  const {todoId, changeScreen} = useScreen()

  console.log(todos, todoId)

  const todo = todos.find(t => t.id === todoId)

  const [modal, setModal] = useState(false)
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width > 600 ? Dimensions.get('window').width / 2.22 : Dimensions.get('window').width / 2.5)

  const saveHandler = title => {
    editTodo(todoId, title)
    setModal(false)
  }

  useEffect(() => {
    const update = () => {
      setButtonWidth(Dimensions.get('window').width > 600 ? Dimensions.get('window').width / 2.22 : Dimensions.get('window').width / 2.5)
    }
    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  })

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false)}
        value={todo.title}
        onSave={saveHandler}
      />

      <AppCard styles={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton
          onPress={() => setModal(true)}
          color={THEME.MAIN_COLOR}>
          <FontAwesome name='edit' size={20}/>
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={{width: buttonWidth}}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          >
            <AntDesign name='back' size={20} color='white'/>
          </AppButton>
        </View>

        <View style={{width: buttonWidth}}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name='remove' size={20} color='white'/>
          </AppButton>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: Dimensions.get('window').width > 400 ? Dimensions.get('window').width / 2.2 : Dimensions.get('window').width / 2.5
  },

  card: {
    marginBottom: 20,
    padding: 10,
  },

  title: {
    fontSize: 20
  }
})