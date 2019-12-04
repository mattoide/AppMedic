import React, {
    Component
} from 'react';

import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image, StyleSheet
} from 'react-native';




import { FlatGrid, SectionGrid } from 'react-native-super-grid';




var fetchTimeout = require('fetch-timeout');

 
const immagini = [
    {immagine: require('../../immagini/diagnosi/haglund.png'), diagnosi:'Haglund'},
    {immagine: require('../../immagini/diagnosi/piede_piatto.png'), diagnosi:'Piede piatto'},
    {immagine: require('../../immagini/diagnosi/metatarsalgia.png'), diagnosi:''}, //3
    {immagine: require('../../immagini/diagnosi/allucevalgo_allucerigido.png'), diagnosi:''},//4
    {immagine: require('../../immagini/diagnosi/4ditomartello_allung_accorc.png'), diagnosi:''},//5
    {immagine: require('../../immagini/diagnosi/3ditomartello_allung_accorc.png'), diagnosi:''},//6
    {immagine: require('../../immagini/diagnosi/2ditomartello_allung_accorc.png'), diagnosi:''},//7
    {immagine: require('../../immagini/diagnosi/5ditovaro.png'), diagnosi:'5 dito varo'},
    {immagine: require('../../immagini/diagnosi/brachimetatarsia.png'), diagnosi:'Brachimetatarsia'},
    {immagine: require('../../immagini/diagnosi/spina_calcaneare.png'), diagnosi:'Spina calcaneare'},
    {immagine: require('../../immagini/diagnosi/neuromaDiMorton.png'), diagnosi:''},//11
    {immagine: require('../../immagini/diagnosi/sintattilia.png'), diagnosi:'Sintattilia'},
]

const dagnosi = ["Alluce valgo", "Alluce rigido", "Dito a martello", "Piede piatto", "Sintattilia", "Allungamento", "Accorciamento", "Haglund", "Spina", "Metatarsalagia", "Morton", "5 dito varo", "Brachimetatarsia"];


export default class RispostaImg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            domanda:-1,           
            diagnosi:'',

            disabled:true
        };


    }

    async componentWillUpdate(){

    
       if(this.state.domanda != this.props.domanda){
          await  this.setState({domanda:this.props.domanda})
        }


      }

      
    async componentWillMount(){
    
        if(this.state.domanda != this.props.domanda){
            await this.setState({domanda:this.props.domanda})
        }
       }
    
       _renderItem = (item, index) =>{
        const myFontSize = 25;
        
        
        return (  
                
                // <View style={{borderColor:'#333333', borderStyle:'solid', borderTopWidth:1, flex:1}}>
                              <View style={{ 
                                justifyContent: 'center', alignItems:'center', alignContent:'center', alignSelf:'center',
                                width:150,
                                height:150,
                                borderRadius: 0,
                                padding: 0
                                }}>
 
 
<TouchableOpacity 
onPress={()=>{this.setState({dagnosi:item.diagnosi})
            this.props.avanti(item.diagnosi);
             }} 
>

   {item.diagnosi == "Spina calcaneare" || item.diagnosi == "Piede piatto"  ? 
          <Image 
          source={item.immagine} 
          style={{flex:1, resizeMode:'contain', aspectRatio:0.9}}
          >
              
          </Image>
  : 
  <Image 
  source={item.immagine} 
  style={{flex:1, resizeMode:'contain'}}
  >
      
  </Image>
  }

 
</TouchableOpacity>
                    
                {/* <View style={{flexDirection:'row',flex:1}}>
        
                <View style={{flex:1,justifyContent:'flex-start'}}>
                <Text style={{textAlign:'center',fontSize:myFontSize, color:'#988C6C', justifyContent:'flex-start'}}>{item.data} </Text>   
                </View>
        
                <View style={{ flex:1, flexDirection:'row', justifyContent:'flex-end', marginHorizontal:'5%'}}>
                <Text style={{textAlign:'center', fontSize:myFontSize, color:'#988C6C', }}>{item.completi}/{item.totali}</Text>           
                </View>
                </View> */}
              </View> 
          );
        } 
 
    render() {

        return (
            
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
           
          <Text style={{fontSize:30, color:'#988C6C', textAlign:'center'}}>Dove hai dolore?</Text>

          <FlatGrid
            items={immagini}
            renderItem={({item, index}) => (this._renderItem(item, index))}
             style={{flex:1}}
            itemDimension={150} 
            itemContainerStyle={{justifyContent:'center', alignContent:'center', alignItems:'center', padding:0}} 
            spacing={10}
            />  

         </View>
        );
      }
}

