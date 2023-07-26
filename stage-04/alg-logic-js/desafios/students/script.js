function Student(name, grades) {
  this.name = name;
  this.grades = grades;
  this.average = function () {
    let summation = 0;
    grades.forEach((element) => {
      summation += element;
    });

    return (summation / this.grades.length).toFixed(2);
  };
}

function displayResult(student) {
  let resultMessage = '';
  if (student.average() >= 7) {
    resultMessage = `Parabéns, ${student.name}! Você foi aprovado(a).`;
  } else {
    resultMessage = `Não foi dessa vez, ${student.name}. Tente novamente.`;
  }

  const message = `A média do(a) aluno(a) ${
    student.name
  } é: ${student.average()}\n${resultMessage}`;

  alert(message);
}

const students = [
  new Student('João', [8, 7, 6, 4]),
  new Student('Pedro', [2, 3, 4, 5]),
  new Student('Joana', [7, 8, 5, 6]),
  new Student('Maria', [2, 9, 10, 8]),
  new Student('Paulo', [6, 7, 7, 10]),
];

for (const student of students) {
  displayResult(student);
}
