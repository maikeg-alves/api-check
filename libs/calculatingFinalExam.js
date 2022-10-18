const CalculatingFinalExam = (gabarito, respostas, yaer) => {
  const materias = [
    {
      id: 1,
      name: "Ciências da Natureza e suas Tecnologias",
      color: "#cf86e6",
      acertos: [],
      erros: [],
    },
    {
      id: 2,
      name: "Matemática e suas Tecnologias",
      color: "#e6e686",
      acertos: [],
      erros: [],
    },
    {
      id: 3,
      name: "Linguagens, Códigos e suas Tecnologias",
      color: "#86cee6",
      acertos: [],
      erros: [],
    },
    {
      id: 4,
      name: "Ciências Humanas e suas Tecnologias",
      color: "#86e6a0",
      acertos: [],
      erros: [],
    },
    {
      acertostotais: 0,
      errostotais: 0,
      aprovadas: [],
      reprovadas: [],
    },
  ];

  const UserAnswers = respostas;

  const gabaritoprova = gabarito[0][yaer];

  if (gabaritoprova.length > 0 && UserAnswers.length > 0) {
    for (let i = 0; i < gabaritoprova.length; i++) {
      for (let j = 0; j < gabaritoprova[i].length; j++) {
        if (gabaritoprova[i][j].letter === UserAnswers[i][j].letter) {
          materias[i].acertos.push(UserAnswers[i][j]);
        } else {
          materias[i].erros.push(UserAnswers[i][j]);
        }
      }
    }
  }

  if (materias !== undefined) {
    for (let i = 0; i < 4; i++) {
      materias[4].acertostotais += materias[i].acertos.length;
      materias[4].errostotais += materias[i].erros.length;
      if (materias[i].acertos.length > 15) {
        materias[4].aprovadas.push(materias[i].name);
      } else {
        materias[4].reprovadas.push(materias[i].name);
      }
    }
  }

  return materias;
};

export default CalculatingFinalExam;
