import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyles } from '../../styles/Global';
import { MaterialIcons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Card } from '../components/Card';

import { ApiService } from '../services/ApiService';

export const Posts = ({ route, navigation }) => {
  const postsService = new ApiService('posts');
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { id } = JSON.parse(await AsyncStorage.getItem('user'));
    
    setPosts(await postsService.queryAll({
      user_id: id,
      with_user: true
    }));
  }

  const createPost = async (text) => {
    const { id } = JSON.parse(await AsyncStorage.getItem('user'));
    const data = {
      user_id: id,
      text: text,
    };
    await postsService.createOne(data);
    fetchPosts();
  }

  const updatePost = async ({id, text}) => {
    const data = {
      text: text,
    };
    await postsService.updateOne(id, data);
    fetchPosts();
  }

  const deletePost = async (id) => {
    await postsService.deleteOne(id);
    fetchPosts();
  }

  const formatDate = (d) => {
    const date = new Date(d);
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  }

  useEffect(() => {
    if (route.params?.text) createPost(route.params.text);
  }, [route.params?.text]);

  useEffect(() => {
    if (route.params?.post) updatePost(route.params.post);
  }, [route.params?.post]);

  useEffect(() => {
    if (route.params?.id) deletePost(route.params.id);
  }, [route.params?.id]);

  const navHandler = () => {
    navigation.navigate('CreatePost');
  }

  const editPostNavHandler = (post) => {
    navigation.navigate('EditPost', { post });
  }

  if (!isLoading) {
    return (
      <View style={globalStyles.container}>
        <MaterialIcons
          name='add'
          size={24}
          style={globalStyles.createPost}
          onPress={navHandler} />

        <FlatList 
          data={posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => editPostNavHandler(item)}>
              <Card>
                <Text>Autor: { item.user.name }</Text>
                <Text>"{ item.text }"</Text>
                <Text>{ formatDate(item.updated_at) }</Text>
              </Card>
            </TouchableOpacity>
          )}/>
      </View>
    );
  } else {
    return (
      <AppLoading
        startAsync={fetchPosts}
        onFinish={() => setIsLoading(false)}/>
    )
  }
}