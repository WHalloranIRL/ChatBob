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

// function for checking userNameInput has been correctly entered
const greeting = () => {
  if (userNameInput.value == "") {
    let pFirstChild = chatDiv.firstElementChild;
    pFirstChild.textContent = `Oh I didn't get your name!`;
  } else {
    // set the text in the chatDiv to equal the value of the name provided
    chatDiv.textContent = `Hi ${userNameInput.value}, nice to meet you !`;

    // remove both the input & buttons from the DOM
    userNameInput.remove();
    userInputBtn.remove();

    // removing .hide class from gameDiv to display it
    gameDiv.classList.remove("hide");

    //clear instructionsDiv text
    instructionsDiv.textContent = "";
  }
};

// Event listeners
userInputBtn.addEventListener("click", greeting);
