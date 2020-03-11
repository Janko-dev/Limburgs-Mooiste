import { StyleSheet, Dimensions } from 'react-native'

export const Colors = {
    primary: '#449cc1',
    secondary: '#133068',
    tertiary: '#dcdcdc',
    warning: '#ffce00',
    success: '#10dc60',
    danger: '#ca001a'
}

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    fontStyle: {
        fontFamily: 'Arial Rounded MT Bold'
    }
})

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
