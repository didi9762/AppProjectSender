

async function closeTask(id: string,addr:string, deliveryGuy: string,socket:WebSocket,sender:string) {
    socket?.send(
      JSON.stringify({ type: "confirm", missionId: id,address:addr, client: deliveryGuy,sender:sender })
    );}

export default closeTask