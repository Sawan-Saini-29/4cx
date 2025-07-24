import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    CheckBox,
    Linking,
    ScrollView,
    Image
} from 'react-native';
import * as IMG_CONST from "../Screen/assets";

const SingUpScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={IMG_CONST.SpleshIcon} style={{ width: 133, height: 77, marginTop: 40 }} />
            <View style={styles.card}>
                <Text style={styles.title}>Create Your Account</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <View style={{ width: 36, height: 36, borderRadius: 100, backgroundColor: "rgba(52, 59, 134, 1)", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontWeight: "400", fontSize: 24, lineHeight: "100%", color: "rgba(255, 255, 255, 1)" }}>1</Text>
                        </View>
                        <Text style={{ fontWeight: "400", fontSize: 12, lineHeight: "100%", color: "rgba(255, 255, 255, 1)" }}>Step 1</Text>
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <View style={{ width: 36, height: 36, borderRadius: 100, backgroundColor: "rgba(52, 59, 134, 1)", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontWeight: "400", fontSize: 24, lineHeight: "100%", color: "rgba(255, 255, 255, 1)" }}>2</Text>
                        </View>
                        <Text style={{ fontWeight: "400", fontSize: 12, lineHeight: "100%", color: "rgba(255, 255, 255, 1)" }}>Step 2</Text>
                    </View>
                </View>
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar} />
                </View>
                <View style={{ height: 60, width: 351, marginTop: 20, alignSelf: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: 500, fontSize: 14, lineHeight: "100%", color: "rgba(255, 255, 255, 1)" }}>Username</Text>
                    <TextInput
                        placeholder="Enter Username"
                        style={styles.input}
                        placeholderTextColor="#aaa"

                    />
                </View>

                <View style={{ height: 60, width: 351, marginTop: 20, alignSelf: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: 500, fontSize: 14, lineHeight: "100%", color: "rgba(255, 255, 255, 1)" }}>Email</Text>
                    <TextInput
                        placeholder="Enter Email"
                        style={styles.input}
                        placeholderTextColor="#aaa"

                    />
                </View>

                <View style={{ height: 60, width: 351, marginTop: 20, alignSelf: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: 500, fontSize: 14, lineHeight: "100%", color: "rgba(255, 255, 255, 1)" }}>Password</Text>
                    <TextInput
                        placeholder="Enter Password"
                        style={styles.input}
                        placeholderTextColor="#aaa"

                    />
                </View>

                <View style={{ height: 60, width: 351, marginTop: 20, alignSelf: "center", justifyContent: "space-between" }}>
                    <Text style={{ fontWeight: 500, fontSize: 14, lineHeight: "100%", color: "rgba(255, 255, 255, 1)" }}>Referral Code (Optional)</Text>
                    <TextInput
                        placeholder="Enter Referral Code"
                        style={styles.input}
                        placeholderTextColor="#aaa"
                    />
                </View>

                <View style={{ width: 335, height: 60, alignSelf: "center", flexDirection: "row", marginTop: 20 }}>
                    <View style={{ width: 22, height: 22, borderRadius: 2, backgroundColor: "#000" }}></View>
                    <View style={{ width: 300 }}>
                        <Text style={{ fontWeight: "400", lineHeight: "100%", letterSpacing: 0.5, fontSize: 16, marginLeft: 5, color: "rgba(251, 252, 255, 1)" }}>You are 19+ and agree to the <Text style={{ textDecorationLine: "underline" }}>Terms of Service,</Text><Text style={{ textDecorationLine: "underline" }}> Privacy Policy</Text> and <Text style={{ textDecorationLine: "underline" }}>Sweepstakes Policy  </Text> </Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Image source={IMG_CONST.ContinueButton} style={{ width: 319, height: 36, alignSelf: "center", marginBottom: 20, marginTop: 20 }} />
                </TouchableOpacity>
            </View>
            <Text style={{fontSize:20,lineHeight:"100%",fontWeight:"400",color:"rgba(255, 255, 255, 1)",marginTop:20}}>Already have an account? <Text style={{fontSize:20,lineHeight:"100%",fontWeight:"400",color:"rgba(0, 136, 255, 1)",textDecorationLine:"underline"}}>Log In</Text></Text>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#272D58',
        alignItems: 'center',
        padding: 20,

    },
    logo: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        width: 373,
        backgroundColor: 'rgba(53, 53, 53, 1)',
        borderRadius: 10,
        marginTop: 30
    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    step: {
        alignItems: 'center',
    },
    stepCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepNumber: {
        color: '#fff',
        fontWeight: 'bold',
    },
    stepLabel: {
        color: '#ccc',
        fontSize: 12,
        marginTop: 4,
    },
    progressBarContainer: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(142, 142, 147, 1)',
        borderRadius: 4,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    progressBar: {
        width: '50%',
        height: '100%',
        backgroundColor: 'rgba(52, 59, 134, 1)',
        borderRadius: 4,
    },
    title: {
        fontSize: 24,
        color: 'rgba(255, 255, 255, 1)',
        marginBottom: 15,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: "100%",
        marginTop: 10
    },
    label: {
        color: '#f1c40f',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        width: 351,
        height: 36,
        backgroundColor: 'rgba(35, 35, 35, 1)',
        color: '#fff',
        padding: 10,
        borderRadius: 6,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 15,
    },
    checkboxText: {
        color: '#ccc',
        marginLeft: 10,
        flex: 1,
        fontSize: 16,
        lineHeight: "100%"
    },
    link: {
        color: '#00aced',
        textDecorationLine: 'underline',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        padding: 12,
        alignItems: 'center',
        borderRadius: 6,
    },
    buttonDisabled: {
        backgroundColor: '#888',
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
    },
});
export default SingUpScreen;