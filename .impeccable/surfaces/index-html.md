---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

Scope: the project index at `index.html`, the shared kit at `kit/v1/`, and the visual language all seven sites inherit. Visitor mode: Read, with Operate behaviour for search, filters and progress.

Audience and job: the owner, returning to continue a course or look something up. Action: get back to the place they stopped. Proof: their own progress, read from browser storage on the shared origin. Constraints: URLs and storage keys never change, the index only reads other sites' records, static hosting only.

Chosen direction: lab notebook. Memorable moment: the record line in the page gutter and its "stopped here" mark.

Unresolved: algorithms progress lives in IndexedDB and is not read yet. The other five sites adopt the kit after the pilot is approved.

## Direction contract

THESIS: Returning is the job. Opening a site puts the owner back where they stopped, with the next thing to do in view. It refuses the template the family shipped before: giant headline, tilted terminal, two buttons, stats row, card grid.

OWN-WORLD: Warm paper #F4EFE4, warm ink #25211B, ruling #BDB39E, and five colors with one job each, every one holding 7:1 as text: red for wrong, green for done, cyan for things to run, blue for links and the place to return to, purple for code. Orange and yellow are left out because they turn brown on warm paper. Two named schemes, 白天 and 晚上, with night composed rather than inverted. Noto Serif SC 600 for page heads, Segoe UI and YaHei for reading, Cascadia for code and data. Ruled rows instead of cards, pasted output between hairlines with no window chrome, square controls, everything flush left.

STORY: The owner sees where they stopped, continues or looks something up, runs the thing, and records it. They believe the record because it is theirs and is checked by doing.

FIRST VIEWPORT: Home: a one-line running head, the serif page title, a "continue" row at the top left under 200px as the primary action, then filters and the ruled contents list immediately. Course: running head, then the continue link beside the pasted run output.

FORM: Lab notebook, position 7 on the ordered list, seed key 8e32f99d. Signature: the record line. Solid only for what is done, dashed for what is not, so gaps in the work read as breaks in the line. A partly done entry is solid to its fraction, with the stopped tick at that point, and checking a step extends the line. Raises: state by line form and a written word, never by color alone (emission rail); one continuous record line with visible gaps (provenance ribbon); achromatic text fields (iridescent edge); flush left, never centred (seedbed).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
