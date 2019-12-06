import React, { Component } from "react"

import { Button, SafeAreaView, View, Text,TouchableOpacity } from "react-native"
// Wizard
import Wizard from "react-native-wizard"
import Risposta from "./risposta";
import RadioGroup from 'react-native-radio-buttons-group';



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
export default class App extends Component {
  state = {
    isFirstStep: false,
    isLastStep: false,
  }
  wizard = React.createRef()
  setDiagns(diagns){
    this.setState({diagnosi:diagns})
  }
  render() {
    const stepList = [
      {
        content: <View style={{ width: 100, height: 100, backgroundColor: "#fc0" }}> 
        <TouchableOpacity 
         onPress={() =>  {console.log("ewewewew")}}> 
         <Text>porcoddeddio</Text>
         </TouchableOpacity> 
         </View>
      },
      {content: <Risposta domanda={0}  setDiagnosi={this.setDiagns} />},
      {content:<RadioGroup radioButtons={domande[0].risposte} fontSize={25} fontColor={'#988C6C'} onPress={(data)=>{console.log(data)}} />},


      {
        content: <View style={{ width: 100, height: 100, backgroundColor: "#000" }} />,
      },
      {
        content: <View style={{ width: 100, height: 100, backgroundColor: "#2634e0" }} />,
      },
    ]
    return (
      <SafeAreaView>
        <Button title={"Next"} disabled={this.state.isLastStep} onPress={() => this.wizard.current.next()} />
        <Button title={"Prev"} disabled={this.state.isFirstStep} onPress={() => this.wizard.current.prev()} />
        <Text>{this.state.currentStep}</Text>
        <Wizard
          activeStep={2}
          isLastStep={value => {
            this.setState({ isLastStep: value })
            console.log(value)
          }}
          isFirstStep={value => this.setState({ isFirstStep: value })}
          ref={this.wizard}
          duration={1500}
          steps={stepList}
          currentStep={({ currentStep }) => {
            this.setState({ currentStep: currentStep })
          }}
          
        />
      </SafeAreaView>
    )
  }
};