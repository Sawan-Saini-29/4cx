import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    BackHandler,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as IMG_CONST from "./assets";
import styles from "./BottomTabNavigatorStyle";
import Scale from "../../../components/Scale";

// Screens
import HomeScreen from '../../../screens/homeScreens/HomeScreen';
import LandingScreen from '../../../screens/splashScreen/LandingScreen';
import SingUpScreen from '../../../screens/singupLogin/SingUpScreen';
import SingUpScreen2 from '../../../screens/singupLogin/SingUpScreen2';
import SplashScreen from '../../../screens/splashScreen/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const handleBackButton = () => {
    BackHandler.exitApp();
    return true;
};

const MainTabScreen = () => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButton
        );

        return () => backHandler.remove(); // clean up
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            tabBar={props => <MyTabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ tabBarLabel: "" }}
            />
            <Tab.Screen
                name="LandingScreen"
                component={LandingScreen}
                options={{ tabBarLabel: "" }}
            />
            <Tab.Screen
                name="SingUpScreen"
                component={SingUpScreen}
                options={{ tabBarLabel: "" }}
            />
            <Tab.Screen
                name="SingUpScreen2"
                component={SingUpScreen2}
                options={{ tabBarLabel: "" }}
            />
            <Tab.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ tabBarLabel: "" }}
            />
        </Tab.Navigator>
    );
};

export default MainTabScreen;

const renderBottomTabIcons = (iconIndex: any, isFocused: any, onPress: any) => {
    switch (iconIndex) {
        case 0:
            return (
                <Image
                    source={isFocused ? IMG_CONST.HOME : IMG_CONST.HOME}
                    style={{
                        marginTop: isFocused ? Scale(20) : Scale(20),
                        width: isFocused ? Scale(32) : Scale(32),
                        height: isFocused ? Scale(32) : Scale(32),
                        tintColor: isFocused ? "#62C370" : "#8E8E93"
                    }}
                />
            );
        case 1:
            return (
                <Image
                    source={isFocused ? IMG_CONST.MY_DRAFT : IMG_CONST.MY_DRAFT}
                    style={{
                        marginTop: isFocused ? Scale(22) : Scale(22),
                        width: isFocused ? Scale(32) : Scale(32),
                        height: isFocused ? Scale(32) : Scale(32),
                        tintColor: isFocused ? "#62C370" : "#8E8E93"
                    }}
                />
            );
        case 2:
            return (
                <Image style={{
                    marginTop: isFocused ? Scale(20) : Scale(20),
                    width: isFocused ? Scale(32) : Scale(32),
                    height: isFocused ? Scale(32) : Scale(32),
                    tintColor: isFocused ? "#62C370" : "#8E8E93"
                }}
                    source={isFocused ? IMG_CONST.WB_CLUB : IMG_CONST.WB_CLUB} />
            );
        case 3:
            return (
                <Image
                    source={isFocused ? IMG_CONST.MY_ALBUMS : IMG_CONST.MY_ALBUMS}
                    style={{
                        marginTop: isFocused ? Scale(20) : Scale(20),
                        width: isFocused ? Scale(32) : Scale(32),
                        height: isFocused ? Scale(32) : Scale(32),
                        tintColor: isFocused ? "#62C370" : "#8E8E93"
                    }}
                />
            );
        case 4:
            return (
                <View>
                    <Image
                        source={isFocused ? IMG_CONST.LOGO : IMG_CONST.LOGO}
                        style={{
                            marginTop: isFocused ? Scale(20) : Scale(20),
                            width: isFocused ? Scale(32) : Scale(32),
                            height: isFocused ? Scale(32) : Scale(32),
                            tintColor: isFocused ? "#62C370" : "#8E8E93"
                        }}
                    />
                </View>
            );
        default:
            break;
    }
};
const MyTabBar = ({ state, descriptors, navigation, }) => {
    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        onPress={onPress}
                        style={[styles.outerContainer]}
                        activeOpacity={1}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <View
                                style={[
                                    styles.tabContainer,
                                    {
                                        backgroundColor: isFocused ? "#272D58" : "##272D58",
                                    },]}
                            >
                                {renderBottomTabIcons(index, isFocused, onPress)}
                                <Text
                                    style={[
                                        styles.labelStyle,
                                        {
                                            marginTop: Scale(5),
                                            width: Scale(60),
                                            fontSize: Scale(10),
                                            fontWeight: "600",
                                            color: isFocused
                                                ? "#2ABDBD"
                                                : "grey",
                                        },
                                    ]}>
                                    {label}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
