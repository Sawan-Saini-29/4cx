import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as IMG_CONST from '../../components/assets';
import ApiService from '../../apiService/apiService';
import Scale, { verticalScale } from '../../components/Scale';

const LoginScreen = () => {
  const navigation = useNavigation() as any;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Username and password are required.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);

    try {
      const payload = {
        username,
        password,
      }
      const response = await ApiService.post<any>(
        "user/login",
        payload,
        'json' 
      );
      console.log('✅ Login success:', response);
      // TODO: Check response status or token here before navigating
      if(response) {
      navigation.navigate('HomeScreen');
      }
    } catch (error: any) {
      console.log('❌ Network or parsing error:', error.message);
      Alert.alert('Login Failed', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Image source={IMG_CONST.SpleshIcon} style={styles.logoImage} />

      <View style={styles.card}>
        {/* Email Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#aaa"
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            autoCapitalize="none"
          />
        </View>

        {/* Password Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#aaa"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
        </View>

        {/* Login Button or Loader */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <TouchableOpacity onPress={handleLogin}>
            <Image source={IMG_CONST.LogInButton} style={styles.loginButton} />
          </TouchableOpacity>
        )}

        {/* Forgot Password */}
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </View>

      {/* Signup Prompt */}
      <Text style={styles.signupPrompt}>
        First time?{' '}
        <Text style={styles.signupLink}>
          Sign Up
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#272D58',
    alignItems: 'center',
    padding: Scale(20),
    justifyContent:"center"
  },
  logoImage: {
    width: Scale(209),
    height: Scale(121),
  },
  card: {
    width: Scale(373),
    backgroundColor: 'rgba(53, 53, 53, 1)',
    borderRadius: 10,
    marginTop: verticalScale(60),
    alignItems: 'center',
  },
  inputGroup: {
    width: Scale(351),
    marginTop: verticalScale(20),
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
    marginBottom: Scale(5),
  },
  input: {
    width: '100%',
    height: verticalScale(36),
    backgroundColor: 'rgba(35, 35, 35, 1)',
    color: '#fff',
    paddingHorizontal: Scale(10),
    borderRadius: 6,
  },
  loginButton: {
    width: Scale(351),
    height: Scale(44),
    alignSelf: 'center',
    marginTop: verticalScale(20),
    marginBottom: Scale(20),
  },
  loader: {
    marginTop: verticalScale(20),
    marginBottom: Scale(20),
  },
  forgotPasswordText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '400',
    textAlign: 'center',
    color: 'rgba(226, 224, 224, 1)',
    marginBottom: Scale(10),
  },
  signupPrompt: {
    fontSize: 20,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
    marginTop: verticalScale(20),
  },
  signupLink: {
    color: 'rgba(0, 136, 255, 1)',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
