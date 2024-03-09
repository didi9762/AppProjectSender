import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import TextInput from './TextInput';
import { userDetailes, baseurlAtom  } from '../Atoms';
import {Button} from 'react-native-paper' 
import { useAtom } from 'jotai';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }:any) => {
    const [userD,setUserD] = useAtom(userDetailes)
  const [userName, setUserName] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [message,setMassage] = useState('massagge:')
const [baseurl] = useAtom(baseurlAtom)


  const logInFunc = async (userName:string, password:string) => {
    try {        
      const response = await axios.post(`${baseurl}sender/login`, { userName: userName, password:password  });//change 
      const data = await response.data;
      if(!data||data===null){return}
     
      await storeToken(data.token);      
      return data.userDetailes
    } catch (e:any) {
      const error = e.response.data.error
      console.log('log in error:',e);
      if(error ==='user not found'){setUserName({value:'',error:'User Name Incorerect'});return}
      if(error==='incorrect password'){setPassword({value:'',error:'Incorrect Password'});return}
    }
  };
  
  const storeToken = async (token:string) => {
    try {
      await AsyncStorage.setItem('token', `${token}`);
    } catch (error) {
      console.log('error saving token:', error);
    }
  };

  const onLoginPressed = async() => {
    const userD =await logInFunc(userName.value,password.value)
    if(userD){
    userD.online = false
    setUserD(userD)
      setUserName({ ...userName, error: userName.error });
      setPassword({ ...password, error: password.error });
      navigation.navigate('HomePage')
      return;}
    }  

  return (
 <View style={styles.container}>
      <TextInput
        label="User Name"
        returnKeyType="next"
        value={userName.value}
        onChangeText={text =>setUserName({ value: text, error: '' })}
        error={!!userName.error}
        errorText={userName.error}
        autoCapitalize="none"
        textContentType="username"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      {/* <Text style={{fontSize:15}}>
        {message}
      </Text> */}

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
    container:{
        height:'80%',
        width:'100%',
display:'flex',
justifyContent:'center'
    },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    // color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    // color: theme.colors.primary,
  },
  
});

export default LoginScreen