import React from 'react';
import {Platform} from 'react-native';
import PropTypes from 'prop-types';
let NanumGothicRegular;
let NanumGothicBold;
let NanumGothicExtraBold;
let Swagger;
let NanumSquareExtraBold;
let NanumSquareBold;
let NanumSquareLight;
let NanumSqureRegular;
if (Platform.OS == 'ios') {
  NanumGothicRegular = 'NanumGothic';
  NanumGothicBold = 'NanumGothicBold';
  NanumGothicExtraBold = 'NanumGothicExtraBold';
  Swagger = 'SwaggerTTF';
  NanumSquareExtraBold = 'NanumSquareEB';
  NanumSquareBold = 'NanumSquareB';
  NanumSquareLight = 'NanumSquareL';
  NanumSqureRegular = 'NanumSquareR';
} else {
  NanumGothicRegular = 'NanumGothic-Regular';
  NanumGothicBold = 'NanumGothic-Bold';
  NanumGothicExtraBold = 'NanumGothic-ExtraBold';
  Swagger = 'SDSwaggerTTF';
  NanumSquareExtraBold = 'NanumSquareExtraBold';
  NanumSquareBold = 'NanumSquareBold';
  NanumSquareLight = 'NanumSquareLight';
  NanumSqureRegular = 'NanumSqureRegular';
}
// Fonts.propTypes = {
//   Swagger: PropTypes.string.isRequired,
//   NanumGothicRegular: PropTypes.string.isRequired,
//   NanumGothicBold: PropTypes.string.isRequired,
//   NanumGothicExtraBold: PropTypes.string.isRequired,
//   NanumSquareExtraBold: PropTypes.string.isRequired,
//   NanumSquareBold: PropTypes.string.isRequired,
//   NanumSquareLight: PropTypes.string.isRequired,
//   NanumSqureRegular: PropTypes.string.isRequired,
// };
export default Fonts = {
  Swagger,
  NanumGothicRegular,
  NanumGothicBold,
  NanumGothicExtraBold,
  NanumSquareExtraBold,
  NanumSquareBold,
  NanumSquareLight,
  NanumSqureRegular,
};
