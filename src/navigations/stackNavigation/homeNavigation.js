import React from 'react';
import Home from '../../screens/main/homeScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

enableScreens();
const Stack = createStackNavigator();

const HomeNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Home" component={Home} initialParams={{}} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
