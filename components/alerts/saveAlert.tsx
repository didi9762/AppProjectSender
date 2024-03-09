import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Dialog } from "react-native-elements"
import { Text } from "react-native-elements"

interface props{
    visible:boolean
    handlePress:(massge:string,taskId?:string,client?:string, address?:string)=>void
    saveInfo:{
        taskId:string,
        clientId:string,
        address:string|undefined
    } |null
}

const AlertSaveDaiolog = ({visible,handlePress,saveInfo}:props)=>{
const navigation = useNavigation()

    return(
<Dialog
overlayStyle={styles.dialogContainer}
      isVisible={visible}
      onBackdropPress={()=>handlePress('cancel')}
    >
      <Dialog.Title title="Miision Save Confirm"/>
      <View style={{display:'flex',flexDirection:'row'}}>
      <Text>Delivery Guy:</Text>
      <Text style={styles.txtBold}>{saveInfo?.clientId}</Text>
      <Text> is saved the task to:</Text>
       <Text style={styles.txtBold}> {saveInfo?.address}</Text>
      </View>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
      <Text>Do you want to confirem?</Text>
      <TouchableOpacity onPress={()=>{navigation.navigate('OpenTasks' as never);handlePress('cancel')}}>
      <Text style={{color:'blue'}}  >More Detailes</Text></TouchableOpacity>
      </View>
      <Dialog.Actions>
      <Dialog.Button buttonStyle={styles.btn}  titleStyle={styles.txt} title="Cancel" onPress={()=>handlePress('cancel')}/>

        <Dialog.Button  buttonStyle={{...styles.btn,marginRight:100}} titleStyle={styles.txt}  title="Confirm" onPress={()=>handlePress('confirm',saveInfo?.taskId,saveInfo?.clientId,saveInfo?.address)}/>
      </Dialog.Actions>
    </Dialog>
    ) 
}

const styles = StyleSheet.create({
    dialogContainer:{
position:'absolute',
top:0,
width:'94%',
height:'21%',
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

export default AlertSaveDaiolog