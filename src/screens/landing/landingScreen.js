import {ThemeProvider} from '@react-navigation/native';
import React from 'react';
import {Button, Text} from 'react-native';
import {connect} from 'react-redux';
import ActionCreator from '../../actions';
const landingScreen = (props) => {
  return (
    <>
      <Button
        title="Go to Home"
        onPress={() => {
          props.updateLanding(true);
        }}
      />
      <Text>{props.landingCheck.toString()}</Text>
      <Button
        title="Go to next"
        onPress={() => props.navigation.navigate('Landing2', {})}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    landingCheck: state.landingCheck.landingCheck,
    //  first: state.calculator.sumInfo.first,
    //  second: state.calculator.sumInfo.second
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLanding: (boo) => {
      dispatch(ActionCreator.updateLandingCheck(boo));
    },
    // updateFirst:(num) => {
    //     dispatch(ActionCreator.updateSumValueFirst(num));

    // },
    // updateSecond:(num) => {
    //     dispatch(ActionCreator.updateSumValueSecond(num));
    // }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(landingScreen);
