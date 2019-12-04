import React, {
    Component
} from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    TextInput
  } from 'react-native';

import {getStoredUser} from '../utils/storage';

var style = require('./impostazioniStyle');

import Icon from 'react-native-vector-icons/MaterialCommunityIcons/';
import IconFontAwsome from 'react-native-vector-icons/FontAwesome5/';

import DateTimePicker from "react-native-modal-datetime-picker";
import {setSetting, getSetting} from '../utils/settings';

import DrawerButton from '../utils/drawerbutton';

import BackgroundTimer from 'react-native-background-timer';

import firebase from 'react-native-firebase';




export default class Impostazioni extends Component {

    constructor(props) {
        super(props);

        this.state = {
          medicora1:'',
          medicora2:'',
          medicora3:'',
          eserora1:'',
          eserora2:'',
          eserora3:'',
          tipo:'',
          isDateTimePickerVisible: false
        };
 
    }

  //   componentWillUnmount() {
  //     this.notificationDisplayedListener();
  //     this.notificationListener();
  //     this.notificationOpenedListener();
  // }

   async componentWillMount(){

    // Build a channel
const channel = new firebase.notifications.Android.Channel('remichannel', 'remichannel', firebase.notifications.Android.Importance.Max)
.setDescription('remichannel');
// Create the channel
firebase.notifications().android.createChannel(channel);

      await getSetting('medicOra1', (val, err) => { if(val){ this.setState({medicora1:val}) } else {/*console.log(err)*/}});
      await getSetting('medicOra2', (val, err) => { if(val){ this.setState({medicora2:val}) } else {/*console.log(err)*/}});
      await getSetting('medicOra3', (val, err) => { if(val){ this.setState({medicora3:val}) } else {/*console.log(err)*/}});

      await getSetting('eserOra1', (val, err) => { if(val){ this.setState({eserora1:val}) } else {/*console.log(err)*/}});
      await getSetting('eserOra2', (val, err) => { if(val){ this.setState({eserora2:val}) } else {/*console.log(err)*/}});
    }

notis(msg){

console.log(msg)
  let mnotification = new firebase.notifications.Notification({show_in_foreground: true})
  .setNotificationId('nitId')
  .setTitle(msg.titolo)
  .setBody(msg.testo)
  .android.setChannelId('remichannel')
  .android.setSmallIcon('ic_launcher')
  .android.setPriority(firebase.notifications.Android.Priority.High);

  //console.log(mnotification) 

              firebase.notifications().displayNotification(mnotification)

}

    noti(date, msg, id){

      firebase.notifications().cancelNotification(id);

      let mnotification = new firebase.notifications.Notification({show_in_foreground: true})
      .setNotificationId(id)
      .setTitle(msg.titolo)
      .setBody(msg.testo)
      .android.setChannelId('remichannel')
      .android.setSmallIcon('ic_launcher')
      .android.setPriority(firebase.notifications.Android.Priority.High);
  
    //console.log(mnotification) 
  //return mnotification;
              //  firebase.notifications().displayNotification(mnotification)
       

              firebase.notifications().scheduleNotification(mnotification, {
                fireDate: date.getTime(),
                repeatInterval: 'day',
                exact: true,
            
            })
  
    }

  startNoti(tipo, date){
   

    const esercizi = {titolo:"Esercizi", testo:"Ricordati di fare gli esercizi!"}
    const medicinali = {titolo:"Medicinali",testo:"Ricordati di prendere i medicinali!"}

    switch(tipo){

      
      case 'medicora1':
        this.noti(date, medicinali, '11')
      break;

      case 'medicora2':
        this.noti(date, medicinali, '12')
      break;

      case 'eserora1':
        this.noti(date, esercizi, '21')
      break;

      case 'eserora2':
        this.noti(date, esercizi, '22')
      break;

      case 'eserora3':
        this.noti(date, esercizi, '23')
      break;

    }


  }



//     startNotis(tipo, date){
//       var now = new Date().getTime();
//       var noti = date.getTime();

//       if(now < noti){
//         start = noti - now;
//       } else {
//         start = 86400000 -(now - noti);
//       }
 
//       const esercizi = {titolo:"Esercizi", testo:"Ricordati di fare gli esercizi!"}
// const medicinali = {titolo:"Medicinali",testo:"Ricordati di prendere i medicinali!"}

//       switch(tipo){

        
//         case 'medicora1':

//         try{

//           BackgroundTimer.clearTimeout(medicora1TimeOut);
//           BackgroundTimer.clearInterval(medicora1Interval);

//           medicora1TimeOut = BackgroundTimer.setTimeout(() => {

//             this.noti(medicinali);
//             console.log("porcodio1")

//             medicora1Interval = BackgroundTimer.setInterval(() => { this.noti(medicinali);
//               console.log("porcodio1")  }, 86400000);

//           }, start);

//         } catch(e){

//                 medicora1TimeOut = BackgroundTimer.setTimeout(() => {

//                   this.noti(medicinali);
//                   console.log("porcodio1")

//                   medicora1Interval = BackgroundTimer.setInterval(() => { this.noti(medicinali);
//                     console.log("porcodio1")  }, 86400000);

//                 }, start);
//         }

//         break;

//         case 'medicora2':

//         try{

//           BackgroundTimer.clearTimeout(medicora2TimeOut);
//           BackgroundTimer.clearInterval(medicora2Interval);

//           medicora2TimeOut = BackgroundTimer.setTimeout(() => {

//             this.noti(medicinali);

//             medicora2Interval = BackgroundTimer.setInterval(() => { this.noti(medicinali);  }, 86400000);
           
//           }, start);

//         } catch(e){

//                 medicora2TimeOut = BackgroundTimer.setTimeout(() => {

//                   this.noti(medicinali);

//                   medicora2Interval = BackgroundTimer.setInterval(() => { this.noti(medicinali);  }, 86400000);
                 
//                 }, start);
//         }

       
//         break;

//         case 'medicora3':
       
//         try{

//           BackgroundTimer.clearTimeout(medicora3TimeOut);
//           BackgroundTimer.clearInterval(medicora3Interval);

//           medicora3TimeOut = BackgroundTimer.setTimeout(() => {

//             this.noti(medicinali);
            
//             medicora3Interval = BackgroundTimer.setInterval(() => { this.noti(medicinali);  }, 86400000);
           
//           }, start);

//         } catch(e){

//                 medicora3TimeOut = BackgroundTimer.setTimeout(() => {

//                   this.noti(medicinali);
                  
//                   medicora3Interval = BackgroundTimer.setInterval(() => { this.noti(medicinali);  }, 86400000);
                 
//                 }, start);
//         }

//         break;

//         case 'eserora1':
//         try{

//           BackgroundTimer.clearTimeout(eserora1TimeOut);
//           BackgroundTimer.clearInterval(eserora1Interval);

          
//           eserora1TimeOut = BackgroundTimer.setTimeout(() => {

//             this.noti(esercizi);
            
//             eserora1Interval = BackgroundTimer.setInterval(() => { this.noti(esercizi);  }, 86400000);
           
//           }, start);

//         } catch(e){

//                   eserora1TimeOut = BackgroundTimer.setTimeout(() => {

//                   this.noti(esercizi);
                  
//                   eserora1Interval = BackgroundTimer.setInterval(() => { this.noti(esercizi);  }, 86400000);
                 
//                 }, start);
//         }

       
//         break;

//         case 'eserora2':
       
//         try{

//           BackgroundTimer.clearTimeout(eserora2TimeOut);
//           BackgroundTimer.clearInterval(eserora2Interval);

          
//           eserora2TimeOut = BackgroundTimer.setTimeout(() => {

//             this.noti(esercizi);
            
//             eserora2Interval = BackgroundTimer.setInterval(() => { this.noti(esercizi);  }, 86400000);
           
//           }, start);

//         } catch(e){

//                   eserora2TimeOut = BackgroundTimer.setTimeout(() => {

//                   this.noti(esercizi);
                  
//                   eserora2Interval = BackgroundTimer.setInterval(() => { this.noti(esercizi);  }, 86400000);
                 
//                 }, start);
//         }

//         break;

//       }


//     }

    showDateTimePicker = (tipo) => {
      this.setState({ isDateTimePickerVisible: true, tipo:tipo });
    };
  
    hideDateTimePicker = () => {
      this.setState({ isDateTimePickerVisible: false });
    };

     handleDatePicked = async date => {

      datetext = date.toTimeString();
      time = datetext.split(' ')[0];
      hour = time.split(':')[0] + ":" + time.split(':')[1]

      //hour = date.valueOf();






      switch(this.state.tipo){
        case 'medicora1':
        this.setState({medicora1:hour})
        await setSetting('medicOra1', hour, (err) => { if(err){ return /*console.log(err)*/ } else { /*console.log('kei salvata')*/ } }); 
        this.startNoti('medicora1',date);
        break;

        case 'medicora2':
        this.setState({medicora2:hour})
        await setSetting('medicOra2', hour, (err) => { if(err){ /*console.log(err)*/ } else { /*console.log('kei salvata')*/ } }); 
        this.startNoti('medicora2',date);
        break;


        case 'eserora1':
        this.setState({eserora1:hour})
        await setSetting('eserora1', hour, (err) => { if(err){ /*console.log(err)*/ } else { /*console.log('kei salvata')*/ } }); 
        this.startNoti('eserora1',date);
        break;

        case 'eserora2':
        this.setState({eserora2:hour})
        await setSetting('eserOra2', hour, (err) => { if(err){ /*console.log(err)*/ } else {/* console.log('kei salvata')*/ } });
        this.startNoti('eserora2',date);
        break;

        
        case 'eserora3':
        this.setState({eserora3:hour})
        await setSetting('eserOra3', hour, (err) => { if(err){ /*console.log(err)*/ } else {/* console.log('kei salvata')*/ } });
        this.startNoti('eserora3',date);
        break;


      }

      this.hideDateTimePicker();
    };

    static navigationOptions = {
  
      drawerLabel: 'Impostazioni',
      drawerIcon: () => (
        
        <Icon name="settings" size={20} color="#988C6C" />
        
      ),
      
    };

    async componentDidMount(){
      let notificationListener = firebase.notifications().onNotification((notification) => {

        firebase.notifications().displayNotification(notification)

    });
    }

    render() {
      const littleSize = 30;
      const bigSize = 40;


        return (
          <View style={style.mainView}>

<DrawerButton/>

<DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'time'}
        />

<View style={{flexDirection:'column'}}>
    
      <View style={{marginHorizontal:'5%', marginBottom:'10%', alignItems:'center'}}>

        <IconFontAwsome name="running" size={50} color="#988C6C" />
        <Text style={style.bigText}>Orari notifiche esercizi</Text>
      
        <TouchableHighlight onPress={()=>this.showDateTimePicker('eserora1')}>
          <Text style={style.littleText}>{!this.state.eserora1 ? 'hh:mm' : this.state.eserora1}</Text> 
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> this.showDateTimePicker('eserora2')}>
          <Text style={style.littleText}>{!this.state.eserora2 ? 'hh:mm' : this.state.eserora2}</Text> 
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> this.showDateTimePicker('eserora3')}>
          <Text style={style.littleText}>{!this.state.eserora3 ? 'hh:mm' : this.state.eserora3}</Text> 
        </TouchableHighlight>
      </View>

      <View style={{marginHorizontal:'5%', alignItems:'center'}}>

        <IconFontAwsome name="pills" size={50} color="#988C6C" />
        <Text style={style.bigText}>Orari notifiche medicinali</Text>

        <TouchableHighlight onPress={()=> this.showDateTimePicker('medicora1')}>
          <Text style={style.littleText}>{!this.state.medicora1 ? 'hh:mm' : this.state.medicora1}</Text> 
        </TouchableHighlight>

        <TouchableHighlight onPress={()=> this.showDateTimePicker('medicora2')}>
          <Text style={style.littleText}>{!this.state.medicora2 ? 'hh:mm' : this.state.medicora2}</Text> 
        </TouchableHighlight>

      </View>

    </View>
          </View>
        );
      }
}