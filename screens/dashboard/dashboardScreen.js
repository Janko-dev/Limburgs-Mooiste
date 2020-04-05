import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import NextTraining from './nextTraining';
import Motivation from './motivation';

const DashboardScreen = () => {

    const [refreshState, setRefreshState] = useState(false);

    const feedList = [
        {
            id: 1,
            info: 'Feed 1',
        },
        {
            id: 2,
            info: 'Feed 2 ',
        },
        {
            id: 3,
            info: 'Feed 3',
        },
        {
            id: 4,
            info: 'Feed 4',
        },
        {
            id: 5,
            info: 'Feed 5',
        },
        {
            id: 6,
            info: 'Feed 6',
        },
        {
            id: 7,
            info: 'Feed 7',
        },
        {
            id: 8,
            info: 'Feed 8',
        },
        {
            id: 9,
            info: 'Feed 9',
        },
        {
            id: 10,
            info: 'Feed 10',
        },
        {
            id: 11,
            info: 'Feed 11',
        }
    ]

    const handleRefresh = () =>{
        setRefreshState(false);
    }

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <NextTraining/>
                <Motivation/>
                <View style={[{height:1,backgroundColor:'#e9e8e9'},styles.feedHeader]}>
                    <Text style={styles.buttonText}>Your Feed</Text>
                </View>
                <View style={{
                height: 1,
                marginLeft: '4%',
                marginRight: "4%",
                backgroundColor: "#CED0CE",
                justifyContent: 'center'
              }}
            />
            </View>
        )
    }

    const renderSeparator = () => {
        return (
            <View style={{
                height: 1,
                marginLeft: '4%',
                marginRight: "4%",
                backgroundColor: "#CED0CE",
                justifyContent: 'center'
              }}
            />
        )
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={feedList}
                keyExtractor={(data) => data.id.toString()}
                ListHeaderComponent={renderHeader}
                ItemSeparatorComponent={renderSeparator}
                refreshing={refreshState}
                onRefresh={handleRefresh}
                keyExtractor={item => item.id.toString()}
                renderItem={(data) => 
                    <View style={styles.feedContainer}>
                        <TouchableOpacity onPress={() => console.log('test')}>
                            <View style={styles.feedItems}>
                                <Text style={{fontWeight: '100', color: Colors.secondary, fontWeight: '500'}} >{data.item.info}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
        
    )
}


const styles = StyleSheet.create({
    feedHeader: {
        alignItems: 'center',
        marginTop: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        marginLeft: '4%',
        marginRight: "4%",
        // shadowColor: 'black',
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 6,
        // shadowOpacity: 0.26,
    },
    mainContainer: {
        flex: 1
    },
    headerContainer: {
        flex: 5
    },
    feedContainer: {
        padding: 30,
        flex: 10,
        backgroundColor: 'white',
        marginLeft: '4%',
        marginRight: "4%",
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 5},
        shadowRadius: 6,
        shadowOpacity: 0.26
    },
    feedItems: {
        backgroundColor: Colors.tertiary,
        margin: '3%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.26,
        padding: "1%",
        // shadowColor: 'black',
        // shadowOffset: {width: 0, height: 2},
        // shadowRadius: 6,
        // shadowOpacity: 0.26
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default DashboardScreen