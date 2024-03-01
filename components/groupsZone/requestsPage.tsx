import { useEffect, useState } from "react"
import { View ,Text, Button} from "react-native"
import { useAtom } from "jotai"
import { userDetailes } from "../../userDetailes"
import axios from "axios"
import { Requests } from "../../types"
import TemporaryUrl from "../../temporaryUrl"




const RequestsPage = ()=>{
const [userD] = useAtom(userDetailes)
    const [list,setList] = useState<Array<Requests>>([])

    useEffect(()=>{
async function getData(){
    if(userD){
        setList(userD.requests)
    }
}
getData()
    },[])

async function handleSubmit(userId:string){
    if(userD){
try{
    const response = await axios.post(`http://${TemporaryUrl}:12345/client/submitjoin`,{userId:userId,groupId:userD.userName})

}catch(e){console.log('error try submit:',e);
}

}
}

    return <View>
        {list.length===0?<View><Text>no requests</Text></View>:
        list.map((r,i)=>
        <View key={i} >
            <Text>{`user:${r.userId} time:${r.time}`}</Text>
            <Button title="submit" onPress={()=>handleSubmit(r.userId)}></Button>
        </View>
        )
        }
    </View>
}

export default RequestsPage