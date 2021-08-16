import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { profileImg, profileName, profileScore } = this.props;
    return (
      <header>
        <img
          src={ profileImg }
          data-testid="header-profile-picture"
          alt="User profile"
        />
        <span
          data-testid="header-player-name"
        >
          { profileName }
        </span>
        <span
          data-testid="header-score"
        >
          { profileScore }
        </span>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  profileImg: state.player.srcGravatarImg,
  profileName: state.player.name,
  profileScore: state.player.score,
});

// const mapDispatchToProps = {
//   return;
// };

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  profileImg: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  profileScore: PropTypes.number.isRequired,
};
