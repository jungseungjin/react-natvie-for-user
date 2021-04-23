import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const SetRecentList = async (type, id) => {
  try {
    let value;
    if (type === 'work') {
      value = await AsyncStorage.getItem('recentWorkList');
    } else if (type === 'store') {
      value = await AsyncStorage.getItem('recentStoreList');
    }
    if (value === null) {
      if (type === 'work') {
        value = await AsyncStorage.setItem('recentWorkList', id);
      } else if (type === 'store') {
        value = await AsyncStorage.setItem('recentStoreList', id);
      }
    } else {
      let new_data = value.split(',');
      let new_arr = [];
      let new_str = '';
      if (new_data.indexOf(id) != -1) {
        //삭제하고
        new_data.splice(new_data.indexOf(id), 1);
      } //제일 앞에 붙이기
      new_data.unshift(id);
      for (var a = 0; a < new_data.length; a++) {
        if (a == 0) {
          new_str = new_data[a];
        } else {
          new_str = new_str + ',' + new_data[a];
        }
        if (a > 19) {
          //0~19까지 최근 20개만
          break;
        }
      }
      if (type === 'work') {
        value = await AsyncStorage.setItem('recentWorkList', new_str);
      } else if (type === 'store') {
        value = await AsyncStorage.setItem('recentStoreList', new_str);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export default SetRecentList;
