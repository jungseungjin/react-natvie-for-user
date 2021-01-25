import React from 'react';
import Home from '../../screens/main/home/homeScreen.js';
import Search from '../../screens/main/home/searchScreen.js';
import SearchDetail from '../../screens/main/home/searchDetailScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

import Title from '../../components/Pick/Tabbar/title.js';
import Left from '../../components/Pick/Tabbar/left.js';
import Right from '../../components/Pick/Tabbar/right.js';
import Fonts from '../../components/Fonts.js';
import Height from '../../components/Height.js';
import Width from '../../components/Width.js';
import {StatusBar} from 'react-native';
import Font_normalize from '../../components/Font_normalize.js';
import Width_convert from '../../components/Width_convert.js';
import Height_convert from '../../components/Height_convert.js';
//안드로이드는 헤더에 스테이터스바 포함안됨 아이폰은 포함됨
const convertStatusBar = StatusBar.currentHeight || 0;
enableScreens();
const Stack = createStackNavigator();
import {View, Text} from 'react-native';
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
        name="Home"
        component={Home}
        initialParams={{}}
        options={{
          headerShown: false,
          headerStyle: {
            //안드로이드는 헤더에 스테이터스바 포함안됨 아이폰은 포함됨
            height: Height_convert(94) - convertStatusBar,
          },
          headerTitle: (props) => (
            <Title
              title={'투닝'}
              titleStyle={{
                fontFamily: Fonts.Swagger,
                fontSize: Font_normalize(24),
                color: 'black',
              }}></Title>
          ),
          headerTitleAlign: 'center',
        }}
        //headerShown: false
      />
      <Stack.Screen
        name="Search"
        component={Search}
        initialParams={{}}
        options={{
          headerShown: false,
          headerStyle: {
            //안드로이드는 헤더에 스테이터스바 포함안됨 아이폰은 포함됨
            height: Height_convert(94) - convertStatusBar,
          },
          headerTitle: (props) => (
            <Title
              title={'투닝'}
              titleStyle={{
                fontFamily: Fonts.Swagger,
                fontSize: Font_normalize(24),
                color: 'black',
              }}></Title>
          ),
          headerTitleAlign: 'center',
        }}
        //headerShown: false Search
      />
      <Stack.Screen
        name="SearchDetail"
        component={SearchDetail}
        initialParams={{}}
        options={{
          headerShown: false,
          headerStyle: {
            //안드로이드는 헤더에 스테이터스바 포함안됨 아이폰은 포함됨
            height: Height_convert(94) - convertStatusBar,
          },
          headerTitle: (props) => (
            <Title
              title={'투닝'}
              titleStyle={{
                fontFamily: Fonts.Swagger,
                fontSize: Font_normalize(24),
                color: 'black',
              }}></Title>
          ),
          headerTitleAlign: 'center',
        }}
        //headerShown: false Search
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
