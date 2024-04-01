import { StyleSheet} from "react-native"
import { TextInput } from 'react-native-paper'

interface fieldInfo {
    placeHolder:string
    value:string|number|Date
    onChange:(key:string,value:any)=>void
}

const FieldInput = ({placeHolder,value,onChange}:fieldInfo)=>{


    return( <TextInput
    style={styles.input}
        // placeholder={placeHolder}
        label={placeHolder}
        maxLength={placeHolder==='extraNotes'?35:20}
        value={value.toString()}
        onChangeText={txt=>onChange(placeHolder,txt)}
      />)
}

const styles = StyleSheet.create({
    input: {
        minWidth:'45%',
        maxWidth:'50%',
        backgroundColor:'white'
      },
})

export default FieldInput