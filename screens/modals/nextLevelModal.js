import React, { useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles, Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants';
import CacheImage from '../../components/cacheImage';


const NextLevelModal = ({isVisible, onClose, level, userLevel, currentExp, allAchievements})  => {

    const [currentAchievement, setCurrentAchievement] = useState(null)
    const [nextAchievement, setNextAchievement] = useState(null)
    const [maxExp, setMaxExp] = useState(null)
    const [userExp, setUserExp] = useState(null)

    useEffect(() => { 

        setCurrentAchievement(() => {
            return allAchievements.filter(item => item.criterium == level)[0]
        })

        setNextAchievement(() => {
            return allAchievements.filter(item => item.criterium > level)[0]
        })

        setMaxExp(() => {
            let x = 10
            let total = 0
            var i;
            for (i = 0; i < level; i++) {
                x *= 1.01
                total += x
                
            }
            return total
        })

        setUserExp(() => {
            let x = 10
            let total = 0
            var i;
            for (i = 0; i < userLevel; i++) {
                x *= 1.01
                total += x
                
            }
            return total + currentExp
        })
        
    }, [level])
    
    return (
        <Modal animationIn='slideInUp' isVisible={isVisible} useNativeDriver={true} transparent={true} style={{alignItems: 'center', justifyContent: 'center'}}>
                <View style={{height: SCREEN_HEIGHT * 0.4, width: SCREEN_WIDTH * 0.8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', opacity: '100%', borderRadius: "10%"}}>
                    <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.01}}>
                        <Text style={{fontSize: SCREEN_HEIGHT * 0.022, color: Colors.secondary, fontWeight: '500'}}>Level {level}</Text>
                    </View>
                    
                    {currentAchievement != null ? 
                                        <View style={{flex: 12}}>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontWeight: '600', fontSize: SCREEN_HEIGHT * 0.016}}>{currentAchievement?.naam}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', flex: 4, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                                            <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', width: '50%'}}>

                                                </View>
                                                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                                                    <Image source={{uri: currentAchievement?.badge}} style={{height: '100%', width: '100%', borderRadius: 2,}}></Image>
                                                </View>
                                                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                
                                                </View>
                
                                            </View>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontWeight: '400', fontSize: SCREEN_HEIGHT * 0.014, color: Colors.tertiary}}>{currentAchievement?.beschrijving}</Text>
                                            <Text style={{fontWeight: '600', fontStyle: 'italic', color: Colors.secondary, fontSize: SCREEN_HEIGHT * 0.014}}> +{ currentAchievement?.beloning}</Text>

                                        </View>
                                        
                                    </View>    :
                                        <View style={{flex: 12}}>
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={{fontWeight: '600', fontSize: SCREEN_HEIGHT * 0.016}}>{nextAchievement?.naam}</Text>
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                <Text style={{fontWeight: '600',  fontSize: SCREEN_HEIGHT * 0.014, color: Colors.warning}}>bij Level {nextAchievement?.criterium}</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', flex: 4, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                                            <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center', width: '50%'}}>

                                                </View>
                                                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
                                                <Image source={{uri: nextAchievement?.badge}} style={{height: '100%', width: '100%', borderRadius: 2,}}></Image>
                                                </View>
                                                <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                
                                                </View>
                
                                            </View>
                                        </View>
                                        <View style={{flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                                            <Text style={{fontWeight: '400', fontSize: SCREEN_HEIGHT * 0.014, color: Colors.tertiary}}>{nextAchievement?.beschrijving}</Text>
                                            <Text style={{fontWeight: '600', fontStyle: 'italic', color: Colors.secondary, fontSize: SCREEN_HEIGHT * 0.014}}> +{ nextAchievement?.beloning}</Text>

                                        </View>
                                        
                                    </View> }

                    <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>

                        <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: '300', fontSize: SCREEN_HEIGHT * 0.014}}>Huidig</Text>
                                 <Text style={{fontWeight: '600', color: Colors.primary, fontSize: SCREEN_HEIGHT * 0.014}}>{Math.round(userExp)}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontWeight: '300', fontSize: SCREEN_HEIGHT * 0.014}}>Totaal</Text>
                    <Text style={{fontWeight: '600', color: Colors.primary, fontSize: SCREEN_HEIGHT * 0.014}}>{Math.round(maxExp)}</Text>
                            </View>
                            {userLevel >= level ?
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontWeight: '600', color: Colors.primary, fontSize: SCREEN_HEIGHT * 0.014}}>Behaald</Text>
                            </View>:
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontWeight: '300', fontSize: SCREEN_HEIGHT * 0.014}}> Te behalen</Text>
                            <Text style={{fontWeight: '600', color: Colors.primary, fontSize: SCREEN_HEIGHT * 0.014}}>{Math.round(maxExp - userExp)}</Text>
                        </View>}
                        </View>
                    </View>
                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', width: '100%', }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={onClose} style={{borderBottomStartRadius: "10%", borderBottomEndRadius: "10%", width: SCREEN_WIDTH * 0.8, flex: 1, backgroundColor: Colors.tertiary, justifyContent: 'center', alignItems: 'center', borderColor: 'lightgray', borderWidth: 0.25}}>
                            <Text style={{color: 'black', fontSize: SCREEN_HEIGHT * 0.016, fontWeight: '300'}}>Terug</Text>
                        </TouchableOpacity>
                    </View>

                </View>

        </Modal>
    )
}

export default NextLevelModal