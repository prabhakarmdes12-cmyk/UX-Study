// ═══════════════════════════════════════════════════════════════════════════
// SHARPNESS LAB — content spine
// ---------------------------------------------------------------------------
// A rotating 10–15 minute practice area that trains fast, defensible product
// judgment. Everything here is built on one loop:
//
//     Observe → Diagnose → Decide → Defend → Measure
//
// Reading is not the point. Each mode forces a decision under time pressure,
// then a self-review against a shared rubric. No scores, no points — the
// output is always a named weakness and one repair.
//
// Company and product references are practice lenses drawn from publicly
// reported behaviour. They are not claims about internal strategy, and the
// "publicly reported" line on each autopsy names where the account comes from.
// ═══════════════════════════════════════════════════════════════════════════


// ── The five actions ───────────────────────────────────────────────────────

export type SharpAction = 'observe' | 'diagnose' | 'decide' | 'defend' | 'measure';

export interface ActionStep {
  id: SharpAction;
  label: string;
  question: string;
  seconds: number;
  prompt: string;
  good: string;
  failure: string;
}

export const sharpActions: ActionStep[] = [
  {
    id: 'observe',
    label: 'Observe',
    question: 'What is happening?',
    seconds: 120,
    prompt: 'Describe only what is present — elements, order, wording, timing, what the person physically does. No causes, no adjectives, no fixes.',
    good: 'Facts another person could verify from the same screen: “The primary action stays enabled before any option is chosen.”',
    failure: 'Sneaking a verdict into the description — “the layout is confusing” is a conclusion wearing an observation’s coat.',
  },
  {
    id: 'diagnose',
    label: 'Diagnose',
    question: 'What is the real user or product problem?',
    seconds: 180,
    prompt: 'Name the person, the job they are mid-way through, and the moment the product stops helping. Separate the symptom from the cause.',
    good: 'One sentence with a person, a situation, and a blocked outcome — plus what you would need to see to be proven wrong.',
    failure: 'Diagnosing the interface instead of the job: “the form is too long” when the real problem is that nobody has the document it asks for.',
  },
  {
    id: 'decide',
    label: 'Decide',
    question: 'What would you change first?',
    seconds: 180,
    prompt: 'One first move. Not a roadmap, not three options — the single change you would defend in a review on Monday, and its rough cost.',
    good: 'A specific, buildable change with a stated reason for being first: highest harm, cheapest reversal, or unblocks the rest.',
    failure: 'A list. A list is a way of avoiding the decision while appearing thorough.',
  },
  {
    id: 'defend',
    label: 'Defend',
    question: 'Why this choice over alternatives?',
    seconds: 180,
    prompt: 'Name the two alternatives you rejected, why they lose here, and what your choice makes worse. Then name who would object and what they are right about.',
    good: 'A real trade-off, stated before anyone asks for it, with the strongest counter-argument quoted fairly.',
    failure: 'Defending with intensity rather than reasoning — or pretending the choice has no cost.',
  },
  {
    id: 'measure',
    label: 'Measure',
    question: 'How will you know it worked?',
    seconds: 120,
    prompt: 'One primary signal, one guardrail that must not degrade, one segment, one time window, and the result that would make you revert.',
    good: '“Within two weeks, first-attempt completion for new payees rises, while support contacts about wrong recipients does not.”',
    failure: 'Naming a metric with no window, no segment, and no number that would make you undo the change.',
  },
];


// ── Reusable self-review rubric ────────────────────────────────────────────
// Used after every mode. Three honest levels, no score, no streak inflation:
// the output is the weakest dimension plus the repair drill for it.

export type RubricLevel = 'developing' | 'solid' | 'senior';

export const rubricLevels: { id: RubricLevel; label: string; hint: string }[] = [
  { id: 'developing', label: 'Developing', hint: 'I could not do this without stalling or hedging.' },
  { id: 'solid', label: 'Solid', hint: 'I did it, but it took prompting or a second pass.' },
  { id: 'senior', label: 'Senior', hint: 'I did it unprompted, out loud, first time.' },
];

export interface RubricDimension {
  id: string;
  label: string;
  asks: string;
  action: SharpAction;
  levels: Record<RubricLevel, string>;
  repair: string;
}

export const sharpRubric: RubricDimension[] = [
  {
    id: 'framing',
    label: 'User & job named first',
    asks: 'Did a specific person and their in-progress job appear before any solution did?',
    action: 'diagnose',
    levels: {
      developing: 'I started with the interface or the feature.',
      solid: 'I named a user, but generically (“the user”, “customers”).',
      senior: 'I named the person, their situation, and what progress was blocked — in one sentence.',
    },
    repair: 'Run one Critique Sprint and forbid yourself from proposing anything for the first two minutes.',
  },
  {
    id: 'evidence',
    label: 'Evidence separated from assumption',
    asks: 'Is every claim either something observed, or explicitly labelled as an assumption with a test?',
    action: 'observe',
    levels: {
      developing: 'I asserted causes I had not seen.',
      solid: 'I mostly stayed honest but blurred one or two claims.',
      senior: 'Every claim was tagged: observed, inferred, or assumed — and the assumptions carried a cheap test.',
    },
    repair: 'Run a Research Synthesis Drill and sort every line into observation or interpretation before reading the debrief.',
  },
  {
    id: 'decision',
    label: 'One first move',
    asks: 'Did you commit to a single first change, with a reason for it being first?',
    action: 'decide',
    levels: {
      developing: 'I listed options and let the listener choose.',
      solid: 'I chose, but only after being pushed.',
      senior: 'I chose immediately and said why this one is first — harm, cost, or unblocking.',
    },
    repair: 'Run a Constraint Injection and answer the reveal within sixty seconds, out loud, with one move.',
  },
  {
    id: 'tradeoff',
    label: 'Trade-off named honestly',
    asks: 'Did you say what gets worse, who loses, and what you would watch for?',
    action: 'defend',
    levels: {
      developing: 'I presented the change as free.',
      solid: 'I named a cost when asked.',
      senior: 'I volunteered the cost, the objector, and what they are right about.',
    },
    repair: 'Take yesterday’s decision and argue the opposing case for two minutes without defending yourself.',
  },
  {
    id: 'measurement',
    label: 'Measurable and falsifiable',
    asks: 'Primary signal, guardrail, segment, window — and the result that would make you revert?',
    action: 'measure',
    levels: {
      developing: 'I named no measure, or a metric with no window.',
      solid: 'I named a primary metric but no guardrail or revert condition.',
      senior: 'I named signal, guardrail, segment, window, and the number that would undo the change.',
    },
    repair: 'Run one Metrics Gym rep on the same problem and write the revert condition first.',
  },
  {
    id: 'compression',
    label: 'Compression',
    asks: 'Could a busy stakeholder repeat your answer back correctly after hearing it once?',
    action: 'defend',
    levels: {
      developing: 'I needed the whole story to make the point.',
      solid: 'Two minutes was clear; thirty seconds was not.',
      senior: 'The thirty-second version carried decision, reason, and cost.',
    },
    repair: 'Record the 30-second Executive Summary of this session and delete every clause the listener already knows.',
  },
];


// ── Modes ──────────────────────────────────────────────────────────────────

export type SharpModeId =
  | 'critique' | 'constraint' | 'metrics' | 'synthesis'
  | 'summary' | 'crossexam' | 'a11yrepair' | 'autopsy';

export interface SharpMode {
  id: SharpModeId;
  name: string;
  short: string;
  tagline: string;
  minutes: number;
  trains: string;
  actions: SharpAction[];
  steps: string[];
  senior: string;
}

export const sharpModes: SharpMode[] = [
  {
    id: 'critique',
    name: 'Critique Sprint',
    short: 'Critique',
    tagline: 'Five minutes, five questions, one defensible first change.',
    minutes: 5,
    trains: 'Reading an unfamiliar interface fast without drifting into taste.',
    actions: ['observe', 'diagnose', 'decide', 'defend', 'measure'],
    steps: [
      'Read the surface and its observable signals — no fixing yet.',
      'Answer all five questions inside five minutes, out loud if you can.',
      'Open the sharp-answer lens and mark where you were softer than it.',
      'Save the sprint to your Critique Library, with a screenshot if you have one.',
    ],
    senior: 'Seniority shows in which hesitation you choose to fix first — and in naming what your fix costs the business.',
  },
  {
    id: 'constraint',
    name: 'Constraint Injection',
    short: 'Constraint',
    tagline: 'A normal challenge, then a surprise at the halfway mark.',
    minutes: 12,
    trains: 'Adaptability. Rehearsed answers collapse; reasoning survives.',
    actions: ['decide', 'defend', 'measure'],
    steps: [
      'Start any design challenge and work it normally for six minutes.',
      'Reveal the constraint. Do not restart — adapt out loud within sixty seconds.',
      'State what you keep, what you drop, and what you now refuse to promise.',
      'Compare against the cheap answer and the sharp answer.',
    ],
    senior: 'The tell is whether you protect the user’s outcome or your original solution.',
  },
  {
    id: 'metrics',
    name: 'Metrics Gym',
    short: 'Metrics',
    tagline: 'Short reps connecting a design decision to an outcome.',
    minutes: 10,
    trains: 'Measurement judgment: north stars, guardrails, diagnosis, and vanity detection.',
    actions: ['diagnose', 'measure'],
    steps: [
      'Read the scenario once. Resist proposing a redesign.',
      'Work the rep’s tasks in order, writing single lines, not paragraphs.',
      'Name the segment and the window before you name any number.',
      'Read the defensible read, then write what you still cannot conclude.',
    ],
    senior: 'Staff-level reading is causal honesty: which input actually drives the outcome, and which correlation is flattering you.',
  },
  {
    id: 'synthesis',
    name: 'Research Synthesis Drill',
    short: 'Synthesis',
    tagline: 'Six to eight raw notes. Find the pattern without inventing one.',
    minutes: 15,
    trains: 'Evidence discipline — and the restraint to stop before solutioning.',
    actions: ['observe', 'diagnose'],
    steps: [
      'Sort every item: observation or interpretation. Be strict.',
      'Cluster the observations. Name each cluster in the user’s language.',
      'Find the contradiction. Do not resolve it by ignoring one side.',
      'Write one insight, one opportunity statement, and what cannot yet be concluded.',
    ],
    senior: 'Anyone can cluster. Seniority is naming the contradiction and the limit of the evidence.',
  },
  {
    id: 'summary',
    name: 'Executive Summary Mode',
    short: 'Summary',
    tagline: 'The same decision at thirty seconds, two minutes, and five.',
    minutes: 10,
    trains: 'Compression — usually the gap between a good designer and a convincing one.',
    actions: ['defend'],
    steps: [
      'Take the work you just finished in any other mode.',
      'Write and record the 30-second version: decision and rationale only.',
      'Then the 2-minute version: problem, evidence, decision, trade-off.',
      'Then the 5-minute version: the full strategic case, including what you rejected.',
    ],
    senior: 'If the five-minute version is the only one that convinces, the decision is not finished being made.',
  },
  {
    id: 'crossexam',
    name: 'Portfolio Cross-Examination',
    short: 'Cross-exam',
    tagline: 'Your own stories, turned into the questions that hurt.',
    minutes: 12,
    trains: 'Ownership clarity and evidence that survives follow-ups.',
    actions: ['defend', 'measure'],
    steps: [
      'Choose one story from your evidence bank.',
      'Draw a question. Answer it in ninety seconds, out loud, without notes.',
      'Check the answer against the linked evidence field — if the field is empty, the claim is not yet usable.',
      'Log the weakest answer and rewrite that field in My stories today.',
    ],
    senior: 'Interviewers are not testing the project. They are testing whether your account of it changes under pressure.',
  },
  {
    id: 'a11yrepair',
    name: 'Accessibility Repair Lab',
    short: 'Access.',
    tagline: 'A flawed screen. Find the defects — then prioritise them.',
    minutes: 12,
    trains: 'Seeing barriers fast, and ranking them by harm rather than by ease.',
    actions: ['observe', 'diagnose', 'decide'],
    steps: [
      'List what you can find across seven categories before revealing anything.',
      'Reveal the defect set and mark what you missed.',
      'Rank them: what blocks a task completely, what is recoverable, what is friction.',
      'Choose the one repair you would ship this sprint and defend the order.',
    ],
    senior: 'Listing violations is an audit. Ordering them by who is blocked, and shipping one, is design leadership.',
  },
  {
    id: 'autopsy',
    name: 'Product Failure Autopsy',
    short: 'Autopsy',
    tagline: 'A publicly reported failure. Which risk was actually mispriced?',
    minutes: 15,
    trains: 'Mature product judgment across desirability, usability, feasibility, viability, and trust.',
    actions: ['observe', 'diagnose', 'measure'],
    steps: [
      'Read what happened. Write the user behaviour you think was misunderstood.',
      'Choose the dominant risk before reading the verdict — commit to one.',
      'Name the earliest signal that could have exposed it, and when it was available.',
      'Design the smaller experiment that should have run first.',
    ],
    senior: 'The useful question is never “was it a bad idea”. It is “what would have made the bad news arrive earlier and cheaper”.',
  },
];


// ── 1 · Critique Sprint ────────────────────────────────────────────────────

export interface CritiqueSprint {
  id: string;
  surface: string;
  sector: 'Consumer' | 'Enterprise' | 'Public' | 'AI' | 'Physical';
  context: string;
  signals: string[];
  lens: string;
  trap: string;
  topicId: string;
}

export const critiqueQuestions = [
  'Who is the likely user, in what situation?',
  'What is the primary job they are trying to finish?',
  'Where could they hesitate, doubt, or fail?',
  'What should change first — one move?',
  'What trade-off would that change create?',
];

export const critiqueSprints: CritiqueSprint[] = [
  {
    id: 'cs-seatmap',
    surface: 'Airline app · seat selection after payment',
    sector: 'Consumer',
    context: 'A traveller has paid for a flight and is pushed into seat selection on a phone, twelve hours before departure.',
    signals: [
      'The cabin map renders at roughly 40% scale; seat labels are legible only after pinch-zoom.',
      'Seats are priced £0, £18, £34 and £64 with no stated difference between the tiers.',
      'The “Continue” button is enabled before any seat is chosen.',
      'Exit-row seats show a padlock with no explanation of the restriction.',
      '“Skip for now” is grey text below the fold, under the price legend.',
    ],
    lens: 'The job is not “pick a seat”. It is “avoid a bad three hours without overpaying for something I cannot evaluate”. The hesitation is price legibility: nothing on screen explains what £34 buys, so the traveller either overpays defensively or abandons and resents it later. First move: attach one concrete consequence to each price tier at the point of choosing (legroom in centimetres, boarding order, refundability) and make the free path honest and reachable. Trade-off: transparent tiers will cut impulse upsells on the cheapest tier, and revenue owners will feel it inside a week — so pair it with the guardrail that matters, seat-selection revenue per passenger, and watch abandonment at payment as the offsetting signal.',
    trap: 'Redesigning the seat map. The map is fine; the pricing story is missing.',
    topicId: 'fitts-law',
  },
  {
    id: 'cs-transfer',
    surface: 'Retail banking · first transfer to a new payee',
    sector: 'Consumer',
    context: 'Someone is paying a builder £2,400 for the first time, on a laptop, while the builder waits on the phone.',
    signals: [
      'Account number and sort code validate only after submit.',
      'A name-check result reads “Close match” with no detail about what differed.',
      'A fraud warning modal requires five checkboxes before the button enables.',
      'The final screen shows the amount but not the payee name, date, or fee.',
      'Nothing on screen says whether the transfer can be recalled.',
    ],
    lens: 'The user is doing two jobs at once: move money, and not get scammed. The dangerous moment is “Close match” — a verdict with no evidence, delivered exactly where doubt should be resolvable. People resolve unexplained doubt by proceeding, because the builder is waiting. First move: replace the verdict with the difference (“You entered J Patel · the account is registered to Jyoti Patel Ltd”) and put the payee name on the confirmation screen. Trade-off: showing part of the registered name is a data-exposure decision that needs financial-crime sign-off, and it lengthens the flow by one read; the compensation is that the five-checkbox ritual can then be cut, because warning fatigue is the real cost of the current design.',
    trap: 'Adding another warning. The screen already warns; it does not inform.',
    topicId: 'feedback-states',
  },
  {
    id: 'cs-substitutions',
    surface: 'Grocery delivery · substitutions',
    sector: 'Consumer',
    context: 'A shopper is buying ingredients for a specific meal; the picker is in the store two hours later.',
    signals: [
      '“Allow substitutions” is one global toggle, defaulted on, in the basket footer.',
      'Per-item preferences exist but are hidden behind a chevron on each row.',
      'Replacements are announced by push notification with a two-minute window to reject.',
      'Refunds for rejected items appear three to five days later.',
      'The order summary lists items alphabetically, not by the meal they belong to.',
    ],
    lens: 'The atomic unit in the user’s head is the meal, not the item. A global toggle forces one policy across items with wildly different tolerances — swapping oat milk for dairy can be a medical problem; swapping basil for parsley ruins a dish; swapping one pasta brand for another is nothing. First move: let criticality be set per item at the moment of adding, with a default inferred from category (allergen-bearing items default to “no substitution”). Trade-off: more decisions during shopping, and pickers get a harder constraint set, which raises per-order pick time — so measure rejected-substitution rate and refund volume against pick time, not against basket size.',
    trap: 'Improving the two-minute notification. The decision was already lost at basket time.',
    topicId: 'journey-mapping',
  },
  {
    id: 'cs-cancel',
    surface: 'Subscription cancellation on the web',
    sector: 'Consumer',
    context: 'A customer has decided to leave and is trying to cancel before the next billing date, which is tomorrow.',
    signals: [
      'Cancellation is unavailable in the mobile app; the help article says “use a desktop browser”.',
      'The flow has four steps, two of which offer a pause instead.',
      '“Keep my plan” is the coloured button; “Continue cancelling” is grey text.',
      'The final confirmation says an email will arrive “within 24 hours”.',
      'No screen states the date access actually ends.',
    ],
    lens: 'The user is not undecided — they have decided, and the product is arguing with them. Every extra step converts a neutral departure into a story people tell. First move: state the end date and the final charge on step one, and make the confirmation immediate rather than promised; the save offer earns exactly one screen, not two. Trade-off: measured save rate will fall, and whoever owns retention will see it first — so the honest frame is that save rate is the vanity metric here, and the pair to watch is win-back rate at ninety days plus contact volume tagged “cancel”.',
    trap: 'Calling it a dark pattern and stopping. Name the metric that pays for the pattern, or the argument goes nowhere.',
    topicId: 'guardrail-metrics',
  },
  {
    id: 'cs-sso',
    surface: 'Enterprise SSO · first login fails',
    sector: 'Enterprise',
    context: 'A new employee, on day one, is trying to reach the tool their manager told them to use before a 10am meeting.',
    signals: [
      'The error reads “SAML assertion invalid (0x8004)”.',
      'Retry returns to the identity provider and back to the same error.',
      'The only link is a generic help centre home page.',
      'There is no way to identify or contact the administrator who owns the configuration.',
      'Nothing on the page can be copied except by selecting the text manually.',
    ],
    lens: 'Two users share this failure: the employee, who cannot work, and the IT admin, who does not yet know anything is wrong. The product currently serves neither. Recovery is the product in enterprise — the buyer judges you on the bad day. First move: name the failing party and give the employee a one-tap “send this to your admin” action carrying a copyable diagnostic and the exact configuration field at fault. Trade-off: exposing which claim failed is a small information-disclosure surface and needs security review, and it shifts support load from your queue to the customer’s admin — which is right, but must be said out loud to the support org rather than discovered by them.',
    trap: 'Rewriting the error text and calling it fixed. Plain language without a route to resolution is a politer dead end.',
    topicId: 'fail-points',
  },
  {
    id: 'cs-bulkedit',
    surface: 'Issue tracker · bulk edit across sixty tickets',
    sector: 'Enterprise',
    context: 'A team lead is re-assigning a sprint’s worth of tickets after a reorganisation, at the end of the day.',
    signals: [
      'Selection is lost when the list re-sorts after the edit is applied.',
      'A toast reads “60 issues updated”.',
      'Four updates silently failed on permissions; the toast did not mention them.',
      'Undo is offered for five seconds inside the toast.',
      'There is no record of the operation anywhere in the ticket history view.',
    ],
    lens: 'A bulk operation is a transaction, and transactions need receipts, not toasts. The user cannot verify what happened, cannot find what failed, and the only remedy expires in five seconds — faster than a human can read sixty outcomes. First move: replace the toast with a persistent operation record listing successes and failures, each linked, with per-item retry. Trade-off: it costs a real data model for operations and a new surface to maintain, and it makes failures visible that were previously invisible — expect the first week to look like a regression in quality when it is actually a regression in denial.',
    trap: 'Extending the undo window. Five seconds and thirty seconds are both guesses; the missing thing is the record.',
    topicId: 'optimistic-ui',
  },
  {
    id: 'cs-aiemail',
    surface: 'AI draft reply inside an email client',
    sector: 'AI',
    context: 'A support manager is clearing forty threads and taps “Draft with AI” on a complaint about a missed delivery.',
    signals: [
      'The draft appears fully written, in a confident tone, with a specific refund figure.',
      'Nothing indicates which parts of the thread the model used.',
      'An “AI-generated” chip disappears as soon as the user edits one word.',
      'Send is one tap from the draft, with no review step.',
      'There is no way to see what the model was uncertain about.',
    ],
    lens: 'The risk is not a bad sentence — it is a confident, specific, wrong commitment sent by a human who is skimming. Fluency is being used as a proxy for grounding, and the interface removes the one thing that would slow a skim: visible provenance. First move: bind the specific claims in the draft to the thread lines they came from, and make anything the model could not ground appear as an explicit blank the human must fill. Trade-off: drafts become slower and less magical, and the demo gets worse; measure it as commitments-sent-then-retracted rather than drafts accepted, or the wrong thing wins.',
    trap: 'Adding a disclaimer. Disclaimers move liability, not attention.',
    topicId: 'grounding-citations',
  },
  {
    id: 'cs-tracking',
    surface: 'Food delivery · live order tracking',
    sector: 'Consumer',
    context: 'A customer with a 13:00 meeting ordered lunch at 12:20 and is watching the map.',
    signals: [
      'The ETA moves from 12:40 to 13:05 with no explanation.',
      'The courier pin has not moved for four minutes.',
      'The screen shows no status text, only the map and the new time.',
      'Contacting support opens a bot with three canned options, none of which is “where is my order”.',
      'The original ETA is no longer visible anywhere.',
    ],
    lens: 'The job is planning, not watching. The user needs to decide whether to keep waiting or eat something else before a meeting — and the product hides exactly the information that decision requires. A silently rewritten ETA also destroys the credibility of every future ETA. First move: never replace an estimate silently; show the change, the reason, and a confidence range (“Now 13:05 — the restaurant is running late; couriers rarely make up more than five minutes at this hour”). Trade-off: admitting uncertainty invites cancellations from time-pressured users, which is a real revenue cost and the correct one — the guardrail is repeat-order rate after a late delivery, not cancellations on the day.',
    trap: 'Adding an animation to the frozen pin. Motion is not information.',
    topicId: 'latency-loading',
  },
  {
    id: 'cs-claim',
    surface: 'Insurance claim · document upload on mobile web',
    sector: 'Enterprise',
    context: 'A policyholder is standing in a flooded kitchen photographing damage on their phone.',
    signals: [
      'The uploader accepts PDF only, under 5 MB.',
      'Phone photos are HEIC and around 8 MB.',
      'The failure message reads “Invalid file”.',
      'The session expires after fifteen minutes and clears the answered questions.',
      'Nothing in the flow is saved until the final submit.',
    ],
    lens: 'The policy was written for a desktop-era claims process and is now being enforced against a wet person holding a phone. Every constraint here is a back-office preference exported to the worst possible moment. First move: accept what a phone actually produces — convert server-side, raise the limit, and persist progress on every field change so a dropped connection costs nothing. Trade-off: server-side conversion and autosave cost real engineering and storage, and the claims team loses the uniform PDFs their tooling expects; the honest comparison is that cost against the abandonment and call volume the current rule generates on the day of a flood.',
    trap: 'Rewriting “Invalid file” to be friendlier. The message is not the defect; the constraint is.',
    topicId: 'fail-points',
  },
  {
    id: 'cs-gov',
    surface: 'Public service · identity document renewal, step 3 of 9',
    sector: 'Public',
    context: 'An applicant with limited digital confidence is renewing a document that expires in three weeks.',
    signals: [
      'The progress indicator reads “Step 3 of 9”, but steps contain between one and fourteen questions.',
      '“Save and come back” requires an account that could only be created at step 1.',
      'The browser back button clears the current answer.',
      'Guidance is a link to a 40-page PDF that opens in the same tab.',
      'There is no summary of what documents will be needed before starting.',
    ],
    lens: 'The people most likely to need this service are the least likely to have an account, a scanner, or a second device — so every affordance assumes the user this flow is least designed for. The deepest failure is that the cost of starting is hidden: you cannot know what you need until you are already six screens in. First move: put a “what you will need” page before step 1 and make save-and-return work from a link sent to an email or phone number, with no account. Trade-off: link-based resumption is an identity-risk decision requiring fraud review, and “what you will need” will visibly reduce starts — which looks like a funnel regression while actually removing doomed attempts. Measure completion of started applications, not starts.',
    trap: 'Fixing the progress bar. Accurate progress on an unwinnable journey is just a better-calibrated disappointment.',
    topicId: 'wayfinding',
  },
  {
    id: 'cs-empty',
    surface: 'B2B analytics · first run after signup',
    sector: 'Enterprise',
    context: 'An evaluator during a trial opens the product for the first time, with fourteen minutes before their next meeting.',
    signals: [
      'Six chart cards show skeleton shimmer that never resolves, because no data source is connected.',
      '“Connect a data source” is a text link in the top-right corner.',
      'A five-step product tour launches automatically over the empty charts.',
      'Sample data exists but is switched on from a settings page.',
      'Nothing on screen states what the product will look like once connected.',
    ],
    lens: 'The empty state is the onboarding, and here it is impersonating a broken product: shimmer is a promise that something is loading, so the first impression is failure rather than invitation. The evaluator’s job is to decide, in one sitting, whether this tool can answer a question they already have. First move: replace the shimmer with a real sample workspace they can explore immediately, and make connecting a data source the single primary action on the page. Trade-off: sample data risks being mistaken for real data — every chart needs unmistakable labelling and a one-tap exit — and an easy sample mode can delay the connection that actually predicts retention, so watch time-to-first-connected-source as the guardrail, not tour completion.',
    trap: 'Improving the product tour. A tour over an empty room teaches nothing.',
    topicId: 'feedback-states',
  },
  {
    id: 'cs-kiosk',
    surface: 'Parking payment kiosk in daylight',
    sector: 'Physical',
    context: 'A driver in bright sun, holding a coffee, with two people queueing behind them and eight minutes of grace period left.',
    signals: [
      'The screen is glossy; in direct sun the low-contrast grey-on-white labels are unreadable.',
      'The card reader sits above the keypad, so the hand obscures the prompt while typing.',
      'The plate number must be typed on an alphanumeric grid with no visible delete key.',
      'Confirmation is a printed receipt; there is no on-screen confirmation.',
      'A sticker on the housing explains the app alternative in 9pt type.',
    ],
    lens: 'Context of use is the whole design here: sun, queue pressure, one free hand, and a consequence (a fine) that is far larger than the transaction. The failure is error recovery under social pressure — no delete key means a mistyped plate becomes a ticket, and the queue discourages care. First move: put an always-visible delete and an on-screen plate confirmation before payment, at a contrast ratio chosen for sunlight, not for a design review on a calibrated monitor. Trade-off: hardware-constrained screens fit fewer elements, so something goes — likely the marketing panel and the app promotion; the measure is mistyped-plate appeals per thousand transactions, which the operator already tracks as a cost.',
    trap: 'Proposing the app. The person at the kiosk has already chosen not to install an app.',
    topicId: 'contrast-signals',
  },
];


// ── 2 · Constraint Injection ───────────────────────────────────────────────

export interface ConstraintCard {
  id: string;
  label: string;
  reveal: string;
  tests: string;
  cheap: string;
  sharp: string;
  firstMove: string;
  measure: string;
}

export const constraintCards: ConstraintCard[] = [
  {
    id: 'ci-capacity',
    label: 'Engineering capacity cut by 60%',
    reveal: 'Two of your five engineers were pulled to an incident. They are not coming back this quarter.',
    tests: 'Whether you can separate the value from the implementation you had imagined.',
    cheap: '“We’ll phase it” — with no statement of what phase one is worth on its own.',
    sharp: 'Name the one user outcome that must survive, then find the cheapest mechanism that delivers it — often manual, templated, or partially operational — and say plainly which part of the vision is now a hypothesis rather than a plan.',
    firstMove: 'Cut scope by removing users or cases, not by removing quality from the remaining ones. A narrower thing that works beats a full thing that half-works.',
    measure: 'Does phase one move the primary signal on its own? If it only makes sense once phase three ships, it is not a phase — it is a down payment.',
  },
  {
    id: 'ci-twoweeks',
    label: 'Launch must happen in two weeks',
    reveal: 'Marketing has committed the date publicly. Two weeks. The scope is what you can defend by then.',
    tests: 'Whether you can distinguish a real deadline from a reason to abandon judgment.',
    cheap: 'Shipping the same design with less polish and hoping nobody looks at the edge states.',
    sharp: 'Ask what the date actually buys, then ship the smallest complete experience for one segment rather than a partial experience for everyone — and state which failure modes you are accepting for two weeks and how you will detect them.',
    firstMove: 'Write the rollback plan first. A date you cannot reverse out of is a much worse constraint than a date you can.',
    measure: 'Put a kill-switch metric on the release: the number at which you turn it off rather than debate it.',
  },
  {
    id: 'ci-a11yfail',
    label: 'Accessibility audit failed',
    reveal: 'Nineteen findings. Four are blockers under WCAG 2.2 AA, including keyboard traps in the primary flow.',
    tests: 'Whether you triage by harm or by effort — and whether you treat compliance as the goal or the floor.',
    cheap: 'Fixing the contrast ratios first because they are easy, and scheduling the keyboard trap for “next quarter”.',
    sharp: 'Order by who is blocked from completing the task at all: keyboard traps and unlabelled controls first, because they make the flow impossible; contrast and text spacing next, because they make it hard; then everything else. Say out loud what the traps would cost a real person on a real day.',
    firstMove: 'Fix the blocker in the component, not in the screen — otherwise you repay the same debt in eleven other places.',
    measure: 'Track keyboard-only task completion as a real number, not audit findings closed. Findings closed is the vanity metric of accessibility work.',
  },
  {
    id: 'ci-trust',
    label: 'Conversion improved but trust declined',
    reveal: 'Conversion is up 12%. Survey trust score is down 8 points, and “felt pressured” is now the top verbatim theme.',
    tests: 'Whether you can hold a short-term win and a long-term loss in the same sentence without flinching.',
    cheap: 'Declaring the conversion win and promising to “monitor sentiment”.',
    sharp: 'Treat trust as the guardrail that just failed, and say so before the metrics owner does. Identify which specific mechanism produced the lift — urgency, defaults, obscured exits — and test whether the lift survives when that mechanism is made honest.',
    firstMove: 'Isolate the one element most likely responsible and run a variant without it. If conversion holds, you found free money. If it collapses, you found your actual business model, and that is a leadership conversation, not a design one.',
    measure: 'Pair conversion with the downstream number the pressure would poison: refunds, cancellations within thirty days, or repeat purchase.',
  },
  {
    id: 'ci-auditlogs',
    label: 'Enterprise customer needs audit logs',
    reveal: 'Your largest prospect will not sign without exportable audit logs of every permission change. Security review is in eleven days.',
    tests: 'Whether you can design for a user who is not the user — the auditor, the admin, the person reading this in a year.',
    cheap: 'Adding a log table to the settings page and calling it done.',
    sharp: 'Ask what question the auditor will ask of these logs — usually “who changed what, when, and on whose authority” — and design the record around answering that in one query, including the actor, the before state, and the reason if one was captured.',
    firstMove: 'Nail the data model and retention policy first; the table UI is the easy half and the half that can wait.',
    measure: 'Time for an admin to answer a real audit question unaided. If it takes a support ticket, the feature does not exist yet.',
  },
  {
    id: 'ci-aiconfidence',
    label: 'AI confidence is too low',
    reveal: 'The model is only 61% accurate on this task in production. Legal will not let it act autonomously.',
    tests: 'Whether you can design an honest partnership instead of hiding a weak model behind confident copy.',
    cheap: 'Adding “AI can make mistakes” under the output and shipping it anyway.',
    sharp: 'Change the interaction contract: at 61%, the system should propose rather than perform, show its evidence, and make the human correction the cheapest action on screen. Design what happens at the confidence floor too — silence is often better than a guess.',
    firstMove: 'Split the task. There is usually a sub-task the model is 95% accurate on (extraction, classification, drafting) hiding inside the one it is 61% on.',
    measure: 'Correction rate and time-to-correct, segmented by confidence band — plus how often users accept a wrong suggestion, which is the only number that measures harm.',
  },
  {
    id: 'ci-offline',
    label: 'The feature must work offline',
    reveal: 'Half the users are field technicians in basements and rural sites. No connection for hours at a time.',
    tests: 'Whether you understand that offline is a data-conflict problem wearing an interface costume.',
    cheap: 'Caching the screens and showing a grey banner when disconnected.',
    sharp: 'Decide which actions are safe to perform locally, what the system promises about them, and how conflicts resolve when two people edited the same record in different tunnels. Design the sync receipt: what was accepted, what was rejected, and what the technician must redo.',
    firstMove: 'Write the conflict policy before any screen: last-write-wins, field-level merge, or explicit human resolution. The UI follows from that choice and cannot precede it.',
    measure: 'Percentage of offline-created records that sync without human intervention, plus the count that silently lost data — which should be zero, not small.',
  },
  {
    id: 'ci-legal',
    label: 'Consent required before any personalisation',
    reveal: 'Legal now requires explicit, granular consent before you may use any behavioural data to personalise. Nothing is pre-ticked.',
    tests: 'Whether your product has value before it knows anything about the user.',
    cheap: 'A consent wall on first launch, worded to maximise acceptance.',
    sharp: 'Design the cold-start experience as a real product, not a punishment: sensible defaults, explicit user-stated preferences, and an earned moment later where personalisation is offered because the user can now see what it would do for them.',
    firstMove: 'Move the consent request to the moment of obvious benefit rather than the moment of first contact.',
    measure: 'Consent rate is not the goal — informed consent rate is. Watch withdrawal rate and complaint volume alongside it.',
  },
  {
    id: 'ci-nodata',
    label: 'The event you needed was never instrumented',
    reveal: 'The behaviour your case depends on has never been logged. Adding it takes three weeks and a release.',
    tests: 'Whether you can reason from proxies and qualitative evidence without overclaiming.',
    cheap: 'Asserting the behaviour anyway, on the strength of a strong feeling.',
    sharp: 'Name the cheapest proxy available now (support tags, session replays, a five-person study, a manual count over one afternoon), state its bias explicitly, and decide what it can and cannot license you to conclude.',
    firstMove: 'Instrument the event this sprint regardless — the next three decisions will need it — and make the decision now on labelled assumptions.',
    measure: 'Write the assumption as a falsifiable line with a date: “If this is true, event X will exceed Y within a month of instrumentation.”',
  },
  {
    id: 'ci-i18n',
    label: 'Eleven languages on day one, including right-to-left',
    reveal: 'Launch is global. Arabic and Hebrew are in the first wave, and German strings run about 35% longer than English.',
    tests: 'Whether your layout logic is structural or decorative.',
    cheap: 'Truncating with ellipses and promising to review it after launch.',
    sharp: 'Remove fixed widths and hard-coded direction from the components rather than from the screens; treat the longest plausible string as the design case; and check that icons, progress, and swipe gestures still mean the same thing mirrored.',
    firstMove: 'Run the two worst screens in the longest language and in RTL before committing the layout. It takes an hour and changes the component API.',
    measure: 'Layout defects per locale after launch, and task completion parity between the shortest and longest language.',
  },
  {
    id: 'ci-support',
    label: 'No new support contact reasons',
    reveal: 'Support is at capacity. The launch may not increase contact volume, and any new contact reason must be removed from somewhere else.',
    tests: 'Whether you design for the failure paths rather than the demo path.',
    cheap: 'Writing better help documentation.',
    sharp: 'Treat every possible confusion as a support ticket you must pre-pay for: make the error states self-resolving, expose status so nobody has to ask, and remove one existing contact reason as part of the same release.',
    firstMove: 'Read fifty recent tickets on the adjacent feature. The new feature will inherit their top two themes almost exactly.',
    measure: 'Contacts per thousand active users, by reason code, before and after — with the retired reason tracked separately so the swap is visible.',
  },
  {
    id: 'ci-nocomponent',
    label: 'The component you need does not exist',
    reveal: 'The design system has no pattern for this, and the systems team is frozen until next quarter.',
    tests: 'Whether you can distinguish a genuine new pattern from a preference.',
    cheap: 'Building a one-off in your feature and promising to contribute it back later. It will not be contributed back later.',
    sharp: 'Prove the need first: show the three places it would be reused, then compose from existing primitives if you can, and if you genuinely cannot, build it in the feature with the system’s tokens and a written migration note so the debt is visible and dated.',
    firstMove: 'Find the closest existing pattern and articulate exactly why it fails — that sentence is the contribution proposal.',
    measure: 'Count divergences that outlive their promised migration date. A system’s health is measured in unpaid promises.',
  },
  {
    id: 'ci-execpromise',
    label: 'An executive has already promised the UI',
    reveal: 'A specific screen was shown to a customer in a sales meeting. They are expecting it.',
    tests: 'Whether you can disagree upward without either capitulating or grandstanding.',
    cheap: 'Building it exactly as promised and privately resenting it.',
    sharp: 'Separate the promise from its mechanism: the customer was promised an outcome, and the screen was one representation of it. Go back with the outcome intact and a version that survives the other constraints, and be explicit about what changed and why the customer will still recognise what they were shown.',
    firstMove: 'Find out what the customer actually reacted to in the meeting. It is rarely the layout.',
    measure: 'The customer’s acceptance of the delivered outcome, not their memory of the slide.',
  },
  {
    id: 'ci-migration',
    label: 'Forty percent of users cannot migrate',
    reveal: 'Two in five users are on the old version and cannot be forced to upgrade for at least a year.',
    tests: 'Whether you can design for coexistence instead of a clean slate.',
    cheap: 'Designing for the new world and treating the remaining 40% as a support problem.',
    sharp: 'Decide what must stay identical across both versions (the shared data, the shared vocabulary, the shared support script) and what is allowed to diverge — then design the crossing point: what a user sees when they move, and what a colleague on the other version sees of their work.',
    firstMove: 'Map the handover moments where the two populations touch. Those are the only places the split is actually felt.',
    measure: 'Task success for cross-version collaboration, and the support contact rate from users on the old version — which is your real migration pressure gauge.',
  },
];


// ── 3 · Metrics Gym ────────────────────────────────────────────────────────

export type MetricsKind = 'northstar' | 'guardrail' | 'drop' | 'vanity' | 'qualitative';

export const metricsKindMeta: Record<MetricsKind, { label: string; blurb: string }> = {
  northstar: { label: 'North star', blurb: 'One measure of value delivered repeatedly — not activity dressed as health.' },
  guardrail: { label: 'Guardrails', blurb: 'The two numbers that must not degrade while you chase the first one.' },
  drop: { label: 'Diagnose a drop', blurb: 'Segment, instrument, seasonality, or genuine harm — in that order.' },
  vanity: { label: 'Vanity detection', blurb: 'A number that rises whatever you do is a decoration, not a signal.' },
  qualitative: { label: 'Qualitative gap', blurb: 'What the number cannot tell you, and the cheapest way to find out.' },
};

export interface MetricsRep {
  id: string;
  kind: MetricsKind;
  title: string;
  scenario: string;
  tasks: string[];
  read: string;
  trap: string;
  topicId: string;
}

export const metricsReps: MetricsRep[] = [
  {
    id: 'mg-ns-marketplace',
    kind: 'northstar',
    title: 'North star for a home-repair marketplace',
    scenario: 'A two-sided marketplace connects homeowners with vetted tradespeople. Leadership currently reports weekly job postings, and it keeps going up while revenue is flat.',
    tasks: [
      'Write one north-star statement in the form “value delivered, repeatedly, to whom”.',
      'List two input behaviours that plausibly drive it, each with a “because”.',
      'Add two guardrails — one for each side of the market.',
      'Name the segment and window you would report it on.',
    ],
    read: 'Postings measure intent, not value — and on a two-sided market, unmatched intent actively harms supply, because tradespeople who quote and lose stop quoting. A defensible north star is completed jobs rated four or above, per homeowner, per quarter: it contains delivery (completed), quality (rated) and repetition (per quarter). Inputs: quotes received within two hours of posting, because speed is the strongest predictor of a homeowner staying; and repeat quoting by tradespeople, because supply retention is what keeps speed possible. Guardrails: tradesperson quote-to-win rate must not fall below its baseline, and homeowner dispute rate must not rise. Report by metro area and quarter — national averages hide the only thing that matters in a marketplace, which is local liquidity.',
    trap: 'Choosing GMV. GMV rises with price inflation and one-off large jobs, and tells you nothing about whether the market is working for either side.',
    topicId: 'input-output-metrics',
  },
  {
    id: 'mg-ns-editor',
    kind: 'northstar',
    title: 'North star for a collaborative document editor',
    scenario: 'A team-based editor reports monthly active users and average session length. Both are healthy. Churn among teams of five to twenty is rising.',
    tasks: [
      'Explain in one line why session length is the wrong health measure here.',
      'Write a north star that reflects value to a team, not an individual.',
      'Choose two guardrails, one of which must protect the individual.',
      'State what would make you revise the north star itself.',
    ],
    read: 'Long sessions in an editor can mean deep work or difficulty finding things — the metric is directionally ambiguous, which disqualifies it as a north star. The unit of value is the team, so: documents reaching a decision state (approved, published, shared externally) with two or more contributors, per team, per month. Guardrails: time-to-first-contribution for a newly invited member must not increase, because that is the onboarding cost of collaboration; and solo-author documents must not collapse, because the individual path is the on-ramp to the team path. Revise the north star if “decision state” turns out to be recorded inconsistently across teams — a north star built on an inconsistently applied event is a measurement of habit, not value.',
    trap: 'Rewarding collaboration for its own sake. Some valuable documents should have exactly one author.',
    topicId: 'heart-framework',
  },
  {
    id: 'mg-ns-assistant',
    kind: 'northstar',
    title: 'North star for an AI support assistant',
    scenario: 'An assistant answers customer questions inside a support product. The team reports “questions answered” — 1.2 million last month — and deflection rate.',
    tasks: [
      'Say what “deflection” actually measures, and what it misses.',
      'Write a north star that a support director and a customer would both accept.',
      'Add a guardrail that protects the customer from a cost-driven optimisation.',
      'Name the qualitative evidence you would collect alongside it.',
    ],
    read: 'Deflection measures tickets not created, which counts abandonment and successful self-service identically — a customer who gave up looks exactly like a customer who was helped. A shared north star is issues resolved at first contact without escalation, confirmed by the customer, per week. Guardrail: re-contact within seven days on the same issue must not rise, and the escalation path must stay reachable within one action at any point — a cost-driven team will always be tempted to bury it. Qualitative: read fifty transcripts a month where the assistant was confidently wrong, because confident error is the failure mode that survey scores round away.',
    trap: '“1.2 million questions answered” is pure vanity: it rises with traffic, with retries, and with failure.',
    topicId: 'confidence-thresholds',
  },
  {
    id: 'mg-gr-checkout',
    kind: 'guardrail',
    title: 'Guardrails for one-tap checkout',
    scenario: 'You are removing the confirmation step from checkout. Projected conversion lift is 4–6%.',
    tasks: [
      'Name the two guardrails you would set before launch, with thresholds.',
      'State the window and the segment for each.',
      'Write the revert condition as a single sentence.',
      'Name one guardrail that is tempting but useless here.',
    ],
    read: 'Guardrail one: order cancellations and refunds within 24 hours, which is where accidental purchases surface — threshold at the current baseline plus one percentage point. Guardrail two: contact volume tagged “wrong item / wrong address”, because removing confirmation removes the last chance to catch a stale default address. Window: fourteen days, segmented by new versus returning customers, because returning customers have correct defaults and will mask harm to new ones. Revert condition: “If 24-hour cancellations exceed baseline plus one point for three consecutive days in the new-customer segment, we restore confirmation without further debate.” The tempting-but-useless guardrail is average order value — it moves for a dozen unrelated reasons and will generate argument, not clarity.',
    trap: 'Setting guardrails without thresholds. An unthresholded guardrail is a metric you will reinterpret in the meeting where it matters.',
    topicId: 'guardrail-metrics',
  },
  {
    id: 'mg-gr-notify',
    kind: 'guardrail',
    title: 'Guardrails for a re-engagement notification',
    scenario: 'Growth wants a daily notification to inactive users. Early tests show a 9% lift in weekly actives.',
    tasks: [
      'Identify the harm this feature can do that the primary metric cannot see.',
      'Set two guardrails with thresholds and windows.',
      'Decide what you would measure at ninety days, not seven.',
      'Name the segment most at risk.',
    ],
    read: 'The invisible harm is permanent: a user who disables notifications, or uninstalls, is not merely inactive this week — they are unreachable forever, and weekly actives will not show that for months. Guardrails: notification opt-out rate per thousand sends, and uninstalls within 48 hours of a send, both against the pre-launch baseline. Window: seven days for the primary lift, ninety days for retention of the re-engaged cohort — a nine percent lift that decays to zero by week six, having burned a third of the permission base, is a loss dressed as a win. Most at risk: users who were already low-frequency but positive; they have the least tolerance for interruption and the highest chance of being permanently lost.',
    trap: 'Reporting the lift at seven days and moving on. Notification damage is always slower than notification benefit.',
    topicId: 'cohort-retention',
  },
  {
    id: 'mg-drop-activation',
    kind: 'drop',
    title: 'Activation fell 9% after a signup redesign',
    scenario: 'You shipped a shorter signup. Activation (first meaningful action within 24 hours) fell 9% week over week. Signup completion rose 14%.',
    tasks: [
      'Give three explanations before proposing any fix: one flattering, one neutral, one damning.',
      'Say which single cut of the data would separate them.',
      'Name the guardrail that should have caught this earlier.',
      'Write what you would tell the team in two sentences.',
    ],
    read: 'Flattering: the shorter form admitted a wave of low-intent users, so the activation denominator grew and the rate fell while absolute activations held. Neutral: one removed field was doing useful routing work — a role or use-case question that determined which first-run experience appeared. Damning: the shortened flow dropped a step that created genuine commitment, and the new users do not know what they signed up for. Separating them takes one cut: absolute activations, not the rate, split by acquisition channel. If absolute activations rose, it is the flattering story. If they fell only in channels that used the removed field, it is the routing story. Guardrail that should have existed: activation as a paired metric on the signup experiment, never signup completion alone. Two sentences to the team: “Signup completion rose 14% but absolute activations fell in paid channels only, which points at the routing question we removed rather than at intent. I am restoring that question as a post-signup step and will report the paired numbers in a week.”',
    trap: 'Reverting immediately. You would learn nothing, and the 14% may be real.',
    topicId: 'input-output-metrics',
  },
  {
    id: 'mg-drop-search',
    kind: 'drop',
    title: 'Zero-result searches fell, revenue did not move',
    scenario: 'You shipped fuzzy matching and synonyms. The zero-result rate dropped from 11% to 3%. Revenue per search session is unchanged.',
    tasks: [
      'Explain how both facts can be true simultaneously.',
      'Name the metric that would tell you whether the fix helped anyone.',
      'Decide whether you would keep the change.',
      'State what evidence would change your mind.',
    ],
    read: 'A zero-result page is honest: it tells the user nothing matched. Fuzzy matching replaces that honest dead end with a page of near-misses, which converts a fast “not here” into a slow disappointment — the rate improved because the failure moved downstream, not because it disappeared. The metric that matters is post-search behaviour: click-through on the first result page, refinement rate, and exit rate from search results. Keep the change only if refinement fell and click-through rose; if exits from result pages rose, you made things worse and the old metric applauded. Evidence that would change my mind: session replays showing users successfully recovering from near-miss results, or a rise in conversion for long-tail queries specifically.',
    trap: 'Treating zero-result rate as a quality metric. It is a symptom metric, and symptom metrics are the easiest ones to game.',
    topicId: 'findability',
  },
  {
    id: 'mg-drop-retention',
    kind: 'drop',
    title: 'Conversion up 20%, thirty-day retention down 6%',
    scenario: 'A redesigned upgrade flow lifted conversion by 20%. Thirty-day retention of the converted cohort fell 6 points versus the prior cohort.',
    tasks: [
      'Write the three explanations, including the uncomfortable one.',
      'Identify the guardrail that would have caught it before launch.',
      'Choose: keep, revert, or modify — and justify in one sentence.',
      'Name the evidence you would pull next, and what it would change.',
    ],
    read: 'Flattering: the new flow reached a broader audience, so the cohort contains more marginal users whose retention was always going to be lower; mix shift, not harm. Neutral: the flow succeeds at conversion but sets the wrong expectation, so users arrive in the product looking for something that is not there — an onboarding mismatch, fixable downstream. Damning: the lift came from pressure — urgency, obscured pricing, or a default that people did not intend to accept — and the churn is the sound of people discovering what they agreed to. The guardrail that should have existed: refund and cancellation rate within thirty days of conversion, paired with the conversion metric from the start. Verdict: modify — keep the flow, remove the single most pressure-shaped element, and re-run; that isolates the mechanism rather than discarding a genuine improvement. Next evidence: cancellation reasons and first-week feature usage for the new cohort. If they never used the thing they upgraded for, it is expectation; if they used it and left, it is value.',
    trap: 'Announcing the 20% and footnoting the retention. Whoever announces the win owns the loss six weeks later.',
    topicId: 'cohort-retention',
  },
  {
    id: 'mg-vanity-dashboard',
    kind: 'vanity',
    title: 'The executive dashboard',
    scenario: 'The weekly leadership dashboard shows: total registered users, page views, average session duration, features shipped, NPS, and support tickets closed.',
    tasks: [
      'Name the three most misleading metrics here and say why.',
      'Replace each with something that could fall if the product got worse.',
      'Keep one metric unchanged and defend it.',
      'Say which decision the new dashboard would actually inform.',
    ],
    read: 'Total registered users only rises — it cannot report harm, so it is a decoration. Features shipped measures the team’s activity, not the user’s outcome, and rewards splitting work into smaller items. Support tickets closed rises when quality falls and when quality improves, so it is directionally meaningless alone. Replacements: weekly active teams (or whatever unit holds value) instead of registrations; the share of shipped work that moved its stated metric instead of a count of features; and contacts per thousand active users by reason instead of tickets closed. Keep NPS, with a caveat — it is noisy and slow, but it is the only number on the list that can fall for reasons you do not control, which makes it an honest early warning when read as a trend by segment, never as a single figure. The redesigned dashboard supports one real decision: where to send next quarter’s engineering capacity.',
    trap: 'Average session duration. For a task-completion product, shorter is better; for a content product, longer is better. A metric whose good direction is ambiguous does not belong on a leadership dashboard.',
    topicId: 'heart-framework',
  },
  {
    id: 'mg-vanity-ai',
    kind: 'vanity',
    title: '“The AI feature was used 1.2 million times”',
    scenario: 'A launch review celebrates 1.2 million uses of a new AI summarisation feature in its first month.',
    tasks: [
      'List what that number cannot distinguish.',
      'Propose the smallest set of numbers that would make it meaningful.',
      'Name the harm metric nobody has asked for.',
      'Write the one line you would add to the launch review.',
    ],
    read: 'The count cannot distinguish first use from retry, success from abandonment, or delight from a user hunting for the output they expected. Three numbers make it meaningful: repeat use by the same user in a later week (did it earn a habit), edit-or-discard rate on the output (was it right), and task completion with versus without the feature (did it help). The unasked harm metric is accepted-but-wrong: how often a user shipped a summary that misrepresented the source, which you can only find by sampling. The line for the review: “1.2 million uses, 23% of which were retries of the same input — the number I would like next month is weekly repeat users, because that is the only one that can fall.”',
    trap: 'Assuming volume is adoption. In AI features, volume is often the sound of people trying to get a usable answer.',
    topicId: 'hallucination-recovery',
  },
  {
    id: 'mg-qual-enterprise',
    kind: 'qualitative',
    title: 'The rollout numbers look good. What is still missing?',
    scenario: 'A new admin console is at 78% adoption across customer accounts, task success in usability testing was 9/10, and support contacts did not rise. Rollout to the remaining 22% is proposed for next month.',
    tasks: [
      'Name what these three numbers cannot see.',
      'Choose the cheapest qualitative method for each blind spot.',
      'Decide what you would do before the next rollout wave.',
      'Write the sentence you would say to the person pushing for full rollout.',
    ],
    read: 'Adoption at 78% says nothing about who the 22% are — in enterprise they are frequently the largest, most customised, most contractually important accounts, and they are last precisely because the product does not fit them. Nine out of ten in testing says the tasks you chose are learnable; it does not say the tasks you did not choose are possible. Flat support contacts can mean nobody is struggling, or that this cohort raises issues through their account manager instead of support. Cheapest methods: five interviews with holdout admins (who, and why not), one observation session on a task nobody scripted, and a read of account-manager notes rather than support tickets. Before the next wave: find out whether the holdouts are “not yet” or “cannot”. The sentence: “Adoption is 78%, but we have not spoken to a single account in the remaining 22% — I want five conversations before we commit the date, because if they are blocked rather than slow, the rollout plan is wrong rather than late.”',
    trap: 'Reading silence as satisfaction. In enterprise, silence usually means the complaint went to someone who does not file tickets.',
    topicId: 'triangulation',
  },
  {
    id: 'mg-qual-effort',
    kind: 'qualitative',
    title: 'Equal task success, unequal effort',
    scenario: 'An accessibility study finds that screen-reader users and sighted users both complete the core task at 92%. Average time on task is 3.1 minutes for sighted users and 11.4 minutes for screen-reader users.',
    tasks: [
      'Explain why equal success is not equal experience.',
      'Name the two moments most likely to hold the extra eight minutes.',
      'Choose what to instrument and what to observe.',
      'State what you would refuse to conclude from this study.',
    ],
    read: 'Success rate measures whether a determined person can finish; it does not measure what finishing costs. An eight-minute penalty is a tax that most people will not pay twice — the completion number is being propped up by participants who knew they were being watched. The extra time almost always concentrates in two places: orientation on arrival (unclear landmarks, heading structure, or a focus point that starts at the top of a repeated nav) and error recovery (an error announced only visually, or focus not moved to the problem). Instrument time-to-first-meaningful-interaction and error-recovery time as separate numbers; observe the orientation moment directly, because logs cannot see confusion. What I would refuse to conclude: that the interface is accessible. Twelve participants completing under observation cannot license a claim about the population, and nothing in this study covers users with cognitive or motor differences.',
    trap: 'Reporting the 92% to leadership without the 11.4 minutes. Both are true; only one is honest.',
    topicId: 'screen-readers',
  },
];


// ── 4 · Research Synthesis Drill ───────────────────────────────────────────

export interface ResearchItem {
  id: string;
  text: string;
  kind: 'observation' | 'interpretation';
  why: string;
}

export interface SynthesisDrill {
  id: string;
  title: string;
  method: string;
  context: string;
  items: ResearchItem[];
  contradiction: string;
  insight: string;
  opportunity: string;
  cannotConclude: string;
  topicId: string;
}

export const synthesisDrills: SynthesisDrill[] = [
  {
    id: 'rs-clinic',
    title: 'Rescheduling a clinic appointment',
    method: 'Six contextual interviews with patients who rescheduled in the last month, plus two weeks of call-centre tags. Fictional data for practice.',
    context: 'A regional health service wants to move rescheduling out of the call centre and into its app.',
    items: [
      { id: 'i1', text: 'Four of six participants called the clinic instead of using the app, even though all six had the app installed.', kind: 'observation', why: 'Countable behaviour, directly witnessed.' },
      { id: 'i2', text: 'Participants do not trust the app for anything important.', kind: 'interpretation', why: 'A cause invented to explain the behaviour in item one. Nobody said this.' },
      { id: 'i3', text: 'Three participants said they called “to make sure it actually went through”.', kind: 'observation', why: 'A reported reason, quoted — record it as what was said, not as what is true.' },
      { id: 'i4', text: 'The app shows a new appointment immediately; the confirmation letter arrives five to seven days later.', kind: 'observation', why: 'A verifiable system fact.' },
      { id: 'i5', text: 'Two participants rescheduled successfully in the app and did not call afterwards.', kind: 'observation', why: 'Counter-evidence, and the most valuable line in the set.' },
      { id: 'i6', text: 'Older patients need a phone option because digital services exclude them.', kind: 'interpretation', why: 'A generalisation about a population, stated as fact; age was not isolated in this sample.' },
      { id: 'i7', text: 'Call-centre tags show 38% of reschedule calls follow an app session within one hour.', kind: 'observation', why: 'Log evidence — note it is correlation of timing, not proof of cause.' },
      { id: 'i8', text: 'The app sends no notification when a rescheduled appointment is confirmed by the clinic system.', kind: 'observation', why: 'A verifiable absence.' },
    ],
    contradiction: 'Two participants completed the task in the app without calling, while four did not — so “patients don’t trust the app” cannot be the explanation as stated. Something differs between those groups, and this study does not say what. Any synthesis that quietly drops the two successful cases is fitting the evidence to a preferred story.',
    insight: 'Patients are not rescheduling twice because the app failed — they are calling to obtain a confirmation the app never gives them. The gap is between the moment the change is made and the moment it is acknowledged by the institution.',
    opportunity: 'How might we make an app-made change feel as confirmed as a phone call, at the moment it is made, without waiting for a letter?',
    cannotConclude: 'That a notification would remove the calls. That age causes the behaviour. That 38% of calls were unnecessary — some may involve changes the app cannot make. And with six participants, nothing about prevalence at all.',
    topicId: 'triangulation',
  },
  {
    id: 'rs-warehouse',
    title: 'Scanner app on the warehouse floor',
    method: 'Two shift observations (six hours total), five short floor interviews, one month of device error logs. Fictional data for practice.',
    context: 'A logistics operator is rolling out a new picking app on handheld scanners.',
    items: [
      { id: 'i1', text: 'Three of five pickers keep a paper list in their pocket and annotate it between scans.', kind: 'observation', why: 'Directly witnessed workaround — the most honest evidence in the set.' },
      { id: 'i2', text: 'Pickers don’t trust the new system.', kind: 'interpretation', why: 'A motive assigned to a behaviour with several possible causes.' },
      { id: 'i3', text: 'The app takes 4–7 seconds to load the next item after a successful scan.', kind: 'observation', why: 'Measured, repeatable.' },
      { id: 'i4', text: 'Two pickers scan the next item before the screen updates, then correct the mismatch.', kind: 'observation', why: 'Witnessed sequence of actions.' },
      { id: 'i5', text: 'Error logs show 1,240 “unexpected item” events last month, 71% within three seconds of the previous scan.', kind: 'observation', why: 'Log evidence with a timing pattern.' },
      { id: 'i6', text: 'The app needs an offline mode.', kind: 'interpretation', why: 'A solution, not a finding. Nothing here establishes connectivity as the cause.' },
      { id: 'i7', text: 'Supervisors review the error report weekly and coach individual pickers on accuracy.', kind: 'observation', why: 'A process fact, and it reframes the whole set.' },
    ],
    contradiction: 'The system records these events as picker errors and the organisation responds with individual coaching — but the timing pattern in the logs says the system is registering scans it is not ready to receive. The same data supports “the people are careless” and “the software is slow”, and the organisation has already chosen the first reading.',
    insight: 'The four-to-seven second gap is being paid for by the picker twice: once in waiting, and again in being coached for the errors that waiting produces. The paper list is not resistance — it is the buffer the software should be providing.',
    opportunity: 'How might we let a picker stay ahead of the system — queueing the next scan safely — so that speed is absorbed by the software rather than by the person’s record?',
    cannotConclude: 'That latency causes all 1,240 errors. That the paper lists would disappear if latency were fixed — they may also be a memory aid for route order. That five pickers across two shifts represent the site, let alone the network.',
    topicId: 'latency-loading',
  },
  {
    id: 'rs-invoice',
    title: 'Small businesses chasing unpaid invoices',
    method: 'Eight remote interviews with sole traders and micro-businesses, plus a diary study of four participants over two weeks. Fictional data for practice.',
    context: 'An invoicing product is considering automated payment reminders.',
    items: [
      { id: 'i1', text: 'Seven of eight participants said late payment is their biggest cash-flow problem.', kind: 'observation', why: 'Reported, and consistent — but still a report, not behaviour.' },
      { id: 'i2', text: 'Only two had ever used the product’s existing reminder feature.', kind: 'observation', why: 'Verifiable from their accounts.' },
      { id: 'i3', text: 'Users don’t know the reminder feature exists.', kind: 'interpretation', why: 'An assumed cause; discoverability was never tested here.' },
      { id: 'i4', text: 'Five participants described choosing not to chase a specific client, naming the relationship as the reason.', kind: 'observation', why: 'A described decision with a stated reason, given unprompted by five people.' },
      { id: 'i5', text: 'Three participants wrote their own reminder emails and mentioned rewriting them several times.', kind: 'observation', why: 'Behaviour reported in the diary, with effort attached.' },
      { id: 'i6', text: 'Automating reminders will improve payment times.', kind: 'interpretation', why: 'A hypothesis about an outcome — testable, but not a finding.' },
      { id: 'i7', text: 'Two participants had been paid late by a client they still describe as their best customer.', kind: 'observation', why: 'A fact that complicates the obvious solution.' },
      { id: 'i8', text: 'The existing reminder sends a fixed template three days after the due date, with no preview before sending.', kind: 'observation', why: 'A product fact that explains more than the discoverability theory does.' },
    ],
    contradiction: 'Everyone wants faster payment, and almost nobody uses the feature built to deliver it. The interpretation on offer is ignorance; the evidence points at something else — five people describe deliberately not chasing, which is a choice, not an oversight.',
    insight: 'Chasing an invoice is a relationship act, not an administrative one. A fixed template sent automatically on day three takes that judgment away from the business owner at exactly the moment they most want it — so they avoid the feature rather than risk the client.',
    opportunity: 'How might we help a sole trader chase payment without spending relationship capital — keeping the wording, the timing, and the decision to send in their hands?',
    cannotConclude: 'That better discoverability would not also help. That reminders reduce days-to-payment at all — no one measured it. And nothing about businesses large enough to employ someone whose job includes chasing.',
    topicId: 'jtbd',
  },
  {
    id: 'rs-teacher',
    title: 'Teachers marking coursework in a new grading tool',
    method: 'Five think-aloud sessions with secondary-school teachers marking real work, plus product telemetry from one term. Fictional data for practice.',
    context: 'An education platform has added inline rubrics to its grading tool.',
    items: [
      { id: 'i1', text: 'All five teachers marked with the rubric panel collapsed for most of the session.', kind: 'observation', why: 'Directly observed, consistent across participants.' },
      { id: 'i2', text: 'Teachers find the rubric distracting.', kind: 'interpretation', why: 'A feeling attributed to them; two actually said the opposite when asked.' },
      { id: 'i3', text: 'Three teachers expanded the rubric only when writing the final comment.', kind: 'observation', why: 'A witnessed pattern of use, with timing.' },
      { id: 'i4', text: 'Telemetry shows the rubric panel is open for 8% of total marking time, across 1,900 sessions.', kind: 'observation', why: 'Population-scale evidence that matches the sessions.' },
      { id: 'i5', text: 'Two teachers said the rubric language “is for the moderator, not for me”.', kind: 'observation', why: 'Quoted, and it names an audience nobody had considered.' },
      { id: 'i6', text: 'The rubric should be simplified.', kind: 'interpretation', why: 'A solution dressed as a finding; the wording may be externally mandated.' },
      { id: 'i7', text: 'Four teachers pasted comments from a personal document of reusable phrases.', kind: 'observation', why: 'A witnessed workaround with an artefact attached.' },
    ],
    contradiction: 'Teachers use the rubric hardly at all while marking, yet two describe it as necessary and correct. Both are true: it is necessary for justification and useless for judgment — and a synthesis that reads the 8% as rejection will delete something the teachers actually need.',
    insight: 'Marking and justifying are two different jobs happening in one interface. Judgment happens fast and privately from experience; the rubric is evidence for a third party, and it is needed at the end, not throughout.',
    opportunity: 'How might we support fast private judgment during marking, and produce moderator-ready justification at the end, without asking the teacher to do both at once?',
    cannotConclude: 'That the rubric wording can be changed — it may be set by an exam board. That the phrase document indicates a missing feature rather than a personal preference. That five teachers in one subject generalise to the platform.',
    topicId: 'journey-mapping',
  },
  {
    id: 'rs-copilot',
    title: 'An AI copilot inside a sales CRM',
    method: 'Nine shadowing sessions with account executives, plus acceptance telemetry over six weeks. Fictional data for practice.',
    context: 'A CRM has added an assistant that drafts follow-up emails and summarises call notes.',
    items: [
      { id: 'i1', text: 'Seven of nine reps accepted the summary and edited the draft email before sending.', kind: 'observation', why: 'Observed behaviour, clean and countable.' },
      { id: 'i2', text: 'Reps trust summaries more than drafts.', kind: 'interpretation', why: 'A plausible reading of item one — but acceptance may reflect effort, not trust.' },
      { id: 'i3', text: 'Median edit distance on accepted drafts is 41% of the text.', kind: 'observation', why: 'Measured from telemetry.' },
      { id: 'i4', text: 'Two reps said they accept the summary “because nobody reads them anyway”.', kind: 'observation', why: 'Quoted — and it dismantles the trust interpretation entirely.' },
      { id: 'i5', text: 'Three reps re-listened to call recordings after reading the summary.', kind: 'observation', why: 'A witnessed verification behaviour with a real time cost.' },
      { id: 'i6', text: 'The assistant is working well for summaries; the draft feature needs improvement.', kind: 'interpretation', why: 'A verdict built on acceptance rate, which item four just disqualified.' },
      { id: 'i7', text: 'Summaries are stored on the account record and are visible to managers.', kind: 'observation', why: 'A system fact that explains who the artefact is really for.' },
      { id: 'i8', text: 'No rep in the study corrected a summary, including one that named the wrong decision-maker.', kind: 'observation', why: 'An observed non-action — the most alarming item in the set.' },
    ],
    contradiction: 'Acceptance is highest exactly where verification is lowest. The drafts, which reps heavily edit, are the safer feature; the summaries, which sail through untouched, are silently writing the account record that managers and successors will rely on.',
    insight: 'Acceptance is not endorsement. Where the output has no immediate personal consequence for the rep, it is accepted unread — so the feature with the best adoption metric is the one accumulating the most unverified error.',
    opportunity: 'How might we make a summary’s errors cheap to catch at the moment of writing, when the rep still remembers the call — rather than expensive to discover months later, when the record is all that remains?',
    cannotConclude: 'That summaries are frequently wrong — one observed error is not a rate. That reps would correct them if prompted. That managers actually rely on these records; nobody in this study was a manager.',
    topicId: 'human-authority',
  },
  {
    id: 'rs-transit',
    title: 'Buying a ticket on a transit app',
    method: 'Intercept study at two stations (14 participants), plus four weeks of funnel analytics. Fictional data for practice.',
    context: 'A transit authority wants to reduce paper ticket sales at machines.',
    items: [
      { id: 'i1', text: 'Nine of fourteen participants bought a paper ticket while holding a phone with the app installed.', kind: 'observation', why: 'Witnessed, and specific.' },
      { id: 'i2', text: 'People prefer paper tickets.', kind: 'interpretation', why: 'Preference inferred from a single constrained situation.' },
      { id: 'i3', text: 'Six participants said they were “not sure the barrier would read the phone”.', kind: 'observation', why: 'A quoted reason, repeated by nearly half the sample.' },
      { id: 'i4', text: 'Funnel data shows 22% of app purchases are abandoned at the payment step.', kind: 'observation', why: 'Measured at population scale.' },
      { id: 'i5', text: 'The app requires re-authentication with a password if the session is older than 30 days.', kind: 'observation', why: 'A system fact that plausibly connects to item four.' },
      { id: 'i6', text: 'Three participants had a ticket already in the app and bought a second one at the machine.', kind: 'observation', why: 'Behaviour that contradicts every efficiency explanation.' },
      { id: 'i7', text: 'The app should show a bigger barcode.', kind: 'interpretation', why: 'A fix aimed at a symptom nobody reported.' },
    ],
    contradiction: 'Three people paid twice — once in the app and once at the machine. That is not preference, price sensitivity, or ignorance; it is someone buying insurance against their own uncertainty at the barrier, seconds before a train.',
    insight: 'The decisive moment is not purchase, it is the barrier. Without a reliable signal that the phone will work when it matters, a paper ticket is the cheapest way to remove risk — even at the cost of paying twice.',
    opportunity: 'How might we make a phone ticket visibly, verifiably ready before a traveller reaches the barrier, so buying paper stops being the safest choice?',
    cannotConclude: 'That barrier reliability is actually poor — perception and reality are different studies. That removing re-authentication would recover the 22%. That two stations represent a network with very different demographics elsewhere.',
    topicId: 'fail-points',
  },
];


// ── 5 · Executive Summary Mode ─────────────────────────────────────────────

export interface SummaryLevel {
  id: 'thirty' | 'two' | 'five';
  label: string;
  seconds: number;
  words: string;
  mustContain: string[];
  cut: string;
  test: string;
}

export const summaryLevels: SummaryLevel[] = [
  {
    id: 'thirty',
    label: '30 seconds',
    seconds: 30,
    words: '≈ 70–85 words',
    mustContain: ['The decision, stated first.', 'The single reason it is right.', 'The cost you accepted.'],
    cut: 'Background, process, methodology, and every person who was involved. If it happened before the decision, it does not belong here.',
    test: 'A stakeholder who hears it once can repeat the decision and the reason back to someone else, correctly.',
  },
  {
    id: 'two',
    label: '2 minutes',
    seconds: 120,
    words: '≈ 280–330 words',
    mustContain: ['The problem, in the user’s situation.', 'The evidence — what you saw, and how much of it.', 'The decision and the alternative you rejected.', 'The trade-off and who carries it.'],
    cut: 'Craft detail, tooling, team structure, and the chronology. Nobody needs the order events happened in.',
    test: 'A sceptical listener can identify what evidence would have changed your mind.',
  },
  {
    id: 'five',
    label: '5 minutes',
    seconds: 300,
    words: '≈ 700–800 words',
    mustContain: ['Why this problem mattered to the business as well as the user.', 'The evidence and its limits.', 'The options considered, and the reasoning that eliminated each.', 'The decision, the trade-off, and who disagreed.', 'What you measured, what happened, and what you would do differently now.'],
    cut: 'Still nothing self-congratulatory, and still no chronology for its own sake. Five minutes is for depth, not for the full diary.',
    test: 'Someone who disagrees with your decision can state your reasoning fairly — that is the mark of an argument, not a pitch.',
  },
];

export const summaryFaults: string[] = [
  'Starting with context. The decision comes first; context is how you defend it, not how you open.',
  'Using “we” for work you personally decided, and “I” for work the team did.',
  'Saving the trade-off for the Q&A. If they have to find it, it looks like you hid it.',
  'Quoting a metric with no window, no segment, and no baseline.',
  'Running long. Overrunning a self-imposed thirty seconds is itself an answer about your judgment.',
];


// ── 6 · Portfolio Cross-Examination ────────────────────────────────────────

export interface CrossExamQuestion {
  id: string;
  question: string;
  whyAsked: string;
  /** Must match a label in `storyFields` (app/studio.tsx) — the lab shows the
   *  learner their own recorded evidence for that field beside the question. */
  evidenceField: string;
  weak: string;
  strong: string;
  followUp: string;
  core: boolean;
}

export const crossExamQuestions: CrossExamQuestion[] = [
  {
    id: 'cx-own',
    question: 'What exactly did you personally own?',
    whyAsked: 'To separate the designer from the team, and to find out whether you can be specific without diminishing others.',
    evidenceField: 'My exact role',
    weak: '“We did discovery, then we designed the flow, then we shipped it.” — no “I” anywhere.',
    strong: '“I owned the reschedule flow end to end: the research plan, the three concepts, the decision to drop the calendar view, and the spec. I did not own the notification infrastructure — that was Ravi’s, and his constraint shaped my design.”',
    followUp: 'Who would disagree with your description of your role, and what would they say?',
    core: true,
  },
  {
    id: 'cx-wrong',
    question: 'Which of your assumptions turned out to be wrong?',
    whyAsked: 'Designers who cannot name a wrong assumption either did not test anything or are not being honest.',
    evidenceField: 'Evidence and assumptions',
    weak: '“We were right about the main things.”',
    strong: '“I assumed the delay was tolerated because people were used to it. Two sessions in, it was clear they had stopped trusting the estimate entirely — which meant my fix, a better estimate, was aimed at the wrong thing.”',
    followUp: 'How much had you already built when you found out? What did that cost?',
    core: true,
  },
  {
    id: 'cx-evidence',
    question: 'What evidence changed your direction?',
    whyAsked: 'To test whether research informs your work or decorates it.',
    evidenceField: 'Evidence and assumptions',
    weak: '“Research validated our approach.” — validation is usually the sound of a study that could not fail.',
    strong: '“Three of five participants completed the task and then immediately did it again through the old channel. That single behaviour killed the concept I had spent a fortnight on.”',
    followUp: 'What was the weakest part of that evidence, and what would you have run with more time?',
    core: true,
  },
  {
    id: 'cx-disagree',
    question: 'Who disagreed with you, and how did it end?',
    whyAsked: 'To see whether you can represent an opponent fairly — and whether you have ever actually been opposed.',
    evidenceField: 'Collaboration and disagreement',
    weak: '“Engineering pushed back but they came around once they understood.”',
    strong: '“Our staff engineer thought the offline case was over-engineered for 4% of sessions. He was right about the percentage and I was right about who those 4% were. We shipped his simpler version with my logging, and the data settled it in three weeks.”',
    followUp: 'Where were they right and you were wrong?',
    core: true,
  },
  {
    id: 'cx-notbuilt',
    question: 'What did you consciously choose not to build?',
    whyAsked: 'Scope discipline is the most reliable seniority signal in a portfolio conversation.',
    evidenceField: 'Trade-off I accepted',
    weak: '“We had to cut some things for time.”',
    strong: '“I cut the bulk editing mode. It served eleven power users and would have taken a third of the quarter. I wrote down the trigger that would bring it back: more than fifty accounts asking, or one asking who represented more than 5% of revenue.”',
    followUp: 'Did that cut ever come back to hurt you?',
    core: true,
  },
  {
    id: 'cx-outcome',
    question: 'What was the measurable outcome?',
    whyAsked: 'To find out whether you follow work after launch, and whether you can be honest about attribution.',
    evidenceField: 'Outcome and supporting evidence',
    weak: '“It was a huge success and users loved it.”',
    strong: '“First-attempt completion went from 61% to 78% over six weeks in the new-customer segment. Support contacts on that reason fell by about a third. A pricing change shipped in the same window, so I would not claim all of it.”',
    followUp: 'What did not improve that you expected to?',
    core: true,
  },
  {
    id: 'cx-differently',
    question: 'What would you do differently now?',
    whyAsked: 'To hear whether your judgment has moved since, or whether the story has simply been polished.',
    evidenceField: 'What I would change today',
    weak: '“I’d spend more time on research.” — the answer everyone gives, and it commits to nothing.',
    strong: '“I would have instrumented the abandonment event before designing anything. We spent three weeks arguing about a cause we could have measured in two days, and I let that argument set the schedule.”',
    followUp: 'What stopped you from doing that at the time?',
    core: true,
  },
  {
    id: 'cx-claim',
    question: 'Which part of this story can you not actually claim?',
    whyAsked: 'A pressure question. The honest answer builds more credibility than any result.',
    evidenceField: 'What I cannot claim',
    weak: 'Claiming everything, then conceding under follow-up — which converts a strength into a doubt.',
    strong: '“The revenue figure is the company’s, not mine. My contribution was the flow; three other changes shipped that quarter and I cannot separate them.”',
    followUp: 'So what is the smallest claim you are completely certain of?',
    core: false,
  },
  {
    id: 'cx-alternative',
    question: 'Walk me through the option you rejected. Why was it wrong?',
    whyAsked: 'To check whether alternatives were genuinely considered or invented afterwards to make the chosen path look inevitable.',
    evidenceField: 'Alternatives I considered',
    weak: 'A straw alternative that was obviously worse. Nobody ever seriously considered it.',
    strong: '“The strongest alternative was doing nothing in the product and fixing it in the support script. It was cheaper and faster, and I rejected it because the contact itself was the cost we were trying to remove — but if volume had been half what it was, it would have won.”',
    followUp: 'Under what conditions would that rejected option have been the right call?',
    core: false,
  },
  {
    id: 'cx-constraint',
    question: 'What was the hardest constraint, and how did it change the design?',
    whyAsked: 'To see whether you treat constraints as material or as excuses.',
    evidenceField: 'My decision and why',
    weak: '“We had no time and no engineers.” — a complaint, not a design account.',
    strong: '“The API could not return a total count cheaply. That killed pagination as designed, so I moved to a continuous list with a saved position — which turned out to match how people actually used it, and I would choose it again without the constraint.”',
    followUp: 'What did you refuse to compromise on, and who did you have to tell?',
    core: false,
  },
  {
    id: 'cx-user',
    question: 'Describe one specific user you spoke to. What did they say?',
    whyAsked: 'Fabricated research collapses here. Real research produces a person you still remember.',
    evidenceField: 'Product and user',
    weak: 'A persona summary with no human detail.',
    strong: '“A ward clerk in Leeds, twelve years in the role, who kept a laminated card of codes taped to her monitor because the system’s search needed the exact term. She said, ‘I know what I want, it just doesn’t know what I mean.’”',
    followUp: 'What did they do that surprised you — not what they said?',
    core: false,
  },
  {
    id: 'cx-fail',
    question: 'If this project had failed, what would have been the most likely reason?',
    whyAsked: 'A pre-mortem asked after the fact. It reveals whether you understood your own risk.',
    evidenceField: 'Evidence and assumptions',
    weak: '“Nothing really — we had good buy-in.”',
    strong: '“Adoption depended on managers telling their teams to switch. If two of the six regions had not done that, the numbers would have looked like a design failure, and I would have had no way to prove otherwise.”',
    followUp: 'What did you put in place to detect that early?',
    core: false,
  },
];


// ── 7 · Accessibility Repair Lab ───────────────────────────────────────────

export type A11yCategory =
  | 'Keyboard' | 'Focus order' | 'Contrast' | 'Labels & instructions'
  | 'Error recovery' | 'Cognitive load' | 'Screen-reader clarity';

export const a11yCategories: A11yCategory[] = [
  'Keyboard', 'Focus order', 'Contrast', 'Labels & instructions',
  'Error recovery', 'Cognitive load', 'Screen-reader clarity',
];

export type A11ySeverity = 'blocker' | 'major' | 'minor';

export interface A11yDefect {
  id: string;
  category: A11yCategory;
  symptom: string;
  blocks: string;
  wcag: string;
  severity: A11ySeverity;
  repair: string;
}

export interface A11yCase {
  id: string;
  screen: string;
  context: string;
  defects: A11yDefect[];
  ordering: string;
  topicId: string;
}

export const a11yCases: A11yCase[] = [
  {
    id: 'ar-checkout',
    screen: 'Three-step checkout with a promo code and a saved-card selector',
    context: 'A returning customer completing a purchase on a laptop, using a keyboard only.',
    defects: [
      { id: 'd1', category: 'Keyboard', symptom: 'The saved-card selector is a div with a click handler; Tab skips it entirely and Enter does nothing.', blocks: 'Anyone not using a mouse cannot choose a card — the task is impossible, not merely hard.', wcag: '2.1.1 Keyboard (A) · 4.1.2 Name, Role, Value (A)', severity: 'blocker', repair: 'Replace with a native radio group; the visual design survives, the semantics arrive free.' },
      { id: 'd2', category: 'Focus order', symptom: 'Applying a promo code re-renders the totals and returns focus to the top of the document.', blocks: 'Keyboard and screen-reader users must re-traverse the entire page after every code attempt.', wcag: '2.4.3 Focus Order (A)', severity: 'major', repair: 'Return focus to the promo field, and announce the result in a live region.' },
      { id: 'd3', category: 'Error recovery', symptom: 'An invalid code clears the field and shows “Invalid code” in red above the form.', blocks: 'Anyone who mistypes must retype from memory; anyone not seeing colour may miss the message entirely.', wcag: '3.3.1 Error Identification (A) · 3.3.3 Error Suggestion (AA)', severity: 'major', repair: 'Preserve the entry, attach the message to the field programmatically, and say what was wrong.' },
      { id: 'd4', category: 'Contrast', symptom: 'The “Terms apply” link is #9aa3b0 on #ffffff — about 2.6:1.', blocks: 'Low-vision users and anyone in bright light cannot read the one piece of legally significant text.', wcag: '1.4.3 Contrast (Minimum) (AA)', severity: 'major', repair: 'Darken to at least 4.5:1; this is a token fix, not a screen fix.' },
      { id: 'd5', category: 'Screen-reader clarity', symptom: 'The order total updates silently when a card with a different currency is chosen.', blocks: 'A screen-reader user can complete a purchase at a price they were never told.', wcag: '4.1.3 Status Messages (AA)', severity: 'blocker', repair: 'Announce the new total in a polite live region, and repeat it in the final confirmation step.' },
      { id: 'd6', category: 'Cognitive load', symptom: 'The step indicator says “Step 2 of 3”, but step 3 contains both delivery options and payment authorisation.', blocks: 'Everyone, and disproportionately anyone with working-memory or anxiety-related needs planning their effort.', wcag: 'Not a failure in itself — a usability and predictability defect.', severity: 'minor', repair: 'Split step 3, or state what it contains before the user commits to entering it.' },
      { id: 'd7', category: 'Labels & instructions', symptom: 'The CVV field has a placeholder as its only label, which disappears on focus.', blocks: 'Anyone who pauses mid-entry, uses voice control, or relies on a screen reader after focus.', wcag: '3.3.2 Labels or Instructions (A) · 2.5.3 Label in Name (A)', severity: 'major', repair: 'Add a persistent visible label; placeholders are hints, never labels.' },
    ],
    ordering: 'Order by who is blocked, not by what is easy. The two blockers — the unreachable card selector and the silent total change — stop a task or allow a financially wrong outcome, so they ship first even though the contrast fix would take ten minutes. Then the two major recovery and labelling defects, which make the task expensive but possible. The step-indicator issue is real and last. Say the order out loud with its reason: “blocked, then costly, then unclear” is a sentence that survives a prioritisation meeting.',
    topicId: 'wcag-defaults',
  },
  {
    id: 'ar-table',
    screen: 'Enterprise data table: 40 columns, sticky filters, row selection, inline edit',
    context: 'An operations analyst reviewing exceptions at 150% browser zoom.',
    defects: [
      { id: 'd1', category: 'Keyboard', symptom: 'Inline edit activates on double-click only; there is no keyboard equivalent.', blocks: 'Keyboard-only users cannot edit at all — the core task of the screen.', wcag: '2.1.1 Keyboard (A)', severity: 'blocker', repair: 'Enter activates edit on the focused cell; Escape cancels; Tab commits and moves.' },
      { id: 'd2', category: 'Focus order', symptom: 'The sticky filter bar overlaps focused rows near the top of the viewport; the focus ring is hidden behind it.', blocks: 'Keyboard users lose track of position — a silent, exhausting failure.', wcag: '2.4.11 Focus Not Obscured (Minimum) (AA, WCAG 2.2)', severity: 'major', repair: 'Add scroll padding equal to the sticky header height so focused rows always clear it.' },
      { id: 'd3', category: 'Screen-reader clarity', symptom: 'Column headers are styled divs, so cells are announced without their column name.', blocks: 'A screen-reader user hears “4,812” with no idea which of forty columns it belongs to.', wcag: '1.3.1 Info and Relationships (A)', severity: 'blocker', repair: 'Use a real table with th and scope, or correct ARIA grid roles — and test with one screen reader before calling it done.' },
      { id: 'd4', category: 'Labels & instructions', symptom: 'Row checkboxes are labelled “Select”, identically on every row.', blocks: 'Anyone navigating by form controls hears “Select” forty times with nothing to distinguish them.', wcag: '2.4.6 Headings and Labels (AA) · 4.1.2 Name, Role, Value (A)', severity: 'major', repair: 'Label each with the row’s identifying value: “Select order 10-4821”.' },
      { id: 'd5', category: 'Contrast', symptom: 'Status is conveyed by a coloured dot with no text; amber on white is 1.9:1.', blocks: 'Colour-blind users and low-vision users cannot read status — the column that drives every decision here.', wcag: '1.4.1 Use of Color (A) · 1.4.11 Non-text Contrast (AA)', severity: 'blocker', repair: 'Add a text label beside the dot. A legend elsewhere on the page does not fix this.' },
      { id: 'd6', category: 'Cognitive load', symptom: 'Filters apply instantly on change, with no summary of what is currently applied.', blocks: 'Everyone — and anyone returning after an interruption cannot tell what they are looking at.', wcag: '3.2.2 On Input (A) is at risk; primarily a usability defect.', severity: 'major', repair: 'Show applied filters as removable chips, and announce result counts in a live region.' },
      { id: 'd7', category: 'Error recovery', symptom: 'A failed inline edit reverts the cell silently; the row re-sorts out of view.', blocks: 'Everyone, invisibly. Data loss that nobody is told about is the worst class of error.', wcag: '3.3.1 Error Identification (A)', severity: 'blocker', repair: 'Keep the edited value, mark the cell as failed, hold the sort position, and offer retry.' },
    ],
    ordering: 'Four blockers is a screen that should not have shipped, so sequence by harm type: silent data loss first (people are losing work now and cannot even report it), then the two “task impossible” defects, then status-by-colour-alone. Note that three of these — headers, checkbox labels, status text — are one component fix, not three screen fixes. Saying that in the meeting is what turns an audit list into a plan.',
    topicId: 'component-apis',
  },
  {
    id: 'ar-modal',
    screen: 'Modal dialog: invite a teammate, with role selector and validation',
    context: 'An admin inviting five colleagues, using a screen reader.',
    defects: [
      { id: 'd1', category: 'Focus order', symptom: 'Opening the modal leaves focus on the triggering button behind the overlay.', blocks: 'Screen-reader and keyboard users do not know a dialog opened, and continue reading the page beneath it.', wcag: '2.4.3 Focus Order (A) · 4.1.2 Name, Role, Value (A)', severity: 'blocker', repair: 'Move focus into the dialog on open, to the heading or first field; restore it to the trigger on close.' },
      { id: 'd2', category: 'Keyboard', symptom: 'Tab cycles into the page behind the modal; Escape does not close it.', blocks: 'Keyboard users get lost behind the overlay with no way out but reload.', wcag: '2.1.2 No Keyboard Trap (A) · 2.1.1 Keyboard (A)', severity: 'blocker', repair: 'Use a dialog element or a tested dialog primitive — focus containment is not worth hand-rolling.' },
      { id: 'd3', category: 'Screen-reader clarity', symptom: 'The overlay is not marked as a dialog and has no accessible name.', blocks: 'The context change is never announced, so nothing that follows makes sense.', wcag: '4.1.2 Name, Role, Value (A)', severity: 'blocker', repair: 'role="dialog", aria-modal, and aria-labelledby pointing at the visible heading.' },
      { id: 'd4', category: 'Error recovery', symptom: 'Submitting an invalid email shows a red border only.', blocks: 'Anyone not perceiving colour, and every screen-reader user, is told nothing at all.', wcag: '3.3.1 Error Identification (A) · 1.4.1 Use of Color (A)', severity: 'major', repair: 'Text message, programmatically associated, plus focus moved to the first error on submit.' },
      { id: 'd5', category: 'Labels & instructions', symptom: 'The role selector offers “Admin, Member, Guest” with no explanation of what each can do.', blocks: 'Everyone; it produces permission mistakes that surface weeks later as security problems.', wcag: '3.3.2 Labels or Instructions (A)', severity: 'major', repair: 'One line of consequence under each role, visible without hover.' },
      { id: 'd6', category: 'Cognitive load', symptom: 'Inviting five people means opening the dialog five times, re-selecting the role each time.', blocks: 'Everyone; disproportionately anyone for whom each interaction costs more effort.', wcag: 'Redundant Entry 3.3.7 (A, WCAG 2.2) is arguably engaged.', severity: 'minor', repair: 'Accept multiple addresses, and remember the last role used in the session.' },
    ],
    ordering: 'Three blockers here are one root cause: a hand-built overlay instead of a dialog primitive. Ranking them separately would produce three tickets and one remaining bug. Fix the primitive, then the error messaging, then the role explanations — and note that the repeat-invite friction is the defect users will actually complain about, which is a useful lesson in the difference between what is worst and what is loudest.',
    topicId: 'screen-readers',
  },
  {
    id: 'ar-chart',
    screen: 'Analytics dashboard: multi-series line chart with hover tooltips',
    context: 'A manager reviewing weekly numbers on a laptop in a bright meeting room.',
    defects: [
      { id: 'd1', category: 'Screen-reader clarity', symptom: 'The chart is an inline SVG with no text alternative and no data table.', blocks: 'Screen-reader users get nothing at all from the primary content of the page.', wcag: '1.1.1 Non-text Content (A)', severity: 'blocker', repair: 'Provide a linked data table, and a one-sentence summary of the trend — which sighted users will use too.' },
      { id: 'd2', category: 'Keyboard', symptom: 'Series values are available only on mouse hover.', blocks: 'Keyboard and touch users cannot read any specific value.', wcag: '2.1.1 Keyboard (A) · 1.4.13 Content on Hover or Focus (AA)', severity: 'blocker', repair: 'Make data points focusable with arrow-key traversal, and show the tooltip on focus as well as hover.' },
      { id: 'd3', category: 'Contrast', symptom: 'Five series are distinguished by hue alone; two of them are red and green.', blocks: 'Roughly one in twelve men cannot separate the two most important lines.', wcag: '1.4.1 Use of Color (A)', severity: 'major', repair: 'Differentiate by line style and direct labelling; keep colour as reinforcement, never as the only channel.' },
      { id: 'd4', category: 'Contrast', symptom: 'Axis labels are #a8b0bd on #f7f8fa — roughly 2.2:1.', blocks: 'Anyone in the bright room this chart is designed to be read in.', wcag: '1.4.3 Contrast (Minimum) (AA)', severity: 'major', repair: 'Darken the axis token globally; chart text is text.' },
      { id: 'd5', category: 'Cognitive load', symptom: 'The Y axis starts at 40, not 0, with no marker — a 2% change looks like a collapse.', blocks: 'Everyone, including the executives making decisions from it.', wcag: 'Not a WCAG failure; an honesty defect.', severity: 'major', repair: 'Zero-base the axis or mark the truncation explicitly. A misleading chart is an accessibility problem in the broadest sense.' },
      { id: 'd6', category: 'Labels & instructions', symptom: 'The legend is positioned below the fold on laptop screens.', blocks: 'Anyone who does not scroll before interpreting — which is most people in a meeting.', wcag: 'Usability defect; contributes to 1.3.2 Meaningful Sequence (A) risk.', severity: 'minor', repair: 'Label lines directly at their right-hand end and delete the legend.' },
    ],
    ordering: 'Two blockers make the content unavailable to entire groups; they lead. But notice the axis truncation: it is not a WCAG failure and it is the defect most likely to cause a wrong decision this week. Ranking purely by standard would bury it. The defensible order names both frames — “blocked first, then wrong-decision risk, then friction” — and the conversation about the truncated axis is the one that earns you the room.',
    topicId: 'contrast-signals',
  },
  {
    id: 'ar-onboarding',
    screen: 'Onboarding: autoplaying video, carousel of tips, timed trial banner',
    context: 'A new user on a tablet, with a vestibular condition and a 20-minute window.',
    defects: [
      { id: 'd1', category: 'Cognitive load', symptom: 'The video autoplays with sound over the sign-in confirmation.', blocks: 'Anyone in a shared space, and anyone using audio output for a screen reader — the two speech streams collide.', wcag: '1.4.2 Audio Control (A)', severity: 'blocker', repair: 'Never autoplay with sound. If it plays, provide a control within the first tab stop.' },
      { id: 'd2', category: 'Cognitive load', symptom: 'The tips carousel advances automatically every four seconds and cannot be paused.', blocks: 'Anyone who reads slowly, anyone with a vestibular condition, and anyone interrupted.', wcag: '2.2.2 Pause, Stop, Hide (A)', severity: 'blocker', repair: 'Pause on hover and focus, and provide a visible pause control. Or make it a list — most carousels are a list wearing a costume.' },
      { id: 'd3', category: 'Labels & instructions', symptom: 'The video has no captions and no transcript; it contains the only explanation of the trial terms.', blocks: 'Deaf and hard-of-hearing users, and everyone in a quiet office.', wcag: '1.2.2 Captions (Prerecorded) (A)', severity: 'blocker', repair: 'Caption it, transcribe it, and put the trial terms in text on the page regardless.' },
      { id: 'd4', category: 'Error recovery', symptom: 'The trial banner counts down and the session expires with no warning; unsaved setup is lost.', blocks: 'Anyone who needs more time — which is the entire point of the criterion.', wcag: '2.2.1 Timing Adjustable (A)', severity: 'major', repair: 'Warn at twenty seconds, allow extension, and persist the work regardless.' },
      { id: 'd5', category: 'Focus order', symptom: 'The carousel’s off-screen slides remain focusable, so Tab disappears into invisible content.', blocks: 'Keyboard users tab into nothing and cannot see where they are.', wcag: '2.4.3 Focus Order (A) · 2.4.7 Focus Visible (AA)', severity: 'major', repair: 'Remove inactive slides from the tab order with inert or display:none.' },
      { id: 'd6', category: 'Contrast', symptom: 'White text sits over a video frame whose brightness varies through the clip.', blocks: 'Everyone, intermittently — the worst kind of contrast failure because it passes a static audit.', wcag: '1.4.3 Contrast (Minimum) (AA)', severity: 'major', repair: 'Put the text on a solid surface. Text over moving imagery cannot be verified.' },
    ],
    ordering: 'This screen has three Level A blockers that a lint tool will not catch, because they are about time and motion rather than markup. Order: stop the sound, stop the motion, caption the terms — then timing, then focus. The systemic note worth making is that all three blockers come from treating onboarding as a marketing surface; the repair is a decision about who owns this screen, not just a set of tickets.',
    topicId: 'dynamic-type',
  },
  {
    id: 'ar-address',
    screen: 'Mobile address entry with a map pin and autocomplete',
    context: 'A user entering a delivery address one-handed on a phone, outdoors, with large text enabled.',
    defects: [
      { id: 'd1', category: 'Cognitive load', symptom: 'At the largest Dynamic Type size the “Confirm” button is pushed below the map and is unreachable without collapsing the keyboard.', blocks: 'Anyone using large text — the group most likely to need this flow to be simple.', wcag: '1.4.4 Resize Text (AA) · 1.4.10 Reflow (AA)', severity: 'blocker', repair: 'Pin the primary action; let the map shrink. The map is context, the button is the task.' },
      { id: 'd2', category: 'Keyboard', symptom: 'The map pin can only be positioned by dragging; there is no text fallback for the final position.', blocks: 'Motor-impaired users, switch users, and anyone whose hands are full or cold.', wcag: '2.1.1 Keyboard (A) · 2.5.1 Pointer Gestures (A)', severity: 'blocker', repair: 'Always allow a typed address to stand alone. The pin is refinement, never the only route.' },
      { id: 'd3', category: 'Screen-reader clarity', symptom: 'Autocomplete suggestions appear in a plain div; the number of results is never announced.', blocks: 'Screen-reader users do not know suggestions exist and type the whole address blind.', wcag: '4.1.3 Status Messages (AA) · 1.3.1 Info and Relationships (A)', severity: 'major', repair: 'Use the combobox pattern with aria-live result counts — and test it, because this pattern is easy to half-implement.' },
      { id: 'd4', category: 'Labels & instructions', symptom: 'Nothing states which parts of the address are required before the user submits.', blocks: 'Everyone, especially for addresses that do not match the assumed national format.', wcag: '3.3.2 Labels or Instructions (A)', severity: 'major', repair: 'Mark required fields at the field, and accept formats you did not anticipate.' },
      { id: 'd5', category: 'Error recovery', symptom: 'A failed lookup clears every field and returns to the top.', blocks: 'Everyone; it is also the moment people abandon the order entirely.', wcag: '3.3.7 Redundant Entry (A, WCAG 2.2)', severity: 'blocker', repair: 'Never clear user input on a system failure. Preserve, explain, and offer manual entry.' },
      { id: 'd6', category: 'Contrast', symptom: 'The pin and its shadow have 2.4:1 contrast against a pale map tile.', blocks: 'Low-vision users outdoors cannot see the element they are being asked to drag.', wcag: '1.4.11 Non-text Contrast (AA)', severity: 'minor', repair: 'Add a high-contrast outline to the pin; map tiles cannot be relied on as a background.' },
    ],
    ordering: 'Three blockers, and the order should follow the cost to the person: clearing their input on a system failure is the most contemptuous of the three, so it goes first even though the reflow bug is more visible in a demo. Then the unreachable button, then the drag-only pin. A useful framing for the room: “two of these are our bugs and one is our attitude — the clearing behaviour is a choice somebody made.”',
    topicId: 'dynamic-type',
  },
];


// ── 8 · Product Failure Autopsy ────────────────────────────────────────────

export type RiskLens = 'desirability' | 'usability' | 'feasibility' | 'viability' | 'trust';

export const riskLenses: { id: RiskLens; label: string; asks: string }[] = [
  { id: 'desirability', label: 'Desirability', asks: 'Did enough people want the progress this offered, at this moment?' },
  { id: 'usability', label: 'Usability', asks: 'Could people actually operate it, and did it fit the habit it displaced?' },
  { id: 'feasibility', label: 'Feasibility', asks: 'Could it be built and operated reliably at the quality the promise required?' },
  { id: 'viability', label: 'Viability', asks: 'Did the economics work at the scale required to survive?' },
  { id: 'trust', label: 'Trust', asks: 'Did people believe it would treat them and their data well — and did it?' },
];

export interface AutopsyCase {
  id: string;
  subject: string;
  period: string;
  whatHappened: string;
  behaviourMisread: string;
  verdict: RiskLens;
  verdictWhy: string;
  secondary: RiskLens;
  earlySignal: string;
  smallerExperiment: string;
  transferable: string;
  reported: string;
}

export const autopsyCases: AutopsyCase[] = [
  {
    id: 'ap-quibi',
    subject: 'Quibi',
    period: 'Launched April 2020 · wound down December 2020',
    whatHappened: 'A short-form, mobile-only premium streaming service raised about $1.75 billion and launched with Hollywood-scale production and “quick bite” episodes of ten minutes or less. It shut down roughly six months later, having fallen far short of subscriber projections. Casting support arrived two months after launch; TV apps arrived two days before the shutdown was announced.',
    behaviourMisread: 'That people wanted premium, paid, ten-minute episodes on a phone — a habit built for commutes and queues, at the moment lockdowns removed both. The deeper misread was treating the phone as a venue rather than as a device people use to move content to bigger screens and to share it.',
    verdict: 'desirability',
    verdictWhy: 'The service was usable, well-produced, and technically accomplished. What it lacked was enough people for whom paid short-form premium video on a phone was progress — and the mobile-only constraint, which was a creative belief rather than a technical one, blocked the two behaviours (casting and sharing) that might have created it.',
    secondary: 'viability',
    earlySignal: 'Before any content was commissioned: whether anyone would pay for short premium video they could not cast, could not share, and could not watch on a television. That is testable for a few hundred thousand dollars with existing footage and a fake door.',
    smallerExperiment: 'Licence a small slate, publish it inside an existing platform, and measure paid retention at week four against the no-casting, no-sharing constraint — the exact constraint the whole strategy rested on.',
    transferable: 'A constraint that comes from a creative conviction, not a technical limit, is the first thing to test — not the last thing to relax.',
    reported: 'Publicly reported by Variety and the Wall Street Journal at the time of the shutdown.',
  },
  {
    id: 'ap-snapredesign',
    subject: 'Snapchat’s 2017–18 redesign',
    period: 'Rolled out from late 2017 · user decline reported Q2 2018',
    whatHappened: 'Snap redesigned the app to separate friends from publishers, aiming to make it easier to understand for new users. More than 1.2 million people signed a petition asking for a reversal. Snap reported daily active users falling from 191 million to 188 million in Q2 2018 — its first decline as a public company — and the CEO attributed it to disruption caused by the redesign. Several changes were subsequently rolled back.',
    behaviourMisread: 'That the difficulty new users reported was the same difficulty existing users experienced. For the core base, the app’s opacity was not a flaw to be fixed — the learned gestures were the product, and the muscle memory was the retention mechanism.',
    verdict: 'usability',
    verdictWhy: 'Nothing about desire or economics changed; what broke was the fit between the interface and an enormous installed base of learned behaviour. A change that helps novices at the cost of experts is a segmentation decision, and it was made as if it were a clarity decision.',
    secondary: 'trust',
    earlySignal: 'Frequency of use — not satisfaction — among heavy users in the first fortnight of a limited rollout. Session frequency degrades before sentiment does, and it is measurable within days.',
    smallerExperiment: 'Ship the new information architecture to a small share of existing heavy users and to all new users simultaneously, and compare frequency curves for six weeks before global rollout.',
    transferable: 'When a redesign serves a segment that is not yet paying you, stage it against the segment that already is — and make frequency, not satisfaction, the gate.',
    reported: 'Publicly reported: Snap Q2 2018 results and prepared remarks; contemporaneous coverage in The Verge and MacRumors.',
  },
  {
    id: 'ap-firephone',
    subject: 'Amazon Fire Phone',
    period: 'Launched July 2014 · written down October 2014 · discontinued 2015',
    whatHappened: 'Amazon launched a smartphone with Dynamic Perspective (head-tracked 3D effects) and Firefly (object recognition for shopping), priced against flagship devices on a single carrier. Amazon disclosed a $170 million charge related to unsold inventory in its Q3 2014 results, with roughly $83 million of unsold stock remaining, and discontinued the device the following year.',
    behaviourMisread: 'That people choose a phone for a novel input capability. Phone choice is dominated by ecosystem lock-in, camera, and messaging continuity — and Firefly optimised the part of shopping that was never the bottleneck, since finding products was already easy.',
    verdict: 'desirability',
    verdictWhy: 'The technology worked and the manufacturing was feasible. What did not exist was a reason to switch: the differentiating features solved problems users did not rank, at a price that demanded they rank them highly.',
    secondary: 'viability',
    earlySignal: 'Stated switching intent at flagship price among existing Prime members, measured before hardware commitment — and, more honestly, how often people said they struggled to find products to buy.',
    smallerExperiment: 'Ship Firefly as a feature of the existing Amazon app on phones people already owned, and measure whether object-recognition shopping changed purchase frequency at all. It required no hardware to learn the decisive fact.',
    transferable: 'When the differentiator is a capability rather than an outcome, test the capability inside something people already carry before you build something they must adopt.',
    reported: 'Publicly reported: Amazon Q3 2014 results; contemporaneous coverage in The Guardian and Fortune.',
  },
  {
    id: 'ap-googleplus',
    subject: 'Google+',
    period: 'Launched 2011 · consumer service shut down April 2019',
    whatHappened: 'Google launched a social network built around Circles for selective sharing, and integrated it across its products — including a period in which a Google+ profile was effectively required to comment on YouTube. After years of low engagement and two disclosed data-exposure bugs, the consumer service was shut down in April 2019.',
    behaviourMisread: 'That the friction in social sharing was audience management. Circles was a precise solution to a problem most people solved by posting less, or by moving to a different app entirely — and the integration strategy read distribution as demand.',
    verdict: 'desirability',
    verdictWhy: 'A network product without organic pull cannot be made desirable by distribution, and forced integration converted indifference into resentment. The later data exposure compounded a trust problem that the integration had already created.',
    secondary: 'trust',
    earlySignal: 'Unprompted return visits from users who arrived without being routed there, measured separately from integration-driven traffic. That cut existed from the first month and would have told a different story than total accounts.',
    smallerExperiment: 'Launch Circles as a sharing control inside an existing product with genuine usage, and test whether audience precision changed posting frequency — before building a network around the hypothesis.',
    transferable: 'Distribution can deliver an audience; it cannot manufacture a reason to return. Report the organic cut separately, always, or you will measure your own marketing.',
    reported: 'Publicly reported: Google’s 2018 and 2019 announcements regarding the consumer Google+ shutdown.',
  },
  {
    id: 'ap-win8',
    subject: 'Windows 8 Start screen',
    period: 'Released October 2012 · Start button restored in 8.1, October 2013',
    whatHappened: 'Windows 8 replaced the Start menu with a full-screen tile interface and introduced edge-swipe “charms”, designed for touch, on a base overwhelmingly composed of mouse-and-keyboard desktop users. Discoverability complaints were immediate; Windows 8.1 restored the Start button and added boot-to-desktop.',
    behaviourMisread: 'That an interface designed for a device people might buy could be imposed on the device they already had. Edge gestures are discoverable with a thumb and effectively invisible with a mouse — the affordance did not transfer.',
    verdict: 'usability',
    verdictWhy: 'There was demand for touch computing and the engineering was sound. What failed was the assumption that one interaction model could serve two input paradigms without a mode, on an installed base measured in hundreds of millions.',
    secondary: 'desirability',
    earlySignal: 'Time to first successful application launch for a mouse-only user encountering the new shell cold. A ten-participant study would have shown it in an afternoon — and almost certainly did.',
    smallerExperiment: 'Ship the tile shell as an optional mode on existing Windows and measure voluntary retention of the mode among mouse users over a month, before making it the default for everyone.',
    transferable: 'When an interaction depends on an input device, an installed base is a constraint, not an audience to be re-educated.',
    reported: 'Publicly reported: Microsoft’s Windows 8.1 release notes and extensive contemporaneous coverage.',
  },
  {
    id: 'ap-applemaps',
    subject: 'Apple Maps at launch',
    period: 'Shipped with iOS 6, September 2012',
    whatHappened: 'Apple replaced Google Maps with its own mapping service as the iOS default. Launch data quality was widely criticised — misplaced landmarks, distorted satellite imagery, wrong transit information. Apple’s CEO published a public apology within weeks, recommending alternatives while the product improved. The product recovered over subsequent years.',
    behaviourMisread: 'That a map is a feature to be matched rather than a utility whose entire value is being right when you are lost. Users do not grade maps on average accuracy; a single wrong answer at the wrong moment destroys reliance permanently.',
    verdict: 'trust',
    verdictWhy: 'Desirability was not in question — the app was pre-installed and used immediately. The failure was in the promise: a default-position utility inherits an expectation of correctness, and data quality could not meet it on day one.',
    secondary: 'feasibility',
    earlySignal: 'Error rates on the long tail of queries in specific regions, compared against the incumbent — and the fact that “average accuracy” was being used as the readiness measure at all.',
    smallerExperiment: 'Ship as an alternative app, not as the default, and earn the default position with a published regional accuracy threshold. The same product would have been received as a promising first version.',
    transferable: 'Replacing a utility is not a feature launch. Where the cost of a single wrong answer is high, ship beside the incumbent until the long tail is good enough to be relied on.',
    reported: 'Publicly reported: Tim Cook’s open letter of 28 September 2012 and contemporaneous coverage.',
  },
  {
    id: 'ap-juicero',
    subject: 'Juicero',
    period: 'Launched 2016 · ceased operations September 2017',
    whatHappened: 'A connected juice press, initially priced at $699 and later $400, pressed proprietary single-serve produce packs sold by subscription. In April 2017 a Bloomberg report demonstrated the packs could be squeezed by hand to produce much the same result. The company ceased operations within months.',
    behaviourMisread: 'That the difficulty in fresh juice was the pressing. The genuine job was convenience and freshness with no cleanup — which the packs already delivered on their own. The machine was engineering aimed at a step that had already been solved by the consumable.',
    verdict: 'viability',
    verdictWhy: 'People did want convenient fresh juice, and the hardware was feasible and well made. The economics could not survive the moment customers realised the expensive half of the system was optional — the value was in the pack, and the pack could be sold without the press.',
    secondary: 'trust',
    earlySignal: 'A control group receiving packs with no press. Anyone inside the company could have run it in a week, and the result would have redirected the entire business.',
    smallerExperiment: 'Sell the packs alone in one city for a quarter and measure repeat subscription. Positive economics there would have revealed the actual product, before $100m+ went into the hardware around it.',
    transferable: 'Always test the consumable without the device. If the cheaper half delivers most of the value, that is the business, and finding out late is the expensive way.',
    reported: 'Publicly reported: Bloomberg’s April 2017 report and the company’s September 2017 statement.',
  },
  {
    id: 'ap-stadia',
    subject: 'Google Stadia',
    period: 'Launched November 2019 · service ended January 2023',
    whatHappened: 'A cloud gaming service streaming games to browsers and televisions without a console. It launched with a limited library, required buying games individually at full price on top of a subscription, and shut its first-party studios in early 2021. The service closed in January 2023, with Google refunding hardware and software purchases.',
    behaviourMisread: 'That the obstacle to playing games was hardware. For committed players the obstacles are library, social continuity, and the fear of losing a purchased collection — and buying full-price games on a platform with no guarantee of permanence asked players to take a risk the company itself would not underwrite.',
    verdict: 'trust',
    verdictWhy: 'The streaming technology largely worked, which is the striking part: feasibility was the risk everyone watched and the one that held. What failed was the credibility of the commitment, in a category where a purchase is expected to outlive the device — and Google’s own history made that the first question every player asked.',
    secondary: 'viability',
    earlySignal: 'Purchase behaviour after the first free month, segmented by whether the player already owned the same title elsewhere. Reluctance to re-buy is a permanence signal, and it is visible immediately.',
    smallerExperiment: 'Launch as a streaming layer for libraries players already owned on other stores, and measure whether streaming alone changed play frequency — separating the technology question from the ownership question entirely.',
    transferable: 'In categories where purchases are expected to last, platform permanence is a product feature. If you cannot credibly promise it, do not ask customers to buy — ask them to bring.',
    reported: 'Publicly reported: Google’s September 2022 shutdown announcement and the January 2023 service closure.',
  },
];


// ── Weekly rhythm ──────────────────────────────────────────────────────────

export interface RhythmDay {
  day: string;
  short: string;
  mode: SharpModeId | 'review';
  note: string;
}

// Index 0 = Monday, matching the studio's week dots.
export const weeklyRhythm: RhythmDay[] = [
  { day: 'Monday', short: 'M', mode: 'critique', note: 'Open the week by reading something unfamiliar quickly.' },
  { day: 'Tuesday', short: 'T', mode: 'metrics', note: 'Connect one design decision to one outcome.' },
  { day: 'Wednesday', short: 'W', mode: 'synthesis', note: 'Evidence discipline: observation before interpretation.' },
  { day: 'Thursday', short: 'T', mode: 'constraint', note: 'Get surprised on purpose. Adapt out loud.' },
  { day: 'Friday', short: 'F', mode: 'summary', note: 'Record the week’s best decision at three lengths.' },
  { day: 'Saturday', short: 'S', mode: 'a11yrepair', note: 'Accessibility or systems audit — craft, not theory.' },
  { day: 'Sunday', short: 'S', mode: 'autopsy', note: 'Review one old decision, and revise it honestly.' },
];

// Sunday doubles as the revision day: after the autopsy, revisit one saved
// session from earlier in the week and rewrite the weakest answer.
export const sundayRevision =
  'Reopen one saved session from this week. Re-answer the dimension you marked weakest — out loud, without reading your old note first — then compare. Revision is the only part of this lab that compounds.';

export function rhythmForDate(d: Date): RhythmDay {
  // JS: 0 = Sunday. The rhythm array starts on Monday.
  return weeklyRhythm[(d.getDay() + 6) % 7];
}

export function modeById(id: SharpModeId): SharpMode {
  return sharpModes.find(m => m.id === id) || sharpModes[0];
}
