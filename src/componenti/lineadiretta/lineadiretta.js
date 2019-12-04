import React, {
    Component
} from 'react';

import {
    NetInfo,
    TextInput,
    View,
    Button,
    StyleSheet,
    Text,
    ToastAndroid,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';

import {getStoredUser} from '../utils/storage';

var style = require('./lineadirettaStyle');

import IconAwesom from 'react-native-vector-icons/FontAwesome/';
import IconIonic from 'react-native-vector-icons/Ionicons/';
import ImagePicker from 'react-native-image-picker';

import DrawerButton from '../utils/drawerbutton';



export default class Lineadiretta extends Component {

    constructor(props) {
        super(props);

        this.state = {
          user:{},
          nota:'',
          img:''
        };
 
    }

   static navigationOptions = {
  
      drawerLabel: 'Linea diretta',
      drawerIcon: ({ tintColor }) => (
        
        <IconIonic name="ios-chatboxes" size={20} color="#988C6C" />
        
      ),
      
    };

    async componentDidMount(){

      this.props.navigation.addListener(
        'willFocus',
        () => {

           getStoredUser((val, err) => {                                         
            if(err)
               return /*console.log(err)*/
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
                return /*console.log(err)*/
            else if(val)
                this.setState({user: JSON.parse(val)}) 
        });

        if(this.state.user.attivo == 0){
          ToastAndroid.showWithGravity('L\' app non è ancora attiva per questo profilo', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
          this.props.navigation.navigate('Informazioni')
        }
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
            img: source,
          });
        }
      });
    }

    render() {

        return (
          <View style={style.mainView}>
<DrawerButton/>

<View style={{alignItems:'center'}}>
<Text style={{textAlign:'center', fontSize:20, color:'#988C6C'}}>Invia una foto ed una nota a Fabio</Text>

<TextInput
        style={{height: '60%', width:'80%', margin:'4%', borderWidth: 1, borderColor:'#988C6C', borderRadius:10}}
        onChangeText={(text) => this.setState({nota:text})}
        value={this.state.text}
        multiline={true}
      />


        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical:50 }}>
        <TouchableOpacity 
        style={{ flexDirection: 'row', alignSelf: 'center' }}
        onPress={()=> this.selectPhotoTapped()}>




{this.state.img == '' ? 
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf:'center', justifyContent:'center' }}><IconAwesom name="camera" size={20} color="#988C6C" />
           <Text style={{textAlign:'center', fontSize:20, color:'#988C6C'}}> Aggiungi una foto</Text>
            </View>
            : <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf:'center', justifyContent:'center' }}><Image 
            source={this.state.img}
            style={{ height: 150, width: 150, borderRadius: 200, margin:'10%'}} 
            /></View> } 

</TouchableOpacity>

        </View>


        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop:50 }}> 

        <TouchableOpacity
                                style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10, flex:1,
                                backgroundColor:'transparent',borderRadius:100, borderWidth: 1,borderColor: '#9A2C45', marginBottom:'10%'}}
                                onPress={() => console.log('invia')}
                        >
                            <Text style={{textAlign:'center', paddingHorizontal:10, color:'#9A2C45'}}>Invia</Text>
                </TouchableOpacity>
        </View>

          </View>

          </View>
        );
      }
}