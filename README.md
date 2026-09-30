# UX Study and Design Practice Studio

A private, speaking-first practice workspace for senior product-design interview preparation. It combines daily exercises, design challenges, portfolio evidence, study notes, voice practice, and a 60-day curriculum.

## What is included

- Seven-day guided starter programme
- Sixty-day product-design curriculum
- 95 design challenges across Apple, Google, Atlassian, and general product design (consumer, enterprise, accessibility, search, AI, and interaction craft)
- Dedicated company tracks: 20 Apple craft exercises, 25 Google scale/AI exercises, and 10 Atlassian enterprise workflow exercises
- 30 product and interaction design critique teardowns (Google, Apple, Spotify, Amazon, Slack, Notion, Jira, Gov Portal, AI)
- Mock interview loop simulation decks with timed rounds for Apple, Google, Atlassian, Portfolio Defense, and Whiteboard
- Thirty behavioral and leadership prompts
- Speaking timer, browser audio recording, playback, and private storage
- Portfolio story bank with 12-field evidence discipline
- Study modules and links to primary design sources
- Progress, reflection, and export tools
- Interactive UX Encyclopedia: 41 study topics across 10 design domains, each with a wisdom mirror pairing the principle with older traditions (Gita, Ramcharitmanas, Reiki, Zen…)
- Kaizen daily loop: Principle of the Day with streaks, plus 20 skill drills (sketch / read / observe / write / audit / measure / systems) with a focus timer
- **Sharpness Lab**: a rotating 10–15 minute judgment gym built on one loop — Observe → Diagnose → Decide → Defend → Measure — with eight practice modes, a shared self-review rubric, a weekly rhythm, and a private Critique Library
- Visible accessibility toolbar: text size, high contrast, calm motion, comfortable reading

Source materials in this repository:
- `Prabhakar_Product_Design_Interview_Masterbook_Apple_Google.docx` (2026 Masterbook)
- `Prabhakar_Senior_Product_Designer_Interview_Study_Playbook.docx` (Foundation Playbook)

## Sharpness Lab

Reading makes you informed; the lab makes you fast and defensible. One rep a day,
ten to fifteen minutes, rotating automatically by date. Every mode ends in the same
self-review — six dimensions, three honest levels, **no score** — and hands back the
single weakest dimension plus the drill that repairs it.

| Mode | What it trains | Content |
|---|---|---|
| Critique Sprint | Reading an unfamiliar interface without drifting into taste | 12 surfaces with observable signals, a sharp-answer lens, and the common trap |
| Constraint Injection | Adaptability — a surprise lands mid-challenge | 14 constraints paired with any of the 95 design challenges |
| Metrics Gym | North stars, guardrails, diagnosis, vanity detection | 12 reps across five kinds |
| Research Synthesis | Evidence discipline: observation before interpretation | 6 studies, sorted interactively, each with a real contradiction |
| Executive Summary | Compression at 30 seconds, 2 minutes, 5 minutes | Per-length checklists, cut lists, and recording handoffs |
| Portfolio Cross-Examination | Ownership and evidence under follow-ups | 12 questions bound to your own story-bank fields |
| Accessibility Repair Lab | Finding barriers, then ranking them by harm | 6 flawed screens, 38 defects with WCAG 2.2 references |
| Product Failure Autopsy | Desirability / usability / feasibility / viability / trust | 8 publicly reported cases; commit to a lens before the verdict |

The weekly rhythm (Monday critique → Sunday autopsy and revision) chooses the mode
for you; the Today screen links straight into that day's rep.

**Critique Library.** Captures save alongside your five answers, a principle tag, and
an optional screenshot. Notes sync with the rest of your practice; screenshots are
downscaled and stored only in this device's IndexedDB, never uploaded. The whole
library exports to Markdown.

## Run locally

Requirements: Node.js 22.13 or newer.

```powershell
npm ci
npm run dev
```

Open `http://127.0.0.1:5173`.

The local preview supplies a test ChatGPT identity. Persistent notes use the included D1 schema, and audio recordings use the configured object-storage binding when deployed through Sites.

## Useful commands

```powershell
npm run dev
npm run build
npm run db:generate
```

## Beyond the interview — Kaizen Mode

The studio is built to outlive the job hunt. See [`NEXT_SCOPE.md`](NEXT_SCOPE.md) for the
defined next scope: a 10-minute daily learning experience (Principle of the Day, spaced
revision with honest decay, Foundations → Senior → Staff shelves, Wisdom Mirrors pairing
each UX principle with the Gita, Ramcharitmanas, Reiki, and fellow traditions, and a
monthly "watchtower" habit for tracking how platforms and standards actually change).

## Product principles

- Speaking is part of every practice day.
- Exercises train decisions and trade-offs rather than memorised answers.
- Personal claims must be verified before they enter interview stories.
- Recordings are uploaded only after the user explicitly chooses **Save recording**.
- Company sections are practice lenses, not claims about internal hiring rubrics.
