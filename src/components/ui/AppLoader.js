import React from "react";
import {ActivityIndicator, View, StyleSheet} from "react-native";
import {THEME} from "../../theme";

export const AppLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={THEME.MAIN_COLOR}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})