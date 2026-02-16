$(document).ready(function () {
  const quizData = [
    {
      question: "Which are web development languages?",
      options: ["HTML", "Python", "JavaScript", "CSS"],
      answer: [0, 2, 3],
      type: "multi",
    },
    {
      question: "Which are JavaScript libraries?",
      options: ["React", "Angular", "Laravel", "jQuery"],
      answer: [0, 1, 3],
      type: "multi",
    },
    {
      question: "Which are CSS frameworks?",
      options: ["Bootstrap", "Tailwind", "Django", "Bulma"],
      answer: [0, 1, 3],
      type: "multi",
    },
    {
      question: "Which CSS property changes text color?",
      options: ["font-color", "text-color", "color", "bg-color"],
      answer: [2],
      type: "single",
    },
    {
      question: "Which symbol is used for ID selector?",
      options: [".", "#", "*", "&"],
      answer: [1],
      type: "single",
    },
  ];

  let currentQuestion = 0;
  let score = 0;
  let selectedAnswers = [];
  let timer;
  let timeLeft = 60;

  $("#startBtn").click(function () {
    $("#startScreen").addClass("d-none");
    $("#quizScreen").removeClass("d-none");
    loadQuestion();
  });

  function loadQuestion() {
    clearInterval(timer);
    selectedAnswers = [];
    $("#options").empty();
    $("#nextBtn").addClass("d-none");

    const q = quizData[currentQuestion];
    $("#question").text(q.question);
    $("#questionCount").text(
      `Question ${currentQuestion + 1} / ${quizData.length}`
    );

    q.options.forEach((opt, i) => {
      $("#options").append(
        `<div class="option" data-index="${i}">${opt}</div>`
      );
    });

    startTimer();
  }

  $(document).on("click", ".option", function () {
    const index = $(this).data("index");
    const type = quizData[currentQuestion].type;

    if (type === "single") {
      $(".option").removeClass("selected");
      selectedAnswers = [index];
      $(this).addClass("selected");
      $("#nextBtn").removeClass("d-none");
    } else {
      $(this).toggleClass("selected");
      if (selectedAnswers.includes(index)) {
        selectedAnswers = selectedAnswers.filter((i) => i !== index);
      } else {
        selectedAnswers.push(index);
      }
      $("#nextBtn").removeClass("d-none");
    }
  });

  $("#nextBtn").click(function () {
    clearInterval(timer);

    const correct = quizData[currentQuestion].answer.sort().toString();
    const selected = selectedAnswers.sort().toString();

    if (correct === selected) score++;

    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      $("#quizScreen").addClass("d-none");
      $("#resultScreen").removeClass("d-none");
      $("#score").text(`${score} / ${quizData.length}`);
    }
  });

  $("#restartBtn").click(function () {
    currentQuestion = 0;
    score = 0;
    $("#resultScreen").addClass("d-none");
    $("#startScreen").removeClass("d-none");
  });

  function startTimer() {
    timeLeft = 60;
    $("#timer").text(`⏱ ${timeLeft}`);
    timer = setInterval(() => {
      timeLeft--;
      $("#timer").text(`⏱ ${timeLeft}`);
      if (timeLeft === 0) {
        clearInterval(timer);
        $("#nextBtn").removeClass("d-none");
      }
    }, 1000);
  }
});
