/*Example of SQLite Database in React Native*/
import React from 'react';
//In Version 2+
//import {createStackNavigator} from 'react-navigation';
//In Version 3+
import { View ,StyleSheet,Text} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import m1 from './pages/m1';
import m2 from './pages/m2';
import m3 from './pages/m3';
import m4 from './pages/m4';
import m5 from './pages/m5';
import m6 from './pages/m6';
import buy from './pages/buy';
import edit from './pages/edit';
import HomeScreen from './pages/HomeScreen';

 
const App = createStackNavigator({
  HomeScreen: {
    screen: m1,
    navigationOptions: {
      title: 'WU Shop',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
  m1: {
    screen: m1,
    navigationOptions: {
      title: 'เสื้อผ้า',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
  m2: {
    screen: m2,
    navigationOptions: {
      title: 'รองเท้า',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
  m3: {
    screen: m3,
    navigationOptions: {
      title: 'กระเป๋า',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
  m4: {
    screen: m4,
    navigationOptions: {
      title: 'อาหาร',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
  
  m5: {
    screen: m5,
    navigationOptions: {
      title: 'ของใช้',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
  m6: {
    screen: m6,
    navigationOptions: {
      title: 'เครื่องสำอาง',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
  buy: {
    screen: buy,
    navigationOptions: {
      title: 'ชื้อ-ขาย',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
    edit: {
    screen: edit,
    navigationOptions: {
      title: 'รายละเอียด',
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
    },
      headerStyle: { backgroundColor: '#FF99CC'}, 
      headerTintColor: '#ffffff',
    },
  },
});
//For React Navigation Version 2+
//export default App;
//For React Navigation Version 3+
export default createAppContainer(App);

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
  },
});

// const HomeActivity_StackNavigator = createStackNavigator({
//   Home: {screen: HomeScreen},
// }, {headerLayoutPreset: 'center'});