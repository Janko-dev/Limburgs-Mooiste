import React from 'react'
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native'
import { globalStyles, Colors } from '../../constants';

const LoadingModal = ({isLoading}) => {
    return (
        <Modal visible={isLoading} animationType='fade' transparent={false}>
            <View style={[globalStyles.container]}>
                <ActivityIndicator size="large" color={Colors.secondary} />
            </View>
        </Modal>
    )
}

export default LoadingModal

const styles = StyleSheet.create({})
