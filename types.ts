type socketType = {
    serverAddress: string;
    userId: string;
    sendMessages: boolean;
    getMessages: boolean;
    socket: WebSocket;
  }|null;

  type Task = {
    id:string;
    sender:string;
    open:boolean;
    save:boolean;
    close:boolean;
    address:string;
    price:number;
    username?:string;
  } |null

  export {socketType,Task}