import React, {
    Component
} from 'react';

import {
    View,
    Text,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Modal
  } from 'react-native';


var style = require('./autodiagnosiStyle');


import DrawerButton from '../utils/drawerbutton';

import Wizard from "react-native-wizard";
import Risposta from "./risposta";
import RispostaImg from "./rispostaimg";




// const steps =[
      
//   {component: Risposta, props : {domanda: 0}},
//   {component: Risposta, props : {domanda: 1}},
//   {component: Risposta, props : {domanda: 2}},
//   {component: Risposta, props : {domanda: 3}},
//   {component: Risposta, props : {domanda: 4}},

// ]



export default class Autodiagnosi extends Component {

    constructor(props) {
        super(props);

        this.setDisbld = this.setDisbld.bind(this);
        this.setDiagns = this.setDiagns.bind(this);
        this.avanti = this.avanti.bind(this);
        


        this.state = {
          user:{},
          isLastStep:'',
          isFirstStep:'',
          currentIndex:'',
          disabled:true,
          diagnosi:'',
          diagnosiFoto:'',
          modalVisible:false
                };
 
    }

    setDisbld(){
      this.setState({disabled:false})
    }

    
    setDiagns(diagns){
      this.setState({diagnosi:diagns})
    }

    avanti(diagnosi){
      this.setState({diagnosiFoto:diagnosi})
      this.wizard.next()
    }


    
    static navigationOptions = {
      drawerLabel: () => null     
    };

    async componentDidMount(){

    }

    render() {

      steps = [
      
        {component: RispostaImg, props : {domanda: -2, avanti:this.avanti, setDiagnosi:this.setDiagns}},
        {component: Risposta, props : {domanda: 0, setDisabled:this.setDisbld, setDiagnosi:this.setDiagns}},
        {component: Risposta, props : {domanda: 1, setDisabled:this.setDisbld, setDiagnosi:this.setDiagns}},
        {component: Risposta, props : {domanda: 2, setDisabled:this.setDisbld, setDiagnosi:this.setDiagns}},
        {component: Risposta, props : {domanda: 3, setDisabled:this.setDisbld, setDiagnosi:this.setDiagns}},
        {component: Risposta, props : {domanda: 4, setDisabled:this.setDisbld, setDiagnosi:this.setDiagns}},
      
      ]

      return (
          <View style={style.mainView}>
<DrawerButton/>


<View style={style.mainView} >
           
           <Wizard
        ref={(e) => {this.wizard = e}}
        currentStep={(currentIndex, isFirstStep, isLastStep) => {
             this.setState({
                isLastStep  : isLastStep,
                isFirstStep : isFirstStep,
                currentIndex: currentIndex
            })
            // console.log(isLastStep)
            // console.log(isFirstStep)
            // console.log(currentIndex)
         }}
         steps={steps}

        duration={500}
               onNext={() => {this.setState({disabled:true})}}
               onPrev={() => {this.setState({disabled:false})}}
              onFinish={() => {
                 //ToastAndroid.showWithGravity('Congratulazioni! Hai completato tutti gli esercizi.', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                this.setState({modalVisible:true})
                 this.wizard.goToStep(0)	
                this.props.navigation.navigate('Informazioni')}
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

{/* 
        {this.state.disabled ?
                                            <TouchableOpacity disabled={this.state.disabled}
                                            style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10, flex:1,
                                            backgroundColor:'transparent', opacity:100, borderRadius:100, borderWidth: 1,borderColor: 'gray', marginBottom:'10%'}}
                                            onPress={()=>{
                                                this.wizard.next()
                                              }}>
                                                <Text style={{textAlign:'center', fontSize:20, color:'gray'}}> Continua</Text>
                                                </TouchableOpacity>
:

                                                <TouchableOpacity disabled={this.state.disabled}
                                                style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10, flex:1,
                                                backgroundColor:'transparent',borderRadius:100, borderWidth: 1,borderColor: '#9A2C45', marginBottom:'10%'}}
                                                onPress={()=>{
                                                    this.wizard.next()
                                                  }}>
                                                    <Text style={{textAlign:'center', fontSize:20, color:'#9A2C45'}}> Continua</Text>
                                                    </TouchableOpacity>
        } */}


<Modal
          animationType="fade" 
          transparent={true} 
          visible={this.state.modalVisible}
          >
          <View style={{flex:1, width:'100%', justifyContent:'center', backgroundColor:'black', opacity:0.8}}> 
          
          <View style={{flex:0.5, borderRadius:5, borderWidth:1, marginHorizontal:'10%', borderColor:'#333333'}}>
            <View style={{backgroundColor: '#333333', flex: 1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, color:'#988C6C', textAlign:'center'}}>La tua diagnosi è: {this.state.diagnosiFoto != '' ? this.state.diagnosiFoto : this.state.diagnosi}</Text> 

                <Text style={{fontSize:25, color:'#9A2C45', textAlign:'center'}}>Quest' autodiagnosi non sostituisce la visita medica. In ogni caso è raccomandabile consultare lo specialista che potrebbe proporti delle ulteriori prove diagnostiche.</Text> 


            </View>

        <View style={{backgroundColor:'#303030', flex: 0.3, flexDirection:'row'}}>
          
          <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>

             <TouchableHighlight
                onPress={() => {
                  this.setState({modalVisible:false, diagnosi:'', diagnosiFoto:''}) 
                }}>
                <Text style={{fontSize:20, color:'#988C6C', textAlign:'center'}}>Ok</Text>
              </TouchableHighlight>
            </View>

            </View>

        </View>
          </View>
        </Modal>

       
        </View>

          </View>
          </View>
        );
      }
}