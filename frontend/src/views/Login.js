import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { globalStyles } from '../../styles/Global';
import { ApiService } from '../services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({ navigation }) => {
  const loginService = new ApiService('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    const data = await loginService.login({
      email: email,
      password: password
    });
    if (data.user) {
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('token', data.token);
      navigation.navigate('Home');
    } else {
      Alert.alert('Login invalido!', 'Preencha os campos');
    }
  }

  const navHandler = () => {
    navigation.navigate('Register');
  }

  return (
    <View style={{ ...globalStyles.container, ...globalStyles.loginContainer }}>
      <Image
        style={globalStyles.loginImg}
        source={require('../../assets/icon.png')}/>

      <TextInput
        autoCompleteType="email"
        placeholder='E-mail'
        autoCapitalize='none'
        style={globalStyles.input}
        onChangeText={email => setEmail(email)}
        value={email}/>
      <TextInput
        autoCompleteType="password"
        secureTextEntry={true}
        placeholder='Senha'
        autoCapitalize='none'
        style={globalStyles.input}
        onChangeText={password => setPassword(password)}
        value={password}/>
      <TouchableOpacity
        style={{ backgroundColor: '#0D47A1', ...globalStyles.loginBtns}}
        onPress={loginHandler}> 
        <Text
          style={ globalStyles.loginBtnContent }>
          login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: '#2196F3', ...globalStyles.loginBtns}}
        onPress={navHandler}>
        <Text
          style={ globalStyles.loginBtnContent }>
          cadastrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}