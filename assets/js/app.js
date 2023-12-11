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
//selecting the user input field
const userNameInput = document.querySelector("#user-name-input");
const userInputBtn = document.querySelector("#user-input-btn");
// selecting the emojis picture element
const emojisPicture = document.querySelector("#emojis");
// selecting control buttons
const yesGameControlsBtn = document.querySelector("#yes");
const noGameControlsBtn = document.querySelector("#no");

// creating emojis object list & urls for emojis
const emojiObj = {
  happy: createEmoji("1f600", "😀"),
  sad: createEmoji("1f61e", "😞"),
  excited: createEmoji("1f973", "🥳"),
  cryinglol: createEmoji("1f923", "🤣"),
  goodbye: createEmoji("1fae1", "🫡"),
  grinning: createEmoji("1f601", "😁"),
  hug: createEmoji("1f917", "🤗"),
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
  controlsDiv.innerHTML = `<button onClick="window.location.reload();" class="green-btn">Start Over</button>`;
  gameSection.classList.add("hide");
};

//functions for when a users selects yes to either possible options

const gameYes = () => {
  emojisPicture.innerHTML = emojiObj.grinning;
  chatDiv.textContent = "Unreal! Ok so I've for a few to choose from, I love games";
  instructionsDiv.textContent =
    "Ok so simply select from the list below. You've got a 10 question quiz, RPS(Rock,Paper,Scissors) or Hi-Lo card game.";
  controlsDiv.innerHTML = `<button id="quiz" class="green-btn">Quiz</button>
  <button id="rps" class="green-btn">RPS</button>
  <button id="hilo" class="green-btn">Hi-Lo</button>`;
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

// Event listeners
userInputBtn.addEventListener("click", greeting);

// create a event lisnter fucntion that uses a switch statement to determin which fucntion to run
yesGameControlsBtn.addEventListener("click", function () {
  const yesChoice = yesGameControlsBtn.getAttribute("data-function");

  switch (yesChoice) {
    case "game-yes":
      gameYes();
      break;
    case "joke-yes":
      randomJoke();
      break;
    default:
      console.log("Do nothing");
  }
});

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
