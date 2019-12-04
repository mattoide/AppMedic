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
    Image,
    Button
} from 'react-native';



import { Notification } from 'react-native-firebase';
import firebase from 'react-native-firebase';


var style = require('./wizardStyle'); 
var fetchTimeout = require('fetch-timeout');
import {getStoredUser} from '../utils/storage';


import Wizard from "react-native-wizard";
import StepTempo from "./steps/StepTempo";
import StepRip from "./steps/StepRip";




export default class Wzrd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user:{},
            steps: [],
            isLastStep:'',
            isFirstStep:'',
            currentIndex:''
                  };


    }
    
  //   componentWillMount(){
  //     this.props.navigation.addListener(
  //       'willFocus',
  //       (pl) => {

  // console.log(pl.action.params)   
        
  //       }
  //     );
  //   }

    static navigationOptions = {
        drawerLabel: () => null     
      };
 
    render() {

      let steps = this.props.navigation.getParam('steps', '');
      // let steps = this.state.steps;
        //let steps = JSON.parse(stepz);
let a = 0; 
return (
            
          <View style={style.mainView} >
           
           <Wizard
        activeStep={a}
        ref={(e) => {this.wizard = e
           er = e}}
        currentStep={(currentIndex, isFirstStep, isLastStep) => {
             this.setState({
                isLastStep  : isLastStep,
                isFirstStep : isFirstStep,
                currentIndex: currentIndex
            })
           
         }}
        //  steps={stepz}
         steps={steps}

        duration={500}
              // onNext={() => {console.log("Next page called")}}
              // onPrev={() => {console.log("Prev page called")}}
              onFinish={() => {
                 ToastAndroid.showWithGravity('Congratulazioni! Hai completato tutti gli esercizi.', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                 this.wizard.goToStep(0)	
                this.props.navigation.navigate('Riabilitazione')}
              }
    /> 
  
    <View style={{flex:0.2, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>



    {!this.state.isFirstStep ? <TouchableOpacity 
    style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10, flex:1,
    backgroundColor:'transparent',borderRadius:100, borderWidth: 1,borderColor: '#988C6C', marginBottom:'10%'}}
    onPress={()=>this.wizard.prev()}>
        <Text style={{textAlign:'center', fontSize:20, color:'#988C6C'}}> Indietro</Text>
        </TouchableOpacity> : undefined}

        <TouchableOpacity 
        style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10, flex:1,
        backgroundColor:'transparent',borderRadius:100, borderWidth: 1,borderColor: '#9A2C45', marginBottom:'10%'}}
        onPress={()=>{
            this.wizard.next()
          }}>
            <Text style={{textAlign:'center', fontSize:20, color:'#9A2C45'}}> Continua</Text>
            </TouchableOpacity>

        </View>

          </View>
        );
      }

    
}



