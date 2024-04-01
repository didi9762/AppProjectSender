import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  Text,
  LogBox,
} from "react-native";
import senderSocketFunc from "../clientSend";
import uuid from "react-native-uuid";
import { useAtom } from "jotai";
import {senderSocket} from "./Atoms";
import { socketType, Task } from "../types";
import Modal from "react-native-modal";
import TaskForm from "./TaskForm";
import { userDetailes } from "./Atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function PublishTask() {
  const [socket, setSocket] = useAtom(senderSocket);
  const [userD,setuserD] = useAtom( userDetailes);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<{
    [taskId: string]: { task: Task; deliveryGuy: string };
  }>({});

  useEffect(()=>{
  },[])


  async function buildTask(address: string, price: number) {
    if(!userD){return}
    const newTask: Task = {
      id: uuid.v4().toString(),
      type:'privet',
      open: true,
      saved: false,
      close: false,
      senderAddress:userD?.address,
      address:address,
      sender: userD.userName,
      price: Number(price),
      notes:'this is test',
      targetPhone:'0572682398',
      vehicleType:'station'
    };
    await publish(newTask);
  }

  function close() {
    setOpen(false);
  }

  function generateInvitationLink(){

  }

  async function publish(newTask: Task) {
    if (socket !== null && newTask?.address !== "" && newTask) {
    socket.send(JSON.stringify({type:'privet',newTask:newTask}));
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newTask._id]: { task: newTask, deliveryGuy: "" },
      }));
    }
    else{console.log('not socket');
    }
  }
  async function closeTask(id: string, deliveryGuy: string) {
    socket?.send(
      JSON.stringify({ type: "confirm", missionId: id, client: deliveryGuy })
    );
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      delete updatedTasks[];
      return updatedTasks;
    });
  }

  function updateTask(taskId: string, clientUsername: string) {
    setTasks((prevTasks) => {
      const updatedTask = { ...prevTasks[taskId], deliveryGuy: clientUsername };
      return { ...prevTasks, [taskId]: updatedTask };
    });
  }

  
  function renderTask(
    taskId: string,
    taskInfo: { task: Task; deliveryGuy: string }
  ) {
    return (
      <View key={taskId} style={styles.taskCard}>
        <Text>{taskInfo.task?.address}</Text>
        <Text>{taskInfo.task?.price}</Text>
        <Text>Delivery Guy: {taskInfo.deliveryGuy}</Text>
        {taskInfo.deliveryGuy !== "" && (
          <Button
            title="close"
            onPress={() => closeTask(taskId, taskInfo.deliveryGuy)}
          />
        )}
      </View>
    );
  }

  return (
    <View>
      <Button title="Publish Task" onPress={() => setOpen(true)} />
      <ScrollView>
        {Object.entries(tasks).map(([taskId, taskInfo]) =>
          renderTask(taskId, taskInfo)
        )}
      </ScrollView>
      <Modal style={styles.modalStyle} isVisible={open} backdropOpacity={0.4}>
        <TaskForm handleSubmit={buildTask} close={close} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "white",
    marginTop: 30,
    height: "50%",
    width: "90%",
  },
  taskCard: {
    backgroundColor: "lightgray",
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
});
