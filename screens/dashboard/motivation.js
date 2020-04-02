import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Colors, globalStyles } from '../../constants';

const motivation = props => {

    return (
        <View style={styles.motivationContainer}>
            <View style={styles.firstChildMotivationContainer}>
                <View style={styles.secondChildMotivationContainer}>
                    <Icon
                        type='ionicon'
                        name='md-gift'
                        color={Colors.secondary}
                        size={30}
                    />
                    <Text style={globalStyles.bodyText} >Rewards</Text>
                </View>
                <View style={styles.secondChildMotivationContainer}>
                    <Icon
                        type='ionicon'
                        name='ios-stats'
                        color={Colors.secondary}
                        size={30}
                    />
                    <Text style={globalStyles.bodyText}>Ranking</Text>
                </View>
            </View>
        </View>)
}

    const styles = StyleSheet.create({
        motivationContainer: {
            padding: 20,
            margin: '1%',
            flex: 2,
            backgroundColor: 'white',
            marginLeft: '4%',
            marginRight: "4%",
            marginTop: '2%',
            marginBottom: '0%',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 6,
            shadowOpacity: 0.26,
            borderRadius: 10
        },
        firstChildMotivationContainer: {
            flexDirection: "row",
            flex: 1
        },
        secondChildMotivationContainer: {
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

export default motivation;