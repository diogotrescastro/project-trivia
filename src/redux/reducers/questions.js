import {
  SEND_QUESTIONS,
  QUESTION_ID_INCREASE,
  RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS,

} from '../actions';

const INITIAL_STATE = { idTrivia: 0, questions: [] };

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_QUESTIONS:
    return ({
      ...state,
      questions: [...action.questions],
    });
  case QUESTION_ID_INCREASE:
    return ({
      ...state,
      idTrivia: action.increase,
    });
  case RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS:
    return ({
      ...state,
      idTrivia: 0,
    });

  default:
    return state;
  }
}

export default trivia;
