import React, {
    Component
} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableHighlight,
    ToastAndroid
  } from 'react-native';

import {getStoredUser} from '../utils/storage';

var style = require('./riabilitazioneStyle');

import RiabilitazioneI from 'react-native-vector-icons/Foundation/';

import { FlatGrid, SectionGrid } from 'react-native-super-grid';



import DrawerButton from '../utils/drawerbutton';
import CustomModal from '../utils/modal';

import IconFontAwsome from 'react-native-vector-icons/FontAwesome5';

import * as Progress from 'react-native-progress';

import StepTempo from "../wizard/steps/StepTempo";
import StepRip from "../wizard/steps/StepRip";
import StepInt from "../wizard/steps/StepInt";

export default class Riablitazione extends Component {

    constructor(props) {
        super(props);

        this.state = {
          user:{},
          modalVisible: false,
          esercizi:[
            {data:'8 Aprile - 11.10',completi:'1', totali:'8'},
            {data:'8 Aprile - 14.07',completi:'8', totali:'8'},
            {data:'9 Aprile - 10.10',completi:'8', totali:'8'},
            {data:'10 Aprile - 09.00',completi:'3', totali:'8'},
            {data:'11 Aprile - 11.10',completi:'8', totali:'8'},
            {data:'13 Aprile - 17.10',completi:'8', totali:'8'},
            {data:'15 Aprile - 19.00',completi:'3', totali:'8'},
            {data:'15 Aprile - 11.30',completi:'8', totali:'8'},
            {data:'15 Aprile - 12.30',completi:'8', totali:'8'},
            {data:'15 Aprile - 15.30',completi:'8', totali:'8'},
            {data:'17 Aprile - 16.00',completi:'8', totali:'8'},
            {data:'17 Aprile - 16.00',completi:'8', totali:'8'},
            {data:'18 Aprile - 16.00',completi:'1', totali:'8'},
            {data:'19 Aprile - 16.00',completi:'8', totali:'8'}
        
          ],
          xc:0
        };
 
    }

   static navigationOptions = {
  
      drawerLabel: 'Riabilitazione',
      drawerIcon: () => (
        
        <RiabilitazioneI name="foot" size={20} color="#988C6C" />
        
      ),
      
    };

    goSteps(){

      if(!this.state.user.esercizi || this.state.user.esercizi.length <= 0){
        ToastAndroid.showWithGravity('Non ci sono esecizi da fare', ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        return;
      }

      this.setModalVisible(false);
      var steps = [];
           this.state.user.esercizi.forEach(element => {
              if(element.tipoesercizio == 'tempo'){
                  let a = {
                   component: StepTempo,
                   props    : {
                     descrizione: element.nome,
                     immagine: element.immagine,
                     tempo: 120000
                   }
                  }
                  steps.push(a);
              }
              

              if(element.tipoesercizio == 'ripetizioni'){
               let a = {
                component: StepRip,
                props    : {
                  descrizione: element.nome,
                  immagine: element.immagine
          
                }
               }
               steps.push(a);
           }

           if(element.tipoesercizio == 'interattivi'){
            let a = {
             component: StepInt,
             props    : {
               descrizione: element.nome,
               immagine: element.immagine,
               swipes: 8
       
             }
            }
            steps.push(a);
        }

          });
          console.log(steps)
      this.props.navigation.navigate('Wizard', {steps: steps});

    }

    async componentDidMount(){




      this.props.navigation.addListener(
        'willFocus',
        (p) => {


          let xc = 0;
          this.state.esercizi.forEach(element => {
            if(element.completi >= element.totali)
            xc++;
          });

          // xc = parseFloat((xc / this.state.esercizi.length * 100) * 100).toFixed(2);
           xc = xc / this.state.esercizi.length

          // console.log(xc)

          this.setState({xc:xc});


           getStoredUser((val, err) => {                                         
            if(err)
                return //console.log(err)
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

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    _renderItem = (item, index) =>{
const myFontSize = 25;

let completo;
let color;

item.completi < item.totali ? (completo = 0, color = '#A32B47') : (completo = 1, color = '#5EB157');


return (  
        
        <View style={{borderColor:'#333333', borderStyle:'solid', borderTopWidth:1, flex:1}}>
        <ScrollView>
        <View style={{flexDirection:'row',flex:1}}>

        <View style={{flex:1,justifyContent:'flex-start'}}>
        <Text style={{textAlign:'center',fontSize:myFontSize, color:'#988C6C', justifyContent:'flex-start'}}>{item.data} </Text>   
        </View>

        <View style={{ flex:1, flexDirection:'row', justifyContent:'flex-end', marginHorizontal:'5%'}}>
        <Text style={{textAlign:'center', fontSize:myFontSize, color:'#988C6C', }}>{item.completi}/{item.totali}</Text>   
        <Text> </Text>   
        <Progress.Pie style={{justifyContent:'center', marginHorizontal:'5%'}} size={10} color={color} unfilledColor={color} borderColor={color} indeterminate={false} progress={completo}  />

        </View>
        </View>
        </ScrollView>             
      </View> 
  );
} 

    render() {

        return (
          <View style={style.mainView}>
          

<DrawerButton/>

<View style={{flex:1, marginTop:'15%'}}>

{/* <CustomModal modalVisible={this.state.modalVisible}></CustomModal> */}

{/* MODAL */}

<Modal
          animationType="fade" 
          transparent={true} 
          visible={this.state.modalVisible}
          >
          <View style={{flex:1, width:'100%', justifyContent:'center', backgroundColor:'black', opacity:0.8}}> 
          
          <View style={{flex:0.2, borderRadius:5, borderWidth:1, marginHorizontal:'10%', borderColor:'#333333'}}>
            <View style={{backgroundColor: '#333333', flex: 1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25, color:'#988C6C', textAlign:'center'}}>Vuoi iniziare un nuovo set di esercizi?</Text> 
            </View>

        <View style={{backgroundColor:'#303030', flex: 0.3, flexDirection:'row'}}>
          
          <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>

             <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={{fontSize:20, color:'#988C6C', textAlign:'center'}}>Cancella</Text>
              </TouchableHighlight>
            </View>


            <View style={{flex:1, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
              <TouchableHighlight
                onPress={() => {
                  this.goSteps();
                }}>
                <Text style={{fontSize:20, color:'#988C6C', textAlign:'center'}}>Ok</Text>
              </TouchableHighlight>
              </View>

            </View>

        </View>

          </View>
        </Modal>


{/* MODAL */}

<View style={{marginVertical:'5%', alignItems:'center'}}>

<IconFontAwsome name="running" size={50} color="#988C6C" />
<Text style={{fontSize:25, color:'#988C6C', textAlign:'center'}}>Esercizi</Text>

<Progress.Bar color={'#A32B47'} progress={this.state.xc} width={200} />
<Text style={{fontSize:25, color:'#988C6C', textAlign:'center'}}>Completa ogni giorno gli esercizi per una riabilitazione corretta!</Text>


</View>

 <FlatGrid
  items={this.state.esercizi}
  // items={this.state.user.esercizi}
  renderItem={({item, index}) => (this._renderItem(item, index))}
  style={{maxHeight: '60%'}}
  itemDimension={1000}
  spacing={1}
/> 
 

            <TouchableOpacity
                        style={{marginHorizontal:'5%', marginTop:10,paddingTop:10,paddingBottom:10,
                        backgroundColor:'transparent',borderRadius:100, borderWidth: 1,borderColor: '#9A2C45', marginBottom:'10%'}}
                        onPress={() => this.setState({modalVisible: true})}
                >
                    <Text style={{textAlign:'center', paddingHorizontal:10, color:'#9A2C45'}}>Clicca nuovo</Text>
        </TouchableOpacity>
</View>

          </View>
        );
      }
}