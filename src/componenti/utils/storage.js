
import AsyncStorage from '@react-native-community/async-storage';



_storeUser = async (val, callback) => {

    try {
      await AsyncStorage.setItem('utente', JSON.stringify(val));
        callback();
    } catch (error) {
        callback(error);  
    }
  };
    
  _getStoredUser = async (callback, val, err) => {
    try {
      const value = await AsyncStorage.getItem('utente');
      if (value !== null) {
        // We have data!!
       // console.log(value);
        val = value; 
        callback(val)
      }
    } catch (error) {
        err = error;
        callback(err)
    }
  };

  
_removeUser = async (callback) => {

    try {
      await AsyncStorage.removeItem('utente');
        callback();
    } catch (error) {
        callback(error);  
    }
  };
      

     

    
    export function storeUser(val, callback){

        this._storeUser(val, (err)=>{
            if(err)
                callback(err);
            else
                callback();
        });
    };

    export function getStoredUser(callback){
        return this._getStoredUser((val, err)=>{
            if(val)
                callback(val)
            else if(err)
                callback(err)
        });
    }

        
    export function removeUser(callback){
        this._removeUser((err)=>{
            if(err)
                callback(err);
            else
                callback();
        });
    };