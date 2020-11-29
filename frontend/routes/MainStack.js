import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import { Login } from '../src/views/Login';
import { Register } from '../src/views/Register';
import { Home } from '../src/views/Home';
import { Posts } from '../src/views/Posts';
import { CreatePost } from '../src/views/CreatePost';
import { EditPost } from '../src/views/EditPost';

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{ headerShown: false }} />
      <Stack.Screen 
        name="Register"
        component={Register}
        options={{ title: 'Cadastrar novo usuário' }} />
      <Stack.Screen 
        name="Home"
        component={Home} />
      <Stack.Screen 
        name="Posts"
        component={Posts}
        options={{ title: 'Meus posts' }}/>
      <Stack.Screen 
        name="CreatePost"
        component={CreatePost}
        options={{ title: 'Criar um novo post' }}/>
      <Stack.Screen 
        name="EditPost"
        component={EditPost}
        options={{ title: 'Editar um post' }}/>
    </Stack.Navigator>
  );
}