import React, { Component } from 'react';
import { BsPersonPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';

class btnSetupScreen extends Component {
  render() {
    return (
      <Link to="/Setup">
        <button type="button" data-testid="btn-settings">
          <BsPersonPlus
            type="logo"
            name="adjust"
            color="blue"
            size="60px"
            border="square"
          />
        </button>
      </Link>
    );
  }
}

export default btnSetupScreen;
