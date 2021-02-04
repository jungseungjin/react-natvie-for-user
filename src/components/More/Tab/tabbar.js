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
        props.Title == '투닝'
          ? styles.view
          : props.Title == '설정' || props.Title == '작업종류'
          ? styles.view2
          : styles.view2,
      ]}>
      {/*왼쪽덩어리 시작 */}
      {props.Title == '투닝' ? null : props.Title == '설정' ||
        props.Title == '작업종류' ||
        props.Title == '1:1문의' ||
        props.Title == '피드백주기' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            props.navigation.goBack();
          }}>
          {props.Title == '설정' ? (
            <GoBack
              fill={'#000000'}
              style={{marginLeft: Width_convert(22)}}></GoBack>
          ) : (
            <X fill={'#000000'} style={{marginLeft: Width_convert(22)}}></X>
          )}
        </TouchableOpacity>
      ) : props.Title == '최근 본 작업' ||
        props.Title == '공지사항 및 이벤트' ||
        props.Title == '공지사항 및 이벤트 보기' ||
        props.Title == '고객센터' ||
        props.Title == '자주 묻는 질문' ||
        props.Title == '문의내역' ||
        props.Title == '문의확인' ||
        props.Title == '투닝 입점문의' ||
        props.Title == '내정보' ? (
        <TouchableOpacity
          activeOpacity={1}
          style={{}}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <GoBack
            fill={'#000000'}
            style={{marginLeft: Width_convert(22)}}></GoBack>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={{}}
          onPress={() => {
            return false;
            //props.navigation.goBack();
          }}>
          <GoBack
            fill={'#FFFFFF'}
            style={{marginLeft: Width_convert(22)}}></GoBack>
        </TouchableOpacity>
      )}
      {/*왼쪽덩어리 끝 */}
      {/*가운데덩어리 시작 */}
      <View>
        <Text
          style={[
            (props.Title == '문의내역'
              ? {marginRight: -Width_convert(50)}
              : null,
            props.Title == '투닝'
              ? styles.text
              : props.Title == '설정' || props.Title == '작업종류'
              ? styles.text2
              : styles.text2),
          ]}>
          {props.Title != '공지사항 및 이벤트 보기' ? props.Title : null}
        </Text>
      </View>
      {/*가운데덩어리 끝 */}
      {/*오른쪽덩어리 시작 */}
      {props.Title == '투닝' ? null : props.Title == '최근 본 작업' ? (
        <View style={{backgroundColor: '#FFFFFF'}}>
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
        </View>
      ) : props.Title == '문의내역' ? (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              //props.navigation.navigate()
            }}>
            <Text
              style={{
                marginRight: Width_convert(22),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(14),
                color: '#946AEF',
              }}>
              문의
            </Text>
          </TouchableOpacity>
        </View>
      ) : props.Title == '내정보' ? (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              //props.navigation.navigate()
            }}>
            <Text
              style={{
                marginRight: Width_convert(22),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(14),
                color: '#946AEF',
              }}>
              저장
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
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
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
