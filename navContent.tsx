import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {DrawerContentScrollView,  DrawerItem,useDrawerStatus } from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import updateUserInfo from "./components/userZone/updateUserInfoFunc";
import { baseurlAtom,userDetailes } from "./components/Atoms";
import { Text } from "react-native-elements";
import { useAtom } from "jotai";
import { DrawerActions } from "@react-navigation/native"
import { Drawer } from "react-native-paper";

const MainDrawerContent = ({props}:any) => {
  const navigation = useNavigation();
  const [userD, setUserD] = useAtom(userDetailes);
  const [url] = useAtom(baseurlAtom);
  const status = useDrawerStatus()

  useEffect(() => {
    async function update() {

      if (userD) {
        const { tasksInProgress, tasksOpen, group, requests } =
          await updateUserInfo(url);
        setUserD({
          ...userD,
          tasksInProgress: tasksInProgress,
          tasksOpen: tasksOpen,
          group: group,
          requests: requests,
        });
      }
    }
if(status=='open'){
    }
    console.log(status);
    
  }, [status]);

  function itemClick(linkTo: string) {
    navigation.navigate(linkTo as never);
    props.navigation.closeDrawer();
  }

  return (
    <DrawerContentScrollView contentContainerStyle={{height:'100%'}} {...props} >
      <View style={styles.optionContainer}>
        <DrawerItem
        labelStyle={styles.txtOption}
         style={styles.option}
          label="My Profile"
          icon={({ color, size }) => <Ionicons name="person-circle" size={size} color={color} />}
          onPress={() => itemClick("LogIn")}
        />
        <DrawerItem
        labelStyle={styles.txtOption}
         style={styles.option}
          label="Tasks History"
          icon={({ color, size }) => <FontAwesome name="history" size={size} color={color} />}
          onPress={() => itemClick("TasksHistory")}
        />
        <DrawerItem
        labelStyle={styles.txtOption}
         style={styles.option}
          label="Requests"
          icon={({ color, size }) => <FontAwesome name="group" size={size} color={color} />}
          onPress={() => itemClick("Requests")}
        />

        <DrawerItem
        labelStyle={styles.txtOption}
         style={styles.option}
         label={()=>
            <View style={{marginTop:-15}} >
                <Text style={styles.txtOption}>{'Tasks In\nprogress'} </Text>
                {userD &&userD.tasksInProgress.length > 0 ? (
              <AntDesign
                name="exclamationcircle"
                size={25}
                color={"#ff6f00d5"}
                style={{ position: "absolute", right: -40, top: 1}}
              />
            ) : null}
            </View>

          }
    
          icon={({ color, size }) => <MaterialCommunityIcons style={{marginTop:-20}} name="progress-clock" size={size} color={color} />}
          onPress={() => itemClick("InProgress")}
        />
        <DrawerItem
        labelStyle={styles.txtOption}
         style={styles.option}
          label={()=>
          <View style={{marginTop:0}} >
              <Text style={styles.txtOption}>{'Open Tasks'} </Text>
              {userD &&userD.tasksOpen.length > 0 ? (
            <AntDesign
              name="exclamationcircle"
              size={25}
              color={"#ff6f00d5"}
              style={{ position: "absolute", right: -40, top: -12}}
            />
          ) : null}
          </View>}
          icon={({ color, size }) => <Feather name="loader" size={size} color={color} />}
          onPress={() => itemClick("OpenTasks")}
        />
        <DrawerItem
        labelStyle={styles.txtOption}
         style={styles.option}
          label="Help"
          icon={({ color, size }) => <Ionicons name="help-circle" size={size} color={color} />}
          onPress={() => itemClick("Help")}
        />
      </View>
    </DrawerContentScrollView>
  );
};


const styles = StyleSheet.create({

    option: {
        marginLeft:25,
      height: "11%",
      borderBottomWidth: 0.5,
    marginBottom:15,
    width:'70%'
    },
    optionContainer: {
      display: "flex",
      paddingVertical:20,
    
    },txtOption: {
        marginLeft: 15,
        lineHeight: 25,
        fontWeight: "900",
      },

  });
export default MainDrawerContent;
