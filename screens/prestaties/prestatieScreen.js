import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import Ranking from './ranking';
import Achievements from './achievements';
import LoadingModal from '../modals/loadingModal';

const PrestatieScreen = props => {
    // const [isLoading, setIsLoading] = useState(true)
    // useEffect(() => {
    //     setIsLoading(false)
    // }, [])


    return (
        <View style={styles.container}>

            {/* <LoadingModal isLoading={isLoading} /> */}

            <View style={styles.sectionTop}>
                <Ranking />
            </View>

            <View style={styles.sectionBottom}>
                <Achievements />
            </View>

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
    sectionTop: {
        flex: 1,
    },
    sectionBottom: {
        flex: 1.5,
    }
});

export default PrestatieScreen