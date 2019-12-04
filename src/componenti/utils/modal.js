import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);

    this.state = {
        modalVisible: false,
  };
}

componentWillReceiveProps(){
    this.setModalVisible(this.props.modalVisible);
}

componentDidMount(){ 
    this.setModalVisible(false);
}

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

    return (
      <View style={{}}>
        <Modal
          animationType="fade" 
          transparent={true} 
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex:1, width:'100%', justifyContent:'center', backgroundColor:'black', opacity:0.8}}> 
          
          <View style={{flex:0.2, borderRadius:5, borderWidth:1, marginHorizontal:'10%', borderColor:'#333333'}}>
            <View style={{backgroundColor: '#333333', flex: 1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, color:'#988C6C', textAlign:'center'}}>Vuoi iniziare un nuovo set di esercizi?</Text> 
            </View>

        <View style={{backgroundColor:'#303030', flex: 0.3, flexDirection:'row'}}>
          
          <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>

             <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{fontSize:20, color:'#988C6C', textAlign:'center'}}>Cancella</Text>
              </TouchableHighlight>
            </View>


            <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
              <TouchableHighlight
                onPress={() => {
                  console.log('ok')
                }}>
                <Text style={{fontSize:20, color:'#988C6C', textAlign:'center'}}>Ok</Text>
              </TouchableHighlight>
              </View>

            </View>

        </View>

            <View>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        {/* <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}