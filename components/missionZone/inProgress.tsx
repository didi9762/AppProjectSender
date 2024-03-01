import { useEffect, useState } from "react"
import { ScrollView, View,Text,ActivityIndicator, RefreshControl} from "react-native"
import { Task } from "../../types"
import axios from "axios"
import { useAtom } from "jotai"
import { baseurlAtom, senderSocket } from "../Atoms"
import closeTask from "../globalFunctions/closeTaskFunc"
import AsyncStorage from "@react-native-async-storage/async-storage"



const MissionsInProgress = ()=>{
    const [data,setData] = useState<Array<Task>>([])
    const [reload,setReload]=useState(false)
    const [url] = useAtom(baseurlAtom)
    const [socket] = useAtom(senderSocket)
    const [isLoad,setIsLoad] = useState(false)

    useEffect(()=>{

getData()
    },[reload])

    async function getData() {
        setIsLoad(true)
        try{
            const token = await AsyncStorage.getItem('token')
    const response = await axios.get(`${url}sender/tasksinprogress/?token=${token}`)
    setData(response.data)
    setIsLoad(false)
        }catch(e){console.log('error try get open missions:',e);
        }
    }



    return(
        <View>
        {isLoad?<View style={{display:'flex',justifyContent:'center',height:'90%'}}>
        <ActivityIndicator size={80} />
        </View>:
        <ScrollView refreshControl={<RefreshControl refreshing={isLoad} onRefresh={getData}/>}>
            {data.length>0?data.map((task,i)=>
            <View key={i} style={{borderWidth:1}}>
        <Text>{task?.address}</Text>
        <Text>{task?.price}</Text>
        <Text>Delivery Guy: {task?.deliveryGuy}</Text>
          </View>
            ):<Text>no tasks in progress</Text>}

        </ScrollView>}
        </View>
    )
}

export default MissionsInProgress
