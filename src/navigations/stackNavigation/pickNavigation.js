import React from 'react';
import Pick from '../../screens/main/pick/pickScreen.js';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import Title from '../../components/Pick/Tabbar/title.js';
import Left from '../../components/Pick/Tabbar/left.js';
import Right from '../../components/Pick/Tabbar/right.js';
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
          headerStyle: {},
          headerLeft: (props) => <Left left={'none'} leftStyle={{}}></Left>,
          headerTitle: (props) => (
            <Title
              title={'찜한 작업'}
              titleStyle={{
                fontWeight: '700',
                fontSize: 16,
                color: 'black',
              }}></Title>
          ),
          headerTitleAlign: 'center',
          headerRight: (props) => (
            <Right
              right={'편집'}
              rightStyle={{
                fontWeight: '700',
                color: '#946AEF',
                fontSize: 14,
              }}></Right>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default PickNavigator;
