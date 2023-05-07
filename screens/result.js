import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,  } from 'react-native';
import Title from '../components/title';

const Result = ({navigation, route}) => {
  const {score} = route.params
  console.log(route)

  return ( 
  <View  style={styles.container}>
         <Title titleText='RESULTS'/>
         <Text style={styles.scoreValue}> {score} points </Text>
      <View style= {styles.bannerContainer}>
         <Image source={{
          uri:'https://cdn-icons-png.flaticon.com/512/610/610333.png'
          }}
         style={styles.banner}
         resizeMode="contain"
      />
  </View>
  <TouchableOpacity onPress={()=> navigation.navigate('Home')} style={styles.button}>
      <Text style={styles.buttonText}> GO TO HOME</Text>
  </TouchableOpacity>
</View>
  );
};



export default Result;

const styles = StyleSheet.create({
  banner:{
    height:300,
    width:300,
},
bannerContainer:{
    justifyContent: 'center',
    alignItems:'center',
    flex: 1,

},
container:{
    paddingTop: 40,
    paddingHorizontal: 20,
    height: "100%",

},
button:{
  width: "100%",
  backgroundColor: '#1A759F',
  padding: 16,
  borderRadius: 16,
  alignItems: 'center',
  marginBottom: 30,

},
buttonText:{
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
},
scoreValue:{
  fontSize: 24,
  fontWeight: '800',
  alignSelf :'center',
},

});