// Get DOM elements
const answerOne = document.querySelector('.title');
const answerTwo = document.querySelectorAll('.answer-two');
const answerThree = document.querySelectorAll('.answer-three');
const answerFour = document.querySelectorAll('.answer-four');

function randomOrder() {
  const x = Math.floor(Math.random() * 4);
  const y = Math.floor(Math.random() * 4);
  const z = Math.floor(Math.random() * 4);
  const w = Math.floor(Math.random() * 4);
  console.log(z);
  answerOne.classList.add('yes');
}
randomOrder();
