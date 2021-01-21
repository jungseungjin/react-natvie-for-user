import React from 'react';
import {Platform, PixelRatio} from 'react-native';
import Pick from '../../screens/main/pick/pickScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import Title from '../../components/Pick/Tabbar/title.js';
import Left from '../../components/Pick/Tabbar/left.js';
import Right from '../../components/Pick/Tabbar/right.js';
import {Fonts} from '../../components/Fonts.js';
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
const PickNavigator = (props) => {
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
        name="Pick"
        component={Pick}
        initialParams={{}}
        options={({navigation, route}) => ({
          headerStyle: {
            //안드로이드는 헤더에 스테이터스바 포함안됨 아이폰은 포함됨
            height: Height_convert(94) - convertStatusBar,
            borderBottomColor: '#000000',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: (props) => <Left left={'none'} leftStyle={{}}></Left>,
          headerTitle: (props) => (
            <Title
              title={'찜한 작업'}
              titleStyle={{
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '700',
                fontSize: Font_normalize(16),
                color: 'black',
              }}></Title>
          ),
          headerTitleAlign: 'center',
          headerRight: (props) => (
            <Right
              right={'편집'}
              rightStyle={{
                fontFamily: Fonts.NanumSqureRegular,
                fontWeight: '700',
                color: '#946AEF',
                fontSize: Font_normalize(14),
                marginRight: Width_convert(22),
              }}></Right>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default PickNavigator;
