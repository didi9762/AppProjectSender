import { Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import NextBtn from "./RightHeader"

const SecondPost = ()=>{

    const navigation = useNavigation()

    useEffect(()=>{
        navigation.setOptions(
            {headerRight:()=><NextBtn handlePress={()=>navigation.navigate('Therd' as never)}/>,
            
        }
        )
            },[])
    return (
        <View>
            <Text style={{fontSize:40}}>second step</Text>
        </View>
    )
}

export default SecondPost