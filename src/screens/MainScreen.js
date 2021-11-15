import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';
import { AppButton } from '../components/ui/AppButton';
import { useTodos } from '../context/todo/todoContext';
import { useScreen } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';


export const MainScreen = () => {
  const { todos, addTodo, removeTodo, removeAllTodos, fetchTodos, loading, error } = useTodos();
  const { changeScreen } = useScreen();

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);

  const loadTodos = useCallback(async () => fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => setDeviceWidth(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2);
    const subscription = Dimensions.addEventListener('change', update);
    return () => subscription?.remove();
  });

  if (loading) return <AppLoader />;
  if (error) {
    return (
      <View style={styles.container}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton style={styles.button} onPress={loadTodos}>REPEAT DOWNLOAD</AppButton>
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      <View style={{ width: deviceWidth }}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={todos}
          ListEmptyComponent={() => (
            <View style={styles.imageWrap}>
              <Image
                style={styles.image}
                source={require('../../assets/note.png')}
              />
            </View>
          )}
          renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />}
        />
      </View>

      {!todos.length
        ? null
        : <AppButton color={THEME.MAIN_COLOR} onPress={removeAllTodos}>
          CLEAR ALL
        </AppButton>
      }
    </View>
  );
};

const styles = StyleSheet.create({
    imageWrap: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 600,
      padding: 10,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    error: {
      fontSize: 20,
      color: THEME.DANGER_COLOR,
      textTransform: 'uppercase',
      marginBottom: 20,
    },
  },
);
