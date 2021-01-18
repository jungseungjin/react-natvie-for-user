import React from 'react';
import {Button} from 'react-native';
const landingScreen = ({navigation, route}) => {
  return (
    <>
      <Button
        title="Go to Home"
        onPress={() => {
          route.params.naviChange();
        }}
      />
      <Button
        title="Go to next"
        onPress={() =>
          navigation.navigate('Landing2', {
            naviChange: route.params.naviChange,
          })
        }
      />
    </>
  );
};
export default landingScreen;
