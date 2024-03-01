import { atom } from "jotai";

import axios from 'axios';
import { User } from "./types.js";
import TemporaryUrl from "./temporaryUrl.js";

// const ip = process.env.BASE_URL
const ip = TemporaryUrl
const baseurl = `http://${ip}:12345/server/`
console.log('http url:',baseurl);

const logInFunc = async (userName:string, password:string) => {
  try {
    const response = await axios.post(`${baseurl}login`, { userName: userName, password:password  });//change 
    const data = await response.data;
    if(!data||data===null){return}
    await storeToken(data.token);
    return data.userDetailes
  } catch (e) {
    console.log('error try log in:', e);
  }
};

const storeToken = async (token:string) => {
  // try {
  //   await AsyncStorage.setItem('tokenkey', `${token}`);
  // } catch (error) {
  //   console.log('error saving token:', error);
  // }
};

const userDetailes =atom(<User>(null as User))

export {logInFunc,userDetailes}