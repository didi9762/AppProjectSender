import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View,TouchableOpacity, StyleSheet } from "react-native";
import NextBtn from "./RightHeader";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const FirstPost = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NextBtn handlePress={() => navigation.navigate("Second" as never)} />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
      style={styles.fastBtn}
        onPress={() => {navigation.navigate("FastPost" as never)}}
      >
        <View style={styles.btnCont}>
        <MaterialIcons name="double-arrow" size={30}/>
        <Text style={{textAlign:'center',fontSize:25,fontWeight:'bold'}}>Fast Task Post</Text>
        <MaterialIcons name="double-arrow" size={30}/>
        </View>
      </TouchableOpacity>
      <View style={styles.pageCont}>
      <Text style={{fontSize:40}}>first step</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
alignItems:'center',
justifyContent:'space-around',
height:'100%'
  },
fastBtn:{
  height:40,
  width:'90%',
  borderRadius:20,
  backgroundColor:'#64649b95',
  elevation:30,
},
btnCont:{
  marginTop:5,
  flexDirection:'row',
  justifyContent:'space-around',
},
pageCont:{
  height:'80%'
}
})

export default FirstPost;
