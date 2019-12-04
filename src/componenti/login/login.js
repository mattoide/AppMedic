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
    TouchableHighlight
} from 'react-native';

import Caricamento from '../loading/caricamento';
import {storeUser, getStoredUser, removeUser} from '../utils/storage';

import DrawerButton from '../utils/drawerbutton';

import { Notification } from 'react-native-firebase';
import firebase from 'react-native-firebase';


var style = require('./loginStyle'); 
var fetchTimeout = require('fetch-timeout');

import { AppRegistry } from 'react-native';


 export const loginUrl = 'http://appdev.novus.cc:8000/api/login';  
 export const firebasetokenurl = 'http://appdev.novus.cc:8000/api/firebasetoken';


/*export const loginUrl = 'http://192.168.137.1:8000/api/login';  
export const firebasetokenurl = 'http://192.168.137.1:8000/api/firebasetoken';*/


export default class Login extends Component {
 
    constructor(props) {
        super(props);

        this.state = {
        //     email: 'a@a.it', 
        //  password: 'aaa',
            email: '', 
            password: '',
            fetchTimeoutTime: 10000,
            caricamento: false,
            spinner: '',
            disableView: 'auto',
            modalVisible: false,


            user:{}
        };


    }

   
    async  UNSAFE_componentWillMount() {

        let notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
console.log("onNotificationDisplayed")
        });
        let notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required

            console.log(notification)

                let mnotification = new firebase.notifications.Notification({show_in_foreground: true})
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setBody(notification.body)
                .android.setChannelId('android')
                .android.setSmallIcon('ic_launcher')
                .android.setPriority(firebase.notifications.Android.Priority.High);
                            firebase.notifications().displayNotification(mnotification)
        });
        
        getStoredUser((val, err) => {  

            if(err){
                console.log(err)
                return
            }else if(val){
                this.setState({user: JSON.parse(val)});

               if(this.state.user.attivo == 0){

                removeUser((err) => {     
                    if(err){
                        console.log(err)
                        return 
                    }
                });
               } else{
                this.fcm();
               }    
        }
        });
    }
    
    // componentWillUnmount() {
    //     this.notificationDisplayedListener();
    //     this.notificationListener();
    // }

    // componentWillUnmount() {
    //     this.notificationDisplayedListener();
    //     this.notificationListener();
    //     this.notificationOpenedListener();
    // }

    static navigationOptions = {
        drawerLabel: () => null     
      };
 
    render() {
        let caricamento = this.isLoading();
        let disab;
        if(caricamento != null)
            disab = 'none';

        return (
            
          <View style={style.mainView} pointerEvents={disab} >
           
 {/* <DrawerButton/> */}
             
  {caricamento}

        <View style={style.inputView}>

        <TextInput style={style.signleInput}
         inlineImageLeft='login_user' 
          placeholder="e-mail"
          placeholderTextColor = '#988C6C'
          onChangeText={(input) => this.state.email = input}          
          /> 
          
          <TextInput style={style.signleInput}
          inlineImageLeft='login_password' 
          placeholder="password"
          placeholderTextColor= '#988C6C'
          onChangeText={(input) => this.state.password = input}
          secureTextEntry={true}
          />


        <TouchableOpacity

        style={{alignSelf:'center', marginTop:'10%'}} 
        onPress={()=> this.login() }
        >
        <Text style={{color:'#988C6C', fontSize:10}}>LOGIN</Text>
         
        </TouchableOpacity>

        <TouchableOpacity
        style={{alignSelf:'center', marginTop:'10%'}}
        onPress={()=>this.guestLogin()}
        >
        <Text style={{color:'#988C6C', fontSize:10}}>ENTRA COME GUEST</Text>
        
        </TouchableOpacity>


        <TouchableOpacity
        style={{alignSelf:'center', marginTop:'10%', bottom: -100, left:150}}
        onPress={()=>this.setState({modalVisible:true})} 
        >
        <Text style={{color:'#988C6C', fontSize:8}}>richiedi registrazione</Text>
        
        </TouchableOpacity>

</View>
<Modal
          animationType="fade" 
          transparent={true} 
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{flex:1, width:'100%', justifyContent:'center', backgroundColor:'black', opacity:0.8}}> 
          
          <View style={{flex:0.3, borderRadius:5, borderWidth:1, marginHorizontal:'10%', borderColor:'#333333'}}>
            <View style={{backgroundColor: '#333333', flex: 1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, color:'#988C6C', textAlign:'center'}}>
                L'app in modalità completa è dedicata ai pazienti del dottore, pertanto sarà possibile avere un account unicamente in seguito a colloquio con il dottore.                </Text> 
            </View>

        <View style={{backgroundColor:'#303030', flex: 0.3, flexDirection:'row'}}>
          
          <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>

             <TouchableHighlight
                onPress={() => {
                    this.setState({modalVisible:false})
                }}>
                <Text style={{fontSize:20, color:'#988C6C', textAlign:'center'}}>Ok</Text>
              </TouchableHighlight>
            </View>

            </View>

        </View>

          </View>
        </Modal> 


          </View>
        );
      }

      async guestLogin(){
        this.setState({caricamento:true})

        let usr = {
            nome:'guest',
            attivo: 0
        }
         await this.setState({user:usr})

        await storeUser(this.state.user, (err) => {     
                                    
            if(err)
                return /*console.log(err)*/
             else {
                this.props.navigation.navigate('Informazioni');
                this.setState({caricamento:false})

             }
                this.setState({caricamento:false})
           
        }); 




      }

      login() {

        this.setState({caricamento:true})

        var params = {
            email: this.state.email,
            password: this.state.password,
        };
     

        var formData = new FormData();

        for (var k in params) {
            formData.append(k, params[k]);
        }

        var request = {
            method: 'POST',
           // headers: headers,
            body: formData
        }; 

        return fetchTimeout(loginUrl, request, this.state.fetchTimeoutTime, "Il server non risponde")
    
            .then((response) => {
                switch (response.status) {
                    case 200:
                        response.json()
                            .then((responseJson) => {
                                this.setState({
                                    user: responseJson
                                });

                                storeUser(this.state.user, (err) => {     
                                    console.log(err)

                                    if(err)
                                        return /*console.log(err)*/
                                     else {
                                        // this.props.navigation.navigate('Dashboard');

                                        this.fcm();
                                     }

                                        this.setState({caricamento:false})

                                   
                                });                              
                        });

                            

                        break;
    
                    default:

                    response.json()
                            .then((responseJson) => {

                                if(responseJson.email && !responseJson.password)
                                    ToastAndroid.showWithGravity(responseJson.email[0], ToastAndroid.SHORT, ToastAndroid.BOTTOM)

                                else if(responseJson.password && !responseJson.email)
                                    ToastAndroid.showWithGravity(responseJson.password[0], ToastAndroid.SHORT, ToastAndroid.BOTTOM)

                                else if(responseJson.email && responseJson.password)
                                    ToastAndroid.showWithGravity(responseJson.email[0] + ' ' + responseJson.password[0], ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                                
                                else
                                    ToastAndroid.showWithGravity(responseJson, ToastAndroid.SHORT, ToastAndroid.BOTTOM)

                                });

                                this.setState({caricamento:false})
                                    
                        break; 
                        
                }
    
    
            }).catch((error) => {
                // console.log(error)
                
                this.setState({caricamento:false})

                if(typeof error == 'string')
                    ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                else 
                    ToastAndroid.showWithGravity('Errore di rete sconosciuto', ToastAndroid.SHORT, ToastAndroid.BOTTOM)

        
            });

    }

    isLoading(){ 
        return this.state.caricamento == true ? <Caricamento></Caricamento> : null;
    }

     fcm(){
         

            firebase.messaging().getToken()
            .then(fcmToken => {
            if (fcmToken) {
                var params = {
                    email: this.state.email,
                    password: this.state.password,
                    firebasetoken: fcmToken
                };
              
              
                var formData = new FormData();
              
                for (var k in params) {
                    formData.append(k, params[k]);
                }
              
                var request = {
                    method: 'POST',
                   // headers: headers,
                    body: formData
                }; 
              

                return fetchTimeout(firebasetokenurl, request, this.state.fetchTimeoutTime, "Il server non risponde")
                  
                .then((response) => {
                    switch (response.status) {
                        case 200:
                        
                            response.json()
                                .then((responseJson) => {
                                  
                                    if(this.state.user.attivo == 0)
                                        this.props.navigation.navigate('Informazioni');
                                    else    
                                        this.props.navigation.navigate('Dashboard');


                                  //ok vai avanti
                            });
              
                                
              
                            break;


              
                        default:

                        response.json()
                                .then((responseJson) => {
                            
                                        ToastAndroid.showWithGravity(responseJson, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
              
                                    });
              
                                        
                            
                    }
              
              
                }).catch((error) => {
                    console.log(error)
                    
                    this.setState({caricamento:false})
              
                    if(typeof error == 'string')
                        ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
                    else 
                        ToastAndroid.showWithGravity('Errore di rete sconosciuto', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
              
                });

            } else {
                // user doesn't have a device token yet
            } 
            });


    }

    
}



