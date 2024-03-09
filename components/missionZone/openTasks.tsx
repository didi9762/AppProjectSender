import { useEffect, useState } from "react";
import { ScrollView, View, Text, RefreshControl, StyleSheet, TouchableOpacity,ActivityIndicator } from "react-native";
import { Task } from "../../types";
import axios from "axios";
import { useAtom } from "jotai";
import { baseurlAtom, senderSocket, userDetailes } from "../Atoms";
import closeTask from "../globalFunctions/closeTaskFunc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rejectSave from "../globalFunctions/rejectSaveFnuc";

const OpenTasks = () => {
  const [data, setData] = useState<Array<Task>>([]);
  const [userD] = useAtom(userDetailes)
  const [url] = useAtom(baseurlAtom);
  const [socket] = useAtom(senderSocket);
  const [reload,setReload]=useState(false)
  const [isLoad,setIsLoad] = useState(false)

  useEffect(() => {
    getData();
  }, [,reload]);

  async function getData() {
    setIsLoad(true)
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${url}sender/opentasks/?token=${token}`)
      setData(response.data);
      setIsLoad(false)
    } catch (e) {
      console.log("error try get open missions:", e);
    }
  }

  return (
    <View>
        {isLoad?<View style={{display:'flex',justifyContent:'center',height:'90%'}}>
        <ActivityIndicator size={80} />
        </View>:
    <ScrollView
refreshControl={<RefreshControl refreshing={isLoad} onRefresh={getData}/>}>
      {data.length > 0 ? (
        data.map((task, i) => (
          <View key={i} style={{ borderWidth: 1 }}>
            <Text>{task?.address}</Text>
            <Text>{task?.price}</Text>
            <Text>
              Saved For Delivery Guy:{" "}
              {task?.saved ? task.saved : "no one save yet"}
            </Text>
            {task?.saved && (
              <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                
                <TouchableOpacity
                style={styles.btn}
                  onPress={() => {
                    if (task && task.saved&&userD) {
                      socket && closeTask(task.id,task.address, task.saved, socket,userD.userName);setReload(!reload)
                    }
                  }}
                ><Text style={{ color:'white'}}>Confirm</Text></TouchableOpacity>
                <TouchableOpacity
                style={styles.btn}
                  onPress={() => {
                    if (task && task.saved) {
                      socket && rejectSave(task.saved,`${userD?.firstName} ${userD?.lastName}`,socket,task.id,task.address);setReload(!reload)
                    }
                  }}
                ><Text style={{ color:'white'}}>Reject</Text></TouchableOpacity>
              </View>
            )}
          </View>
        ))
      ) : (
        <Text>no tasks are open</Text>
      )}
    </ScrollView>}
    </View>
  );
};

const styles = StyleSheet.create({
    btn:{
        borderRadius:20,
        backgroundColor:'#4c4cb99a',
        paddingRight:20,
        paddingLeft:20,
       
    }
})

export default OpenTasks;
