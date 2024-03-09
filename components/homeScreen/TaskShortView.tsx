import axios from "axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { baseurlAtom, userDetailes } from "../Atoms";
import LoadingAnimation from "../LoadAnimation";
import { useNavigation } from "@react-navigation/native";

interface props {
  id: string;
  userName:string,
  index:number
}
interface Info {
  address: string;
  deliveryGuy?: string;
  price: string;
  time?: string; // add task post time
}

const TaskShortView = ({ id,userName,index }: props) => {
  const [url] = useAtom(baseurlAtom);
  const [userD] = useAtom(userDetailes)
  const [info, setInfo] = useState<Info | null>(null);
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
          },
        });
        const data = await JSON.parse(response.data);
        setInfo(data);
        setIsLoad(false)
      } catch (e) {
        console.log("error try get task info:", e);
      }
    }
    getData()
  },[userD]);

function handlePress(){
    const link = info?.deliveryGuy?'InProgress':'OpenTasks'
    navigation.navigate(link as never)
}

  return (
    
    <View style={{width:'100%',alignItems:'center'}}>
        {isLoad?<LoadingAnimation w={'90%'} h={80}/>:
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={{fontWeight:'bold',position:'absolute',left:10,top:10}}>{index+1}</Text>
            <Text>Task Number ? </Text>
      <Text>{`to ${info?.address}`}</Text>
      <Text style={{ fontWeight: "bold" }}>{info?.price} ₪</Text></TouchableOpacity>}
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
