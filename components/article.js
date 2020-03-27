import React, { useState } from 'react';
import { globalStyles, Colors } from '../constants';
import { Animated, View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import ArticleModal from '../screens/modals/articleModal';


const ArticleCard = ({ picture, name }) => {

  const [visible, setVisible] = useState(false);

  const articleModalHandler = () => {
    setVisible(!visible);
  }

    return (
        <View  style={{height: '100%', width: 150, marginLeft: 10, marginRight: 10}}>
          <TouchableOpacity onPress={articleModalHandler} activeOpacity={100}>
            <ArticleModal visible={visible} onClose={articleModalHandler}></ArticleModal>
            <Image source={picture} style={{height: 150, width: '100%', borderRadius: 2}}></Image>
            <Text style={{width: '100%', padding: 5, fontWeight: '500', fontSize: 12}} >{name}</Text>
          </TouchableOpacity>
        </View>
    )
}

export default ArticleCard