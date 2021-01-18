import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import OtherScreen from '../../screens/OtherScreen';
import DiffScreen from '../../screens/DiffScreen';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import LandingNavigator from '../../navigations/stackNavigation/landingNavigation';
enableScreens();
const Stack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const Navigator = (props) => {
  const [navi, setNavi] = React.useState(false);
  const naviChange = React.useCallback(() => {
    setNavi(!navi);
  }, []);
  const mainStack = () => {
    //screenOptions={baseHeaderOptions} //options={homeScreenOptions}
    //Import the other screens you use!
    return (
      <Stack.Navigator>
        <Stack.Screen name="Other" component={OtherScreen} />
        <Stack.Screen name="Diff" component={DiffScreen} />
      </Stack.Navigator>
    );
  };
  /*

              initialParams={''}
              options={(navigation) => ({
                tabBarVisible: false,
              })}
*/
  return (
    <NavigationContainer>
      {navi ? (
        <Tabs.Navigator>
          <Tabs.Screen name="main" component={mainStack} />
        </Tabs.Navigator>
      ) : (
        <LandingNavigator naviChange={{naviChange}}></LandingNavigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
