sessionStorage.setItem("logged", false);

const qs = (selector) => document.querySelector(selector);

const hasMaj = (word) => /[A-Z]/.test(word);
const hasMin = (word) => /[a-z]/.test(word);
const hasSpecial = (word) => word.split("").some((char) => char.charCodeAt(0) >= 33 && char.charCodeAt(0) <= 46);
const hasNumber = (word) => /\d/.test(word);
const isMoreThan8 = (word) => word.length > 8;
const rules = (word) => ({
  hasMaj: hasMaj(word),
  hasMin: hasMin(word),
  hasSpecial: hasSpecial(word),
  hasNumber: hasNumber(word),
  isMoreThan8: isMoreThan8(word),
});

const passwordStrength = (word) => Object.values(rules(word)).filter(Boolean).length;

qs(".login__password").addEventListener("input", (e) => {
  const password = qs(".login__password").value;
  const passwordStrengthValue = passwordStrength(password);
  qs(".password-strength__value").innerHTML = passwordStrengthValue;
  qs(".password-strength__progress").value = passwordStrengthValue;
  qs(".password-strength__bar").style.width = `${passwordStrengthValue * 20}%`;
  qs(".password-strength__bar").style.backgroundColor = `
    rgb(
      ${(255 / 5) * (5 - passwordStrengthValue)}, 
      ${(255 / 5) * passwordStrengthValue}, 
      0
    )`;

  const computedRules = rules(password);
  Object.keys(computedRules).forEach((key) => {
    const $errorMessage = qs(`.login__error--${key}`);
    if (computedRules[key]) {
      $errorMessage.classList.add("hide");
    } else {
      $errorMessage.classList.remove("hide");
    }
  });
});

qs(".login__password--verif").addEventListener("blur", (e) => {
  if (qs(".login__password").value !== qs(".login__password--verif").value) {
    document.querySelector(".login__error--notCorresponding").classList.remove("hide");
    document.querySelector(".login__button").classList.add("hide");
  } else {
    document.querySelector(".login__error--notCorresponding").classList.add("hide");
    if (qs(".password-strength__progress").value === 5) {
      document.querySelector(".login__button").classList.remove("hide");
    } else {
      document.querySelector(".login__button").classList.add("hide");
    }
  }
});

qs(".login__button").addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.setItem("logged", true);
  document.location.href = document.location.href.replace("login", "app");
});
