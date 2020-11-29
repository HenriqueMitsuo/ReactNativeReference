import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { globalStyles } from '../../styles/Global';

export const CreatePost = ({ navigation }) => {
  const [text, setText] = useState('');

  const postHandler = () => {
    navigation.navigate('Posts', { text });
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.textAreaContainer}>
        <TextInput
          multiline
          autoFocus={true}
          maxLength={280}
          numberOfLines={4}
          placeholder='Conte sua historia'
          style={globalStyles.textArea}
          onChangeText={text => setText(text)}
          value={text} />
      </View>
      <Button 
        title='Postar'
        color='#4CAF50'
        onPress={postHandler}/>
    </View>
  );
}