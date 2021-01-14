const hasMaj = word => word.match(/[A-Z]/);
const hasMin = word => word.match(/[a-z]/);
const hasAlpha = word => word.match(/\W/);
const hasNumber = word => word.match(/\d/);
const isMoreThan8 = word => word.length > 8;
export const processPasswordStrength = word =>
  Object.values({
    hasMaj: hasMaj(word),
    hasMin: hasMin(word),
    hasAlpha: hasAlpha(word),
    hasNumber: hasNumber(word),
    isMoreThan8: isMoreThan8(word)
  }).filter(Boolean).length;
