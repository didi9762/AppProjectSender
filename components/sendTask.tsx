import React, { useState } from "react";
import { Button, View, StyleSheet, ScrollView, Text } from "react-native";
import storeManager from "../clientSend";
import uuid from 'react-native-uuid';
import { useAtom } from "jotai";
import senderSocket from "./Atom";
import { socketType, Task } from "../types";
import Modal from "react-native-modal";
import TaskForm from "./TaskForm";

export default function PublishTask() {
  const [socket, setSocket] = useAtom(senderSocket);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<{ [taskId: string]: { task: Task, deliveryGuy: string } }>({});


  

  async function buildTask(address: string, price: number) {
    const newTask: Task = {
      id: uuid.v4().toString(),
      open: true,
      save: false,
      close: false,
      sender: socket?.userId||'',
      address: address,
      price: Number(price),
    };
    await publish(newTask);
  }

  function close() {
    setOpen(false);
  }

  async function publish(newTask: Task) {
    if (socket !== null && newTask?.address !== ''&&newTask) {
      await socket.socket.send(JSON.stringify(newTask));
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newTask.id]: { task: newTask, deliveryGuy: '' },
      }));
    }
  }
  async function closeTask(id:string,deliveryGuy:string){
socket?.socket.send(JSON.stringify({type:'confirm',missionId:id,client:deliveryGuy}))
setTasks((prevTasks) => {
  const updatedTasks = { ...prevTasks };
  delete updatedTasks[id];
  return updatedTasks;
});
  }

  function updateTask(taskId: string, clientUsername: string) {
    setTasks((prevTasks) => {
      const updatedTask = { ...prevTasks[taskId], deliveryGuy: clientUsername };
      return { ...prevTasks, [taskId]: updatedTask };
    });
  }


  function goOnline() {
    const sender = storeManager(updateTask,()=>{setSocket(null)});
    setSocket(sender);
  }
  function renderTask(taskId: string, taskInfo: { task: Task, deliveryGuy: string }) {
    return (
      <View key={taskId} style={styles.taskCard}>
        <Text>{taskInfo.task?.address}</Text>
        <Text>{taskInfo.task?.price}</Text>
        <Text>Delivery Guy: {taskInfo.deliveryGuy}</Text>
        {taskInfo.deliveryGuy!==''&&
        <Button title="close" onPress={() => closeTask(taskId,taskInfo.deliveryGuy)} />}
      </View>
    );
  }

  return (
    <View>
      <Button title="Online" onPress={goOnline} />
      <Button title="Publish Task" onPress={() => setOpen(true)} />
      <ScrollView>
      {Object.entries(tasks).map(([taskId, taskInfo]) => (
          renderTask(taskId, taskInfo)
        ))}
      </ScrollView>
      <Modal style={styles.modalStyle} isVisible={open} backdropOpacity={0.4}>
        <TaskForm handleSubmit={buildTask} close={close} />
        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: 'white',
    marginTop: 30,
    height: '50%',
    width: '90%',
  },
  taskCard: {
    backgroundColor: 'lightgray',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
});
