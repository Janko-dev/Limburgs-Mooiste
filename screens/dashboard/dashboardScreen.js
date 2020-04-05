import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import NextTraining from './nextTraining';
import Motivation from './motivation';
import FeedListItem from './feedListItem';

import firebase from '../../api/firebase';

const DashboardScreen = () => {

    const [refreshState, setRefreshState] = useState(false);

    const [users, setUsers] = useState([]);
    const [prevTrainSessions, setPrevTrainSessions] = useState([]);

    useEffect(() => {
        firebase.getUsers().then(result => {

            setPrevTrainSessions([]);

            setUsers(() => {
                return result.docs.map(doc => {

                    let _user = doc.data();
                    // console.log(doc.id);
                    // console.log(_user.level);

                    let _prevSession = {
                        id: doc.id,
                        session: 'TODO: implement trainings sessions'
                    }

                    setPrevTrainSessions(prevSessions => [...prevSessions, _prevSession])

                    return  doc.data();
                })
            })
    
        })
      }, []);

    const feedList = [
        {
            id: 1,
            info: '',
        },
        {
            id: 2,
            info: '',
        }
        ,
        {
            id: 3,
            info: '',
        }
        ,
        {
            id: 4,
            info: '',
        }
    ]

    const handleRefresh = () =>{
        setRefreshState(false);
    }

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={[{backgroundColor: Colors.secondary},styles.headerNextTraining]}>
                    <Text style={[{color: Colors.tertiary}, globalStyles.headerText ]}>Volgende Training</Text>
                </View>
                <NextTraining/>
                <Motivation/>
                <View style={styles.feedHeader}>
                    <Text style={styles.buttonText}>Your Feed</Text>
                </View>
                <View style={{
                height: 1,
                marginLeft: '2%',
                marginRight: "2%",
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
                marginLeft: '2%',
                marginRight: "2%",
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
                ListHeaderComponent={renderHeader}
                ItemSeparatorComponent={renderSeparator}
                refreshing={refreshState}
                onRefresh={handleRefresh}
                keyExtractor={(data) => data.id.toString()}
                renderItem={(data) => <FeedListItem title={data.item.info}/>}
            />
        </View>
        
    )
}


const styles = StyleSheet.create({
    headerNextTraining: {
        padding: '1%',
        marginLeft: '2%',
        marginRight: "2%",
        marginTop: '2%',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        alignItems: 'center'
    },
    feedHeader: {
        alignItems: 'center',
        marginTop: 10,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 10,
        backgroundColor: Colors.secondary,
        marginLeft: '2%',
        marginRight: "2%",
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26
    },
    mainContainer: {
        flex: 1
    },
    headerContainer: {
        flex: 5
    },
    buttonText: {
        color: Colors.tertiary,
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default DashboardScreen