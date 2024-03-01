import { useEffect, useState } from "react"
import { View,ScrollView,Text,Button,RefreshControl,ActivityIndicator } from "react-native"
import { Task } from "../../types"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useAtom } from "jotai"
import { baseurlAtom } from "../Atoms"


const TaskHistory = ()=>{
const [data,setData] = useState<Array<Task>>([])
const [url] = useAtom(baseurlAtom)
const [reload,setReload]=useState(false)
const [isLoad,setIsLoad] = useState(false)

useEffect(()=>{
    
      getData();
},[reload])

async function getData() {
    setIsLoad(true)
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${url}common/taskshistory`,{headers:{authorization:token,isSender:true}});
      setData(response.data);
      setIsLoad(false)
    } catch (e) {
      console.log("error try get open missions:", e);
    }
  }

async function handleDelete(taskId:string){
        const token = await AsyncStorage.getItem('token')
    try{
    const response = await axios.delete(`${url}common/deletetaskhistory`,{headers:{
      "Content-Type":'aplication-json',
      taskId:taskId,
    authorization:token,
    isSender:true
    }})
    console.log(response.status);
    setReload(!reload)
    }catch(e){console.log('error try delete task from history:',e);}
}

return (<View>
    {isLoad?<View style={{display:'flex',justifyContent:'center',height:'90%'}}>
    <ActivityIndicator size={80} />
    </View>:
    <ScrollView refreshControl={<RefreshControl refreshing={isLoad} onRefresh={getData}/>}>
            {data.length>0?data.map((task,i)=>
            <View key={i} style={{borderWidth:1}}>
        <Text>{task?.address}</Text>
        <Text>{task?.price}</Text>
        <Text>Delivery Guy: {task?.deliveryGuy}</Text>
        {task&&<Button title="delete" onPress={()=>handleDelete(task.id)}/>}
          </View>
            ):<Text>No tasks in are saved history</Text>}

        </ScrollView>}
        </View>)
}

export default TaskHistory