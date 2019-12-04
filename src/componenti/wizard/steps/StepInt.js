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

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


import { Notification } from 'react-native-firebase';
import firebase from 'react-native-firebase';


var fetchTimeout = require('fetch-timeout');


export default class StepInt extends Component {

    constructor(props) {
        super(props);

        this.state = {
            img: '',
            swipes: this.props.swipes
        };
    }


    onSwipeUp(gestureState) {
        this.setState({myText: 'You swiped up!'});
        console.log('upz')
      }
    
      onSwipeDown(gestureState) {
        if(this.state.swipes > 0)
        this.setState({swipes: this.state.swipes-1});
      }
    
      onSwipeLeft(gestureState) {
        this.setState({myText: 'You swiped left!'});
      }
    
      onSwipeRight(gestureState) {
        this.setState({myText: 'You swiped right!'});
      }
    
      onSwipe(gestureName, gestureState) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        this.setState({gestureName: gestureName});
        switch (gestureName) {
          case SWIPE_UP:
                console.log('name: ' + gestureName + " - state: " +  gestureState)
            break;
          case SWIPE_DOWN:
            console.log('name: ' + gestureName + " - state: " +  gestureState)
            break;
          case SWIPE_LEFT:
            console.log('name: ' + gestureName + " - state: " +  gestureState)
            break;
          case SWIPE_RIGHT:
            console.log('name: ' + gestureName + " - state: " +  gestureState)
            break;
        }
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
    
componentWillUnmount(){
  if(this.state.swipes != this.props.swipes)
  this.setState({swipes:this.props.swipes})

}
  
 
    render() {
 
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };
 
        return (
            
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
           
           <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          // backgroundColor: 'red',
          width:'100%',
          alignItems:'center'
        }}
        >
       
       
       <Image 
             source={this.state.img}
             style={{ height: 150, width: 150, borderRadius: 200}} 
             /> 
 
 <Text style={{fontSize:25, color:'#988C6C', textAlign:'center' }}>{this.props.descrizione}</Text>
 <Text style={{fontSize:25, color:'#988C6C', textAlign:'center' }}>Posa il telefono a terra e senza premere, con l' alluce effettua uno "swipe" sullo schermo</Text>
 <Text style={{fontSize:20, color:'#988C6C', textAlign:'center' }}>Ripeti {this.state.swipes} volte</Text>



      </GestureRecognizer>

         </View>
        );
      }

    
}



