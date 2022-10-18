const formattingAnswerKeyUser = (array) => {
  const excluidStrings = [
    "Matemática",
    "e",
    "suas",
    "Tecnologias",
    "Prova",
    "II",
    "-",
    "Manhã",
    "Linguagens",
    "Ciências",
    "da",
    "Natureza",
    "/",
    "I",
    "Códigos",
    "Tecnologias,",
    "Redação",
    "III",
    "Tarde",
    "----------------Page",
    "(1)",
    "",
    "(0)",
    "Break----------------",
    "Linguagens,",
    "Humanas",
    "IV",
    "(2)",
    "(3)",
  ];

  const respostas = [];

  //excluindo strings da lista de respostas
  for (let i = 0; i < array.length; i++) {
    if (!excluidStrings.includes(array[i])) {
      respostas.push(array[i]);
    }
  }

  // separando respostas por prova e por questão

  respostas.forEach((element) => {
    if (element.length > 0) {
      const number = element.match(/\d+/g); //✅

      const letter = element.match(/[A-Z]+/g); //✅

      const numberString = number ? number.join("") : ""; //✅

      const letterString = letter ? letter.join("") : ""; //✅

      const numberFilter = numberString.replace(/[^0-9]/g, ""); //✅

      const letterFilter = letterString.replace(/[^a-z]/gi, ""); //✅

      const letterFilterUpper = letterFilter.toUpperCase(); //✅

      for (let i = 0; i < letterString.length; i++) {
        if (numberString == "" || letterString == "") {
          break;
        }
        respostas.push({
          number: numberFilter,
          letter: letterFilterUpper[i],
        });
      }
    }
  });

  const prova1 = respostas.slice(0, 30);
  const prova2 = respostas.slice(30, 60);
  const prova3 = respostas.slice(60, 90);
  const prova4 = respostas.slice(90, 120);

  const patientObject = [prova1, prova2, prova3, prova4];

  const numberQuestions = patientObject.map((patient) => {
    return patient.map((question) => {
      return question.slice(0, -1);
    });
  });

  const letterAnswers = patientObject.map((patient) => {
    return patient.map((question) => {
      return question.slice(-1);
    });
  });

  const respostasObject = numberQuestions.map((patient, index) => {
    return patient.map((question, index2) => {
      return {
        number: question,
        letter: letterAnswers[index][index2],
      };
    });
  });

  return respostasObject;
};

export default formattingAnswerKeyUser;
