import { useEffect, useState } from "react"
import HomePage from "./homeScreen/HomePage"
import { useAtom } from "jotai"
import { baseurlAtom, intaliazation, senderSocket,userDetailes } from "./Atoms"
import senderSocketFunc from "../clientSend"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { View,Text } from "react-native"
import AlertMain from "./alerts/AlertMain"
import { alertType } from "../types"
import closeTask from "./globalFunctions/closeTaskFunc"


const Main = ()=>{
const [userD,setuserD] = useAtom(userDetailes)
const [socket,setSocket] = useAtom(senderSocket)
const [alertOn,setAlertOn] = useState<alertType|null>(null)
const [url,setUrl] = useAtom(baseurlAtom)
const navigation = useNavigation()


useEffect (()=>{
    if(!socket){
    goOnline(false)}
},[userD])

async function goOnline(forceLogIn:boolean) {
    if (socket) {
      return;
    }
    if(!userD){  
        navigation.navigate('LogIn' as never)
       return}
       if(!forceLogIn&&userD.tasksInProgress.length===0&&userD.tasksOpen.length===0){
        return
       }
    else{
      const token = await AsyncStorage.getItem('token')
    const sender = senderSocketFunc(updateFunc, () => {
      setSocket(null)}, userD.userName, userD.address, userD.city, userD.group,token,url
    );
    setSocket(sender.socket);}
    setuserD({...userD,online:true})
  }


function updateFunc(type:string,info1:string,info2:string,info3:string){
        const alertDetailes = {
            type:type,
            info1:info1,
            info2:info2,
            info3:info3
        }
        setAlertOn(alertDetailes)
    }

function closeAlert(){
    setAlertOn(null)
    
}

function handleSaveConfirem(massage:string,taskId?:string,client?:string,address?:string){
if(massage==='cancel'){
    return
}
else{
    if(taskId&&client&&socket&&address&&userD){
    closeTask(taskId,address,client,socket,userD.userName)}
}
}



    return (
        <View  >
            {userD&&<View>
    <AlertMain isVisible={alertOn} handleSaveFunc={handleSaveConfirem} close={closeAlert} />
    <HomePage goOnline = {goOnline}/>
    </View>}
    </View>
    )
}

export default Main