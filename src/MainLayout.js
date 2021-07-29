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
    <View>
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
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  }
})