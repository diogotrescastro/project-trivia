import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import settingsIMG from '../images/gear.png';

class btnSetupScreen extends Component {
  render() {
    return (
      <Link to="/Setup" style={ { textDecoration: 'none' } }>
        <div className="div-btn-settings">
          <div className="btn-div-img-settings">
            <img src={ settingsIMG } alt="Configurações" className="btn-img-settings" />
          </div>
          <button
            type="button"
            data-testid="btn-settings"
            className="btn-neon-blue setup-btn"
          >
            Configurações
          </button>
          {/* <button
            type="button"
            data-testid="btn-settings"
            className="btn-settings btn-neon-red"
          >
            Configurações
          </button> */}
        </div>
      </Link>
    );
  }
}

export default btnSetupScreen;
