import React, {
    Component
} from 'react';

import {
    View,
    Text,
    ToastAndroid,
    TouchableHighlight,
    Modal,
    TouchableOpacity

} from 'react-native';

// import {Surface, Shape} from '@react-native-community/art';


var style = require('./dashboardStyle');


import {getStoredUser} from '../utils/storage';

import Icon from 'react-native-vector-icons/Entypo/';
import IconFontAwsome from 'react-native-vector-icons/FontAwesome5/';
import * as Progress from 'react-native-progress';

import DrawerButton from '../utils/drawerbutton';
import ModalReminder from '../utils/modalreminder';

import firebase from 'react-native-firebase';

import {setSetting, getSetting} from '../utils/settings';

import Pedometer from 'react-native-universal-pedometer';

import {getPedometerData, setPedometerData} from '../utils/pedometerdata';



export class Passi extends Component{

  constructor(props) {
    super(props);
    this.state = {
      pedometerData : {},
    };
}


// getPassi(){


//   const now = new Date();
//   now.setHours(0,0,0,0);

//   Pedometer.startPedometerUpdatesFromDate(now.getTime(), (pedometerData) => {
//     this.setState({pedometerData: pedometerData})
//     console.log(pedometerData)
//   });


//   }

  render(){

    return (
    <View style={{flex:1,justifyContent:'center'}}>
        <Progress.Circle style={{}} size={200} color='#A32B47' unfilledColor='#333333' borderColor='#2E2A2A' indeterminate={false} progress={parseFloat(this.props.percpassi)}  />
        <View style={{position:'absolute', justifyContent:'center',alignSelf:'center', alignItems:'center'}}>
        <IconFontAwsome name="shoe-prints" size={50} color="#988C6C" />
        <Text style={{fontSize:25, color:'#988C6C', }}>{this.props.passi} passi</Text>
        </View>
    </View>
    );
  }
}


export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
          user:{},

          esercizi: 0,
          terapia: 0,
          passi:0,
          percpassi:0,

          modalVisible: false,
          notifica: '',
          pedometerData: {
            distance: 0,
            endDate: 0,
            numberOfSteps: 0,
            startDate: 0
          },

            distance: 0,
            endDate: 0,
            numberOfSteps: 0,
            startDate: 0
          
        };
    }

    

   static navigationOptions = {
  
      drawerLabel: 'Dashboard',
      drawerIcon: () => (
        <Icon name="home" size={20} color="#988C6C" />
      ),
    };

    random(){
      const min = 1;
      const max = 100;
      const rand = min + Math.random() * (max - min);
      return rand/max;
    }

    random2(){
      const min = 1;
      const max = 100000;
      const rand = min + Math.random() * (max - min);
      return rand;
    } 

    getPedometer(){


      Pedometer.isStepCountingAvailable((isAvailable) => {
        console.log("isStepCountingAvailable")
        console.log(isAvailable)
      });
      
      Pedometer.isDistanceAvailable((isAvailable) => {
        console.log("isDistanceAvailable")
        console.log(isAvailable)
    
      });
      
      Pedometer.isFloorCountingAvailable((isAvailable) => {
        console.log("isFloorCountingAvailable")
        console.log(isAvailable)
           });
      
      Pedometer.isCadenceAvailable((isAvailable) => {
        console.log("isCadenceAvailable")
        console.log(isAvailable)
           });
      
           this.startPedometer();

          getPedometerData((pedometerData)=>{
          pedometerData = JSON.parse(pedometerData);

        if(pedometerData){
              this.setState({pedometerData:{numberOfSteps: pedometerData.numberOfSteps, distance: pedometerData.distance}})
            }

            this.startPedometer();

          })



    }

    startPedometer(){

      console.log("sto qua");
      const now = new Date();
      Pedometer.startPedometerUpdatesFromDate(now.getTime(), (pedometerData) => {


        distance = this.state.pedometerData.distance + 0.762
        numberOfSteps = this.state.pedometerData.numberOfSteps + 1;
        this.setState({pedometerData:{numberOfSteps: numberOfSteps, distance: distance}})
        console.log(this.state.pedometerData);

         setPedometerData(this.state.pedometerData, (err) => {
            if(err){
                  console.log(err)
               return 
              } else { 
                // console.log('kei salvata')
              }
               }); 

      });
    }

      UNSAFE_componentWillMount(){
        this.getPedometer();
      }

    async UNSAFE_componentDidMount(){

      let notificationListener = firebase.notifications().onNotification((notification) => {
        if(this.state.user.attivo == 1){
        this.setState({modalVisible: true, notifica: notification.body})
        }

    });

      this.props.navigation.addListener(
        'willFocus',
        () => {
          //console.log(payload);
          this.setState({modalVisible: false})


           getStoredUser((val, err) => {                                         
            if(err)
               return // console.log(err)
            else if(val){
               this.setState({user: JSON.parse(val)}) 

               if(this.state.user.attivo == 0){
                ToastAndroid.showWithGravity('L\' app non è ancora attiva per questo profilo', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                this.props.navigation.navigate('Informazioni')
              }
            }
        });


          this.setState({esercizi: this.random(), terapia: this.random(), passi: parseFloat(this.random2()).toFixed(0), percpassi: parseFloat(this.random2()/100000).toFixed(2)})
        }
      );


          await getStoredUser((val, err) => {                                         
            if(err)
               return // console.log(err)
            else if(val){
               this.setState({user: JSON.parse(val)}) 

               if(this.state.user.attivo == 0){
                ToastAndroid.showWithGravity('L\' app non è ancora attiva per questo profilo', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                this.props.navigation.navigate('Informazioni')
              }
            }
        });

        if(this.state.user.attivo == 0){
          ToastAndroid.showWithGravity('L\' app non è ancora attiva per questo profilo', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
          this.props.navigation.navigate('Informazioni')
        }



    }
      


    render() {
      const littleSize = 15;
      const bigSize = 45;

        return (
          <View style={style.mainView}>
            <DrawerButton/>


            <Modal
          animationType="fade" 
          transparent={true} 
          visible={this.state.modalVisible}>
          <View style={{flex:1, width:'100%', justifyContent:'center', backgroundColor:'black', opacity:0.8}}> 
          
          <View style={{flex:0.3, borderRadius:5, borderWidth:1, marginHorizontal:'10%', borderColor:'#333333'}}>
            <View style={{backgroundColor: '#333333', flex: 1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, color:'#988C6C', textAlign:'center'}}>
                {this.state.notifica}
                  </Text> 
            </View>
        <View style={{backgroundColor:'#303030', flex: 0.3, flexDirection:'row'}}>
          <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
             <TouchableOpacity 
                onPress={() => {
                    this.setState({modalVisible: false})
                }}>
                <Text style={{fontSize:20, color:'#988C6C', textAlign:'center'}}>Ok</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>
          </View>
        </Modal>

<View style={{flex:0.95, justifyContent:'flex-end', alignItems:'center'}}>

{/* <Progress.Circle size={200} color='#A32B47' unfilledColor='#333333' borderColor='#2E2A2A' indeterminate={false} progress={0.5}  /> */}
{/* <View style={{marginVertical:'15%', position:'absolute', top:'7%', alignItems:'center'}}>
<IconFontAwsome name="shoe-prints" size={50} color="#988C6C" />
<Text style={{fontSize:25, color:'#988C6C', }}>{this.state.passi} passi</Text>
</View>  */}

 <Passi percpassi={this.state.percpassi} passi={this.state.pedometerData.numberOfSteps}></Passi>


<Text style={{fontSize:25, color:'#988C6C', marginVertical:'15%'}}>Si cammia!</Text>

    <View style={{flexDirection:'row', justifyContent:'space-between'}}>

        <View style={{ marginHorizontal:'5%',alignItems:'center'}}>
          <Text style={{fontSize:bigSize, color:'#988C6C'}}>{this.state.pedometerData.distance ? parseFloat(this.state.pedometerData.distance).toFixed(2) : 0.00} m</Text>
          <Text style={{fontSize:littleSize, color:'#988C6C'}}>Distanza percorsa</Text>
        </View>

        <View style={{marginHorizontal:'5%',alignItems:'center'}}>
         <Text style={{fontSize:bigSize, color:'#988C6C'}}>0</Text>
          <Text style={{fontSize:littleSize, color:'#988C6C'}}>Scalini</Text>
        </View>

    </View>
            <View style={{marginVertical:'5%'}}></View>
    <View style={{flexDirection:'row'}}>

    <View style={{marginHorizontal:'5%', alignItems:'center'}}>
    <TouchableHighlight
                onPress={() => {
                  this.props.navigation.navigate('Riabilitazione');
                }}>
        <View>
        <IconFontAwsome name="running" size={50} color="#988C6C" />
        <Text style={{fontSize:littleSize, color:'#988C6C', marginVertical:'10%'}}>Esercizi</Text>
        <Progress.Bar color='#A32B47' progress={this.state.esercizi} width={100} />
        </View>
      </TouchableHighlight>
      </View>

      <View style={{marginHorizontal:'5%', alignItems:'center'}}>

        <IconFontAwsome name="pills" size={50} color="#988C6C" />
        <Text style={{fontSize:littleSize, color:'#988C6C', marginVertical:'10%'}}>Terapia</Text>
        <Progress.Bar color={'#5EB157'} progress={this.state.terapia} width={100} />

      </View>

    </View>

</View> 
         
         
          </View>
        );
      }
}