const questions = [
  "Apa mimpi terbesar yang belum tercapai?",
  "Kalau punya alat seperti Doraemon, alat apa yang ingin kamu miliki?",
  "Apa kenangan masa kecil yang paling membahagiakan?",
  "Hal apa yang membuatmu merasa paling dicintai?",
  "Jika bisa pergi ke mana saja dengan pintu ke mana saja, ke mana kita akan pergi bersama?",
  "Apa yang paling kamu sukai tentang kita sebagai pasangan?",
  "Kalau kamu jadi Nobita, apa yang akan kamu minta pada Doraemon hari ini?",
  "Apa momen paling lucu yang pernah kita alami bersama?"
];

const questionElement = document.getElementById("question");
const randomBtn = document.getElementById("randomBtn");
const submitBtn = document.getElementById("submitBtn");
const answerInput = document.getElementById("answerInput");
const answerDisplay = document.getElementById("answerDisplay");
const savedAnswersList = document.getElementById("savedAnswersList");
const emailBtn = document.getElementById("emailBtn");

let savedAnswers = []; 

randomBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  questionElement.textContent = questions[randomIndex];
  answerInput.value = "";
});

submitBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim();
  if (answer) {
    savedAnswers.push(answer); 
    renderAnswers(); 
    answerInput.value = ""; 
    answerDisplay.classList.remove("hidden"); 
  } else {
    alert("Harap tuliskan jawaban Anda terlebih dahulu!");
  }
});


function renderAnswers() {
  savedAnswersList.innerHTML = ""; 
  savedAnswers.forEach((answer, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${answer}`;
    savedAnswersList.appendChild(li);
  });
}

emailBtn.addEventListener("click", () => {
  if (savedAnswers.length === 0) {
    alert("Belum ada jawaban yang disimpan untuk dikirim!");
    return;
  }
  const emailContent = savedAnswers.join("\n"); 
  sendEmail(emailContent);
});


function sendEmail(content) {
  emailjs.init("lYqQQW5neoc7vbF2G"); 
  emailjs
    .send("service_btkbte6", "template_yvw7zr4", {
      message: content,
      to_email: "tyanade59@gmail.com", 
    })
    .then(
      () => {
        alert("Jawaban berhasil dikirim ke email!");
      },
      (error) => {
        console.error("Gagal mengirim email:", error);
        alert("Terjadi kesalahan saat mengirim email.");
      }
    );
}