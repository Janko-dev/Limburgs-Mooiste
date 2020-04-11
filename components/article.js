import React, { useState } from 'react';
import { globalStyles, Colors, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants';
import { Animated, View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import ArticleModal from '../screens/modals/articleModal';
import CacheImage from '../components/cacheImage';


const ArticleCard = ({ article }) => {

  const [visible, setVisible] = useState(false);

  const articleModalHandler = () => {
    setVisible(!visible);
  }

    return (
        <View  style={{height: '100%', width: SCREEN_HEIGHT * 0.165, marginLeft: SCREEN_HEIGHT * 0.01, marginRight: SCREEN_HEIGHT * 0.01}}>
          <TouchableOpacity onPress={articleModalHandler} activeOpacity={100}>
            <ArticleModal article={article} visible={visible} onClose={articleModalHandler}></ArticleModal>
            <CacheImage uri={article.image} style={{height: SCREEN_HEIGHT * 0.165, width: '100%', borderRadius: 2}}> </CacheImage>
            <Text style={{width: '100%', padding: SCREEN_HEIGHT * 0.005, fontWeight: '500', fontSize: SCREEN_HEIGHT * 0.014}} >{article.title}</Text>
          </TouchableOpacity> 
        </View>
    )
}

export default ArticleCard