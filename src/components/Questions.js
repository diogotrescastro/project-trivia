import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { increasePlayerScore, modifyNextBtn,
  allowQuestionsBtnAfterNextClick, modifyTimer, addQuestionsPlayed,
} from '../redux/actions';

const INCORRECT = '#incorrect-answear';
const CORRECT = '#correct-answear';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.changeBorderColor = this.changeBorderColor.bind(this);
    this.disableBtnsAfterTimer = this.disableBtnsAfterTimer.bind(this);
    this.generateQuestionsBtnFunc = this.generateQuestionsBtnFunc.bind(this);
    this.allowAbleBtnsAfterNextClick = this.allowAbleBtnsAfterNextClick.bind(this);
    this.localStorageNewSave = this.localStorageNewSave.bind(this);
  }

  componentDidMount() {
    const { sendAbleQuestBtnFunc } = this.props;
    sendAbleQuestBtnFunc(this.allowAbleBtnsAfterNextClick);
  }

  changeBorderColor() {
    const wrong = document.querySelectorAll(INCORRECT);
    const correct = document.querySelector(CORRECT);
    wrong.forEach((element) => {
      element.style.border = '3px solid rgb(255, 0, 0)';
    });
    correct.style.border = '3px solid rgb(6, 240, 15)';
  }

  disableBtnsAfterTimer() {
    const wrong = document.querySelectorAll(INCORRECT);
    const correct = document.querySelector(CORRECT);
    wrong.forEach((element) => {
      element.disabled = true;
    });
    correct.disabled = true;
  }

  allowAbleBtnsAfterNextClick() {
    const wrong = document.querySelectorAll(INCORRECT);
    const correct = document.querySelector(CORRECT);
    wrong.forEach((element) => {
      element.disabled = false;
    });
    correct.disabled = false;
  }

  validateScore(e) {
    const {
      addPoint, triviaQuestions, id, globalTimer,
      showNextBtn, assertions,
    } = this.props;
    const { difficulty } = triviaQuestions[id];
    this.multiplier = 0;

    switch (difficulty) {
    case 'easy':
      this.multiplier = 1;
      break;

    case 'medium':
      this.multiplier = 2;
      break;

    case 'hard':
      this.multiplier = 3;
      break;

    default:
      break;
    }
    if (e.target.id === 'correct-answear') {
      const DEZ = 10;
      const point = DEZ + (globalTimer * this.multiplier);
      this.localStorageNewSave(point, assertions);
      addPoint(point, (assertions + 1));
      showNextBtn(true);
      this.disableBtnsAfterTimer();
    } else if (e.target.id === 'incorrect-answear') {
      this.disableBtnsAfterTimer();
      showNextBtn(true);
    }
  }

  localStorageNewSave(point, assertions) {
    const { playerName, playerEmail } = this.props;
    const previousScore = JSON.parse(localStorage.state).player.score;
    const picture = JSON.parse(localStorage.state).player.photo;
    const player = {
      player: {
        name: playerName,
        assertions: assertions + 1,
        score: previousScore + point,
        gravatarEmail: playerEmail,
        photo: picture,
      },
    };
    localStorage.state = JSON.stringify(player);
  }

  generateQuestionsBtnFunc() {
    const { triviaQuestions, id } = this.props;
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = triviaQuestions[id];

    return (
      <div>
        { incorrectAnswers.map((incorrectAnswer, index) => (
          <button
            id="incorrect-answear"
            type="button"
            key={ `wrong-answer-${index}` }
            data-testid={ `wrong-answer-${index}` }
            onClick={ (e) => { this.changeBorderColor(); this.validateScore(e); } }
          >
            { incorrectAnswer }
          </button>
        )) }
        <button
          type="button"
          id="correct-answear"
          data-testid="correct-answer"
          onClick={ (e) => { this.changeBorderColor(); this.validateScore(e); } }
        >
          { correctAnswer }
        </button>
      </div>
    );
  }

  render() {
    const {
      triviaQuestions, id, func, globalTimer, shouldShowNextBtn,
      showNextBtn,
    } = this.props;
    const { category, question } = triviaQuestions[id];
    if (globalTimer <= 0) {
      this.disableBtnsAfterTimer();
      this.changeBorderColor();
      showNextBtn(true);
    }

    return (
      <div>
        <Timer />
        <h4 data-testid="question-category">{ category }</h4>
        <h3 data-testid="question-text">{ question }</h3>
        { this.generateQuestionsBtnFunc() }
        {
          shouldShowNextBtn ? (
            <button
              type="button"
              onClick={ func }
              data-testid="btn-next"
            >
              Próxima
            </button>) : ''
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuestions: state.questions.questions,
  idTrivia: state.questions.idTrivia,
  runningTimer: state.gameMechanics.timerRunning,
  globalTimer: state.gameMechanics.timeToRespond,
  stopTimer: state.gameMechanics.stopTimerFunc,
  shouldShowNextBtn: state.gameMechanics.showNextBtn,
  score: state.player.score,
  assertions: state.player.assertions,
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  addPoint: (point, assertions) => dispatch(increasePlayerScore(point, assertions)),
  showNextBtn: (boolean) => dispatch(modifyNextBtn(boolean)),
  sendAbleQuestBtnFunc: (func) => dispatch(allowQuestionsBtnAfterNextClick(func)),
  modifyTimerRunning: (bool) => dispatch(modifyTimer(bool)),
  increasePlayedQuestions: () => dispatch(addQuestionsPlayed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = ({
  triviaQuestions: PropTypes.arrayOf(Object),
  id: PropTypes.number,
  func: PropTypes.func,
  globalTimer: PropTypes.number.isRequired,
  addPoint: PropTypes.func,
  showNextBtn: PropTypes.func,
  shouldShowNextBtn: PropTypes.bool.isRequired,
  sendAbleQuestBtnFunc: PropTypes.func,
  assertions: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,

});

Questions.defaultProps = {
  triviaQuestions: [],
  id: 0,
  func: {},
  addPoint: PropTypes.func,
  showNextBtn: PropTypes.func,
  sendAbleQuestBtnFunc: PropTypes.func,

};
