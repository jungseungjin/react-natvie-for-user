import React from 'react';
import Home from '../../screens/main/home/homeScreen.js';
import Banner1 from '../../screens/main/home/banner1';
import Banner2 from '../../screens/main/home/banner2';
import Search from '../../screens/main/home/searchScreen.js';
import SearchDetail from '../../screens/main/home/searchDetailScreen.js';
import Setting from '../../screens/main/home/settingScreen.js';
import Category from '../../screens/main/home/categoryScreen.js';
import CategoryDetail from '../../screens/main/home/categoryDetailScreen.js';
import Map from '../../screens/main/home/mapScreen.js';
import MapSearch from '../../screens/main/home/mapSearchScreen.js';
import WorkDetail from '../../screens/main/home/workDetailScreen.js';
import WorkDetail2 from '../../screens/main/home/workDetailScreen.js';
import StoreLocation from '../../screens/main/home/storeLocationScreen.js';
import StoreDetail from '../../screens/main/home/storeDetailScreen.js';
import StoreWorkList from '../../screens/main/home/storeWorkListScreen.js';
import ReviewView from '../../screens/main/home/reviewViewScreen.js';
import ReviewRegister from '../../screens/main/home/reviewRegisterScreen.js';
import WorkVideo from '../../screens/main/home/workVideoScreen.js';
import WorkVideoList from '../../screens/main/home/workVideoListScreen.js';
import SignUp from '../../screens/main/more/signUpScreen.js';
import RecentWork from '../../screens/main/more/recentWorkScreen.js';
import SignUpTerms from '../../screens/main/more/signUpTerms.js';
import SignUpTerms2 from '../../screens/main/more/signUpTerms2.js';
import SignUpInformation from '../../screens/main/more/signUpInformation.js';
import SignUpInformation2 from '../../screens/main/more/signUpInformation2.js';
import SignUpInformation3 from '../../screens/main/more/signUpInformation3.js';
import SignUpInformation4 from '../../screens/main/more/signUpInformation4.js';
import IdFind from '../../screens/main/more/idFindScreen.js';
import IdFindComplete from '../../screens/main/more/idFindCompleteScreen.js';
import PasswordFind from '../../screens/main/more/passwordFindScreen.js';
import PasswordFind2 from '../../screens/main/more/passwordFindScreen2.js';
import SignUpComplete from '../../screens/main/more/signUpComplete.js';
import Login from '../../screens/main/more/loginScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import CostChangeScreen from '../../screens/main/more/costChangeScreen.js';
enableScreens();
const Stack = createStackNavigator();
import {View, Text} from 'react-native';
import {Easing, Animated} from 'react-native';
const options = {
  headerBackTitleVisible: false,
  mode: 'modal',
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
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
        name="Banner1"
        component={Banner1}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="Banner2"
        component={Banner2}
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
        options={() => options}
      />
      <Stack.Screen
        name="WorkDetail2"
        component={WorkDetail2}
        initialParams={{}}
        options={() => options}
      />
      <Stack.Screen
        name="StoreDetail"
        component={StoreDetail}
        initialParams={{}}
        options={() => options}
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
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="RecentWork"
        component={RecentWork}
        initialParams={{}}
        options={{}}
      />
      <Stack.Screen
        name="SignUpTerms"
        component={SignUpTerms}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpTerms2"
        component={SignUpTerms2}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpInformation"
        component={SignUpInformation}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpInformation2"
        component={SignUpInformation2}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpInformation3"
        component={SignUpInformation3}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpInformation4"
        component={SignUpInformation4}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpComplete"
        component={SignUpComplete}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IdFind"
        component={IdFind}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IdFindComplete"
        component={IdFindComplete}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordFind"
        component={PasswordFind}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PasswordFind2"
        component={PasswordFind2}
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
        name="Login2"
        component={Login}
        initialParams={{}}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="CostChangeScreen"
        component={CostChangeScreen}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
const fadeConfig = ({current}) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};
export default HomeNavigator;
