import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useState } from 'react';
import { signupUser } from '../services/api';
import { useRouter } from 'expo-router';

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    full_name: '',
    usn: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    current_year: '',
  });

  const handleSignup = async () => {
    const res = await signupUser(form);

    if (res.message === "User created") {
      Alert.alert("Signup successful");
      router.push('/login');
    } else {
      Alert.alert(res.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>Create Account 🚀</Text>

        {Object.keys(form).map((key) => (
          <TextInput
            key={key}
            placeholder={key.replace("_", " ").toUpperCase()}
            placeholderTextColor="#94A3B8"
            style={styles.input}
            secureTextEntry={key === 'password'}
            onChangeText={(text) => setForm({ ...form, [key]: text })}
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => router.push('/login')}>
          Already have an account? Login
        </Text>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#0B1220',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#F8FAFC',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#6366F1',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#38BDF8',
    textAlign: 'center',
    marginTop: 15,
  },
});