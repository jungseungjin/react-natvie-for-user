import React from 'react';
import {View, Text, ScrollView, useWindowDimensions} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';

import HTML, {IGNORED_TAGS} from 'react-native-render-html';
import WebView from 'react-native-webview';
import IframeRenderer from '@native-html/iframe-plugin';
const renderers = {
  iframe: IframeRenderer,
};
const WorkInformation = (props) => {
  const contentWidth = useWindowDimensions().width;
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <View
      style={{
        minHeight: Height_convert(812),
      }}>
      <ScrollView alwaysBounceVertical={false} style={{flex: 1}}>
        <View style={{height: Width_convert(40)}}></View>
        <HTML
          ignoredTags={[...IGNORED_TAGS, 'script']}
          renderers={renderers}
          source={{
            html:
              `<div style="color: #000000">${props.item}</div>` || `<p></p>`,
          }}
          tagsStyles={{
            p: {
              marginLeft: Width_convert(20),
              marginRight: Width_convert(20),
            },
            img: {
              marginBottom: -Width_convert(10),
            },
          }}
          onLoadEnd={(e) => console.log('Loading EndedHTML')}
          contentWidth={contentWidth}
          WebView={WebView}
          defaultWebViewProps={{}}
          renderersProps={{iframe: {scalesPageToFit: true}}}
        />
        {/* uri: 'https://github.com/facebook/react-native' */}
      </ScrollView>
    </View>
  );
};
export default WorkInformation;
