import React from "react";
import {Button, FlatList, Image, StyleSheet, View} from "react-native";
import {AddTodo} from "../components/AddTodo";
import {Todo} from "../components/Todo";
import {THEME} from "../theme";

export const MainScreen = ({todos, addTodo, removeTodo, openTodo, clearAll}) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo}/>
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
        renderItem={({item}) => <Todo todo={item} onRemove={removeTodo} onOpen={openTodo}/>}
      />
      {!todos.length
        ? null
        : <Button title='CLEAR ALL' color={THEME.MAIN_COLOR} onPress={clearAll}/>
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