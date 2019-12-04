import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, Alert} from 'react-native';

export default class ModalReminder extends Component {
    constructor(props) {
        super(props);

    this.state = {
        modalVisible: false,
  };
}


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentWillReceiveProps(){
    this.setModalVisible(this.props.modalVisible);
  }
 
  render() {

    return (
      <View style={{}}>
<Modal
          animationType="fade" 
          transparent={true} 
          visible={this.state.modalVisible}>
          <View style={{flex:1, width:'100%', justifyContent:'center', backgroundColor:'black', opacity:0.8}}> 
          
          <View style={{flex:0.3, borderRadius:5, borderWidth:1, marginHorizontal:'10%', borderColor:'#333333'}}>
            <View style={{backgroundColor: '#333333', flex: 1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, color:'#988C6C', textAlign:'center'}}>
                {this.props.text}
                  </Text> 
            </View>
        <View style={{backgroundColor:'#303030', flex: 0.3, flexDirection:'row'}}>
          <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
             <TouchableOpacity 
                onPress={() => {
                    this.setModalVisible(false)
                }}>
                <Text style={{fontSize:20, color:'#988C6C', textAlign:'center'}}>Ok</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>
          </View>
        </Modal>
      </View>
    );
  }
}



