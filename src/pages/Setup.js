import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import '../css/btnSetupScreen.css';

class Setup extends Component {
  render() {
    return (
      <>
        <h1 data-testid="settings-title">Configurações</h1>
        <Link to="/">
          <button type="button">
            <FaArrowLeft
              type="logo"
              name="adjust"
              color="blue"
              size="60px"
              border="square"
            />
          </button>
        </Link>
      </>
    );
  }
}

export default Setup;
