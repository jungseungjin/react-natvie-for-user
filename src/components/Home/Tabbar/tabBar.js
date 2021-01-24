import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  NativeModules,
  StatusBar,
} from 'react-native';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import PropTypes from 'prop-types';
const {StatusBarManager} = NativeModules;
const TabBar = ({Title}) => {
  const [statusBar, setStatusBar] = React.useState(0);
  const getValue = () => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => {
        setStatusBar(response.height);
      });
    } else {
      setStatusBar(StatusBar.currentHeight);
    }
  };
  React.useEffect(() => {
    getValue();
  }, []);
  return (
    <View
      style={{
        height: Height_convert(94) - statusBar,
        justifyContent: 'center',
      }}>
      <Text style={styles.text}>{Title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts?.Swagger || null,
    fontSize: Font_normalize(24),
    color: 'black',
    textAlign: 'center',
  },
});

TabBar.propTypes = {
  Title: PropTypes.string.isRequired,
};
export default TabBar;
