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
import {ScrollView} from 'react-native-gesture-handler';
import Filter from '../../../../assets/home/filter.svg';
const {StatusBarManager} = NativeModules;
const TabBarBottom = ({
  navigation,
  Title,
  nowValue,
  PageChangeValue,
  from,
  FilterValue,
  FtilerChangeValue,
}) => {
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
  return (
    <>
      {from == 'category' ? (
        <View
          style={{
            height: Height_convert(48),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {Title.map((item) => (
            <TouchableOpacity
              key={item.value}
              activeOpacity={1}
              onPress={() => {
                PageChangeValue(item.value);
              }}
              style={[
                {
                  width: Width_convert(375 / Title.length),
                  height: Height_convert(48),
                  borderBottomWidth: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                nowValue == item.value ? styles.pickView : styles.unPickView,
              ]}>
              <Text
                style={[
                  {
                    fontFamily: Fonts?.NanumSquareRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(15),
                  },
                  nowValue == item.value ? styles.pickText : styles.unPickText,
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <>
          <View
            style={{
              height: Height_convert(96),
            }}>
            <View
              style={{
                height: Height_convert(51),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {/*바디파츠 휠타이어캘리퍼 하단의 보라색 라인 */}
                <View
                  style={{
                    marginLeft: Width_convert(20),
                    marginRight: Width_convert(10),
                    justifyContent: 'center',
                    height: Height_convert(48),
                    borderBottomWidth: 2,
                    borderBottomColor: '#946AEF',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      alert('gdgd');
                    }}>
                    <Text
                      style={{
                        marginTop: Height_convert(20),
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(12),
                        color: '#946AEF',
                      }}>
                      바디파츠
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginLeft: Width_convert(10),
                    marginRight: Width_convert(10),
                    height: Height_convert(48),
                    justifyContent: 'center',
                    borderBottomWidth: 2,
                    borderBottomColor: '#946AEF',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      alert('gdgd');
                    }}>
                    <Text
                      style={{
                        marginTop: Height_convert(20),
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(12),
                        color: '#946AEF',
                      }}>
                      바디파츠
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    marginLeft: Width_convert(10),
                    marginRight: Width_convert(10),
                    height: Height_convert(48),
                    justifyContent: 'center',
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(0,0,0,0)',
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      alert('gdgd');
                    }}>
                    <Text
                      style={{
                        marginTop: Height_convert(20),
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(12),
                        color: '#DBDBDB',
                      }}>
                      휠/타이어/캘리퍼
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                height: Height_convert(45),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  width: Width_convert(375 - 39),
                  height: Height_convert(40),
                  marginTop: Height_convert(4),
                  marginBottom: Height_convert(4),
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(17),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#FFFFFF',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#946AEF',
                      }}>
                      바디킷 및 패키지
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(8),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#FFFFFF',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#946AEF',
                      }}>
                      프론트범퍼
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(8),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#FFFFFF',
                      }}>
                      리어범퍼
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(8),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#FFFFFF',
                      }}>
                      본네트
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(8),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#FFFFFF',
                      }}>
                      본네트
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(8),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#FFFFFF',
                      }}>
                      본네트
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(8),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#FFFFFF',
                      }}>
                      본네트
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(8),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#FFFFFF',
                      }}>
                      본네트
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginLeft: Width_convert(8),
                    marginRight: Width_convert(8),
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        color: '#000000',
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        backgroundColor: '#FFFFFF',
                      }}>
                      본네트
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
              <View
                style={{
                  width: Width_convert(39),
                  height: Height_convert(40),
                  marginTop: Height_convert(4),
                  marginBottom: Height_convert(4),
                  justifyContent: 'center',
                  marginLeft: Width_convert(5),
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: Width_convert(26),
                    height: Height_convert(22),
                    backgroundColor: '#F8F2FD',
                    borderRadius: Font_normalize(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    FtilerChangeValue(!FilterValue);
                  }}>
                  <Filter
                  // PickChangeValue={PickChangeValue}
                  // nowValue={pickFilter}
                  ></Filter>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};
TabBarBottom.propTypes = {
  from: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
  pickView: {
    borderBottomColor: '#000000',
  },
  unPickView: {
    borderBottomColor: '#AAAAAA',
  },
  pickText: {
    color: '#000000',
  },
  unPickText: {
    color: '#AAAAAA',
  },
});

export default TabBarBottom;
