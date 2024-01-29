import { Text, View,Button } from "react-native";
import PublishTask from "./sendTask";

export default function HomePage(){

    return (<View>
        <Text>Home page</Text>
        <PublishTask/>
    </View>)
}