import React from 'react';
import Pick from '../../screens/main/pick/pickScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

enableScreens();
const Stack = createStackNavigator();

const PickNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Pick"
        component={Pick}
        initialParams={{}}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default PickNavigator;
