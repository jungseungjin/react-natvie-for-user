import React from 'react';
import {TouchableHighlight, Image, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class BackButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        style={styles.btnContainer}>
        <Image
          source={require('../../../assets/icons/backArrow.png')}
          style={styles.btnIcon}
        />
      </TouchableHighlight>
    );
  }
}

BackButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
