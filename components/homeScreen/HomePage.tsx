import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "./appHeader";
import { useAtom } from "jotai";
import { userDetailes } from "../Atoms";
import TaskShortView from "./TaskShortView";

interface props {
  goOnline: (flag: boolean) => void;
}

export default function HomePage({ goOnline }: props) {
  const [userD] = useAtom(userDetailes);
  const navigation = useNavigation();
  

  return (<View>{userD&&
    <View style={{ marginTop: 20 }}>
      <AppHeader />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => {
            goOnline(true);
            navigation.navigate("PostTask" as never);
          }}
          style={styles.addBtn}
        >
          <Ionicons name="add" size={50} />
        </TouchableOpacity>
      </View>
      <View style={styles.overViewContainer}>
        <Text
          style={styles.txtTitle}
        >{`${userD?.tasksOpen.length} Open tasks`}</Text>
        <ScrollView  style={{width:'60%',height:200}}>
          {userD?.tasksOpen.map((task,i) => {
            return (
              <TaskShortView index={i} key={task} id={task} userName={userD.userName} />
            );
          })}
        </ScrollView>

        <Text
          style={styles.txtTitle}
        >{`${userD?.tasksInProgress.length} Tasks In Progress`}</Text>

        <ScrollView style={{width:'60%',height:200}}>
          {userD?.tasksInProgress.map((task,i) => {
            return (
              <TaskShortView index={i} key={task} id={task} userName={userD.userName} />
            );
          })}
        </ScrollView>
      </View>
    </View>}</View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#37378b9a",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
padding:20,
    alignItems: "center",
    justifyContent:'center'
  },
  overViewContainer: {
    width: "100%",
    height:420,
    alignItems: "center",
  },
  txtTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
