async function rejectSave(client:string, sender:string,socket:WebSocket,missionId:string,address:string){
    socket?.send(
        JSON.stringify({ type: "reject", client: client,sender:sender,missionId:missionId,address:address })
      );}

export default rejectSave