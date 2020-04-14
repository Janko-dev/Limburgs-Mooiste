import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native'
import { globalStyles, Colors } from '../../constants';

const LoadingModal = ({ isLoading }) => {
    return (
        <Modal visible={isLoading} animationType='fade' transparent={true}>
            <View style={[globalStyles.container, styles.content]}>
                <View style={styles.message}>
                    <ActivityIndicator size="large" color={Colors.secondary} />
                    <Text style={globalStyles.bodyText}>Loading</Text>
                </View>
            </View>
        </Modal>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    message: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 25,
    }
})
