import React from "react";
import {StyleSheet, View, Text, Button} from "react-native";
import {THEME} from "../theme";
import {AppCard} from "../components/ui/AppCard";

export const TodoScreen = ({goBack, todo}) => {
  return (
    <View>
      <AppCard styles={styles.card}>
        <Text style={styles.title}>{todo.title}</Text>
        <Button title='EDIT' onPress={''}/>
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
            onPress={() => console.log('To remove')}
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