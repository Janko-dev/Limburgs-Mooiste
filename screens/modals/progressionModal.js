import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { globalStyles, Colors, SCREEN_WIDTH } from '../../constants'; 
import Svg, { Circle, Rect, Path } from 'react-native-svg';

const ProgressionModal = ({ visible, onClose, exp, maxExp, progress, level }) => {

    return (
        <Modal animationType='slide' visible={visible} >
            <View style={styles.modal}>
                {/* <TouchableOpacity onPress={onClose} style={styles.button}>
                    <Text style={[globalStyles.headerText, styles.buttonText]} >Sluiten</Text>
                </TouchableOpacity> */}
                <Svg height="100%" width="100%">
                    {/* <Circle cx="50" cy="50" r="45" fill='white' /> */}

                    <Path d="M 212 100 s 300 100 0 200" fill={Colors.tertiary}/>
                    <Path d="M 212 150 q 150 50 0 100" fill="white"/>
                    
                    <Path d="M 212 250 s -300 100 0 200" fill={Colors.tertiary}/>
                    <Path d="M 212 300 q -150 50 0 100" fill="white"/>

                    <Circle cx="212" cy="125" r="35" fill={Colors.primary} />
                    <Circle cx="212" cy="125" r="30" fill={Colors.primary} stroke='white'/>
                    <Circle cx="212" cy="275" r="35" fill={Colors.primary} />
                    <Circle cx="212" cy="275" r="30" fill={Colors.primary} stroke='white'/>

                    {/* <Path d="M 212 100 s 300 100 0 200" fill="black"/>
                    <Path d="M 212 150 q 150 50 0 100" fill="white"/> */}

                    {/* <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
                    <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" /> */}
                </Svg>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        flex: 1
    },

    button: {
        width: '90%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%',
        borderRadius: 10,
        backgroundColor: Colors.primary,
    },

    buttonText: {
        fontSize: 24,
        color: Colors.tertiary
    }
})

export default ProgressionModal;