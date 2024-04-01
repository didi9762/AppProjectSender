import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import { TaskType } from "../../types";

interface props {
  taskInfo: TaskType | null;
  touggleModal: () => void;
  visible: boolean;
  postTaskFunc: () => void;
}

const TaskPreview = ({
  taskInfo,
  touggleModal,
  visible,
  postTaskFunc,
}: props) => {
  const { height } = Dimensions.get("window");

  const CarIcon = () => {
    return taskInfo?.vehicleType === "car" ? (
      <Fontisto name="car" size={45} />
    ) : taskInfo?.vehicleType === "motor" ? (
      <FontAwesome5 name="motorcycle" size={45} />
    ) : (
      <MaterialCommunityIcons name="car-estate" size={45} />
    );
  };

  return (
    <Modal
      isVisible={visible}
      style={styles.modalStyle}
      onBackdropPress={touggleModal}
      animationIn="fadeIn"
      animationOut={"fadeOut"}
      backdropOpacity={0.4}
      avoidKeyboard={true}
      deviceHeight={height + 120}
    >
        <View style={{backgroundColor:'white',width:'95%',height:'90%', borderRadius: 15,}}>
      <View style={styles.container}>
        <View style={styles.taskCard}>
            <Text style={{textAlign:'center',fontSize:30,fontWeight:'bold'}}>New Task</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between',padding:5}}>
            <CarIcon />
            <View style={{borderRadius:50,backgroundColor:'#c4c4c9ce',width:60,height:60,justifyContent:'center'}}>
              <Text style={{textAlign:'center',color:'red',fontWeight:'bold',fontSize:20}}>{`${taskInfo?.pickupTime} M` }</Text>
            </View>
          </View>
          <Text style={styles.txt}>From: {taskInfo?.source}</Text>
          <Text style={styles.txt}>
            To: {taskInfo?.destination}
          </Text>
          <Text style={styles.txt}>Price: {taskInfo?.price}</Text>
          <Text style={styles.txt}>
            Client Phone: {taskInfo?.receiverPhone}
          </Text>
          {taskInfo?.notes && <Text style={styles.txt}>Additinal Notes: {taskInfo?.notes}</Text>}
        </View>
        <TouchableOpacity style={styles.btn} onPress={postTaskFunc}>
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 25,
              fontWeight: "bold",
            }}
          >
            POST
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
    flex: 1,
    marginLeft: 15,
  },
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#c1c1f195",
    
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-around",
  },
  taskCard: {
    padding: 10,
  },
  btn: {
    width: "70%",
    borderRadius: 25,
    backgroundColor: "#7171edb7",
  },
  txt: {
    fontSize: 25,
    fontWeight: "bold",
    borderBottomWidth:0.1905,
    padding:5
  },
});

export default TaskPreview;
