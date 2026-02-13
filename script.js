const scenes = [
  "С того момента как ты стала моей женой, моя жизнь обрела настоящий смысл 💖",
  "Ты делаешь меня сильнее, спокойнее и счастливее просто тем что ты рядом",
  "В твоих объятиях я чувствую себя дома, в твоём взгляде я нахожу всё что мне нужно",
  "Я каждый день люблю тебя только сильнее и сильнее, моё Золотце",
  "Позволь мне устроить для нас особенный вечер"
];

let current = 0;
let isFinal = false;
let escapePower = 1;
let caughtAttempts = 0;

const envelope = document.getElementById("envelope");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const card = document.getElementById("card");
const text = document.getElementById("text");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const final = document.getElementById("final");

/* 💌 Открытие */
envelope.addEventListener("click", () => {
  envelopeWrapper.style.display = "none";
  updateSlide();
});

function updateSlide() {
  if (isFinal) return;

  text.innerHTML = scenes[current];

  if (current === scenes.length - 1) {
    buttons.classList.remove("hidden");
  } else {
    buttons.classList.add("hidden");
  }
}

/* 📖 ТОЛЬКО ВПЕРЁД */
card.addEventListener("click", function(e) {

  if (isFinal) return;

  // если нажали на кнопку — не листаем
  if (e.target.tagName === "BUTTON") return;

  if (current < scenes.length - 1) {
    current++;
    updateSlide();
  }
});

/* 😈 ДВИЖЕНИЕ КНОПКИ (медленнее и мягче) */
function moveNoButton(e) {

  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }

  escapePower += 0.1; // медленнее ускоряется

  // маленькое смещение
  const randomX = (Math.random() - 0.5) * 120 * escapePower;
  const randomY = (Math.random() - 0.5) * 80 * escapePower;

  noBtn.style.transition = "0.3s ease";
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

/* ПК */
noBtn.addEventListener("mouseenter", moveNoButton);

/* Телефон */
noBtn.addEventListener("touchstart", moveNoButton);

/* 💥 Взрыв если поймали 4 раза */
noBtn.addEventListener("click", function(e) {

  e.stopPropagation();
  e.preventDefault();

  caughtAttempts++;

  if (caughtAttempts < 4) {
    moveNoButton();
    return;
  }

  const rect = noBtn.getBoundingClientRect();
  noBtn.classList.add("explode");

  for (let i = 0; i < 20; i++) {

    const heart = document.createElement("div");
    heart.className = "heart-particle";
    heart.innerHTML = "💖";

    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;

    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top + rect.height / 2 + "px";
    heart.style.setProperty("--x", randomX + "px");
    heart.style.setProperty("--y", randomY + "px");

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
  }

  setTimeout(() => {
    noBtn.style.display = "none";
  }, 300);
});

/* 💖 Финал */
yesBtn.addEventListener("click", function(e) {

  e.stopPropagation();

  isFinal = true;
  text.innerHTML = "";
  buttons.classList.add("hidden");
  final.classList.remove("hidden");
});
