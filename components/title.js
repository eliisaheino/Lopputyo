import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Title = ({titleText}) => {
  return (
    <View style={styles.container}>
      <Text 
      style={styles.title}>
      {titleText}
      </Text>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
    title:{
        fontSize: 40,
        fontWeight: '600',
        color:'#0077b3',
    },
    container:{
        paddingVertical: 16,
        justifyContent:'center',
        alignItems:'center',

    }
});