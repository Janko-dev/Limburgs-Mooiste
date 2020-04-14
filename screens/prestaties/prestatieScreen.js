import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import React, { useEffect, useState } from 'react';
import firebase from '../../api/firebase'

import Ranking from './ranking';
import Achievements from './achievements';

const PrestatieScreen = props => {
    const [select, setSelect] = new useState("Ranking")
    const [headers, setHeaders] = new useState([{ id: 1, name: "Ranking" }, { id: 2, name: "Achievements" }])

    const Content = () => {
        if (select == "Ranking") return <Ranking user={firebase.getCurrentUser()} />
        if (select == "Achievements") return <Achievements user={firebase.getCurrentUser()} />
    }

    const Header = (item) => {
        return (
            <TouchableOpacity style={item.name === select ? styles.sectionHeadButtonSelect : styles.sectionHeadButton}
                onPress={() => { setSelect(item.name) }}
                key={item.id}>
                <Text style={[globalStyles.bodyText, { fontSize: 13 }]}> {item.name} </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.sectionHead}>
                {headers.map(item => { return Header(item) })}
            </View>
            {Content()}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'center',
        flex: 1,
    },
    sectionHead: {
        flexDirection: "row",
        backgroundColor: Colors.tertiary,
        borderBottomColor: "#fff",
        borderBottomWidth: 1.5,
        flex: 0.1,
    },
    sectionHeadButtonSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 4,
        backgroundColor: '#fff',
        marginTop: 8,
        marginHorizontal: 5,
        flex: 1,
    },
    sectionHeadButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 8,
        margin: 3,
        flex: 1,
    },
});

export default PrestatieScreen