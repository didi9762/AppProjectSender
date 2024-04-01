import { useNavigation } from "@react-navigation/native";
import { useAtom } from "jotai";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Dialog } from "react-native-elements";
import { Text } from "react-native-elements";
import { menuChange, shortTaskChange, userDetailes } from "../Atoms";
import { updateAfterConfirm } from "../globalFunctions/updateUserDataFunctions";

interface props {
  visible: boolean;
  handlePress: () => void;
  doneInfo: {
    taskId: string;
    clientId: string;
    destination: string | undefined;
  } | null;
}

const DoneAlert = ({ visible, handlePress, doneInfo }: props) => {
  const navigation = useNavigation();
  const [userD, setUserD] = useAtom(userDetailes);
  const [menuUpdate, setMenuUpdate] = useAtom(menuChange);
  const [shortTaskUpdate, setShortTaskUpdate] = useAtom(shortTaskChange);

  useEffect(() => {
    if (visible === true && doneInfo && userD) {
      const update = updateAfterConfirm(
        doneInfo.taskId,
        [],
        userD?.tasksInProgress
      );
      setUserD({ ...userD, tasksInProgress: update.list2 });
      setMenuUpdate(!menuUpdate);
      setShortTaskUpdate(!shortTaskUpdate);
    }
  }, [visible]);

  return (
    <Dialog
      overlayStyle={styles.dialogContainer}
      isVisible={visible}
      onBackdropPress={() => handlePress()}
    >
      <View style={{ flexDirection: "row" }}>
        <FontAwesome name="thumbs-o-up" size={25} style={{ marginRight: 40 }} />
        <Dialog.Title title="Task Done" />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "90%",
        }}
      >
        <Text>Delivery Guy:</Text>
        <Text style={styles.txtBold}>{doneInfo?.clientId}</Text>
        <Text> is deliver the task to:</Text>
        <Text style={styles.txtBold}> {doneInfo?.destination}</Text>
        <Text>successfully</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("TasksHistory" as never);
            handlePress();
          }}
        >
          <Text style={{ color: "blue" }}>More Detailes</Text>
        </TouchableOpacity>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    position: "absolute",
    top: 15,
    width: "94%",
    borderRadius: 20,
  },
  btn: {
    marginTop: 20,
  },
  txt: {
    color: "white",
    textAlign: "center",
    lineHeight: 17,
    fontSize: 17,
  },
  txtBold: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0909489a",
  },
});

export default DoneAlert;
