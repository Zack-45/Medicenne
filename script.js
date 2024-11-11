// Gestion des onglets
document.querySelectorAll('.navbar a').forEach(tab => {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.remove('active');
    });
    document.querySelector(`#${this.getAttribute('href').substring(1)}`).classList.add('active');
  });
});

// Ajout des questions et réponses
const questionForm = document.getElementById('questionForm');
questionForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const questionText = document.getElementById('questionText').value;
  const answers = [];
  for (let i = 1; i <= 5; i++) {
    const answer = document.getElementById(`answer${i}`).value;
    const isCorrect = document.querySelector(`input[name="correctAnswer${i}"]:checked`);
    answers.push({ answer, isCorrect: isCorrect ? true : false });
  }

  const ue = document.getElementById('ue').value;
  const qcmType = document.getElementById('qcmType').value;

  // Sauvegarder la question dans une structure ou une base de données
  console.log({ questionText, answers, ue, qcmType });

  alert('Question ajoutée !');
});

// Soumettre un QCM pour le test
const answerForm = document.getElementById('answerForm');
answerForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const questionsList = document.getElementById('questionsList');
  const answers = [...questionsList.querySelectorAll('input:checked')];
  const totalQuestions = questionsList.querySelectorAll('input[type="checkbox"]').length;
  const correctAnswers = answers.filter(input => input.getAttribute('data-correct') === 'true').length;

  let score = 0;
  if (correctAnswers === totalQuestions) {
    score = 1; // Tout bon
  } else if (totalQuestions - correctAnswers === 1) {
    score = 0.5; // 1 faute
  } else if (totalQuestions - correctAnswers === 2) {
    score = 0.2; // 2 fautes
  } else {
    score = 0; // 3 fautes ou plus
  }

  document.getElementById('score').textContent = `Votre score : ${score}/1`;
});

// Fonction pour afficher les questions à répondre
function loadQuestions() {
  const questions = [
    // Exemple de questions, à remplacer par celles sauvegardées dans Firestore ou autre
    {
      text: "Les valves atrio-ventriculaires sont fermées lors de la systole ?",
      answers: [
        { text: "Vrai", correct: true },
        { text: "Faux", correct: false },
      ]
    },
    {
      text: "Le cœur droit envoie le sang vers la circulation systémique ?",
      answers: [
        { text: "Vrai", correct: false },
        { text: "Faux", correct: true },
      ]
    }
  ];

  const questionsList = document.getElementById('questionsList');
  questions.forEach(question => {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
      <p>${question.text}</p>
      ${question.answers.map((answer, index) => `
        <label>
          <input type="checkbox" data-correct="${answer.correct}" name="answer${index}" /> ${answer.text}
        </label>
        <br />
      `).join('')}
    `;
    questionsList.appendChild(questionElement);
  });
}

loadQuestions();
