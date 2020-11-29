import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { globalStyles } from '../../styles/Global';
import { ApiService } from '../services/ApiService';

export const Register = ({ navigation }) => {
  const userService = new ApiService('register');
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);  
  const [password, setPassword] = useState(null);

  const isFormFilled = (name !== null && email !== null && password !== null);

  const createUser = async () => {
    if (isFormFilled) {
      const data = {
        name: name,
        email: email,
        password: password, 
      }
      await userService.createOne(data);
      navigation.navigate('Login');
    } else {
      Alert.alert('Erro ao cadastrar', 'Preecha todos os campos');
    }
  }

  return (
    <View style={globalStyles.container}>
      <TextInput
        placeholder='Nome'
        style={globalStyles.input}
        onChangeText={name => setName(name)}
        value={name}/>
      <TextInput
        autoCompleteType="email"
        placeholder='E-mail'
        style={globalStyles.input}
        onChangeText={email => setEmail(email)}
        value={email}/>
      <TextInput
        autoCompleteType="password"
        secureTextEntry={true}
        placeholder='Senha'
        style={globalStyles.input}
        onChangeText={password => setPassword(password)}
        value={password}/>

      <Button
        title='Cadastrar'
        color='#4CAF50'
        onPress={createUser}/>
    </View>
  );
}