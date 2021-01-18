import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import TabNavigator from '../tabNavigation/tabNavigation';
import LandingNavigator from '../stackNavigation/landingNavigation';
import {useSelector} from 'react-redux';
enableScreens();
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const FirstNavigator = (props) => {
  const reduexState = useSelector((state) => state);
  const [landingCheck, setLandingCheck] = React.useState(false);
  React.useEffect(() => {
    setLandingCheck(reduexState.landingCheck.landingCheck);
  }, [reduexState.landingCheck.landingCheck]);
  console.log(landingCheck);
  return (
    <NavigationContainer>
      {landingCheck ? (
        <TabNavigator></TabNavigator>
      ) : (
        <LandingNavigator></LandingNavigator>
      )}
    </NavigationContainer>
  );
};

export default FirstNavigator;
