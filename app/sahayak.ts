import { wisdomMirrors, uxEncyclopedia } from './content';

export type SahayakDialecticMode = 'bridge' | 'counter' | 'defense' | 'custom';

export interface SahayakMessage {
  id: string;
  role: 'sahayak' | 'user';
  content: string;
  mode?: SahayakDialecticMode;
  timestamp: number;
  pramanaTag?: 'प्रत्यक्ष (Pratyaksha)' | 'अनुमान (Anumana)' | 'उपमान (Upamana)' | 'शब्द (Shabda)';
  designTerm?: string;
  carryOnBranches?: string[];
}

export interface SahayakTopicPrompt {
  bridge: string;
  counter: string;
  defense: string;
}

// Curated Socratic prompt pairings for flagship Wisdom Mirror topics
const CURATED_PROMPTS: Record<string, SahayakTopicPrompt> = {
  'problem-framing': {
    bridge: 'The Upanishadic method of "Neti Neti" (Not this, not this) finds the absolute truth by negating what is false. When you scoped this design problem, what three tempting solutions did you explicitly reject to define the true problem boundary?',
    counter: 'Purva-Paksha challenge: You claim you framed the "real" user problem through qualitative research. But what if your interviewees suffered from social desirability bias? What contradictory signal in telemetry data did your problem frame ignore?',
    defense: '30-second framing defense: Frame the core problem of this project in two sentences without mentioning a single UI component, wireframe, or tool. Speak only of human friction and operational failure.'
  },
  'findability': {
    bridge: 'Rig Veda 1.89 asks us to welcome noble thoughts from all directions without prejudice. In search architecture, users bring fractured queries, typos, and fuzzy memories. How does your interface welcome every messy query with openness, while still presenting results with strict hierarchical order?',
    counter: 'Purva-Paksha challenge: You made search prominent and global. But in high-velocity operational workflows (like Chiti Console or order tracking), relying on search forces the user into recall rather than recognition. When does search become a lazy replacement for good navigation taxonomy?',
    defense: 'Defend your findability structure in 30 seconds: If an operator has 5 seconds to locate a stranded transaction among 100,000 records, how does your information hierarchy guarantee they succeed without panic?'
  },
  'jtbd': {
    bridge: 'Bhagavad Gita 2.47 warns against attachment to the fruit (the feature). Users do not want your dashboard; they want the peace of mind that nothing is burning. Which part of your interface exists solely because the team loved building it, rather than serving the user’s true job?',
    counter: 'Purva-Paksha challenge: You simplified the flow to satisfy the primary "job". What happens to the secondary job—like compliance audits, dispute exports, or edge-case cancellations? Did you make the common path 10% faster by making the rare path 200% harder?',
    defense: 'Executive grill: Walk me through the single biggest feature you killed or refused to build because it didn’t serve the core JTBD. What was the internal pushback, and what metric proved you right?'
  },
  'three-ways': {
    bridge: 'Zen Shoshin (Beginner’s Mind) reminds us that expertise closes doors. Before you committed to your current screen structure, what was the radical "impossible" concept you explored and abandoned? What kernel of truth did it contain?',
    counter: 'Purva-Paksha challenge: Presenting stakeholders with 3 divergent concepts often leads to "Frankenstein design"—where committees pick the button from Option A, the layout from Option B, and the modal from Option C. How did your decision rubric prevent this synthesis trap?',
    defense: 'Defend your chosen direction: Why is your selected concept architecturally superior to the conservative incremental tweak and the radical blue-sky option? What constraint settled the debate?'
  },
  'progressive-disclosure': {
    bridge: 'In Indian classical music (Raga Alapana), the master unfolds the melody note by note, revealing the full complexity only as the listener’s ear ripens. How does your interface introduce novice operators to deep systems without terrifying them on Day 1?',
    counter: 'Purva-Paksha challenge: Every progressive disclosure is a hidden interaction cost. Hiding advanced filters or secondary tables behind accordions forces repeat power users into repetitive clicks. Where did your "clean UI" create friction for the daily expert?',
    defense: 'Explain your disclosure threshold: What exact user signal or permission tier determines when a hidden capability reveals itself? How do you know you didn’t bury critical emergency controls?'
  },
  'dark-patterns': {
    bridge: 'Patanjali’s first Yama is Ahimsa (non-harm). In software, friction is often weaponized to prevent cancellations or trick clicks. Where is the subtle boundary in your product between persuasive design that serves the user, and coercive design that exploits cognitive fatigue?',
    counter: 'Purva-Paksha challenge: A business stakeholder demands higher conversion or newsletter opt-ins by using pre-checked boxes or subtle urgency copy. You say no on ethical grounds. How do you defend that stance using cold commercial metrics (churn, LTV, brand trust) rather than moral preaching?',
    defense: '30-second ethical defense: Describe a moment you had to defend the user’s dignity against a short-term KPI pressure. What alternative did you propose that protected both the user and the business?'
  },
  'mental-models': {
    bridge: 'Advaita speaks of Maya—the mental superimposition over reality. Users never interact with your database; they interact with the psychological model in their head. Where does your system’s internal database schema leak into the UI and confuse the user’s natural mental model?',
    counter: 'Purva-Paksha challenge: Designers often say "make it match the user’s mental model." But what if the user’s legacy mental model was built on inefficient paper forms or 1990s legacy software? When is it your duty to gently break and elevate their mental model rather than mimic it?',
    defense: 'Defend your conceptual model: What physical metaphor (a ledger, a physical desk, a conversation, a conveyor belt) anchors your system? Why is that metaphor intuitive to someone with zero technical training?'
  },
  'cognitive-load': {
    bridge: 'Buddha’s dialogue with Sona about the lute: when the strings are too tight, they snap (anxiety); when too loose, they make no music (boredom). In your interface, how do you tune cognitive load so the user remains alert and effective without burning out by 3 PM?',
    counter: 'Purva-Paksha challenge: You minimized extraneous cognitive load by stripping data off the screen. But now the user has to click through 4 nested pages to assemble context, taxing their short-term working memory. Did you trade visual clutter for mental gymnastics?',
    defense: '30-second cognitive audit: Point to the single highest-stress decision on this screen. How does your typography, whitespace, and color contrast lower the user’s heart rate during an error state?'
  },
  'microcopy': {
    bridge: 'Bhagavad Gita 17.15 defines austerity of speech: words that cause no agitation, are truthful, pleasant, and beneficial. When your system throws an error, does the copy explain the breakdown with dignity and a clear recovery path, or does it leave the user feeling incompetent?',
    counter: 'Purva-Paksha challenge: Trendy "conversational microcopy" can be patronizing during critical failures. Saying "Oopsie! Our servers took a nap" when someone’s ₹50,000 transaction fails destroys trust. Where should your copy be clinical and precise rather than friendly?',
    defense: 'Rewrite this error message: "Error 403: Forbidden - Access Denied". Give me a senior, respectful 12-word version that tells the user what happened, why, and what single action resolves it.'
  }
};

/**
 * Clickable starter chips tailored to the active topic.
 */
export function getTopicSuggestions(topicId: string): string[] {
  const specific: Record<string, string[]> = {
    'problem-framing': [
      '💡 Explain "Not this, not this" in plain UX terms',
      '🏢 Give a real example from Chiti Console or Apple',
      '⚔️ Challenge my team: what if our framing is wrong?',
      '🎙️ How do I defend this in an interview in 30s?'
    ],
    'findability': [
      '💡 How does Rig Veda 1.89 translate to search UX?',
      '🏢 When does search become a lazy crutch in an ERP?',
      '⚔️ Challenge: what if power users hate search?',
      '🎙️ How do I defend my navigation hierarchy?'
    ],
    'jtbd': [
      '💡 How does Gita 2.47 apply to feature requests?',
      '🏢 How do I kill a feature the stakeholders love?',
      '⚔️ Challenge: what about secondary edge-case jobs?',
      '🎙️ 30s defense: articulate the core user job'
    ],
    'three-ways': [
      '💡 What does Zen Beginner\'s Mind mean in Figma?',
      '🏢 How do I prevent Frankenstein design compromise?',
      '⚔️ Challenge: why not just build Option A?',
      '🎙️ 30s pitch: defend the chosen design direction'
    ],
    'progressive-disclosure': [
      '💡 How does Indian classical raga apply to complex UI?',
      '🏢 Where does "clean UI" hurt daily operators?',
      '⚔️ Challenge: did we hide critical emergency tools?',
      '🎙️ How do I defend our drawer/accordion threshold?'
    ],
    'dark-patterns': [
      '💡 How does Patanjali\'s Ahimsa apply to churn flows?',
      '🏢 How do I push back against deceptive KPI pressure?',
      '⚔️ Challenge: isn\'t all marketing persuasive friction?',
      '🎙️ 30s ethical defense: defending user dignity'
    ],
    'cognitive-load': [
      '💡 How does Buddha\'s tuned lute metaphor apply to UX?',
      '🏢 Did we trade visual clutter for mental gymnastics?',
      '⚔️ Challenge: why not show all data on one screen?',
      '🎙️ 30s defense: how this UI prevents operator burnout'
    ]
  };

  if (specific[topicId]) {
    return specific[topicId];
  }

  const topic = uxEncyclopedia.find(t => t.id === topicId);
  const title = topic?.title || 'this principle';

  return [
    `💡 Explain ${title} in simple design terms`,
    `🏢 Give a real-world example from enterprise software`,
    `⚔️ Challenge my team\'s assumptions on this`,
    `🎙️ How do I defend ${title} in an executive interview?`
  ];
}

/**
 * Returns a warm, curious initial message when Sahayak is opened.
 */
export function getInitialSahayakMessage(topicId: string, mode: SahayakDialecticMode = 'bridge'): SahayakMessage {
  const topic = uxEncyclopedia.find(t => t.id === topicId);
  const wisdom = wisdomMirrors[topicId];
  const title = topic?.title || 'This Principle';

  let greeting = `Namaste Prabhakar. I'm excited to explore **${title}** with you today.`;

  if (wisdom) {
    greeting += ` We're anchoring on **${wisdom.source}**: “*${wisdom.verse}*”.`;
  }

  greeting += `\n\nI'm curious: when you think about your current projects, where do you feel the biggest tension around this principle? You can speak into the mic or tap one of our starting points below.`;

  return {
    id: `sahayak_welcome_${Date.now()}`,
    role: 'sahayak',
    content: greeting,
    mode,
    timestamp: Date.now(),
    pramanaTag: 'उपमान (Upamana)',
    designTerm: 'Intentional Framing',
    carryOnBranches: [
      `Explain "${wisdom?.verse || title}" in plain design terms`,
      `Give me a real-world example from Chiti Console`,
      `Challenge my team's assumptions on this`,
      `How would I defend this in an interview?`
    ]
  };
}

/**
 * Dynamically synthesizes Socratic prompts for any topic in the encyclopedia.
 */
export function getSahayakPrompts(topicId: string): SahayakTopicPrompt {
  if (CURATED_PROMPTS[topicId]) {
    return CURATED_PROMPTS[topicId];
  }

  const topic = uxEncyclopedia.find(t => t.id === topicId);
  const wisdom = wisdomMirrors[topicId];

  if (wisdom) {
    return {
      bridge: `Reflecting on ${wisdom.source} (“${wisdom.verse}”): ${wisdom.parallel} In your own interface, where does this eternal tension between simplicity and discipline manifest right now?`,
      counter: `Purva-Paksha counter-challenge on ${topic?.title || topicId}: If an aggressive stakeholder pushes back and calls this approach impractical or slow to ship, what trade-off do they expose, and how do you answer?`,
      defense: `30-second defense: Explain how your design honors ${topic?.title || topicId} without compromising operational speed or system performance.`
    };
  }

  const model = topic?.mentalModel || 'this principle';
  const trap = topic?.commonTraps ? topic.commonTraps.split(' ~ ')[0] : 'over-complication';

  return {
    bridge: `Mental model inquiry: “${model}”. If you had to explain this to a non-designer founder using an everyday physical analogy, what metaphor makes the underlying human truth undeniable?`,
    counter: `Purva-Paksha trap analysis: The common vulnerability here is “${trap}”. Where in your current designs are you closest to falling into this exact trap?`,
    defense: `Senior design defense: You have 30 seconds with an engineering director. How do you prove that respecting “${topic?.title || 'this principle'}” reduces downstream tech debt and bug tickets?`
  };
}

/**
 * Intelligent, intent-driven conversational response generator.
 * Every response carries design language fluency, curious questioning, and 3 carry-on branches.
 */
export function evaluateSahayakReflection(
  topicId: string,
  userText: string,
  mode: SahayakDialecticMode
): SahayakMessage {
  const trimmed = userText.trim();
  const lower = trimmed.toLowerCase();
  const topic = uxEncyclopedia.find(t => t.id === topicId);
  const wisdom = wisdomMirrors[topicId];
  const title = topic?.title || 'This Principle';

  // ── INTENT 1: User asks for help, orientation, or greetings ────────────────
  const isHelpQuery = /^(hi|hello|hey|namaste|help|what can you do|how can you help|what should i type|how to use|what is this|guide me|confused|start)/i.test(lower);
  if (isHelpQuery) {
    const helpContent = `I am your design sparring fellow! Think of me as a senior design director sitting beside you. 

Instead of asking you to memorize textbook rules, I help you build **design language fluency** and sharpen your decision-making so you can defend your work with calm authority.

You can speak to me naturally using the microphone, or type your thoughts. 

**Here's where we can dive in right now:**`;

    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: helpContent,
      mode,
      timestamp: Date.now(),
      pramanaTag: 'उपमान (Upamana)',
      designTerm: 'Socratic Dialogue',
      carryOnBranches: [
        `Explain the core tension of ${title}`,
        `Give me an operational case study from Chiti Console`,
        `Challenge my design: what trade-off am I missing?`,
        `Test my 30-second interview pitch`
      ]
    };
  }

  // ── INTENT 2: User asks to explain the principle or verse ──────────────────
  const isExplainQuery = /(explain|what does .* mean|meaning|tell me more|simplify|understand|break down|philosophy)/i.test(lower);
  if (isExplainQuery) {
    let explanation = '';
    let term = 'Mental Model Alignment';
    let branches: string[] = [];

    if (topicId === 'problem-framing') {
      term = 'Boundary Definition & Neti Neti';
      explanation = `In the Upanishads, **"Neti Neti" (Not this, not this)** is the art of arriving at the absolute truth by deliberately negating distractions.

In product design, junior teams define problems by jumping straight to solutions: *"Users need a new analytics dashboard with filters."*

A senior designer applies **Neti Neti**:
• It is **not** that users lack charts.
• It is **not** that the export button is small.
• The real problem is: *Operations leads cannot detect which 3 shipments are delayed until a customer files a dispute.*

By deliberately saying *"Not this"* to tempting features, the boundary of the real human friction becomes crystal clear.

I'm curious: in your current work, what is one tempting feature that stakeholders are demanding that you know is actually a distraction?`;

      branches = [
        'They want an AI summary widget that users didn\'t ask for',
        'They want 15 table filters instead of smart default views',
        'How do I diplomatically say "not this" to a VP?',
        'Give me a concrete example from Chiti Console'
      ];
    } else if (wisdom) {
      term = 'Philosophical Grounding';
      explanation = `**${wisdom.source}** observes: *“${wisdom.verse}”*

${wisdom.parallel}

In enterprise software, this represents the discipline of **functional honesty**—releasing attachment to visual decoration and focusing entirely on the operator\'s workflow velocity.

I'm curious: when you review your screens today, which component exists because the team loved building it, rather than because the user genuinely needed it?`;

      branches = [
        'We built a complex chart that operators ignore',
        'We hid critical actions behind dropdowns to look "clean"',
        'How does this apply to high-volume ERP operators?',
        'Challenge my team\'s latest design decision'
      ];
    } else {
      term = 'Principle Clarification';
      explanation = `**${title}** centers on this mental model: *“${topic?.mentalModel || 'clarity over clutter'}”*.

Most teams fall into the trap of *“${topic?.commonTraps.split(' ~ ')[0] || 'adding unnecessary complexity'}”*. When you design with senior restraint, you eliminate the noise so the primary **information scent** is unmistakable.

What is the single most important action a user should take on this view within their first 3 seconds?`;

      branches = [
        'How do I test information scent on complex screens?',
        'Give me a real-world enterprise example',
        'Poke holes in my team\'s current approach',
        'How do I defend this in an executive interview?'
      ];
    }

    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: explanation,
      mode,
      timestamp: Date.now(),
      pramanaTag: 'उपमान (Upamana)',
      designTerm: term,
      carryOnBranches: branches
    };
  }

  // ── INTENT 3: User asks for real-world examples ────────────────────────────
  const isExampleQuery = /(example|real world|chiti console|apple|google|enterprise|case study|scenario)/i.test(lower);
  if (isExampleQuery) {
    let exampleContent = '';
    let branches: string[] = [];

    if (topicId === 'problem-framing') {
      exampleContent = `Here is a real case from operational software like **Chiti Console** or healthcare dispatch:

• **The Distraction**: The team wanted to build an AI conversational bot to answer room availability questions. Estimated build: 4 months.
• **The Neti-Neti Reframing**: We asked: What is the real friction? Front-desk staff were receiving 120 calls an hour asking a single binary question: *Is Room 204 cleaned yet?*

The solution wasn't an AI bot. It was a high-contrast, real-time room ribbon at the top of the desk screen with an automated SMS to housekeeping. Built in 3 days. Call volume dropped by 75%.

Notice how Neti Neti saved 4 months of engineering waste by clarifying the actual human bottleneck.

I'm curious: where in your product are you tempted to build a complex feature instead of solving a simple operational friction?`;

      branches = [
        'We are building custom filters when users just need 3 presets',
        'We are adding tooltips instead of making labels self-explanatory',
        'How do I present this case study in an interview?',
        'Challenge me: what if stakeholders insist on the complex feature?'
      ];
    } else if (topic?.realWorldExample) {
      exampleContent = `**Case Study**: ${topic.realWorldExample}

Notice how in this scenario, operational success wasn\'t about visual aesthetics—it was about **cognitive bandwidth and error tolerance**.

When you look at this case, what was the hidden trade-off the designers had to accept?`;

      branches = [
        'They sacrificed visual novelty for consistency',
        'They optimized for speed over exploratory browsing',
        'How does this apply to my Chiti Console or portfolio story?',
        'Critique my 30-second defense of this approach'
      ];
    } else {
      exampleContent = `Consider an enterprise dashboard with 50,000 transactions:
If you give operators 20 filters and 5 graphs, cognitive load explodes. But if you design for **exception-based workflows** (highlighting only orders needing attention before 10 AM), they finish their morning queue in 15 minutes.

What is the single most critical exception an operator must never miss on your screen?`;

      branches = [
        'Missed SLAs and delayed deliveries',
        'Unpaid invoices approaching 30 days',
        'How do I balance exceptions with routine browsing?',
        'Challenge my exception-handling architecture'
      ];
    }

    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: exampleContent,
      mode,
      timestamp: Date.now(),
      pramanaTag: 'प्रत्यक्ष (Pratyaksha)',
      designTerm: 'Operational Telemetry',
      carryOnBranches: branches
    };
  }

  // ── INTENT 4: User asks for Purva-Paksha / Counter-Challenge ───────────────
  const isChallengeQuery = /(challenge|poke holes|counter|critique|what is wrong|pushback|stakeholder|disagree|risk)/i.test(lower);
  if (isChallengeQuery) {
    const prompts = getSahayakPrompts(topicId);
    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: `Let's put your design under the lens of **Purva-Paksha (the strongest counter-objection)**:

${prompts.counter}

Imagine a sharp VP of Engineering says this to you in a design review tomorrow. How do you defend your choice without sounding defensive?`,
      mode: 'counter',
      timestamp: Date.now(),
      pramanaTag: 'अनुमान (Anumana)',
      designTerm: 'Dialectical Stress-Testing',
      carryOnBranches: [
        'I would cite the 40% reduction in error rates from our pilot',
        'I would show that power users use keyboard shortcuts anyway',
        'What if the engineering director pushes back on latency?',
        'Give me the ideal 30-second executive response'
      ]
    };
  }

  // ── INTENT 5: User asks how to defend in an interview ──────────────────────
  const isInterviewQuery = /(interview|defend|pitch|30s|executive|vp|director|explain in 30)/i.test(lower);
  if (isInterviewQuery) {
    const interviewGuide = `When an executive interviewer asks you about **${title}**, they want to hear **trade-off maturity**, not textbook definitions.

Here is the **3-Part Senior Defense Spine**:
1. **The Trap (10s)**: *"Most teams approach ${title} by copying competitors or adding features..."*
2. **The Strategic Choice (10s)**: *"Instead, I framed the boundary around [the core operational friction] and deliberately excluded [the tempting distraction]..."*
3. **The Proof (10s)**: *"This protected user velocity and reduced [task time or error rate] by [observable metric]."*

Tap the mic and try speaking your 30-second version now. I'll critique your structure, conviction, and evidence!`;

    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: interviewGuide,
      mode: 'defense',
      timestamp: Date.now(),
      pramanaTag: 'शब्द (Shabda)',
      designTerm: 'Executive Defense Spine',
      carryOnBranches: [
        'In Chiti Console, I eliminated 3 redundant modal steps...',
        'In NetElixir, we replaced 10 ad metrics with 1 confidence score...',
        'How do I handle an interviewer who interrupts me?',
        'What evidence should I cite if I don\'t have exact analytics?'
      ]
    };
  }

  // ── INTENT 6: User entered an actual reflection, trade-off, or argument ─────
  const hasPratyaksha = /data|metric|telemetry|user|interview|session|observed|saw|tested|click|analytics|log|dropoff/i.test(lower);
  const hasAnumana = /because|trade-off|tradeoff|therefore|friction|cognitive|mental|reason|downside|sacrifice|balance/i.test(lower);

  let pramana: 'प्रत्यक्ष (Pratyaksha)' | 'अनुमान (Anumana)' | 'उपमान (Upamana)' | 'शब्द (Shabda)' = 'अनुमान (Anumana)';
  let term = 'Trade-Off Rationale';
  let critique = '';
  let followUp = '';
  let branches: string[] = [];

  if (trimmed.length < 20) {
    pramana = 'प्रत्यक्ष (Pratyaksha)';
    term = 'Concrete Grounding';
    critique = 'That is an interesting seed of a thought! But to help you build real interview fluency, let\'s make it concrete.';
    followUp = 'Which specific screen or workflow are you picturing? When an operator makes a mistake there, what exact feedback guides them?';
    branches = [
      'They receive an inline warning before clicking confirm',
      'The system auto-saves a draft so nothing is lost',
      'Give me an example of good error prevention',
      'How does Patanjali\'s Ahimsa apply to error states?'
    ];
  } else if (!hasPratyaksha && (mode === 'defense' || mode === 'counter')) {
    pramana = 'प्रत्यक्ष (Pratyaksha)';
    term = 'Empirical Evidence (Pratyaksha)';
    critique = 'Your conceptual reasoning is clear and thoughtful. But in a high-stakes review, conceptual rationale without telemetry sounds like designer intuition.';
    followUp = 'What observable signal—a drop-off metric, support ticket volume, or completion latency—would you point to as hard proof that this choice worked?';
    branches = [
      'Task completion time dropped from 3 minutes to 45 seconds',
      'Unforced form errors decreased by 35% in usability tests',
      'What if we don\'t have access to production telemetry?',
      'How do I defend this using qualitative observations?'
    ];
  } else if (!hasAnumana) {
    pramana = 'अनुमान (Anumana)';
    term = 'Cognitive Cost Accounting';
    critique = 'You clearly described the benefit of your solution! But every design choice exacts a price somewhere in the system.';
    followUp = 'What did you deliberately sacrifice—initial discoverability, power-user density, or development velocity—to buy that simplicity?';
    branches = [
      'We sacrificed power-user density for first-time clarity',
      'We accepted slightly higher dev complexity to keep the UI clean',
      'How do I explain trade-offs without sounding like I made a bad compromise?',
      'Challenge my solution with an extreme edge case'
    ];
  } else if (hasPratyaksha && hasAnumana) {
    pramana = 'शब्द (Shabda)';
    term = 'Synthesized System Thinking';
    critique = 'Brilliant articulation. You paired empirical grounding with honest trade-off accounting—that is exactly how senior staff designers speak.';
    followUp = wisdom
      ? `Now let's stress-test the boundary: Does your solution truly liberate the user\'s attention, or does it require them to maintain constant vigilance?`
      : 'What happens when a keyboard-only operator or screen-reader user navigates this exact flow?';
    branches = [
      'Keyboard tab order and focus rings are explicitly preserved',
      'How do I turn this into a permanent portfolio story?',
      'What question will a Principal Designer ask me next?',
      'Let\'s explore another topic in this domain'
    ];
  } else {
    pramana = 'उपमान (Upamana)';
    term = 'Mental Model Scalability';
    critique = 'You\'ve grasped the core mental model beautifully.';
    followUp = 'If your active transaction volume multiplied tenfold tomorrow, where is the first seam where this interaction begins to buckle?';
    branches = [
      'The pagination will slow down without batch processing',
      'Operators will need bulk multi-select actions',
      'How does Chiti Console handle high-density batch actions?',
      'Let\'s practice the 30-second elevator pitch'
    ];
  }

  return {
    id: `sahayak_${Date.now()}`,
    role: 'sahayak',
    content: `${critique}\n\n${followUp}`,
    mode,
    timestamp: Date.now(),
    pramanaTag: pramana,
    designTerm: term,
    carryOnBranches: branches
  };
}
