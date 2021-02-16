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
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
enableScreens();
const Tabs = createBottomTabNavigator();
import {useSelector} from 'react-redux';

const setTabBarVisible = (route, reduexState) => {
  //특정스크린 바텀네비게이션 숨기기
  const routeName = getFocusedRouteNameFromRoute(route);
  if (reduexState.editModeCheck.editMode == true && route.name == 'Pick') {
    //찜한작업 페이지에서만 걸리도록 해야하는데..?
    return false;
  }

  const hideOnScreens = [
    'Search',
    'Setting',
    'Category',
    'Map',
    'MapSearch',
    'WorkDetail',
    'StoreLocation',
    'StoreDetail',
    'ReviewView',
    'ReviewRegister',
    'WorkVideo',
    'Login',
    'ReviewManage',
    'ReviewRevise',
    'RecentWork',
    'NoticeBoard',
    'NoticeBoardView',
    'Customer',
    'FrequentlyQuestion',
    'OneOnOne',
    'OneOnOneView',
    'OneOnOneRegister',
    'Feedback',
    'Entry',
    'Setting_more',
    'Info',
    'Withdrawal',
    'InfoCar',
    'SignUp',
    'SignUpTerms',
    'SignUpInformation',
    'SignUpInformation2',
    'SignUpInformation3',
    'SignUpInformation4',
    'SignUpComplete',
    'IdFind',
    'IdFindComplete',
    'PasswordFind',
    'PasswordFind2',
    'Map_more',
    'MapSearch_more',
  ];
  if (hideOnScreens.indexOf(routeName) > -1) return false;
  return true;
};
const TabNavigator = (props) => {
  const reduexState = useSelector((state) => state);
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
      }}
      screenOptions={({route}) => ({
        tabBarVisible: setTabBarVisible(route, reduexState),
      })}>
      <Tabs.Screen
        name="HomeTab"
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
