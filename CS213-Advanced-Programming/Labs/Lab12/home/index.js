import React, { Component } from 'react'
import { Text, View,TextInput ,Button,Alert} from 'react-native'
import styles from './styles'
//import { TextInput } from 'react-native-gesture-handler'

export default class indHomeex extends Component {
    state={username:"",password:""}
    checkLogin(){
        const {username,password}=this.state;
        if(username=='ali' && password=='admin'){
            //console.warn("Login is correct")
            //redirect to dashboard
            this.props.navigation.navigate('dashboard')
        }else{
            //something is wrong
            Alert.alert('Error','Username/Password mismatch',[{
                text:'Okay'
            }])
        }
    }

    render() {
        const {heading,input,parent}=styles
        return (
            <View style={parent}>
                <Text style={heading}> Login into the application </Text>
                <TextInput style={input} autoFocus={true} placeholder={'UserName'} onChangeText={text=>this.setState({username:text})}/>
                <TextInput style={input} secureTextEntry={true} placeholder={'Password'} onChangeText={text=>this.setState({password:text})}/>
                <Button title={'Login'} onPress={()=>this.checkLogin()}/>
            </View>
        )
    }
}