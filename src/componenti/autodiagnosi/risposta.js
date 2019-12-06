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

import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import RadioGroup from 'react-native-radio-buttons-group';




var fetchTimeout = require('fetch-timeout');


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

const diagnosi = ["Alluce valgo", "Alluce rigido", "Dito a martello", "Piede piatto", "Sintattilia", "Allungamento", "Accorciamento", "Haglund", "Spina", "Metatarsalagia", "Morton", "5 dito varo", "Brachimetatarsia"];



export default class Risposta extends Component {

    constructor(props) {
        super(props);

        this.state = {
            domanda:-1,
            domanda1 :{risposta: ''},
            domanda2 :{risposta: ''},
            domanda3 :{risposta: ''},
            domanda4 :{risposta: ''},
            domanda5 :{risposta: ''},
            diagnosi:'',

            disabled:true
        };


    }

    async componentWillUpdate(){

       if(this.state.domanda != this.props.domanda){
        await  this.setState({domanda:this.props.domanda})
        this.getSelected(domande[this.state.domanda].risposte);
       }
      }

    async componentWillMount(){

        if(this.state.domanda != this.props.domanda){
            await this.setState({domanda:this.props.domanda})
            this.getSelected(domande[this.state.domanda].risposte);
        }
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
                    case 0:
                    this.setState({domanda1:{risposta: element.label}})
                    break;

                    case 1:
                    this.setState({domanda2:{risposta: element.label}})
                    break;

                    case 2:
                    this.setState({domanda3:{risposta: element.label}})
                    break;

                    case 3:
                    this.setState({domanda4:{risposta: element.label}})
                    break;

                    case 4:
                    this.setState({domanda5:{risposta: element.label}})
                    break;
                }
            }
        });

                this.setState({disabled:false})
                await this.calcolaDiagnosi();
                this.props.setDisabled()
                this.props.setDiagnosi(this.state.diagnosi)
       }

  
 
    render() {

        return (
            
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:30, color:'#988C6C', textAlign:'center'}}>{domande[this.state.domanda].domanda}</Text>
          <RadioGroup radioButtons={domande[this.props.domanda].risposte} fontSize={25} fontColor={'#988C6C'} onPress={(data)=>this.getSelected(data)} />
         </View>

        );
      }
}

