const questions = [
  "Apa mimpi terbesar yang belum tercapai?",
  "Kalau punya alat seperti Doraemon, alat apa yang ingin kamu miliki?",
  "Apa kenangan masa kecil yang paling membahagiakan?",
  "Hal apa yang membuatmu merasa paling dicintai?",
  "Bagaimana pendapatmu tentang ?",
  "Apakah ketakutan terbesarmu, dan apa kamu pernah mengatasinya?",
  "Kalau boleh tau dari 2024 - sekarang, kapan kamu merasa paling sedih dan paling bahagia?",
  "Ada ngga kalimat/motivasi yang paling kamu ingat sampai saat ini?"
];

const questionElement = document.getElementById("question");
const randomBtn = document.getElementById("randomBtn");
const submitBtn = document.getElementById("submitBtn");
const finishBtn = document.getElementById("finishBtn");
const answerInput = document.getElementById("answerInput");

let savedAnswers = []; 
let currentQuestionIndex = 0; 


function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    questionElement.textContent = questions[currentQuestionIndex];
  } else {
    questionElement.textContent = "Semua pertanyaan telah selesai dijawab!";
    answerInput.disabled = true; 
    submitBtn.disabled = true; 
  }
}


submitBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim();
  if (answer) {
    savedAnswers.push(answer); 
    answerInput.value = ""; 
    currentQuestionIndex++; 
    displayQuestion(); 
  } else {
    alert("Harap tuliskan jawaban Anda terlebih dahulu!");
  }
});


function sendEmail(content) {
  emailjs.init("asJG_BJeAH52qabUE"); 
  emailjs
    .send("service_btkbte6", "template_yvw7zr4", {
      message: content,
      to_email: "your-email@example.com", 
    })
    .then(
      () => {
        alert("Jawaban berhasil dikirim ke email!");
        window.location.href = "closing.html"; 
      },
      (error) => {
        console.error("Gagal mengirim email:", error);
        alert("Terjadi kesalahan saat mengirim email.");
      }
    );
}

finishBtn.addEventListener("click", () => {
  if (savedAnswers.length === 0) {
    alert("Belum ada jawaban yang disimpan untuk dikirim!");
    return;
  }
  const emailContent = savedAnswers.map((answer, index) => `${index + 1}. ${questions[index]}: ${answer}`).join("\n"); 
  sendEmail(emailContent); 
});


displayQuestion();
