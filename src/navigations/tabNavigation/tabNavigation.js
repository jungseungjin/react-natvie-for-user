import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import HomeNavigator from '../stackNavigation/homeNavigation.js';
enableScreens();
const Tabs = createBottomTabNavigator();
/* <Tabs.Navigator>
  <Tabs.Screen name="main" component={mainStack} />
</Tabs.Navigator> */

// const mainStack = () => {
//   //screenOptions={baseHeaderOptions} //options={homeScreenOptions}
//   //Import the other screens you use!
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Other" component={OtherScreen} />
//       <Stack.Screen name="Diff" component={DiffScreen} />
//     </Stack.Navigator>
//   );
// };
// /*
//   initialParams={''}
//   options={(navigation) => ({
//     tabBarVisible: false,
//   })}
// */
const TabNavigator = (props) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeNavigator} />
    </Tabs.Navigator>
  );
};
export default TabNavigator;
