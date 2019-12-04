import React, {
    Component
} from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {removeUser} from './storage';


import Icon from 'react-native-vector-icons/SimpleLineIcons/';


 class LogoutButton extends Component {

    constructor(props) {
        super(props);

        this.state = {}
        };
    
        logout(){

            removeUser((err) => {     
                if(err)
                    return //console.log(err)
                 else 
                    this.props.navigation.navigate('Login');
                
            });
        }

    render() {

        return (

            <View>
                  <TouchableOpacity
                        onPress={()=>this.logout()}>
                <Icon name="logout" size={25} color="#988C6C" />
            </TouchableOpacity>    
          </View>
        );
    }
}


  export default withNavigation(LogoutButton);
