import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as IMG_CONST from '../Screen/assets';

const LandingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <Image source={IMG_CONST.SpleshIcon} style={styles.logo} />

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => navigation.navigate('SignUpScreen')}
          >
            <Image source={IMG_CONST.SignUp} style={styles.buttonImage} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonWrapper, styles.loginButtonBackground]}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Image source={IMG_CONST.LogIn} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272D58',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    height: 400,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 303,
    height: 176,
    resizeMode: 'contain',
  },
  buttonGroup: {
    alignItems: 'center',
  },
  buttonWrapper: {
    marginBottom: 10,
  },
  loginButtonBackground: {
    borderRadius: 6,
  },
  buttonImage: {
    width: 319,
    height: 47,
    resizeMode: 'contain',
  },
});

export default LandingScreen;
