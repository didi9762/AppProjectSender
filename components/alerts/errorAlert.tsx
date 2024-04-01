import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Dialog } from "react-native-elements"
import { Text } from "react-native-elements"
import Iocicons from 'react-native-vector-icons/Ionicons'

interface props{
    visible:boolean
    handlePress:()=>void
    errorInfo:{
        type:string,
        message:string,
    } |null
}

const ErrorAlert = ({visible,handlePress,errorInfo}:props)=>{
const navigation = useNavigation()
    return(
<Dialog
overlayStyle={styles.dialogContainer}
      isVisible={visible}
      onBackdropPress={()=>{handlePress()}
      }
    >
      <View style={{flexDirection:'row'}}>
      <Iocicons name="warning" size={25} color={'red'} style={{marginRight:10}}/>
      <Dialog.Title title="ERROR"/>
      </View>
      <View style={{display:'flex'}}>
      <Text style={styles.txtBold}>{`${errorInfo?.type}`}</Text>
      <Text> Error message:</Text>
       <Text style={styles.txtBold}> {errorInfo?.message}</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'center', marginTop:10}}>
      <TouchableOpacity onPress={()=>{navigation.navigate('Help' as never);handlePress()}}>
      <Text style={{color:'blue'}}  >More Detailes</Text></TouchableOpacity>
      </View>
    </Dialog>
    ) 
}

const styles = StyleSheet.create({
    dialogContainer:{
position:'absolute',
top:10,
width:'94%',
height:'auto',
borderRadius:20

    },
    btn:{
        backgroundColor:'#2525f19a',
        borderRadius:30,
        width:120,
        height:33,
    },
    txt:{
        color:'white',
        textAlign:'center',
        lineHeight:17,
        fontSize:17
    },
    txtBold:{
        fontWeight:'bold',
        fontSize:16,
        color:'#0909489a'
    }

})

export default ErrorAlert