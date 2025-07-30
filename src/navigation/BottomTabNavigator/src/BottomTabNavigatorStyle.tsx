import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';
import scale, { verticalScale } from '../../../components/Scale';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#272D58",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
        alignItems :"center",
        height: scale(80)
    },
    outerContainer: {
        flex: 1,
        alignItems: "center",

    },
    tabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(30),
        height: scale(32),
    },
    labelStyle: {
        fontSize: scale(6),
        color: "#fff",
        marginTop: verticalScale(1),
        textAlign: 'center'
    },
})