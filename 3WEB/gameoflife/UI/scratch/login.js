sessionStorage.setItem("logged", false);

const qs = selector => document.querySelector(selector);

qs(".login__button").addEventListener("click", e => {
  e.preventDefault();
  if (
    qs(".login__email").value === "john@axa.fr" &&
    qs(".login__password").value === "password"
  ) {
    sessionStorage.setItem("logged", true);
    document.location.href = document.location.href.replace("login", "app");
  } else {
    document
      .querySelector(".login__error")
      .classList.add("login__error--active");
  }
});

const hasMaj = word => word.match(/[A-Z]/);
const hasMin = word => word.match(/[a-z]/);
const hasAlpha = word => word.match(/\W/);
const hasNumber = word => word.match(/\d/);
const isMoreThan8 = word => word.length > 8;
const passwordStrength = word =>
  Object.values({
    hasMaj: hasMaj(word),
    hasMin: hasMin(word),
    hasAlpha: hasAlpha(word),
    hasNumber: hasNumber(word),
    isMoreThan8: isMoreThan8(word)
  }).filter(Boolean).length;

qs(".login__password").addEventListener("input", e => {
  const passwordStrengthValue = passwordStrength(qs(".login__password").value);
  qs(".password-strength__value").innerHTML = passwordStrengthValue;
  qs(".password-strength__progress").value = passwordStrengthValue;
  qs(".password-strength__bar").style.width = `${passwordStrengthValue * 20}%`;
  qs(".password-strength__bar").style.backgroundColor = `
    rgb(
      ${(255 / 5) * (5 - passwordStrengthValue)}, 
      ${(255 / 5) * passwordStrengthValue}, 
      ${0}
    )`;
});
