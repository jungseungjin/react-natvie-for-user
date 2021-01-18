import React from 'react';
import LandingScreen from '../../screens/landing/landingScreen';
import LandingScreen2 from '../../screens/landing/landingScreen2';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {Button} from 'react-native';
enableScreens();
const Stack = createStackNavigator();

const landingNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Landing2" component={LandingScreen2} />
    </Stack.Navigator>
  );
};

export default landingNavigator;
