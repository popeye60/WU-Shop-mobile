/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'wushop.db' });
 
export default class edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: '',
      user_name: '',
      comment: '',
      img: '',
    };
  }
  searchPost = () => {
    const {post_id} =this.state;
    // alert(post_id);
    console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM post where post_id = ?',
        [post_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).user_contact);
            this.setState({
             comment:results.rows.item(0).comment,
            });
            this.setState({
             img:results.rows.item(0).img,
            });
          }else{
            alert('No user found');
            this.setState({
              user_name:'',
              comment:'',
              img:'',
            });
          }
        }
      );
    });
  };
  editPost = () => {
    var that=this;
    const { post_id } = this.state;
    const { comment } = this.state;
    const { img } = this.state;
    if (post_id){
      if (comment){
        if (img){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE post set comment=?, img=? where post_id=?',
              [comment, img, post_id],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert( 'Success', 'User updated successfully',
                    [
                      {text: 'Ok', onPress: () => that.props.navigation.navigate('HomeScreen')},
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Updation Failed');
                }
              }
            );
          });
        }else{
          alert('Please fill Link images');
        }
      }else{
        alert('Please Comment');
      }
    }else{
      alert('Please Login');
    }
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Psot Id"
              style={{ padding:10 ,borderRadius: 15,}}
              onChangeText={post_id => this.setState({ post_id })}
            />
            <Mybutton
              title="Search User"
              customClick={this.searchPost.bind(this)}
            />
            <Mytextinput
              value={this.state.comment}
              placeholder="Enter comment"
              onChangeText={comment => this.setState({ comment })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10, borderRadius: 15,}}
            />
            <Mytextinput
              placeholder="Enter Link images"
              value={''+ this.state.img}
              onChangeText={img => this.setState({ img })}
              maxLength={10}
              style={{ padding:10 ,borderRadius: 15,}}
              keyboardType="numeric"
            />
            
            <Mybutton
              title="Update User"
              customClick={this.editPost.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}