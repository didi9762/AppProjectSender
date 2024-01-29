import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  {Provider} from 'jotai'
import HomePage from './components/HomePage';

export default function App(){
const stack = createStackNavigator()

return (
  <Provider>
  <NavigationContainer>
  <stack.Navigator initialRouteName='HomePage'>
    <stack.Screen name='HomePage' component={ HomePage}/>
   </stack.Navigator>
  </NavigationContainer>
  </Provider>
);
}