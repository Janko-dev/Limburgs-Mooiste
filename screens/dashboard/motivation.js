import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors, globalStyles } from '../../constants';

const motivation = props => {

    return (
        <View style={styles.motivationContainer}>
            <View style={styles.childMotivationContainer}>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Icon
                        type='ionicon'
                        name='md-gift'
                        color={Colors.secondary}
                        size={30}
                    />
                </View>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Text style={globalStyles.bodyText} >Next Gift</Text>
                </View>
            </View>
            <View style={{flex:4, alignItems: 'center', justifyContent: 'center'}}><Text style={globalStyles.bodyText}>Next: -</Text></View>
            <View style={styles.seperatorContainer}>
                <View style={styles.seperator}></View>
            </View>
            <View style={styles.childMotivationContainer}>
                <Icon
                    type='ionicon'
                    name='ios-stats'
                    color={Colors.secondary}
                    size={30}
                />
                <Text style={[globalStyles.bodyText, {flex: 1}]}>Ranking</Text>
            </View>
            <View style={{flex:4, alignItems: 'center', justifyContent: 'center'}}><Text style={globalStyles.bodyText}>Position: -</Text></View>
        </View>)
}

    const styles = StyleSheet.create({
        seperator: {
            width: 1.5,
            backgroundColor: "#CED0CE",
        },
        seperatorContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center'
        },
        motivationContainer: {
            flexDirection: "row",
            justifyContent: 'center',
            padding: 20,
            margin: '1%',
            backgroundColor: 'white',
            marginLeft: '2%',
            marginRight: "2%",
            marginTop: '2%',
            marginBottom: '0%',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 6,
            shadowOpacity: 0.26,
            borderRadius: 10
        },
        childMotivationContainer: {
            flex: 3,
            alignItems: 'center',
        }
    });

export default motivation;