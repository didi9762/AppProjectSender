// import {BASE_URL} from '@env'

import TemporaryUrl from "./temporaryUrl.js";

const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlck5hbWUiOiJib2Jfc21pdGgiLCJpYXQiOjE1MTYyMzkwMjJ9.m_dokd_EfJbHAavNG-70DTQceuwb_2sE32ufdI3lUeM'
const url = 'https://app-server-socket.onrender.com'
// const ip = process.env.BASE_URL
const ip = TemporaryUrl
const url2 = `http://${ip}:8888/client/`
console.log('url:',url2);

class StoreManager {
  constructor(updtaeFunc,closeFunc) {
    this.serverAddress = `${url2}?token=${token}`; 
    this.userId = 'bob_smith'; 
    this.sendMessages = true;
    this.getMessages = false;
    this.socket = new WebSocket(this.serverAddress);
    this.updateFunction = updtaeFunc
    
    

    this.socket.addEventListener('open', () => {
      console.log('Connected to the server');
      this.initiateCommunication();
    });

    this.socket.addEventListener('message',async (event) => {
      const data = await JSON.parse(event.data)
      if(data.type==='note'){
        console.log('note:',data.message);
      }else if (data.mission){
      console.log(`Received message: ${data.mission}`);
      this.updateFunction(data.mission,data.client)
      }
      else{
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            console.log(`Key: ${key}, Value: ${value}`);
          }
        }
      }
    });

    this.socket.addEventListener('close', (e) => {
      closeFunc()
      console.log('Connection closed:',e);
    });

    
  }

  initiateCommunication() {
    this.socket.send(JSON.stringify({ get: this.getMessages, send: this.sendMessages, id: this.userId }));
  }

  
  
}


const storeManager = (updtaeFunc,closeFunc)=> new StoreManager(updtaeFunc,closeFunc);
export default storeManager


