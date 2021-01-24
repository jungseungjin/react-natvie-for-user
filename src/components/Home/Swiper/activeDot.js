import React from 'react';
import {View, StyleSheet} from 'react-native';

const ActiveDot = () => {
  return <View style={styles.view} />;
};
const styles = StyleSheet.create({
  view: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: -13,
  },
});
export default ActiveDot;
