import React, {useState} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Text,
  LayoutAnimation,
} from 'react-native';
import Tabbar from '../../../components/Home/Tabbar/tabBar.js';
import Width_convert from '../../../components/Width_convert.js';
import Height_convert from '../../../components/Height_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FrequentlyQuestionMenu from '../../../components/More/Menu/frequentlyQuestionMenu.js';
import BracketDown from '../../../../assets/home/braket_down.svg';
import BracketUp from '../../../../assets/home/braket_up.svg';
import IsLoading from '../../../components/ActivityIndicator';
import NetworkErrModal from '../../../components/Modal/NetworkErrModal';
import NormalErrModal from '../../../components/Modal/NormalErrModal';
const FrequentlyQuestionScreen = (props) => {
  const [page, setPage] = useState('TOP5');
  const [pageIndex, setPageIndex] = useState(0);
  const PageChangeValue = (text) => {
    setPage(text);
    setOpenIndex('');
    let Index = 0;
    if (text === 'TOP5') Index = 0;
    else if (text === '회원정보') Index = 1;
    else if (text === '예약관리') Index = 2;
    else if (text === '후기관련') Index = 3;
    else if (text === '이용문의') Index = 4;
    else if (text === '기타') Index = 5;
    setPageIndex(Index);
  };
  const [dataList, setDataList] = useState(QuestionData);
  const [openIndex, setOpenIndex] = useState('');
  const [isLoadingAndModal, setIsLoadingAndModal] = useState(0); //0은 null 1은 IsLoading 2는 NetWorkErrModal 3은 NormalErrModal
  const IsLoadingAndModalChangeValue = (text) => setIsLoadingAndModal(text);
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'#FFFFFF'}></StatusBar>
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <Tabbar
          left={'back'}
          Title={'자주 묻는 질문'}
          navigation={props.navigation}></Tabbar>
        {/*상단 TOP5~기타 버튼 시작 */}
        <View
          style={{
            marginTop: Height_convert(12),
            marginLeft: Width_convert(17),
            width: Width_convert(341),
            height: Width_convert(115),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Width_convert(341),
              height: Width_convert(57),
              borderTopColor: '#EEEEEE',
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderLeftColor: '#EEEEEE',
            }}>
            <FrequentlyQuestionMenu
              Title={'TOP5'}
              index={0}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
            <FrequentlyQuestionMenu
              Title={'회원정보'}
              index={1}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
            <FrequentlyQuestionMenu
              Title={'예약관리'}
              index={2}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: Width_convert(341),
              height: Width_convert(57),
              borderTopColor: '#EEEEEE',
              borderTopWidth: 1,
              borderLeftWidth: 1,
              borderLeftColor: '#EEEEEE',
            }}>
            <FrequentlyQuestionMenu
              Title={'후기관련'}
              index={0}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
            <FrequentlyQuestionMenu
              Title={'이용문의'}
              index={1}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
            <FrequentlyQuestionMenu
              Title={'기타'}
              index={2}
              nowValue={page}
              PageChangeValue={PageChangeValue}></FrequentlyQuestionMenu>
          </View>
        </View>
        {/*상단 TOP5~기타 버튼 끝 */}
        <ScrollView
          bounces={false}
          style={{
            marginTop: Height_convert(20),
          }}>
          {dataList[pageIndex].map((item, index) => (
            <View
              key={item.q + index}
              style={{
                paddingTop: Width_convert(20),
                paddingBottom:
                  index === openIndex ? Width_convert(0) : Width_convert(20),
                width: Width_convert(375),
                borderBottomWidth: 1,
                borderBottomColor: '#EEEEEE',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  if (index === openIndex) {
                    setOpenIndex('');
                  } else {
                    setOpenIndex(index);
                  }
                }}
                style={{
                  width: Width_convert(340),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlignVertical: 'center',
                    fontFamily: Fonts?.NanumSqureRegular || null,
                    fontWeight: '700',
                    fontSize: Font_normalize(16),
                    color: '#000000',
                  }}>
                  {item.q}
                </Text>
                <BracketDown
                  width={Width_convert(21)}
                  height={Width_convert(10)}></BracketDown>
              </TouchableOpacity>
              {index === openIndex && (
                <View
                  style={{
                    alignItems: 'center',
                    width: Width_convert(345),
                    paddingTop: Height_convert(15),
                    paddingBottom: Height_convert(15),
                    paddingLeft: Width_convert(10),
                    paddingRight: Width_convert(10),
                    backgroundColor: '#F0F0F0',
                    marginBottom: Height_convert(24),
                    marginTop: Height_convert(24),
                  }}>
                  <Text
                    style={{
                      width: Width_convert(323),
                      fontFamily: Fonts?.NanumSqureRegular || null,
                      fontSize: Font_normalize(12),
                      fontWeight: '700',
                      color: '#000000',
                      textAlign: 'justify',
                      lineHeight: Font_normalize(15),
                    }}>
                    {item.a}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        {isLoadingAndModal === 0 ? null : isLoadingAndModal === 1 ? ( //0 없음 1이면IsLoading 2는 NetworkErrModal 3은 NormalErrModal 4부터는 없음
          <IsLoading></IsLoading>
        ) : isLoadingAndModal === 2 ? (
          <NetworkErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NetworkErrModal>
        ) : isLoadingAndModal === 3 ? (
          <NormalErrModal
            ShowModalChangeValue={
              IsLoadingAndModalChangeValue
            }></NormalErrModal>
        ) : null}
      </SafeAreaView>
    </>
  );
};
const QuestionData = [
  [],
  [
    {
      q: '회원가입을 어떻게 하나요?',
      a: '투닝 앱 하단 더보기 - 로그인하기 - 하단의 회원가입 버튼',
    },
    {
      q: '개인이 여러 개의 아이디를 만들 수 있나요?',
      a:
        '한 명이 여러 개의 아이디를 만드는 것을 허용하지 않습니다. \n*한 아이디에 여러 차종을 등록할 수 있습니다.',
    },
    {
      q: '회원탈퇴는 어떻게 하나요?',
      a:
        '투닝 앱 하단 → 더보기 → 내정보 → 회원탈퇴 \n*재가입은 회원탈퇴 후 24시간 이후에 가능합니다.',
    },
    {
      q: '휴면 전환 안내 메시지를 받았는데,\n 어떻게 해제해야 하나요?',
      a:
        '1년간 로그인 기록이 없는 이용자의 계정의 개인정보는 별도로 분리하여 안전하게 보관되며, 휴면 전환 날짜까지 로그인을 하시면 다시 계정은 활성화 됩니다.',
    },
  ],
  [
    {
      q: '예약상담만 할 수 있나요?',
      a:
        '네, 지금은 투닝이 서비스 초기단계로 고객님들께 선별되고 완성도 높은 튜닝작업을 소개해드리기 위한 노력을 하고 있습니다. 추후 투닝이 제공할 서비스에 대해서도 기대해주세요:)',
    },
  ],
  [
    {
      q: '후기 작성은 어떻게 하나요?',
      a:
        '회원가입을 하시면 후기 작성이 가능합니다. \n*작성하신 후기는 고객들에게 큰 도움이 되고 더 나아가 튜닝시장을 더욱 활발하게 바꿀 수 있습니다!',
    },
    {
      q: '후기 수정과 삭제는 어떻게 하나요?',
      a:
        '후기를 작성하셨다면 로그인 후에 앱 하단 → 더보기 → 후기관리에서 수정과 삭제를 할 수 있습니다.',
    },
    {
      q: '제가 쓴 후기가 사라졌어요.',
      a:
        '투닝은 이용자들께서 저희 서비스를 통해 깨끗하고 신뢰할 수 있는 정보를 얻기를 바라고 또한 그러한 콘텐츠 유지를 위해 노력하고 있습니다. \n그렇기 때문에 관련법령 및 후기관리 정책에 의거하여 지속적인 모니터링을 통해 블라인드 처리 될 수 있음을 참고 부탁드립니다.',
    },
  ],
  [
    {
      q: '고객센터 연결 지연 시 어떻게 하나요?',
      a:
        '일부 시간대에는 통화량이 많아 고객센터와 연락이 지연될 수 있습니다. 투닝은 전화 상담 외에도 1대1문의가 가능하며 1대1문의를 주시면 최대한 빠른 답변을 드릴 수 있도록 노력하겠습니다.',
    },
    {
      q: '본인인증 문자가 오지 않아요.',
      a:
        '휴대폰의 스팸함 혹은 스팸차단 App을 확인 해주세요. 스팸함에도 없는 경우, 1)통신사 사정에 따라 인증발송/차단해제에 시간이 소요될 수 있으며 자세한 사항은 통신사로 문의해주세요. 2)네이버 클라우드 플랫폼 SENS 네트워크 사정에 따라 시간이 소요될 수 있습니다.',
    },
    {
      q: '아이디, 비밀번호를 잊어버렸을 때 어떻게 찾나요?',
      a:
        '앱 하단 ‘더보기’ → 로그인하기 → 아이디/비밀번호 찾기를 통해 아이디와 비밀번호를 찾으실 수 있습니다.',
    },
    {
      q: '앱에서 오는 푸시 알람을 끄고 싶어요.',
      a: '앱 하단 ‘더보기’ → 설정에서 설정할 수 있습니다.',
    },
  ],
  [
    {
      q: '투닝은 어떤 서비스를 제공하나요?',
      a:
        '대한민국에서 자동차 튜닝이라는 분야는 과거부터 규제가 엄격했고, 이로 인해 다른나라에 비해 비교적 자동차 튜닝 분야의 개방도가 떨어지는 편이기 때문에 튜닝에 대한 정보, 적절한 공임비용, 튜너의 실력 등의 정보를 가늠하고 판단하기가 쉽지 않습니다.\n\n이러한 소비자의 불편함을 해결하고자 투닝은 소비자가 발품 팔지 않고 선별된 자동차 튜닝 작업정보를 제공하고, 튜너의 노하우와 실력에 맞는 적절한 비용 공개를 지지하는 정책을 통해 고객님께서 신뢰할 수 있고 합리적인 튜닝작업을 할 수 있도록 돕고자 합니다. \n\n많은 사람이 자동차 튜닝문화를 즐기고, 점차 커지고 있는 자동차 튜닝시장에 긍정적인 영향을 미칠 수 있도록 노력하는 ‘투닝’이 되겠습니다! ',
    },
  ],
  {
    q: '서비스를 받고나서 문제가 생겼는데 어떻게 해야 하나요?',
    a:
      '시공 받으신 ‘협력업체’ 또는 투닝 고객센터에 연락주시면 신속하게 처리하여 불편함 없으시도록 최선을 다하겠습니다.',
  },
  {
    q: '투닝 협력업체와 분쟁이 생겼는데 어떻게 해야 하나요?',
    a:
      '투닝과 제휴를 맺은 협력업체와 관련하여 분쟁, 부당한 대우를 겪으신 고객님께서는 투닝 고객센터에 연락주시면 문제를 꼭 해결해드리겠습니다.',
  },
];
export default FrequentlyQuestionScreen;
