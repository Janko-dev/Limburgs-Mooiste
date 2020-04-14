import React, {useState, useEffect} from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';
import { globalStyles, Colors, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants'; 
import Svg, { Circle, Rect, Path, Polyline } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import NextLevelModal from '../modals/nextLevelModal';
import firebase from '../../api/firebase';

const ProgressionModal = ({ visible, onClose, exp, maxExp, progress, level }) => {

    const [achievements, setAchievements] = useState([])
    const [levels] = useState(() => {
        let array = []
        for (let index = 0; index < 30; index++) {
            let level = index + 1
            array.push(level)
        }
        return array
    })
    const [clickedLevel, setClickedLevel] = useState(null)
    const [isVisible, setIsVisble] = useState(false)

    useEffect(() => {
        firebase.getAchievements().then(result => {

            setAchievements(() => {
                return result.docs.map(doc => {
                  return doc.data();
                }).filter(item => item.type == 'Leveling')
              })

        })
    }, [])

    const pressHandler = (lvl) => {
        setIsVisble(!isVisible)
        setClickedLevel(lvl)
    }

    return (
        <Modal animationType='slide' visible={visible} style={{height: '100%'}}>
              <View style={{ flexDirection: 'row', height: 80, borderBottomColor: 'lightgray', borderBottomWidth: 0.5}}>
                   <View style={{flex: 1,  justifyContent: 'flex-end'}}>
                                <TouchableOpacity onPress={onClose} style={{marginLeft: '10%', marginBottom: '5%' }} >
                                    <Text style={{color: Colors.primary, fontSize: SCREEN_HEIGHT * 0.019}}>Sluiten</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                                <Text style={{fontSize: SCREEN_HEIGHT * 0.019, fontWeight: '600', marginBottom: '5%'}}>Progressie</Text>
            
                            </View>
                            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: '5%'}}>

                            </View>
            
                        </View>
            <ScrollView  showsVerticalScrollIndicator={false}>
            <NextLevelModal isVisible={isVisible} onClose={() => pressHandler(clickedLevel)} level={clickedLevel} userLevel={level} currentExp={exp} allAchievements={achievements} >  </NextLevelModal>
                
                {levels.map((item, index) => {

                    if (index == 0) {
                        return             <View>

                        <Svg  height={150} width="100%">
                        {level != item ? 
                        <Path d={`M ${SCREEN_WIDTH / 2} 50 s 300 100 0 200`} fill={Colors.secondary}></Path> : 
                        <Path d={`M ${SCREEN_WIDTH / 2} 50 s 300 100 0 200`} fill={Colors.tertiary}></Path>}

                        {level != item ? 
                        <Path d={`M ${SCREEN_WIDTH / 2} 75 s 235 75 0 150`} fill={Colors.secondary} stroke='white' strokeWidth="0.5"/> :
                        <Path d={`M ${SCREEN_WIDTH / 2} 75 s 235 75 0 150`} fill={Colors.tertiary} stroke='white' strokeWidth="0.5"/> }


                        <Path d={`M ${SCREEN_WIDTH / 2} 100 q 150 50 0 100`} fill="white"/>

                        
                        <Circle cx={SCREEN_WIDTH / 2} cy="75" r="35" fill={Colors.primary} />
                         <Circle  cx={SCREEN_WIDTH / 2} cy="75" r="30" fill={Colors.primary} stroke='white'/>
                    
                            </Svg>
                            <View   style={{height: 150, width: "100%", position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => pressHandler(item)}  style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{ color: 'white', fontSize: SCREEN_HEIGHT * 0.022, fontWeight: '500'}}>{item}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    }
                    else if (index == levels.length - 1) {
                        return <View> 
                                    <Svg  height={150} width="100%">
                                
                                {level >= item ? 
                                <Path d={`M ${SCREEN_WIDTH / 2} 100 s 300 -100 0 -200`} fill={Colors.secondary}/> :
                                <Path d={`M ${SCREEN_WIDTH / 2} 100 s 300 -100 0 -200`} fill={Colors.tertiary}/> }

                                {level >= item ? 
                                <Path d={`M ${SCREEN_WIDTH / 2} 75 s 235 -75 0 -150`} fill={Colors.secondary} stroke='white' strokeWidth="0.5"/> :
                                <Path d={`M ${SCREEN_WIDTH / 2} 75 s 235 -75 0 -150`} fill={Colors.tertiary} stroke='white' strokeWidth="0.5"/> }

                                <Path d={`M ${SCREEN_WIDTH / 2} 50 q 150 -50 0 -100`} fill="white"/>
                
                
                                <Circle cx={SCREEN_WIDTH / 2} cy="75" r="35" fill={Colors.secondary} />
                                <Circle cx={SCREEN_WIDTH / 2} cy="75" r="30" fill={Colors.secondary} stroke='white'/>
                                
                                </Svg>
                                <View   style={{height: 150, width: "100%", position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => pressHandler(item)}  style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ color: 'white', fontSize: SCREEN_HEIGHT * 0.022, fontWeight: '500'}}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    } 
                    else if(index % 2 == 0) {
                        return <View>
                            <Svg height={150} width="100%">

                            {level > item ? 
                            <Path d={`M ${SCREEN_WIDTH / 2} 50 s 300 100 0 200`} fill={Colors.secondary}/> :
                            <Path d={`M ${SCREEN_WIDTH / 2} 50 s 300 100 0 200`} fill={Colors.tertiary}/>}

                            {level > item ? 
                            <Path d={`M ${SCREEN_WIDTH / 2} 75 s 235 75 0 150`} fill={Colors.secondary} stroke='white' strokeWidth="0.5"/> :
                            <Path d={`M ${SCREEN_WIDTH / 2} 75 s 235 75 0 150`} fill={Colors.tertiary} stroke='white' strokeWidth="0.5"/> }
                            
                            <Path d={`M ${SCREEN_WIDTH / 2} 100 q 150 50 0 100`} fill="white"/>

                            {level >= item ? 
                            <Path d={`M ${SCREEN_WIDTH / 2} 100 s -300 -100 0 -200`} fill={Colors.secondary}/> :
                            <Path d={`M ${SCREEN_WIDTH / 2} 100 s -300 -100 0 -200`} fill={Colors.tertiary}/>}
                            
                            {level >= item ?
                            <Path d={`M ${SCREEN_WIDTH / 2} 75 s -235 -75 0 -150`} fill={Colors.secondary} stroke='white' strokeWidth="0.5"/> :
                            <Path d={`M ${SCREEN_WIDTH / 2} 75 s -235 -75 0 -150`} fill={Colors.tertiary} stroke='white' strokeWidth="0.5"/> }
                        

                            <Path d={`M ${SCREEN_WIDTH / 2} 50 q -150 -50 0 -100`} fill="white"/>
                        
                            <Circle cx={SCREEN_WIDTH / 2} cy="75" r="35" fill={Colors.primary} />
                            <Circle cx={SCREEN_WIDTH / 2} cy="75" r="30" fill={Colors.primary} stroke='white'/>
                             </Svg>
                            <View   style={{height: 150, width: "100%", position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
                                  <TouchableOpacity onPress={() => pressHandler(item)}  style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                     <Text style={{ color: 'white', fontSize: SCREEN_HEIGHT * 0.022, fontWeight: '500'}}>{item}</Text>
                                 </TouchableOpacity>
                            </View>
                        </View>
                    } else {
                        return <View>
                            <Svg  height={150} width="100%">
                                
                                {level > item ? 
                                <Path d={`M ${SCREEN_WIDTH / 2} 50 s -300 100 0 200`} fill={Colors.secondary}/> :
                                <Path d={`M ${SCREEN_WIDTH / 2} 50 s -300 100 0 200`} fill={Colors.tertiary}/> }

                                {level > item ? 
                                <Path d={`M ${SCREEN_WIDTH / 2} 75 s -235 75 0 150`} fill={Colors.secondary} stroke='white' strokeWidth="0.5"/> :
                                <Path d={`M ${SCREEN_WIDTH / 2} 75 s -235 75 0 150`} fill={Colors.tertiary} stroke='white' strokeWidth="0.5"/> }


                                <Path d={`M ${SCREEN_WIDTH / 2} 100 q -150 50 0 100`} fill="white"/>
                        
                                

                                {level >= item ? 
                                <Path d={`M ${SCREEN_WIDTH / 2} 100 s 300 -100 0 -200`} fill={Colors.secondary}/> :
                                <Path d={`M ${SCREEN_WIDTH / 2} 100 s 300 -100 0 -200`} fill={Colors.tertiary}/>  }

                                {level >= item ? 
                                <Path d={`M ${SCREEN_WIDTH / 2} 75 s 235 -75 0 -150`} fill={Colors.secondary} stroke='white' strokeWidth="0.5"/> :
                                <Path d={`M ${SCREEN_WIDTH / 2} 75 s 235 -75 0 -150`} fill={Colors.tertiary} stroke='white' strokeWidth="0.5"/> }

                                <Path d={`M ${SCREEN_WIDTH / 2} 50 q 150 -50 0 -100`} fill="white"/>
        
                                <Circle cx={SCREEN_WIDTH / 2} cy="75" r="35" fill={Colors.primary} />
                                 <Circle  cx={SCREEN_WIDTH / 2} cy="75" r="30" fill={Colors.primary} stroke='white'/>
                        
                                </Svg>
                                <View   style={{height: 150, width: "100%", position: 'absolute', justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => pressHandler(item)}  style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{ color: 'white', fontSize: SCREEN_HEIGHT * 0.022, fontWeight: '500'}}>{item}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                })}

            {level >= levels[levels.length - 1] ?
            <View style={{backgroundColor: Colors.success, width: '100%', height: SCREEN_HEIGHT * 0.2, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: SCREEN_HEIGHT * 0.02, fontWeight: '400',fontStyle: 'italic', color: 'white', padding: '5%'}}>Gefeliciteerd, je hebt level 30 bereikt!
                    Dit betekent dat je klaar bent om aan Limburgs Mooiste deel te nemen. 
                </Text>
            </View> :
            null}

            </ScrollView>

        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
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