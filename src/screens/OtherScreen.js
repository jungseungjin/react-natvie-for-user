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
const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's Other"
      onPress={() => navigation.navigate('Diff', {name: 'Jane'})}
    />
  );
};
export default HomeScreen;
