import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as IMG_CONST from "../Screen/assets";

const LandingScreen = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#272D58', justifyContent: "center", alignItems: "center" }}>
            <View style={{height:400,justifyContent:"space-between",alignItems:"center"}}>
            <Image source={IMG_CONST.SpleshIcon} style={{ width: 303, height: 176 }} />
            <View>
                <TouchableOpacity style={{marginBottom:10}}>
                    <Image source={IMG_CONST.SignUp} style={{ width: 319, height: 47 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 319, height: 47, borderRadius: 6, backgroundColor: "#FFFFFF" }}>
                    <Image source={IMG_CONST.LogIn} style={{ width: 319, height: 47 }} />
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
});

export default LandingScreen;
