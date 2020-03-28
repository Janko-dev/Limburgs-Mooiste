import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import { Icon } from 'react-native-elements';

const DashboardScreen = props => {

    const feedList = [
        {
            id: 1,
            info: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
        },
        {
            id: 2,
            info: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntsed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt ',
        },
        {
            id: 3,
            info: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt ',
        }
    ]

    return (
        <View style={styles.container}>
            <View style={styles.trainingContainer}>
                <View style={styles.firstChildTrainingContainer}>
                    <View style={styles.secondChildtrainingContainer}>
                        <Text style={{fontSize: 24, fontStyle: "normal", fontWeight: 'bold', color: '#bfbfbf'}}>Volgende Training</Text>
                    </View>
                    <View style={styles.secondChildtrainingContainer}>
                        <View style={styles.thirdChildtrainingContainer}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary, textAlign: 'center'}}>Naam sessie{"\n"} &{"\n"} training</Text>
                            </View>
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Vervolg Training</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.motivationContainer}>
                <View style={styles.firstChildMotivationContainer}>
                    <View style={styles.secondChildMotivationContainer}>
                        <Icon
                            type='ionicon'
                            name='ios-stats'
                            color={Colors.tertiary}
                            size={30}
                        />
                        <Text>Rewards</Text>
                    </View>
                    <View style={styles.secondChildMotivationContainer}>
                        <Icon
                            type='ionicon'
                            name='ios-stats'
                            color={Colors.tertiary}
                            size={30}
                        />
                        <Text>Ranking</Text>
                    </View>
                </View>

            </View>
            <View style={styles.feedContainer}>
                <FlatList 
                    data={feedList}
                    renderItem={(data) => 
                    <TouchableOpacity onPress={() => console.log('test')}>
                        <View style={styles.feedItems}>
                            <Text style={{fontWeight: '100', color: Colors.secondary, fontWeight: '500'}} >{data.item.info}</Text>
                        </View>
                    </TouchableOpacity>}
                />
            </View> 
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    feedItems: {
        backgroundColor: Colors.tertiary,
        margin: '3%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.26,
        // borderRadius: 10,
        padding: "1%"
    },
    trainingContainer: {
        margin: '1%',
        flex: 3,
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
    firstChildTrainingContainer: {
        flex: 1
    },
    secondChildtrainingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thirdChildtrainingContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    motivationContainer: {
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
    },
    feedContainer: {
        margin: '1%',
        flex: 10,
        backgroundColor: 'white',
        marginLeft: '4%',
        marginRight: "4%",
        marginTop: '2%',
        marginBottom: '2%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderRadius: 10
    },
    button: {
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 5,
        padding: 7,
        width: '75%',
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 12,
        fontWeight: 'bold'
      },
});

export default DashboardScreen