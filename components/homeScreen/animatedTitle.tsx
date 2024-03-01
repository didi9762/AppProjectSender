import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  highlight1:string;
  highlight2:string;
  basicColor:string;
}

const AnimatedTitle = ({ title,highlight1,highlight2 ,basicColor}: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 3) % title.length);
    }, 200); // Adjust the duration of each animation (in milliseconds)

    return () => clearInterval(timer);
  }, [title]);

  return (
    <View style={styles.container}>
      {title.split("").map((letter, idx) => (
        <Text
          key={idx}
          style={[
            styles.text,{color:basicColor},
            idx === index ? {color:highlight1} : null,
            idx === index + 1 ? {color:highlight1} : null,
            idx === index + 2 ? {color:highlight2} : null,
          ]}
        >
          {letter}
        </Text>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  text: {
    fontSize: 24,
    fontWeight:'bold'
  }
});

export default AnimatedTitle;
