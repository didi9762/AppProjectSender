import { Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import NextBtn from "./RightHeader"


const TherdPost = ()=>{
    const navigation = useNavigation()

    useEffect(()=>{
        navigation.setOptions(
            {headerRight:()=><NextBtn handlePress={()=>navigation.navigate('Submit' as never)}/>}
        )
            },[])

    
    return (
        <View>
            <Text>therd step</Text>
        </View>
    )
}

export default TherdPost