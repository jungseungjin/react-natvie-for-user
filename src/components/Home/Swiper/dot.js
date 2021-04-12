import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const Dot = () => {
  return <View style={styles.view} />;
};
const styles = StyleSheet.create({
  view: {
    backgroundColor: 'rgba(198,198,198,.7)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: -13,
  },
});
export default memo(Dot);
