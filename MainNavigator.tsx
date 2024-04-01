import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./components/homeScreen/HomePage";
import RequestsPage from "./components/groupsZone/requestsPage";
import PostTask from "./components/tasksZone/PostTask";
import MissionsInProgress from "./components/missionZone/inProgress";
import LoginScreen from "./components/userZone/logIn";
import Main from "./components/main";
import OpenTasks from "./components/missionZone/openTasks";
import TaskHistory from "./components/missionZone/TasksHistory";
import Help from "./components/help/help";
import InitPage from "./initPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MainDrawerContent from "./navContent";
import AppHeader from "./components/homeScreen/appHeader";


export default function MainNavigator() {
  const stack = createStackNavigator();

  const GroupIcon = ()=> <FontAwesome name="group" size={25} />
  const profileIcon = ()=><Ionicons name="person-circle" size={30} />
 const HistoryIcon =()=> <FontAwesome name="history" size={25} />
 const ProgressIcon = ()=> <MaterialCommunityIcons name="progress-clock" size={35}/> 
 const HelpIcon = ()=><Ionicons name="help-circle" size={25} />
 const OpenTaskIcon = ()=><Feather name="loader" size={25} /> 
 
 return (
    <stack.Navigator initialRouteName="InitPage" >
      <stack.Screen
        name="InitPage"
        component={InitPage}
        options={{ headerShown: false }}
      />
      <stack.Screen name="HomePage" component={Main} options={{headerShown:false}} />
      <stack.Screen name="Requests" component={RequestsPage} />
      <stack.Screen name="PostTask" component={PostTask} />
      <stack.Screen name="OpenTasks" component={OpenTasks} />
      <stack.Screen name="InProgress" component={MissionsInProgress} />
      <stack.Screen name="TasksHistory" component={TaskHistory} />
      <stack.Screen name="LogIn" component={LoginScreen}/>
      <stack.Screen name="Help" component={Help}  />
    </stack.Navigator>
  );
}
