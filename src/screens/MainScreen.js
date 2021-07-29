import React, {useEffect, useState} from "react";
import {Dimensions, FlatList, Image, StyleSheet, View} from "react-native";
import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {THEME} from "../theme";
import {AppButton} from "../components/ui/AppButton";
import {useTodos} from "../context/todo/todoContext";
import {useScreen} from "../context/screen/screenContext";

export const MainScreen = () => {
  const {todos, addTodo, removeTodo, removeAllTodos} = useTodos()
  const {changeScreen} = useScreen()

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

  useEffect(() => {
    const update = () => {
      setDeviceWidth(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)
    }
    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  })

  return (
    <View>
      <AddTodo onSubmit={addTodo}/>
      <View style={{width: deviceWidth}}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={todos}
          ListEmptyComponent={() => {
            return (
              <View style={styles.imageWrap}>
                <Image
                  style={styles.image}
                  source={require('../../assets/paper.png')}
                />
              </View>
            )
          }}
          renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen}/>}
        />
      </View>

      {!todos.length
        ? null
        :
        <AppButton color={THEME.MAIN_COLOR} onPress={removeAllTodos}>
          CLEAR ALL
        </AppButton>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    imageWrap: {
      height: 500,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },

    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    }
  }
)