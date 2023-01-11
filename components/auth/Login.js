import React from 'react'
import { View, Button, TextInput }from 'react-native'

import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

export class Login extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			email: '',
			password: '',
		}

		this.onLogin = this.onLogin.bind(this)
	}

	onLogin(){
		const{ email, password, name } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then((result) => {
			console.log(result)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	render() {
		return (
			<View>
				<TextInput 
					placeholder="name"
					onChangeText={(name) => this.setState({ name })}
				/>
				<TextInput 
					placeholder="email"
					onChangeText={(email) => this.setState({ email })}
				/>
				<TextInput 
					placeholder="password"
					secureTextEntry={true}
					onChangeText={(password) => this.setState({ password })}
				/>

				<Button 
					onPress={() => this.onLogin()}
					title="Sign Up"
				/>
			</View>
		)
	}
}

export default Login