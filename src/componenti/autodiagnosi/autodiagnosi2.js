import React, {
    Component
} from 'react';

import {
    View,
    Text,
  TouchableOpacity,
  TouchableHighlight,
  ToastAndroid,
  Modal,
  Image
  } from 'react-native';


var style = require('./autodiagnosiStyle');


import DrawerButton from '../utils/drawerbutton';

import Wizard from "react-native-wizard";
import Risposta from "./risposta";
import RispostaImg from "./rispostaimg";

import RadioGroup from 'react-native-radio-buttons-group';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';




const domande = [
  {
      domanda:"Da quanto ti fa male?", risposte:[ 
                                                  {label:"1-2 settimane", selected:true, color:'#9A2C45'},
                                                  {label:"2-4 settimane", color:'#9A2C45'},
                                                  {label:"1-2 mesi", color:'#9A2C45'},
                                                  {label:"2-3 mesi", color:'#9A2C45'},
                                                  {label:"6-12 mesi", color:'#9A2C45'},
                                                  {label:"1-2 anni", color:'#9A2C45'},
                                                  {label:"2-5 anni", color:'#9A2C45'},
                                                  {label:"oltre 5 anni", color:'#9A2C45'},
                                                  ]
  },
  {
      domanda:"Ti fa male?", risposte:[ 
          {label:"Solo quando cammino", selected:true, color:'#9A2C45'},
          {label:"Solo quando sono a riposo", color:'#9A2C45'}, 
          {label:"Non mi fa male", color:'#9A2C45'},
          {label:"Entrambi i casi", color:'#9A2C45'}
                                                  ]
  },
  {
      domanda:"Ti fa male quando cammini scalzo?", risposte:[ 
          {label:"Si", selected:true, color:'#9A2C45'},
          {label:"Non mi fa male", color:'#9A2C45'},
          {label:"No. Mi fa male solo con le scarpe", color:'#9A2C45'}
                                                  ]
  },
  {
      domanda:"Il dolore è più forte quando inizi a camminare?", risposte:[ 
          {label:"No. Il dolore diminuisce quando cammino" , selected:true, color:'#9A2C45'},
          {label:"Si. Il dolore è tanto piu forte quando cammino", color:'#9A2C45'}
                                                  ]
  },
  {
      domanda:"Quanto ti fa male?", risposte:[ 
          {label:"1", selected:true, color:'#9A2C45'},
          {label:"2", color:'#9A2C45'},
          {label:"3", color:'#9A2C45'},
          {label:"4", color:'#9A2C45'},
          {label:"5", color:'#9A2C45'},
          {label:"6", color:'#9A2C45'},
          {label:"7", color:'#9A2C45'},
          {label:"8", color:'#9A2C45'},
          {label: "9", color:'#9A2C45'},
          {label: "10", color:'#9A2C45'},
                                                  ]
  },

  

]
const immagini = [
  {immagine: require('../../immagini/diagnosi/haglund.png'), diagnosi:'Haglund'},
  {immagine: require('../../immagini/diagnosi/piede_piatto.png'), diagnosi:'Piede piatto'},
  {immagine: require('../../immagini/diagnosi/metatarsalgia.png'), diagnosi:''}, //3
  {immagine: require('../../immagini/diagnosi/allucevalgo_allucerigido.png'), diagnosi:''},//4
  {immagine: require('../../immagini/diagnosi/4ditomartello_allung_accorc.png'), diagnosi:''},//5
  {immagine: require('../../immagini/diagnosi/3ditomartello_allung_accorc.png'), diagnosi:''},//6
  {immagine: require('../../immagini/diagnosi/2ditomartello_allung_accorc.png'), diagnosi:''},//7
  {immagine: require('../../immagini/diagnosi/5ditovaro.png'), diagnosi:'5 dito varo'},
  {immagine: require('../../immagini/diagnosi/brachimetatarsia.png'), diagnosi:'Brachimetatarsia'},
  {immagine: require('../../immagini/diagnosi/spina_calcaneare.png'), diagnosi:'Spina calcaneare'},
  {immagine: require('../../immagini/diagnosi/neuromaDiMorton.png'), diagnosi:''},//11
  {immagine: require('../../immagini/diagnosi/sintattilia.png'), diagnosi:'Sintattilia'},
]
const diagnosi = ["Alluce valgo", "Alluce rigido", "Dito a martello", "Piede piatto", "Sintattilia", "Allungamento", "Accorciamento", "Haglund", "Spina", "Metatarsalagia", "Morton", "5 dito varo", "Brachimetatarsia"];

const radioButtonsFontSize = 23;
export default class Autodiagnosi extends Component {

    constructor(props) {
        super(props);

        this.setDisbld = this.setDisbld.bind(this);
        this.setDiagns = this.setDiagns.bind(this);
        this.avanti = this.avanti.bind(this);

        this.state = {
          user:{},
          isLastStep:false,
          isFirstStep:false,
          currentStep:0,
          disabled:true,
          diagnosi:'',
          diagnosiFoto:'',
          modalVisible:false,
          domanda:-1,
          domanda1 :{risposta: ''},
          domanda2 :{risposta: 'Solo quando cammino'},
          domanda3 :{risposta: 'Si'},
          domanda4 :{risposta: 'No. Il dolore diminuisce quando cammino'},
          domanda5 :{risposta: ''},
          diagnosi:'',

          disabled:true
        };

    }
    wizard = React.createRef()

    static navigationOptions = {
      drawerLabel: () => null     
    };

componentWillMount(){
  if(this.state.diagnosiFoto != this.props.navigation.state.params.diagnosi)
  this.setState({diagnosiFoto:this.props.navigation.state.params.diagnosi})
}

componentWillUpdate(){
  if(this.state.diagnosiFoto != this.props.navigation.state.params.diagnosi)
  this.setState({diagnosiFoto:this.props.navigation.state.params.diagnosi})
}

    setDisbld(){
      this.setState({disabled:false})
    }

    
    setDiagns(diagns){
      this.setState({diagnosi:diagns})
    }

    avanti(diagnosi){
      this.setState({diagnosiFoto:diagnosi})
      this.wizard.current.next()
    }

    calcolaDiagnosi(){

      if(this.state.domanda2.risposta == "Solo quando cammino" && this.state.domanda3.risposta == "No. Mi fa male solo con le scarpe"){
          this.setState({diagnosi:diagnosi[0]})
          console.log(diagnosi[0])
      }

      if(this.state.domanda2.risposta == "Entrambi i casi" && this.state.domanda3.risposta == "Si"){
          this.setState({diagnosi:diagnosi[1]})       
          console.log(diagnosi[1])
      }
          
      if(this.state.domanda2.risposta == "Solo quando cammino" && this.state.domanda3.risposta == "No. Mi fa male solo con le scarpe" && this.state.domanda4.risposta == "Si. Il dolore è tanto piu forte quando cammino"){
              this.setState({diagnosi:diagnosi[2]})
              console.log(diagnosi[2])
      }

      if(this.state.domanda2.risposta == "Non mi fa male" && this.state.domanda3.risposta == "Non mi fa male"){
          this.setState({diagnosi:diagnosi[5]})
          console.log(diagnosi[5])
      }
      
      if(this.state.domanda2.risposta == "Solo quando cammino" && this.state.domanda3.risposta == "No. Mi fa male solo con le scarpe" && this.state.domanda4.risposta == "Si. Il dolore è tanto piu forte quando cammino"){
          this.setState({diagnosi:diagnosi[6]})
          console.log(diagnosi[6])
      }

      if(this.state.domanda2.risposta == "Solo quando cammino" && this.state.domanda3.risposta == "Si" && this.state.domanda4.risposta == "Si. Il dolore è tanto piu forte quando cammino"){
          this.setState({diagnosi:diagnosi[9] + ", " + diagnosi[10]})
          console.log(diagnosi[9])
      }

     }
  
    async getSelected(data){       

      data.forEach(element => {

          if(element.selected == true){

              switch(this.state.domanda){
                  case 1:
                  this.setState({domanda1:{risposta: element.label}})
                  break;

                  case 2:
                  this.setState({domanda2:{risposta: element.label}})
                  break;

                  case 3:
                  this.setState({domanda3:{risposta: element.label}})
                  break;

                  case 4:
                  this.setState({domanda4:{risposta: element.label}})
                  break;

                  case 5:
                  this.setState({domanda5:{risposta: element.label}})
                  break;
              }
          }
      });

              this.setState({disabled:false})
              await this.calcolaDiagnosi();
              this.setDisbld()
              this.setDiagns(this.state.diagnosi)
     }



    
    render() {
      const steps = [
        {content: <RadioGroup radioButtons={domande[0].risposte} fontSize={radioButtonsFontSize} fontColor={'#988C6C'} onPress={(data)=>this.getSelected(data)} />},
        {content: <RadioGroup radioButtons={domande[1].risposte} fontSize={radioButtonsFontSize} fontColor={'#988C6C'} onPress={(data)=>this.getSelected(data)} />},
        {content: <RadioGroup radioButtons={domande[2].risposte} fontSize={radioButtonsFontSize} fontColor={'#988C6C'} onPress={(data)=>this.getSelected(data)} />},
        {content: <RadioGroup radioButtons={domande[3].risposte} fontSize={radioButtonsFontSize} fontColor={'#988C6C'} onPress={(data)=>this.getSelected(data)} />},
        {content: <RadioGroup radioButtons={domande[4].risposte} fontSize={radioButtonsFontSize} fontColor={'#988C6C'} onPress={(data)=>this.getSelected(data)} />},      
      ]

      return (
          <View style={style.mainView}>
            <DrawerButton/>          
            <View style={style.wizard}>
            <Text style={{fontSize:30, color:'#988C6C', textAlign:'center'}}>{domande[this.state.currentStep].domanda}</Text>

              <Wizard
                ref={this.wizard}
                currentStep={({ currentStep }) => {
                  this.setState({ currentStep: currentStep })
                  this.setState({ domanda: currentStep })
                  console.log("currentStep");
                  console.log(currentStep);
                }}

         isLastStep={value => {
           this.setState({ isLastStep: value })
          }}
         isFirstStep={value => {
           this.setState({ isFirstStep: value })
          }}
         steps={steps}
         duration={500}
               onNext={() => {this.setState({disabled:true})}}
               onPrev={() => {this.setState({disabled:false})}}
    /> 
  
    <View style={{flex:0.7, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

    {!this.state.isFirstStep ? <TouchableOpacity 
    style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10, flex:1,
    backgroundColor:'transparent',borderRadius:100, borderWidth: 1,borderColor: '#988C6C', marginBottom:'10%'}}
    onPress={()=>this.wizard.current.prev()}>
        <Text style={{textAlign:'center', fontSize:20, color:'#988C6C'}}> Indietro</Text>
        </TouchableOpacity> : undefined}


        <TouchableOpacity 
          style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10, flex:1,
          backgroundColor:'transparent',borderRadius:100, borderWidth: 1,borderColor: '#9A2C45', marginBottom:'10%'}}
          onPress={()=>{
            if(this.state.isLastStep){
              this.setState({modalVisible:true})
              this.calcolaDiagnosi();
              this.wizard.current.goTo(0)	
              this.props.navigation.navigate('Informazioni')
            }else{
              this.wizard.current.next()
              }                                                  }}>
          <Text style={{textAlign:'center', fontSize:20, color:'#9A2C45'}}> Continua</Text>
          </TouchableOpacity>


          <Modal
          animationType="fade" 
          transparent={true} 
          visible={this.state.modalVisible}
          >
          <View style={{flex:1, width:'100%', justifyContent:'center', backgroundColor:'black', opacity:0.8}}> 
          
          <View style={{flex:0.6, borderRadius:5, borderWidth:1, marginHorizontal:'10%', borderColor:'#333333'}}>
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