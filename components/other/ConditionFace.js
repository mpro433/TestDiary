import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

export default ConditionFace = ({ source, title, withMark }) => {
    return (
      <View style={styles.cardContainer}>
          <View>
            <Image resizeMode='contain' style={{width: 50}} source={source}/>
            {withMark && <Image source={require('./../../src/assets/checkIcon.png')} style={{position: "absolute", bottom: 0, right: 0}}/>}
          </View>
        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.text}>{title}</Text>
      </View>
    );  
};


const styles = StyleSheet.create({
  cardContainer: {
      width: 80, height: 100,
    flexDirection: 'column', 
    alignItems: 'center',
    //padding: 15,
    backgroundColor: 'white'
  },  
  text: {
    flexShrink: 1,
    fontSize: 10,
  }
});
