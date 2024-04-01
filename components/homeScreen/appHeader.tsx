import React, { useState } from "react"
import { View,StyleSheet, TouchableOpacity ,Image} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import AnimatedTitle from "./animatedTitle"
import { DrawerActions } from "@react-navigation/native"
import {useNavigation,useRoute} from "@react-navigation/native"
import Menu from "./menu"

const AppHeader = () =>{
    const [visible,setVisible] = useState(false)
const navigation = useNavigation()
const rute =useRoute()

function handleHeaderPress(){
    if(rute.name==='HomePage'){
        setVisible(true)
    }
    else{
        navigation.navigate('HomePage' as never)
    }
}

    return (
        <View style={styles.header}>
            <TouchableOpacity style={styles.leftBtn} onPress={handleHeaderPress}>
            {rute.name==='HomePage'?<Ionicons name="menu" size={40}/>:<Feather name='arrow-left-circle' size={40}/>}
            </TouchableOpacity>
            <Menu isVisible={visible} onClose={()=>setVisible(!visible)}/>
            <AnimatedTitle highlight1="#37378b9a" highlight2="#2828759a" basicColor="#1d1d5b9a" title={"Sender Side"}/>
            <Image source={require('./israel.png')} style={{height:40,width:40}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width:'100%',
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: '#3498db',
      padding: 15,
        paddingTop:20,
      justifyContent:'space-between'
    },
    leftBtn:{
        elevation:10,
        justifyContent:'center',
        height:40,
        width:50
    }
})

export default AppHeader

