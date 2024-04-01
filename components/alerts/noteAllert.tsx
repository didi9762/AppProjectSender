import { useNavigation } from "@react-navigation/native";
import Iocicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Dialog } from "react-native-elements";
import { Text } from "react-native-elements";
import { useEffect } from "react";

interface props {
  visible: boolean;
  handlePress: () => void;
  noteInfo: {
    type: string;
    message: string;
  } | null;
}

const NoteAlert = ({ visible, handlePress, noteInfo }: props) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (noteInfo?.type === "success" && visible) {
      setTimeout(() => {
        handlePress();
      }, 10000);
    }
  }, [visible]);

  return (
    <Dialog
      overlayStyle={styles.dialogContainer}
      isVisible={visible}
      onBackdropPress={() => handlePress()}
    >
      <View style={{ flexDirection: "row" }}>
        {noteInfo?.type === "success" ? (
          <Iocicons
            name="checkmark-circle"
            size={25}
            color={"green"}
            style={{ marginRight: 10 }}
          />
        ) : noteInfo?.type === "note" ? (
          <FontAwesome
            name="hand-pointer-o"
            size={25}
            color={"#5353ab95"}
            style={{ marginRight: 10 }}
          />
        ) : (
          <Iocicons
            name="warning"
            size={25}
            color={"red"}
            style={{ marginRight: 10 }}
          />
        )}
        <Dialog.Title title={noteInfo?.type} />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "90%",
        }}
      >
        <Text>{noteInfo?.message}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {noteInfo?.type !== "success" ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.navigate("Help" as never);
              handlePress();
            }}
          >
            <Text style={{ color: "blue" }}>More Detailes</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    position: "absolute",
    top: 15,
    width: "94%",
    height: "auto",
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

export default NoteAlert;
