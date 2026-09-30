import { wisdomMirrors, uxEncyclopedia } from './content';

export type SahayakDialecticMode = 'bridge' | 'counter' | 'defense' | 'custom';

export interface SahayakMessage {
  id: string;
  role: 'sahayak' | 'user';
  content: string;
  mode?: SahayakDialecticMode;
  timestamp: number;
  pramanaTag?: 'प्रत्यक्ष (Pratyaksha)' | 'अनुमान (Anumana)' | 'उपमान (Upamana)' | 'शब्द (Shabda)';
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
 * Returns a warm, guiding initial message when Sahayak is opened.
 */
export function getInitialSahayakMessage(topicId: string, mode: SahayakDialecticMode = 'bridge'): SahayakMessage {
  const topic = uxEncyclopedia.find(t => t.id === topicId);
  const wisdom = wisdomMirrors[topicId];
  const title = topic?.title || 'This Principle';

  let greeting = `Namaste Prabhakar. I am your Socratic design companion for **${title}**.`;

  if (wisdom) {
    greeting += `\n\nWe explore this through **${wisdom.source}** (“*${wisdom.verse}*”).`;
  }

  greeting += `\n\n**How we can spar:**\n• **Understand**: Tap a question below to see how this ancient principle solves modern UI tensions.\n• **Challenge (Purva-Paksha)**: Tell me your current design decision, and I will poke holes in its trade-offs.\n• **Interview Defense**: Rehearse your 30-second rationale, and I will critique your evidence and conviction.\n\n*Tap any quick starter below to begin, or type a design question you\'re wrestling with!*`;

  return {
    id: `sahayak_welcome_${Date.now()}`,
    role: 'sahayak',
    content: greeting,
    mode,
    timestamp: Date.now(),
    pramanaTag: 'उपमान (Upamana)'
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
    const helpContent = `I am your Socratic design sparring partner. Instead of giving you textbook summaries to memorize, I help you think through design decisions like a principal designer.

**3 practical ways to talk with me:**
1. **Explain the Philosophy**: Ask me *"What does this verse mean in UI?"* or *"Give me a real-world example."*
2. **Stress-Test Your Design (Purva-Paksha)**: Tell me what you're designing (e.g. *"I\'m putting all filters into a modal to keep the table clean"*), and I will critique the hidden downside for power users or accessibility.
3. **Practice Interview Defense**: Tell me how you'd defend this principle to a VP or PM in 30 seconds, and I'll grade your clarity and evidence.

Try tapping one of the quick suggestion buttons below to see how it works!`;

    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: helpContent,
      mode,
      timestamp: Date.now(),
      pramanaTag: 'उपमान (Upamana)'
    };
  }

  // ── INTENT 2: User asks to explain the principle or verse ──────────────────
  const isExplainQuery = /(explain|what does .* mean|meaning|tell me more|simplify|understand|break down|philosophy)/i.test(lower);
  if (isExplainQuery) {
    let explanation = '';
    if (topicId === 'problem-framing') {
      explanation = `In the Upanishads, **"Neti Neti" (Not this, not this)** is the practice of finding truth by negating illusions and secondary distractions.

In product design, junior teams define a problem by immediately describing a feature: *"The problem is users need a customizable analytics dashboard with filters."*

A senior designer uses **Neti Neti**:
• It is **not** that users lack charts.
• It is **not** that the export button is small.
• The real problem is: *Operations leads cannot detect which 3 shipments are delayed until a customer files a dispute.*

By deliberately saying *"Not this"* to tempting feature ideas, the boundary of the real human problem becomes sharp.

**Your turn**: In your current project, what is one tempting feature that everyone wants to build, but that you should say *"Not this"* to?`;
    } else if (wisdom) {
      explanation = `**${wisdom.source}** gives us: *“${wisdom.verse}”*

${wisdom.parallel}

In modern interfaces, this means distinguishing between superficial aesthetics and functional truth. 

**Your turn**: Where in your current product are you tempted to polish the surface instead of solving the fundamental underlying friction?`;
    } else {
      explanation = `**${title}** anchors on the mental model: *“${topic?.mentalModel || 'clarity over clutter'}”*.

Most teams fall into the trap of *“${topic?.commonTraps.split(' ~ ')[0] || 'adding unnecessary complexity'}”*.

When you design with senior restraint, you eliminate the noise so the user\'s primary job becomes effortless.

**Your turn**: If you had to remove 30% of the visual elements from your current screen, what would you cut first without harming the user\'s task?`;
    }

    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: explanation,
      mode,
      timestamp: Date.now(),
      pramanaTag: 'उपमान (Upamana)'
    };
  }

  // ── INTENT 3: User asks for real-world examples ────────────────────────────
  const isExampleQuery = /(example|real world|chiti console|apple|google|enterprise|case study|scenario)/i.test(lower);
  if (isExampleQuery) {
    let exampleContent = '';
    if (topicId === 'problem-framing') {
      exampleContent = `Here is a real example from high-velocity operational software like **Chiti Console** or hospital dispatch:

• **Novice framing**: *"Build an AI-powered conversational bot to answer patient status queries."* (Result: 6 months of development, hallucinated answers, frustrated staff).
• **Senior Neti-Neti framing**: *"The problem is NOT lack of AI chat. It is that receptionists pick up 120 calls an hour asking a single binary question: Is the doctor running late?"*

The solution? Not a chat bot—a high-contrast, real-time status board visible in the waiting hall and a 1-line SMS trigger. Cost: 2 days of engineering. Patient anxiety dropped by 80%.

**Notice the difference**: Neti Neti stripped away the AI vanity and solved the human bottleneck. Where is your team tempted to build a complex feature instead of solving the simple operational bottleneck?`;
    } else if (topic?.realWorldExample) {
      exampleContent = `**Real-World Case Study**: ${topic.realWorldExample}

Notice how in this scenario, the difference between success and failure was not visual polish—it was operational integrity.

**How about your work?** Where does this exact dynamic show up in your current project or portfolio story?`;
    } else {
      exampleContent = `Consider an enterprise dashboard with 50,000 transactions:
If you give operators 20 filters and 5 graphs, cognitive load explodes. But if you frame the view around exceptions (orders requiring attention today), they complete their morning run in 15 minutes.

What is the single most critical exception an operator must catch on your screen?`;
    }

    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: exampleContent,
      mode,
      timestamp: Date.now(),
      pramanaTag: 'प्रत्यक्ष (Pratyaksha)'
    };
  }

  // ── INTENT 4: User asks for Purva-Paksha / Counter-Challenge ───────────────
  const isChallengeQuery = /(challenge|poke holes|counter|critique|what is wrong|pushback|stakeholder|disagree)/i.test(lower);
  if (isChallengeQuery) {
    const prompts = getSahayakPrompts(topicId);
    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: `**Purva-Paksha Counter-Challenge**:\n\n${prompts.counter}\n\nHow do you answer this objection without falling back on subjective designer taste?`,
      mode: 'counter',
      timestamp: Date.now(),
      pramanaTag: 'अनुमान (Anumana)'
    };
  }

  // ── INTENT 5: User asks how to defend in an interview ──────────────────────
  const isInterviewQuery = /(interview|defend|pitch|30s|executive|vp|director|explain in 30)/i.test(lower);
  if (isInterviewQuery) {
    const interviewGuide = `When an executive or Design Director asks you about **${title}**, they are not checking if you memorized definitions. They want to hear **trade-off discipline**.

**The 3-Part Senior Defense Spine:**
1. **The Trap (10s)**: *"Most teams approach ${title} by adding features or copying competitors..."*
2. **Your Decision (10s)**: *"Instead, I framed the boundary around [the core user job/friction] and deliberately excluded [tempting distraction]..."*
3. **The Proof (10s)**: *"This protected operational velocity and reduced [error rate/latency] by [metric]."*

Type or speak your 30-second version now. I will critique your structure, conviction, and evidence!`;

    return {
      id: `sahayak_${Date.now()}`,
      role: 'sahayak',
      content: interviewGuide,
      mode: 'defense',
      timestamp: Date.now(),
      pramanaTag: 'शब्द (Shabda)'
    };
  }

  // ── INTENT 6: User entered their actual reflection / defense ───────────────
  const hasPratyaksha = /data|metric|telemetry|user|interview|session|observed|saw|tested|click|analytics|log|dropoff/i.test(lower);
  const hasAnumana = /because|trade-off|tradeoff|therefore|friction|cognitive|mental|reason|downside|sacrifice|balance/i.test(lower);

  let pramana: 'प्रत्यक्ष (Pratyaksha)' | 'अनुमान (Anumana)' | 'उपमान (Upamana)' | 'शब्द (Shabda)' = 'अनुमान (Anumana)';
  let critique = '';
  let followUp = '';

  if (trimmed.length < 20) {
    pramana = 'प्रत्यक्ष (Pratyaksha)';
    critique = 'You touched on the thought, but to sharpen your defense, we need more flesh on the bone.';
    followUp = 'Which specific screen or workflow in your product are you thinking of? When a user makes an error there, what happens?';
  } else if (!hasPratyaksha && (mode === 'defense' || mode === 'counter')) {
    pramana = 'प्रत्यक्ष (Pratyaksha)';
    critique = 'Your conceptual reasoning is clear, but in an executive review, philosophy without empirical evidence sounds like personal taste.';
    followUp = 'What observable signal (a completion rate, error log, or recorded user hesitation) would prove to your team that this decision was correct?';
  } else if (!hasAnumana) {
    pramana = 'अनुमान (Anumana)';
    critique = 'You described what the screen does, but you skipped the dialectical tension—every design choice sacrifices something.';
    followUp = 'What did you deliberately give up (speed, density, visual simplicity, or engineering effort) to achieve this result?';
  } else if (hasPratyaksha && hasAnumana) {
    pramana = 'शब्द (Shabda)';
    critique = 'Excellent synthesis. You paired empirical awareness with logical trade-off analysis.';
    followUp = wisdom
      ? `Now close the loop with ${wisdom.source}: Does this design choice truly liberate the user from cognitive friction, or does it demand constant vigilance?`
      : 'What happens when an accessibility screen-reader user or keyboard-only operator attempts this exact flow?';
  } else {
    pramana = 'उपमान (Upamana)';
    critique = 'You have identified the core principle. Now let us test its durability under stress.';
    followUp = 'If your active user base multiplied tenfold tomorrow, where is the first seam where this mental model begins to tear?';
  }

  return {
    id: `sahayak_${Date.now()}`,
    role: 'sahayak',
    content: `${critique}\n\n${followUp}`,
    mode,
    timestamp: Date.now(),
    pramanaTag: pramana
  };
}
