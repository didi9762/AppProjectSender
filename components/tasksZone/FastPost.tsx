import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  RefreshControl,
  Text,
  TouchableOpacity
} from "react-native";
import { TextInput } from "react-native-paper";
import { TaskType } from "../../types";
import { useAtom } from "jotai";
import { baseurlAtom, loadingAtom, menuChange, senderSocket, shortTaskChange, userDetailes } from "../Atoms";
import uuid from "react-native-uuid";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import TaskPreview from "./TaskPreview";
import { useNavigation } from "@react-navigation/native";
import { updateLists } from "../globalFunctions/updateUserDataFunctions";

const FastPost = () => {
  const [userD,setUserD] = useAtom(userDetailes);
  const [url] = useAtom(baseurlAtom)
  const [socket] = useAtom(senderSocket)
  const [task, setTask] = useState<TaskType | null>(null);
  const [refresh,setRefresh] = useState(false)
  const [modalVisible,setModalVisible] = useState(false)
  const { height } = useWindowDimensions();
  const navigation = useNavigation()
  const [change,setTaskChange] = useAtom(shortTaskChange)
  const [menuUpdate,setMenuUpdate] = useAtom(menuChange)
  const [,setLoadingA] = useAtom(loadingAtom)

  useEffect(() => {
    if (userD) {
      setTask({
        source: userD.address,
        destination: "",
        sender: userD.userName,
        open: true,
        pickupTime: 10,
        deliveryTime: "now",
        price: 0,
        type: "privet",
        senderName: `${userD.firstName} ${userD.lastName}`,
        senderPhone: userD.phone,
        paymentMethod: "cash",
      });
    }
  }, [refresh]);

  function handleNumbersChange(txt: string, field: boolean) {
    const parsedPrice = Number(txt);
    if (!isNaN(parsedPrice)) {
      if (task) {
        field
          ? setTask({ ...task, price: parsedPrice })
          : setTask({ ...task, pickupTime: parsedPrice });
      }
    }
  }

  function handleCarType(type: "car" | "station" | "motor") {
    if (task) {
      setTask({ ...task, vehicleType: type });
    }
  }

  async function postTask(){
    setLoadingA(true)
        if (socket !== null &&task&&userD) {
        socket.send(JSON.stringify({type:'privet',newTask:task}));
        setModalVisible(false)
        setLoadingA(true)
        navigation.navigate('MainNav',{screen:'HomePage'})}
    }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, height: height - (Platform.OS === "ios" ? 0 : 20) }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
        <TaskPreview visible={modalVisible} touggleModal={()=>setModalVisible(false)} postTaskFunc={postTask} taskInfo={task}/>
      <ScrollView
      refreshControl={<RefreshControl
      onRefresh={()=>setRefresh(!refresh)}
      refreshing={false}
      />}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <View style={styles.carTypeCont}>
            <TouchableOpacity
              onPress={() => handleCarType("car")}
              style={[
                { ...styles.carBtn },
                task && task.vehicleType === "car"
                  ? { backgroundColor: "red" }
                  : null,
              ]}
            >
              <Fontisto name="car" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCarType("motor")}
              style={[
                { ...styles.carBtn },
                task && task.vehicleType === "motor"
                  ? { backgroundColor: "red" }
                  : null,
              ]}
            >
              <FontAwesome5 name="motorcycle" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCarType("station")}
              style={[
                { ...styles.carBtn },
                task && task.vehicleType === "station"
                  ? { backgroundColor: "red" }
                  : null,
              ]}
            >
              <MaterialCommunityIcons name="car-estate" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputCont}>
            <MaterialCommunityIcons
              name="map-marker"
              size={25}
              style={styles.iconStyle}
            />
            <TextInput
              style={styles.inputTxt}
              label="Destination"
              value={task ? task.destination : ""}
              onChangeText={
                task
                  ? (txt) => setTask({ ...task, destination: txt })
                  : () => null
              }
            />
          </View>
          <View style={styles.inputCont}>
            <Fontisto name="ils" size={20} style={styles.iconStyle} />
            <TextInput
              style={styles.inputTxt}
              label="Price"
              maxLength={3}
              keyboardType="numeric"
              value={task ? task.price.toString() : "0"}
              onChangeText={(txt) => handleNumbersChange(txt, true)}
            />
          </View>
          <View style={styles.inputCont}>
            <FontAwesome name="phone" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.inputTxt}
              label="Client Phone"
              keyboardType="numeric"
              maxLength={10}
              value={task ? task.receiverPhone : ""}
              onChangeText={
                task
                  ? (txt) => setTask({ ...task, receiverPhone: txt })
                  : () => null
              }
            />
          </View>
          <View style={styles.inputCont}>
            <Ionicons name="timer" size={25} style={styles.iconStyle} />
            <TextInput
              style={styles.inputTxt}
              label={`PickUp In ${task?.pickupTime} minutes`}
              maxLength={2}
              keyboardType="numeric"
              value={task ? task.pickupTime.toString() : "10"}
              onChangeText={(txt) => handleNumbersChange(txt, false)}
            />
          </View>
          <View style={styles.inputCont}>
            <FontAwesome name="exclamation" size={30} style={{ padding: 18 }} />
            <TextInput
              style={styles.inputTxt}
              label="Add Note"
              multiline={true}
              value={task ? task.notes : ""}
              onChangeText={
                task ? (txt) => setTask({ ...task, notes: txt }) : () => null
              }
            />
          </View>
        </View>
        <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.sendBtn}>
<Text style={{textAlign:'center',color:'white',fontSize:25,fontWeight:'bold'}}>Post Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexGrow: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },

  iconStyle: {
    marginTop: 5,
    padding: 10,
  },
  inputCont: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#c8cebfb7",
    borderBottomWidth: 2,
  },
  inputTxt: {
    width: "60%",
    backgroundColor: "transparent",
  },
  carTypeCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carBtn: {
    padding: 10,
    borderRadius: 50,
  },
  sendBtn:{
    width:'60%',
    borderRadius:25,
backgroundColor:'#7171edb7'
  }
});

export default FastPost;
