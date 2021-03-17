import React from 'react';
import {View} from 'react-native';

const ForFunction = (props) => {
  if (props) {
    React.useEffect(() => {
      props.get_pickData();
    }, [props.Boo]);
  }
  return <View></View>;
};
export default ForFunction;
