import React from 'react';
import Height from './Height.js';
import PropTypes from 'prop-types';
const Height_convert = (size) => {
  const scale = parseInt(parseFloat(size / 818) * Height);
  return scale;
};
Height_convert.PropTypes = {
  size: PropTypes.number.isRequired,
};
export default Height_convert;
