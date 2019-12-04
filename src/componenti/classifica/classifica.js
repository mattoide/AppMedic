import React, {
    Component
} from 'react';

import {
    View,
    ToastAndroid} from 'react-native';

import {getStoredUser} from '../utils/storage';

var style = require('./classificaStyle');

import Icon from 'react-native-vector-icons/Foundation/';

import DrawerButton from '../utils/drawerbutton';




export default class Classifica extends Component {

    constructor(props) {
        super(props);

        this.state = {
          user:{}
        };
 
    }

   static navigationOptions = {
  
      drawerLabel: 'Classifica',
      drawerIcon: () => (
        
        <Icon name="trophy" size={20} color="#988C6C" />
        
      ),
      
    };

    async componentDidMount(){

      this.props.navigation.addListener(
        'willFocus',
        () => {

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
        
        }
      );

          await getStoredUser((val, err) => {                                         
            if(err)
                return //console.log(err)
            else if(val)
                this.setState({user: JSON.parse(val)}) 
        });



        if(this.state.user.attivo == 0){
          ToastAndroid.showWithGravity('L\' app non è ancora attiva per questo profilo', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
          this.props.navigation.navigate('Informazioni')
        }
               
    }

    render() {

        return (
          <View style={style.mainView}>
<DrawerButton/>

<View style={{flex:1, marginTop:'15%'}}>
<View style={style.linea}/>
<View style={style.linea}/>
<View style={style.linea}/>
<View style={style.linea}/>
</View>

<View style={{flex:1, position:'absolute', top:100, left:100}}>
<Icon name="foot" size={50} color="#988C6C" /> 
</View> 

<View style={{flex:1, position:'absolute', top:180, left:20}}>
<Icon name="foot" size={50} color="#988C6C" /> 
</View> 

<View style={{flex:1, position:'absolute', top:260, left:260}}>
<Icon name="foot" size={50} color="#988C6C" /> 
</View> 

<View style={{flex:1, position:'absolute', top:290, left:60}}>
<Icon name="foot" size={50} color="#A32B47" /> 
</View> 

<View style={{flex:1, position:'absolute', top:340, left:230}}>
<Icon name="foot" size={50} color="#988C6C" /> 
</View> 

<View style={{flex:1, position:'absolute', top:60, left:290}}>
<Icon name="foot" size={50} color="#988C6C" /> 
</View> 


<View style={{flex:1, position:'absolute', top:460, left:290}}>
<Icon name="foot" size={50} color="#988C6C" /> 
</View> 

<View style={{flex:1, position:'absolute', top:420, left:3}}>
<Icon name="foot" size={50} color="#988C6C" /> 
</View> 

<View style={{flex:1, position:'absolute', top:600, left:100}}>
<Icon name="foot" size={50} color="#988C6C" /> 
</View> 

          </View> 
        );
      }
}
{/* <Icon name="foot" size={50} color="#988C6C" /> */}
