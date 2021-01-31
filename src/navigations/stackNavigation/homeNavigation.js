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
import StoreDetail from '../../screens/main/home/storeDetailScreen.js';
import StoreWorkList from '../../screens/main/home/storeWorkListScreen.js';
import ReviewView from '../../screens/main/home/reviewViewScreen.js';
import ReviewRegister from '../../screens/main/home/reviewRegisterScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
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
        name="StoreDetail"
        component={StoreDetail}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StoreWorkList"
        component={StoreWorkList}
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
      <Stack.Screen
        name="ReviewView"
        component={ReviewView}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReviewRegister"
        component={ReviewRegister}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
