
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './components/homeScreen/HomePage';
import RequestsPage from './components/groupsZone/requestsPage';
import PostTask from './components/tasksZone/PostTask';
import MissionsInProgress from './components/missionZone/inProgress';
import LoginScreen from './components/userZone/logIn';
import Main from './components/main';
import OpenTasks from './components/missionZone/openTasks';
import TaskHistory from './components/missionZone/TasksHistory';
import Help from './components/help/help';
import InitPage from './initPage';
import { I18nManager,StatusBar } from 'react-native';
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { userDetailes, baseurlAtom } from "./components/Atoms";
import { useState, useEffect } from "react";
import updateUserInfo from "./components/userZone/updateUserInfoFunc";
import { TouchableOpacity } from "react-native";
import  {Provider,useAtom} from 'jotai'
import { NavigationContainer } from '@react-navigation/native';

I18nManager.forceRTL(false)
I18nManager.allowRTL(false)
StatusBar.setHidden(false)


export default function NavigationPage(){
const stack = createStackNavigator()



return (
  <Provider>
  <NavigationContainer>
  <stack.Navigator initialRouteName='InitPage'>
    <stack.Screen name = 'InitPage' component={InitPage} options={{headerShown:false}}/>
    <stack.Screen name='HomePage' options={{headerShown:false}} component={ Main}/>
    <stack.Screen name='Requests' component={RequestsPage}/>
    <stack.Screen name='PostTask' component={PostTask}/>
    <stack.Screen name='OpenTasks' component={OpenTasks}/>
    <stack.Screen name='InProgress' component={MissionsInProgress}/>
    <stack.Screen name='TasksHistory' component={TaskHistory}/>
    <stack.Screen name='LogIn' component={LoginScreen}/>
    <stack.Screen name='Help' component={Help}/>
   </stack.Navigator>
   </NavigationContainer>
</Provider>
);
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 20,
    width: "70%",
    elevation: 10,
  },
  openView: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
  },
  btn: {
    borderRadius: 20,
    width: "70%",
    elevation: 10,
    color: "blue",
  },
});
