import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { baseurlAtom, shortTaskChange, userDetailes } from "../Atoms";
import LoadingAnimation from "../LoadAnimation";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

interface props {
  id: string;
  userName:string,
  index:number,
  open:boolean,
}
interface Info {
  destination: string;
  deliveryGuy?: string;
  price: string;
  saved:boolean;
  time?: string; // add task post time
} 

const TaskShortView = ({ id,userName,index,open}: props) => {
  const [url] = useAtom(baseurlAtom);
  const [userD] = useAtom(userDetailes)
  const [taskInfo, setTaskInfo] = useState<Info | null>(null);
  const [change] = useAtom(shortTaskChange)
  const [isLoad,setIsLoad] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    async function getData() {
        setIsLoad(true)
      try {
        const response = await axios.get(`${url}sender/taskoverview`, {
          headers: {
            userName:userName,
            taskId: id,
            open:open
          },
        });
        const data = await JSON.parse(response.data);
        setTaskInfo(data);
        setIsLoad(false)
      } catch (e) {
        console.log("error try get task info:", e);
      }
    }
    getData()
  },[change]);

function handlePress(){
    const link = taskInfo?.deliveryGuy?'InProgress':'OpenTasks'
    navigation.navigate(link as never)
}

  return (
    
    <View style={{width:'100%',alignItems:'center'}}>
        {isLoad?<LoadingAnimation w={'90%'} h={80}/>:
        <TouchableOpacity style={styles.container} onPress={handlePress}>
          <View style={{flexDirection:'row',justifyContent:open?'space-between':'space-around',width:'90%'}}>
            <Text style={{fontWeight:'bold'}}>{index+1}</Text>
            <Text>Task Number ? </Text>
            {open?<FontAwesome name="hand-stop-o" size={25} color={taskInfo?.saved?'red':'white'}/>:null}</View>
      <Text>{`to ${taskInfo?.destination}`}</Text>
      <Text style={{ fontWeight: "bold" }}>{taskInfo?.price} ₪</Text></TouchableOpacity>}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:10,
    backgroundColor: "6c6cc69a",
    width: "100%",
    maxHeight: "auto",
    minHeight: 80,
    borderWidth: 0.2,
    borderRadius:10,
    marginTop: 10,
    alignItems:'center'
  },
});
export default TaskShortView;
