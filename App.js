import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/home';
import Quiz from './screens/quiz';
import Result from './screens/result';
import MyStack from './navigation';
import { NavigationContainer } from '@react-navigation/native';




export default function App() {
  return (
      <NavigationContainer>
       <MyStack />
      </NavigationContainer>    
  
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
