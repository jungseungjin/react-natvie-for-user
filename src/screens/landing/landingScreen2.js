import React from 'react';
import {Button} from 'react-native';
const landingScreen = ({navigation, route}) => {
  return (
    <>
      <Button title="Go to Home" onPress={() => alert('gd')} />
      <Button title="Go to prev" onPress={() => navigation.goBack()} />
    </>
  );
};
export default landingScreen;
