/*Custom Button*/
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybuttondel = props => {
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
    marginTop: 4,
    marginRight: 4,
    borderRadius: 15,
    width:50,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
  },
});
export default Mybuttondel;