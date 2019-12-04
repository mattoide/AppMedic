import React, {
    Component
} from 'react';

import {
    TextInput,
    View,
    Text,
    ToastAndroid,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    Image
} from 'react-native';



import { Notification } from 'react-native-firebase';
import firebase from 'react-native-firebase';


var fetchTimeout = require('fetch-timeout');


export default class StepRip extends Component {

    constructor(props) {
        super(props);

        this.state = {
            img: ''
        };


    }


    componentWillUpdate(){
    
        let src;
    
        switch(this.props.immagine){
         case 'defaultfeetexercise1_0.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise1_0.jpg');
         break;
     
         case 'defaultfeetexercise1_1.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise1_1.jpg');
          break;
     
         case 'defaultfeetexercise1_2.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise1_2.jpg');
         break;
     
         case 'defaultfeetexercise1_3.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise1_3.jpg');
         break;
     
         case 'defaultfeetexercise1_4.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise1_4.jpg');
          
     
         break;
     
         case 'defaultfeetexercise1_5.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise1_5.jpg');
         break;
     
         case 'defaultfeetexercise1_6.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise1_6.jpg');
         break;
          
         case 'defaultfeetexercise1_7.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise1_7.jpg');
         break;
     
         case 'defaultfeetexercise2_0.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise2_0.jpg');
         break;
     
         case 'defaultfeetexercise2_1.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise2_1.jpg');
         break;
     
         
         case 'defaultfeetexercise2_2.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise2_2.jpg');
         break;
     
         
         case 'defaultfeetexercise2_3.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise2_3.jpg');
         break;
     
         
         case 'defaultfeetexercise2_4.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise2_4.jpg');
         break;
     
         
         case 'defaultfeetexercise2_5.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise2_5.jpg');
         break;
     
         
         case 'defaultfeetexercise2_6.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise2_6.jpg');
         break;
     
         
         case 'defaultfeetexercise2_7.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise2_7.jpg');
         break;
     
         case 'defaultfeetexercise3_0.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise3_0.jpg');
         break;
     
         case 'defaultfeetexercise3_1.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise3_1.jpg');
         break;
     
         case 'defaultfeetexercise3_2.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise3_2.jpg');
         break;
     
         case 'defaultfeetexercise3_3.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise3_3.jpg');
         break;
     
         case 'defaultfeetexercise3_4.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise3_4.jpg');
         break;
     
         case 'defaultfeetexercise3_5.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise3_5.jpg');
         break;
     
         case 'defaultfeetexercise3_6.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise3_6.jpg');
         break;
     
         case 'defaultfeetexercise3_7.jpg':
         src = require('../../../immagini/esercizi/defaultfeetexercise3_7.jpg');
         break;
        }
        if(this.state.img != src)
        this.setState({img:src})

      }
    

  
 
    render() {
 
        return (
            
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
           
           
            <Image 
             source={this.state.img}
             style={{ height: 150, width: 150, borderRadius: 200}} 
             /> 
 
            <Text>{this.props.descrizione}</Text>
 
 
           </View>
        );
      }

    
}



