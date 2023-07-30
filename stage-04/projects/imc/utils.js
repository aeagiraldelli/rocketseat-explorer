export function isNumber(value) {
  if (typeof value === 'string' && value.trim().length === 0) {
    return false;
  }

  value = value.trim().replace(',', '.');
  return !isNaN(value);
}

export function imc(weight, height) {
  return weight / (height * height);
}
