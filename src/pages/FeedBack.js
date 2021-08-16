import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClickRankBtn = this.handleClickRankBtn.bind(this);
    this.createRankingStorage = this.createRankingStorage.bind(this);
  }

  handleClickRankBtn() {
    this.createRankingStorage();
  }

  createRankingStorage() {
    const { name, score, picture } = this.props;
    const userRanking = {
      name,
      score,
      picture,
    };
    if (!localStorage.ranking || localStorage.ranking.length === 0) {
      localStorage.ranking = JSON.stringify([userRanking]);
    } else {
      const localStorageRanking = JSON.parse(localStorage.ranking);
      localStorageRanking.push(userRanking);
      localStorage.ranking = JSON.stringify(localStorageRanking);
    }
  }

  // Finalizado

  render() {
    const { score, assertion } = this.props;
    const expectedAssertions = 3;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          FeedBack:
        </h3>
        <h2 data-testid="feedback-text">
          { assertion < expectedAssertions ? 'Podia ser melhor...' : 'Mandou bem!' }
        </h2>
        <h1
          data-testid="feedback-total-score"
        >
          { score }
        </h1>
        <h1
          data-testid="feedback-total-question"
        >
          { assertion }
        </h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            onClick={ this.handleClickRankBtn }
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  picture: state.player.srcGravatarImg,
  name: state.player.name,
  score: state.player.score,
  assertion: state.player.assertions,
});

export default connect(mapStateToProps)(FeedBack);

FeedBack.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertion: PropTypes.number.isRequired,
};
