import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  Button,
} from 'react-native';
const HomeScreen = ({navigation, route}) => {
  return (
    <>
      <Button
        title="Go to Jane's profile"
        onPress={() => {
          route.params.naviChange();
        }}
      />
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Detail')}
      />
    </>
  );
};
export default HomeScreen;
