import { TouchableOpacity,StyleSheet } from "react-native"
import Entypo from 'react-native-vector-icons/Entypo'

interface props {
    handlePress:()=>void
}

const NextBtn = ({handlePress}:props)=>{
    return(
        <TouchableOpacity onPress={handlePress} style={styles.rightHeader}>
                <Entypo name="arrow-with-circle-right" size={25}/>
        </TouchableOpacity>
    )
    }

const styles = StyleSheet.create({
    rightHeader:{
        height:'100%',
        padding:10,
        justifyContent:'center',
        alignContent:'center'
    }
})

export default NextBtn