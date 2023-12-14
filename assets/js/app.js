// selecting all the section elements in html
const emojiSection = document.querySelector("#emoji-section");
const chatSection = document.querySelector("#chat-section");
const instructionSection = document.querySelector("#instruction-section");
const gameSection = document.querySelector("#game-section");
const controlsSection = document.querySelector("#controls-section");
//selecting all the div elements in html
const emojiDiv = document.querySelector("#emoji");
const chatDiv = document.querySelector("#chat");
const instructionsDiv = document.querySelector("#instructions");
const gameDiv = document.querySelector("#game");
const controlsDiv = document.querySelector("#controls");
const rpsDiv = document.querySelector("#rps");
const quizDiv = document.querySelector("#quiz");
const resultDiv = document.querySelector("#result");
const quizQuestionDiv = document.querySelector("#quiz-question");
//selecting the user input field
const userNameInput = document.querySelector("#user-name-input");
const userInputBtn = document.querySelector("#user-input-btn");
// selecting the emojis picture element
const emojisPicture = document.querySelector("#emojis");
// selecting control buttons
const yesGameControlsBtn = document.querySelector("#yes");
const noGameControlsBtn = document.querySelector("#no");
const gameChoiceBtns = document.querySelector("#game-choice-btns");
const startQuizBtn = document.querySelector("#start-quiz");
const nextQuestionBtn = document.querySelector("#next-question-quiz");

// creating emojis object list & urls for emojis
const emojiObj = {
  happy: createEmoji("1f600", "😀"),
  sad: createEmoji("1f61e", "😞"),
  excited: createEmoji("1f973", "🥳"),
  cryinglol: createEmoji("1f923", "🤣"),
  goodbye: createEmoji("1fae1", "🫡"),
  grinning: createEmoji("1f601", "😁"),
  hug: createEmoji("1f917", "🤗"),
  distraught: createEmoji("1f629", "😩"),
  meh: createEmoji("1fae4", "🫤"),
};

function createEmoji(code, alt) {
  return `<source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/${code}/512.webp" type="image/webp">
      <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/${code}/512.gif" alt="${alt}">`;
}

// function for checking userNameInput has been correctly entered
const greeting = () => {
  if (userNameInput.value == "") {
    let pFirstChild = chatDiv.firstElementChild;
    pFirstChild.textContent = `Oh I didn't get your name!`;
  } else {
    //settings content and unhiding sections
    chatDiv.textContent = `Hi ${userNameInput.value}, nice to meet you !`;
    userNameInput.remove();
    userInputBtn.remove();
    gameDiv.classList.remove("hide");
    controlsSection.classList.remove("hide");
    instructionsDiv.innerHTML = `<p>Would you like to play a game ? It's easy you can just click Yes or No below</p>`;
    emojisPicture.innerHTML = emojiObj.hug;
  }
};

// functions to terminate app when users selects no to both possible options
const gameNo = () => {
  yesGameControlsBtn.setAttribute("data-function", "joke-yes");
  noGameControlsBtn.setAttribute("data-function", "joke-no");
  chatDiv.textContent = `AAAAAhhhhhh ${userNameInput.value} thats a pity, would you like to hear a joke ?`;
  instructionsDiv.textContent = "";
  emojisPicture.innerHTML = emojiObj.sad;
};

const noJoke = () => {
  chatDiv.textContent = `No problem ${userNameInput.value}, maybe next time!`;
  emojisPicture.innerHTML = emojiObj.goodbye;
  instructionsDiv.textContent = "";
  controlsDiv.innerHTML = `<button onClick="window.location.reload();" class="green-btn">Start Over</button>`;
  gameSection.classList.add("hide");
};

//functions for when a users selects yes to either possible options

const gameYes = () => {
  emojisPicture.innerHTML = emojiObj.grinning;
  chatDiv.textContent = "Unreal! Ok so I've for a few to choose from, I love games";
  instructionsDiv.textContent =
    "Ok so simply select from the list below. You've got a 10 question quiz, RPS(Rock,Paper,Scissors) or Hi-Lo card game.";
  gameChoiceBtns.classList.remove("hide");
  controlsDiv.classList.add("hide");
  const rpsBtn = document.querySelector("#rpsBtn");
  const quizBtn = document.querySelector("#quizBtn");
  const hiloBtn = document.querySelector("#hiloBtn");

  yesGameControlsBtn.removeEventListener("click", yesBtnClickHandler);

  rpsBtn.addEventListener("click", rps);
  quizBtn.addEventListener("click", quiz);
  hiloBtn.addEventListener("click", hilo);
};

// random joke generator
const randomJoke = () => {
  const randJokes = [
    "My wife said I should do lunges to stay in shape. That would be a big step forward",
    "A thief stole all the fruit from the house, I couldn't believe it, I was peachless",
    "What did the ocean say to the beach? Nothing, it just waved.",
    "Why don't eggs tell jokes? They'd crack each other up.",
    "Why can't your hand be 12 inches long? Because then it would be a foot.",
  ];
  //set the button selection data labels
  yesGameControlsBtn.setAttribute("data-function", "joke-yes");
  noGameControlsBtn.setAttribute("data-function", "joke-no");

  let displayJoke = randJokes[Math.floor(Math.random() * randJokes.length)];
  emojisPicture.innerHTML = emojiObj.cryinglol;
  chatDiv.textContent = `Here's one for you !`;
  gameSection.classList.remove("hide");
  instructionSection.classList.add("hide");
  gameDiv.innerHTML = `<p>${displayJoke}<p>
    <p>Would you like to hear another one?</p>`;
};

//games section

const rps = () => {
  const playerScoreP = document.querySelector("#player-score");
  const bobScoreP = document.querySelector("#bobs-score");
  const outcomeElement = document.getElementById("outcome");
  const choicesButtons = document.querySelectorAll("#rps button");
  gameSection.classList.remove("hide");
  rpsDiv.classList.remove("hide");
  gameChoiceBtns.classList.add("hide");
  controlsDiv.classList.add("hide");
  instructionsDiv.textContent =
    "You need to click on one of the buttons below to make your choice, first to 10 wins";
  chatDiv.textContent = `Ok - Let's Play Rock Paper Scissors`;

  let playerScore = 0;
  let bobScore = 0;

  playerScoreP.textContent = playerScore;
  bobScoreP.textContent = bobScore;

  const buttonClickHandler = (e) => {
    playGame(e.target.getAttribute("data-choice"));
  };

  // Loop through buttons and add/remove the event listener
  choicesButtons.forEach((button) => {
    button.addEventListener("click", buttonClickHandler);
  });

  const playGame = (playerChoice) => {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    const result = determineWinner(playerChoice, computerChoice);

    if (result === "You win!") {
      playerScore++;
      console.log("playGame Player" + playerScore);
    } else if (result === "Bob wins!") {
      bobScore++;
      console.log("playGame Bob" + bobScore);
    }

    // Check if either player or Bob has reached a score of 10
    if (playerScore < 10 && bobScore < 10) {
      updateScores();
      displayResult(playerChoice, computerChoice, result);
    } else {
      endGame();
    }
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      emojisPicture.innerHTML = emojiObj.meh;
      return "It's a tie!";
    } else if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      emojisPicture.innerHTML = emojiObj.distraught;
      return "You win!";
    } else {
      emojisPicture.innerHTML = emojiObj.grinning;
      return "Bob wins!";
    }
  };

  const displayResult = (player, computer, result) => {
    outcomeElement.textContent = `You chose ${player}. Bob chose ${computer}. ${result}`;
  };

  const updateScores = () => {
    playerScoreP.textContent = playerScore;
    bobScoreP.textContent = bobScore;
    console.log(`updateScores Player score ${playerScore}`);
    console.log(`updateScores Bob score ${bobScore}`);
  };

  const endGame = () => {
    console.log("Game Over");
    rpsDiv.classList.add("hide");
    controlsDiv.classList.remove("hide");
    noGameControlsBtn.setAttribute("data-function", "joke-no");
    yesGameControlsBtn.setAttribute("data-function", "rps-again");
    yesGameControlsBtn.addEventListener("click", yesBtnClickHandler);

    // Check who has the higher score and display the outcome
    if (playerScore > bobScore) {
      outcomeElement.textContent = `Game Over! You win ${playerScore} : ${bobScore} - Congrats`;
    } else {
      outcomeElement.textContent = `Game Over! Bob wins ${bobScore} : ${playerScore} - Better luck next time`;
    }

    // Reset the scores
    playerScore = 0;
    bobScore = 0;

    console.log("Endgame " + playerScore);
    console.log("Endgame " + bobScore);

    playerScoreP.textContent = playerScore;
    bobScoreP.textContent = bobScore;

    // Update the displayed scores on the page
    updateScores();

    //remove event listeners before new game starts
    choicesButtons.forEach((button) => {
      button.removeEventListener("click", buttonClickHandler);
    });
  };
};

const quiz = () => {
  let correctScore = 0;
  let incorrectScore = 0;
  let questionNo = 0;
  const quizButtons = document.querySelectorAll("#quiz-question button");

  chatDiv.textContent = `Welcome to the Pop Culture Quiz ${userNameInput.value}`;
  instructionsDiv.innerHTML =
    "<p>Ok so, we have 10 questions for you. Multiple choice, just pick the one you think is right!</p><p>When your ready just hit the start button!</p>";
  gameChoiceBtns.classList.add("hide");
  resultDiv.classList.add("hide");
  gameSection.classList.remove("hide");
  quizDiv.classList.remove("hide");
  startQuizBtn.addEventListener("click", startQuiz);

  //questions for the quiz
  const popCultureQuestions = [
    {
      questionText: "In which movie does Leonardo DiCaprio say, 'I'm the king of the world!'?",
      answers: {
        option1: "Inception",
        option2: "Titanic", // Correct answer
        option3: "The Wolf of Wall Street",
        option4: "Shutter Island",
      },
      correctAnswer: "option2",
    },
    {
      questionText: "Who played the character of Tony Stark in the Marvel Cinematic Universe?",
      answers: {
        option1: "Chris Hemsworth",
        option2: "Chris Evans",
        option3: "Robert Downey Jr.", // Correct answer
        option4: "Mark Ruffalo",
      },
      correctAnswer: "option3",
    },
    {
      questionText: "Which TV series features dragons, direwolves, and the Iron Throne?",
      answers: {
        option1: "Breaking Bad",
        option2: "The Walking Dead",
        option3: "Game of Thrones", // Correct answer
        option4: "Stranger Things",
      },
      correctAnswer: "option3",
    },
    {
      questionText: "Who is known for saying, 'I feel the need... the need for speed'?",
      answers: {
        option1: "Tom Cruise",
        option2: "Brad Pitt",
        option3: "Will Smith",
        option4: "Val Kilmer", // Correct answer
      },
      correctAnswer: "option4",
    },
    {
      questionText: "Which pop star is known as the 'Queen of Pop'?",
      answers: {
        option1: "Lady Gaga",
        option2: "Beyoncé",
        option3: "Madonna", // Correct answer
        option4: "Taylor Swift",
      },
      correctAnswer: "option3",
    },
    {
      questionText:
        "What is the name of the fictional wizarding school in the Harry Potter series?",
      answers: {
        option1: "Hogwarts", // Correct answer
        option2: "Durmstrang",
        option3: "Beauxbatons",
        option4: "Ilvermorny",
      },
      correctAnswer: "option1",
    },
    {
      questionText: "Which animated film features a character named Simba?",
      answers: {
        option1: "Finding Nemo",
        option2: "The Lion King", // Correct answer
        option3: "Toy Story",
        option4: "Shrek",
      },
      correctAnswer: "option2",
    },
    {
      questionText: "Who is the author of the 'Harry Potter' book series?",
      answers: {
        option1: "J.K. Rowling", // Correct answer
        option2: "George R.R. Martin",
        option3: "Stephen King",
        option4: "Suzanne Collins",
      },
      correctAnswer: "option1",
    },
    {
      questionText: "Which superhero is known for his web-slinging abilities?",
      answers: {
        option1: "Batman",
        option2: "Iron Man",
        option3: "Spider-Man", // Correct answer
        option4: "Superman",
      },
      correctAnswer: "option3",
    },
    {
      questionText:
        "What is the name of the fictional wizard detective in a series of novels by J.K. Rowling?",
      answers: {
        option1: "Sherlock Holmes",
        option2: "Hercule Poirot",
        option3: "Cormoran Strike",
        option4: "Harry Potter", // Correct answer
      },
      correctAnswer: "option4",
    },
  ];

  function startQuiz() {
    quizQuestionDiv.classList.remove("hide");
    startQuizBtn.classList.add("hide");
    instructionsDiv.classList.add("hide");

    //determin if its the first question or not
    if (questionNo === 0) {
      questionObjectInfo = startQuestion();
    } else {
      questionObjectInfo = popCultureQuestions[questionNo];
      console.log("Im in the else for startquiz");
      console.log(questionObjectInfo);
    }

    const questionText = questionObjectInfo.questionText;
    const answersText = questionObjectInfo.answers;

    chatDiv.textContent = questionText;
    //set the answers on each button and add an event listener with the chosen answer
    quizButtons.forEach((button, index) => {
      const optionKey = `option${index + 1}`;
      button.innerText = answersText[optionKey];
      button.addEventListener("click", (e) => {
        const selectedOption = e.target.getAttribute("data-quiz");
        isAnswerCorrect(selectedOption, e.target);
      });
    });
  }

  //sorting the questions in a random order to avoid the same sequence every time
  const startQuestion = () => {
    const compareFunction = (a, b) => {
      return Math.random() - 0.5;
    };
    popCultureQuestions.sort(compareFunction);
    return popCultureQuestions[questionNo];
  };

  /* isAnswerCorrect function takes in 2 arguments, gets the correct answer from the questions array
  checks if the answer is correct or not, styles based on this and updates the answer scores, updates the question number,
  dispalys the next button and add an event listener
   */
  function isAnswerCorrect(selectedOption, clickedButton) {
    let correctOption = popCultureQuestions[questionNo].correctAnswer;
    if (selectedOption === correctOption) {
      console.log("Answer is correct");
      clickedButton.classList.add("green-btn");
      correctScore++;
    } else {
      console.log("Answer is false");
      clickedButton.classList.add("red-btn");
      incorrectScore++;
    }
    quizButtons.forEach((button) => {
      button.setAttribute("disabled", true);
    });

    questionNo++;
    nextQuestionBtn.classList.remove("hide");
    nextQuestionBtn.addEventListener("click", nextQuestion);
  }

  function updateScores() {}

  function nextQuestion() {
    console.log("now were in nextQuestion");
    nextQuestionBtn.removeEventListener("click", nextQuestion);
    // make all buttons active again
    quizButtons.forEach((button) => {
      button.removeAttribute("disabled", true);
      button.classList.remove("green-btn", "red-btn");
    });
    startQuiz();
  }

  function endQuiz() {
    startQuizBtn.removeEventListener("click", startQuiz);
  }
};

const hilo = () => {
  console.log("This is hilo");
};

// create a event lisnter fucntion that uses a switch statement to determin which fucntion to run
const yesBtnClickHandler = () => {
  const yesChoice = yesGameControlsBtn.getAttribute("data-function");

  switch (yesChoice) {
    case "game-yes":
      gameYes();
      break;
    case "joke-yes":
      randomJoke();
      break;
    case "rps-again":
      rps();
      break;
    default:
      console.log("Do nothing");
  }
};

noGameControlsBtn.addEventListener("click", function () {
  const noChoice = noGameControlsBtn.getAttribute("data-function");

  switch (noChoice) {
    case "game-no":
      gameNo();
      break;
    case "joke-no":
      noJoke();
      break;
    default:
      console.log("Do nothing");
  }
});

// Event listeners
userInputBtn.addEventListener("click", greeting);
yesGameControlsBtn.addEventListener("click", yesBtnClickHandler);
