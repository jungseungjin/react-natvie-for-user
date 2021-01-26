import React, {useRef} from 'react';
import IsLoading from '../../../components/ActivityIndicator';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Width_convert.js';
import Font_normalize from '../../../components/Font_normalize.js';
import Fonts from '../../../components/Fonts.js';
import PropTypes from 'prop-types';
import Search from '../../../../assets/home/search.svg';
import GoBack from '../../../../assets/home/goBack.svg';
import X_grayRound from '../../../../assets/home/x_grayRound.svg';
import Filter from '../../../../assets/home/filter.svg';
import BlankBox from '../../../../assets/home/blank_box.svg';
import DisabledBox from '../../../../assets/home/disabled_box.svg';
import CheckedBox from '../../../../assets/home/checked_box.svg';
import QuestionRound from '../../../../assets/home/question_round.svg';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  ToastAndroid,
  BackHandler,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  NativeModules,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import Star from '../../../../assets/home/star.svg';
import SearchStore from '../../../components/Home/Search/searchStore.js';
const {StatusBarManager} = NativeModules;
const SearchScreenDetail = ({navigation, route}) => {
  //기본으로 데이터받아오는 검색부터 진행해야됨.
  //데이터 받아와야하니까 로딩걸린다잉

  const [resentSearch, setResentSearch] = React.useState(
    route?.params?.resentSearch || null,
  );
  const addData = async (searchValue) => {
    try {
      if (resentSearch.indexOf(searchValue) != -1) {
      } else {
        const list = [...resentSearch, searchValue];
        setResentSearch(list);
        console.log(list);
        await AsyncStorage.setItem('resentSearch', JSON.stringify(list));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const textInputRef = useRef();
  const handleClick = () => {
    textInputRef.current.focus();
  };
  const [statusBar, setStatusBar] = React.useState(0);
  const [statusBarSafeAreaView, setStatusBarSafeAreaView] = React.useState(0);
  const getValue = () => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight((response) => {
        setStatusBar(response.height);
      });
    } else {
      setStatusBar(StatusBar.currentHeight);
      setStatusBarSafeAreaView(StatusBar.currentHeight);
    }
  };
  React.useEffect(() => {
    getValue();
  }, []);
  const [searchText, setSearchText] = React.useState(
    route?.params?.searchText || null,
  );

  React.useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          height: Height_convert(88) - statusBar,
          width: Width_convert(375),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomColor: 'rgba(219,219,219,0.35)',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            marginLeft: Width_convert(22),
            marginRight: Width_convert(15),
            width: Width_convert(14),
            height: Height_convert(16),
          }}>
          <GoBack></GoBack>
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          autoCapitalize={'none'}
          autoCompleteType={'off'}
          autoCorrect={false}
          keyboardType="default"
          onChangeText={(text) => {
            setSearchText(text);
          }}
          defaultValue={searchText}
          returnKeyType={'search'}
          onSubmitEditing={() => {
            if (searchText.trim()) {
              //검색함수 ㄲ
            }
          }}
          style={{
            width: Width_convert(249),
            fontSize: Font_normalize(16),
            fontFamily: Fonts?.NanumSqureRegular || null,
            fontWeight: '400',
            paddingTop: 0,
            paddingBottom: 0,
          }}
          placeholderTextColor="#A1A1A1"
          placeholder={'튜닝부품 or 작업, 튜닝샵 검색'}
          //onKeyPress={this.handleKeyDown}
          // /handleKeyDown: function(e) {
          //   if(e.nativeEvent.key == "Enter"){
          //     dismissKeyboard();
          // }
        ></TextInput>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setSearchText('');
            handleClick();
          }}
          style={{
            marginRight: Width_convert(15),
            width: Width_convert(16),
            height: Height_convert(16),
          }}>
          <X_grayRound></X_grayRound>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            marginRight: Width_convert(22),
            width: Width_convert(20),
            height: Height_convert(20),
          }}
          onPress={() => {
            if (searchText.trim()) {
              //검색함수 ㄲ
              addData(searchText);
            }
          }}>
          <Search></Search>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: Width_convert(375),
          height: Height_convert(51),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: Width_convert(60),
            height: Height_convert(22),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: Width_convert(22),
            backgroundColor: '#946AEF',
            borderRadius: Font_normalize(3),
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '800',
              fontSize: Font_normalize(10),
              color: '#FFFFFF',
            }}>
            튜닝작업(4)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: Width_convert(41),
            height: Height_convert(22),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: Width_convert(16),
            //backgroundColor: '#946AEF',
            //borderRadius: Font_normalize(3),
          }}>
          <Text
            style={{
              fontFamily: Fonts?.NanumSqureRegular || null,
              fontWeight: '700',
              fontSize: Font_normalize(10),
              color: '#000000',
            }}>
            튜냥샵(3)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            marginLeft: 'auto',
            marginRight: Width_convert(19),
            borderRadius: Font_normalize(3),
            backgroundColor: '#F8F2FD', //필터 누르면 추가
            paddingBottom: Height_convert(5),
            paddingTop: Height_convert(5),
            paddingLeft: Width_convert(5),
            paddingRight: Width_convert(5),
          }}>
          <Filter></Filter>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: Width_convert(375),
          height: Height_convert(818),
          top: Height_convert(139) - statusBarSafeAreaView,
          position: 'absolute',
          zIndex: 1,
        }}>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(162),
            backgroundColor: '#FFFFFF',
          }}>
          <View
            style={{
              width: Width_convert(360),
              height: Height_convert(13),
              marginLeft: Width_convert(15),
              marginTop: Height_convert(11),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumGothicRegular || null,
                  fontSize: Font_normalize(10),
                  color: '#000000',
                  fontWeight: '400',
                }}>
                가까운 순{' '}
              </Text>
              <QuestionRound></QuestionRound>
            </View>
            <TouchableOpacity activeOpacity={1}>
              <BlankBox style={{marginRight: Width_convert(15)}}></BlankBox>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Width_convert(360),
              height: Height_convert(13),
              marginLeft: Width_convert(15),
              marginTop: Height_convert(19),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumGothicRegular || null,
                  fontSize: Font_normalize(10),
                  color: '#000000',
                  fontWeight: '400',
                }}>
                가까운 순{' '}
              </Text>
              <QuestionRound></QuestionRound>
            </View>
            <TouchableOpacity activeOpacity={1}>
              <BlankBox style={{marginRight: Width_convert(15)}}></BlankBox>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: Width_convert(360),
              height: Height_convert(13),
              marginLeft: Width_convert(15),
              marginTop: Height_convert(19),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumGothicRegular || null,
                  fontSize: Font_normalize(10),
                  color: '#000000',
                  fontWeight: '400',
                }}>
                가까운 순{' '}
              </Text>
              <QuestionRound></QuestionRound>
            </View>
            <TouchableOpacity activeOpacity={1}>
              <BlankBox style={{marginRight: Width_convert(15)}}></BlankBox>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Width_convert(360),
              height: Height_convert(13),
              marginLeft: Width_convert(15),
              marginTop: Height_convert(19),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumGothicRegular || null,
                  fontSize: Font_normalize(10),
                  color: '#000000',
                  fontWeight: '400',
                }}>
                가까운 순{' '}
              </Text>
              <QuestionRound></QuestionRound>
            </View>
            <TouchableOpacity activeOpacity={1}>
              <BlankBox style={{marginRight: Width_convert(15)}}></BlankBox>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: Width_convert(360),
              height: Height_convert(13),
              marginLeft: Width_convert(15),
              marginTop: Height_convert(19),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumGothicRegular || null,
                  fontSize: Font_normalize(10),
                  color: '#000000',
                  fontWeight: '400',
                }}>
                가까운 순{' '}
              </Text>
              <QuestionRound></QuestionRound>
            </View>
            <TouchableOpacity activeOpacity={1}>
              <BlankBox style={{marginRight: Width_convert(15)}}></BlankBox>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(656),
            backgroundColor: 'rgba(32, 32, 32, 30%)',
          }}></View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchStore></SearchStore>
        <View
          style={{
            width: Width_convert(375),
            height: Width_convert(423),
          }}>
          <FastImage
            style={{width: Width_convert(375), height: Width_convert(240)}}
            source={{
              uri: 'https://unsplash.it/400/400?image=1',
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.stretch}></FastImage>
          <View
            style={{
              width: Width_convert(362),
              height: Height_convert(16),
              marginTop: Height_convert(18),
              marginLeft: Width_convert(13),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderRadius: Font_normalize(2),
                backgroundColor: '#FFA740',
                marginRight: Width_convert(5),
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  paddingTop: Width_convert(3),
                  paddingBottom: Width_convert(3),
                  paddingLeft: Width_convert(4),
                  paddingRight: Width_convert(4),
                  fontSize: Font_normalize(9),
                  fontWeight: '700',
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  color: '#ffffff',
                }}>
                인기추천
              </Text>
            </View>
            <View
              style={{
                borderRadius: Font_normalize(2),
                backgroundColor: '#1A74FC',
                marginRight: Width_convert(5),
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  paddingTop: Width_convert(3),
                  paddingBottom: Width_convert(3),
                  paddingLeft: Width_convert(4),
                  paddingRight: Width_convert(4),
                  fontSize: Font_normalize(9),
                  fontWeight: '700',
                  fontFamily: Fonts?.NanumSqureRegular,
                  color: '#ffffff',
                }}>
                우리가게 공임표 공개
              </Text>
            </View>
          </View>
          <View
            style={{
              width: Width_convert(350),
              height: Height_convert(125),
              marginLeft: Width_convert(13),
              marginTop: Height_convert(15),
            }}>
            <View
              style={{height: Height_convert(20), justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(18),
                  fontWeight: '700',
                  color: '#000000',
                }}>
                아우디 Q7 ABT LINE 바디킷
              </Text>
            </View>
            <View
              style={{
                height: Height_convert(14),
                marginTop: Height_convert(11),
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '400',
                  fontSize: Font_normalize(12),
                  marginRight: Width_convert(8),
                  color: '#000000',
                }}>
                MOTION튜닝샵
              </Text>
              <Star style={{marginRight: Width_convert(3)}}></Star>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(12),
                  marginRight: Width_convert(4),
                  color: '#000000',
                }}>
                4.8
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.NanumSqureRegular || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(12),
                  color: '#000000',
                }}>
                후기 33
              </Text>
            </View>
            <View
              style={{
                height: Height_convert(14),
                justifyContent: 'center',
                marginTop: Height_convert(6),
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSqureRegular || null,
                  fontSize: Font_normalize(12),
                  fontWeight: '400',
                  color: '#000000',
                }}>
                서울특별시 강남구 청담동 12-3
              </Text>
            </View>
            <View
              style={{
                width: Width_convert(350),
                height: Height_convert(25),
                marginTop: Height_convert(35),
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: Fonts?.NanumSquareBold || null,
                  fontWeight: '700',
                  fontSize: Font_normalize(22),
                  color: '#000000',
                  marginLeft: 'auto',
                  marginRight: 0,
                }}>
                2,300,000원
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(423),
          }}></View>
        <View
          style={{
            width: Width_convert(375),
            height: Height_convert(423),
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    //borderBottomColor: 'rgba(219,219,219,1)',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts?.Swagger || null,
    fontSize: Font_normalize(24),
    color: 'black',
    textAlign: 'center',
  },
});
export default SearchScreenDetail;
