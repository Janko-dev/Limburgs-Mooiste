import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = props => {

    return (
        <View style={styles.container}> 
            <Text>DashboardScreen</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DashboardScreen