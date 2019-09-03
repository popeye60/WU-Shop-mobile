/*Screen to register the user*/
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert ,TextInput,StyleSheet, Text,FlatList,Image} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Mybuttondel from './components/Mybuttondel';
import Mybuttonedit from './components/Mybuttonedit';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });
 
export default class m1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: 'Gaidmanee',
      comment: '',
      img: '',
      time: '',
      FlatListItems: [],
      post_id: '',
    };

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM post ORDER BY post_id DESC;', [], (tx, results) => {
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
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }} />
    );
  };

  register_user = () => {
    // alert('come in');
    this.setState({time:new Date()})
    var that = this;
    const { user_name } = this.state;
    const { comment } = this.state;
    const { img } = this.state;
    const { time } = this.state;
    // alert(time);
    if (user_name) {
      // alert('come in 1');
      if (comment) {
        // alert('come in 2');
        if (img) {
          // alert('come in 3');
          db.transaction(function(tx) {
            tx.executeSql('INSERT INTO post (user_name, comment, img, time) VALUES (?,?,?,?)',
              [user_name, comment, img, time],
              (tx, results) => {
                // console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Post Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Post Failed');
                }
              }
              ,(error) => { alert(error) }// ,(error) => { alert(JSON.stringify(error)) }
            );
          });
        } else {
          alert('Please fill Image link');
        }
      } else {
        alert('Please fill comment');
      }
    } else {
      alert('Please Login');
    }
  };
  // placeholder="Enter Name"
  deletePost = () => {
    var that = this;
    const { post_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM post where post_id=?',
        [post_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid User Id');
          }
        }
      );
    });
  };


  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
        <Text style={{marginLeft: 50,fontSize: 20}}>POST</Text>
        <TextInput
          style={styles.textbox}
          placeholder="Profile"
          onChangeText={user_name => "Gaidmanee"}
          value={this.state.user_name}
        />
        <TextInput
          style={styles.textbox}
          placeholder="comment"
          onChangeText={(comment) => this.setState({comment})}
          // value={this.state.text}
        />
        <TextInput
          style={styles.textbox}
          placeholder="Link image"
          onChangeText={(img) => this.setState({img})}
          // value={this.state.text}
        />
            
          </KeyboardAvoidingView>
          <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View key={item.post_id} style={{ backgroundColor: 'white', padding: 20 ,marginLeft:50}}>
              <Text>ผู้ใช้ : {item.user_name +' ID:'+ item.post_id}</Text>
              <Text>ความคิดเห็น: {item.comment}</Text>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}><Image source={{uri: item.img}}
              style={{width: 300, height: 175,marginBottom:5,marginTop:5}} /></View>
              <Text>โพสต์เมื่อ : {item.time}</Text>
              
              <Mybuttonedit
              title="Edit"
              customClick={() => this.props.navigation.navigate('edit')}
              />
              <View style={styles.layoutrow}>
              <Text>ระบุ Id :</Text>
              <TextInput
                style={styles.textboxs}
                // placeholder="Link image"
                onChangeText={(post_id) => this.setState({post_id})}
                value={item.post_id}
              />
              
              <Mybuttondel
              title="del"
              value={item.post_id}
              customClick={this.deletePost.bind(this)}
              onChangeText={(post_id) => this.setState({ post_id })}
              />
              </View>
            </View>
          )}
        />
        </ScrollView>
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
     marginTop: 10,marginLeft: 50,
      marginRight: 50,
      borderRadius: 15,
      marginBottom: 10 ,
  },
  layoutrow:{flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:0,
    height:90
  },
    textboxs:{
      width: 100, 
      borderColor: 'gray',
       borderWidth: 1,
       marginTop: 10,marginLeft: 2,
        marginRight: 2,
        borderRadius: 15,
        marginBottom: 10 ,
    },
  
});