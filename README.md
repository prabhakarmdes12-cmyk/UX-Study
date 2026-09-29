# UX Study and Design Practice Studio

A private, speaking-first practice workspace for senior product-design interview preparation. It combines daily exercises, design challenges, portfolio evidence, study notes, voice practice, and a 60-day curriculum.

## What is included

- Seven-day guided starter programme
- Sixty-day product-design curriculum
- Forty design challenges across consumer, enterprise, accessibility, search, AI, and interaction craft
- Thirty behavioral and portfolio prompts
- Speaking timer, browser audio recording, playback, and private storage
- Portfolio story bank with evidence labels
- Study modules and links to primary design sources
- Progress, reflection, and export tools

The original `Prabhakar_Senior_Product_Designer_Interview_Study_Playbook.docx` remains in this repository as source material.

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

## Product principles

- Speaking is part of every practice day.
- Exercises train decisions and trade-offs rather than memorised answers.
- Personal claims must be verified before they enter interview stories.
- Recordings are uploaded only after the user explicitly chooses **Save recording**.
- Company sections are practice lenses, not claims about internal hiring rubrics.
