
/* =========================================
   MAYA PRACTICE — VERB PRACTICE
   Classroom-based answer bank
========================================= */

const verbPracticeData = {
  ximbal: {
    stem: "xíimbal",
    en: "walk",
    es: "caminar",
    actual: [
      ["táan in xíimbal"],
      ["táan a xíimbal"],
      ["táan u xíimbal"],
      [
        "táan k xíimbal",
        "táan in xíimbalo’on"
      ],
      ["táan a xíimbale’ex"],
      ["táan u xíimbalo’ob"]
    ],
    habitual: [
      ["kin xíimbal"],
      ["ka xíimbal"],
      ["ku xíimbal"],
      ["k xíimbal"],
      ["ka xíimbale’ex"],
      ["ku xíimbalo’ob"]
    ]
  },

  weenel: {
    stem: "weenel",
    en: "sleep",
    es: "dormir",
    actual: [
      ["táan in weenel"],
      ["táan a weenel"],
      ["táan u weenel"],
      ["táan k weenel"],
      ["táan a weenele’ex"],
      ["táan u weenelo’ob"]
    ],
    habitual: [
      ["kin weenel"],
      ["ka weenel"],
      ["ku weenel"],
      ["k weenel"],
      ["ka weenele’ex"],
      ["ku weenelo’ob"]
    ]
  },

  tsiib: {
    stem: "ts’íib",
    en: "write",
    es: "escribir",
    actual: [
      ["tin ts’íib"],
      ["ta ts’íib"],
      ["tu ts’íib"],
      ["táan k ts’íibo’on"],
      ["táan a ts’íibe’ex"],
      ["táan u ts’íibo’ob"]
    ],
    habitual: [
      ["kin ts’íib"],
      ["ka ts’íib"],
      ["ku ts’íib"],
      ["k ts’íibo’on"],
      ["ka ts’íibe’ex"],
      ["ku ts’íibo’ob"]
    ]
  },

  waalkab: {
    stem: "wáalkab",
    en: "run",
    es: "correr",
    actual: [
      ["táan in wáalkab"],
      ["táan a wáalkab"],
      ["táan u yáalkab"],
      ["táan in wáalkabo’on"],
      ["táan a wáalkabe’ex"],
      ["táan u yáalkabo’on"]
    ],
        habitual: null
  },

  janal: {
  stem: "janal",
  en: "eat",
  es: "comer",

  actual: [
    ["táan in janal"],
    ["táan a janal"],
    ["táan u janal"],
    ["táan k janal"],
    ["táan a janale’ex"],
    ["táan u janalo’ob"]
  ],

  habitual: [
    ["kin janal"],
    ["ka janal"],
    ["ku janal"],
    ["k janal"],
    ["ka janale’ex"],
    ["ku janalo’ob"]
  ]
},

  
ukul: {
  stem: "uk’ul",
  en: "drink",
  es: "beber",

  actual: [
    ["táan in wuk’ul"],
    ["táan a wuk’ul"],
    ["táan u yuk’ul"],
    ["táan k uk’ul"],
    ["táan a wuk’ule’ex"],
    ["táan u yuk’ulo’ob"]
  ],

  habitual: [
    ["kin wuk’ul"],
    ["ka wuk’ul"],
    ["ku yuk’ul"],
    ["k uk’ul"],
    ["ka wuk’ule’ex"],
    ["ku yuk’ulo’ob"]
  ]
},


  xook: {
  stem: "xook",
  en: "read / study",
  es: "leer / estudiar",

  actual: [
    ["táan in xook"],
    ["táan a xook"],
    ["táan u xook"],
    ["táan k xook", "táan in xooko’on"],
    ["táan a xooke’ex"],
    ["táan u xooko’ob"]
  ],

  habitual: [
    ["kin xook"],
    ["ka xook"],
    ["ku xook"],
    ["k xook", "kin xooko’on"],
    ["ka xooke’ex"],
    ["ku xooko’ob"]
  ]
},

  
tsikbal: {
  stem: "tsikbal",
  en: "chat",
  es: "conversar",

  actual: [
    ["táan in tsikbal"],
    ["táan a tsikbal"],
    ["táan u tsikbal"],
    ["táan k tsikbal"],
    ["táan a tsikbale’ex"],
    ["táan u tsikbalo’ob"]
  ],

  habitual: [
    ["kin tsikbal"],
    ["ka tsikbal"],
    ["ku tsikbal"],
    ["k tsikbal"],
    ["ka tsikbale’ex"],
    ["ku tsikbalo’ob"]
  ]
},


  
meyaj: {
  stem: "meyaj",
  en: "work",
  es: "trabajar",

  actual: [
    ["táan in meyaj"],
    ["táan a meyaj"],
    ["táan u meyaj"],
    ["táan k meyaj"],
    ["táan a meyaje’ex"],
    ["táan u meyajo’ob"]
  ],

  habitual: [
    ["kin meyaj"],
    ["ka meyaj"],
    ["ku meyaj"],
    ["k meyaj"],
    ["ka meyaje’ex"],
    ["ku meyajo’ob"]
  ]
},


  
bin: {
  stem: "bin",
  en: "go",
  es: "ir",

  actual: [
    ["táan in bin"],
    ["táan a bin"],
    ["táan u bin"],
    ["táan k bin"],
    ["táan a bine’ex"],
    ["táan u bino’ob"]
  ],

  habitual: [
    ["kin bin"],
    ["ka bin"],
    ["ku bin"],
    ["k bin", "kin bino’on"],
    ["ka bine’ex"],
    ["ku bino’ob"]
  ]
}

};

const vpPersons = [
  ["Tene’", "I", "Yo"],
  ["Teche’", "You", "Tú"],
  ["Leti’e’", "He / She", "Él / Ella"],
  ["To’one’", "We", "Nosotros"],
  ["Te’exe’", "You all", "Ustedes"],
  ["Leti’obe’", "They", "Ellos"]
];

let vpTense = "actual";
let vpVerb = "ximbal";

/* =========================================
   ANSWER CHECKING
========================================= */

function vpNormalized(value) {
  return String(value)
    .toLowerCase()
    .replace(/[‘’`´]/g, "'")
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .trim();
}

function vpAnswers(i) {
  const forms = verbPracticeData[vpVerb][vpTense];

  if (!forms || !forms[i]) return [];

  const answers = new Set(forms[i]);

  // Singular contractions:
  // táan in → tin
  // táan a  → ta
  // táan u  → tu

  if (vpTense === "actual" && i < 3) {
    const fullMarkers = [
      "táan in",
      "táan a",
      "táan u"
    ];

    const shortMarkers = ["tin", "ta", "tu"];

    forms[i].forEach(form => {
      const full = fullMarkers[i];
      const short = shortMarkers[i];
      const normalized = vpNormalized(form);

      if (normalized.startsWith(full + " ")) {
        answers.add(
          short + form.slice(full.length)
        );
      }

      if (normalized.startsWith(short + " ")) {
        answers.add(
          full + form.slice(short.length)
        );
      }
    });
  }

  // Independent pronoun may be included or omitted.
  const pronouns = [
    ["Tene’"],
    ["Teche’"],
    ["Leti’e’"],
    ["To’one’", "To’one"],
    ["Te’exe’"],
    ["Leti’obe’", "Leti’ob", "Letio’obe’"]
  ];

  const baseAnswers = [...answers];

  baseAnswers.forEach(answer => {
    pronouns[i].forEach(pronoun => {
      answers.add(`${pronoun} ${answer}`);
    });
  });

  return [...answers];
}

function vpPatternGuide(es) {
  const actual = vpTense === "actual";

  const rows = [
    ["Tene’", "I", "Yo", "táan in", "kin", "—"],
    ["Teche’", "You", "Tú", "táan a", "ka", "—"],
    ["Leti’e’", "He / She", "Él / Ella", "táan u", "ku", "—"],
    ["To’one’", "We", "Nosotros", "táan k", "k", "varies"],
    ["Te’exe’", "You all", "Ustedes", "táan a", "ka", "-e’ex"],
    ["Leti’obe’", "They", "Ellos", "táan u", "ku", "-o’ob"]
  ];

  return `
    <section class="week-card vp-card vp-guide">
      <p class="card-label">
        ${es ? "OBSERVA LOS PATRONES" : "NOTICE THE PATTERNS"}
      </p>

      <h2>
        ${es ? "Guía de conjugación" : "Verb Pattern Guide"}
      </h2>

      <p class="vp-muted">
        ${es
          ? "Observa cómo cambian los marcadores según la persona."
          : "See how the markers change with each person."}
      </p>

      <div class="vp-current-tense">
        ${actual ? "Presente actual" : "Presente habitual"}
      </div>

      <div class="vp-scroll">
        <table class="vp-table vp-guide-table">
          <thead>
            <tr>
              <th>${es ? "Persona" : "Person"}</th>
              <th>${es ? "Marcador" : "Marker"}</th>
              <th>${es ? "Terminación" : "Ending"}</th>
            </tr>
          </thead>

          <tbody>
            ${rows.map(row => `
              <tr>
                <th scope="row">
                  ${row[0]}
                  <small>${es ? row[2] : row[1]}</small>
                </th>
                <td>
                  <strong>${actual ? row[3] : row[4]}</strong>
                </td>
                <td>${row[5]}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      ${actual ? `
        <div class="vp-contractions">
          <h3>
            ${es ? "Formas abreviadas" : "Contracted forms"}
          </h3>

          <div class="vp-contraction-grid">
            <div>táan in <span>→</span> <strong>tin</strong></div>
            <div>táan a <span>→</span> <strong>ta</strong></div>
            <div>táan u <span>→</span> <strong>tu</strong></div>
          </div>
        </div>
      ` : ""}

      <p class="vp-muted">
        ${es
          ? "Esta tabla muestra patrones de las notas de clase. Algunas formas varían según el verbo."
          : "This guide shows patterns from the class notes. Some forms vary by verb."}
      </p>
    </section>
  `;
}

/* =========================================
   PAGE
========================================= */

function showVerbPractice() {
  if (typeof stopCurrentAudio === "function") {
    stopCurrentAudio();
  }

  const es = language === "es";
  const data = verbPracticeData[vpVerb];

  if (!data[vpTense]) {
    vpTense = "actual";
  }

  const actual = vpTense === "actual";

  document.body.innerHTML = `
    ${siteNavigation("verbs")}

    <main class="vp-main">
      ${languageSwitcher()}

      <header class="home-header">
        <p class="eyebrow">MAYA IN ACTION</p>
        <h1>Verb Practice</h1>
        <p class="home-intro">
          ${es
            ? "Observa los patrones, prueba las formas y úsalas."
            : "Notice the patterns, try the forms, and use what you know."}
        </p>
      </header>

      <section class="week-card vp-card">
        <p class="card-label">
          ${es ? "EXPLORE" : "EXPLORE"}
        </p>

        <h2>
          ${es
            ? "Dos maneras de hablar de acciones"
            : "Two ways to talk about actions"}
        </h2>

        <div class="vp-tabs">
          <button type="button"
            data-vp-tense="actual"
            class="vp-tab ${actual ? "vp-selected" : ""}">
            Presente actual
          </button>

          <button type="button"
            data-vp-tense="habitual"
            class="vp-tab ${!actual ? "vp-selected" : ""}"
            ${!data.habitual ? "disabled" : ""}>
            Presente habitual
          </button>
        </div>

        <p class="vp-muted">
          ${actual
            ? (es
              ? "Una acción que ocurre ahora."
              : "An action happening now.")
            : (es
              ? "Una acción habitual."
              : "An action you do regularly.")}
        </p>

        <div class="vp-example">
          <strong>
            ${actual
              ? "Tene’ táan in xíimbal"
              : "Tene’ kin xíimbal"}
          </strong>

          <span>
            ${actual
              ? (es ? "Estoy caminando." : "I am walking.")
              : (es ? "Camino habitualmente." : "I walk regularly.")}
          </span>

          ${actual
            ? "<small>Also: Tin xíimbal</small>"
            : ""}
        </div>

      <details class="vp-rule">
  <summary>
    ${es ? "Ver el patrón" : "See the pattern"}
  </summary>

  <p>
    ${actual
      ? "táan + person marker + verb"
      : "habitual marker + verb"}
  </p>

  ${vpPatternGuide(es)}
</details>
      </section>

    

      <section class="week-card vp-card">
        <p class="card-label">
          ${es ? "PRACTICA" : "TRY IT"}
        </p>

        <h2>
  ${es
    ? "Completa las seis formas"
    : "Complete the six forms"}
</h2>

<div class="vp-current-tense">
  <span class="vp-tense-dot"></span>
  <span>
    ${actual ? "Presente actual" : "Presente habitual"}
  </span>
  <small>
    ${actual
      ? (es ? "Acciones que ocurren ahora" : "Happening now")
      : (es ? "Acciones habituales" : "Regular actions")}
  </small>
</div>

        <label class="vp-label" for="vp-verb">
          ${es ? "Verbo" : "Verb"}
        </label>

        <select id="vp-verb" class="vp-select">
          ${Object.entries(verbPracticeData)
  .map(([key, verb]) => `
    <option
      value="${key}"
      ${key === vpVerb ? "selected" : ""}
      ${!verb.actual ? "disabled" : ""}
    >
      ${verb.stem} — ${es ? verb.es : verb.en}
      ${!verb.actual
        ? (es ? " · Próximamente" : " · Coming soon")
        : ""}
    </option>
  `).join("")}
        </select>

        ${!data.habitual
          ? `<p class="vp-muted">
              ${es
                ? "Por ahora, solo está disponible el presente actual."
                : "For now, only presente actual is available for this verb."}
            </p>`
          : ""}

        <div class="vp-scroll">
          <table class="vp-table">
            <thead>
              <tr>
                <th>${es ? "Persona" : "Person"}</th>
                <th>${es ? "Tu respuesta" : "Your answer"}</th>
                <th>${es ? "Revisión" : "Check"}</th>
              </tr>
            </thead>

            <tbody>
              ${vpPersons.map((person, i) => `
                <tr>
                  <th scope="row">
                    <strong>${person[0]}</strong>
                    <small>${es ? person[2] : person[1]}</small>
                  </th>

                  <td>
                    <input
                      id="vp-input-${i}"
                      class="vp-input"
                      type="text"
                      autocomplete="off"
                      spellcheck="false"
                      aria-label="${person[0]}"
                      placeholder="${es ? "Escribe aquí..." : "Type here..."}"
                    >
                  </td>

                  <td>
                    <span id="vp-result-${i}"
                      class="vp-result"
                      aria-live="polite"></span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>

        <div class="vp-actions">
          <button type="button" id="vp-check">
            ${es ? "Comprobar" : "Check answers"}
          </button>

          <button type="button"
            id="vp-show"
            class="secondary-button">
            ${es ? "Ver respuestas" : "Show answers"}
          </button>

          <button type="button"
            id="vp-reset"
            class="secondary-button">
            ${es ? "Reintentar" : "Try again"}
          </button>
        </div>

        <p id="vp-feedback"
          class="vp-muted"
          aria-live="polite"></p>

        <div id="vp-key"
          class="vp-key"
          hidden></div>
      </section>
    </main>
  `;

  // Language switching
  attachLanguageButtons(showVerbPractice);

  // Tense switching
  document.querySelectorAll("[data-vp-tense]")
    .forEach(button => {
      button.addEventListener("click", () => {
        const next = button.dataset.vpTense;

        if (!verbPracticeData[vpVerb][next]) return;

        vpTense = next;
        showVerbPractice();
      });
    });

  // Verb selection
  document.getElementById("vp-verb")
    .addEventListener("change", event => {
      vpVerb = event.target.value;

      if (!verbPracticeData[vpVerb][vpTense]) {
        vpTense = "actual";
      }

      showVerbPractice();
    });

  // Check answers
  document.getElementById("vp-check")
    .addEventListener("click", () => {
      let correctCount = 0;

      for (let i = 0; i < 6; i++) {
        const input =
          document.getElementById(`vp-input-${i}`);

        const correct = vpAnswers(i).some(
          answer =>
            vpNormalized(answer) ===
            vpNormalized(input.value)
        );

        if (correct) correctCount++;

        input.classList.toggle("vp-correct", correct);
        input.classList.toggle("vp-incorrect", !correct);

        const result =
          document.getElementById(`vp-result-${i}`);

        result.textContent = correct ? "✓" : "↻";
        result.className =
          "vp-result " + (correct ? "vp-good" : "vp-try");
      }

      document.getElementById("vp-feedback").textContent =
        es
          ? `${correctCount} de 6 formas coinciden con las respuestas registradas.`
          : `${correctCount} of 6 forms match the recorded answers.`;
    });

  // Show answer key
  document.getElementById("vp-show")
    .addEventListener("click", () => {
      const key = document.getElementById("vp-key");
      key.hidden = !key.hidden;

      key.innerHTML = `
        <h3>${es ? "Respuestas posibles" : "Possible answers"}</h3>
        ${vpPersons.map((person, i) => {
          const answers = vpAnswers(i).filter(
            answer => !vpPersons.some(
              p => vpNormalized(answer).startsWith(
                vpNormalized(p[0]) + " "
              )
            )
          );

          return `
            <p>
              <strong>${person[0]}:</strong>
              ${answers.join(" / ")}
            </p>
          `;
        }).join("")}
      `;
    });

  // Try again
  document.getElementById("vp-reset")
    .addEventListener("click", showVerbPractice);
}

/* =========================================
   SIDEBAR NAVIGATION
========================================= */

// Add a link whenever the existing app redraws
// the sidebar.

function vpAddSidebarLink() {
  const links = document.querySelector(".sidebar-links");

  if (!links || document.getElementById("nav-verb-practice")) {
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.id = "nav-verb-practice";

  button.className =
    "sidebar-link" +
    (document.querySelector(".vp-main") ? " active" : "");

  button.innerHTML = `
    <span class="sidebar-icon vp-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="5" y="3.5" width="15" height="17" rx="2" />
        <path d="M9 3.5v17" />
        <path d="M12 9h5" />
        <path d="M12 13h5" />
        <path d="M12 17h3" />
      </svg>
    </span>

    <span>Verb Practice</span>
  `;

  links.appendChild(button);
}

const vpObserver = new MutationObserver(vpAddSidebarLink);

vpObserver.observe(document.body, {
  childList: true,
  subtree: true
});

vpAddSidebarLink();

document.addEventListener("click", event => {
  if (event.target.closest("#nav-verb-practice")) {
    if (window.location.hash === "#verbs") {
      showVerbPractice();
    } else {
      window.location.hash = "verbs";
    }
  }
});

