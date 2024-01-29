import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props{
    handleSubmit:any
    close:()=>void
}

const TaskForm: React.FC <Props> = ({handleSubmit,close}) => {
  const [addr,setAddr] = useState('');
  const [price,setPrice] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={addr}
        onChangeText={(text) => setAddr(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />
      <Button title="Submit" onPress={()=>{handleSubmit(addr,price);close()}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
});

export default TaskForm;
