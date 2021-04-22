import React, {memo} from 'react';
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import Height_convert from '../../Height_convert.js';
import Width_convert from '../../Width_convert.js';
import Fonts from '../../Fonts.js';
import Font_normalize from '../../Font_normalize.js';
import PropTypes from 'prop-types';
import GoBack from '../../../../assets/home/goBack.svg';
import X from '../../../../assets/home/x_black.svg';
import {ScrollView} from 'react-native-gesture-handler';
import Filter from '../../../../assets/home/filter.svg';
import StatusBarHeight from '../../StatusBarHeight';
const CategoryView = (props) => {
  return (
    <View style={styles.CategoryView}>
      {props.Title.map((item) => CategoryViewNested(props, item))}
    </View>
  );
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
  CategoryView: {
    height: Height_convert(48),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CategoryViewNestedTouch: (Title) => {
    return {
      height: Height_convert(48),
      borderBottomWidth: 3,
      justifyContent: 'center',
      alignItems: 'center',
      width: Title.length === 2 ? '50%' : Title.length === 4 ? '25%' : null,
    };
  },
  CategoryViewNestedText: {
    fontFamily: Fonts?.NanumSquareRegular || null,
    fontWeight: '700',
    fontSize: Font_normalize(15),
  },
  AnotherView: {
    height: Height_convert(96),
  },
  AnotherViewView: {
    height: Height_convert(51),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
const CategoryViewNested = (props, item) => {
  return (
    <TouchableOpacity
      key={item.value}
      activeOpacity={1}
      onPress={() => {
        props.PageChangeValue(item._id);
      }}
      style={[
        styles.CategoryViewNestedTouch(props.Title),
        props.nowValue === item._id ? styles.pickView : styles.unPickView,
      ]}>
      <Text
        style={[
          styles.CategoryViewNestedText,
          props.nowValue === item._id ? styles.pickText : styles.unPickText,
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};
const AnotherView = (props) => {
  return (
    <>
      <View style={styles.AnotherView}>
        <View style={styles.AnotherViewView}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {props.SecondCategory.map((item) => (
              <View
                key={item._id}
                style={[
                  {
                    marginLeft: Width_convert(20),
                    marginRight: Width_convert(10),
                    justifyContent: 'center',
                    height: Height_convert(48),
                    borderBottomWidth: 2,
                  },
                  props.PickSecond.name === item.name
                    ? {
                        borderBottomColor: '#946AEF',
                      }
                    : {
                        borderBottomColor: 'rgba(0,0,0,0)',
                      },
                ]}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    props.PickSecondChangeValue(item._id);
                  }}>
                  <Text
                    style={[
                      {
                        marginTop: Height_convert(20),
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(12),
                      },
                      props.PickSecond.name === item.name
                        ? {
                            color: '#946AEF',
                          }
                        : {
                            color: '#000000',
                          },
                    ]}>
                    {item.name}
                    {item.chkNumber ? `(${item.chkNumber})` : null}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            {/*바디파츠 휠타이어캘리퍼 하단의 보라색 라인 */}
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
            {props.ThirdCategory.map((item) => (
              <View
                key={item._id}
                style={[
                  {
                    justifyContent: 'center',
                    marginRight: Width_convert(8),
                  },
                  props.ThirdCategory.indexOf(item) == 0
                    ? {
                        marginLeft: Width_convert(17),
                      }
                    : {
                        marginLeft: Width_convert(8),
                      },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    props.PickThirdChangeValue(item._id);
                  }}
                  activeOpacity={1}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={[
                      {
                        fontFamily: Fonts?.NanumSqureRegular || null,
                        fontWeight: '700',
                        fontSize: Font_normalize(10),
                        paddingLeft: Width_convert(5),
                        paddingRight: Width_convert(5),
                        paddingTop: Height_convert(5),
                        paddingBottom: Height_convert(5),
                        borderRadius: Font_normalize(3),
                        overflow: 'hidden',
                      },
                      props.PickThird._id === item._id
                        ? {
                            color: '#FFFFFF',
                            backgroundColor: '#946AEF',
                          }
                        : {
                            color: '#000000',
                            backgroundColor: '#FFFFFF',
                          },
                    ]}>
                    {item.name}
                    {item.chkNumber ? `(${item.chkNumber})` : null}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
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
              style={[
                {
                  width: Width_convert(26),
                  height: Height_convert(22),
                  borderRadius: Font_normalize(3),
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                props.FilterValue
                  ? {
                      backgroundColor: '#F8F2FD',
                    }
                  : {
                      backgroundColor: '#FFFFFF',
                    },
              ]}
              onPress={() => {
                props.FilterChangeValue(!props.FilterValue);
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
  );
};
const TabBarBottom = (props) => {
  return (
    <>{props.from === 'category' ? CategoryView(props) : AnotherView(props)}</>
  );
};
TabBarBottom.propTypes = {
  from: PropTypes.string.isRequired,
};

export default memo(TabBarBottom);
