import React from 'react';
//import {Button, LogoTitle} from 'react-native';
import More from '../../screens/main/more/moreScreen.js';
import Info from '../../screens/main/more/infoScreen.js';
import SignUp from '../../screens/main/more/signUpScreen.js';
import Login from '../../screens/main/more/loginScreen.js';
import Setting from '../../screens/main/more/settingScreen.js';
import NoticeBoard from '../../screens/main/more/noticeBoardScreen.js';
import NoticeBoardView from '../../screens/main/more/notiveBoardViewScreen.js';
import Entry from '../../screens/main/more/entryQuestionScreen.js';
import Customer from '../../screens/main/more/customerServiceScreen.js';
import RecentWork from '../../screens/main/more/recentWorkScreen.js';
import ReviewManage from '../../screens/main/more/reviewManageScreen.js';
import ReviewRevise from '../../screens/main/more/reviewReviseScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';

enableScreens();
const Stack = createStackNavigator();

const MoreNavigator = (props) => {
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
        name="More"
        component={More}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
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
      />
      <Stack.Screen
        name="NoticeBoard"
        component={NoticeBoard}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NoticeBoardView"
        component={NoticeBoardView}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Entry"
        component={Entry}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Customer"
        component={Customer}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecentWork"
        component={RecentWork}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReviewManage"
        component={ReviewManage}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReviewRevise"
        component={ReviewRevise}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MoreNavigator;
