import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

const DismissKeyboard = ({children}) => {
  //textinput있는데서만 쓰기
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
