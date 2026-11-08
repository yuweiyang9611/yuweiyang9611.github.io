// A stand-in for LearnLLM's docs/javascripts/quiz-bank.js, served by tests/home.mjs at the course's path. It has the
// same window.LlmQuizBank surface; every chapter's questions are at revision "r1", so a record that passed at "r1"
// is current and any other revision is from before the questions changed.
(() => {
  "use strict";

  const chapters = ["00", "01", "02", "03", "04", "05", "06", "07", "08"];

  window.LlmQuizBank = Object.freeze({
    chapters: Object.freeze(chapters.slice()),
    questionsFor: () => [],
    revision: (id) => (chapters.includes(id) ? "r1" : null),
    count: () => 3,
  });
})();
