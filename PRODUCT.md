# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing engines stay, confirmed by the owner: hand-written HTML (this site, `LightGBM-NativeCUDA`, `CSharp_Implementation_of_DesignPatterns`), a Node generator (`LearnDotnetCSharp`), MkDocs Material (`LearnLLM`) and VitePress (`DataStructureAndAlgorithm`, `frontend-learning-project`). Only themes and page structure are replaced. Every site keeps deploying from its own repository to GitHub Pages under `yuweiyang9611.github.io`.

## Users

The owner is the primary reader: one developer teaching themselves, who keeps coming back to continue a course or look something up. Public visitors can read everything, but no design decision is made for them at the owner's expense.

Inferred from the repositories, not yet confirmed: reading happens on a Windows desktop beside an IDE and a PowerShell terminal, since the lessons are run locally.

## Product Purpose

A family of seven Chinese-language sites: a project index and six project sites, five of them courses. The owner uses them to study, to run the code each lesson points at, and to return to where they stopped. Success is that the owner opens a site and is reading or working within seconds.

## Positioning

These are the owner's own study benches, not product marketing. Every lesson leads to something actually run and checked: a demo, a test, a trace, a quiz.

## Operating Context

- Lessons are read next to a local checkout, with commands copied into a terminal.
- Progress lives in browser storage on the owner's machine, with JSON backup in some sites.
- Sessions are repeated and short: find the place, read, run, mark done, leave.

## Capabilities and Constraints

Functions that must survive the redesign:

- **Home:** project index with search and topic filters, a day and a night color scheme.
- **Design patterns:** course routes, 23 pattern pages, full-text search, exercises, an in-browser C# compiler playground, quizzes, spaced review, progress with storage-status reporting.
- **.NET:** online book, search, layered labs, lab catalog, roadmap, progress with backups.
- **LLM:** 15-page MkDocs course with math rendering and a PDF download.
- **Algorithms:** learning units, trace player, question bank, source navigation, progress backups.
- **Frontend:** 91-day course, review center, weekly checks, progress tracker.
- **LightGBM:** build and verification documentation for the fork, plus downloads.

Constraints:

- Existing URLs and browser storage keys must not change, or the owner loses their place and their progress.
- Static hosting on GitHub Pages only: no backend.
- Each site's existing site tests and CI checks must keep passing.
- Some repositories reject email addresses in commit messages and PR text.

## Brand Commitments

Stated by the owner, binding on all future work:

- It must not look AI-made or share a template across sites.
- No decoration that does not help reading or doing.
- Chinese typography has to read well; the current sites do not. On 2026-11-02 the owner called a serif head over a Microsoft YaHei body awkward, so every site now uses one family, Noto Sans SC.
- Pages must not be long and scattered: it must be obvious where to start.
- Pages must not be monochrome: use a small set of colors that make reading easier, and offer a day and a night color scheme. Requested on 2026-11-02 after seeing a one-ink, one-red pilot. The owner first allowed up to seven, then said fewer is fine and that a color close to the background should go.
- Pages must have colour as surface and a visible way in. Requested on 2026-11-04 after the owner reviewed the finished notebook build of all seven sites and rejected it as monotone (表现单调，缺乏色彩) and dense (文字密密麻麻，缺少引导，不现代化). The owner chose the dashboard direction over a lighter recolouring: coloured card heads with progress rings, one dark banner for the place to continue, rounded surfaces and shorter notes, at the cost of relaying out every site.
- Text must be easy to make out, and the colors must be easy on the eyes. Requested on 2026-11-02 after a first seven-color version at about 5:1 was hard to read. Every text color holds 7:1, paper is warm and dimmer than white, and night is warm black with warm ink rather than blue-black with near-white text.

## Evidence on Hand

Real counts and content exist in the repositories, such as the 23 patterns, 53 labs and 91-day course. No testimonials, users, stars or adoption figures exist, so none may be implied. Figures on a page must come from the repository, or be removed.

## Product Principles

1. Returning beats arriving: continuing where the owner stopped comes before explaining the site.
2. Content is the interface: every element has to help finding, reading, running or tracking.
3. Prove by running: point at the command, the test or the trace rather than describing them.
4. One family, not one template: the sites share a language, and each one's structure follows its own content.

## Accessibility & Inclusion

Keep the keyboard, contrast and link behaviour the existing site tests cover. Respect reduced-motion preferences.
