let num1 = prompt('Enter number 1:');
let num2 = prompt('Enter number 2:');

num1 = Number(num1);
num2 = Number(num2);

alert(`+ result: ${num1 + num2}`);
alert(`- result: ${num1 - num2}`);
alert(`/ result: ${(num1 / num2).toFixed(2)}`);
alert(`* result: ${num1 * num2}`);
alert(`mod result: ${num1 % num2}`);
const isEven = (num1 + num2) % 2 == 0;
if (isEven) {
  alert('The summation of the numbers is even.');
}

if (num1 === num2) {
  alert('The numbers are equals.');
}
