

async function closeTask(id: string, deliveryGuy: string,socket:WebSocket) {
    console.log('closing');
    
    socket?.send(
      JSON.stringify({ type: "confirm", missionId: id, client: deliveryGuy })
    );}

export default closeTask