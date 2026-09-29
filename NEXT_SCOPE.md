# Next Scope — From Interview Studio to a Daily Learning OS for Designers

**Status:** Definition (scope document) · Audience: self / collaborators · Date: 2026-09

---

## 1. Why this scope exists

The studio's first mission — *crack the senior product-design interview* — has an expiry
date. The day after Prabhakar signs an offer, 95 challenges and a 60-day plan lose
their urgency, but not their worth. The underlying need never expires:

> **Stay fundamentally aware of UX principles, keep them refreshed daily, and keep
> deepening from foundations toward craft mastery — for as long as one practises design.**

This document defines the next scope: **Kaizen Mode (改善)** — a 10-minute daily
learning experience that starts where the interview ends.

### Goals
1. A daily habit small enough to survive busy weeks (≤ 10 min/day).
2. Fundamentals → pro: structured depth across all 10 encyclopedia domains, with
   honest self-knowledge of what is weak.
3. A living connection between design principles and older wisdom (Gita,
   Ramcharitmanas, Reiki, Zen, and fellow traditions) — because principles that
   touch two worlds are remembered twice as long.
4. Staying *updated*: a light, sustainable way to track how platforms and
   standards (HIG, Material, WCAG, PAIR) actually change.

### Non-goals (explicitly out of scope)
- News aggregation / feeds. This is a practice space, not a reader.
- Any scoring, gamified points, or social leaderboards.
- Job-search features (application tracking, referrals).
- Content farming: every new topic must be human-written and cited, not generated filler.

---

## 2. Persona shift

| | Phase 1 (current) | Phase 2 (Kaizen Mode) |
|---|---|---|
| Identity | Candidate preparing for interviews | Practising designer staying sharp |
| Time available | 45 min/day structured | 10 min/day, flexible |
| Motivation | Outcome (offer) | Mastery & identity ("I am a student of design") |
| Content | Mock loops, challenges, story bank | Same + principles, mirrors, living sources |
| Success | Interview performance | Recall depth, applied reasoning, long streaks of small days |

---

## 3. Experience pillars

### Pillar A — Principle of the Day (the 10-minute loop)
One card from the encyclopedia, served fresh each morning (deterministic rotation
by date, or drawn from the learner's *weakest* domain).

Daily loop:
1. **Recall** (2 min) — read the mental-model prompt (flashcard mode), say the
   principle aloud before revealing.
2. **Read** (3 min) — the deep dive: principles, real-world case.
3. **Reflect** (2 min) — the *Wisdom Mirror*: the same principle in an older tongue.
   One sentence in your notes: what did the mirror add?
4. **Apply** (3 min) — write one line connecting the principle to live work (a real
   screen, a real decision, a real argument you need to win).
5. **Mark** — update revision status; the progress pill and heat map respond.

*Definition of done:* selectable "daily dose" state, streak counter, weakest-domain
weighting, one-tap handoff to the Speaking Studio (already built).

### Pillar B — Spaced revision with honest decay
Learning science over streak vanity:
- `Mastered` topics **decay to "Refresh"** after 90 days without a re-visit —
  mastery is a subscription, not a trophy.
- A simple **review queue**: topics past their interval (1d → 3d → 7d → 30d → 90d)
  surface in the daily dose first.
- Revision statuses already persist (`encyc_topics`); decay adds a `lastReviewedAt`
  timestamp to the same entry.

*Definition of done:* queue derived purely client-side from existing entries data;
no schema migration beyond the timestamp field.

### Pillar C — Foundations → Pro pathway (three shelves)
Structure the library into shelf tiers so a junior can start and a staff designer
can stay:
- **Shelf 1 · Fundamentals (new, ~40 topics):** what a user is, what research is,
  colour/typography/IA basics, usability heuristics, plain-language writing,
  basic accessibility. Written gentler, with more "why".
- **Shelf 2 · Senior (current 41 topics):** judgment, trade-offs, systems.
- **Shelf 3 · Staff (new, ~25 topics):** influence across teams, design strategy,
  org design of quality, business models, platform thinking.

Every shelf topic keeps the same anatomy: mental model → principles → real case →
wisdom mirror → say-aloud → status.

### Pillar D — Wisdom Mirrors (shipped: this release)
Each topic pairs with a parallel from an older tradition — the *bridging layer*
that lets the reader feel design in two worlds at once. Expand over time with a
reader-suggested mirrors notebook (private notes already exist per topic).

### Pillar E — Living update habit ("Watchtower")
Staying *fundamentally aware* without drowning:
- **Monthly, 20 minutes:** one primary source checked deliberately
  (HIG updates, Material blog, WCAG errata, PAIR/ADS guidance) → logged in the
  existing *update journal* (`learning_log`) with a fixed template:
  *What changed → why it matters → what of ours it invalidates → one sketch seeded.*
- A quarterly **"re-verify the canon"** pass across Pathway topics: sources age;
  dates on claims are part of the content model, never an afterthought.

### Pillar F — Craft-in-the-wild log
Once a day (optional): photograph/screenshot one real interface moment, tag it
with a principle, write two sentences (what principle is alive or violated here).
Private by default; export-ready for portfolio or mentoring conversations.

---

## 4. Phased delivery plan

| Phase | Theme | Scope | Exit criteria |
|---|---|---|---|
| **Now** (shipped) | Encyclopedia + mirrors + visible a11y controls | 41 topics, 41 mirrors, display toolbar | Merged to main |
| **Next 1** | Daily dose & streaks | Principle of the Day, streak chip, weekly heatmap reuse | Loop completable in ≤10 min |
| **Next 2** | Spaced revision | `lastReviewedAt`, decay to Refresh, review queue | Queue drives daily dose |
| **Next 3** | Shelf 1 (Fundamentals) | ~40 foundational topics, gentler voice | Junior-readable, same anatomy |
| **Next 4** | Shelf 3 (Staff) | ~25 leadership/strategy topics | Senior→Staff bridge complete |
| **Later** | Watchtower prompts, craft log, mentor share-outs | Reminders, monthly template nudges | Sustainable at 10 min/day |

## 5. Success measures (for the learning experience itself)

| Signal | Healthy target | Guardrail |
|---|---|---|
| Days with a completed loop / week | ≥ 5 | Never nag; absence is information, not failure |
| Topics re-recalled after decay | ≥ 80% of the refresh queue monthly | Decay interval tuned, not gameable |
| Shelf coverage | Every domain touched per fortnight | No domain starved 30+ days |
| Update-journal entries | ≥ 2 / month | Quality: each has a "what it invalidates" line |
| Say-aloud recordings revisited | ≥ 1 self-review / week | Self-review, not automated scoring |

## 6. What today's build already seeds

- **41 topics with full anatomy** — the deep library the daily dose draws from.
- **41 Wisdom Mirrors** — Pill D shipped.
- **Revision statuses + progress pill** — the data spine for decay and queues.
- **Flashcard mode** — the Recall step of the daily loop, already built.
- **Speak-aloud handoff with timer** — the verbalisation step, already built.
- **Visible accessibility toolbar** — the learning surface itself is now adjustable.
- **Update journal** — the Watchtower's home, already exists.

## 7. Guiding principles for every addition

1. **Small beats complete.** A daily 10 minutes kept for a year beats any curriculum abandoned at week three.
2. **Two tongues, one truth.** Every principle must survive translation — into a real product decision, and into an older, wiser sentence.
3. **Honesty over vanity.** Decay, refresh, and "not yet mastered" are features of integrity, exactly like guardrail metrics are for products.
4. **Accessible by default.** The studio teaches AA standards; it must embody them — visibly.
