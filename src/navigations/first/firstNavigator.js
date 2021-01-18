import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import TabNavigator from '../tabNavigation/tabNavigation';
import LandingNavigator from '../stackNavigation/landingNavigation';
enableScreens();
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const FirstNavigator = (props) => {
  const [navi, setNavi] = React.useState(false);
  const naviChange = React.useCallback(() => {
    setNavi(!navi);
  }, []);
  return (
    <NavigationContainer>
      {navi ? (
        <TabNavigator></TabNavigator>
      ) : (
        <LandingNavigator naviChange={{naviChange}}></LandingNavigator>
      )}
    </NavigationContainer>
  );
};

export default FirstNavigator;
