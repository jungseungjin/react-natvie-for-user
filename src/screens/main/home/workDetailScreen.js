import React from 'react';
import {StatusBar, View, Platform, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import SwiperImage from '../../../components/Home/Swiper/swiperImage';
import Dot from '../../../components/Home/Swiper/dot.js';
import ActiveDot from '../../../components/Home/Swiper/activeDot.js';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';

const WorkDetailScreen = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Swiper
            style={{height: Width_convert(240)}}
            autoplay={true}
            autoplayTimeout={4.5}
            dot={<Dot></Dot>}
            activeDot={<ActiveDot></ActiveDot>}>
            <SwiperImage
              from={'work'}
              image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
            <SwiperImage
              from={'work'}
              image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
            <SwiperImage
              from={'work'}
              image={'https://unsplash.it/400/400?image=1'}></SwiperImage>
          </Swiper>
        </ScrollView>
      </View>
    </>
  );
};
export default WorkDetailScreen;
