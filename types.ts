import { ObjectId } from "mongodb";

type socketType = {
    serverAddress: string;
    userId: string;
    sendMessages: boolean;
    getMessages: boolean;
    socket: WebSocket;
  }|null;

  

  export type Requests = {
    userId:string,
    time:Date
  };

  export type User = {
    city?:string,
    userName:string,
    firstName: string;
    lastName: string;
    phone: string;
    group: Array<string>;
    online:boolean;
    requests:Array<Requests>
    address:string;
    tasksInProgress:Array<string>
    tasksOpen:Array<string>;
  } |null

export type alertType = {
  type:string,
  info1:string,
  info2:string,
  info3?:string
}

export type TaskType = {
  source: string;
  destination: string;
  pickupTime: number;
  deliveryTime: 'now'|'long';
  _id?:string;
  sender:string;
  open:boolean;
  saved?:false|string;
  weight?: number;
  itemType?: string;
  notes?: string;
  vehicleType?:'motor'|'car'|'station'|''
  deliveryGuy?:string
  paymentMethod: 'cash' | 'app';
  price: number;
  type:'privet'|'public';
  senderName: string;
  senderPhone: string;
  receiverName?: string;
  receiverPhone?: string;
} |null

  export {socketType}

