const numberToFind = Math.floor(Math.random() * Math.floor(100));

const initialNumberOfAttemps = 7;

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

const askUser = () => parseInt(window.prompt(labels.PROMPT()));

const isValid = (userNumber) => !/^([0-9]|([1-9][0-9])|100)$/.test(userNumber);

function displayResult(type) {
  alert(labels[type](...[...arguments].splice(1)));
}

displayResult("RULES");
while (reamainingAttemps) {
  const userNumber = askUser();
  if (isValid(userNumber)) {
    displayResult("INVALID");
  } else {
    reamainingAttemps--;
    if (userNumber === numberToFind) {
      displayResult("CONGRATS", numberToFind, reamainingAttemps);
      break;
    } else {
      if (reamainingAttemps === 0) {
        displayResult("FAIL", numberToFind);
        break;
      } else {
        displayResult("ADVICE", userNumber > numberToFind);
      }
    }
  }
}
