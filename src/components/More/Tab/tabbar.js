import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
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
import StatusBarHeight from '../../StatusBarHeight';

const TabBar = (props) => {
  const reduexState = useSelector((state) => state);
  return (
    <View
      style={[
        {
          height: Height_convert(94) - StatusBarHeight,
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
        props.Title == '피드백주기' ||
        props.Title == '차량선택' ||
        props.Title == '차량선택_info' ||
        props.Title == '회원가입' ||
        props.Title == '아이디 찾기2' ||
        props.Title == '비밀번호 찾기1' ||
        props.Title == '비밀번호 찾기2' ||
        props.Title == '투닝 이용약관' ||
        props.Title == '개인정보 수집 및 이용' ||
        props.Title == '위치기반 서비스 이용약관' ||
        props.Title == '개인정보 제3자 제공 동의' ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (props.Title == '차량선택_info') {
              props.PageChangeValue('info');
            } else {
              props.navigation.goBack();
            }
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
        props.Title == '내정보' ||
        props.Title == '회원탈퇴' ||
        props.Title == '회원가입1' ||
        props.Title == '회원가입2' ||
        props.Title == '회원가입3' ||
        props.Title == '회원가입4' ||
        props.Title == '회원가입5' ||
        props.Title == '아이디 찾기1' ||
        props.Title == '로그인' ? (
        <TouchableOpacity
          activeOpacity={1}
          style={{backgroundColor: '#FFFFFF'}}
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
          style={{backgroundColor: '#FFFFFF'}}
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
          {props.Title.indexOf('회원가입') != -1
            ? '회원가입'
            : props.Title.indexOf('아이디 찾기') != -1
            ? '아이디 찾기'
            : props.Title.indexOf('비밀번호 찾기') != -1
            ? '비밀번호 찾기'
            : props.Title.indexOf('차량선택') != -1
            ? '차량선택'
            : props.Title == '로그인'
            ? null
            : props.Title != '공지사항 및 이벤트 보기'
            ? props.Title
            : null}
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
              props.saveData();
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
      ) : props.Title == '차량선택' || props.Title == '차량선택_info' ? (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              //props.navigation.navigate()
              if (props.Title == '차량선택_info') {
                props.AddCarData();
              }
            }}>
            <Text
              style={{
                marginRight: Width_convert(22),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontWeight: '700',
                fontSize: Font_normalize(14),
                color: '#946AEF',
              }}>
              완료
            </Text>
          </TouchableOpacity>
        </View>
      ) : props.Title.indexOf('회원가입') != -1 ||
        props.Title.indexOf('아이디 찾기1') != -1 ||
        props.Title.indexOf('비밀번호 찾기') != -1 ? (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (props.Title == '회원가입1') {
                if (props.next == true) {
                  //true를 ''으로 하면 넘어감
                  props.navigation.navigate('SignUpInformation2', {
                    phoneNumber: props.phoneNumber,
                    agree: props.agree,
                  });
                }
              } else if (props.Title == '회원가입2') {
                if (props.pickModelDetail?.brand) {
                  //?.brand 를 빼면 넘어감
                  props.navigation.navigate('SignUpInformation3', {
                    phoneNumber: props.phoneNumber,
                    pickBrand: props.pickBrand,
                    pickModel: props.pickModel,
                    pickModelDetail: props.pickModelDetail,
                    agree: props.agree,
                  });
                }
              } else if (props.Title == '회원가입3') {
                if (props.emailChk) {
                  props.navigation.navigate('SignUpInformation4', {
                    phoneNumber: props.phoneNumber,
                    pickBrand: props.pickBrand,
                    pickModel: props.pickModel,
                    pickModelDetail: props.pickModelDetail,
                    name: props.name,
                    email: props.email,
                    agree: props.agree,
                  });
                }
              } else if (props.Title == '회원가입4') {
                if (
                  props.nickNameChk &&
                  props.nickNameChk2 &&
                  props.passwordChk &&
                  props.phoneNumber &&
                  props.pickBrand &&
                  props.pickModel &&
                  props.pickModelDetail &&
                  props.name &&
                  props.email &&
                  props.nickName &&
                  props.birthDay &&
                  props.locationView &&
                  props.location
                ) {
                  props.SignUpBack();
                }
              } else if (props.Title == '아이디 찾기1') {
                if (props.next == true) {
                  props.idFindBack();
                }
              } else if (props.Title == '비밀번호 찾기1') {
                if (props.next == true && props.idText) {
                  props.IdchkBack();
                }
              } else if (props.Title == '비밀번호 찾기2') {
                if (props.passwordChk && props.passwordReChk) {
                  props.PasswordChange();
                }
              }
              //props.navigation.navigate()
            }}>
            <Text
              style={[
                {
                  marginRight: Width_convert(22),
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(14),
                },
                props.Title == '회원가입'
                  ? {
                      color: '#FFFFFF',
                    }
                  : props.Title == '회원가입1' && props.next === ''
                  ? {
                      color: '#FFFFFF',
                    }
                  : props.Title == '회원가입1' && props.next === false
                  ? {
                      color: '#CCCCCC',
                    }
                  : props.Title == '회원가입1' && props.next === true
                  ? {
                      color: '#946AEF',
                    }
                  : props.Title == '회원가입2' &&
                    props.pickModelDetail?.brand == undefined
                  ? {
                      color: '#CCCCCC',
                    }
                  : props.Title == '회원가입2' && props.pickModelDetail?.brand
                  ? {
                      color: '#946AEF',
                    }
                  : props.Title == '회원가입3' && props.emailChk == false
                  ? {
                      color: '#CCCCCC',
                    }
                  : props.Title == '회원가입3' && props.emailChk
                  ? {
                      color: '#946AEF',
                    }
                  : props.Title == '회원가입4' &&
                    props.nickNameChk &&
                    props.nickNameChk2 &&
                    props.passwordChk &&
                    props.phoneNumber &&
                    props.pickBrand &&
                    props.pickModel &&
                    props.pickModelDetail &&
                    props.name &&
                    props.email &&
                    props.nickName &&
                    props.birthDay &&
                    props.locationView &&
                    props.location
                  ? {
                      color: '#946AEF',
                    }
                  : props.Title == '회원가입4'
                  ? {
                      color: '#CCCCCC',
                    }
                  : props.Title == '아이디 찾기1' && props.next === ''
                  ? {
                      color: '#FFFFFF',
                    }
                  : props.Title == '아이디 찾기1' && props.next === false
                  ? {
                      color: '#CCCCCC',
                    }
                  : props.Title == '아이디 찾기1' && props.next === true
                  ? {
                      color: '#946AEF',
                    }
                  : props.Title == '비밀번호 찾기1' && props.next === ''
                  ? {
                      color: '#FFFFFF',
                    }
                  : props.Title == '비밀번호 찾기1' && props.next === false
                  ? {
                      color: '#CCCCCC',
                    }
                  : props.Title == '비밀번호 찾기1' && props.next === true
                  ? {
                      color: '#946AEF',
                    }
                  : props.Title == '비밀번호 찾기2' &&
                    props.passwordChk === true &&
                    props.passwordReChk === true
                  ? {
                      color: '#946AEF',
                    }
                  : props.Title == '비밀번호 찾기2'
                  ? {
                      color: '#CCCCCC',
                    }
                  : {
                      color: '#946AEF',
                    },
              ]}>
              {props.Title == '회원가입4' || props.Title == '비밀번호 찾기2'
                ? '완료'
                : '다음'}
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
