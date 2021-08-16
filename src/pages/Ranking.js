import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.renderRanking = this.renderRanking.bind(this);
  }

  renderRanking() {
    const ranking = JSON.parse(localStorage.ranking);
    const rankingSorted = ranking.sort((a, b) => b.score - a.score);
    return (
      rankingSorted.map((user, index) => (
        <li key={ index }>
          <img src={ user.picture } alt={ user.name } />
          <p data-testid={ `player-name-${index}` }>{ user.name }</p>
          <p data-testid={ `player-score-${index}` }>{ user.score }</p>
        </li>))
    );
  }

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          { this.renderRanking() }
        </ol>
        <Link to="/">
          <button type="button">
            <FaArrowLeft
              data-testid="btn-go-home"
              type="logo"
              name="adjust"
              color="blue"
              size="60px"
              border="square"
            />
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
