import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  {Provider} from 'jotai'
import HomePage from './components/homeScreen/HomePage';
import RequestsPage from './components/groupsZone/requestsPage';
import PostTask from './components/tasksZone/PostTask';
import { I18nManager,StatusBar } from 'react-native';
import MissionsInProgress from './components/missionZone/inProgress';
import LogIn from './components/userZone/logIn';
import Main from './components/main';
import OpenTasks from './components/missionZone/openTasks';
import TaskHistory from './components/missionZone/TasksHistory';
import Help from './components/help/help';

I18nManager.forceRTL(false)
I18nManager.allowRTL(false)
StatusBar.setHidden(false)


export default function App(){
const stack = createStackNavigator()

return (
  <Provider>
  <NavigationContainer>
  <stack.Navigator initialRouteName='HomePage'>
    <stack.Screen name='HomePage' options={{headerShown:false}} component={ Main}/>
    <stack.Screen name='Requests' component={RequestsPage}/>
    <stack.Screen name='PostTask' component={PostTask}/>
    <stack.Screen name='OpenTasks' component={OpenTasks}/>
    <stack.Screen name='InProgress' component={MissionsInProgress}/>
    <stack.Screen name='TasksHistory' component={TaskHistory}/>
    <stack.Screen name='LogIn' component={LogIn}/>
    <stack.Screen name='Help' component={Help}/>
   </stack.Navigator>
  </NavigationContainer>
  </Provider>
);
}