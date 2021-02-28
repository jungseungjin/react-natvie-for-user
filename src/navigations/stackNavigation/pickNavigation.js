import React from 'react';
import {Platform, PixelRatio} from 'react-native';
import PickScreen from '../../screens/main/pick/pickScreen.js';
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
import WorkDetail from '../../screens/main/home/workDetailScreen.js';
import StoreLocation from '../../screens/main/home/storeLocationScreen.js';
import StoreDetail from '../../screens/main/home/storeDetailScreen.js';
import StoreWorkList from '../../screens/main/home/storeWorkListScreen.js';
//안드로이드는 헤더에 스테이터스바 포함안됨 아이폰은 포함됨
const convertStatusBar = StatusBar.currentHeight || 0;
enableScreens();
const Stack = createStackNavigator();
const PickNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white',
          borderBottomColor: 'white',
          shadowColor: 'white',
        },
      }}>
      <Stack.Screen
        name="PickScreen"
        component={PickScreen}
        initialParams={{editMode: false}}
        options={({navigation, route}) => ({
          headerShown: false,
        })}
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
    </Stack.Navigator>
  );
};

export default PickNavigator;
