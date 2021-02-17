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

module.exports = {
  rules,
  passwordStrength,
};
