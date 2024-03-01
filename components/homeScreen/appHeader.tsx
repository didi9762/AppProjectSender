import React, { useState } from "react"
import { View,StyleSheet, TouchableOpacity ,Image} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Menu from "./menu"
import AnimatedTitle from "./animatedTitle"


const AppHeader = () =>{
    const [visible,setVisible] = useState(false)

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>setVisible(!visible)}>
            <Ionicons name="menu" size={40}/>
            </TouchableOpacity>
            <Menu isVisible={visible} onClose={()=>setVisible(!visible)}/>
            <AnimatedTitle highlight1="#37378b9a" highlight2="#2828759a" basicColor="#1d1d5b9a" title={"Sender Side"}/>
            <Image source={require('./israel.png')} style={{height:40,width:40}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#3498db',
      padding: 15,
      justifyContent:'space-between'
    }})

export default AppHeader

