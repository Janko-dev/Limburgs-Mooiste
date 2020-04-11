import React, { useState} from 'react';
import Picker from 'react-native-picker-view';
import Modal from 'react-native-modal';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles, Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';


const pickerViewModal = ({selectedData, data, onClose, onSuccess, isVisible})  => {

    const [index, setIndex] = useState(0) 
    const [item, setItem] = useState(selectedData) 
    const [tappedOutside, setTappedOutside] = useState(false)

    return (
        <Modal animationIn='slideInUp' isVisible={isVisible} useNativeDriver={true} transparent={true} >
                <Picker
                    values={data}
                    selected={index}
                    style={{ backgroundColor: 'white', width: SCREEN_WIDTH * 0.9}}
                    enableInput={false}
                    onSelect={(value,index) => {
                        setIndex(index)
                        setItem(value)
                    }}
                />
                <View style={{flexDirection: 'row', height: SCREEN_HEIGHT * 0.05}}>
                    <TouchableOpacity activeOpacity={0.9} onPress={onClose} style={{width: SCREEN_WIDTH * 0.45, flex: 1, backgroundColor: Colors.tertiary, justifyContent: 'center', alignItems: 'center', borderColor: 'lightgray', borderWidth: 0.25}}>
                        <Text style={{color: 'black', fontSize: SCREEN_HEIGHT * 0.016, fontWeight: '300'}}>Annuleer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => onSuccess(item)} style={{width: SCREEN_WIDTH * 0.45, flex:1,backgroundColor: Colors.tertiary, justifyContent: 'center', alignItems: 'center', borderColor: 'lightgray', borderWidth: 0.25}}>
                        <Text style={{color: Colors.primary, fontSize: SCREEN_HEIGHT * 0.016, fontWeight: '600'}}>Kies</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
    )
}

export default pickerViewModal