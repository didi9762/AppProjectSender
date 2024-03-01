// import {BASE_URL} from '@env'

import TemporaryUrl from "./temporaryUrl.js";

// const token =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlck5hbWUiOiJib2Jfc21pdGgiLCJpYXQiOjE1MTYyMzkwMjJ9.m_dokd_EfJbHAavNG-70DTQceuwb_2sE32ufdI3lUeM";
const url = "https://app-server-socket.onrender.com";
// const ip = process.env.BASE_URL
const ip = TemporaryUrl;
const url2 = `http://${ip}:8888/client/`;
console.log("url:", url2);

class Sender {
  constructor(updateFunc, closeFunc, userId, address, city, group,token) {
    this.serverAddress = `${url2}?token=${token}`;
    this.userId = userId;
    this.address = address;
    this.city = city;
    this.group = group;
    this.sendMessages = true;
    this.getMessages = false;
    this.socket = new WebSocket(this.serverAddress);

    this.socket.addEventListener("open", () => {
      if(!userId){alert('no user id');return}
      console.log("Connected to the server");
      this.initiateCommunication();
    });

    this.socket.addEventListener("message", async (event) => {
      const data = await JSON.parse(event.data);
      if (data.type === "note") {
        console.log("note:", data.message);
      } else if (data.mission) {
        console.log(`Received message: ${data.mission},${data.address}`);
        updateFunc('save',data.mission, data.client,data.address);
      }else if(data.type&&data.type==='done'){
        updateFunc('done',data.missionId,data.client,data.address)
      } 
      else {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            console.log(`Key: ${key}, Value: ${value}`);
          }
        }
      }
    });

    this.socket.addEventListener("close", (e) => {
      closeFunc();
      if(e){
      updateFunc('error','Online Conecction Error','soccet connection were unexpected close\n please reach costumer service' )}
      console.log("Connection closed:", e);
    });
  }

  initiateCommunication() {
    this.socket.send(
      JSON.stringify({
        get: this.getMessages,
        send: this.sendMessages,
        id: this.userId,
        address:this.address,
        group:this.group
      })
    );
  }
}

const senderSocketFunc = (updateFunc, closeFunc,userId,address,city,group,token) =>{
  return new Sender(updateFunc, closeFunc,userId,address,city,group,token)}
export default senderSocketFunc;
