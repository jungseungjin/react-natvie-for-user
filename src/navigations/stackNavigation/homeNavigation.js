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
import WorkVideo from '../../screens/main/home/workVideoScreen.js';
import WorkVideoList from '../../screens/main/home/workVideoListScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
enableScreens();
const Stack = createStackNavigator();
import {View, Text} from 'react-native';
const HomeNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="SearchDetail"
        component={SearchDetail}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetail}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="MapSearch"
        component={MapSearch}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="WorkDetail"
        component={WorkDetail}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="StoreDetail"
        component={StoreDetail}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="StoreWorkList"
        component={StoreWorkList}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="StoreLocation"
        component={StoreLocation}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="ReviewView"
        component={ReviewView}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="ReviewRegister"
        component={ReviewRegister}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="WorkVideo"
        component={WorkVideo}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="WorkVideoList"
        component={WorkVideoList}
        initialParams={{}}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
