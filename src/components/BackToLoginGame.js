import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BackToLoginGame extends Component {
  render() {
    return (
      <div className="loadind-div">
        <p className="about-description">
          Se você estiver vendo esta tela por mais de 5 segundos,
          não encontramos nenhuma pergunta com as configurações que você escolheu!
          <br />
          Volte a tela de login e escolha outras configurações!!
        </p>
        <Link to="/" style={ { textDecoration: 'none' } }>
          <div className="setup-back-home">
            <button
              type="button"
              data-testid="btn-go-home"
              className="btn-neon-blue back-home"
            >
              Voltar ao login
            </button>
          </div>
        </Link>
      </div>
    );
  }
}

export default BackToLoginGame;
