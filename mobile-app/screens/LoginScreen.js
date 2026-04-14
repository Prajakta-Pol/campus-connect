import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { loginUser } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await loginUser({ identifier, password });

    if (res.token) {
      await AsyncStorage.setItem("token", res.token);
      Alert.alert("Login successful");
    } else {
      Alert.alert(res.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="USN or Email" onChangeText={setIdentifier}/>
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword}/>
      <Button title="Login" onPress={handleLogin}/>
    </View>
  );
}