// import { useAtom } from "jotai";
// import { View, Text } from "react-native";
// import { baseurlAtom, userDetailes } from "../Atoms";
// import { useEffect } from "react";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const LogIn = () => {
//   const [userD, setUserD] = useAtom(userDetailes);
//   const [url] = useAtom(baseurlAtom);

//   useEffect(() => {
//     async function getData() {
//       try {
//         const response = await axios.post(`${url}sender/login`, {
//           userName: "john_doe",
//           password: "sender1pass",
//         });
//         const data = await response.data;
//         AsyncStorage.setItem("token", data.token);
//         const {
//           userName,
//           firstName,
//           lastName,
//           phone,
//           group,
//           requests,
//           tasksInProgress,
//           tasksOpen,
//         } = data.userDetailes;
//         setUserD({
//           ...userD,
//           online: false,
//           userName: userName,
//           firstName: firstName,
//           lastName: lastName,
//           phone: phone,
//           group: group,
//           requests: requests,
//           tasksInProgress: tasksInProgress,
//           tasksOpen:tasksOpen
//         });
//       } catch (e) {
//         console.log("error try log in:", e);
//       }
//     }
//     if (!userD) {
//       getData();
//     }
//   }, []);

//   return (
//     <View
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "90%",
//         height: "90%",
//       }}
//     >
//       <Text>{userD?.userName}</Text>
//     </View>
//   );
// };

// export default LogIn;

import React, { memo, useState } from 'react';
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
const [url,setUrl] = useState({value:'',error:''})
const [baseurl,setBaseUrl] = useAtom(baseurlAtom)



  const logInFunc = async (userName:string, password:string) => {
    try {                                     // {url.value}
      let urlToUse = 'https://app-http-server.vercel.app'
      if(url.value!=='1'){urlToUse = `http://${url.value}:12345`}
      console.log(urlToUse);
      
      const response = await axios.post(`${urlToUse}/sender/login`, { userName: userName, password:password  });//change 
      const data = await response.data;
      if(!data||data===null){return}
     
      await storeToken(data.token);      
      return data.userDetailes
    } catch (e:any) {
      const error = e.response.data.error
      console.log('log in error:',error);
      if(error ==='user not found'){setUserName({value:'',error:'User Name Incorerect'});return}
      if(error==='incorrect password'){setPassword({value:'',error:'Incorrect Password'});return}
      else{setUrl({value:'',error:'invalid url'})}

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
    let urlToUse = 'https://app-http-server.vercel.app'
      if(url.value!=='1'){urlToUse = `http://${url.value}:12345`}
    setBaseUrl(`${urlToUse}/`)
    const userD =await logInFunc(userName.value,password.value)
    userD.online = false
    setUserD(userD)
      setUserName({ ...userName, error: userName.error });
      setPassword({ ...password, error: password.error });
      setUrl({...url,error:url.error})
      navigation.navigate('HomePage')
      return;
    }  

  return (
 <View style={styles.container}>
 <TextInput
        label="Server Url"
        returnKeyType="next"
        value={url.value}
        onChangeText={text =>setUrl({ value: text, error: '' })}
        error={!!url.error}
        errorText={url.error}
        autoCapitalize="none"
        textContentType="username"
      />

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