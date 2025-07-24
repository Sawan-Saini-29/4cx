import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as IMG_CONST from "../Screen/assets";

const spleceScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#272D58', justifyContent: "center", alignItems: "center" }}>
            <Image source={IMG_CONST.SpleshIcon} style={{ width: 303, height: 176 }} />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default spleceScreen;
