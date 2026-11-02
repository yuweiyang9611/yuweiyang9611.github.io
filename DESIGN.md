---
name: Lab Notebook
description: "Shared visual language of the yuweiyang9611.github.io study sites: a record line in the gutter, ruled rows, pasted output and five colors with one job each, in a day and a night scheme."
colors:
  ink: "#25211b"
  paper: "#f4efe4"
  sheet: "#e7e0d0"
  ink-soft: "#4a4338"
  rule: "#bdb39e"
  rule-strong: "#6a6152"
  rule-bold: "#25211b"
  select: "#d9d0ba"
  red: "#90031e"
  red-wash: "#ffdddb"
  green: "#01521d"
  green-wash: "#d5eed8"
  cyan: "#034d58"
  cyan-wash: "#c9eef6"
  blue: "#103f9c"
  blue-wash: "#dae7fe"
  purple: "#66278a"
  fill: "#103f9c"
  on-fill: "#f4efe4"
  night-ink: "#e2dac9"
  night-paper: "#1c1a17"
  night-sheet: "#2c2924"
  night-ink-soft: "#c4baa7"
  night-rule: "#4c473e"
  night-rule-strong: "#958c7b"
  night-rule-bold: "#958c7b"
  night-select: "#4a4437"
  night-red: "#ffa19d"
  night-red-wash: "#3d2322"
  night-green: "#88ca91"
  night-green-wash: "#1d3120"
  night-cyan: "#67c8db"
  night-cyan-wash: "#0f3137"
  night-blue: "#9abcf9"
  night-blue-wash: "#202b3f"
  night-purple: "#d1adec"
  night-fill: "#1e4e95"
  night-on-fill: "#f4efe4"
typography:
  display:
    fontFamily: "NB Dot, Noto Sans SC, Source Han Sans SC, PingFang SC, Microsoft YaHei UI, Microsoft YaHei, sans-serif"
    fontSize: "clamp(1.625rem, 1.4rem + 1vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.35
  headline:
    fontFamily: "NB Dot, Noto Sans SC, Source Han Sans SC, PingFang SC, Microsoft YaHei UI, Microsoft YaHei, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.35
  title:
    fontFamily: "NB Dot, Noto Sans SC, Source Han Sans SC, PingFang SC, Microsoft YaHei UI, Microsoft YaHei, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.5
  body:
    fontFamily: "NB Dot, Noto Sans SC, Source Han Sans SC, PingFang SC, Microsoft YaHei UI, Microsoft YaHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  note:
    fontFamily: "NB Dot, Noto Sans SC, Source Han Sans SC, PingFang SC, Microsoft YaHei UI, Microsoft YaHei, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "NB Dot, Noto Sans SC, Source Han Sans SC, PingFang SC, Microsoft YaHei UI, Microsoft YaHei, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  stopped:
    fontFamily: "NB Dot, Noto Sans SC, Source Han Sans SC, PingFang SC, Microsoft YaHei UI, Microsoft YaHei, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
  mono:
    fontFamily: "Cascadia Mono, Consolas, SFMono-Regular, Menlo, Noto Sans SC, PingFang SC, Microsoft YaHei, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  control: "2px"
spacing:
  record-gutter: "1.25rem"
  row: "0.75rem"
  row-wide: "0.875rem"
  section: "1.75rem"
  gutter: "clamp(1rem, 4vw, 3rem)"
  head: "3.25rem"
  target: "2.75rem"
  measure: "42rem"
  page: "72rem"
components:
  button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.note}"
    rounded: "{rounded.control}"
    padding: "0.375rem 0.875rem"
    height: "2.5rem"
  button-solid:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.on-fill}"
    typography: "{typography.note}"
    rounded: "{rounded.control}"
    padding: "0.375rem 0.875rem"
    height: "2.5rem"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.375rem 0.625rem"
    height: "2.5rem"
  checkbox:
    backgroundColor: "transparent"
    textColor: "{colors.green}"
    rounded: "{rounded.control}"
    size: "1.25rem"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.note}"
    padding: "0 0.625rem"
    height: "{spacing.target}"
  filter-active:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    typography: "{typography.note}"
    padding: "0 0.625rem"
    height: "{spacing.target}"
  problem-chip-active:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.blue}"
    rounded: "{rounded.control}"
    padding: "0 0.5rem"
    height: "2rem"
  running-head:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "{spacing.head}"
  scheme-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.note}"
    height: "{spacing.target}"
  scheme-control-active:
    backgroundColor: "transparent"
    textColor: "{colors.blue}"
    typography: "{typography.note}"
    height: "{spacing.target}"
  ruled-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0.75rem 0"
  ruled-row-title:
    textColor: "{colors.blue}"
    typography: "{typography.title}"
  ruled-row-stopped:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.ink}"
    padding: "0.75rem 0"
  stopped-label:
    textColor: "{colors.blue}"
    typography: "{typography.stopped}"
  resume-band:
    backgroundColor: "{colors.blue-wash}"
    textColor: "{colors.ink-soft}"
    padding: "0.875rem 0.75rem"
  pasted-output:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    padding: "0.75rem 1rem"
  command-row:
    backgroundColor: "{colors.cyan-wash}"
    textColor: "{colors.cyan}"
    typography: "{typography.mono}"
    padding: "0.5rem 0.75rem"
  command-row-locked:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.mono}"
    padding: "0.5rem 0.75rem"
  quiz-option-correct:
    backgroundColor: "{colors.green-wash}"
    textColor: "{colors.ink}"
    padding: "0.5rem"
  quiz-option-wrong:
    backgroundColor: "{colors.red-wash}"
    textColor: "{colors.ink}"
    padding: "0.5rem"
  inline-code:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.purple}"
    rounded: "{rounded.control}"
    padding: "0.08em 0.3em"
---

# Design System: Lab Notebook

## Overview

**Creative North Star: "The Lab Notebook"**

A lab notebook is kept by the person using it. It holds what was run and what was checked, in order, and the next entry starts where the last one stopped. Each site in this family is such a notebook: opening it puts the owner back at the place they stopped, with the next thing to do in view. The record line in the page gutter and its "stopped here" mark are what a reader should remember.

The material is warm paper, warm ink and thin ruling, with five colors that each do one job, in a day and a night scheme. The colors are there to make reading easier, so they are dark enough to hold 7:1 as text and muted enough to be easy on the eyes. Pages are dense. Structure comes from hairlines and a shared left edge, not boxes, and nothing is there for decoration. The family rejects the template it shipped before: giant headline, tilted terminal, two buttons, stats row, card grid.

The family shares a language, not a layout. Each site's structure follows its own content, so copy these rules and never a sibling's page. `kit/v1/notebook.css` is the source of truth for values, and this file explains how to use them. It was recorded from two built surfaces: the project index in this repository and the C# design patterns course (course index, lesson, guide, quiz, playground).

**Key Characteristics:**

- A record line in the gutter: solid green for what is done, dashed for what is not, with one blue tick where the owner stopped.
- Five colors, each with one job, each holding 7:1 as text, and always a word beside them.
- Two named schemes, 白天 and 晚上, with night composed rather than inverted.
- Ruled rows instead of cards, with a wash only on short bands.
- Pasted output between hairlines, with no window chrome.
- Commands on their own line on a cyan wash, never broken inside a token.
- Noto Sans SC at 400 and 600 for everything read, Cascadia Mono for code.
- Chinese page titles that break between phrases, never inside a word.
- Flat, flush-left, square-cornered, and the way back to the stopped place first.

## Colors

One warm ink on warm paper dimmer than white, five colors that each do one job, and a night scheme of warm black and warm ink composed from the same roles. The owner asked for more color to make reading easier, and for the two schemes, after seeing a one-ink, one-red pilot. A first seven-color version at about 5:1 was hard to read, so every text color now holds 7:1. At that contrast orange and yellow turned brown, the same family as the warm paper, and the owner said a color close to the background should go, so they were removed.

### Primary

- **Warm Ink** (#25211b, night #e2dac9): Main text, the outline of a checkbox, dialog or toast, and the skip link. Contrast is 14.0:1 on paper by day and 12.5:1 at night.

### Secondary

Five colors, each with one job. The kit names each by hue (`--nb-red`) and by job (`--nb-wrong`), and the washes by job too (`--nb-wrong-wash`). Purple has no wash. Site styles use the job name where there is one.

| Color | Job token | Day text, wash | Night text, wash | Day on paper, sheet, own wash | Night on paper, sheet, own wash |
| --- | --- | --- | --- | --- | --- |
| Wrong Red | `--nb-wrong` | #90031e, #ffdddb | #ffa19d, #3d2322 | 8.26, 7.20, 7.49 | 8.96, 7.47, 7.41 |
| Done Green | `--nb-done` | #01521d, #d5eed8 | #88ca91, #1d3120 | 8.23, 7.17, 7.66 | 9.02, 7.52, 7.21 |
| Run Cyan | `--nb-run` | #034d58, #c9eef6 | #67c8db, #0f3137 | 8.30, 7.24, 7.73 | 8.98, 7.49, 7.17 |
| Link Blue | `--nb-link`, `--nb-stopped` | #103f9c, #dae7fe | #9abcf9, #202b3f | 8.28, 7.22, 7.61 | 9.04, 7.54, 7.39 |
| Code Purple | `--nb-code` | #66278a, no wash | #d1adec, no wash | 8.24, 7.19, none | 9.01, 7.52, none |

- **Wrong Red:** Wrong answers, failed checks, compiler diagnostics, the storage warning, the 何时避免 heading and destructive text actions such as 清空复习记录.
- **Done Green:** Done, passed, correct, verified. The solid record line, the check in a box, finished step headings, progress tracks, a verified entry's state, passed checks and the 正确 verdict. Never for work that is only started: the index's state column stays ink until a course is complete.
- **Run Cyan:** Commands and things to run. Command rows on the wash, the command line in pasted output and the label above it, and the 运行并追踪 heading.
- **Link Blue:** Where to go. Links, which includes row titles, the current nav word, pressed filters, the pressed scheme word and the focus ring. Also the place to return to: the tick, the 停在这里 label, the heading of the step where the owner stopped, the 接着做 label and band once a record exists, the stopped row's wash, the underline of the course's continue link and search hits. `--nb-fill` and `--nb-on-fill` make solid buttons from it: warm paper on the day blue at 8.28:1, and warm paper on a deeper blue (#1e4e95) at night at 7.10:1. That night fill is only 2.13:1 against the paper, so solid buttons carry a 1px Link Blue edge.
- **Code Purple:** Code names in guide prose (`--nb-code`), and keywords and numbers in code blocks.

### Neutral

- **Warm Paper** (#f4efe4, night #1c1a17): The page, the running head and dialogs. `theme.js` also sets it as the browser's `theme-color`.
- **Pasted Sheet** (#e7e0d0, night #2c2924): Only for things pasted into the notebook: run output, code blocks, inline code, the code editor and the commands of locked steps. It is 1.15:1 against paper by day and 1.20:1 at night, dark enough to read as its own surface.
- **Soft Ink** (#4a4338, night #c4baa7): Notes, metadata, inactive nav and filters, placeholders. Contrast is 8.5:1 on paper and 7.4:1 on the sheet by day, 9.0:1 and 7.5:1 at night, and at least 7.2:1 on any wash.
- **Ruling** (#bdb39e, night #4c473e): Dividers between rows and sections. At 1.8:1 by day it is never the only edge of a control.
- **Strong Ruling** (#6a6152, night #958c7b): The dashed part of the record line, control outlines, the hairlines around pasted output and link underlines. Contrast is 5.3:1 by day and 5.2:1 at night, so it is for lines, not text.
- **Bold Ruling** (`--nb-rule-bold`, #25211b, night #958c7b): The heavy rule under the running head, above every list, and under a guide's second-level heads and table headers. By day it equals ink at 14.0:1, and at night it softens to 5.2:1.
- **Selection Wash** (#d9d0ba, night #4a4437): Text selection, nothing else.
- **Favicon tile:** Fixed in both schemes: an ink tile with the solid line in night green, the tick in night blue, and the dashes and rows in paper.

### Named Rules

**The One Job Rule.** Each of the five colors has the one job listed above, and none is used for emphasis, section accents or decoration. The one exception is a group's borrowed word, under the One Word Group Rule. Audit test: a page with no record has no tick, no 停在这里, no blue band and no solid green line.

**The Word Beside The Color Rule.** A color never carries a state alone: a written word always goes with it, and records and verdicts keep their line form too. A correct quiz answer gets a 2px solid green rule and 正确, a wrong one gets a 1px dashed red rule and 你的选择, and a locked step gets a dashed box. Every text color holds 7:1 on paper, on the sheet and on every wash in both schemes, with the lowest at 7.17:1 by day and 7.15:1 at night, and `tests/home.mjs` enforces it. Hue is less reliable than contrast. Measured as OKLab distance times 100, the closest pairs for normal vision are green and cyan by day at 10.0 and blue and purple at night at 7.8. Under simulated deuteranopia, blue and purple come within 3.9 by day and cyan and purple within 2.4 at night. Under simulated protanopia, blue and purple come within 3.8 by day and 2.4 at night. Audit test: in grayscale the page still says what is done.

**The Short Band Rule.** Red, green, cyan and blue each have a wash, and a wash is for short bands only: the resume band, a stopped row in a register, command rows, search hits, quiz option verdicts, the storage warning and a pressed problem chip. Tall panels mark the stopped place with a blue heading, not a fill. On the index the resume band fills, so the stopped row below it does not fill again. The quiz's teaching text stays on plain paper with only a colored rule and verdict. Reading text on a wash stays ink, at 10.0:1 or better in both schemes. A wash is 1.07:1 to 1.25:1 against paper, so it is never the only sign of anything. The resume band and quiz verdicts reach past the text edge by their own padding, so their words stay on the shared left edge.

**The Stands Off The Paper Rule.** A color earns its place only if it differs from the paper in hue as well as in lightness. Orange and yellow failed this on warm paper even at 7:1, and the owner asked for colors close to the background to go, so they are not in the kit. Don't bring them back for emphasis, warnings or categories, and judge a new color on the page, not only by its contrast number.

**The One Word Group Rule.** A site's own groups borrow a hue through `data-hue` for one word only: the topic on an index row, the category word on a pattern row and in its dialog, and a filter button, with any count it shows. Pattern numbers stay soft, and nothing else in the row takes the hue. The index has 工程 purple, 算法 cyan, 前端 green and AI blue. The course has 创建型 blue, 结构型 purple and 行为型 cyan. These overlap the colors' jobs. Green on 前端 overlaps done, and blue on AI and 创建型 overlaps links. A reviewer flagged this kind of overlap, and it was kept deliberately, because the owner asked for color and a gray category would be worse. This is an accepted trade-off, not an accident, so don't correct it. Purple on 工程 and 结构型 and cyan on 算法 and 行为型 overlap code and commands in the same way. A lesson's 运行并追踪 and 何时避免 headings use the same attribute to carry their job color, not a group.

**The Composed Night Rule.** The two schemes are named 白天 and 晚上, and night is composed, not inverted: warm black paper and warm ink, not blue-black and near white. `--nb-rule-bold` softens heavy rules at night (by day it equals ink), `--nb-fill` is a deeper blue with warm paper text, and each wash keeps its own hue on the dark paper. Night tokens live in `@media screen`, so printing is always in day colors.

**The Achromatic Field Rule.** Text fields carry no color of their own: transparent fill, Strong Ruling outline and Soft Ink placeholder. Only the focus ring and the caret are blue.

Known drift, do not copy: the course's continue link is underlined in blue before any record exists, while the index keeps its 接着做 label in Soft Ink until there is one. The quiz's 稳定掌握 count is green even at 0. A pattern dialog's command is cyan text with no wash, unlike every other command row.

## Typography

**Display Font:** Noto Sans SC 600 (with Source Han Sans SC, PingFang SC, Microsoft YaHei UI, Microsoft YaHei)
**Body Font:** Noto Sans SC 400, the same family and fallbacks, behind a small Latin face for the middle dot
**Label/Mono Font:** Cascadia Mono (with Consolas, SFMono-Regular, Menlo, and Noto Sans SC for Chinese inside code)

**Character:** One family at two weights, so hierarchy comes from size, weight and rules rather than a change of voice. Code looks as it does in the terminal beside it.

### Hierarchy

- **Display** (600, clamp(1.625rem, 1.4rem + 1vw, 2rem), 1.35): The page title, once per page.
- **Headline** (600, 1.375rem, 1.35): Section heads. Smaller section heads drop to 1.125rem at the same weight.
- **Accents** (600): The site name in the running head at 1.0625rem, the continue link at 1.1875rem on the index and 1.25rem on a course, and the previous and next links of a lesson.
- **Title** (600, 1.0625rem, 1.5): Row titles. The kit's bare third-level heading is 1rem at the same weight.
- **Body** (400, 1rem, 1.75): Reading text, limited to the 42rem measure.
- **Note** (400, .9375rem, 1.65): Row notes and short explanations, in Soft Ink.
- **Label** (400, .875rem): Metadata, row state and footers, and the smallest size set in `rem`. Counts use tabular figures (`font-variant-numeric: tabular-nums`).
- **Stopped** (600, .875rem, 1.5): The 停在这里 label, in Link Blue.
- **Mono** (400, .875rem, 1.65): Pasted output and commands. Inline code is .875em. Identifier-like row keys, such as pattern numbers, also use it.

### Named Rules

**The One Family Rule.** Everything but code is set in Noto Sans SC at 400 or 600, the two weights in the shared font files, so a page never changes voice between its head and its text. The owner rejected a Noto Serif SC head over a Microsoft YaHei body on 2026-11-02 as awkward: two voices met in one row, YaHei draws quotation marks narrow, and Segoe UI digits sat lighter than YaHei bold in the same heading. `theme.js` adds `/kit/v1/fonts.css` on the production host only, so a local preview uses an installed Noto Sans SC or falls back to the system face.

**The Whole Phrase Rule.** Page titles use `word-break: keep-all` with `overflow-wrap: anywhere`. In Chinese this limits breaks to spaces and punctuation, so 设计模式 stays whole, and `anywhere` remains as the emergency exit that stops a long title overflowing a phone. The kit sets this on every first-level heading. Add the same pair to anything else that shows a course or lesson title, such as the continue link. Write titles with natural break points (a space, `：`, `·`), because a long run with none gets cut wherever the emergency break lands.

**The No Balance Rule.** Don't use `text-wrap: balance` on Chinese text. It was tried on headings and removed because it split 下单 in the middle of a word on the OnlineStore guide title: it looks for equal line lengths, and Chinese offers it a break between any two characters, with no word boundaries to respect. `text-wrap: pretty` stays on headings and paragraphs for last-line orphans, but it does not stop mid-word splits either, which is why the Whole Phrase Rule exists.

Measured in Chromium with the kit stylesheet at a 320px viewport, where the page title is 26px:

| Title CSS | Lines |
| --- | --- |
| Kit: `pretty`, `keep-all`, `anywhere` | 第 3 章 Adapter / （适配器）—— / 填平接口与单位差异 |
| `pretty` without `keep-all` | 第 3 章 Adapter（适配 / 器）——填平接口与单位 / 差异 |
| `balance` without `keep-all` | 第 3 章 Adapter / （适配器）——填 / 平接口与单位差异 |

**The Chinese Reading Rule.** Every page sets `lang="zh-CN"` and lets the kit's body settings reach the text: `line-break: strict` for line-start and line-end punctuation, `text-spacing-trim: trim-start` so an opening `（` at the start of a line does not look indented, `text-autospace: normal` for spacing between Chinese and Latin, and line height 1.75. An engine's stylesheet must not override them.

**The Narrow Dot Rule.** Noto Sans SC draws `·` full width, which opens wide gaps in labels written as `a · b`. The kit's `NB Dot` face at the front of the sans stack takes that one character from a Latin face, using `unicode-range`. Keep that face first if an engine's font variable is replaced.

**The Literal Code Rule.** Code uses Cascadia Mono, not Cascadia Code, with ligatures off, so `--` and `->` read exactly as they are typed. Put it first in the stack, because a `font:` shorthand resets the kit's ligature setting.

## Layout

The page is a single column of ruled sections on a shared left edge. The block is capped at the 72rem page width, with a gutter of clamp(1rem, 4vw, 3rem), and the running head and footer use the kit's `--nb-inset` so their edges line up with the content. Reading text stays within the 42rem measure.

Density is high on purpose: the owner should be reading or working within seconds. Rows use .75rem to .875rem of vertical padding, and sections use 1.75rem with a Ruling line between them. Interactive text gets a 2.75rem target even though it draws no box. Anchors land below the sticky head through `scroll-padding-top`.

Breakpoints follow each surface's columns rather than a shared scale. The kit collapses the head nav at 56rem. The index stacks its rows at 48rem. The course reflows its rows at 62rem and stacks them at 44rem. On a phone a row keeps at most a narrow key column, the topic on the index and the number on the course, and the rest becomes one column in reading order: title, stopped label, note, state. The page itself never scrolls sideways; only command and output boxes do.

A generated guide uses two columns: contents at minmax(13rem, 17rem), then the measure. Below 56rem the contents collapse behind a 展开目录 text action.

**The Flush Left Rule.** All text is left-aligned on one left edge, and nothing is centered: no centered headings, copy blocks or empty states. Only secondary things sit at the far edge: the head nav and scheme control, the search box, the state column, the next link. The one centered thing is the capped page block in a window wider than 72rem.

**The Continue First Rule.** The way back to the stopped place is the first action on a site's opening screen, and nothing above it pitches the site. On the index it is a row at the top left, under 200px from the top of the window. On a course it sits directly under the title, beside the thing to run. With no record yet, it offers the first step or says plainly that there is no record.

## Elevation & Depth

This system is flat. There are no box shadows, text shadows or blur. Depth is limited to four cases: the sticky running head (paper fill and a 1px bold rule), the Pasted Sheet tint (which means "stuck in", not "raised"), a wash (a tint that marks a short band, not a raised surface), and overlays (a 1px ink outline, plus a scrim behind dialogs of `rgb(37 33 27 / 55%)` by day and `rgb(0 0 0 / 60%)` at night).

**The Flat Paper Rule.** Nothing casts a shadow. If something needs separating, rule a line.

## Shapes

Lines do the work here. Dividers are 1px. The record line's solid part is 2px, and the stopped tick is .625rem by 2px. Links have a 1px underline at a .22em offset, and the active nav, scheme or filter item has a 2px one at .32em. The check inside a ticked box is drawn as a shape, not set as a character.

**The Square Box Rule.** Anything drawn as a box has 2px corners or none: controls, dialogs and the favicon tile at 2px, pasted output, wash bands, toasts and rows at none. Nothing is a pill. Radio buttons stay native and round.

## Components

Components are plain: words, lines and the occasional box. Words do the job of icons.

### Buttons

- **Shape:** Squared corners (2px), minimum height 2.5rem, raised to 2.75rem in the quiz and playground.
- **Default (`.nb-button`):** 1px Strong Ruling outline, transparent fill, inherited ink, .9375rem.
- **Solid (`.nb-button--solid`):** `--nb-fill` with `--nb-on-fill` text, which is warm paper on blue in both schemes, and a 1px Link Blue edge, kept for the main action in a view, such as 提交答案 or 打开完整课件.
- **Hover / Focus:** Hover turns the outline and text blue, with no fill change and no lift, and a solid button does not change. Focus everywhere is a 2px blue outline at a 2px offset.
- **Disabled:** Dashed Strong Ruling outline, Soft Ink text, `not-allowed` cursor. Dashed means "not yet" here too. A solid action drops its fill while disabled.
- **Text actions:** Copy and collapse are underlined Soft Ink text with no box and a 2.75rem target, and hover turns them ink. Backup, export and import in the course's records are underlined blue. A destructive action, such as 清空复习记录, is red.

### Chips

- **Style:** Used only for the multi-select problem filter. 1px Ruling outline, 2px corners, 2rem high, .875rem Soft Ink.
- **State:** Selected turns the outline and text blue on the blue wash, at weight 600.

### Inputs / Fields

- **Style (`.nb-input`):** 1px Strong Ruling outline, transparent fill, 2px corners, minimum height 2.5rem.
- **Focus:** The shared 2px blue outline and a blue caret, with no glow or other color shift.
- **Search:** A `/` key hint sits inside the right edge. `/` focuses the field and Esc clears it.
- **Select:** The same outline with a paper fill.
- **Code editor:** 1px Strong Ruling outline, sheet fill, mono at .875rem/1.7 and `white-space: pre`. It is a plain textarea, so its code stays uncolored.

### Navigation

- **Running head (`.nb-head`):** One sticky line, 3.25rem high, naming the book. Paper fill, 1px bold rule below, site name at 600 at the left, words in Soft Ink at the right. It wraps rather than clips.
- **States:** Hover turns a nav word blue with a 1px underline at .32em. `aria-current` turns it blue at weight 600 with a 2px underline at .32em. There are no pills or filled tabs.
- **Scheme control:** Two words, 白天 and 晚上, beside the nav and set off from it by a Ruling hairline. `theme.js` places them after `.nb-nav`, outside it, so they stay visible at every width and never hide behind the menu. The pressed word has the same treatment as `aria-current`. The default follows the system until the owner picks, and the choice is stored under `site-theme` as `light` or `dark`. Print hides the control.
- **Mobile:** Below 56rem, a collapsible nav (`.nb-nav--collapsible`) hides behind the word 菜单 (`.nb-nav-toggle`), with the scheme words staying beside it in the head.
- **Page changes:** `@view-transition` crossfades pages while the head, named `nb-head`, holds still.
- **Filters:** Topic filters are text buttons with `aria-pressed`. At rest a filter shows its group's hue, or Soft Ink if it has none. Pressed, it has weight 600 and a 2px underline, in its own hue or, for 全部, in blue. A pressed filter never gets a fill.

### Record Line

The signature of the family: the gutter shows what has been done. Put it on every list of work (`.nb-entry`).

**The Solid And Dashed Rule.** In the record line, solid green means done and dashed means not done, so gaps in the work read as breaks in the line. Solid is never drawn for progress that is not on record, and dashed is never used as decoration.

- **Form:** A 1.25rem gutter, with a 1px dashed Strong Ruling line at its left edge and a 2px solid green line over it. Each row's line runs 1px past its bottom, so consecutive rows join into one continuous line.
- **Fraction:** `--nb-fraction` (0 to 1) sets how far the solid part reaches. `data-record="done"` sets it to 1. A partly done entry is solid to its fraction.
- **Stopped mark:** `aria-current` on an entry draws the blue tick across the line at that fraction and fills the row with the blue wash, and the row adds the 停在这里 label (`.nb-stopped`) under its title. On the index the resume band holds the fill instead. A list has one stopped mark.
- **Steps:** In a lesson, each finished step is solid to its end with a green heading, and the tick sits at the top of the first step that is unfinished and unlocked, which takes a blue heading and the label instead of a fill. Locked steps stay dashed, with a dashed checkbox and Soft Ink text.
- **Motion:** Checking a step extends the line over .5s with `cubic-bezier(.16, 1, .3, 1)`. Reduced-motion settings remove it.
- **Horizontal form:** A course or lesson progress track uses the same two lines left to right: 1px dashed underneath, 2px solid green growing over .7s. There are no filled bars.
- **Contents list:** In a guide, each contents link has a 1px dashed left line, and the current section gets a 1px solid blue line and bold blue text. This shows position, not a record, and is the one place solid does not mean done.
- **No readable record:** On the index every row sits in the line, so a site whose record cannot be read stays dashed.
- **Forced colors:** The kit switches the line to `CanvasText` and the tick to `Highlight`.

Row dividers are ruling, not records. They stay solid hairlines whatever the state of the work.

### Checkbox

- **Style:** The kit restyles every checkbox: a 1.25rem square with a 1px ink outline and 2px corners. The check is a green drawn shape, because a ticked box is a done mark.
- **State:** The check scales in over .18s. Disabled is a dashed Strong Ruling outline.
- **Forced colors:** The kit falls back to the native control.

### Ruled Rows

A register, not a gallery. This family has no cards.

**The Ruled Row Rule.** Lists and grouped content are rows between hairlines. No row or panel gets a radius or a shadow. The only rows that fill are short ones, under the Short Band Rule: the stopped row of a register on the blue wash, and a quiz option once it has its verdict.

- **Structure:** The list opens with a 1px bold rule, and each row closes with a 1px Ruling line.
- **Columns:** Key, name, note, state, in whatever mix the content needs. Widths belong to each site, such as 2.5rem / 14rem / 1fr / 12rem on the index, with a narrow topic column first, and 5rem / 13rem / 1fr / 13rem on the course. Rows in one site share their columns.
- **Longer content:** A lesson panel is a taller row: the heading in the left column, the content in the right at the measure. It never fills. A heading with a job, such as 运行并追踪 or 何时避免, takes that color instead.
- **State column:** Real counts in tabular figures, from the repository or the owner's record. On the index a state is Soft Ink with no record, ink once a course has one, and green only when the course is complete. On the course it is Soft Ink until the entry is verified, then green.
- **Links:** The title is the link, in blue. On the index the whole row is clickable through a stretched link. Hover underlines the title and never fills the row.

### Pasted Output

A printout stuck into the page (`.nb-paste`), not a fake window.

**The No Window Chrome Rule.** Output has hairlines above and below on the Pasted Sheet, and that is all: no title bar, traffic lights, tab strip, tilt, shadow or dark window on a light page.

- **Form:** 1px Strong Ruling at top and bottom, no side borders or radius, mono at .875rem/1.65, `white-space: pre`, `overflow-x: auto`.
- **Content:** The command first, in cyan at weight 600, then a blank line, then the output in ink. Paste real output from a real run.
- **Label:** A plain line above, in bold cyan with text actions at its far edge, not a window bar.
- **Keyboard:** Scrollable boxes take `tabindex="0"`.
- **Long output:** Expected output and compiler diagnostics may wrap with `pre-wrap` where reading them matters more than their shape, and cap their height with a scroll.
- **Code color:** Code blocks use this same form, colored by the kit's `.tok-*` classes: keyword and number purple, type cyan, call blue, string green, meta and comment Soft Ink. Red is not used in code. On the course `code-colors.js` sets the classes at runtime for C#, PowerShell and bat, so the exported guide, its search index and its print output stay plain text, and the classes live in `@media screen`, so print stays black. An engine's highlighter should use the same assignments (provisional until an engine site ships).

### Command Row

**The Whole Token Rule.** A command never wraps and never breaks inside a token. It sits on its own line on the cyan wash with `white-space: pre`, `overflow-x: auto` and `min-width: 0`, and a long one scrolls sideways in its own box, even if that cuts it off at the edge of a phone. Anything meant to be copied gets a command row, and inline code is for short names.

- **Form:** Cyan text on the cyan wash, with no hairlines. The command takes the full row (`flex: 1 1 100%`).
- **Locked:** A locked step's command uses the sheet and Soft Ink instead of the wash, so only runnable commands look runnable.
- **Copy action:** A text action on the next line, with a 2.75rem target. Its confirmation is the written word 已复制.

### Generated Prose

How Markdown output should look, as proven by the C# guide pages. VitePress and MkDocs content follows the same mapping.

- **Spacing:** The kit zeroes heading, paragraph and list margins, so prose must restore them: paragraphs 0 0 1em, lists with 1.5rem of left padding.
- **Headings:** Second-level heads are 1.375rem at 600 with 2.5rem above and a 1px bold rule below. Third-level heads are 1.0625rem at 600.
- **Quotes:** A 1px Strong Ruling line on the left, 1rem of padding and inherited text, with no fill.
- **Code:** Inline code in purple on the sheet with 2px corners, taking the link's color inside a link. Blocks follow Pasted Output.
- **Tables:** 1px Ruling under each row, a bold rule under the header, no fills and no zebra stripes, inside a horizontally scrolling wrapper with a 640px minimum table width.
- **Print:** Where a page has its own print styles, as PDF exports do, keep these rules inside `@media screen` so print output does not change.

### Dialogs and Toasts

- **Dialog:** 1px ink outline, 2px corners, paper fill, the scrim from Elevation & Depth, at most 40rem wide. Its fields are ruled rows, its category word takes the group's hue, and its command is cyan text.
- **Toast:** 1px ink outline on paper, fixed at the bottom right, with no shadow.
- **Storage warning:** A sticky box with a 1px red outline on the red wash, ink text and a solid button.

### Adopting the Kit

For every engine:

- Copy `notebook.css`, `theme.js` and `favicon.svg` from `kit/v1/` into the site's repository, unedited. Fonts are not copied: every site shares the ones served from the index.
- Load `theme.js` synchronously in `<head>`, then `notebook.css`, then the site's own stylesheet.
- A change that breaks compatibility goes into a new `kit/v2/`. A published version does not change.
- The kit is global: it zeroes prose margins, colors and underlines every link and restyles every checkbox, so check an engine's own controls against it.
- The site supplies the `js` class on `<html>` (the collapsing nav needs it and `theme.js` does not set it), the menu toggle's behavior, and `--nb-fraction`, `aria-current` and the stopped label on record rows.
- `theme.js` builds the scheme control after the first `.nb-nav`, so a page without that class gets no control.
- Tokens switch on `data-theme` on `<html>`, as `light` or `dark`. An engine with its own dark state must drive that attribute, or the kit stays in day colors on a night page.

**Hand-written pages** use the kit classes directly. The C# course is the working example.

**VitePress** (provisional, no site built yet). Work in `docs/.vitepress/theme/custom.css`:

- Map `--vp-c-bg` to paper, `--vp-c-bg-soft` to sheet, `--vp-c-text-1` and `--vp-c-text-2` to ink and Soft Ink, and `--vp-c-divider` to Ruling.
- Map `--vp-c-brand-1` to `--vp-c-brand-3` to `--nb-link` and `--vp-c-brand-soft` to `--nb-blue-wash`, because VitePress uses brand for links and active states.
- Point `--vp-font-family-base` and `--vp-font-family-mono` at the kit stacks.
- Map the status colors to the five tokens instead of retiring them: `--vp-c-danger-*` and `--vp-c-warning-*` to `--nb-wrong`, and `--vp-c-success-*` and `--vp-c-green-*` to `--nb-done`, with each soft variant on its wash. `--vp-c-tip-*` follows brand. Every container keeps its written label.
- Give the code highlighter the same assignments as `.tok-*`, with no red.
- Bridge the `.dark` class to `data-theme`.
- The `layout: home` hero and feature cards are the rejected template, so the landing page must be replaced, not reskinned.
- Rebuild custom Vue components such as the progress tracker and review center from ruled rows and the kit checkbox.

**MkDocs Material** (provisional, no site built yet). Work in `docs/stylesheets/extra.css`, and keep `font: false` and the custom palette in `mkdocs.yml`:

- Under `[data-md-color-scheme="default"]` and `"slate"`, map `--md-default-bg-color` to paper and `--md-default-fg-color` to ink, with its `--light` variant to Soft Ink.
- Map `--md-primary-fg-color` to paper so the header becomes a running head rather than a color band.
- Map `--md-accent-fg-color` and `--md-typeset-a-color` to `--nb-link`, and `--md-code-bg-color` to sheet.
- Give `--md-code-hl-*` the same assignments as `.tok-*`, with no red.
- Bridge `data-md-color-scheme` to `data-theme`.
- Check sizes against the root font size, because Material enlarges it and the kit is set in `rem`.
- Map admonitions to the five tokens instead of removing their color: `danger`, `failure` and `warning` to `--nb-wrong` and `success` to `--nb-done`, each on its wash as a short band with a written label.

## Do's and Don'ts

### Do:

- **Do** take every color from the kit's tokens and let `data-theme` switch them.
- **Do** give each of the five colors its one job, and check any new use against the list.
- **Do** give every list of work a record line: solid green for what is done, dashed for what is not, with one blue tick at the stopped place.
- **Do** check a page with no record on it. It should show no tick, no 停在这里, no blue band and no solid green line.
- **Do** build lists as ruled rows, with each site choosing its own columns from its own content.
- **Do** keep a wash to a short band, and mark the stopped place in a tall panel with a blue heading.
- **Do** paste real output on the sheet between 1px hairlines.
- **Do** give each command its own line on the cyan wash with `white-space: pre` and `overflow-x: auto`.
- **Do** keep `word-break: keep-all` and `overflow-wrap: anywhere` on page titles, and write those titles with natural break points.
- **Do** set `lang="zh-CN"` and keep `line-break: strict`, `text-spacing-trim: trim-start` and `text-autospace: normal` reaching the text.
- **Do** pair every colored state with a written word, and keep the line form in records and verdicts.
- **Do** check a new color value against `tests/home.mjs`, which holds every text color to 7:1 on paper, sheet and every wash in both schemes.
- **Do** put the continue link first on a site's opening screen.
- **Do** give text-only controls a 2.75rem target.
- **Do** carry over the kit's reduced-motion and forced-colors handling when an engine replaces a component.
- **Do** show only counts that come from the repository or the owner's own record.

### Don't:

- **Don't** use a color outside its job, for emphasis or as an accent. A group's borrowed word is the one exception, and an accepted one.
- **Don't** add a sixth color, bring back orange or yellow, or give one of the five a second job.
- **Don't** let a color carry a state without a word.
- **Don't** turn anything green for work that is only started.
- **Don't** fill a tall panel or teaching text with a wash, or fill the stopped row when a band above it already fills.
- **Don't** use red in code.
- **Don't** make night by inverting day.
- **Don't** draw a dashed line as decoration, or a solid record line for work that is not on record.
- **Don't** use cards: no filled tiles, rounded panels or grids of boxes.
- **Don't** draw a terminal: no title bar, traffic lights, tab strip, tilt or shadow around output.
- **Don't** use `pre-wrap` or `overflow-wrap: anywhere` on commands.
- **Don't** use `text-wrap: balance` on Chinese text.
- **Don't** remove `keep-all` from a page title because it breaks badly; shorten the title or give it a break point.
- **Don't** center headings, copy or empty states.
- **Don't** open a site with the old template: giant headline, tilted terminal, two buttons, stats row, card grid.
- **Don't** use shadows, blur or pill shapes.
- **Don't** add a serif or a second Chinese family, or use any weight but 400 and 600.
- **Don't** use uppercase, letter-spacing or justified text.
- **Don't** add icons. Controls are words, and the only drawn marks are the record line, the tick and the check.
- **Don't** put a small label above a title. Keys and categories get their own column or row.
- **Don't** edit a site's copy of the kit, or change a published kit version.
- **Don't** copy a sibling site's page structure. The family shares rules, not a template.
