
import AsyncStorage from '@react-native-community/async-storage';



_setPedometerData = async (val, callback) => {

    try {
      await AsyncStorage.setItem("pedometerData", JSON.stringify(val));
        callback();
    } catch (error) {
        callback(error);  
    }
  };
    
  _getPedometerData = async (callback) => {
    try {
      const value = await AsyncStorage.getItem("pedometerData");
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

    export function setPedometerData(val, callback){

        this._setPedometerData(val, (err)=>{
            if(err)
                callback(err);
            else
                callback();
        });
    };

    export function getPedometerData(callback){
        return this._getPedometerData((val, err)=>{
            if(val)
                callback(val)
            else if(err)
                callback(err)
                else callback()
        });
    }
