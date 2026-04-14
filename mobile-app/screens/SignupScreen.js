import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { signupUser } from '../services/api';

export default function SignupScreen() {
  const [form, setForm] = useState({
    full_name: '',
    usn: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    current_year: ''
  });

  const handleSignup = async () => {
    const res = await signupUser(form);
    Alert.alert(res.message || "Signup done");
  };

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={(t)=>setForm({...form, full_name:t})}/>
      <TextInput placeholder="USN" onChangeText={(t)=>setForm({...form, usn:t})}/>
      <TextInput placeholder="Email" onChangeText={(t)=>setForm({...form, email:t})}/>
      <TextInput placeholder="Password" secureTextEntry onChangeText={(t)=>setForm({...form, password:t})}/>
      <TextInput placeholder="Phone" onChangeText={(t)=>setForm({...form, phone:t})}/>
      <TextInput placeholder="Department" onChangeText={(t)=>setForm({...form, department:t})}/>
      <TextInput placeholder="Year" onChangeText={(t)=>setForm({...form, current_year:t})}/>
      
      <Button title="Signup" onPress={handleSignup}/>
    </View>
  );
}