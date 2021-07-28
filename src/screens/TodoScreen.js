import React, {useState} from "react";
import {StyleSheet, View, Button, Dimensions} from "react-native";
import {THEME} from "../theme";
import {FontAwesome, AntDesign} from "@expo/vector-icons";
import {AppCard} from "../components/ui/AppCard";
import {EditModal} from "../components/EditModal";
import {AppTextBold} from "../components/ui/AppTextBold";
import {AppButton} from "../components/ui/AppButton";

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
        <AppButton
          onPress={() => setModal(true)}
          color={THEME.MAIN_COLOR}>
          <FontAwesome name='edit' size={20}/>
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={goBack}
          >
            <AntDesign name='back' size={20} color='white'/>
          </AppButton>
        </View>

        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(todo.id)}
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
    width: Dimensions.get('window').width / 2.4,
    // width: Dimensions.get('window').width > 400 ? 150 : 100

  },

  card: {
    marginBottom: 20,
    padding: 10,
  },

  title: {
    fontSize: 20
  }
})