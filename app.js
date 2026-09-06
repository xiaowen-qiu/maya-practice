let words = [];
let currentIndex = 0;
let audio = null;

let practiceAgain = [];
let practiceWords = [];

let language = localStorage.getItem("mayaLanguage") || "en";

const translations = {
  en: {
    title: "Maya Practice",
    week1: "WEEK 1",
    sounds: "Sounds & Pronunciation",
    reviewClass: "Review the sounds we practiced in class.",

    learn: "Learn",
    practice: "Practice",

    learnLabel: "Week 1 · Learn",
    practiceLabel: "Week 1 · Practice",

    listenFirst: "Listen first",
    listen: "🔊 Listen",
    replay: "🔊 Replay",
    showWord: "Show word",
    audioComing: "Audio coming soon",

    previous: "← Previous",
    next: "Next →",
    home: "Home",

    rememberSound: "Do you remember how this sounds?",
    know: "I know it",
    dontKnow: "I don't know",

    listenCheck: "Listen and check yourself.",
    playPronunciation: "🔊 Play pronunciation",
    wasRight: "I was right ✓",
    practiceAgain: "Practice again",

    complete: "Practice Complete",
    practiced: "You practiced",
    words: "words.",
    needMore: "need more practice.",
    difficultAgain: "Practice difficult words again",
    practiceAllAgain: "Practice all again",
    greatJob: "Great job — no difficult words this round."
  },

  es: {
    title: "Práctica de maya",
    week1: "SEMANA 1",
    sounds: "Sonidos y pronunciación",
    reviewClass: "Repasa los sonidos que practicamos en clase.",

    learn: "Aprender",
    practice: "Practicar",

    learnLabel: "Semana 1 · Aprender",
    practiceLabel: "Semana 1 · Practicar",

    listenFirst: "Escucha primero",
    listen: "🔊 Escuchar",
    replay: "🔊 Escuchar otra vez",
    showWord: "Ver palabra",
    audioComing: "Audio disponible próximamente",

    previous: "← Anterior",
    next: "Siguiente →",
    home: "Inicio",

    rememberSound: "¿Recuerdas cómo suena?",
    know: "Lo sé",
    dontKnow: "No lo recuerdo",

    listenCheck: "Escucha y comprueba.",
    playPronunciation: "🔊 Escuchar pronunciación",
    wasRight: "Sí, lo dije bien ✓",
    practiceAgain: "Practicar otra vez",

    complete: "Práctica terminada",
    practiced: "Practicaste",
    words: "palabras.",
    needMore: "necesitan más práctica.",
    difficultAgain: "Practicar otra vez las palabras difíciles",
    practiceAllAgain: "Practicar todo otra vez",
    greatJob: "¡Muy bien! No hubo palabras difíciles esta vez."
  }
};

function t(key) {
  return translations[language][key];
}

fetch("words.json?version=" + Date.now())
  .then(response => response.json())
  .then(data => {
    words = data;
    showHome();
  });

function languageSwitcher() {
  return `
    <div class="language-switcher">
      <button class="language-button ${language === "en" ? "active-language" : ""}" data-lang="en">
        EN
      </button>

      <button class="language-button ${language === "es" ? "active-language" : ""}" data-lang="es">
        ES
      </button>
    </div>
  `;
}

function attachLanguageButtons(renderFunction) {
  document.querySelectorAll(".language-button").forEach(button => {
    button.addEventListener("click", () => {
      language = button.dataset.lang;
      localStorage.setItem("mayaLanguage", language);
      renderFunction();
    });
  });
}

function showHome() {
  currentIndex = 0;
  practiceAgain = [];

  document.body.innerHTML = `
    <main>

      ${languageSwitcher()}

      <h1>${t("title")}</h1>

      <section class="week-card">

        <p>${t("week1")}</p>

        <h2>${t("sounds")}</h2>

        <p>${t("reviewClass")}</p>

        <button id="learn-button">
          ${t("learn")}
        </button>

        <button id="practice-button">
          ${t("practice")}
        </button>

      </section>

    </main>
  `;

  attachLanguageButtons(showHome);

  document
    .getElementById("learn-button")
    .addEventListener("click", () => {
      currentIndex = 0;
      showLearnCard();
    });

  document
    .getElementById("practice-button")
    .addEventListener("click", () => {
      currentIndex = 0;
      practiceAgain = [];

      practiceWords = words.filter(word => word.audio);

      showPracticeCard();
    });
}

function showLearnCard() {
  const word = words[currentIndex];

  audio = word.audio
    ? new Audio(word.audio)
    : null;

  document.body.innerHTML = `
    <main>

      ${languageSwitcher()}

      <h1>${t("title")}</h1>

      <div class="practice-info">
        <span>${t("learnLabel")}</span>
        <span>${currentIndex + 1} / ${words.length}</span>
      </div>

      <section class="practice-card">

        <div id="listen-stage">

          ${
            word.audio
              ? `
                <p>${t("listenFirst")}</p>

                <button id="listen-button">
                  ${t("listen")}
                </button>
              `
              : `
                <p class="no-audio">
                  ${t("audioComing")}
                </p>
              `
          }

          <button id="show-button">
            ${t("showWord")}
          </button>

        </div>

        <div
          id="answer-stage"
          style="display: none;"
        ></div>

        <div class="navigation">

          <button id="previous-button">
            ${t("previous")}
          </button>

          <button id="next-button">
            ${t("next")}
          </button>

        </div>

        <button id="home-button">
          ${t("home")}
        </button>

      </section>

    </main>
  `;

  attachLanguageButtons(showLearnCard);

  if (word.audio) {
    document
      .getElementById("listen-button")
      .addEventListener("click", playAudio);
  }

  document
    .getElementById("show-button")
    .addEventListener("click", revealLearnWord);

  document
    .getElementById("previous-button")
    .addEventListener("click", () => {
      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = words.length - 1;
      }

      showLearnCard();
    });

  document
    .getElementById("next-button")
    .addEventListener("click", () => {
      currentIndex++;

      if (currentIndex >= words.length) {
        currentIndex = 0;
      }

      showLearnCard();
    });

  document
    .getElementById("home-button")
    .addEventListener("click", showHome);
}

function revealLearnWord() {
  const word = words[currentIndex];

  const imageHTML = word.image
    ? `<img src="${word.image}" alt="${word.word}">`
    : "";

  const replayHTML = word.audio
    ? `
      <button id="replay-button">
        ${t("replay")}
      </button>
    `
    : `
      <p class="no-audio">
        ${t("audioComing")}
      </p>
    `;

  document
    .getElementById("listen-stage")
    .style.display = "none";

  const answerStage =
    document.getElementById("answer-stage");

  answerStage.innerHTML = `
    ${imageHTML}

    <h2>
      ${highlightTarget(word.word, word.target)}
    </h2>

    ${replayHTML}
  `;

  answerStage.style.display = "block";

  if (word.audio) {
    document
      .getElementById("replay-button")
      .addEventListener("click", playAudio);
  }
}

function showPracticeCard() {
  if (currentIndex >= practiceWords.length) {
    showPracticeResults();
    return;
  }

  const word = practiceWords[currentIndex];

  audio = word.audio
    ? new Audio(word.audio)
    : null;

  const imageHTML = word.image
    ? `<img src="${word.image}" alt="${word.word}">`
    : "";

  document.body.innerHTML = `
    <main>

      ${languageSwitcher()}

      <h1>${t("title")}</h1>

      <div class="practice-info">

        <span>
          ${t("practiceLabel")}
        </span>

        <span>
          ${currentIndex + 1} / ${practiceWords.length}
        </span>

      </div>

      <section class="practice-card">

        ${imageHTML}

        <h2>
          ${highlightTarget(word.word, word.target)}
        </h2>

        <p>
          ${t("rememberSound")}
        </p>

        <div id="decision-stage">

          <button id="know-button">
            ${t("know")}
          </button>

          <button id="dont-know-button">
            ${t("dontKnow")}
          </button>

        </div>

        <div
          id="check-stage"
          style="display: none;"
        ></div>

        <button id="home-button">
          ${t("home")}
        </button>

      </section>

    </main>
  `;

  attachLanguageButtons(showPracticeCard);

  document
    .getElementById("know-button")
    .addEventListener("click", () => {
      revealPracticeAnswer();
    });

  document
    .getElementById("dont-know-button")
    .addEventListener("click", () => {
      addToPracticeAgain(word);
      revealPracticeAnswer();
    });

  document
    .getElementById("home-button")
    .addEventListener("click", showHome);
}

function revealPracticeAnswer() {
  const word = practiceWords[currentIndex];

  document
    .getElementById("decision-stage")
    .style.display = "none";

  const checkStage =
    document.getElementById("check-stage");

  checkStage.innerHTML = `
    <p>
      ${t("listenCheck")}
    </p>

    <button id="play-answer-button">
      ${t("playPronunciation")}
    </button>

    <button id="right-button">
      ${t("wasRight")}
    </button>

    <button id="again-button">
      ${t("practiceAgain")}
    </button>
  `;

  checkStage.style.display = "block";

  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }

  document
    .getElementById("play-answer-button")
    .addEventListener("click", playAudio);

  document
    .getElementById("right-button")
    .addEventListener("click", nextPracticeCard);

  document
    .getElementById("again-button")
    .addEventListener("click", () => {
      addToPracticeAgain(word);
      nextPracticeCard();
    });
}

function nextPracticeCard() {
  currentIndex++;
  showPracticeCard();
}

function addToPracticeAgain(word) {
  const alreadyAdded = practiceAgain.some(
    item => item.id === word.id
  );

  if (!alreadyAdded) {
    practiceAgain.push(word);
  }
}

function showPracticeResults() {
  document.body.innerHTML = `
    <main>

      ${languageSwitcher()}

      <h1>${t("complete")}</h1>

      <section class="practice-card">

        <p>
          ${t("practiced")}
          <strong>${practiceWords.length}</strong>
          ${t("words")}
        </p>

        <p>
          <strong>${practiceAgain.length}</strong>
          ${t("needMore")}
        </p>

        ${
          practiceAgain.length > 0
            ? `
              <button id="practice-again-button">
                ${t("difficultAgain")}
              </button>
            `
            : `
              <p>
                ${t("greatJob")}
              </p>
            `
        }

        <button id="restart-button">
          ${t("practiceAllAgain")}
        </button>

        <button id="home-button">
          ${t("home")}
        </button>

      </section>

    </main>
  `;

  attachLanguageButtons(showPracticeResults);

  if (practiceAgain.length > 0) {
    document
      .getElementById("practice-again-button")
      .addEventListener("click", () => {
        practiceWords = [...practiceAgain];
        practiceAgain = [];
        currentIndex = 0;

        showPracticeCard();
      });
  }

  document
    .getElementById("restart-button")
    .addEventListener("click", () => {
      practiceWords = words.filter(word => word.audio);
      practiceAgain = [];
      currentIndex = 0;

      showPracticeCard();
    });

  document
    .getElementById("home-button")
    .addEventListener("click", showHome);
}

function playAudio() {
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function highlightTarget(word, target) {
  const index = word.indexOf(target);

  if (index === -1) {
    return word;
  }

  const before = word.slice(0, index);

  const highlighted = word.slice(
    index,
    index + target.length
  );

  const after = word.slice(
    index + target.length
  );

  return `
    ${before}
    <span class="target">${highlighted}</span>
    ${after}
  `;
}