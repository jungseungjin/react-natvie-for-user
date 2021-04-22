import React from 'react';
import {View, Text, ScrollView, useWindowDimensions} from 'react-native';
import Height_convert from '../../../components/Height_convert.js';
import Width_convert from '../../../components/Width_convert.js';
import Fonts from '../../../components/Fonts.js';
import Font_normalize from '../../../components/Font_normalize.js';

import HTML from 'react-native-render-html';
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
        <HTML
          renderers={renderers}
          source={{
            html: `<p>${props.item}</p>`,
          }}
          contentWidth={contentWidth}
          WebView={WebView}
          defaultWebViewProps={
            {
              /* Any prop you want to pass to all WebViews */
            }
          }
          renderersProps={{iframe: {scalesPageToFit: true}}}
        />
      </ScrollView>
    </View>
  );
};
export default WorkInformation;
