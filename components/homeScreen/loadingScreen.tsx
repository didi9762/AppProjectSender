import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet ,Text,Dimensions} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const LoadingScreen = () => {
    const iconSize = 50;
    const iconParts = 5;
    const growDuration = 500;
    const screenHeight = Dimensions.get('window').height;
  
    const animatedValues = useRef([...Array(iconParts)].map(() => new Animated.Value(0))).current;
  
    useEffect(() => {
      const animations = animatedValues.map((value, index) => (
        Animated.timing(value, {
          toValue: 1,
          duration: growDuration,
          delay: index * (growDuration / iconParts),
          useNativeDriver: false,
        })
      ));
  
      Animated.loop(Animated.sequence(animations)).start();
    }, [animatedValues, growDuration, iconParts]);
  
    const iconPartStyles = animatedValues.map((value, index) => ({
      transform: [
        {
          translateY: value.interpolate({
            inputRange: [0, 1],
            outputRange: [20, -10], // Adjust the value here to change the upward movement
          }),
        },

      ],
      opacity: value.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0],
      }),
    }));
  
    return (
      <View style={{...styles.container,height:screenHeight}}>
        <View style={styles.noteContainer}>
            <Text style={styles.txtStyle}>Publishing Task</Text>
            <View style={styles.iconContainer}>
          {iconPartStyles.map((style, index) => (
            <Animated.View key={index} style={[styles.iconPart, style]}>
            <Text>
            <MaterialIcons name='keyboard-double-arrow-up' size={iconSize} color={'#5555f195'}/> 
            </Text>
           </Animated.View>
        ))}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    position:'absolute',
    top:20,
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'rgba(196, 196, 244, 0.5)',
    zIndex:999
  },
  noteContainer:{
    height:150,
    width:'80%',
    backgroundColor:'rgba(196, 196, 244, 0.9)',
    justifyContent:'space-around',
    alignItems:'center',
    borderRadius:10,
    flexDirection:'column'
  },
  txtStyle:{
fontSize:30,
fontWeight:'bold',
color:'#26265395'
  },
  iconContainer: {
    flexDirection: 'row',
  },
  iconPart: {
    marginRight: 10,
  },
});

export default LoadingScreen;
