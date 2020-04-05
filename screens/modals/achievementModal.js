import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,Image, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { globalStyles, Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import Modal from 'react-native-modal';
import Animated, { Easing } from "react-native-reanimated";
import { timing, bInterpolate } from "react-native-redash";

const { Value, Clock, useCode, set } = Animated;


export default AchievementModal = props => {

    const [expanded, expand] = useState(false);
    const animation = new Value(expanded ? 1 : 0);
    const clock = new Clock();
    useCode(
      set(
        animation,
        timing(clock, animation, {
          toValue: expanded ? 0 : 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease)
        })
      ),
      [animation]
    );
    const scale = bInterpolate(animation, 0.4, 1.25);
    const rotate = bInterpolate(animation, 0, 2 * Math.PI * 2);

    const [shoot, setShoot] = useState(true)

        return (
            <Modal isVisible={props.isVisible} useNativeDriver={true}>
                <View style={{backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: SCREEN_HEIGHT * 0.4}} >
                    <TouchableOpacity onPress={props.onClose} style={{position: 'absolute', top: SCREEN_HEIGHT * 0.02, right: SCREEN_HEIGHT * 0.02, }}>
                        <Image source={require('../../assets/cancelButton.png')} style={{tintColor: Colors.tertiary, height: 35, width: 35}}></Image>
                    </TouchableOpacity>
                    <View style={{borderBottomColor: Colors.tertiary, borderBottomWidth: 2, flex: 2, width: '60%', justifyContent: 'flex-end', alignItems: 'center', margin: '2%', padding: '5%'}}>
                        <Animated.View style={{ transform: [{ scale }, { rotate }], alignItems: 'center' }}>
                            <Image source={require('../../assets/levelUp.png')} style={{tintColor: Colors.primary}}></Image>
                        </Animated.View>
                        <Text style={{color: Colors.secondary, fontSize: 20, fontWeight: '500', fontStyle: 'italic',}}>Level Up!</Text>
                        <Text style={{color: Colors.secondary, fontSize: 20, fontWeight: '500', fontStyle: 'italic',}}>{props.level}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={{color: Colors.tertiary, fontWeight: '300', fontSize: 16, margin: '1%', padding: '1%'}}>Nog {props.remainingExp} exp tot aan je doel.</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.button} onPress={props.onClose}>
                            <Text style={styles.buttonText}>Naar doel</Text>
                    </TouchableOpacity>

                </View>
                {shoot ? (
                    <ConfettiCannon count={100} fadeOut={true} explosionSpeed={300} origin={{ x: 0, y: 0 }} colors={[Colors.primary, Colors.secondary, Colors.tertiary]} />
                    ) : null}
            </Modal>
          
        );
}


const styles = StyleSheet.create({
    button: {
        height: SCREEN_HEIGHT * 0.04,
        width: SCREEN_HEIGHT * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        position: 'absolute', 
        bottom: SCREEN_HEIGHT * 0.02,
      },

      buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 12,
      },
}

)
