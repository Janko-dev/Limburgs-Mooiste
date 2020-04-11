import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { globalStyles, Colors, SCREEN_HEIGHT } from '../../constants';
import ArticleCard from '../../components/article';

export default ArticleScreen = ({ data }) => {


  const articleInfoHandler = () => {
    Alert.alert(
      'Artikelen',
      'Wist je dat je ervaring kan verdienen door artikelen te delen?',
      [
        { text: 'Begrepen', onPress: () => ({}) }
      ],

    )
  }

  return (
    <View style={{ padding: SCREEN_HEIGHT * 0.02, justifyContent: 'center' }}>

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontWeight: '100', fontStyle: 'italic', color: Colors.secondary }}>Alles wat betreft <Text onPress={articleInfoHandler} style={{ fontWeight: '400' }}>artikelen</Text> over Limburgs Mooiste, wielrennen en core stability vind je hier!</Text>
      </View>
      <ScrollView style={{ height: '100%', marginTop: SCREEN_HEIGHT * 0.02, marginBottom: SCREEN_HEIGHT * 0.02 }} showsVerticalScrollIndicator='false'>

        <View style={{justifyContent: 'flex-end'}}>
          <Text style={{ color: Colors.secondary, fontWeight: '500', fontSize: SCREEN_HEIGHT * 0.016, margin: '2.5%' }}>Limburgs Mooiste</Text>
        <ScrollView horizontal={true} style={{ height: SCREEN_HEIGHT * 0.23 }} showsHorizontalScrollIndicator={false} >

          {data.map((item, index) => {
            if (item.genre == "LM") {
              return (<ArticleCard key={index} article={item}></ArticleCard>)
            } else {
              return null
            }
          })}
        </ScrollView>
        </View>


        <Text style={{ color: Colors.secondary, fontWeight: '500', fontSize: SCREEN_HEIGHT * 0.016, marginLeft: '2.5%', marginBottom: '2.5%' }}>Wielrennen</Text>
        <ScrollView horizontal={true} style={{ height: SCREEN_HEIGHT * 0.23 }} showsHorizontalScrollIndicator={false}>

          {data.map((item, index) => {
            if (item.genre == "WR") {
              return (<ArticleCard key={index} article={item}></ArticleCard>)
            } else {
              return null
            }
          })}
        </ScrollView>

        <Text style={{ color: Colors.secondary, fontWeight: '500', fontSize: SCREEN_HEIGHT * 0.016, marginLeft: '2.5%', marginBottom: '2.5%' }}>Core Stability</Text>
        <ScrollView horizontal={true} style={{ height: SCREEN_HEIGHT * 0.23 }} showsHorizontalScrollIndicator={false} >

          {data.map((item, index) => {
            if (item.genre == "CS") {
              return (<ArticleCard key={index} article={item}></ArticleCard>)
            } else {
              return null
            }
          })}
        </ScrollView>

      </ScrollView>
    </View>)
}