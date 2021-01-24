import React from 'react';
import Width from './Width.js';
import PropTypes from 'prop-types';
const Width_convert = (size) => {
  const scale = parseInt(parseFloat(size / 375) * Width);
  return scale;
};
Width_convert.propTypes = {
  size: PropTypes.number.isRequired,
};
export default Width_convert;
