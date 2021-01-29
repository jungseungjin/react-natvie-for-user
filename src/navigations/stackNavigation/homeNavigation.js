import React from 'react';
import Home from '../../screens/main/home/homeScreen.js';
import Search from '../../screens/main/home/searchScreen.js';
import SearchDetail from '../../screens/main/home/searchDetailScreen.js';
import Setting from '../../screens/main/home/settingScreen.js';
import Category from '../../screens/main/home/categoryScreen.js';
import CategoryDetail from '../../screens/main/home/categoryDetailScreen.js';
import Map from '../../screens/main/home/mapScreen.js';
import MapSearch from '../../screens/main/home/mapSeachScreen.js';
import WorkDetail from '../../screens/main/home/workDetailScreen.js';
import StoreLocation from '../../screens/main/home/storeLocationScreen.js';
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
        }}
        //headerShown: false Search
      />
      <Stack.Screen
        name="SearchDetail"
        component={SearchDetail}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        initialParams={{}}
        options={{
          headerShown: false,
          headerStyle: {
            //안드로이드는 헤더에 스테이터스바 포함안됨 아이폰은 포함됨
            height: Height_convert(94) - convertStatusBar,
          },
          // headerLeft: ({props}) => (
          //   <Left
          //     navigation={props}
          //     left={'goBack'}
          //     leftStyle={{
          //       marginLeft: Width_convert(22),
          //     }}></Left>
          // ),
          headerTitle: (props) => (
            <Title
              title={'설정'}
              titleStyle={{
                fontFamily: Fonts?.NanumGothicRegular || null,
                fontSize: Font_normalize(16),
                color: 'black',
                fontWeight: '700',
              }}></Title>
          ),
          headerTitleAlign: 'center',
          headerRight: (props) => (
            <Right
              right={'완료'}
              rightStyle={{
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                color: '#946AEF',
                fontSize: Font_normalize(14),
                marginRight: Width_convert(22),
              }}></Right>
          ),
        }}
        //headerShown: false Search
      />
      <Stack.Screen
        name="Category"
        component={Category}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetail}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapSearch"
        component={MapSearch}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WorkDetail"
        component={WorkDetail}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StoreLocation"
        component={StoreLocation}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
