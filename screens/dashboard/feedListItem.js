import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Share } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import firebase from '../../api/firebase';
import { Colors, globalStyles, SCREEN_HEIGHT } from '../../constants';
import { min } from 'react-native-redash';
import AchievementModal from '../modals/achievementModal';

const feedListItem = props => {

    const [profilePicture, setProfilePicture] = useState();
    // const [userRecord, setUserRecord] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    const [receivedAchievement, setReceivedAchievement] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState(null);

    useEffect(() => {
        setProfilePicture(firebase.getCurrentUser()?.photoURL);
        firebase.getRouteImage(props.routeID).then(value => {
            setImageURL(value);
        })
    },[props.routeID]);

    useEffect(() => {
        if (props.userRecord != null) {
            firebase.getAchievementsByType('Shares').then(data => {
                let achievements = data.docs.map(item => {
                    return { ...item.data(), id: item.id }
                })

                let newAchievementIDs = []
                let achievement
                achievements.forEach(item => {
                    if (item.criterium == props.userRecord.totalShares && !props.userRecord.achievements.includes(item.id)) {
                        newAchievementIDs.push(item.id)
                        achievement = item
                    }
                })
                if (newAchievementIDs.length > 0) {
                    firebase.setUserAchievement(props.userRecord.achievements, newAchievementIDs).then(() => {
                        firebase.setExp(props.userRecord.exp + achievement.beloning, firebase.getCurrentUser().uid).then(() => {
                            setCurrentAchievement(achievement)
                            setReceivedAchievement(true)
                        })
                    })
                }

            })
        }
    }, [props.userRecord?.totalShares])

    const handleAchievementModal = () => {
        setReceivedAchievement(!receivedAchievement)
    }


    const startTimeHandler = () => {
        let starUtcSeconds = props.start.seconds;
        let startTime = new Date(starUtcSeconds * 1000);
        return (
            <Text style={globalStyles.bodyText}> {startTime.toLocaleDateString('nl')}</Text>
        );
    }

    const endTimeHandler = () => {
        let endUtcSeconds = props.stop.seconds;
        let endTime = new Date(endUtcSeconds * 1000);
        let starUtcSeconds = props.start.seconds;
        let startTime = new Date(starUtcSeconds * 1000);
        // let finishTime = new Date(Math.abs(endTime - startTime));
        let finishTime = Math.abs(endTime - startTime) / 1000;
        return (
            <Text style={globalStyles.bodyText}>
                {Math.floor(finishTime / 60 / 60) < 10 ? '0' + Math.floor(finishTime / 60 / 60) : Math.floor(finishTime / 60 / 60)}:
                {Math.floor(finishTime / 60) % 60 < 10 ? '0' + Math.floor(finishTime / 60) % 60 : Math.floor(finishTime / 60) % 60}:
                {Math.floor(finishTime) % 60 < 10 ? '0' + (Math.floor(finishTime) % 60) : Math.floor(finishTime) % 60}</Text>
        );
    }

    const onShare = async (prestatie, checkedWaypoints, route, totalWaypoints) => {
        try {
            const result = await Share.share({
                message:
                    "Route " + route + " afgerond." + "\n" +
                    "De behaalde medaille: " + prestatie + "\n" +
                    checkedWaypoints + " van de " + totalWaypoints + " waypoints zijn behaald."
            });
            if (result.action === Share.sharedAction) {
                firebase.setShares(props.userRecord.totalShares + 1, firebase.getCurrentUser().uid)
                firebase.setExp(props.userRecord.exp + 2, firebase.getCurrentUser().uid)
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={styles.feedContainer}>
            <AchievementModal isVisible={receivedAchievement} onClose={() => handleAchievementModal()} onModalShow={() => { }} >
                <View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: SCREEN_HEIGHT * 0.01 }}>
                        <Text style={{ fontSize: SCREEN_HEIGHT * 0.022, color: Colors.secondary, fontWeight: '500' }}>Achievement behaald!</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '600', fontSize: SCREEN_HEIGHT * 0.016 }}>{currentAchievement?.naam}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex: 4, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: '50%' }}>
                            </View>
                            <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{ uri: currentAchievement?.badge }} style={{ height: '100%', width: '100%', borderRadius: 2, }}></Image>
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>

                            </View>

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '400', fontSize: SCREEN_HEIGHT * 0.014, color: Colors.tertiary }}>{currentAchievement?.beschrijving}</Text>
                        <Text style={{ fontWeight: '600', fontStyle: 'italic', color: Colors.secondary, fontSize: SCREEN_HEIGHT * 0.014 }}> +{currentAchievement?.beloning}</Text>
                    </View>
                </View>
            </AchievementModal>
            <View style={styles.feedItems}>

                <View style={styles.profiel}>
                    <View style={{ flex: 5, justifyContent: 'center' }}>
                        {profilePicture != null ?
                            <Avatar source={{ uri: profilePicture }} size="small" rounded ></Avatar> :
                            <Avatar title='RD' size="small" rounded ></Avatar>}
                    </View>
                    <View style={{ marginLeft: 10, flexDirection: 'column', flex: 60, justifyContent: 'center' }}>
                        <View>
                            {firebase.getCurrentUser()?.displayName ?
                                <Text style={globalStyles.bodyText}>{firebase.getCurrentUser()?.displayName}</Text> :
                                <Text>Name not rendered!</Text>}
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon
                                type='ionicon'
                                name='ios-calendar'
                                color={Colors.secondary}
                                size={15}
                            />
                            {props.start.seconds ? startTimeHandler() : null}
                        </View>
                    </View>
                </View>
                <View style={styles.sessieNaam}>
                    <Text style={globalStyles.headerText}>Sessie {props.sessie}</Text>
                    <View style={styles.seperatorIcons}></View>
                    <Text style={globalStyles.headerText}>Week {props.week} </Text>
                    <View style={styles.seperatorIcons}></View>
                    <Text style={globalStyles.headerText}>Route {props.routeID} </Text>
                </View>
                <View style={styles.sessieStats}>
                    <View>
                        <Icon
                            type='ionicon'
                            name='ios-pin'
                            color={Colors.secondary}
                            size={30}
                        />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.textAllignStats}><Text style={globalStyles.bodyText}>Waypoints</Text></View>
                        <View style={styles.textAllignStats}><Text style={globalStyles.bodyText}>{props.reachedWaypoints}/{props.waypoints}</Text></View>
                    </View>
                    <View style={styles.seperatorIcons}></View>
                    <View>
                        <Icon
                            type='ionicon'
                            name='ios-timer'
                            color={Colors.secondary}
                            size={30}
                        />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={styles.textAllignStats}>
                            <Text style={globalStyles.bodyText}>Tijd</Text>
                        </View>
                        <View style={styles.textAllignStats}>
                            {props.start.seconds ? endTimeHandler() : null}
                        </View>
                    </View>
                    <View style={styles.seperatorIcons}></View>
                    <View>
                        <Icon
                            type='ionicon'
                            name='ios-medal'
                            color={Colors.secondary}
                            size={30}
                        />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={[styles.textAllignStats, { flex: 4 }]}><Text style={globalStyles.bodyText}>Prestatie</Text></View>
                        <View style={[styles.textAllignStats, { flex: 4 }]}><Text style={globalStyles.bodyText}>{props.earnedMedal}</Text></View>
                    </View>
                </View>
                <View style={styles.kaart}>
                    {/* <Text>test</Text> */}
                    {/* <Image 
                            style={styles.image} 
                            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/limburgs-mooiste-app.appspot.com/o/route1.jpeg?alt=media&token=61f2247b-310b-4989-b6ce-bf2ad9494c4f'}}
                        /> */}
                    {imageURL && <Image source={{ uri: imageURL }} style={{ height: '100%', width: '100%', borderRadius: 2, }}></Image>}
                </View>
                <TouchableOpacity onPress={() => { onShare(props.earnedMedal, props.reachedWaypoints, props.routeID, props.waypoints) }}>
                    <View style={styles.interact}>
                        <View style={styles.shareButton}>
                            <Text style={globalStyles.bodyText}>Share </Text>
                            <Icon
                                type='ionicon'
                                name='ios-share-alt'
                                color={Colors.secondary}
                                size={20}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {/* <Text style={{fontWeight: '100', color: Colors.secondary, fontWeight: '500'}}>{props.title}</Text> */}
            </View>
        </View>)
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        position: 'absolute',
        transform: [{ scale: 0.30 }],
        top: -275
    },
    seperatorIcons: {
        width: 1.5,
        marginTop: '1%',
        marginBottom: "1%",
        backgroundColor: "#CED0CE",
        justifyContent: 'center'
    },
    shareButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4.22,
        shadowOpacity: 0.32,
        elevation: 3,
        height: 30
    },
    textAllignStats: {
        flex: 3,
        alignItems: 'flex-start',
    },
    profiel: {
        flexDirection: 'row',
        marginTop: '3%'
    },
    sessieNaam: {
        marginBottom: '2%',
        marginTop: '2%',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    sessieStats: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    kaart: {
        backgroundColor: 'red',
        height: 200,
        borderColor: Colors.secondary,
        borderWidth: 2,
        borderRadius: 5,
        position: 'relative',
        marginTop: '2%',
        marginBottom: '2%',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    interact: {
        flexDirection: "row",
        marginBottom: '5%'
    },
    feedContainer: {
        backgroundColor: 'white',
        marginLeft: '2%',
        marginRight: "2%",
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 6
    },
    feedItems: {
        marginBottom: '1%',
        marginTop: '3%',
        marginLeft: '3%',
        marginRight: '3%',
        padding: "1%"
    }
});

export default feedListItem;