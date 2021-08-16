const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const QUESTION_ENDPOINT = 'https://opentdb.com/api.php?amount=5&token=';

async function getToken() {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
}

async function getQuestions(receiveToken) {
  try {
    const response = await fetch(`${QUESTION_ENDPOINT}${receiveToken}`);
    const questions = await response.json();
    return questions.results;
  } catch (error) {
    return error;
  }
}

export {
  getToken,
  getQuestions,
};
