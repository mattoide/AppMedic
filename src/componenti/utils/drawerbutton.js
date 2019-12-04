import React, {
    Component
} from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';


import Icon from 'react-native-vector-icons/MaterialIcons';


 class DrawerButton extends Component {

    constructor(props) {
        super(props);

        this.state = {}
        };
    

    render() {

        return (

            <View style={[styles.container, styles.horizontal, styles.loading]}>
              <TouchableOpacity onPress={()=>this.props.navigation.toggleDrawer()}>
                  <Icon name="menu" size={30} color="#988C6C" />
              </TouchableOpacity>           
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
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 10
     },
     loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: '20%',
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    }
  })

  export default withNavigation(DrawerButton);
