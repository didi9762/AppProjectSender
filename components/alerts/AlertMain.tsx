import { View } from "react-native";
import AlertSaveDaiolog from "./saveAlert";
import { useEffect, useState } from "react";
import { alertType } from "../../types";
import DoneAlert from "./DoneAlert";
import NoteAlert from "./noteAllert";
import { useAtom } from "jotai";
import { shortTaskChange } from "../Atoms";

interface props {
  isVisible: alertType | null;
  handleSaveFunc: (
    massage: string,
    taskId?: string,
    address?: string,
    client?: string
  ) => void;
  close: () => void;
}
interface taskAlertInfo {
  taskId: string;
  clientId: string;
  destination: string | undefined;
}
interface noteAlertInfo {
  type: string;
  message: string;
}

const AlertMain = ({ isVisible, handleSaveFunc, close }: props) => {
  const [saveAlertVisible, setSaveAlertVisible] = useState(false);
  const [saveInfo, setSaveInfo] = useState<taskAlertInfo | null>(null);
  const [doneAlertVisible, setDoneAlertVisible] = useState(false);
  const [doneInfo, setDoneInfo] = useState<taskAlertInfo | null>(null);
  const [noteInfo, setNoteInfo] = useState<noteAlertInfo | null>(null);
  const [noteAlertVisible, setNoteAlertVisible] = useState(false);
  const [shortTaskUpdate, setShortTaskUpdate] = useAtom(shortTaskChange);

  useEffect(() => {
    if (isVisible?.type === "save") {
      setSaveAlertVisible(true);
      setSaveInfo({
        taskId: isVisible.info1,
        clientId: isVisible.info2,
        destination: isVisible.info3,
      });
      setShortTaskUpdate(!shortTaskUpdate);
    } else if (isVisible?.type === "done") {
      setDoneAlertVisible(true);
      setDoneInfo({
        taskId: isVisible.info1,
        clientId: isVisible.info2,
        destination: isVisible.info3,
      });
    } else if (isVisible?.type === "error" || isVisible?.type === "postError") {
      setNoteAlertVisible(true);
      setNoteInfo({
        type: isVisible.info1,
        message: isVisible.info2,
      });
    } else if (isVisible?.type === "note") {
      setNoteAlertVisible(true);
      setNoteInfo({
        type: isVisible.info1,
        message: isVisible.info2,
      });
    }
  }, [isVisible]);

  function handleSave(
    massage: string,
    taskId?: string,
    client?: string,
    address?: string
  ) {
    if (taskId) {
      handleSaveFunc(massage, taskId, client, address);
    }
    setSaveAlertVisible(false);
    close();
  }

  function handleDone() {
    setDoneAlertVisible(false);
    close();
  }
  function handleEror() {
    setNoteAlertVisible(false);
    close();
  }

  return (
    <View>
      <NoteAlert
        noteInfo={noteInfo}
        visible={noteAlertVisible}
        handlePress={handleEror}
      />
      <DoneAlert
        doneInfo={doneInfo}
        visible={doneAlertVisible}
        handlePress={handleDone}
      />
      <AlertSaveDaiolog
        saveInfo={saveInfo}
        visible={saveAlertVisible}
        handlePress={handleSave}
      />
    </View>
  );
};

export default AlertMain;
