/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};


 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: '#FF99CC',
    color: '#f05555',
    padding: 10,
    marginTop: 25,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 15,
    marginBottom:25
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});
export default Mybutton;