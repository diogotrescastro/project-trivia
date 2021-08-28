import React, { Component } from 'react';
import BackToLoginGame from './BackToLoginGame';

class Loading extends Component {
  render() {
    return (

      <>
        <div className="loading">
          Loading Questions...
        </div>
        <div className="loading-circle" />
        <br />
        <BackToLoginGame />

      </>
    );
  }
}

export default Loading;
