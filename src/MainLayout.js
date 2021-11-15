import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { THEME } from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { useScreen } from './context/screen/screenContext';

export const MainLayout = () => {
  const { todoId } = useScreen();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },

  wrapper: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 30 : 10,
  },
});
