const questions = [
    {
      question: "Which is the largest animal in the world?",
      answers: [
        { text: "Shark", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Elephant", correct: false },
        { text: "Giraffe", correct: false },
      ],
    },
    {
      question: "Which is the largest desert in the world?",
      answers: [
        { text: "Sahara Desert", correct: true },
        { text: "Arctic Desert", correct: false },
        { text: "Gobi Desert", correct: false },
        { text: "Karakum Desert", correct: false },
      ],
    },
    {
      question: "Which is the largest continent in the world?",
      answers: [
        { text: "Africa", correct: false },
        { text: "Asia", correct: true },
        { text: "North America", correct: false },
        { text: "Europe", correct: false },
      ],
    },
    {
      question: "Which is the smallest continent in the world?",
      answers: [
        { text: "Africa", correct: false },
        { text: "Antarctica", correct: true },
        { text: "Australia", correct: false },
        { text: "Europe", correct: false },
      ],
    },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionsIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
  
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNO = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNO + "." + currentQuestion.question;
  
    currentQuestion.answers.forEach( answer  => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if(answer.correct){

        button.dataset.correct=answer.correct;
      }
      button.addEventListener("click",selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect= selectedBtn.dataset.correct==='true';
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
         
    }
    Array.from(answerButtons.children).forEach(button=>{

        if(button.dataset.correct==="true"){
         button.classList.add("correct");
        }
         button.disabled=true;
     })
       nextButton.style.display="block";

  }

  function showScore(){
    resetState();
    questionElement.innerHTML=`you scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
  }

  function handleNextButton(){
    currentQuestionsIndex++;
    if(currentQuestionsIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }


  }


  nextButton.addEventListener("click",()=>{

    if(currentQuestionsIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
  })
  startQuiz();
  