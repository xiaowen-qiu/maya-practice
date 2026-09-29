let words = [];

let conversations = [];

let currentIndex = 0;
let audio = null;

let practiceAgain = [];
let practiceWords = [];

let currentConversation = null;
let conversationLineIndex = 0;

let language =
  localStorage.getItem("mayaLanguage") || "en";


/* ========================================
   TRANSLATIONS
======================================== */

const translations = {

  en: {

    title: "Maya Practice",

    soundLab: "Sound & Word Lab",

    soundLabDescription:
      "Tune your ear, try the sounds, and build with words.",

    learn: "Explore",
    practice: "Practice",

    mayaInAction: "Maya in Action",

    conversationDescription:
      "Listen, respond, and use Maya in everyday moments.",

    conversations: "Conversations",

    learnLabel:
      "Sound & Word Lab · Explore",

    practiceLabel:
      "Sound & Word Lab · Practice",

    listenFirst: "Listen first",

    listen: "▶ Listen",

    replay: "▶ Replay",

    showWord: "Show word",

    audioComing: "Audio coming soon",

    previous: "‹",

    next: "›",

    home: "Home",

    rememberSound:
      "Do you remember how this sounds?",

    know: "I know it",

    dontKnow: "Not yet",

    listenCheck:
      "Listen and check yourself.",

    playPronunciation:
      "▶ Play pronunciation",

    wasRight:
      "I was right ✓",

    practiceAgain:
      "Practice again",

    complete:
      "Practice Complete",

    practiced:
      "You practiced",

    words:
      "words.",

    needMore:
      "need more practice.",

    difficultAgain:
      "Practice difficult words again",

    practiceAllAgain:
      "Practice all again",

    greatJob:
      "Great job — no difficult words this round.",

    chooseConversation:
      "Choose a conversation",

    openConversation:
      "Open conversation",

    conversation1:
      "Everyday Conversation",

    conversation2:
      "Meeting Someone",

    listenFull:
      "▶ Listen to full conversation",

    fullConversation:
      "Full conversation",

    sentenceBySentence:
      "Sentence by sentence",

    maya:
      "Maya",

    spanish:
      "Spanish",

    listenMaya:
      "▶ Listen to Maya",

    listenSpanish:
      "▶ Listen to Spanish",

    backToConversations:
      "Conversations"
  },


  es: {

    title:
      "Práctica de maya",

    soundLab:
      "Laboratorio de sonidos y palabras",

    soundLabDescription:
      "Afina el oído, prueba los sonidos y construye con palabras.",

    learn:
      "Explorar",

    practice:
      "Practicar",

    mayaInAction:
      "Maya en acción",

    conversationDescription:
      "Escucha, responde y usa el maya en momentos cotidianos.",

    conversations:
      "Conversaciones",

    learnLabel:
      "Sonidos y palabras · Explorar",

    practiceLabel:
      "Sonidos y palabras · Practicar",

    listenFirst:
      "Escucha primero",

    listen:
      "▶ Escuchar",

    replay:
      "▶ Escuchar otra vez",

    showWord:
      "Ver palabra",

    audioComing:
      "Audio disponible próximamente",

    previous:
      "‹",

    next:
      "›",

    home:
      "Inicio",

    rememberSound:
      "¿Recuerdas cómo suena?",

    know:
      "Lo sé",

    dontKnow:
      "Todavía no",

    listenCheck:
      "Escucha y comprueba.",

    playPronunciation:
      "▶ Escuchar pronunciación",

    wasRight:
      "Sí, lo dije bien ✓",

    practiceAgain:
      "Practicar otra vez",

    complete:
      "Práctica terminada",

    practiced:
      "Practicaste",

    words:
      "palabras.",

    needMore:
      "necesitan más práctica.",

    difficultAgain:
      "Practicar otra vez las palabras difíciles",

    practiceAllAgain:
      "Practicar todo otra vez",

    greatJob:
      "¡Muy bien! No hubo palabras difíciles esta vez.",

    chooseConversation:
      "Elige una conversación",

    openConversation:
      "Abrir conversación",

    conversation1:
      "Conversación cotidiana",

    conversation2:
      "Conociendo a alguien",

    listenFull:
      "▶ Escuchar la conversación completa",

    fullConversation:
      "Conversación completa",

    sentenceBySentence:
      "Frase por frase",

    maya:
      "Maya",

    spanish:
      "Español",

    listenMaya:
      "▶ Escuchar maya",

    listenSpanish:
      "▶ Escuchar español",

    backToConversations:
      "Conversaciones"
  }

};


function t(key) {
  return translations[language][key];
}


/* ========================================
   SITE NAVIGATION
======================================== */

function siteNavigation() {

  return `

    <nav class="site-nav">

      <div class="nav-inner">

        <button
          id="nav-home"
          class="nav-brand"
          type="button"
        >
          ${t("title")}
        </button>


        <div class="nav-links">

          <button
            id="nav-sound-lab"
            class="nav-link"
            type="button"
          >
            ${t("soundLab")}
          </button>


          <button
            id="nav-maya-action"
            class="nav-link"
            type="button"
          >
            ${t("mayaInAction")}
          </button>

        </div>

      </div>

    </nav>

  `;

}


/*
  Navigation uses event delegation because
  every page is rendered again with innerHTML.
*/

document.addEventListener(
  "click",
  event => {

    const navButton =
      event.target.closest(
        "#nav-home, #nav-sound-lab, #nav-maya-action"
      );


    if (!navButton) {
      return;
    }


    if (
      navButton.id ===
      "nav-maya-action"
    ) {

      showConversationMenu();

      return;
    }


    /*
      Maya Practice and
      Sound & Word Lab
      both return to the main practice hub.
    */

    showHome();

  }
);


/* ========================================
   LOAD DATA
======================================== */

Promise.all([

  fetch(
    "words.json?version=" +
    Date.now()
  )
    .then(
      response =>
        response.json()
    ),


  fetch(
    "conversations.json?version=" +
    Date.now()
  )
    .then(
      response =>
        response.json()
    )

])

  .then(
    ([
      wordData,
      conversationData
    ]) => {

      words =
        wordData;

      conversations =
        conversationData;

      showHome();

    }
  )

  .catch(
    error => {

      console.error(
        "Error loading data:",
        error
      );


      document.body.innerHTML = `

        ${siteNavigation()}

        <main>

          <h1>
            Maya Practice
          </h1>

          <section
            class="practice-card"
          >

            <p>
              There was a problem loading
              the practice data.
            </p>

            <p>
              Please check words.json
              and conversations.json.
            </p>

          </section>

        </main>

      `;

    }
  );


/* ========================================
   LANGUAGE
======================================== */

function languageSwitcher() {

  return `

    <div
      class="language-switcher"
    >

      <button
        class="
          language-button
          ${
            language === "en"
              ? "active-language"
              : ""
          }
        "
        data-lang="en"
      >
        EN
      </button>


      <button
        class="
          language-button
          ${
            language === "es"
              ? "active-language"
              : ""
          }
        "
        data-lang="es"
      >
        ES
      </button>

    </div>

  `;

}


function attachLanguageButtons(
  renderFunction
) {

  document
    .querySelectorAll(
      ".language-button"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            language =
              button.dataset.lang;


            localStorage.setItem(
              "mayaLanguage",
              language
            );


            stopCurrentAudio();

            renderFunction();

          }
        );

      }
    );

}


/* ========================================
   HOME
======================================== */

function showHome() {

  stopCurrentAudio();

  currentIndex = 0;

  practiceAgain = [];


  document.body.innerHTML = `

    ${siteNavigation()}

    <main>

      ${languageSwitcher()}


      <header
        class="home-header"
      >

        <p class="eyebrow">

          ${
            language === "es"
              ? "MAYA EN MOVIMIENTO"
              : "KEEP YOUR MAYA MOVING"
          }

        </p>


        <h1>
          ${t("title")}
        </h1>


        <p class="home-intro">

          ${
            language === "es"
              ? "Escucha, observa, prueba y usa lo que ya sabes."
              : "Listen, notice, try, and use what you know."
          }

        </p>

      </header>


      <!-- SOUND & WORD LAB -->

      <section
        class="week-card"
      >

        <p class="card-label">
          ${t("soundLab")}
        </p>


        <h2>
          Sounds & Pronunciation
        </h2>


        <p
          class="card-description"
        >
          ${t("soundLabDescription")}
        </p>


        <div class="home-actions">

          <button
            id="learn-button"
          >
            ${t("learn")}
          </button>


          <button
            id="practice-button"
            class="secondary-button"
          >
            ${t("practice")}
          </button>

        </div>

      </section>


      <!-- MAYA IN ACTION -->

      <section
        class="week-card"
      >

        <p class="card-label">
          ${t("mayaInAction")}
        </p>


        <h2>

          ${
            language === "es"
              ? "Conversaciones"
              : "Everyday Conversations"
          }

        </h2>


        <p
          class="card-description"
        >
          ${t("conversationDescription")}
        </p>


        <button
          id="conversation-button"
        >
          ${t("conversations")}
        </button>

      </section>

    </main>

  `;


  attachLanguageButtons(
    showHome
  );


  document
    .getElementById(
      "learn-button"
    )
    .addEventListener(
      "click",
      () => {

        currentIndex = 0;

        showLearnCard();

      }
    );


  document
    .getElementById(
      "practice-button"
    )
    .addEventListener(
      "click",
      () => {

        currentIndex = 0;

        practiceAgain = [];


        practiceWords =
          words.filter(
            word =>
              word.audio
          );


        showPracticeCard();

      }
    );


  document
    .getElementById(
      "conversation-button"
    )
    .addEventListener(
      "click",
      showConversationMenu
    );

}


/* ========================================
   WORD LEARN MODE
======================================== */

function showLearnCard() {

  stopCurrentAudio();


  const word =
    words[currentIndex];


  audio =
    word.audio
      ? new Audio(
          word.audio
        )
      : null;


  document.body.innerHTML = `

    ${siteNavigation()}

    <main>

      ${languageSwitcher()}


      <h1>
        ${t("title")}
      </h1>


      <div
        class="practice-info"
      >

        <span>
          ${t("learnLabel")}
        </span>


        <span>

          ${currentIndex + 1}
          /
          ${words.length}

        </span>

      </div>


      <section
        class="practice-card"
      >

        <div
          id="listen-stage"
        >

          ${
            word.audio

              ? `

                <p>
                  ${t("listenFirst")}
                </p>


                <button
                  id="listen-button"
                >
                  ${t("listen")}
                </button>

              `

              : `

                <p
                  class="no-audio"
                >
                  ${t("audioComing")}
                </p>

              `
          }


          <button
            id="show-button"
          >
            ${t("showWord")}
          </button>

        </div>


        <div
          id="answer-stage"
          style="display: none;"
        ></div>


        <div
          class="navigation"
        >

          <button
            id="previous-button"
          >
            ${t("previous")}
          </button>


          <button
            id="next-button"
          >
            ${t("next")}
          </button>

        </div>


        <button
          id="home-button"
        >
          ${t("home")}
        </button>

      </section>

    </main>

  `;


  attachLanguageButtons(
    showLearnCard
  );


  if (word.audio) {

    document
      .getElementById(
        "listen-button"
      )
      .addEventListener(
        "click",
        playAudio
      );

  }


  document
    .getElementById(
      "show-button"
    )
    .addEventListener(
      "click",
      revealLearnWord
    );


  document
    .getElementById(
      "previous-button"
    )
    .addEventListener(
      "click",
      () => {

        currentIndex--;


        if (
          currentIndex < 0
        ) {

          currentIndex =
            words.length - 1;

        }


        showLearnCard();

      }
    );


  document
    .getElementById(
      "next-button"
    )
    .addEventListener(
      "click",
      () => {

        currentIndex++;


        if (
          currentIndex >=
          words.length
        ) {

          currentIndex = 0;

        }


        showLearnCard();

      }
    );


  document
    .getElementById(
      "home-button"
    )
    .addEventListener(
      "click",
      showHome
    );

}


/* ========================================
   REVEAL LEARN WORD
======================================== */

function revealLearnWord() {

  const word =
    words[currentIndex];


  const imageHTML =

    word.image

      ? `

        <img
          src="${word.image}"
          alt="${word.word}"
        >

      `

      : "";


  const replayHTML =

    word.audio

      ? `

        <button
          id="replay-button"
        >
          ${t("replay")}
        </button>

      `

      : `

        <p
          class="no-audio"
        >
          ${t("audioComing")}
        </p>

      `;


  document
    .getElementById(
      "listen-stage"
    )
    .style.display =
      "none";


  const answerStage =
    document.getElementById(
      "answer-stage"
    );


  answerStage.innerHTML = `

    ${imageHTML}


    <h2>

      ${highlightTarget(
        word.word,
        word.target
      )}

    </h2>


    ${replayHTML}

  `;


  answerStage.style.display =
    "block";


  if (word.audio) {

    document
      .getElementById(
        "replay-button"
      )
      .addEventListener(
        "click",
        playAudio
      );

  }

}
/* ========================================
   WORD PRACTICE MODE
======================================== */

function showPracticeCard() {

  stopCurrentAudio();


  if (
    currentIndex >=
    practiceWords.length
  ) {

    showPracticeResults();

    return;

  }


  const word =
    practiceWords[currentIndex];


  audio =
    word.audio
      ? new Audio(word.audio)
      : null;


  const imageHTML =

    word.image

      ? `

        <img
          src="${word.image}"
          alt="${word.word}"
        >

      `

      : "";


  document.body.innerHTML = `

    ${siteNavigation()}

    <main>

      ${languageSwitcher()}


      <h1>
        ${t("title")}
      </h1>


      <div class="practice-info">

        <span>
          ${t("practiceLabel")}
        </span>


        <span>
          ${currentIndex + 1}
          /
          ${practiceWords.length}
        </span>

      </div>


      <section class="practice-card">

        ${imageHTML}


        <h2>

          ${highlightTarget(
            word.word,
            word.target
          )}

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


  attachLanguageButtons(
    showPracticeCard
  );


  document
    .getElementById(
      "know-button"
    )
    .addEventListener(
      "click",
      () => {

        revealPracticeAnswer();

      }
    );


  document
    .getElementById(
      "dont-know-button"
    )
    .addEventListener(
      "click",
      () => {

        addToPracticeAgain(word);

        revealPracticeAnswer();

      }
    );


  document
    .getElementById(
      "home-button"
    )
    .addEventListener(
      "click",
      showHome
    );

}


/* ========================================
   REVEAL PRACTICE ANSWER
======================================== */

function revealPracticeAnswer() {

  const word =
    practiceWords[currentIndex];


  document
    .getElementById(
      "decision-stage"
    )
    .style.display =
      "none";


  const checkStage =
    document.getElementById(
      "check-stage"
    );


  checkStage.innerHTML = `

    <p>
      ${t("listenCheck")}
    </p>


    <button
      id="play-answer-button"
    >
      ${t("playPronunciation")}
    </button>


    <button
      id="right-button"
    >
      ${t("wasRight")}
    </button>


    <button
      id="again-button"
    >
      ${t("practiceAgain")}
    </button>

  `;


  checkStage.style.display =
    "block";


  /*
    Play the teacher model automatically
    once the learner checks the answer.
  */

  if (audio) {

    audio.currentTime = 0;

    audio
      .play()
      .catch(
        error => {

          console.error(
            "Audio playback error:",
            error
          );

        }
      );

  }


  document
    .getElementById(
      "play-answer-button"
    )
    .addEventListener(
      "click",
      playAudio
    );


  document
    .getElementById(
      "right-button"
    )
    .addEventListener(
      "click",
      nextPracticeCard
    );


  document
    .getElementById(
      "again-button"
    )
    .addEventListener(
      "click",
      () => {

        addToPracticeAgain(word);

        nextPracticeCard();

      }
    );

}


/* ========================================
   NEXT PRACTICE CARD
======================================== */

function nextPracticeCard() {

  currentIndex++;

  showPracticeCard();

}


/* ========================================
   SAVE FOR ANOTHER TRY
======================================== */

function addToPracticeAgain(word) {

  const alreadyAdded =
    practiceAgain.some(
      item =>
        item.id === word.id
    );


  if (!alreadyAdded) {

    practiceAgain.push(word);

  }

}


/* ========================================
   PRACTICE RESULTS
======================================== */

function showPracticeResults() {

  stopCurrentAudio();


  document.body.innerHTML = `

    ${siteNavigation()}

    <main>

      ${languageSwitcher()}


      <h1>
        ${t("complete")}
      </h1>


      <section class="practice-card">

        <p>

          ${t("practiced")}

          <strong>
            ${practiceWords.length}
          </strong>

          ${t("words")}

        </p>


        <p>

          <strong>
            ${practiceAgain.length}
          </strong>

          ${t("needMore")}

        </p>


        ${
          practiceAgain.length > 0

            ? `

              <button
                id="practice-again-button"
              >
                ${t("difficultAgain")}
              </button>

            `

            : `

              <p>
                ${t("greatJob")}
              </p>

            `
        }


        <button
          id="restart-button"
        >
          ${t("practiceAllAgain")}
        </button>


        <button
          id="home-button"
        >
          ${t("home")}
        </button>

      </section>

    </main>

  `;


  attachLanguageButtons(
    showPracticeResults
  );


  if (
    practiceAgain.length > 0
  ) {

    document
      .getElementById(
        "practice-again-button"
      )
      .addEventListener(
        "click",
        () => {

          practiceWords =
            [...practiceAgain];

          practiceAgain = [];

          currentIndex = 0;

          showPracticeCard();

        }
      );

  }


  document
    .getElementById(
      "restart-button"
    )
    .addEventListener(
      "click",
      () => {

        practiceWords =
          words.filter(
            word =>
              word.audio
          );

        practiceAgain = [];

        currentIndex = 0;

        showPracticeCard();

      }
    );


  document
    .getElementById(
      "home-button"
    )
    .addEventListener(
      "click",
      showHome
    );

}


/* ========================================
   CONVERSATION MENU
======================================== */

function showConversationMenu() {

  stopCurrentAudio();


  document.body.innerHTML = `

    ${siteNavigation()}

    <main>

      ${languageSwitcher()}


      <header>

        <p class="eyebrow">

          ${
            language === "es"
              ? "ESCUCHA · RESPONDE · USA"
              : "LISTEN · RESPOND · USE"
          }

        </p>


        <h1>
          ${t("mayaInAction")}
        </h1>


        <p class="home-intro">
          ${t("chooseConversation")}
        </p>

      </header>


      <!-- CONVERSATION 1 -->

      <section class="week-card">

        <p class="card-label">
          ${t("mayaInAction")}
        </p>


        <h2>
          ${t("conversation1")}
        </h2>


        <p class="card-description">

          ${
            language === "es"

              ? "Escucha cómo fluye la conversación y explórala frase por frase."

              : "Hear how the conversation flows, then explore it line by line."
          }

        </p>


        <button
          id="conversation-1-button"
        >

          ${t("openConversation")}

        </button>

      </section>


      <!-- CONVERSATION 2 -->

      <section class="week-card">

        <p class="card-label">
          ${t("mayaInAction")}
        </p>


        <h2>
          ${t("conversation2")}
        </h2>


        <p class="card-description">

          ${
            language === "es"

              ? "Escucha cada expresión en maya y usa el español como apoyo cuando lo necesites."

              : "Listen to each Maya expression and use Spanish as support when you need it."
          }

        </p>


        <button
          id="conversation-2-button"
        >

          ${t("openConversation")}

        </button>

      </section>


      <button id="home-button">
        ${t("home")}
      </button>

    </main>

  `;


  attachLanguageButtons(
    showConversationMenu
  );


  document
    .getElementById(
      "conversation-1-button"
    )
    .addEventListener(
      "click",
      () => {

        openConversation(
          "c01"
        );

      }
    );


  document
    .getElementById(
      "conversation-2-button"
    )
    .addEventListener(
      "click",
      () => {

        openConversation(
          "c02"
        );

      }
    );


  document
    .getElementById(
      "home-button"
    )
    .addEventListener(
      "click",
      showHome
    );

}


/* ========================================
   OPEN CONVERSATION
======================================== */

function openConversation(id) {

  currentConversation =
    conversations.find(
      conversation =>
        conversation.id === id
    );


  conversationLineIndex = 0;


  if (!currentConversation) {

    console.error(
      "Conversation not found:",
      id
    );

    return;

  }


  if (id === "c01") {

    showConversationOne();

  } else {

    showConversationTwo();

  }

}


/* ========================================
   CONVERSATION 1
======================================== */

function showConversationOne() {

  stopCurrentAudio();


  const conversation =
    currentConversation;


  document.body.innerHTML = `

    ${siteNavigation()}

    <main>

      ${languageSwitcher()}


      <header>

        <p class="eyebrow">
          ${t("mayaInAction")}
        </p>


        <h1>

          ${
            conversation.title[language] ||
            conversation.title.en
          }

        </h1>

      </header>


      <!-- FULL CONVERSATION -->

      <section
        class="practice-card"
      >

        <div
          class="conversation-utterance-row"
        >

          <h3
            style="
              flex: 1;
              margin: 0;
              text-align: left;
            "
          >
            ${t("fullConversation")}
          </h3>


          ${
            conversation.fullAudio

              ? `

                <button
                  id="full-conversation-button"
                  class="inline-audio-button"
                  aria-label="Play full conversation"
                  title="Play"
                >
                  ▶
                </button>

              `

              : ""
          }

        </div>

      </section>


      <!-- LINE BY LINE -->

      <section
        class="practice-card"
      >

        <h3
          style="
            margin-top: 0;
            text-align: left;
          "
        >
          ${t("sentenceBySentence")}
        </h3>


        <div
          class="conversation-transcript"
        >

          ${
            conversation.lines
              .map(
                (line, index) => `

                  <div
                    class="conversation-line"
                    data-line-index="${index}"
                  >

                    <div
                      class="conversation-speaker"
                    >
                      ${line.speaker}
                    </div>


                    <div
                      class="conversation-text"
                    >
                      ${line.maya}
                    </div>


                    <button
                      class="line-audio-button"
                      data-index="${index}"
                      aria-label="Play line ${index + 1}"
                      title="Play"
                    >
                      ▶
                    </button>

                  </div>

                `
              )
              .join("")
          }

        </div>

      </section>


      <button id="back-button">
        ${t("backToConversations")}
      </button>


      <button id="home-button">
        ${t("home")}
      </button>

    </main>

  `;


  attachLanguageButtons(
    showConversationOne
  );


  /* ----------------------------------------
     Full conversation audio
  ---------------------------------------- */

  if (
    conversation.fullAudio
  ) {

    document
      .getElementById(
        "full-conversation-button"
      )
      .addEventListener(
        "click",
        () => {

          playPath(
            conversation.fullAudio
          );

        }
      );

  }


  /* ----------------------------------------
     Individual line audio + sentence highlight
  ---------------------------------------- */

  document
    .querySelectorAll(
      ".line-audio-button"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const index =
              Number(
                button.dataset.index
              );


            const selectedLine =
              conversation.lines[index];


            /*
              Remove an old highlight first.
            */

            document
              .querySelectorAll(
                ".conversation-line"
              )
              .forEach(
                lineElement => {

                  lineElement
                    .classList
                    .remove(
                      "active-line"
                    );

                }
              );


            const activeLine =
              button.closest(
                ".conversation-line"
              );


            if (activeLine) {

              activeLine
                .classList
                .add(
                  "active-line"
                );

            }


            /*
              We create this Audio object here
              so we can remove the highlight
              exactly when the teacher audio ends.
            */

            stopCurrentAudio();


            audio =
              new Audio(
                selectedLine.audio
              );


            audio.addEventListener(
              "ended",
              () => {

                if (activeLine) {

                  activeLine
                    .classList
                    .remove(
                      "active-line"
                    );

                }

              }
            );


            audio
              .play()
              .catch(
                error => {

                  if (activeLine) {

                    activeLine
                      .classList
                      .remove(
                        "active-line"
                      );

                  }


                  console.error(
                    "Audio playback error:",
                    selectedLine.audio,
                    error
                  );

                }
              );

          }
        );

      }
    );


  document
    .getElementById(
      "back-button"
    )
    .addEventListener(
      "click",
      showConversationMenu
    );


  document
    .getElementById(
      "home-button"
    )
    .addEventListener(
      "click",
      showHome
    );

}
/* ========================================
   CONVERSATION 2
======================================== */

function showConversationTwo() {

  stopCurrentAudio();


  const conversation =
    currentConversation;


  const line =
    conversation.lines[
      conversationLineIndex
    ];


  document.body.innerHTML = `

    ${siteNavigation()}

    <main>

      ${languageSwitcher()}


      <header>

        <p class="eyebrow">
          ${t("mayaInAction")}
        </p>


        <h1>

          ${
            conversation.title[language] ||
            conversation.title.en
          }

        </h1>

      </header>


      <div class="practice-info">

        <span>
          ${
            language === "es"
              ? "Escucha · Prueba · Usa"
              : "Listen · Try · Use"
          }
        </span>


        <span>
          ${conversationLineIndex + 1}
          /
          ${conversation.lines.length}
        </span>

      </div>


      <section
        class="practice-card conversation-practice-card"
      >


        <!-- MAYA -->

        <div class="maya-utterance">


          <div
            class="conversation-utterance-row"
          >


            <h2
              id="maya-follow-text"
            >

              ${
                line.id === "c02-01"

                  ? `

                    <span
                      class="follow-word"
                      data-start="0.00"
                      data-end="0.70"
                    >Ma’alob</span>

                    <span
                      class="follow-word"
                      data-start="0.70"
                      data-end="1.25"
                    >k’iin,</span>

                    <span
                      class="follow-word"
                      data-start="1.25"
                      data-end="2.50"
                    >xch’úupal</span>

                  `

                  : line.maya
              }

            </h2>


            <button
              id="maya-audio-button"
              class="inline-audio-button"
              aria-label="Play Maya audio"
              title="Play"
            >
              ▶
            </button>


          </div>


        </div>


        <!-- SPANISH SUPPORT -->

        ${
          line.spanish

            ? `

              <div
                class="meaning-support"
              >


                <div
                  class="translation-row"
                >


                  <p
                    class="conversation-translation"
                  >
                    ${line.spanish}
                  </p>


                  ${
                    line.spanishAudio

                      ? `

                        <button
                          id="spanish-audio-button"
                          class="inline-audio-button"
                          aria-label="Play Spanish audio"
                          title="Play"
                        >
                          ▶
                        </button>

                      `

                      : ""
                  }


                </div>


              </div>

            `

            : ""
        }


        <!-- PREVIOUS / NEXT -->

        <div class="navigation">


          <button
            id="previous-button"
            aria-label="Previous line"
            title="Previous"
          >
            ${t("previous")}
          </button>


          <button
            id="next-button"
            aria-label="Next line"
            title="Next"
          >
            ${t("next")}
          </button>


        </div>


      </section>


      <button
        id="back-button"
      >
        ${t("backToConversations")}
      </button>


      <button
        id="home-button"
      >
        ${t("home")}
      </button>


    </main>

  `;


  attachLanguageButtons(
    showConversationTwo
  );


  /* ======================================
     MAYA AUDIO
     + MOVING WORD HIGHLIGHT
  ====================================== */

  const mayaAudioButton =
    document.getElementById(
      "maya-audio-button"
    );


  if (
    mayaAudioButton &&
    line.mayaAudio
  ) {

    mayaAudioButton
      .addEventListener(
        "click",
        () => {


          stopCurrentAudio();


          audio =
            new Audio(
              line.mayaAudio
            );


          const followWords =
            document.querySelectorAll(
              ".follow-word"
            );


          function clearHighlight() {

            followWords.forEach(
              word => {

                word.classList.remove(
                  "active-word"
                );

              }
            );

          }


          /*
            At the moment, timed word highlighting
            exists only where timing data is present.

            For c02-01 we already have the prototype
            timing values from the previous version.
          */

          if (
            followWords.length > 0
          ) {

            audio.addEventListener(
              "timeupdate",
              () => {

                const currentTime =
                  audio.currentTime;


                followWords.forEach(
                  word => {

                    const start =
                      Number(
                        word.dataset.start
                      );


                    const end =
                      Number(
                        word.dataset.end
                      );


                    if (
                      currentTime >= start &&
                      currentTime < end
                    ) {

                      word.classList.add(
                        "active-word"
                      );

                    } else {

                      word.classList.remove(
                        "active-word"
                      );

                    }

                  }
                );

              }
            );


            audio.addEventListener(
              "ended",
              clearHighlight
            );

          }


          audio
            .play()
            .catch(
              error => {

                clearHighlight();


                console.error(
                  "Audio playback error:",
                  line.mayaAudio,
                  error
                );

              }
            );

        }
      );

  }


  /* ======================================
     SPANISH AUDIO
  ====================================== */

  if (
    line.spanishAudio
  ) {

    const spanishButton =
      document.getElementById(
        "spanish-audio-button"
      );


    if (spanishButton) {

      spanishButton
        .addEventListener(
          "click",
          () => {

            playPath(
              line.spanishAudio
            );

          }
        );

    }

  }


  /* ======================================
     PREVIOUS
  ====================================== */

  document
    .getElementById(
      "previous-button"
    )
    .addEventListener(
      "click",
      () => {

        conversationLineIndex--;


        if (
          conversationLineIndex < 0
        ) {

          conversationLineIndex =
            conversation.lines.length - 1;

        }


        showConversationTwo();

      }
    );


  /* ======================================
     NEXT
  ====================================== */

  document
    .getElementById(
      "next-button"
    )
    .addEventListener(
      "click",
      () => {

        conversationLineIndex++;


        if (
          conversationLineIndex >=
          conversation.lines.length
        ) {

          conversationLineIndex = 0;

        }


        showConversationTwo();

      }
    );


  /* ======================================
     BACK TO CONVERSATIONS
  ====================================== */

  document
    .getElementById(
      "back-button"
    )
    .addEventListener(
      "click",
      showConversationMenu
    );


  /* ======================================
     HOME
  ====================================== */

  document
    .getElementById(
      "home-button"
    )
    .addEventListener(
      "click",
      showHome
    );

}


/* ========================================
   AUDIO HELPERS
======================================== */

function playAudio() {

  if (!audio) {
    return;
  }


  audio.pause();

  audio.currentTime = 0;


  audio
    .play()
    .catch(
      error => {

        console.error(
          "Audio playback error:",
          error
        );

      }
    );

}


/* ========================================
   PLAY AUDIO FROM PATH
======================================== */

function playPath(path) {

  if (!path) {
    return;
  }


  stopCurrentAudio();


  audio =
    new Audio(path);


  audio
    .play()
    .catch(
      error => {

        console.error(
          "Audio playback error:",
          path,
          error
        );

      }
    );

}


/* ========================================
   STOP CURRENT AUDIO
======================================== */

function stopCurrentAudio() {

  if (audio) {

    audio.pause();

    audio.currentTime = 0;

  }


  audio = null;

}


/* ========================================
   WORD HIGHLIGHT
======================================== */

function highlightTarget(
  word,
  target
) {

  const index =
    word.indexOf(target);


  if (
    index === -1
  ) {

    return word;

  }


  const before =
    word.slice(
      0,
      index
    );


  const highlighted =
    word.slice(
      index,
      index + target.length
    );


  const after =
    word.slice(
      index + target.length
    );


  return `

    ${before}

    <span class="target">
      ${highlighted}
    </span>

    ${after}

  `;

}