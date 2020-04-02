import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, Image, Linking, Alert } from 'react-native';
import { globalStyles, Colors, SCREEN_HEIGHT } from '../constants';
import { TouchableHighlight } from 'react-native-gesture-handler';


const SettingsComponent = props => {
    return (
        <TouchableHighlight onPress={props.onNext} underlayColor="lightgray" activeOpacity={0.8}>

            <View style={{ height: props.height, justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{ justifyContent: 'center', paddingLeft: '1%', paddingRight: '1%'}}>
                        <Image source={props.image} style={{ height: props.height / 1.75, width: props.height / 1.75, tintColor: Colors.primary}}></Image>
                    </View>
                    <View style={{flexDirection: 'row', flex: 2, alignItems: 'center', borderBottomColor: Colors.tertiary, borderBottomWidth: 1}}>
                        <Text style={{flex: 1, fontSize: SCREEN_HEIGHT / 65, padding: '2%', fontWeight: '300'}}>{props.text}</Text>
                        <Image source={require('../assets/arrowRight.png')} style={{ tintColor: Colors.primary, height: props.height / 1.75, width: props.height / 1.75}}></Image>
                    </View>
            </View>
        </TouchableHighlight>

    )
}

export default SettingsComponent