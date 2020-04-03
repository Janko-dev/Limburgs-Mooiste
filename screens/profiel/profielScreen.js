import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsComponent from '../../components/settingsComponent';
import firebase from '../../api/firebase';

const ProfielScreen = props => {

    const signOutWarningHandler = (callback) => {
        Alert.alert(
            'Afmelden',
            'Weet je zeker dat je je account wilt afmelden?',
            [
                {
                    text: 'Ja',
                    onPress: callback,
                    style: 'cancel'
                },
                {
                    text: 'Nee',
                    onPress: null,
                },

            ]
        )
    }

    console.log(firebase.getCurrentUser())

    return (
        <ScrollView style={styles.container}>
            {/* <View style={styles.container}>  */}
            <View style={{ height: 100, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 0.25 }}>
                <View style={{ flexDirection: 'row', height: '100%' }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        {/* <Avatar source={{uri: firebase.getCurrentUser().photoURL}} size="large" rounded ></Avatar> */}
                    </View>
                    <View style={{ justifyContent: 'center', flex: 2 }}>
                        <Text style={styles.headerText}>Naam</Text>
                        <Text style={styles.subHeaderText}>Niveau</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1, paddingRight: 10, paddingBottom: 10 }}>
                        <Text style={styles.titleText}>Ridder</Text>
                        <Text style={styles.infoText}>Huidige titel</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 150, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 0.25, marginTop: 40 }}>
                <SettingsComponent onNext={() => ({})} image={require('../../assets/privacy.png')} text={'Privacy'} height={50} ></SettingsComponent>
                <SettingsComponent onNext={() => ({})} image={require('../../assets/settings.png')} text={'Instellingen'} height={50} ></SettingsComponent>
                <SettingsComponent onNext={() => ({})} image={require('../../assets/info.png')} text={'Limburgs Mooiste'} height={50} ></SettingsComponent>

            </View>
            <View style={{ height: 50, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 0.25, marginTop: 40 }}>
                <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => (signOutWarningHandler(firebase.logoutUser))}>
                    <Text style={{ color: Colors.warning, fontWeight: '500' }}>Afmelden</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 3 }}>

            </View>
            {/* </View> */}
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tertiary,
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    headerText: {
        fontWeight: '700',
        fontFamily: 'Arial Rounded MT Bold',
        marginTop: 10
    },

    subHeaderText: {
        fontWeight: '300',
    },

    infoText: {
        // color: Colors.tertiary, 
        fontWeight: '300',
        fontSize: 12,
    },

    titleText: {
        color: Colors.primary,
        fontWeight: '600',
        fontSize: 12,
    },
});

export default ProfielScreen