const scenes = [
  "С того момента как ты стала моей женой, моя жизнь обрела настоящий смысл 💖",
  "Ты делаешь меня сильнее, спокойнее и счастливее просто тем что ты рядом",
  "В твоих объятиях я чувствую себя дома, в твоём взгляде я нахожу всё что мне нужно",
  "Я каждый день люблю тебя только сильнее и сильнее, моё Золотце",
  "Позволь мне устроить для нас особенный вечер"
];

let current = 0;
let isFinal = false;

const envelope = document.getElementById("envelope");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const card = document.getElementById("card");
const text = document.getElementById("text");
const buttons = document.getElementById("buttons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const final = document.getElementById("final");

/* Открытие */
envelope.addEventListener("click", () => {
  envelopeWrapper.style.display = "none";
  updateSlide();
});

function updateSlide() {

  if (isFinal) return; // 🚫 Блокируем если финал

  text.innerHTML = scenes[current];

  if (current === scenes.length - 1) {
    buttons.classList.remove("hidden");
  } else {
    buttons.classList.add("hidden");
  }
}

/* Перелистывание */
card.addEventListener("click", (e) => {

  if (isFinal) return; // 🚫 Полностью отключаем после финала

  const width = card.clientWidth;
  const clickX = e.offsetX;

  if (clickX > width / 2) {
    if (current < scenes.length - 1) {
      current++;
      updateSlide();
    }
  } else {
    if (current > 0) {
      current--;
      updateSlide();
    }
  }
});

/* Убегающая кнопка */
noBtn.addEventListener("mouseenter", () => {
  noBtn.style.transform =
    `translate(${Math.random()*200-50}px, ${Math.random()*80-30}px)`;
});

/* Финал */
yesBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  isFinal = true;            // ✅ Включаем режим финала
  text.innerHTML = "";       // ✅ Удаляем текст
  buttons.classList.add("hidden");
  final.classList.remove("hidden");
});
