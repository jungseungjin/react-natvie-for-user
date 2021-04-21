import React, {memo} from 'react';
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
import StatusBarHeight from '../../StatusBarHeight';
import ActionCreator from '../../../actions';
import {useSelector, connect} from 'react-redux';
const TabBar = (props) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.leftView}>{leftViewNested(props)}</View>
      <View style={styles.centerView}>{centerViewNested(props)}</View>
      <View style={styles.rightView}>{rightViewNested(props)}</View>
    </View>
  );
};
const leftViewNested = (props) => {
  if (props.left === 'X' || props.left === 'back') {
    return (
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
        onPress={() => {
          if (props.Title == '차량선택_info') {
            props.PageChangeValue('info');
          } else if (props.Title == '로그인info') {
            props.navigation.navigate('More');
          } else {
            props.navigation.goBack();
          }
        }}>
        {props.left === 'X' ? (
          <X fill={'#000000'} style={{marginLeft: Width_convert(22)}}></X>
        ) : (
          <GoBack
            fill={'#000000'}
            style={{marginLeft: Width_convert(22)}}></GoBack>
        )}
      </TouchableOpacity>
    );
  }
  return null;
};
const centerViewNested = (props) => {
  let Title = '';
  if (props.Title.includes('회원가입')) {
    Title = '회원가입';
  } else if (props.Title.includes('아이디 찾기')) {
    Title = '아이디 찾기';
  } else if (props.Title.includes('비밀번호 찾기')) {
    Title = '비밀번호 찾기';
  } else if (props.Title.includes('차량선택')) {
    Title = '차량선택';
  } else if (props.Title.includes('내정보')) {
    Title = '내정보';
  } else if (props.Title.includes('로그인')) {
    Title = '';
  } else if (props.Title.includes('설정')) {
    Title = '설정';
  } else if (props.Title !== '공지사항 및 이벤트 보기') {
    Title = props.Title;
  }
  if (props.Title === props.StoreName) {
    Title = props.Title;
  }
  return <Text style={[styles.text, TitleText(props.Title)]}>{Title}</Text>;
};
const rightViewNested = (props) => {
  const editMode =
    props.Title === '찜한작업' || props.Title === '최근 본 작업'
      ? useSelector((state) => state.editModeCheck.editMode)
      : null;
  if (
    props.Title === '설정' ||
    props.Title === '작업종류' ||
    props.Title === '찜한작업' ||
    props.Title === '최근 본 작업'
  ) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
        onPress={() => {
          if (props.Title === '작업종류') {
            props.nextPage();
          } else if (props.Title === '설정') {
            props.PushReduxData();
          } else if (
            props.Title === '찜한작업' ||
            props.Title === '최근 본 작업'
          ) {
            props.WorkListDelChangeValue([]);
            props.StoreListDelChangeValue([]);
            props.updateEditMode(!editMode);
          }
        }}>
        {props.Title === '찜한작업' || props.Title === '최근 본 작업' ? (
          <Text style={[styles.rightText, editMode && {color: 'red'}]}>
            {editMode ? '취소' : '편집'}
          </Text>
        ) : (
          <Text style={styles.rightText}>완료</Text>
        )}
      </TouchableOpacity>
    );
  } else if (props.Title === '문의내역') {
    return (
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
        onPress={() => {
          props.navigation.navigate('OneOnOneRegister');
        }}>
        <Text style={styles.rightText}>문의작성</Text>
      </TouchableOpacity>
    );
  } else if (props.Title === '문의확인') {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (props.item.status == 0) {
              props.navigation.navigate('OneOnOneRevise', {
                item: props.item,
              });
            }
          }}>
          <Text style={[styles.rightText, {color: '#63BEDB'}]}>
            {props.item.status == 0 ? '수정' : null}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (props.item.status == 0) {
              props.ShowModalChangeValue(true);
            }
          }}>
          <Text style={[styles.rightText, {color: '#FF0000'}]}>
            {props.item.status == 0 ? '삭제' : null}
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else if (props.Title === '내정보') {
    return (
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
        onPress={() => {
          props.saveData();
        }}>
        <Text style={styles.rightText}>저장</Text>
      </TouchableOpacity>
    );
  } else if (props.Title === '차량선택' || props.Title === '차량선택_info') {
    return (
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
        onPress={() => {
          if (props.Title == '차량선택_info') {
            props.AddCarData();
          }
        }}>
        <Text style={styles.rightText}>완료</Text>
      </TouchableOpacity>
    );
  } else if (
    props.Title.includes('회원가입') ||
    props.Title.includes('아이디 찾기1') ||
    props.Title.includes('비밀번호 찾기')
  ) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{top: 10, bottom: 10, left: 20, right: 20}}
        onPress={() => {
          if (props.Title == '회원가입1') {
            if (props.next == true) {
              //true를 ''으로 하면 넘어감
              props.navigation.navigate('SignUpInformation2', {
                phoneNumber: props.phoneNumber,
                agree: props.agree,
                fromNav: props.fromNav || null,
              });
            }
          } else if (props.Title == '회원가입2') {
            if (props.pickModelDetail?.modelDetail) {
              //?.brand 를 빼면 넘어감
              props.navigation.navigate('SignUpInformation3', {
                phoneNumber: props.phoneNumber,
                pickBrand: props.pickBrand,
                pickModel: props.pickModel,
                pickModelDetail: props.pickModelDetail,
                agree: props.agree,
                fromNav: props.fromNav || null,
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
                fromNav: props.fromNav || null,
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
          } else if (props.Title === '아이디 찾기1') {
            if (props.next == true) {
              props.idFindBack();
            }
          } else if (props.Title === '비밀번호 찾기1') {
            if (props.next == true && props.idText) {
              props.idChkBack();
            }
          } else if (props.Title === '비밀번호 찾기2') {
            if (props.passwordChk && props.passwordReChk) {
              props.PasswordChange();
            }
          }
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
                props.pickModelDetail?.modelDetail == undefined
              ? {
                  color: '#CCCCCC',
                }
              : props.Title == '회원가입2' && props.pickModelDetail?.modelDetail
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
    );
  }
  return null;
};
const styles = StyleSheet.create({
  mainView: {
    height: Height_convert(94) - StatusBarHeight,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  leftView: {
    width: '30%',
  },
  centerView: {
    width: '40%',
    alignItems: 'center',
  },
  rightView: {
    alignItems: 'flex-end',
    width: '30%',
  },
  text: {
    color: '#000000',
    textAlign: 'center',
  },
  rightText: {
    marginRight: Width_convert(22),
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(14),
    color: '#946AEF',
  },
});

const TitleText = (Title) => {
  if (Title === '투닝') {
    return {
      fontFamily: Fonts?.Swagger || null,
      fontSize: Font_normalize(24),
    };
  }
  return {
    fontFamily: Fonts?.NanumSqureRegular || null,
    fontSize: Font_normalize(16),
    fontWeight: '700',
  };
};
TabBar.propTypes = {
  Title: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
  return {
    editMode: state.editMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateEditMode: (boo) => {
      dispatch(ActionCreator.editModeCheck(boo));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(TabBar));
