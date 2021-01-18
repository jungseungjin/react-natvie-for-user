import React, {Component} from 'react';
import {
  ScrollView,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import iframe from '@native-html/iframe-plugin';
const renderers = {
  iframe,
};
const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
const htmlContent2 =
  '<h1>This HTML snippet is now rendered with native components !</h1><h2>Enjoy a webview-free and blazing fast application</h2><img src="https://i.imgur.com/dHLmxfO.jpg?2" /><em style="textAlign: center;">Look at how happy this native cat is</em><p>오오<iframe frameborder="0" src="//www.youtube.com/embed/Gj4eL13bnRQ" width="640" height="360" class="note-video-clip"></iframe><img style="width: 435px;" src="https://motory.s3.ap-northeast-2.amazonaws.com/Work_image/1610417093400713863.png"></p>';

export default function Demo() {
  //HTML
  const contentWidth = useWindowDimensions().width;
  return (
    <ScrollView style={{flex: 1}}>
      <HTML
        renderers={renderers}
        source={{html: htmlContent2}}
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
  );
}
