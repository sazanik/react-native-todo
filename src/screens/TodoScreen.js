import React, {useState} from "react";
import {StyleSheet, View, Button} from "react-native";
import {THEME} from "../theme";
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";

export const TodoScreen = ({onRemove, goBack, todo, onSave}) => {
  const [modal, setModal] = useState(false)

  const saveHandler = title => {
    onSave(todo.id, title)
    setModal(false)
  } 

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
        <Button title='EDIT' onPress={() => setModal(true)} color={THEME.MAIN_COLOR}/>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title='BACK'
            color={THEME.GREY_COLOR}
            onPress={goBack}
          />
        </View>

        <View style={styles.button}>
          <Button
            title='DELETE'
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
          />
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
    width: '40%'
  },

  card: {
    marginBottom: 20,
    padding: 10,
  },

  title: {
    fontSize: 20
  }
})