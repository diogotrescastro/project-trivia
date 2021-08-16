import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputName extends Component {
  render() {
    const { func } = this.props;
    return (
      <label htmlFor="inputName">
        Nome:
        <input
          type="text"
          id="inputName"
          data-testid="input-player-name"
          onChange={ func }
        />
      </label>
    );
  }
}

export default InputName;

InputName.propTypes = {
  func: PropTypes.func,
};

InputName.defaultProps = {
  func: {},
};
