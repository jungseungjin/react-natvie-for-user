import React from 'react';
import Height from './Height.js';
import PropTypes from 'prop-types';
const Height_convert = (size) => {
  const scale = parseInt(parseFloat(size / 812) * Height);
  return scale;
};
Height_convert.propTypes = {
  size: PropTypes.number.isRequired,
};
export default Height_convert;
