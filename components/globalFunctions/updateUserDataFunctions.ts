import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export async function updateLists(url:string,update:string){
    const token  = await AsyncStorage.getItem('token')
    try{
        const response = await axios.get(`${url}sender/${update}List`,{
            headers:{
                authorization:token
            }
        })
        const data = response.data
        return(data)
    }catch(e){
        console.log('error try update open tasks:',e);
        
    }
}

export function updateAfterConfirm(taskId:string,listToAdd:Array<string>,listToDelete:Array<string>){
    listToAdd.push(taskId)
    const newList = listToDelete.filter((item)=>item!==taskId)
return ({list1:listToAdd,list2:newList})
}