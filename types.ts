type socketType = {
    serverAddress: string;
    userId: string;
    sendMessages: boolean;
    getMessages: boolean;
    socket: WebSocket;
  }|null;

  type Task = {
    type:'privet'|'public',
    id:string;
    sender:string;
    open:boolean;
    saved:false|string;
    close:boolean;
    address:string;
    senderAddress?:string;
    price:number;
    username?:string;
    notes:string;
    targetPhone?:string;
    wehicleType?:'motor'|'car'|'station'
    deliveryGuy?:string
  } |null

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
    address?:string;
    tasksInProgress:Array<string>
    tasksOpen:Array<string>;
  } |null

export type alertType = {
  type:string,
  info1:string,
  info2:string,
  info3?:string
}

  export {socketType,Task}
