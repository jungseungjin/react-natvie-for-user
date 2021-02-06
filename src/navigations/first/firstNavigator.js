import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import TabNavigator from '../tabNavigation/tabNavigation';
import LandingNavigator from '../stackNavigation/landingNavigation';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import IsLoading from '../../components/ActivityIndicator';
import RNSplashScreen from 'react-native-splash-screen';
enableScreens();
const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const FirstNavigator = (props) => {
  const [landingCheck, setLandingCheck] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const reduexState = useSelector((state) => state);
  const setData = async (value) => {
    try {
      await AsyncStorage.setItem('landingCheck', value.toString());
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async function () {
    try {
      let value = await AsyncStorage.getItem('landingCheck');
      if (value == null) {
      } else {
        setLandingCheck(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    setIsLoading(true);
    getData();
    setTimeout(() => {
      RNSplashScreen.hide();
    }, 1000);
    setIsLoading(false);
  }, []);
  React.useEffect(() => {
    setIsLoading(true);
    if (reduexState.landingCheck.landingCheck == true) {
      setLandingCheck(true);
      setData(true);
    }
    setIsLoading(false);
  }, [reduexState.landingCheck.landingCheck]);

  // {landingCheck ? (      ) : (
  //   <LandingNavigator></LandingNavigator>
  // )}
  return (
    <NavigationContainer>
      <TabNavigator></TabNavigator>
      {isLoading ? <IsLoading></IsLoading> : null}
    </NavigationContainer>
  );
};

export default FirstNavigator;
