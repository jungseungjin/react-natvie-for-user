import React from 'react';
//import {Button, LogoTitle} from 'react-native';
import More from '../../screens/main/more/moreScreen.js';
import Info from '../../screens/main/more/infoScreen.js';
import InfoCar from '../../screens/main/more/infoCarScreen.js';
import SignUp from '../../screens/main/more/signUpScreen.js';
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
import Setting_more from '../../screens/main/more/settingScreen.js';
import NoticeBoard from '../../screens/main/more/noticeBoardScreen.js';
import NoticeBoardView from '../../screens/main/more/notiveBoardViewScreen.js';
import Entry from '../../screens/main/more/entryQuestionScreen.js';
import Customer from '../../screens/main/more/customerServiceScreen.js';
import RecentWork from '../../screens/main/more/recentWorkScreen.js';
import ReviewManage from '../../screens/main/more/reviewManageScreen.js';
import ReviewRevise from '../../screens/main/more/reviewReviseScreen.js';
import FrequentlyQuestion from '../../screens/main/more/frequentlyQuestionScreen.js';
import OneOnOne from '../../screens/main/more/oneOnOneScreen.js';
import OneOnOneView from '../../screens/main/more/oneOnOneViewScreen.js';
import OneOnOneRegister from '../../screens/main/more/oneOnOneRegisterScreen.js';
import OneOnOneRevise from '../../screens/main/more/oneOnOneReviseScreen.js';
import Feedback from '../../screens/main/more/feedbackScreen.js';
import Withdrawal from '../../screens/main/more/withdrawalScreen.js';
import Map_more from '../../screens/main/home/mapScreen.js';
import MapSearch_more from '../../screens/main/home/mapSearchScreen.js';
import PickScreen from '../../screens/main/pick/pickScreen.js';
import ReviewView from '../../screens/main/home/reviewViewScreen.js';
import ReviewRegister from '../../screens/main/home/reviewRegisterScreen.js';

import WorkDetail from '../../screens/main/home/workDetailScreen.js';
import StoreLocation from '../../screens/main/home/storeLocationScreen.js';
import StoreDetail from '../../screens/main/home/storeDetailScreen.js';
import StoreWorkList from '../../screens/main/home/storeWorkListScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import CostChangeScreen from '../../screens/main/more/costChangeScreen.js';

enableScreens();
const Stack = createStackNavigator();

const MoreNavigator = (props) => {
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
      {props.route.name == 'More' ? (
        <>
          <Stack.Screen
            name="More"
            component={More}
            initialParams={{}}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PickScreen"
            component={PickScreen}
            initialParams={{editMode: false}}
            options={({navigation, route}) => ({
              headerShown: false,
            })}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="PickScreen"
            component={PickScreen}
            initialParams={{editMode: false}}
            options={({navigation, route}) => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="More"
            component={More}
            initialParams={{}}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
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
        name="Setting_more"
        component={Setting_more}
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
      <Stack.Screen
        name="FrequentlyQuestion"
        component={FrequentlyQuestion}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OneOnOne"
        component={OneOnOne}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OneOnOneView"
        component={OneOnOneView}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OneOnOneRegister"
        component={OneOnOneRegister}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OneOnOneRevise"
        component={OneOnOneRevise}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Withdrawal"
        component={Withdrawal}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InfoCar"
        component={InfoCar}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Map_more"
        component={Map_more}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapSearch_more"
        component={MapSearch_more}
        initialParams={{}}
        options={{
          headerShown: false,
        }}
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
        name="CostChangeScreen"
        component={CostChangeScreen}
        initialParams={{}}
        options={{}}
      />
    </Stack.Navigator>
  );
};

export default MoreNavigator;
