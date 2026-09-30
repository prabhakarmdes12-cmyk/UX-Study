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
  'problem-framing': {
    bridge: 'The Upanishadic method of "Neti Neti" (Not this, not this) finds the absolute truth by negating what is false. When you scoped this design problem, what three tempting solutions did you explicitly reject to define the true problem boundary?',
    counter: 'Purva-Paksha challenge: You claim you framed the "real" user problem through qualitative research. But what if your interviewees suffered from social desirability bias? What contradictory signal in telemetry data did your problem frame ignore?',
    defense: '30-second framing defense: Frame the core problem of this project in two sentences without mentioning a single UI component, wireframe, or tool. Speak only of human friction and operational failure.'
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

  // Fallback for topics without explicit wisdom mirrors
  const model = topic?.mentalModel || 'this principle';
  const trap = topic?.commonTraps ? topic.commonTraps.split(' ~ ')[0] : 'over-complication';

  return {
    bridge: `Mental model inquiry: “${model}”. If you had to explain this to a non-designer founder using an everyday physical analogy, what metaphor makes the underlying human truth undeniable?`,
    counter: `Purva-Paksha trap analysis: The common vulnerability here is “${trap}”. Where in your current designs are you closest to falling into this exact trap?`,
    defense: `Senior design defense: You have 30 seconds with an engineering director. How do you prove that respecting “${topic?.title || 'this principle'}” reduces downstream tech debt and bug tickets?`
  };
}

/**
 * Intelligent, Socratic evaluation of the user's reflection / defense.
 * Checks for the presence of the 4 Pramanas (Direct perception, inference, metaphor, standard/constraint).
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

  // Heuristic analysis of the user's argument
  const hasPratyaksha = /data|metric|telemetry|user|interview|session|observed|saw|tested|click|analytics|log|dropoff/i.test(lower);
  const hasAnumana = /because|trade-off|tradeoff|therefore|friction|cognitive|mental|reason|downside|sacrifice|balance/i.test(lower);
  const hasUpamana = /like|similar|analog|mirror|verse|gita|ved|sutra|metaphor|compare|raga|alapana/i.test(lower);
  const hasShabda = /wcag|aaa|contrast|heuristic|norman|rams|standard|guideline|latency|sla|security|compliance/i.test(lower);

  // Assign primary Pramana used by user or needed by Sahayak
  let pramana: 'प्रत्यक्ष (Pratyaksha)' | 'अनुमान (Anumana)' | 'उपमान (Upamana)' | 'शब्द (Shabda)' = 'अनुमान (Anumana)';
  let critique = '';
  let followUp = '';

  if (trimmed.length < 25) {
    pramana = 'प्रत्यक्ष (Pratyaksha)';
    critique = 'You touched the surface, but a one-line assertion does not reveal the architectural trade-off.';
    followUp = 'Ground your thinking in a concrete screen: when an operator or user makes a mistake here, what exact element or feedback saves them?';
  } else if (!hasPratyaksha && (mode === 'defense' || mode === 'counter')) {
    pramana = 'प्रत्यक्ष (Pratyaksha)';
    critique = 'Your conceptual reasoning is sound, but in an executive review, philosophy without empirical evidence sounds like subjective taste.';
    followUp = 'What observable signal (a completion rate, error log, or recorded user hesitation) would prove to your team that this decision worked?';
  } else if (!hasAnumana) {
    pramana = 'अनुमान (Anumana)';
    critique = 'You described what the screen does, but you skipped the dialectical tension—every design choice sacrifices something.';
    followUp = 'What did you deliberately give up (speed, density, visual simplicity, or engineering effort) to achieve this result?';
  } else if (hasPratyaksha && hasAnumana) {
    pramana = 'शब्द (Shabda)';
    critique = 'Strong synthesis. You paired empirical awareness with logical trade-off analysis.';
    followUp = wisdom
      ? `Now close the loop with ${wisdom.source}: Does this design choice liberate the user from unnecessary friction, or does it demand constant cognitive vigilance?`
      : 'What happens when an accessibility screen-reader user or keyboard-only operator attempts this exact flow?';
  } else {
    pramana = 'उपमान (Upamana)';
    critique = 'You have identified the core principle, but let us test its durability under stress.';
    followUp = 'If your active user base multiplied tenfold tomorrow, where is the first seam where this mental model begins to tear?';
  }

  const content = `${critique}\n\n${followUp}`;

  return {
    id: `sahayak_${Date.now()}`,
    role: 'sahayak',
    content,
    mode,
    timestamp: Date.now(),
    pramanaTag: pramana
  };
}
