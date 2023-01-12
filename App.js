import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'
import firebase from 'firebase/compat/app';
const firebaseConfig = {
  apiKey: "AIzaSyCL4tiaPq4x3C9qnlKnNSXO1EKRhbGbiQA",
  authDomain: "wakeup-1d876.firebaseapp.com",
  projectId: "wakeup-1d876",
  storageBucket: "wakeup-1d876.appspot.com",
  messagingSenderId: "290035999811",
  appId: "1:290035999811:web:d25b8caa3331b434ace0f6",
  measurementId: "G-NYBPQZ1ZWJ"
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