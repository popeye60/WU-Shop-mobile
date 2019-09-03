/*Screen to view single user*/
import React from 'react';
import { Text, View, Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'LezLotG.db' }); 
export default class ShopView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_shop_id: '',
      userData: '',
    };
  }
  viewShop = () => {
    const { input_shop_id } = this.state;
    // console.log(this.state.input_user_id);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM shop where shop_id = ?',
        [input_shop_id],
        (tx, results) => {
          var len = results.rows.length;
          // console.log('len', len);
          if (len > 0) {
            this.setState({
              userData: results.rows.item(0),
            });
          } else {
            alert('Shop not found!');
            this.setState({
              userData: '',
            });
          }
        }
      );
    });
  };
  render() {
    return (
      <View>
        <Mytextinput
          placeholder="Enter Shop Id"
          onChangeText={input_shop_id => this.setState({ input_shop_id })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Search Shop"
          customClick={this.viewShop.bind(this)}
        />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>Shop Id: {this.state.userData.shop_id}</Text>
          <Text>Shop Name: {this.state.userData.shop_name}</Text>
          <Text>Shop Tel no.: {this.state.userData.shop_tel}</Text>
          <Text>Shop Address: {this.state.userData.shop_address}</Text>
          <Text>Shop Bank: {this.state.userData.shop_bank} </Text>
        </View>
      </View>
    );
  }
}