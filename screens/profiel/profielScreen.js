import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, RefreshControl } from 'react-native';
import { globalStyles, Colors, SCREEN_HEIGHT } from '../../constants';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SettingsComponent from '../../components/settingsComponent';
import firebase from '../../api/firebase';
import PickerModal from '../modals/pickerModal';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const ProfielScreen = props => {

    const [showPicker, setShowPicker] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const [userRecord, setUserRecord] = useState(null);
    const [achievements, setAchievements] = useState([]);
    console.log(userRecord)
      useEffect(() => {
        if (firebase.getCurrentUser()){
            const unsubscribe = firebase.onUserDataChange(firebase.getCurrentUser().uid, userDoc => {
                setUserRecord(userDoc.data());
            })

            return unsubscribe;
        }

      }, [])

    const showPickerHandler = () => {

        firebase.getUserAchievements(userRecord?.achievements).then(result => {

            setAchievements(() => {
              return result.docs.map(doc => {
                return doc.data().naam;
              })
            })
          })

        setShowPicker(!showPicker)
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

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

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <PickerModal isVisible={showPicker} onClose={showPickerHandler} selectedData={userRecord?.currentTitle} data={achievements} onSuccess={(newTitle) => {firebase.setTitle(newTitle, firebase.getCurrentUser().uid), showPickerHandler()}}/>
            <View style={{ height: SCREEN_HEIGHT * 0.16, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 0.25 }}>
                <View style={{ flexDirection: 'row', flex: 2, height: '100%' }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        {firebase.getCurrentUser()?.photoURL ? <Avatar source={{uri: firebase.getCurrentUser().photoURL}} size="large" rounded ></Avatar> : <Avatar title={firebase.getCurrentUser().email.substring(0, 2).toUpperCase()} size="large" rounded ></Avatar>}

                    </View>
                    <View style={{ justifyContent: 'center', flex: 3 }}>
                        {firebase.getCurrentUser() ? <Text style={styles.headerText}>{firebase.getCurrentUser().displayName}</Text> : <Text style={styles.headerText}>{firebase.getCurrentUser().email}</Text>}

                        <Text style={styles.subHeaderText}>{userRecord?.skillLevel}</Text>
                    </View>
                </View>
                <View style={{  flex: 1,  flexDirection: 'row' }}>
                    <View style={{ flex: 2.5, paddingLeft: '5%', height: '100%', }} >
                        <Text style={styles.infoText}>Huidige titel</Text>
                        <Text style={styles.titleText}>{userRecord?.currentTitle}</Text>
                    </View>
                    <View style={{ flex: 1, paddingRight: '5%',  height: '100%' }}>
                        <TouchableOpacity style={styles.button} onPress={showPickerHandler}>
                            <Text style={styles.buttonText}>Verander titel</Text>
                        </TouchableOpacity>
                    </View>
   
                </View>
            </View>
            <View style={{ height: SCREEN_HEIGHT * 0.18, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 0.25, marginTop: SCREEN_HEIGHT * 0.05 }}>
                <SettingsComponent onNext={() => ({})} image={require('../../assets/privacy.png')} text={'Privacy'} height={SCREEN_HEIGHT * 0.06}></SettingsComponent>
                <SettingsComponent onNext={() => ({})} image={require('../../assets/settings.png')} text={'Instellingen'} height={SCREEN_HEIGHT * 0.06} ></SettingsComponent>
                <SettingsComponent onNext={() => ({})} image={require('../../assets/info.png')} text={'Limburgs Mooiste'} height={SCREEN_HEIGHT * 0.06} ></SettingsComponent>

            </View>
            <View style={{ height: SCREEN_HEIGHT * 0.06, backgroundColor: 'white', borderColor: 'lightgray', borderWidth: 0.25, marginTop: SCREEN_HEIGHT * 0.05 }}>
                <TouchableOpacity style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => (signOutWarningHandler(firebase.logoutUser))}>
                    <Text style={{ color: Colors.warning, fontWeight: '500' }}>Afmelden</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tertiary,

    },
    

    buttonText: {
        color: Colors.primary,
        fontSize: SCREEN_HEIGHT * 0.014,
      },

    button: {
        height: SCREEN_HEIGHT * 0.04,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: Colors.primary,
        borderWidth: SCREEN_HEIGHT * 0.001,
        borderRadius: SCREEN_HEIGHT * 0.005,
        padding: SCREEN_HEIGHT * 0.01
      },

    headerText: {
        fontWeight: '700',
        fontFamily: 'Arial Rounded MT Bold',
        fontSize: SCREEN_HEIGHT * 0.017,
    },

    subHeaderText: {
        fontWeight: '300',
        fontSize: SCREEN_HEIGHT * 0.016
    },

    infoText: {
        fontWeight: '300',
        fontSize: SCREEN_HEIGHT * 0.014,
    },

    titleText: {
        color: Colors.primary,
        fontWeight: '600',
        fontSize: SCREEN_HEIGHT * 0.014,
    },
});

export default ProfielScreen