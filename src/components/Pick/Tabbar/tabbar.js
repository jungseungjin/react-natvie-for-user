import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  NativeModules,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import PropTypes from 'prop-types';
import GoBack from '../../../../assets/home/goBack.svg';
import X from '../../../../assets/home/x_black.svg';
import {connect} from 'react-redux';
import ActionCreator from '../../../actions';
import {useSelector} from 'react-redux';
const {StatusBarManager} = NativeModules;
const TabBar = (props) => {
  const reduexState = useSelector((state) => state);
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
      style={[
        {
          height: Height_convert(94) - statusBar,
        },
        props.Title == '찜한작업' ? styles.view2 : null,
      ]}>
      {props.Title == '찜한작업' ? (
        <View>
          <View style={{}}>
            <GoBack
              fill={'#FFFFFF'}
              style={{marginLeft: Width_convert(22)}}></GoBack>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={{}}
          onPress={() => {
            navigation.goBack();
          }}>
          <GoBack style={{marginLeft: Width_convert(22)}}></GoBack>
        </TouchableOpacity>
      )}
      <Text style={props.Title == '찜한작업' ? styles.text2 : null}>
        {props.Title}
      </Text>
      {props.Title == '투닝' ? (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <Text
            style={{
              marginRight: Width_convert(22),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(14),
              color: '#FFFFFF',
            }}>
            완료
          </Text>
        </View>
      ) : props.Title == '찜한작업' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.updateEditMode(!reduexState.editModeCheck.editMode);
          }}>
          <Text
            style={
              reduexState.editModeCheck.editMode
                ? {
                    marginRight: Width_convert(22),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(14),
                    color: 'red',
                  }
                : {
                    marginRight: Width_convert(22),
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(14),
                    color: '#946AEF',
                  }
            }>
            {reduexState.editModeCheck.editMode ? '취소' : '편집'}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts?.Swagger || null,
    fontSize: Font_normalize(24),
    color: 'black',
    textAlign: 'center',
  },
  text2: {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(16),
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
});

TabBar.propTypes = {
  Title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    editMode: state.editMode,
    //  first: state.calculator.sumInfo.first,
    //  second: state.calculator.sumInfo.second
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEditMode: (boo) => {
      dispatch(ActionCreator.editModeCheck(boo));
    },
    // updateFirst:(num) => {
    //     dispatch(ActionCreator.updateSumValueFirst(num));

    // },
    // updateSecond:(num) => {
    //     dispatch(ActionCreator.updateSumValueSecond(num));
    // }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TabBar);
