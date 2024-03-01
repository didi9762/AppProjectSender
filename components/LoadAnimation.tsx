import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

interface Props{
  h:number|'auto'|`${number}%`,
  w:number|'auto'|`${number}%`,
}

const SnakeBorderAnimation = ({w,h}:Props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    };

    animate();
  }, []);

  const borderWidth = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 5, 1], 
  });

  return (
    <View style={[styles.container,{width:w,height:h}]}>
      <Animated.View style={[styles.box, { borderWidth: borderWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    opacity:0.5
  },
  box: {
    width: '100%',
    height: '100%',
    borderColor: '#91919c56',
    borderRadius:10,
  },
});

export default SnakeBorderAnimation;
