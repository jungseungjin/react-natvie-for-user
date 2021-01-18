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
      title="Go to Jane's Diff"
      onPress={() => navigation.navigate('Other', {name: 'Jane'})}
    />
  );
};
export default HomeScreen;
