import React from "react";
import {View, StyleSheet} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Navbar} from "./components/Navbar";
import {THEME} from "./theme";
import {MainScreen} from "./screens/MainScreen";
import {TodoScreen} from "./screens/TodoScreen";
import {useScreen} from "./context/screen/screenContext";

export const MainLayout = () => {
  const {todoId} = useScreen()

  return (
    <View style={styles.wrapper}>
      <StatusBar style="auto"/>
      <Navbar title='TODO APP'/>
      <View style={styles.container}>
        {todoId ? <TodoScreen/> : <MainScreen/>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },

  wrapper: {
    flex: 1,
  }
})