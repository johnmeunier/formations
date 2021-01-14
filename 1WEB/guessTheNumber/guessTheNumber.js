const qs = (selector) => document.querySelector(selector);

const connectToTheGame = () => {
  qs("#game").classList.remove("hide");
  qs("#username-value").innerText = localStorage.getItem("username");
  qs("#connection").classList.add("hide");
};

if (localStorage.getItem("username")) {
  connectToTheGame();
} else {
  $connection = qs("#connection");
  $connection.addEventListener("submit", (e) => {
    const username = qs("#username").value;
    e.preventDefault();
    localStorage.setItem("username", username);
    connectToTheGame();
  });
}

document.querySelector("#logout").addEventListener("click", () => {
  localStorage.removeItem("username");
  qs("#game").classList.add("hide");
  qs("#username-value").innerText = "";
  qs("#connection").classList.remove("hide");
});

const numberToFind = Math.floor(Math.random() * Math.floor(100));
console.log(numberToFind);
const initialNumberOfAttemps = 7;
const isValid = (userNumber) => !/^([0-9]|([1-9][0-9])|100)$/.test(userNumber);
function displayResult(type) {
  qs("#userNumber").value = "";
  qs("#result").innerText = labels[type](...[...arguments].splice(1));
}

let reamainingAttemps = initialNumberOfAttemps;

const labels = {
  RULES: () => "The number to find is between 0 and 100",
  PROMPT: () => "Enter a number",
  INVALID: () => "Your proposition is invalid",
  CONGRATS: (numberToFind, reamainingAttemps) =>
    `Congrats ! The number to find was ${numberToFind}, you find it with ${initialNumberOfAttemps - reamainingAttemps} attemps.`,
  FAIL: (numberToFind) => `Fail ! The number to find was ${numberToFind}`,
  ADVICE: (isLower) => `The number to find is ${isLower ? "lower" : "upper"}`,
};

$proposition = qs("#proposition");
$proposition.addEventListener("submit", (e) => {
  e.preventDefault();
  const userNumber = parseInt(qs("#userNumber").value);
  if (isValid(userNumber)) {
    displayResult("INVALID");
  } else {
    reamainingAttemps--;
    if (userNumber === numberToFind) {
      displayResult("CONGRATS", numberToFind, reamainingAttemps);
    } else {
      if (reamainingAttemps === 0) {
        displayResult("FAIL", numberToFind);
      } else {
        displayResult("ADVICE", userNumber > numberToFind);
      }
    }
  }
});
