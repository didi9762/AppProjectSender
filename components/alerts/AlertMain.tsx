import { View } from "react-native";
import AlertSaveDaiolog from "./saveAlert";
import { useEffect, useState } from "react";
import { alertType } from "../../types";
import DoneAlert from "./DoneAlert";
import ErrorAlert from "./errorAlert";

interface props {
  isVisible: alertType | null;
  handleSaveFunc: (massage: string, taskId?: string, client?: string) => void;
  close: () => void;
}
interface taskAlertInfo {
  taskId: string;
  clientId: string;
  address: string | undefined;
}
interface errorAlertInfo {
  type: string;
  message: string;
}

const AlertMain = ({ isVisible, handleSaveFunc, close }: props) => {
  const [saveAlertVisible, setSaveAlertVisible] = useState(false);
  const [saveInfo, setSaveInfo] = useState<taskAlertInfo | null>(null);
  const [doneAlertVisible, setDoneAlertVisible] = useState(false);
  const [doneInfo, setDoneInfo] = useState<taskAlertInfo | null>(null);
  const [errorInfo, setErrorInfo] = useState<errorAlertInfo | null>(null);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  useEffect(() => {
    if (isVisible?.type === "save") {
      setSaveAlertVisible(true);
      setSaveInfo({
        taskId: isVisible.info1,
        clientId: isVisible.info2,
        address: isVisible.info3,
      });
    } else if (isVisible?.type === "done") {
      setDoneAlertVisible(true);
      setDoneInfo({
        taskId: isVisible.info1,
        clientId: isVisible.info2,
        address: isVisible.info3,
      });
    }else if (isVisible?.type==='error'){
setErrorAlertVisible(true)
setErrorInfo({
    type:isVisible.info1,
    message:isVisible.info2
})
    }
  }, [isVisible]);

  function handleSave(massage: string, taskId?: string, client?: string) {
    handleSaveFunc(massage, taskId, client);
    setSaveAlertVisible(false);
    close();
  }

  function handleDone() {
    setDoneAlertVisible(false);
    close();
  }
  function handleEror(){
    setErrorAlertVisible(false);
    close()
  }

  return (
    <View>
      <ErrorAlert errorInfo={errorInfo}
      visible={errorAlertVisible}
      handlePress={handleEror} />
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
