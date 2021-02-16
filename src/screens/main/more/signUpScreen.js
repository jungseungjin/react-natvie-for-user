import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Tabbar from '../../../components/More/Tab/tabbar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import CheckBox from '../../../../assets/home/check_box.svg';
import ButtonOneModal from '../../../components/Modal/ButtonOneModal.js';

const SignUp = (props) => {
  const [allAgree, setAllAgree] = React.useState(false);
  const [agree1, setAgree1] = React.useState(false); //이용약관 동의
  const [agree2, setAgree2] = React.useState(false); //만 14세 이상 확인
  const [agree2Modal, setAgree2Modal] = React.useState(false); //만 14세 이상 확인 모달
  const Agree2ModalChangeValue = (text) => {
    setAgree2Modal(text);
  }; //만 14세 이상 확인 모달
  const [agree3, setAgree3] = React.useState(false); //개인정보 수집이용 동의
  const [agree4, setAgree4] = React.useState(false); //위치기반 서비스 이용약관
  const [agree5, setAgree5] = React.useState(false); //개인정보 제3자 제공 동의
  const [agree6, setAgree6] = React.useState(false); //투닝 혜택 알림 동의
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <Tabbar Title={'회원가입'} navigation={props.navigation}></Tabbar>
      <View
        style={{
          borderTopColor: 'rgba(219, 219, 219, 0.35);',
          borderTopWidth: 1,
        }}></View>
      <View
        style={{
          marginTop: Height_convert(57),
          marginLeft: Width_convert(53),
          marginRight: Width_convert(53),
          width: Width_convert(375 - 106),
        }}>
        <Text
          style={{
            fontFamily: Fonts?.NanumGothicRegular || null,
            fontSize: Font_normalize(18),
            fontWeight: '700',
            color: '#000000',
          }}>
          모두가 즐길 수 있는 투명한 튜닝 문화를 만들어 나갈 수 있도록
          노력하겠습니다.
        </Text>
      </View>
      {/**전체 동의 ~ 투닝혜택알림동의*/}
      <View
        style={{
          marginTop: Height_convert(48),
          marginRight: Width_convert(30),
          marginLeft: Width_convert(30),
          width: Width_convert(315),
          height: Height_convert(250),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setAllAgree(!allAgree);
            setAgree1(!allAgree);
            setAgree2(!allAgree);
            setAgree3(!allAgree);
            setAgree4(!allAgree);
            setAgree5(!allAgree);
            setAgree6(!allAgree);
          }}
          style={{
            width: Width_convert(315),
            height: Width_convert(45),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: Font_normalize(5),
            backgroundColor: 'rgba(196, 196, 196, 0.3)',
          }}>
          <Text
            style={{
              marginLeft: Width_convert(16),
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(15),
              color: '#000000',
            }}>
            전체동의
          </Text>
          {allAgree ? (
            <CheckedBox
              width={Width_convert(19)}
              height={Width_convert(19)}
              style={{
                marginRight: Width_convert(16),
              }}></CheckedBox>
          ) : (
            <CheckBox
              width={Width_convert(19)}
              height={Width_convert(19)}
              style={{
                marginRight: Width_convert(16),
              }}></CheckBox>
          )}
        </TouchableOpacity>
        {/*이용약관 동의 */}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(26),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('SignUpTerms', {agreeNumber: 1});
            }}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              투닝 이용약관 동의
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (agree1 == true) {
                //false로 변경
                if (allAgree == true) {
                  setAllAgree(false);
                }
              }
              setAgree1(!agree1);
            }}
            style={{
              marginRight: Width_convert(16),
            }}>
            {agree1 ? (
              <CheckedBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckedBox>
            ) : (
              <CheckBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckBox>
            )}
          </TouchableOpacity>
        </View>

        {/*이용약관 동의 */}
        {/*만 14세 이상 확인 */}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setAgree2Modal(true);
            }}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              만 14세 이상 확인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (agree2 == true) {
                //false로 변경
                if (allAgree == true) {
                  setAllAgree(false);
                }
              }
              setAgree2(!agree2);
            }}
            style={{
              marginRight: Width_convert(16),
            }}>
            {agree2 ? (
              <CheckedBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckedBox>
            ) : (
              <CheckBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckBox>
            )}
          </TouchableOpacity>
        </View>

        {/*만 14세 이상 확인 */}

        {/*개인정보 수집이용 동의*/}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('SignUpTerms', {agreeNumber: 3});
            }}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              개인정보 수집이용 동의
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (agree3 == true) {
                //false로 변경
                if (allAgree == true) {
                  setAllAgree(false);
                }
              }
              setAgree3(!agree3);
            }}
            style={{
              marginRight: Width_convert(16),
            }}>
            {agree3 ? (
              <CheckedBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckedBox>
            ) : (
              <CheckBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckBox>
            )}
          </TouchableOpacity>
        </View>

        {/*개인정보 수집이용 동의*/}
        {/*위치기반 서비스 이용약관(선택)*/}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('SignUpTerms', {agreeNumber: 4});
            }}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              위치기반 서비스 이용약관(선택)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (agree4 == true) {
                //false로 변경
                if (allAgree == true) {
                  setAllAgree(false);
                }
              }
              setAgree4(!agree4);
            }}
            style={{
              marginRight: Width_convert(16),
            }}>
            {agree4 ? (
              <CheckedBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckedBox>
            ) : (
              <CheckBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckBox>
            )}
          </TouchableOpacity>
        </View>

        {/*위치기반 서비스 이용약관(선택)*/}
        {/*개인정보 제3자 제공 동의(선택)*/}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              props.navigation.navigate('SignUpTerms', {agreeNumber: 5});
            }}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
                textDecorationLine: 'underline',
              }}>
              개인정보 제3자 제공 동의(선택)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (agree5 == true) {
                //false로 변경
                if (allAgree == true) {
                  setAllAgree(false);
                }
              }
              setAgree5(!agree5);
            }}
            style={{
              marginRight: Width_convert(16),
            }}>
            {agree5 ? (
              <CheckedBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckedBox>
            ) : (
              <CheckBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckBox>
            )}
          </TouchableOpacity>
        </View>

        {/*개인정보 제3자 제공 동의(선택)*/}
        {/*투닝 혜택 알림 동의(선택)*/}
        <View
          style={{
            width: Width_convert(315),
            height: Width_convert(20),
            marginTop: Height_convert(13),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <Text
              style={{
                marginLeft: Width_convert(16),
                fontFamily: Fonts?.NanumSqureRegular || null,
                fontSize: Font_normalize(13),
                fontWeight: '400',
                color: '#000000',
              }}>
              투닝 혜택 알림 동의(선택)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              if (agree6 == true) {
                //false로 변경
                if (allAgree == true) {
                  setAllAgree(false);
                }
              }
              setAgree6(!agree6);
            }}
            style={{
              marginRight: Width_convert(16),
            }}>
            {agree6 ? (
              <CheckedBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckedBox>
            ) : (
              <CheckBox
                width={Width_convert(19)}
                height={Width_convert(19)}
                style={{}}></CheckBox>
            )}
          </TouchableOpacity>
        </View>

        {/*투닝 혜택 알림 동의(선택)*/}
      </View>
      {/**전체 동의 ~ 투닝혜택알림동의 */}

      <View
        style={{
          marginTop: Height_convert(160),
          marginRight: Width_convert(19),
          marginLeft: Width_convert(19),
          width: Width_convert(337),
          height: Width_convert(45),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (agree1 && agree2 && agree3) {
              props.navigation.navigate('SignUpInformation', {
                allAgree: allAgree,
                agree1: agree1,
                agree2: agree2,
                agree3: agree3,
                agree4: agree4,
                agree5: agree5,
                agree6: agree6,
              });
            }
          }}
          style={[
            {
              width: Width_convert(337),
              height: Width_convert(45),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Font_normalize(5),
            },
            agree1 && agree2 && agree3
              ? {backgroundColor: '#946AEF'}
              : {
                  backgroundColor: 'rgba(196, 196, 196, 0.3)',
                },
          ]}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(15),
              color: '#FFFFFF',
            }}>
            다음단계
          </Text>
        </TouchableOpacity>
      </View>
      {agree2Modal ? (
        <ButtonOneModal
          ShowModalChangeValue={Agree2ModalChangeValue}
          navigation={props.navigation}
          Title={
            '정보통신망 이용촉진 및 정보보호 등에 관한 법률에는 만 14세미만 아동의 개인정보  수집시 법정대리인 동의를 받도록 규정하고 있으며, 만 14세 미만 아동이 법정대리인 동의없이 회원가입을 하는 경우 회원탈퇴 또는 서비스 이용이 제한 될 수 있습니다.'
          }
          //BottomText={''}
          CenterButtonText={'닫기'}></ButtonOneModal>
      ) : null}
    </SafeAreaView>
  );
};

export default SignUp;
