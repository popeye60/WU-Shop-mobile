/*Home Screen With buttons to navigate to different options*/
import React, { Component } from 'react';
import { View,Text ,StyleSheet,ActivityIndicator,Image,FlatList,RefreshControl,Button} from 'react-native';
import Mybuttonhome from './components/Mybuttonhome';
import { TextInput } from 'react-native';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });

export default class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      titleText: "----------หมวดหมู่----------",
      bodyText: 'This is not really a bird nest.',
      FlatListItems: [],
    };
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='post'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS post', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS post(post_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(255), comment VARCHAR(255), img VARCHAR(255),time VARCHAR(255))',
              []
            );
          }
        }
      );
    });
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM post ORDER BY post_id DESC LIMIT 1;', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
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
       <Text style={{textAlign: 'center',fontSize: 20}} onPress={this.onPressTitle}>
       {'\n'}{this.state.titleText}
        </Text>
        <View style={styles.layoutrow}>
        <Mybuttonhome
          title="   เสื้อผ้า    "
          customClick={() => this.props.navigation.navigate('m1')}
        />
        <Mybuttonhome
          title="   รองเท้า   "
          customClick={() => this.props.navigation.navigate('m2')}
        />
        <Mybuttonhome
          title="   กระเป๋า   "
          customClick={() => this.props.navigation.navigate('m3')}
        />
        </View>
        {/* ------------------------------------------------------------------------------------ */}
        <View style={styles.layoutrow}>
        <Mybuttonhome 
          title="   อาหาร    "
          customClick={() => this.props.navigation.navigate('m4')}
        />
        <Mybuttonhome
          title="   ของใช้    "
          customClick={() => this.props.navigation.navigate('m5')}
        />
        <Mybuttonhome
          title=" เครื่องสำอาง "
          customClick={() => this.props.navigation.navigate('m6')}
        />
        </View>
        <View style={styles.layoutrow}><Text style={{marginLeft: 50,fontSize: 20}}>Post ล่าสุด</Text><ActivityIndicator size="large" color="#FF99CC" /></View>

        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.post_id} style={{ backgroundColor: 'white', padding: 20 ,marginLeft:50}}>
              <Text>ผู้ใช้ : {item.user_name}</Text>
              <Text>ความคิดเห็น: {item.comment}</Text>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}><Image source={{uri: item.img}}
              style={{width: 300, height: 175,marginTop:5,marginBottom:5}} /></View>
              <Text>โพสต์เมื่อ : {item.time}</Text>
              </View>
          )}
        />
      </View> 
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