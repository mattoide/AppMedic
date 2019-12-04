import React from 'react';

import {

  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ToastAndroid,
  YellowBox 
} from 'react-native';

import {
  createAppContainer,
   SafeAreaView
} from 'react-navigation';

import { DrawerItems, createDrawerNavigator } from 'react-navigation-drawer'; 


import ImpostazioniC from './src/componenti/utils/settings';
import Logout from './src/componenti/utils/logout';
import AutodiagnosiC from './src/componenti/utils/autodiagnosi';
import UserHeader from './src/componenti/userheaderdrawer/userheaderdrawer';

import Login from './src/componenti/login/login';
import Dashboard from './src/componenti/dashboard/dashboard';
import Lineadiretta from './src/componenti/lineadiretta/lineadiretta';
import Riabilitazione from './src/componenti/riabilitazione/riabilitazione';
import Classifica from './src/componenti/classifica/classifica';
import Informazioni from './src/componenti/informazioni/informazioni';
import Autodiagnosi from './src/componenti/autodiagnosi/autodiagnosi';
import Impostazioni from './src/componenti/impostazioni/impostazioni';


import Wizard from './src/componenti/wizard/wizard';

import firebase from 'react-native-firebase';

console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Require cycle:']);





// let notificationListener = firebase.notifications().onNotification((notification) => {
// console.log(notification)
// });

// this.messageListener = firebase.messaging().onMessage((message) => {
//   console.log(message)
// });

const CustomDrawerContentComponent = (props) => (
  
  <ScrollView> 
    <SafeAreaView style={{flex:1,alignSelf:'center'}} forceInset={{ top: 'always', horizontal: 'never' }}>

      <UserHeader/>
      <DrawerItems {...props} />

      <View style={{flex:1, justifyContent:'flex-end', }}> 
        <AutodiagnosiC/>
        <Logout/>
      </View>
          
    </SafeAreaView>
  </ScrollView>
);

  
  const MyDrawerNavigator = createDrawerNavigator(
    { 
      Login: {
          screen: Login,
        },
        Dashboard: {
          screen: Dashboard,
        },
        Riabilitazione: {
          screen: Riabilitazione,
        },
        Lineadiretta: {
          screen: Lineadiretta,
        },
        Classifica: {
          screen: Classifica,
        },
        Informazioni: {
          screen: Informazioni,
        },
        Autodiagnosi: {
          screen: Autodiagnosi,
        },          
        Impostazioni: {
          screen: Impostazioni,
        },        
        Wizard: {
          screen: Wizard,
        },
        
        
    },{
      navigationOptions:{

      },
      drawerBackgroundColor:'#363636',
      initialRouteName:'Login',
      contentComponent: CustomDrawerContentComponent,
      contentOptions:{
      //  activeBackgroundColor:'#988C6C',
       activeTintColor:'#988C6C',
       inactiveTintColor:'#988C6C'
     },
     defaultNavigationOptions:{
       header:CustomDrawerContentComponent
     }

    }
 
     );
    
     
    const App = createAppContainer(MyDrawerNavigator);

    export default App; 