import React, {
    Component
} from 'react';

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';


import Icon from 'react-native-vector-icons/SimpleLineIcons/';


 class Autodiagnosi extends Component {

    constructor(props) {
        super(props);

        this.state = {}
        };


    render() {

        return (

            <View>
                <TouchableOpacity
                                style={{marginRight:40,marginLeft:40,marginTop:10,paddingTop:10,paddingBottom:10,
                                backgroundColor:'transparent',borderRadius:10, borderWidth: 1,borderColor: '#988C6C', marginBottom:'10%'}}
                                onPress={() => this.props.navigation.navigate('Autodiagnosi')}
                        >
                            <Text style={{textAlign:'center', paddingHorizontal:10, color:'#988C6C'}}>Autodiagnosi gratuita</Text>
                </TouchableOpacity>
          </View>
        );
    }
}


  export default withNavigation(Autodiagnosi);
