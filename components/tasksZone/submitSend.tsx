import { useNavigation } from "@react-navigation/native"
import { Text, View } from "react-native"
import { Button } from "react-native-elements"



const SubmitSend = ()=>{
    const navigation = useNavigation()
    
    return (
        <View>
            <Button style={{height:70,backgroundColor:'red'}}  onPress={()=>navigation.navigate('MainNav',{screen:'HomePage'})}>hgjhgkhjgkhghj</Button>
            <Text>submit senkjhlkjhlkjd</Text>
        </View>
    )
}

export default SubmitSend