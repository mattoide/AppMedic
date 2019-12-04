import React, {
    Component
} from 'react';

import {
    View,
    Text,
    Image,
    TouchableOpacity} from 'react-native';

import {getStoredUser} from '../utils/storage';


var style = require('./userheaderdrawerStyle');
import ImagePicker from 'react-native-image-picker';



export default class UserHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
          user:{},
          avatarSource:''

        };

            this.selectPhotoTapped = this.selectPhotoTapped.bind(this);

 
    }

    selectPhotoTapped() {
      const options = {
        title: 'Seleziona immagine',
        takePhotoButtonTitle:'Scatta una foto',
        chooseFromLibraryButtonTitle:'Scegli dalla galleria',
        cancelButtonTitle:'Annulla',
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true,
        },
      };
  
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          //console.log('User cancelled photo picker');
        } else if (response.error) {
         // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
         // console.log('User tapped custom button: ', response.customButton);
        } else {
          let source = { uri: response.uri };
  
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };

          //TODO: salvare uri nell user
  
          this.setState({
            avatarSource: source,
          });
        }
      });
    }

    async refreshUser(){

      // console.log('diocnaeee')
      // console.log(this.state.user)

      await getStoredUser((val, err) => {                                         
        if(err){
           this.setState({user: {}}) 
          console.log(err)
        }
        else if(val){
            this.setState({user: JSON.parse(val)}) 
            // console.log(val)
            // console.log('val')

        }
    });
    }

    async componentDidMount(){
      
          await getStoredUser((val, err) => {                                         
            if(err){
              console.log(err)
            }
            else if(val){
                this.setState({user: JSON.parse(val)}) 
                // console.log(val)

            }
        });
    }

    render() {

      // console.log(Object.keys(this.state.user).length)
          this.refreshUser();

          let usr;
          if(this.state.user.attivo == 0){
            usr =  <View >

            <Image 
            source={''}
            style={{ height: 150, width: 150, borderRadius: 200, margin:'10%'}} 
            /> 

                <Text style={{color:'#A42B46', textAlign:'center', fontSize:30}}>{this.state.user.nome} {this.state.user.cognome}</Text>
          </View>
          } else {
            usr =  <View>
     <TouchableOpacity

          style={{alignSelf:'center', marginTop:'10%'}} 
          onPress={()=> this.selectPhotoTapped() }
          > 
          {this.state.avatarSource == '' ? 
          <Text style={{color:'#A42B46', textAlign:'center', fontSize:15, margin:50}}>Scegli una foto</Text> 
          : <Image 
            source={this.state.avatarSource}
            style={{ height: 150, width: 150, borderRadius: 200, margin:'10%'}} 
            />}
             
            </TouchableOpacity>

                <Text style={{color:'#A42B46', textAlign:'center', fontSize:30}}>{this.state.user.nome} {this.state.user.cognome}</Text>
          </View>
          }


        return (

                     <View style={style.mainView}>

          {usr}

          </View>
          // <View style={style.mainView}>

          //   <Image 
          //   source={require('../../immagini/face.jpg')}
          //   style={{ height: 150, width: 150, borderRadius: 200, margin:'10%'}} 
          //   /> 

          //       <Text style={{color:'#A42B46', textAlign:'center', fontSize:30}}>{this.state.user.nome} {this.state.user.cognome}</Text>
          // </View>
        );
      }
}