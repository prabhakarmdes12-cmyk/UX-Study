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

Source materials in this repository:
- `Prabhakar_Product_Design_Interview_Masterbook_Apple_Google.docx` (2026 Masterbook)
- `Prabhakar_Senior_Product_Designer_Interview_Study_Playbook.docx` (Foundation Playbook)

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
