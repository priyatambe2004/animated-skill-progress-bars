// ========================================
// PRIYA TAMBE — DEVELOPER PORTFOLIO
// ========================================

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  [...root.querySelectorAll(selector)];

const skillList = $("#skillList");
const skillCards = $$(".skill[data-cat]", skillList);
const tabs = $("#tabs");
const sortSelect = $("#sort");
const replayButton = $("#replay");

// ----------------------------------------
// SKILL LEVELS
// ----------------------------------------

function levelFor(score) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Developing";
  if (score >= 40) return "Building";
  return "Learning";
}

// ----------------------------------------
// VISIBLE SKILLS
// ----------------------------------------

function visibleSkills() {
  return skillCards.filter(card => !card.hidden);
}

// ----------------------------------------
// ANIMATE SKILL BARS
// ----------------------------------------

function animateCard(card) {
  const score = Math.max(
    0,
    Math.min(100, Number(card.dataset.percent) || 0)
  );

  const fill = $(".fill", card);
  const pct = $(".pct", card);
  const lvl = $(".lvl", card);

  if (pct) {
    pct.textContent = `${score}%`;
  }

  if (lvl) {
    lvl.textContent = levelFor(score);
  }

  if (fill) {
    fill.style.width = "0%";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.width = `${score}%`;
      });
    });
  }
}

// ----------------------------------------
// UPDATE SKILL SUMMARY
// ----------------------------------------

function updateSummary() {
  const cards = visibleSkills();

  const values = cards.map(card =>
    Math.max(
      0,
      Math.min(100, Number(card.dataset.percent) || 0)
    )
  );

  const average = values.length
    ? Math.round(
        values.reduce((sum, value) => sum + value, 0) /
        values.length
      )
    : 0;

  const strongest = cards.reduce((best, card) => {
    if (!best) return card;

    return Number(card.dataset.percent) >
      Number(best.dataset.percent)
      ? card
      : best;
  }, null);

  $("#avgNum").textContent = `${average}%`;
  $("#fCount").textContent = String(cards.length);

  $("#fTop").textContent = strongest
    ? $(".name", strongest).textContent
    : "—";

  $("#fLevel").textContent = values.length
    ? levelFor(average)
    : "—";

  const circumference = 2 * Math.PI * 52;

  const ring = $("#ringArc");

  ring.style.strokeDasharray = String(circumference);

  ring.style.strokeDashoffset = String(
    circumference * (1 - average / 100)
  );
}

// ----------------------------------------
// FILTER SKILLS
// ----------------------------------------

function applyFilter(category) {
  skillCards.forEach(card => {
    card.hidden =
      category !== "all" &&
      card.dataset.cat !== category;
  });

  $$("button[data-filter]", tabs).forEach(button => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === category)
    );
  });

  updateSummary();

  visibleSkills().forEach(animateCard);
}

tabs.addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");

  if (!button) return;

  applyFilter(button.dataset.filter);
});

// ----------------------------------------
// SORT SKILLS
// ----------------------------------------

function applySort(mode) {
  const sorted = [...skillCards];

  if (mode === "high") {
    sorted.sort(
      (a, b) =>
        Number(b.dataset.percent) -
        Number(a.dataset.percent)
    );
  }

  if (mode === "low") {
    sorted.sort(
      (a, b) =>
        Number(a.dataset.percent) -
        Number(b.dataset.percent)
    );
  }

  if (mode === "az") {
    sorted.sort((a, b) =>
      $(".name", a).textContent.localeCompare(
        $(".name", b).textContent
      )
    );
  }

  sorted.forEach(card => {
    skillList.appendChild(card);
  });
}

sortSelect.addEventListener("change", () => {
  applySort(sortSelect.value);

  visibleSkills().forEach(animateCard);
});

// ----------------------------------------
// REPLAY SKILL ANIMATIONS
// ----------------------------------------

replayButton.addEventListener("click", () => {
  visibleSkills().forEach(animateCard);
  updateSummary();
});

// ----------------------------------------
// DARK AND LIGHT THEME
// ----------------------------------------

const themeButton = $("#theme");
const themeIcon = $("#themeIcon");

function setTheme(theme) {
  document.body.classList.toggle(
    "light",
    theme === "light"
  );

  themeButton.setAttribute(
    "aria-label",
    theme === "light"
      ? "Switch to dark mode"
      : "Switch to light mode"
  );

  themeIcon.textContent =
    theme === "light" ? "☾" : "☼";

  try {
    localStorage.setItem(
      "priya-portfolio-theme",
      theme
    );
  } catch (error) {
    // The theme still works if local storage is unavailable.
  }
}

let initialTheme = "dark";

try {
  initialTheme =
    localStorage.getItem("priya-portfolio-theme") ||
    "dark";
} catch (error) {
  // Use dark mode as the default.
}

setTheme(initialTheme);

themeButton.addEventListener("click", () => {
  const isLight =
    document.body.classList.contains("light");

  setTheme(isLight ? "dark" : "light");
});

// ----------------------------------------
// PROJECT DATA
// ----------------------------------------

const projects = [
  

  {
    title: "Home Décor E-commerce",
    icon: "✦",
    index: "02",
    description:
      "An e-commerce project for handmade home décor, " +
      "with product browsing, user sessions, cart " +
      "functionality, and database-backed features.",
    tags: ["Java", "JSP", "MySQL"],
    github: "https://github.com/priyatambe2004/HOMEDECOR",
    demo: ""
  },

  {
    title: "FAQ Accordion",
    icon: "❔",
    index: "03",
    description:
      "A responsive FAQ interface with expandable " +
      "answers, clear interaction states, and a " +
      "mobile-friendly layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/priyatambe2004/faq-accordion",
    demo: "https://priyatambe2004.github.io/faq-accordion/"
  },

  {
    title: "Random Password Generator",
    icon: "🔐",
    index: "04",
    description:
      "A browser-based utility for generating passwords " +
      "with configurable options and a straightforward interface.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/priyatambe2004",
    demo: ""
  },

  {
    title: "BMI Calculator",
    icon: "◉",
    index: "05",
    description:
      "A BMI calculator with metric and imperial input " +
      "options, result feedback, and a responsive layout.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/priyatambe2004",
    demo: ""
  },
  {
    title: "GameOrbit — Game Marketplace",
    icon: "🎮",
    index: "01",
    description:
      "A web-based marketplace for second-hand game CDs, " +
      "featuring user accounts, product browsing, cart, " +
      "orders, and administrative workflows.",
    tags: ["Java", "JSP / Servlets", "MySQL"],
    github: "https://github.com/priyatambe2004",
    demo: ""
  },

  {
    title: "Temperature Converter",
    icon: "🌡️",
    index: "06",
    description:
      "A temperature conversion tool for Celsius, " +
      "Fahrenheit, and Kelvin, with input validation " +
      "and dynamic results.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/priyatambe2004",
    demo: ""
  }
];

// ----------------------------------------
// RENDER PROJECT CARDS
// ----------------------------------------

function renderProjects() {
  const grid = $("#projectGrid");

  grid.innerHTML = projects.map(project => {
    const tags = project.tags
      .map(tag => `<span>${tag}</span>`)
      .join("");

    const demoLink = project.demo
      ? `
        <a
          href="${project.demo}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Live demo ↗
        </a>
      `
      : "";

    return `
      <article class="project">

        <div class="project-top">
          <span class="project-icon" aria-hidden="true">
            ${project.icon}
          </span>

          <span class="project-index">
            ${project.index} / PROJECT
          </span>
        </div>

        <h3>${project.title}</h3>

        <p>${project.description}</p>

        <div class="tags">
          ${tags}
        </div>

        <div class="project-links">
          <a
            href="${project.github}"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>

          ${demoLink}
        </div>

      </article>
    `;
  }).join("");
}

// ----------------------------------------
// INITIALIZE PORTFOLIO
// ----------------------------------------

const yearNode = $("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

renderProjects();
updateSummary();

skillCards.forEach(animateCard);