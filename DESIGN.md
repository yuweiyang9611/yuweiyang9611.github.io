---
name: Lab Notebook
description: "Shared visual language of the yuweiyang9611.github.io study sites: a record line in the gutter, ruled rows, pasted output and one review red."
colors:
  ink: "#1c2b45"
  mark: "#b3261e"
  paper: "#f7f8f6"
  sheet: "#eef1f2"
  ink-soft: "#4a5870"
  rule: "#cbd3dc"
  rule-strong: "#7f8da1"
  select: "#c9d6ea"
  night-ink: "#e6eaf0"
  night-mark: "#f2766c"
  night-paper: "#141b2b"
  night-sheet: "#1c2536"
  night-ink-soft: "#a9b4c4"
  night-rule: "#2f3b52"
  night-rule-strong: "#6d7c95"
  night-select: "#33486e"
typography:
  display:
    fontFamily: "Noto Serif SC, Source Han Serif SC, Songti SC, SimSun, serif"
    fontSize: "clamp(1.625rem, 1.4rem + 1vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.35
  headline:
    fontFamily: "Noto Serif SC, Source Han Serif SC, Songti SC, SimSun, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.35
  title:
    fontFamily: "NB CJK Marks, Segoe UI, Microsoft YaHei UI, Microsoft YaHei, PingFang SC, Noto Sans CJK SC, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "NB CJK Marks, Segoe UI, Microsoft YaHei UI, Microsoft YaHei, PingFang SC, Noto Sans CJK SC, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  note:
    fontFamily: "NB CJK Marks, Segoe UI, Microsoft YaHei UI, Microsoft YaHei, PingFang SC, Noto Sans CJK SC, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "NB CJK Marks, Segoe UI, Microsoft YaHei UI, Microsoft YaHei, PingFang SC, Noto Sans CJK SC, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
  stopped:
    fontFamily: "NB CJK Marks, Segoe UI, Microsoft YaHei UI, Microsoft YaHei, PingFang SC, Noto Sans CJK SC, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.5
  mono:
    fontFamily: "Cascadia Mono, Consolas, SFMono-Regular, Menlo, Microsoft YaHei, monospace"
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
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
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
    textColor: "{colors.mark}"
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
    textColor: "{colors.ink}"
    typography: "{typography.note}"
    padding: "0 0.625rem"
    height: "{spacing.target}"
  running-head:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "{spacing.head}"
  ruled-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0.75rem 0"
  stopped-label:
    textColor: "{colors.mark}"
    typography: "{typography.stopped}"
  pasted-output:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    padding: "0.75rem 1rem"
---

# Design System: Lab Notebook

## Overview

**Creative North Star: "The Lab Notebook"**

A lab notebook is kept by the person using it. It holds what was run and what was checked, in order, and the next entry starts where the last one stopped. Each site in this family is such a notebook: opening it puts the owner back at the place they stopped, with the next thing to do in view. The record line in the page gutter and its "stopped here" mark are what a reader should remember.

The material is cool paper, blue-black ink, thin ruling and one review red, with a blue-black night twin. Pages are dense and quiet. Structure comes from hairlines and a shared left edge, not boxes, and nothing is there for decoration. The family rejects the template it shipped before: giant headline, tilted terminal, two buttons, stats row, card grid.

The family shares a language, not a layout. Each site's structure follows its own content, so copy these rules and never a sibling's page. `kit/v1/notebook.css` is the source of truth for values, and this file explains how to use them. It was recorded from two built surfaces: the project index in this repository and the C# design patterns course (course index, lesson, guide, quiz, playground).

**Key Characteristics:**

- A record line in the gutter: solid for what is done, dashed for what is not, with one red tick where the owner stopped.
- Red only for "stopped here" and verified marks.
- Ruled rows instead of cards.
- Pasted output between hairlines, with no window chrome.
- Commands on their own line, never broken inside a token.
- Noto Serif SC 600 for page heads, a Chinese-tuned sans for reading, Cascadia Mono for code.
- Chinese page titles that break between phrases, never inside a word.
- Flat, flush-left, square-cornered, and the way back to the stopped place first.

## Colors

One ink on cool paper, one red that means something, and a night twin with the same roles.

### Primary

- **Blue-Black Ink** (#1c2b45, night #e6eaf0): Main text, the strong rule under the running head and above every list, the solid part of the record line, the focus ring and the solid button fill. Contrast is 13.3:1 on paper by day and 14.2:1 at night.

### Secondary

- **Review Red** (#b3261e, night #f2766c): The reviewer's pen. It draws the stopped tick, the 停在这里 label, the check inside a ticked box and the state of a verified entry. It also points at the stopped place: the 接着做 label once a record exists, and the underline of the continue link. Contrast is 6.1:1 on paper and 6.2:1 at night.

### Neutral

- **Cool Paper** (#f7f8f6, night #141b2b): The page, the running head and dialogs. `theme.js` also sets it as the browser's `theme-color`.
- **Pasted Sheet** (#eef1f2, night #1c2536): Only for things pasted into the notebook: run output, commands, inline code and the code editor.
- **Soft Ink** (#4a5870, night #a9b4c4): Notes, metadata, inactive nav and filters, placeholders. Contrast is 6.8:1 on paper and 6.3:1 on the sheet by day, 8.2:1 and 7.3:1 at night.
- **Ruling** (#cbd3dc, night #2f3b52): Dividers between rows and sections. At 1.4:1 by day it is never the only edge of a control.
- **Strong Ruling** (#7f8da1, night #6d7c95): The dashed part of the record line, control outlines, the hairlines around pasted output and link underlines. Contrast is 3.2:1 by day and 4.1:1 at night, so it is for lines, not text.
- **Selection Wash** (#c9d6ea, night #33486e): Text selection and search hit highlights, nothing else.

### Named Rules

**The Review Red Rule.** Red means "stopped here" or "verified", and nothing else. Errors, warnings, links, hover states, emphasis and section accents never use it. Audit test: a page with no record and nothing verified has no red on it.

**The Line Not Hue Rule.** State is shown by line form and a written word, never by a new hue. The palette has no green, amber or blue status color. A correct quiz answer gets a 2px solid ink rule and 正确, a wrong one gets a dashed rule and 你的选择, and a locked step gets a dashed box. Audit test: in grayscale the page still says what is done.

**The Achromatic Field Rule.** Text fields carry no color of their own: transparent fill, Strong Ruling outline, Soft Ink placeholder and the ink focus ring.

Known drift, do not copy: the C# course still colors wrong answers, failed checks and its storage warning red, and underlines its continue link in red before any record exists.

## Typography

**Display Font:** Noto Serif SC 600 (with Source Han Serif SC, Songti SC, SimSun)
**Body Font:** Segoe UI and Microsoft YaHei UI (with PingFang SC, Noto Sans CJK SC), behind a small CJK face for punctuation
**Label/Mono Font:** Cascadia Mono (with Consolas, SFMono-Regular, Menlo, and Microsoft YaHei for Chinese inside code)

**Character:** The serif heads a page the way a hand-lettered title heads a notebook entry. Everything read at length stays in a system screen face, and code looks as it does in the terminal beside it.

### Hierarchy

- **Display** (600, clamp(1.625rem, 1.4rem + 1vw, 2rem), 1.35): The page title, once per page.
- **Headline** (600, 1.375rem, 1.35): Section heads. Smaller section heads drop to 1.125rem at the same weight.
- **Serif accents** (600): The site name in the running head at 1.0625rem, the continue link at 1.1875rem on the index and up to clamp(1.25rem, 1.1rem + .6vw, 1.5rem) on a course, and the previous and next links of a lesson.
- **Title** (700, 1.0625rem, 1.5): Row titles, in the sans. The kit's bare third-level heading is 1rem at the same weight.
- **Body** (400, 1rem, 1.75): Reading text, limited to the 42rem measure.
- **Note** (400, .9375rem, 1.65): Row notes and short explanations, in Soft Ink.
- **Label** (400, .875rem): Metadata, row state and footers. Counts use tabular figures (`font-variant-numeric: tabular-nums`).
- **Stopped** (700, .8125rem, 1.5): The 停在这里 label, in Review Red.
- **Mono** (400, .875rem, 1.65): Pasted output and commands. Inline code is .875em. Identifier-like row keys, such as pattern numbers, also use it.

### Named Rules

**The One Serif Weight Rule.** The shared font files hold Noto Serif SC at weight 600 only, so the serif appears at 600 and never for reading text. `theme.js` adds `/kit/v1/fonts.css` on the production host only, so a local preview showing a fallback serif is expected.

**The Whole Phrase Rule.** Page titles use `word-break: keep-all` with `overflow-wrap: anywhere`. In Chinese this limits breaks to spaces and punctuation, so 设计模式 stays whole, and `anywhere` remains as the emergency exit that stops a long title overflowing a phone. The kit sets this on every first-level heading. Add the same pair to anything else that shows a course or lesson title in the serif, such as the continue link. Write titles with natural break points (a space, `：`, `·`), because a long run with none gets cut wherever the emergency break lands.

**The No Balance Rule.** Don't use `text-wrap: balance` on Chinese text. It was tried on headings and removed because it split 下单 in the middle of a word on the OnlineStore guide title: it looks for equal line lengths, and Chinese offers it a break between any two characters, with no word boundaries to respect. `text-wrap: pretty` stays on headings and paragraphs for last-line orphans, but it does not stop mid-word splits either, which is why the Whole Phrase Rule exists.

Measured in Chromium with the kit stylesheet at a 320px viewport, where the page title is 26px:

| Title CSS | Lines |
| --- | --- |
| Kit: `pretty`, `keep-all`, `anywhere` | 第 3 章 Adapter / （适配器）—— / 填平接口与单位差异 |
| `pretty` without `keep-all` | 第 3 章 Adapter（适配 / 器）——填平接口与单位 / 差异 |
| `balance` without `keep-all` | 第 3 章 Adapter / （适配器）——填 / 平接口与单位差异 |

**The Chinese Reading Rule.** Every page sets `lang="zh-CN"` and lets the kit's body settings reach the text: `line-break: strict` for line-start and line-end punctuation, `text-spacing-trim: trim-start` so an opening `（` at the start of a line does not look indented, `text-autospace: normal` for spacing between Chinese and Latin, and line height 1.75. An engine's stylesheet must not override them.

**The Wide Marks Rule.** Quotation marks, em dashes and ellipses come from a CJK face, because Latin UI faces draw them too narrow for Chinese. The kit does this with the `NB CJK Marks` face at the front of the sans stack, using `unicode-range`. Keep that face first if an engine's font variable is replaced.

**The Literal Code Rule.** Code uses Cascadia Mono, not Cascadia Code, with ligatures off, so `--` and `->` read exactly as they are typed. Put it first in the stack, because a `font:` shorthand resets the kit's ligature setting.

## Layout

The page is a single column of ruled sections on a shared left edge. The block is capped at the 72rem page width, with a gutter of clamp(1rem, 4vw, 3rem), and the running head and footer use the kit's `--nb-inset` so their edges line up with the content. Reading text stays within the 42rem measure.

Density is high on purpose: the owner should be reading or working within seconds. Rows use .75rem to .875rem of vertical padding, and sections use 1.75rem with a Ruling line between them. Interactive text gets a 2.75rem target even though it draws no box. Anchors land below the sticky head through `scroll-padding-top`.

Breakpoints follow each surface's columns rather than a shared scale. The kit collapses the head nav at 56rem. The index stacks its rows at 48rem. The course reflows its rows at 62rem and stacks them at 44rem. On a phone a row becomes one column in reading order: title, stopped label, note, state. The page itself never scrolls sideways; only command and output boxes do.

A generated guide uses two columns: contents at minmax(13rem, 17rem), then the measure. Below 56rem the contents collapse behind a 展开目录 text action.

**The Flush Left Rule.** All text is left-aligned on one left edge, and nothing is centered: no centered headings, copy blocks or empty states. Only secondary things sit at the far edge: the head nav, the search box, the state column, the next link. The one centered thing is the capped page block in a window wider than 72rem.

**The Continue First Rule.** The way back to the stopped place is the first action on a site's opening screen, and nothing above it pitches the site. On the index it is a row at the top left, under 200px from the top of the window. On a course it sits directly under the title, beside the thing to run. With no record yet, it offers the first step or says plainly that there is no record.

## Elevation & Depth

This system is flat. There are no box shadows, text shadows or blur. Depth is limited to three cases: the sticky running head (paper fill and a 1px ink rule), the Pasted Sheet tint (which means "stuck in", not "raised"), and overlays (a 1px ink outline, plus a scrim of `rgb(20 27 43 / 55%)` behind dialogs).

**The Flat Paper Rule.** Nothing casts a shadow. If something needs separating, rule a line.

## Shapes

Lines do the work here. Dividers are 1px. The record line's solid part is 2px, and the stopped tick is .625rem by 2px. Links have a 1px underline at a .22em offset, and the active nav or filter item has one at .32em. The check inside a ticked box is drawn as a shape, not set as a character.

**The Square Box Rule.** Anything drawn as a box has 2px corners or none: controls, dialogs and the favicon tile at 2px, pasted output, toasts and rows at none. Nothing is a pill. Radio buttons stay native and round.

## Components

Components are plain: words, lines and the occasional box. Words do the job of icons.

### Buttons

- **Shape:** Squared corners (2px), minimum height 2.5rem, raised to 2.75rem in the quiz and playground.
- **Default (`.nb-button`):** 1px Strong Ruling outline, transparent fill, inherited ink, .9375rem.
- **Solid (`.nb-button--solid`):** Ink fill with paper text, kept for the main action in a view, such as 提交答案 or 打开完整课件.
- **Hover / Focus:** Hover turns the outline ink, with no fill change and no lift. Focus everywhere is a 2px ink outline at a 2px offset.
- **Disabled:** Dashed Strong Ruling outline, Soft Ink text, `not-allowed` cursor. Dashed means "not yet" here too.
- **Text actions:** Copy, collapse, export and reset are underlined Soft Ink text with no box and a 2.75rem target. Hover turns them ink.

### Chips

- **Style:** Used only for the multi-select problem filter. 1px Ruling outline, 2px corners, 2rem high, .875rem Soft Ink.
- **State:** Selected turns the outline and text ink, at weight 600.

### Inputs / Fields

- **Style (`.nb-input`):** 1px Strong Ruling outline, transparent fill, 2px corners, minimum height 2.5rem.
- **Focus:** The shared 2px ink outline, with no glow or color shift.
- **Search:** A `/` key hint sits inside the right edge. `/` focuses the field and Esc clears it.
- **Select:** The same outline with a paper fill.
- **Code editor:** 1px Strong Ruling outline, sheet fill, mono at .875rem/1.7 and `white-space: pre`.

### Navigation

- **Running head (`.nb-head`):** One sticky line, 3.25rem high, naming the book. Paper fill, 1px ink rule below, site name in the serif at the left, words in Soft Ink at the right. It wraps rather than clips.
- **States:** Hover and `aria-current` turn a nav word ink with a 1px underline at .32em. There are no pills or filled tabs.
- **Theme toggle:** The word 深色 or 浅色, appended to `.nb-nav` by `theme.js`. It stores the choice under `site-theme` and follows the system until the owner chooses.
- **Mobile:** Below 56rem, a collapsible nav (`.nb-nav--collapsible`) hides behind the word 菜单 (`.nb-nav-toggle`).
- **Page changes:** `@view-transition` crossfades pages while the head, named `nb-head`, holds still.
- **Filters:** Topic filters are text buttons with `aria-pressed`. The active one is ink, weight 600 and underlined. A pressed state never gets a fill.

### Record Line

The signature of the family: the gutter shows what has been done. Put it on every list of work (`.nb-entry`).

**The Solid And Dashed Rule.** In the record line, solid means done and dashed means not done, so gaps in the work read as breaks in the line. Solid is never drawn for progress that is not on record, and dashed is never used as decoration.

- **Form:** A 1.25rem gutter, with a 1px dashed Strong Ruling line at its left edge and a 2px solid ink line over it. Each row's line runs 1px past its bottom, so consecutive rows join into one continuous line.
- **Fraction:** `--nb-fraction` (0 to 1) sets how far the solid part reaches. `data-record="done"` sets it to 1. A partly done entry is solid to its fraction.
- **Stopped mark:** `aria-current` on an entry draws the red tick across the line at that fraction, and the row adds the 停在这里 label (`.nb-stopped`) under its title. A list has one stopped mark.
- **Steps:** In a lesson, each finished step is solid to its end, and the tick sits at the top of the first step that is unfinished and unlocked. Locked steps stay dashed, with a dashed checkbox.
- **Motion:** Checking a step extends the line over .5s with `cubic-bezier(.16, 1, .3, 1)`. Reduced-motion settings remove it.
- **Horizontal form:** A course or lesson progress track uses the same two lines left to right: 1px dashed underneath, 2px solid ink growing over .7s. There are no filled bars.
- **Contents list:** In a guide, each contents link has a 1px dashed left line, and the current section gets a 1px solid ink line and bold text. This shows position, not a record, and is the one place solid does not mean done.
- **No readable record:** On the index every row sits in the line, so a site whose record cannot be read stays dashed.
- **Forced colors:** The kit switches the line to `CanvasText` and the tick to `Highlight`.

Row dividers are ruling, not records. They stay solid hairlines whatever the state of the work.

### Checkbox

- **Style:** The kit restyles every checkbox: a 1.25rem square with a 1px ink outline and 2px corners. The check is a red drawn shape, because a ticked box is a verified mark.
- **State:** The check scales in over .18s. Disabled is a dashed Strong Ruling outline.
- **Forced colors:** The kit falls back to the native control.

### Ruled Rows

A register, not a gallery. This family has no cards.

**The Ruled Row Rule.** Lists and grouped content are rows between hairlines. No row or panel gets a fill, a radius or a shadow.

- **Structure:** The list opens with a 1px ink rule, and each row closes with a 1px Ruling line.
- **Columns:** Key, name, note, state, in whatever mix the content needs. Widths belong to each site, such as 14rem / 1fr / 12rem on the index and 5rem / 13rem / 1fr / 13rem on the course. Rows in one site share their columns.
- **Longer content:** A lesson panel is a taller row: the heading in the left column, the content in the right at the measure.
- **State column:** Real counts in tabular figures, from the repository or the owner's record. A verified entry's state turns Review Red.
- **Links:** The title is the link. On the index the whole row is clickable through a stretched link. Hover underlines the title and never fills the row.

### Pasted Output

A printout stuck into the page (`.nb-paste`), not a fake window.

**The No Window Chrome Rule.** Output has hairlines above and below on the Pasted Sheet, and that is all: no title bar, traffic lights, tab strip, tilt, shadow or dark window on a light page.

- **Form:** 1px Strong Ruling at top and bottom, no side borders or radius, mono at .875rem/1.65, `white-space: pre`, `overflow-x: auto`.
- **Content:** The command first, at weight 600, then a blank line, then the output. Paste real output from a real run.
- **Label:** A plain line above, in bold text with text actions at its far edge, not a window bar.
- **Keyboard:** Scrollable boxes take `tabindex="0"`.
- **Long output:** Expected output and compiler diagnostics may wrap with `pre-wrap` where reading them matters more than their shape, and cap their height with a scroll.
- **Color:** Code in the built surfaces is monochrome. Quiet an engine's default syntax colors to ink and Soft Ink (provisional until an engine site ships).

### Command Row

**The Whole Token Rule.** A command never wraps and never breaks inside a token. It sits on its own line in the sheet with `white-space: pre`, `overflow-x: auto` and `min-width: 0`, and a long one scrolls sideways in its own box, even if that cuts it off at the edge of a phone. Anything meant to be copied gets a command row, and inline code is for short names.

- **Form:** The same sheet and hairlines as pasted output. The command takes the full row (`flex: 1 1 100%`).
- **Copy action:** A text action on the next line, with a 2.75rem target. Its confirmation is the written word 已复制.

### Generated Prose

How Markdown output should look, as proven by the C# guide pages. VitePress and MkDocs content follows the same mapping.

- **Spacing:** The kit zeroes heading, paragraph and list margins, so prose must restore them: paragraphs 0 0 1em, lists with 1.5rem of left padding.
- **Headings:** Second-level heads are 1.375rem serif with 2.5rem above and a 1px ink rule below. Third-level heads are 1.0625rem at 600.
- **Quotes:** A 1px Strong Ruling left line and Soft Ink text, with no fill.
- **Code:** Inline code on the sheet with 2px corners. Blocks follow Pasted Output.
- **Tables:** 1px Ruling under each row, an ink rule under the header, no fills and no zebra stripes, inside a horizontally scrolling wrapper with a 640px minimum table width.
- **Print:** Where a page has its own print styles, as PDF exports do, keep these rules inside `@media screen` so print output does not change.

### Dialogs and Toasts

- **Dialog:** 1px ink outline, 2px corners, paper fill, the scrim from Elevation & Depth, at most 40rem wide. Its fields are ruled rows.
- **Toast:** 1px ink outline on paper, fixed at the bottom right, with no shadow.

### Adopting the Kit

For every engine:

- Copy `notebook.css`, `theme.js` and `favicon.svg` from `kit/v1/` into the site's repository, unedited. Fonts are not copied: every site shares the ones served from the index.
- Load `theme.js` synchronously in `<head>`, then `notebook.css`, then the site's own stylesheet.
- A change that breaks compatibility goes into a new `kit/v2/`. A published version does not change.
- The kit is global: it zeroes prose margins, underlines every link and restyles every checkbox, so check an engine's own controls against it.
- The site supplies the `js` class on `<html>` (the collapsing nav needs it and `theme.js` does not set it), the menu toggle's behavior, and `--nb-fraction`, `aria-current` and the stopped label on record rows.
- Tokens switch on `data-theme` on `<html>`. An engine with its own dark state must drive that attribute, or the kit stays in day colors on a night page.

**Hand-written pages** use the kit classes directly. The C# course is the working example.

**VitePress** (provisional, no site built yet). Work in `docs/.vitepress/theme/custom.css`:

- Map `--vp-c-bg` to paper, `--vp-c-bg-soft` to sheet, `--vp-c-text-1` and `--vp-c-text-2` to ink and Soft Ink, and `--vp-c-divider` to Ruling.
- Map `--vp-c-brand-1` to `--vp-c-brand-3` to ink, not red, because VitePress uses brand for links and active states.
- Point `--vp-font-family-base` and `--vp-font-family-mono` at the kit stacks.
- Retire the `--vp-c-tip-*`, `--vp-c-danger-*` and `--vp-c-green-*` status colors under the Line Not Hue Rule.
- Bridge the `.dark` class to `data-theme`.
- The `layout: home` hero and feature cards are the rejected template, so the landing page must be replaced, not reskinned.
- Rebuild custom Vue components such as the progress tracker and review center from ruled rows and the kit checkbox.

**MkDocs Material** (provisional, no site built yet). Work in `docs/stylesheets/extra.css`, and keep `font: false` and the custom palette in `mkdocs.yml`:

- Under `[data-md-color-scheme="default"]` and `"slate"`, map `--md-default-bg-color` to paper and `--md-default-fg-color` to ink, with its `--light` variant to Soft Ink.
- Map `--md-primary-fg-color` to paper so the header becomes a running head rather than a color band.
- Map `--md-accent-fg-color` and `--md-typeset-a-color` to ink, and `--md-code-bg-color` to sheet.
- Bridge `data-md-color-scheme` to `data-theme`.
- Check sizes against the root font size, because Material enlarges it and the kit is set in `rem`.
- Turn colored admonitions into hairline notes with a written label.

## Do's and Don'ts

### Do:

- **Do** take every color from the kit's tokens and let `data-theme` switch them.
- **Do** give every list of work a record line: solid for what is done, dashed for what is not, with one red tick at the stopped place.
- **Do** check a page with no record on it. It should show no red.
- **Do** build lists as ruled rows, with each site choosing its own columns from its own content.
- **Do** paste real output on the sheet between 1px hairlines.
- **Do** give each command its own line with `white-space: pre` and `overflow-x: auto`.
- **Do** keep `word-break: keep-all` and `overflow-wrap: anywhere` on page titles, and write those titles with natural break points.
- **Do** set `lang="zh-CN"` and keep `line-break: strict`, `text-spacing-trim: trim-start` and `text-autospace: normal` reaching the text.
- **Do** show state with line form and a written word.
- **Do** put the continue link first on a site's opening screen.
- **Do** give text-only controls a 2.75rem target.
- **Do** carry over the kit's reduced-motion and forced-colors handling when an engine replaces a component.
- **Do** show only counts that come from the repository or the owner's own record.

### Don't:

- **Don't** use red for errors, warnings, links, hover states, emphasis or accents.
- **Don't** add status colors. There is no green, amber or blue state in this palette.
- **Don't** draw a dashed line as decoration, or a solid record line for work that is not on record.
- **Don't** use cards: no filled tiles, rounded panels or grids of boxes.
- **Don't** draw a terminal: no title bar, traffic lights, tab strip, tilt or shadow around output.
- **Don't** use `pre-wrap` or `overflow-wrap: anywhere` on commands.
- **Don't** use `text-wrap: balance` on Chinese text.
- **Don't** remove `keep-all` from a page title because it breaks badly; shorten the title or give it a break point.
- **Don't** center headings, copy or empty states.
- **Don't** open a site with the old template: giant headline, tilted terminal, two buttons, stats row, card grid.
- **Don't** use shadows, blur or pill shapes.
- **Don't** set reading text in the serif, or use the serif at any weight but 600.
- **Don't** use uppercase, letter-spacing or justified text.
- **Don't** add icons. Controls are words, and the only drawn marks are the record line, the tick and the check.
- **Don't** put a small label above a title. Keys and categories get their own column or row.
- **Don't** edit a site's copy of the kit, or change a published kit version.
- **Don't** copy a sibling site's page structure. The family shares rules, not a template.
