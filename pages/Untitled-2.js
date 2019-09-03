/*Home Screen With buttons to navigate to different options*/
import React, { Component } from 'react';
import { View,Text ,StyleSheet} from 'react-native';
import Mybutton from './components/Mybutton';
import { TextInput } from 'react-native';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "หมวดหมู่",
      bodyText: 'This is not really a bird nest.',
      postdata:'',
      text:'gg'
    };
    // db.transaction(function(txn) {
    //   txn.executeSql(
    //     // "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
    //     [],
    //     function(tx, res) {
    //       console.log('item:', res.rows.length);
    //       if (res.rows.length == 0) {
    //         txn.executeSql('DROP TABLE IF EXISTS table_user', []);
    //         txn.executeSql(
    //           'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
    //           []
    //         );
    //       }
    //     }
    //   );
    // });
    db.transaction(tx => {
      tx.executeSql(
        'SELECT post_id,user_name,comment,img,MAX(time) FROM post',
        (tx, results) => {
          var len = results.rows.length;
          // console.log('len', len);
          if (len > 0) {
            this.setState({
              postdata: results.rows.item(0),
            });
          } else {
            alert('Not have post!');
            this.setState({
              userData: '',
            });
          }
        }
      );
    });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
          {/* <Text numberOfLines={2} style={{textAlign: 'center'}}>               
    _______________________________________________________________
          </Text> */}
       <Text style={{textAlign: 'center',fontSize: 20}} onPress={this.onPressTitle}>
       {'\n'}{this.state.titleText}
        </Text>
        <View style={styles.layoutrow}>
        <Mybutton
          title="   เสื้อผ้า    "
          customClick={() => this.props.navigation.navigate('m1')}
        />
        <Mybutton
          title="   รองเท้า   "
          customClick={() => this.props.navigation.navigate('m2')}
        />
        <Mybutton
          title="   กระเป๋า   "
          customClick={() => this.props.navigation.navigate('m3')}
        />
        </View>
        {/* ------------------------------------------------------------------------------------ */}
        <View style={styles.layoutrow}>
        <Mybutton 
          title="   อาหาร    "
          customClick={() => this.props.navigation.navigate('m4')}
        />
        <Mybutton
          title="   ของใช้    "
          customClick={() => this.props.navigation.navigate('m5')}
        />
        <Mybutton
          title=" เครื่องสำอาง "
          customClick={() => this.props.navigation.navigate('m6')}
        />
        </View>
        {/* <Text numberOfLines={2} style={{textAlign: 'center'}}>               
    _______________________________________________________________
          </Text> */}
        
        {/* <Text style={{marginLeft: 50,fontSize: 20}}>Post ล่าสุด</Text>
        
          <Text>{this.state.postdata.post_id}</Text>
          <Text>{this.state.postdata.user_name}</Text>
          <Text>{this.state.postdata.comment}</Text>
          <Text>{this.state.postdata.img}</Text>
          <Text>{this.state.postdata.time} </Text>
        </View> */}
      
    );
  }
}

const styles = StyleSheet.create({
  headname: {
    textAlign: 'center',
  },
  textbox:{
    height: 40, 
    borderColor: 'gray',
     borderWidth: 1,
     marginTop: 16,marginLeft: 50,
      marginRight: 50,
  },
  textboxs:{
    height: 40, 
    borderColor: 'gray',
     borderWidth: 1,
     marginTop: 10,
     marginLeft: 300,
     marginRight: 50,
  },
  layoutrow:{flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:0,
    height:90},
     

  
});