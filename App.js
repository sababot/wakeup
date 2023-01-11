import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'
import firebase from 'firebase/compat/app';
const firebaseConfig = {
  apiKey: "AIzaSyDZ2cZAfmBmx4xeIlWjucBdN6dw7m-JAbk",
  authDomain: "wakeup-f2fcd.firebaseapp.com",
  projectId: "wakeup-f2fcd",
  storageBucket: "wakeup-f2fcd.appspot.com",
  messagingSenderId: "591126108946",
  appId: "1:591126108946:web:d5b87c1b531397a00871cb",
  measurementId: "G-RT44K7989V"
};

firebase.initializeApp(firebaseConfig);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

const Stack = createStackNavigator();

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }
      else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else{
      return(
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>User Logged In</Text>
        </View>
      )
    }
  }
}

export default App