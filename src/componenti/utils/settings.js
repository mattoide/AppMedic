
import AsyncStorage from '@react-native-community/async-storage';



_setSetting = async (key, val, callback) => {

    try {
      await AsyncStorage.setItem(key, val);
        callback();
    } catch (error) {
        callback(error);  
    }
  };
    
  _getSetting = async (key, callback) => {
    try {
      const value = await AsyncStorage.getItem(key);
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

    export function setSetting(key, val, callback){

        this._setSetting(key, val, (err)=>{
            if(err)
                callback(err);
            else
                callback();
        });
    };

    export function getSetting(key, callback){
        return this._getSetting(key, (val, err)=>{
            if(val)
                callback(val)
            else if(err)
                callback(err)
                else callback()
        });
    }
