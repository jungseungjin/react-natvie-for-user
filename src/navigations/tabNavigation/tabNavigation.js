import React from 'react';
import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import HomeNavigator from '../stackNavigation/homeNavigation.js';
import PickNavigator from '../stackNavigation/pickNavigation.js';
import MoreNavigator from '../stackNavigation/moreNavigation.js';
import Home_non_active from '../../../assets/nav/Home_non_active.svg';
import Home_active from '../../../assets/nav/Home_active.svg';
import Pick_non_active from '../../../assets/nav/Pick_non_active.svg';
import Pick_active from '../../../assets/nav/Pick_active.svg';
import More_non_active from '../../../assets/nav/More_non_active.svg';
import More_active from '../../../assets/nav/More_active.svg';
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
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tabs.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused == true) {
              return <Home_active></Home_active>;
            } else {
              return <Home_non_active></Home_non_active>;
            }
          },
        }}
        //options={{tabBarVisible: false}}
      />
      <Tabs.Screen
        name="Pick"
        component={PickNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused == true) {
              return <Pick_active></Pick_active>;
            } else {
              return <Pick_non_active></Pick_non_active>;
            }
          },
        }}
        //options={{tabBarVisible: false}}
      />
      <Tabs.Screen
        name="More"
        component={MoreNavigator}
        options={{
          tabBarIcon: ({focused}) => {
            if (focused == true) {
              return <More_active></More_active>;
            } else {
              return <More_non_active></More_non_active>;
            }
          },
        }}
        //options={{tabBarVisible: false}}
      />
    </Tabs.Navigator>
  );
};
export default TabNavigator;
