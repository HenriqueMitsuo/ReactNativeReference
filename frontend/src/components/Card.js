import React from 'react';
import { View, StyleSheet } from 'react-native';

export const Card = ({children}) => {
  return (
    <View style={style.card}>
      <View style={style.cardContent}>
        { children }
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  card: {
    borderRadius: 5,
    elevation: 4,
    marginHorizontal: 6,
    marginVertical: 6,
    backgroundColor: '#ffffff',
    shadowColor: '#333333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1
    }
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 20
  }
});