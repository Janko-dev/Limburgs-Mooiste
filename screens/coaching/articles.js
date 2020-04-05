import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Linking, Alert } from 'react-native';
import { globalStyles, Colors } from '../../constants';
import firebase from '../../api/firebase';
import ArticleCard from '../../components/article';
import AchievementModal from '../modals/achievementModal';


export default ArticleScreen = props => {

    // const [lvlUp, setLvlUp] = useState(false);
    const [articles, setArticles]  = useState([]);

    const articleInfoHandler = () => {
        Alert.alert(
          'Artikelen',
          'Wist je dat je ervaring kan verdienen door artikelen te delen?',
          [
            {text: 'Begrepen', onPress: lvlUpHandler }
          ],
    
        )
      }

    // const lvlUpHandler = () => {
    //     setLvlUp(!lvlUp)
    // }

    useEffect(() => {
        firebase.getArticles().then(result => {
  
          setArticles(() => {
            return result.docs.map(doc => {
              return doc.data();
            })
          })
        })
  
      }, []) 

return (
    <View style={{padding: 20, justifyContent: 'center'}}>
        {/* <AchievementModal isVisible={lvlUp} level={14} onClose={lvlUpHandler} remainingExp={'s'}></AchievementModal> */}
                <Text style={{fontWeight: '100', fontStyle: 'italic', color: Colors.secondary}}>Alles wat betreft <Text onPress={articleInfoHandler} style={{fontWeight: '400'}}>artikelen</Text> over Limburgs Mooiste, wielrennen en core stability vind je hier!</Text>
                <ScrollView style={{height: '100%', marginTop: 20, marginBottom: 20}} showsVerticalScrollIndicator='false'>

                    <Text style={{color: Colors.secondary, fontWeight: '500', fontSize: 15, margin: 10}}>Limburgs Mooiste</Text>
                    <ScrollView horizontal={true}  style={{height: 200}}  showsHorizontalScrollIndicator={false} >

                    {articles.map((item, index) => {
                      if (item.genre == "LM"){
                        return (<ArticleCard key={index} article={item}></ArticleCard>)
                      } else {
                        return null
                      }
                    })}
                    </ScrollView>

                    <Text style={{color: Colors.secondary, fontWeight: '500', fontSize: 15, marginLeft: 10, marginBottom: 10}}>Wielrennen</Text>
                    <ScrollView horizontal={true}  style={{height: 200}} showsHorizontalScrollIndicator={false}>

                    {articles.map((item, index) => {
                      if (item.genre == "WR"){
                        return (<ArticleCard key={index} article={item}></ArticleCard>)
                      } else {
                        return null
                      }
                    })}
                    </ScrollView>

                    <Text style={{color: Colors.secondary, fontWeight: '500', fontSize: 15, marginLeft: 10, marginBottom: 10}}>Core Stability</Text>
                    <ScrollView horizontal={true}  style={{height: 200}} showsHorizontalScrollIndicator={false} >

                    {articles.map((item, index) => {
                      if (item.genre == "CS"){
                        return (<ArticleCard key={index} article={item}></ArticleCard>)
                      } else {
                        return null
                      }
                    })}
                    </ScrollView>
  
                </ScrollView>
          </View>)
}