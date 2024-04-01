import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'jotai'
import { I18nManager,StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import PostTaskNav from './components/tasksZone/postTaskNavigation';


I18nManager.forceRTL(false)
I18nManager.allowRTL(false)
StatusBar.setHidden(false)

export default function App(){
  const  Stack = createStackNavigator()

  return(
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='MainNav'>
          <Stack.Screen name='MainNav' component={MainNavigator} options={{headerShown:false}}/>
          <Stack.Screen name='PostNav' component={PostTaskNav} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}