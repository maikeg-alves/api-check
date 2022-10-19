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
    "QUESTOALTERNATIVA",
    "QUESTÃO",
    "ALTERNATIVA",
    "questão",
    "alternativa",
  ];

  const respostas = [];

  //excluindo strings da lista de respostas
  for (let i = 0; i < array.length; i++) {
    if (!excluidStrings.includes(array[i])) {
      respostas.push(array[i]);
    }
  }

  const value = [];

  respostas.map(async (element) => {
    if (element.length > 0) {
      const namberform = (element) => {
        const n = element.match(/\d+/g); //✅
        if (n !== null) {
          return n;
        }
      };

      const number = namberform(element);

      const letter = element.match(/[a-zA-Z]/g); //✅

      if (number !== undefined && letter !== undefined) {
        const numberString = number ? number.join("") : ""; //✅

        const letterString = letter ? letter.join("") : "X"; //

        const numberFilter = numberString.replace(/[^0-9]/g, ""); //✅

        const letterFilter = letterString.replace(/[^A-Z]/gi, "").toUpperCase(); //✅

        for (let i = 0; i < letterFilter.length; i++) {
          value.push({
            number: numberFilter,
            letter: letterFilter[i],
          });
        }
      }
    }
  });

  const prova1 = value.slice(0, 30);
  const prova2 = value.slice(30, 60);
  const prova3 = value.slice(60, 90);
  const prova4 = value.slice(90, 120);

  const gabarito = [prova1, prova2, prova3, prova4];

  return gabarito;
};

export default formattingAnswerKeyUser;
