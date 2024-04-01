import { createStackNavigator } from "@react-navigation/stack"
import FirstPost from "./first"
import SecondPost from "./second"
import TherdPost from "./therd"
import SubmitSend from "./submitSend"
import FastPost from "./FastPost"
import Entypo from 'react-native-vector-icons/Entypo'



const PostTaskNav = ()=>{
    const Stack = createStackNavigator()
    

    return(
        
            <Stack.Navigator initialRouteName={"First"} screenOptions={{headerBackImage:()=>
                <Entypo name="arrow-with-circle-left" size={25}/>}}>
            <Stack.Screen name="First" component={FirstPost} options={{headerLeft:()=>null,}} />
            <Stack.Screen name="Second" component={SecondPost} />
            <Stack.Screen name="Therd" component={TherdPost} />
            <Stack.Screen name="Submit" component={SubmitSend}/>
            <Stack.Screen name="FastPost" component={FastPost}  />
            </Stack.Navigator>
       
    )
}



export default PostTaskNav