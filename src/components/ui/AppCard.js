import React from "react";
import {StyleSheet, View} from "react-native";


export const AppCard = props => (
  <View style={{...styles.default, ...props.styles}}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: .3,
    shadowOffset: {width: 2, height: 2},
    elevation: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  }

})