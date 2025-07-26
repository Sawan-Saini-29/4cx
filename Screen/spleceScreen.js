import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as IMG_CONST from '../Screen/assets';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={IMG_CONST.SpleshIcon} style={styles.logo} />
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
  logo: {
    width: 303,
    height: 176,
  },
});

export default SplashScreen;
