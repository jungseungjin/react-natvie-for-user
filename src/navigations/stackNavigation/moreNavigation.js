import React from 'react';
//import {Button, LogoTitle} from 'react-native';
import More from '../../screens/main/more/moreScreen.js';
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
        headerStyle: {
          backgroundColor: 'white',
          borderBottomColor: 'white',
          shadowColor: 'white',
        },
      }}>
      <Stack.Screen
        name="More"
        component={More}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
        //headerShown: false
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
