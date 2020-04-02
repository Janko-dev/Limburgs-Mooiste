import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { globalStyles, Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants'; 
import { SocialIcon, Input, Button } from 'react-native-elements'

const ArticleModal = ({ article, visible, onClose}) => {

    return (
        <Modal animationType='slide' visible={visible}  >
            <ScrollView style={{ height: '100%', width: '100%'}}>
                <View style={{ height: SCREEN_HEIGHT/2.5, width: '100%', opacity: '100%'}}>

                    <Image source={{uri: article.image}} style={{height: '100%', width: '100%', borderRadius: 2,}}></Image>
                    <TouchableOpacity onPress={onClose} style={{position: 'absolute', top: 40, right: 20, }}>
                        <Image source={require('../../assets/cancelButton.png')} style={{tintColor: Colors.tertiary, height: 35, width: 35}}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{ height: '100%', width: '100%'}}>
                    <View style={{padding: 20}}>
                        <Text style={{ color: Colors.secondary, fontWeight: '600', fontSize: 20}}>{article.title}</Text>
                        <Text style={{ color: Colors.tertiary, fontWeight: '600', fontSize: 12, paddingBottom: 10}}>Auteur: {article.autor}</Text>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 14}}>{article.header}</Text>
                    </View>
                    <View style={{padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Content</Text>
                    </View>
                    <View style={{padding: 20, alignItems: 'center'} }>
                        <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary}}>Wat vond je van het artikel?</Text>
                        <SocialIcon
                            Component={TouchableOpacity}
                            style={{height: 40, width: 40}}
                            type='facebook'
                        />
                    </View>
                </View>
            </ScrollView>

        </Modal>
    )
}

export default ArticleModal