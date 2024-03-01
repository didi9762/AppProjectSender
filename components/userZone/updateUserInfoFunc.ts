import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"


async function updateUserInfo(url:string){
try{
    const response = await axios.get(`${url}sender/updateuserinfo`,{headers:{
        authorization:await AsyncStorage.getItem('token')
    }})
    const data = await response.data
    return data
}catch (e){console.log('error try get updates user info:',e);
}
}

export default updateUserInfo