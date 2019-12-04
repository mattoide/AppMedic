import React, {
    Component
} from 'react';

import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native';

import * as Progress from 'react-native-progress';

export default class Caricamento extends Component {

    constructor(props) {
        super(props);

        this.state = {}
        };
    

    render() {
        return (

            // <View style={{flex:1,alignSelf:'center', alignItems:'center', top:100}}>
            //     <Progress.Circle 
            //     color={'white'} 
            //     size={100} 
            //     borderWidth={5} 
            //     thickness={10}
            //     indeterminate={true} 
            //     />
            //         <Text style={{alignSelf:'center', color:'white'}}>
            //             Caricamento...
            //         </Text>
            // </View>

            <View style={[styles.container, styles.horizontal, styles.loading]}>
            <ActivityIndicator size={80} color="#988C6C"  />
           
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
     },
     loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: '20%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })