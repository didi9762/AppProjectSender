import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
import { Button, Text } from "react-native-elements";
import { useAtom } from "jotai";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Feather from 'react-native-vector-icons/Feather'
import { baseurlAtom, userDetailes } from "../Atoms";
import updateUserInfo from "../userZone/updateUserInfoFunc";
import { User } from "../../types";


interface MenuProps {
  isVisible: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isVisible, onClose}) => {
  const { height } = Dimensions.get("window");
  const [userD,setUserD] = useAtom(userDetailes)
  const [url] = useAtom(baseurlAtom)
  const [newIcon,setNewIcon] = useState(false)
const navigation = useNavigation()

  useEffect(() => {
    async function update(){
      if(userD){
const {tasksInProgress,tasksOpen,groups,requests} = await updateUserInfo(url)
const update = {
  online: userD.online,
  userName: userD.userName,
  firstName: userD.firstName,
  lastName: userD.lastName,
  phone: userD.phone,
  tasksInProgress:tasksInProgress,
  tasksOpen:tasksOpen,group:groups,
  requests:requests}
setUserD(update)}
}
if(isVisible){
update()}

  }, [isVisible]);

  function itemClick(linkTo: string) {
    navigation.navigate(linkTo as never);
  }

  return (
    <Modal
      style={{ margin: 0, flex: 1 }}
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn={"slideInLeft"}
      animationOut={"slideOutLeft"}
      backdropOpacity={0.4}
      avoidKeyboard={true}
      deviceHeight={height + 120}
    >
      <View style={styles.modalStyle}>
        <View style={styles.optionContainer}>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick('LogIn');
              onClose()
            }}
          >
            <Ionicons name="person-circle" size={30} />
            <Text style={styles.textOption}>My Profile</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("TasksHistory");
              onClose();
            }}
          >
            <FontAwesome name="history" size={25} />
            <Text style={styles.textOption}>Tasks History</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("GroupsPage");
              onClose();
            }}
          >{newIcon? (
            <AntDesign
              name="exclamationcircle"
              size={25}
              color={"#ff6f00d5"}
              style={{ position: "absolute", right: 3, top: -5, zIndex: 2 }}
            />
          ) : null}
            <FontAwesome name="group" size={25} />
            <Text style={styles.textOption}>My Groups</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("InProgress");
              onClose();
            }}
          >
            {userD&&userD.tasksInProgress.length>0? (
              <AntDesign
                name="exclamationcircle"
                size={25}
                color={"#ff6f00d5"}
                style={{ position: "absolute", right: 3, top: -5, zIndex: 2 }}
              />
            ) : null}
            <MaterialCommunityIcons name="progress-clock" size={25} />
            <Text style={styles.textOption}>{"Missions \nin progress"}</Text>
          </Pressable>
          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("OpenTasks");
              onClose();
            }}
          >
            {userD&&userD.tasksOpen.length>0? (
              <AntDesign
                name="exclamationcircle"
                size={25}
                color={"#ff6f00d5"}
                style={{ position: "absolute", right: 3, top: -5, zIndex: 2 }}
              />
            ) : null}
            <Feather name="loader" size={25} />
            <Text style={styles.textOption}>{"Open Tasks"}</Text>
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => {
              itemClick("Help"), onClose();
            }}
          >
            <Ionicons name="help-circle" size={25} />
            <Text style={styles.textOption}>Help</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "white",
    width: "50%",
    height: "100%",
  },
  option: {
    display: "flex",
    flexDirection: "row",
    height: "13%",
    width: "80%",
    textAlign: "left",
    borderBottomColor: "black",
    // borderColor:'black',
    // borderWidth:0.5,
    borderBottomWidth: 0.5,
    borderStyle: "solid",
    marginBottom: 20,
  },
  optionContainer: {
    display: "flex",

    flexDirection: "column",
    // justifyContent:'space-between',
    alignContent: "center",
    alignItems: "center",
    marginTop: "40%",
  },
  textOption: {
    marginLeft: 15,
    lineHeight: 25,
    fontWeight: "900",
  },
});

export default Menu;
