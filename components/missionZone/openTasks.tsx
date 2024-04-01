import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { TaskType } from "../../types";
import axios from "axios";
import { useAtom } from "jotai";
import {
  baseurlAtom,
  senderSocket,
  shortTaskChange,
  userDetailes,
  menuChange,
} from "../Atoms";
import closeTask from "../globalFunctions/closeTaskFunc";
import { updateAfterConfirm } from "../globalFunctions/updateUserDataFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import rejectSave from "../globalFunctions/rejectSaveFnuc";
import { useNavigation } from "@react-navigation/native";

const OpenTasks = () => {
  const [data, setData] = useState<Array<TaskType>>([]);
  const [userD, setUserD] = useAtom(userDetailes);
  const [url] = useAtom(baseurlAtom);
  const [socket] = useAtom(senderSocket);
  const [reload, setReload] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [menuUpdate, setMenuUpdate] = useAtom(menuChange);
  const [shortTaskUpdate, setShortTaskUpdate] = useAtom(shortTaskChange);

  useEffect(() => {
    getData();
  }, [reload]);

  async function getData() {
    setIsLoad(true);
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${url}sender/opentasks/?token=${token}`
      );
      setData(response.data);
      setIsLoad(false);
    } catch (e) {
      console.log("error try get open missions:", e);
    }
  }

  function handleConfirm(task: TaskType) {
    if (task && task.saved && userD && task._id) {
      socket &&
        closeTask(
          task._id,
          task.destination,
          task.saved,
          socket,
          userD.userName
        );
      setShortTaskUpdate(!shortTaskUpdate);
      const update = updateAfterConfirm(
        task._id,
        userD?.tasksInProgress,
        userD?.tasksOpen
      );
      setUserD({
        ...userD,
        tasksInProgress: update.list1,
        tasksOpen: update.list2,
      });
      setMenuUpdate(!menuUpdate);
      setData((prev) => prev.filter((itm) => itm?._id !== task?._id));
    }
  }

  function handleReject(task: TaskType) {
    if (task && task.saved && task._id && userD) {
      socket &&
        rejectSave(
          task.saved,
          `${userD?.firstName} ${userD?.lastName}`,
          socket,
          task._id,
          task.destination
        );
      setIsLoad(true);
      setTimeout(() => {
        setReload(!reload);
        setShortTaskUpdate(!shortTaskUpdate);
      }, 2000);
    }
  }

  return (
    <View>
      {isLoad ? (
        <View
          style={{ display: "flex", justifyContent: "center", height: "90%" }}
        >
          <ActivityIndicator size={80} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoad} onRefresh={getData} />
          }
        >
          {data?.length > 0 ? (
            data.map((task, i) => (
              <View key={i} style={{ borderWidth: 1 }}>
                <Text>{task?.destination}</Text>
                <Text>{task?.price}</Text>
                <Text>
                  Saved For Delivery Guy:{" "}
                  {task?.saved ? task.saved : "no one save yet"}
                </Text>
                {task?.saved && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => handleConfirm(task)}
                    >
                      <Text style={{ color: "white" }}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => handleReject(task)}
                    >
                      <Text style={{ color: "white" }}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text>no tasks are open</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 20,
    backgroundColor: "#4c4cb99a",
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default OpenTasks;
