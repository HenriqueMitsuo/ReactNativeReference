import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { Card } from '../components/Card';
import { globalStyles } from '../../styles/Global';

const fakePosts = [
  { id: 99, name: 'John Doe', text: 'Proin dapibus ornare velit eu maximus. Aenean nec aliquet massa.' },
  { id: 98, name: 'Mary Doe', text: 'Aliquam lacus sapien, tristique sed mollis ac, dictum eget urna.' }
];

export const Home = ({ navigation }) => {
  const navHandler = () => {
    navigation.navigate('Posts');
  }

  return (
    <View style={globalStyles.container}>
      <Button title='Meus Posts' onPress={navHandler}/>
      <FlatList 
        data={fakePosts}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <TouchableOpacity>
            <Card>
              <Text>Autor: { item.name }</Text>
              <Text>"{ item.text }"</Text>
            </Card>
          </TouchableOpacity>
        )}/>
    </View>
  );
}