import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { globalStyles } from '../../styles/Global';

export const EditPost = ({ route, navigation }) => {
  
  const [id, setId] = useState();
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const { id, text } = route.params.post;
    setId(id);
    setNewText(text);
  }, []);

  const editPost = () => {
    const post = {
      id: id,
      text: newText,
    }
    console.log("EDIT POST:"+post);
    navigation.navigate('Posts', { post });
  }

  const deletePost = () => {
    console.log("EDIT POST:"+id);
    navigation.navigate('Posts', { id });
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.textAreaContainer}>
        <TextInput
          multiline
          autoFocus={true}
          maxLength={280}
          numberOfLines={4}
          style={globalStyles.textArea}
          onChangeText={newText => setNewText(newText)}
          value={newText} />
      </View>
      <Button
        title='Editar'
        color='#4CAF50'
        onPress={editPost}/>
      <View style={{ marginBottom: 10 }}></View>
      <Button
        title='Excluir'
        color='#F44336'
        onPress={deletePost}/>
    </View>
  );
}