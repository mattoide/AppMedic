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
import * as Progress from 'react-native-progress';

import BackgroundTimer from 'react-native-background-timer';

var fetchTimeout = require('fetch-timeout');


export default class StepTempo extends Component {

    constructor(props) {
        super(props);

        this.state = {
          img: '',
          descrizione:'',
          countdown:this.msToTime(this.props.tempo),
          ms:1
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

    componentDidMount(){
    }

    componentDidUpdate(){
      if(this.state.descrizione != this.props.descrizione){
        this.setState({descrizione:this.props.descrizione})   

          try{
            BackgroundTimer.clearInterval(interval);
            BackgroundTimer.clearTimeout(timeOut); 
          } catch(e){}
        

        this.timer( this.props.tempo);
      }

    }

    msToTime(duration) {
      // var milliseconds = parseInt((duration%1000)/100)
      //     , seconds = parseInt((duration/1000)%60)
      //     , minutes = parseInt((duration/(1000*60))%60)
      //     , hours = parseInt((duration/(1000*60*60))%24);

          var seconds = parseInt((duration/1000)%60)
          , minutes = parseInt((duration/(1000*60))%60)

      // hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
  
      // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
      return minutes + ":" + seconds;
  }
    timer(time){
  
       i = time;
      interval = BackgroundTimer.setInterval(() => {

        i = i - 1000;

        if(i>=0){
        j = parseFloat(((i/time)*100)/100).toFixed(3)
        this.setState({countdown: this.msToTime(i), ms:j })
          console.log(this.state.ms)
        } else{
                     BackgroundTimer.clearInterval(interval);
          console.log('finisci')

        }
        }, 1000);

      //   timeOut = BackgroundTimer.setTimeout(() => {
      //     BackgroundTimer.clearInterval(interval);
      //     BackgroundTimer.clearTimeout(timeOut);
      //     console.log('finisci')
      // }, time+5000);
   
   
    }
   
    render() {
//  var  a = require('../../../immagini/esercizi'+this.props.immagine);
// var a = this.props.immagine;


        return (
            
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
           
           <View style={{flex:1,justifyContent:'center'}}>
        <Progress.Circle style={{}} size={200} color='#A32B47' unfilledColor='#333333' borderColor='#2E2A2A' indeterminate={false} progress={this.state.ms}  />
        <View style={{position:'absolute', justifyContent:'center',alignSelf:'center', alignItems:'center'}}>
        <Text style={{fontSize:25, color:'#988C6C', }}>{this.state.countdown}</Text>
        </View>
    </View>

    
           <Text style={{fontSize:25, color:'#988C6C', textAlign:'center' }}>{this.props.descrizione}</Text>

           
           <Image 
            source={this.state.img}
            style={{ height: 150, width: 150, borderRadius: 200}} 
            /> 


          </View>
        );
      }

    
}



