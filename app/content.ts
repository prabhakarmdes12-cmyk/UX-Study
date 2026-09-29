// Design Practice & Interview Studio Content
// Extended with Masterbook Tracks: Apple, Google, Atlassian, Product Critiques, Mock Loops


export interface Challenge {
  id: number;
  company: 'General' | 'Apple' | 'Google' | 'Atlassian';
  level: string;
  category: string;
  title: string;
  prompt: string;
  risk: string;
  notes: string;
}

export interface Critique {
  id: number;
  type: 'Product' | 'Interaction';
  target: string;
  title: string;
  scenario: string;
  focus: string;
}

export interface MockRound {
  name: string;
  minutes: number;
  focus: string;
}

export interface MockLoop {
  id: string;
  name: string;
  company: string;
  totalMinutes: number;
  rounds: MockRound[];
}


export const pilot=[
 {title:'Your story, in two minutes.',focus:'Find your starting point',speak:'Tell me about yourself. Connect your experience to the kind of product problems you want to solve next. Use one verified example.',recall:'Explain what makes a design decision different from a visual preference.',challenge:'Improve the first five minutes of a complex workplace tool for a new employee.',craft:'Pick one dashboard you know. Sketch its information hierarchy. What should the user notice first, and why?',story:'Choose a project. Separate what you personally decided from what the team did. List evidence you could show.',social:'Ask someone about a product they used today. Ask one follow-up, then share a related observation.',review:'Save your first take. Note one clear moment and one sentence you would simplify.'},
 {title:'Start with a better question.',focus:'Problem framing',speak:'Tell me about a time the requested feature was different from the underlying user need.',recall:'Explain the difference between a user request, a user problem, and a business outcome.',challenge:'A team asks you to add AI search to its help centre. Decide what you need to learn before designing.',craft:'Sketch two versions of a search empty state: no matching results and no permission to view results.',story:'Record the original request, your reframing, the evidence, and what changed. Label assumptions.',social:'Ask a colleague or friend what makes a recurring task difficult. Follow up on a concrete recent example.',review:'Did you ask about behaviour before proposing a solution? Repeat your opening in 30 seconds.'},
 {title:'Make a choice. Explain the cost.',focus:'Alternatives and trade-offs',speak:'Explain a decision where two reasonable approaches competed. Why did you choose one?',recall:'Name a case where a conventional pattern is right and a case where it is limiting.',challenge:'Design a way to reschedule ten appointments. Compare editing individually, bulk editing, and proposing an intent.',craft:'Sketch a dense table and a card layout for the same task. Compare scanning, comparison, and action.',story:'Write the alternative you rejected, its strongest advantage, and the cost your chosen approach accepted.',social:'Offer your opinion on a small decision and ask, “How do you see it?” Listen before responding.',review:'Listen for a real trade-off. If your alternative sounds obviously bad, make it more credible.'},
 {title:'Give the details a reason.',focus:'Interaction and visual craft',speak:'Critique an interface you use. Explain what it does well before prioritising one improvement.',recall:'Explain hierarchy, feedback, and recovery through one interaction.',challenge:'Redesign a settings workflow for someone using large text and a keyboard.',craft:'Create default, focus, loading, success, error, and recovery states for one important action.',story:'Choose a craft decision. Defend its hierarchy, spacing, content, and responsive behaviour.',social:'Show a peer one screen. Ask what they notice first and what they expect to happen next.',review:'Distinguish observed behaviour from your hypothesis. What would you need to validate?'},
 {title:'Design trust into the workflow.',focus:'AI and technical fluency',speak:'Explain where an AI assistant should suggest, where a person should approve, and where software must enforce rules.',recall:'Explain latency, permissions, and stale data without engineering jargon.',challenge:'An AI service-desk assistant recommends closing a ticket. Design review, approval, failure, and undo.',craft:'Sketch a streaming suggestion that cites its source and handles an unavailable source gracefully.',story:'Describe an AI or automation prototype honestly. Separate demonstrated behaviour from production readiness.',social:'Explain a technical idea to someone outside design. Ask them which part needs a clearer example.',review:'Did you explain why AI is useful and what happens when it is wrong? Retry with a concrete failure.'},
 {title:'Stay clear when challenged.',focus:'Influence and adaptation',speak:'Tell me about a disagreement. Explain what changed your mind or how the final decision was made.',recall:'Describe the difference between influence, decision ownership, and consensus.',challenge:'Your research contradicts the direction you presented yesterday. Plan the next conversation and experiment.',craft:'Explain one design to a peer. Ask them to interrupt twice with “why?” and “what evidence?”',story:'Write what the other person was optimising for, your contribution, and the outcome you can substantiate.',social:'Arrange a ten-minute critique or mock interview. Practise acknowledging a challenge before answering.',review:'Find a moment where you became defensive or vague. Record a calmer, more specific response.'},
 {title:'Meet your first-week self.',focus:'Review and repeat',speak:'Repeat your day-one introduction using the same two-minute limit. Keep both recordings.',recall:'Without notes, explain problem, evidence, options, decision, trade-off, and outcome.',challenge:'Repeat the workplace onboarding problem from day one. Now assume intermittent connectivity.',craft:'Compare your first and latest sketches. Identify one improvement in hierarchy and one unresolved state.',story:'Tell your strongest story, then answer: What did you personally do? What can you not claim?',social:'Ask a trusted person to compare your two introductions for clarity and specificity.',review:'Choose one strength to keep and one skill to practise next week. Compare evidence, not just confidence.'}
];
export const phases=[
 {name:'Foundations',start:1,end:15,topics:['Baseline and career narrative','Problem framing','Alternatives and trade-offs','Interaction and visual critique','AI trust and system boundaries','Influence and interruption','First weekly review','Research method selection','Jobs and mental models','Journey mapping and service blueprints','Information architecture','Navigation and search','Forms and validation','Accessibility and inclusion','Metrics and experimentation']},
 {name:'Craft and design systems',start:16,end:25,topics:['Hierarchy and density','Typography and layout','Colour and visual semantics','Motion and feedback','Responsive and cross-device behaviour','Component states and APIs','Tokens and themes','Governance and contribution','Design QA and implementation parity','Craft critique and peer review']},
 {name:'Product judgment',start:26,end:35,topics:['Prioritisation under constraints','Consumer product challenge','Enterprise workflow challenge','Search and discovery challenge','Mobile and offline challenge','Public-service challenge','Commerce and conversion','Collaboration and permissions','Reframing conventional solutions','Product design mock']},
 {name:'AI and technical fluency',start:36,end:42,topics:['Probabilistic and deterministic behaviour','Inputs, context, and grounding','Human approval and authority','Latency, streaming, and cancellation','Memory, privacy, and permissions','Evaluation and failure recovery','AI collaboration mock']},
 {name:'Portfolio and leadership',start:43,end:49,topics:['Portfolio evidence audit','Case-study narrative','Five whys of design defence','Conflict and influence','Mentoring and quality standards','Failure and learning','Portfolio mock and peer feedback']},
 {name:'Apple practice lens',start:50,end:54,topics:['Native patterns and restraint','Touch, pointer, and keyboard','Dynamic Type and accessibility','Continuity and cross-device state','Apple craft mock']},
 {name:'Google and Atlassian lenses',start:55,end:58,topics:['Scale and multilingual discovery','Evidence, metrics, and experiments','Enterprise roles and service management','AI service-desk mock']},
 {name:'Interview rehearsal',start:59,end:60,topics:['Full interview rehearsal','Repeat baseline and plan next steps']}
];
export const roadmap=phases.flatMap(p=>p.topics.map((topic,i)=>({day:p.start+i,topic,phase:p.name})));
export const interruptions=['What evidence supports that?','What did you personally decide?','Why not a simpler approach?','Engineering says this takes 18 months. What changes?','Research contradicts your assumption. How do you respond?','Now assume unreliable connectivity.','Remove AI entirely. What still works?','The completion metric improved but retention dropped.','What happens with a screen reader?','Show me another approach.','What would make you change your mind?','What did you deliberately remove?'];
export const behaviors=['Tell me about yourself.','Why this role and company?','What makes your contribution senior?','Describe a decision made with incomplete evidence.','Tell me about a disagreement with a PM.','Tell me about a disagreement with engineering.','When did research change your direction?','Describe a project that failed.','Tell me about a scope cut you made.','When did you influence without authority?','How did you raise the quality bar?','Describe a time you mentored a designer.','How did you handle a missed deadline?','Tell me about a difficult stakeholder.','Describe a decision with no access to users.','When did you prioritise accessibility?','Describe a design-system contribution.','When did you challenge a roadmap priority?','What did you learn after release?','Describe a metric that was misleading.','Tell me about a time you changed your mind.','When did you choose a familiar pattern?','When did you break a convention?','How did you resolve competing user needs?','Tell me about a critique you found difficult.','Describe a technical constraint that improved your design.','When did you delegate meaningful ownership?','Tell me about an AI failure you designed for.','What would you change in your portfolio today?','What can you not claim about your strongest project?'];

export const challenges: Challenge[] = [
  {
    "id": 1,
    "company": "General",
    "level": "Warm-up",
    "category": "Consumer",
    "title": "Make multiple alarms easier to manage",
    "prompt": "Design for someone whose wake-up schedule changes each week.",
    "risk": "Recurring rules can become hard to predict.",
    "notes": "Compare individual alarms, a weekly schedule, and an intent-based setup. Keep overrides visible."
  },
  {
    "id": 2,
    "company": "General",
    "level": "Warm-up",
    "category": "Craft",
    "title": "Recover a failed payment",
    "prompt": "A customer is unsure whether their payment succeeded.",
    "risk": "A retry may create a duplicate transaction.",
    "notes": "Separate pending, confirmed, and failed states. Preserve the order and explain the safe next step."
  },
  {
    "id": 3,
    "company": "General",
    "level": "Warm-up",
    "category": "Search",
    "title": "Improve a no-results page",
    "prompt": "Help a shopper recover when a search returns nothing.",
    "risk": "Irrelevant recommendations can conceal the actual failure.",
    "notes": "Offer query correction and useful ways to broaden scope without claiming results are exact."
  },
  {
    "id": 4,
    "company": "General",
    "level": "Warm-up",
    "category": "Enterprise",
    "title": "Invite a teammate",
    "prompt": "Make inviting a colleague to a workspace clear and safe.",
    "risk": "An invitation can grant unintended permissions.",
    "notes": "Make role, workspace, and pending status understandable. Include revoke and resend."
  },
  {
    "id": 5,
    "company": "General",
    "level": "Warm-up",
    "category": "Craft",
    "title": "Explain an empty dashboard",
    "prompt": "Design the first visit before a product has any data.",
    "risk": "Sample data can look real.",
    "notes": "Explain the next useful action and label any examples. Distinguish empty from failed loading."
  },
  {
    "id": 6,
    "company": "General",
    "level": "Warm-up",
    "category": "Consumer",
    "title": "Save a useful place",
    "prompt": "Help a traveller save somewhere they want to visit later.",
    "risk": "Private and shared collections have different expectations.",
    "notes": "Make saving quick, retrieval easy, and sharing deliberate."
  },
  {
    "id": 7,
    "company": "General",
    "level": "Warm-up",
    "category": "Accessibility",
    "title": "Improve a long form",
    "prompt": "Help a person complete a service form on a small screen.",
    "risk": "Errors and session expiry can destroy progress.",
    "notes": "Group meaningful steps, preserve drafts, and provide explicit labels and recovery."
  },
  {
    "id": 8,
    "company": "General",
    "level": "Warm-up",
    "category": "Craft",
    "title": "Make a loading state useful",
    "prompt": "A report takes 30 seconds to prepare. Design the waiting experience.",
    "risk": "A fake progress percentage damages confidence.",
    "notes": "Show honest state, allow leaving when feasible, and support retry or cancellation."
  },
  {
    "id": 9,
    "company": "General",
    "level": "Warm-up",
    "category": "Consumer",
    "title": "Reschedule an appointment",
    "prompt": "A person needs to move a booking without losing it.",
    "risk": "The replacement slot may disappear during confirmation.",
    "notes": "Keep the old booking until a new one is confirmed. Explain conflicts and notifications."
  },
  {
    "id": 10,
    "company": "General",
    "level": "Warm-up",
    "category": "Accessibility",
    "title": "Design notification controls",
    "prompt": "Help someone reduce interruptions without missing urgent events.",
    "risk": "Too many categories make control unmanageable.",
    "notes": "Use understandable groupings, sensible defaults, and an easy way to reverse changes."
  },
  {
    "id": 11,
    "company": "General",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Onboard a new employee",
    "prompt": "Improve the first five minutes of a complex workplace tool.",
    "risk": "Different roles need different starting points.",
    "notes": "Prioritise the first meaningful task. Compare guided setup, contextual help, and role-based defaults."
  },
  {
    "id": 12,
    "company": "General",
    "level": "Senior",
    "category": "AI",
    "title": "Review an AI ticket resolution",
    "prompt": "Design a service-desk assistant that recommends closing a ticket.",
    "risk": "The recommendation may be unsupported or exceed the agent’s authority.",
    "notes": "Ground the suggestion, show relevant evidence, require appropriate approval, and enforce permissions independently."
  },
  {
    "id": 13,
    "company": "General",
    "level": "Senior",
    "category": "Search",
    "title": "Find one file among 50,000",
    "prompt": "Design discovery for a user who only remembers the purpose of a file.",
    "risk": "Permissions, duplicates, and stale versions complicate results.",
    "notes": "Compare metadata search, intent search, and contextual recents. Make scope and version clear."
  },
  {
    "id": 14,
    "company": "General",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Bulk-edit 100 records",
    "prompt": "Help an operator update many records with different constraints.",
    "risk": "Partial success and unintended selection can be costly.",
    "notes": "Preview scope and changes, surface exceptions, and support recovery with an audit trail."
  },
  {
    "id": 15,
    "company": "General",
    "level": "Senior",
    "category": "Accessibility",
    "title": "Navigate with large text",
    "prompt": "Improve a complex settings task for a person using large text.",
    "risk": "Truncation can hide the distinction between choices.",
    "notes": "Preserve meaning and reading order as content reflows. Test the complete task."
  },
  {
    "id": 16,
    "company": "General",
    "level": "Senior",
    "category": "Consumer",
    "title": "Plan a trip together",
    "prompt": "Design collaborative travel planning for people with different budgets.",
    "risk": "People may disagree about who can change confirmed plans.",
    "notes": "Separate suggestions from commitments and clarify ownership, cost, and conflict resolution."
  },
  {
    "id": 17,
    "company": "General",
    "level": "Senior",
    "category": "AI",
    "title": "Add useful AI to email",
    "prompt": "Help someone act on a crowded inbox without losing trust.",
    "risk": "A generated summary may omit a consequential detail.",
    "notes": "Start with a specific job. Show source messages, editable suggestions, and clear send authority."
  },
  {
    "id": 18,
    "company": "General",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Build an approval workflow",
    "prompt": "Let an administrator configure a multi-step approval process.",
    "risk": "A configuration can deadlock or silently bypass a reviewer.",
    "notes": "Preview outcomes with sample cases, validate rules, and provide versioned changes."
  },
  {
    "id": 19,
    "company": "General",
    "level": "Senior",
    "category": "Consumer",
    "title": "Support intermittent video access",
    "prompt": "Help a learner continue lessons with unreliable connectivity.",
    "risk": "Downloads consume storage and become outdated.",
    "notes": "Clarify offline availability, sync progress, and resolve conflicts."
  },
  {
    "id": 20,
    "company": "General",
    "level": "Senior",
    "category": "Search",
    "title": "Find a government service",
    "prompt": "Help someone discover eligibility without knowing official terminology.",
    "risk": "Wrong eligibility guidance can waste time or exclude people.",
    "notes": "Use plain-language questions, authoritative sources, and clear uncertainty and assistance paths."
  },
  {
    "id": 21,
    "company": "General",
    "level": "Senior",
    "category": "Craft",
    "title": "Make a usable interface excellent",
    "prompt": "A task works but feels inconsistent and laborious. Improve it.",
    "risk": "Visual novelty can add friction without improving the task.",
    "notes": "Inspect hierarchy, rhythm, content, feedback, and state transitions. Prioritise one coherent improvement."
  },
  {
    "id": 22,
    "company": "General",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Resolve a permissions conflict",
    "prompt": "A user can see a record but cannot perform a needed action.",
    "risk": "Revealing restricted information or request recipients may be inappropriate.",
    "notes": "Explain the restriction at an appropriate level and offer an authorised recovery path."
  },
  {
    "id": 23,
    "company": "General",
    "level": "Senior",
    "category": "AI",
    "title": "Design a research assistant",
    "prompt": "Help a researcher synthesise documents and inspect supporting evidence.",
    "risk": "Citations may not support the generated claim.",
    "notes": "Keep evidence inspectable, distinguish synthesis from quotation, and support correction."
  },
  {
    "id": 24,
    "company": "General",
    "level": "Senior",
    "category": "Consumer",
    "title": "Improve checkout completion",
    "prompt": "Completion is low, but the reason is unknown. Frame the investigation.",
    "risk": "Removing useful information may inflate completion while increasing returns.",
    "notes": "Segment abandonment, investigate friction, and define guardrails before choosing a design."
  },
  {
    "id": 25,
    "company": "General",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Improve a design-system contribution",
    "prompt": "Teams repeatedly create near-identical components. Design the contribution experience.",
    "risk": "Governance can become a bottleneck.",
    "notes": "Define reuse criteria, review ownership, documentation, and a lightweight exception path."
  },
  {
    "id": 26,
    "company": "General",
    "level": "Stretch",
    "category": "Search",
    "title": "Search across languages",
    "prompt": "Design search for multilingual India, including mixed-script queries.",
    "risk": "Language and literacy preferences vary by task.",
    "notes": "Investigate real query behaviour, support correction, and evaluate relevance by language and context."
  },
  {
    "id": 27,
    "company": "General",
    "level": "Stretch",
    "category": "AI",
    "title": "Prevent expensive AI mistakes",
    "prompt": "Design assistance where a wrong recommendation has a serious cost.",
    "risk": "A confidence indicator may be mistaken for a guarantee.",
    "notes": "Define prohibited actions, evidence requirements, independent validation, escalation, and evaluation before automation."
  },
  {
    "id": 28,
    "company": "General",
    "level": "Stretch",
    "category": "Enterprise",
    "title": "Coordinate an incident",
    "prompt": "Design collaboration when multiple teams respond to a service outage.",
    "risk": "Updates are incomplete and ownership changes under pressure.",
    "notes": "Prioritise shared state, roles, timestamps, acknowledgements, and an auditable timeline."
  },
  {
    "id": 29,
    "company": "General",
    "level": "Stretch",
    "category": "Consumer",
    "title": "Handoff between devices",
    "prompt": "Move a task from a phone to a desktop without confusion.",
    "risk": "The devices may disagree about the latest state.",
    "notes": "Define the handoff boundary, identity, progress, conflict handling, and fallback."
  },
  {
    "id": 30,
    "company": "General",
    "level": "Stretch",
    "category": "Accessibility",
    "title": "Use a watch in five seconds",
    "prompt": "Design a useful on-the-go interaction with very little attention.",
    "risk": "Precision, distraction, and accidental actions matter.",
    "notes": "Reduce the task to an essential decision and use appropriate feedback and recovery."
  },
  {
    "id": 31,
    "company": "General",
    "level": "Stretch",
    "category": "AI",
    "title": "Approve every agent action",
    "prompt": "Design an agent workflow where people must approve each external action.",
    "risk": "Approval fatigue can turn review into automatic clicking.",
    "notes": "Make proposed changes legible, batch only where safe, and preserve the ability to edit or reject."
  },
  {
    "id": 32,
    "company": "General",
    "level": "Stretch",
    "category": "Consumer",
    "title": "Design for a billion users",
    "prompt": "Scale a successful local product across regions and device capabilities.",
    "risk": "One global average can hide serious failures in particular groups.",
    "notes": "Choose segments and constraints, then evaluate access, localisation, performance, support, and governance."
  },
  {
    "id": 33,
    "company": "General",
    "level": "Stretch",
    "category": "Enterprise",
    "title": "Migrate a familiar workflow",
    "prompt": "Replace a legacy tool used by experts without destroying their efficiency.",
    "risk": "A simpler first impression may hide more work for frequent users.",
    "notes": "Observe expert shortcuts, compare migration strategies, and measure task quality during transition."
  },
  {
    "id": 34,
    "company": "General",
    "level": "Stretch",
    "category": "AI",
    "title": "Design memory users can control",
    "prompt": "Make an assistant’s remembered context understandable and correctable.",
    "risk": "An old memory can be wrong, sensitive, or applied in the wrong context.",
    "notes": "Show what is remembered and why, with scope, editing, forgetting, and clear effects."
  },
  {
    "id": 35,
    "company": "General",
    "level": "Stretch",
    "category": "Accessibility",
    "title": "Design for first-time smartphone users",
    "prompt": "Help someone complete a necessary service task independently.",
    "risk": "Icon familiarity, literacy, and connectivity cannot be assumed.",
    "notes": "Study context, reduce hidden interactions, support assistance, and test comprehension."
  },
  {
    "id": 36,
    "company": "General",
    "level": "Stretch",
    "category": "Search",
    "title": "Improve discovery with no terminology",
    "prompt": "Help a person search for a concept they cannot name.",
    "risk": "Suggestions can prematurely narrow their intent.",
    "notes": "Compare examples, guided clarification, and exploratory browsing. Preserve recovery from a wrong interpretation."
  },
  {
    "id": 37,
    "company": "General",
    "level": "Stretch",
    "category": "Enterprise",
    "title": "Remove a workflow entirely",
    "prompt": "Operators reconcile data between two systems every morning. Reframe the work.",
    "risk": "Automation may move invisible errors downstream.",
    "notes": "Compare better manual tools, exception-led review, and eliminating duplicate data entry at the source."
  },
  {
    "id": 38,
    "company": "General",
    "level": "Stretch",
    "category": "Consumer",
    "title": "Explain a misleading success metric",
    "prompt": "A new feature improves conversion but reduces repeat use. What do you do?",
    "risk": "Cohort changes and short-term effects may be confounded.",
    "notes": "Inspect cohorts and guardrails, research the changed experience, and design an experiment that tests the mechanism."
  },
  {
    "id": 39,
    "company": "General",
    "level": "Stretch",
    "category": "AI",
    "title": "Remove AI from your concept",
    "prompt": "A model is too slow and expensive. Preserve the user value without it.",
    "risk": "The team may be attached to the proposed technology.",
    "notes": "Identify the essential job and compare structured inputs, rules, defaults, search, and human assistance."
  },
  {
    "id": 40,
    "company": "General",
    "level": "Stretch",
    "category": "Accessibility",
    "title": "Design a cross-device public service",
    "prompt": "Someone begins on a shared phone and completes a service at a kiosk.",
    "risk": "Identity, privacy, unfinished progress, and assisted use intersect.",
    "notes": "Map handoff and consent, minimise exposed information, preserve progress safely, and design failure recovery."
  },
  {
    "id": 41,
    "company": "Apple",
    "level": "Senior",
    "category": "Craft",
    "title": "Apple: Alarm overload",
    "prompt": "Redesign Alarm for a person who has accumulated 15 alarms.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 42,
    "company": "Apple",
    "level": "Senior",
    "category": "Search",
    "title": "Apple: AirDrop discovery",
    "prompt": "Improve discovery and confidence when sending to nearby people.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 43,
    "company": "Apple",
    "level": "Senior",
    "category": "Craft",
    "title": "Apple: iPhone → Mac continuity",
    "prompt": "Design a task that begins on iPhone and continues on Mac.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 44,
    "company": "Apple",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Apple: Settings complexity",
    "prompt": "Simplify a deeply nested Settings workflow.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 45,
    "company": "Apple",
    "level": "Senior",
    "category": "Craft",
    "title": "Apple: Five-second Watch task",
    "prompt": "Design an Apple Watch interaction usable in five seconds.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 46,
    "company": "Apple",
    "level": "Senior",
    "category": "Accessibility",
    "title": "Apple: Dynamic Type",
    "prompt": "Design a dense scheduling UI that survives very large text.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 47,
    "company": "Apple",
    "level": "Senior",
    "category": "Craft",
    "title": "Apple: iPhone + Watch",
    "prompt": "Design medication reminders across phone and watch.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 48,
    "company": "Apple",
    "level": "Senior",
    "category": "Consumer",
    "title": "Apple: Offline travel",
    "prompt": "Design a travel confirmation experience with no network.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 49,
    "company": "Apple",
    "level": "Senior",
    "category": "AI",
    "title": "Apple: Privacy permission",
    "prompt": "Design a permission request that explains value without coercion.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 50,
    "company": "Apple",
    "level": "Senior",
    "category": "Search",
    "title": "Apple: Photo organization",
    "prompt": "Help people find an old photo without remembering date/location.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 51,
    "company": "Apple",
    "level": "Senior",
    "category": "Craft",
    "title": "Apple: Share sheet",
    "prompt": "Improve an overloaded sharing experience.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 52,
    "company": "Apple",
    "level": "Senior",
    "category": "Craft",
    "title": "Apple: Focus mode",
    "prompt": "Make a complex Focus configuration understandable.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 53,
    "company": "Apple",
    "level": "Stretch",
    "category": "Consumer",
    "title": "Apple: Family setup",
    "prompt": "Design setup for a family member who does not own an iPhone.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 54,
    "company": "Apple",
    "level": "Stretch",
    "category": "AI",
    "title": "Apple: Siri confirmation",
    "prompt": "Design a voice-first action that requires safe confirmation.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 55,
    "company": "Apple",
    "level": "Stretch",
    "category": "Craft",
    "title": "Apple: Widget",
    "prompt": "Design a glanceable widget with one high-value action.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 56,
    "company": "Apple",
    "level": "Stretch",
    "category": "Craft",
    "title": "Apple: Live Activity",
    "prompt": "Design progress tracking without encouraging constant attention.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 57,
    "company": "Apple",
    "level": "Stretch",
    "category": "Craft",
    "title": "Apple: iPad multitasking",
    "prompt": "Adapt a productivity flow across window sizes.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 58,
    "company": "Apple",
    "level": "Stretch",
    "category": "Enterprise",
    "title": "Apple: Mac keyboard power",
    "prompt": "Design a workflow efficient for keyboard-heavy expert users.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 59,
    "company": "Apple",
    "level": "Stretch",
    "category": "Craft",
    "title": "Apple: visionOS concept",
    "prompt": "Design a spatial review experience without unnecessary 3D spectacle.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 60,
    "company": "Apple",
    "level": "Stretch",
    "category": "Accessibility",
    "title": "Apple: Accessibility",
    "prompt": "Redesign a gesture-dependent interaction for broader access.",
    "risk": "Over-customization; Loss of agency; Accessibility failure; Cross-device inconsistency",
    "notes": "Focus: Human need, restraint, platform awareness, interaction detail and craft.\n\nClarifying questions: Who is the person and context?, What is essential?, What device/input constraints matter?\n\nExpected interruptions: Remove one step.; Now support VoiceOver.; Now make it work on another Apple device.; Why not use a system pattern?"
  },
  {
    "id": 61,
    "company": "Google",
    "level": "Senior",
    "category": "Search",
    "title": "Google: Unknown terminology search",
    "prompt": "Design Search for someone who does not know the correct terminology.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 62,
    "company": "Google",
    "level": "Senior",
    "category": "Search",
    "title": "Google: Drive at scale",
    "prompt": "Improve Google Drive discovery for a user with 50,000 files.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 63,
    "company": "Google",
    "level": "Senior",
    "category": "Consumer",
    "title": "Google: YouTube intermittent internet",
    "prompt": "Design YouTube for unreliable connectivity.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 64,
    "company": "Google",
    "level": "Senior",
    "category": "Accessibility",
    "title": "Google: Maps for elderly novice",
    "prompt": "Design Maps for an elderly first-time smartphone user.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 65,
    "company": "Google",
    "level": "Senior",
    "category": "AI",
    "title": "Google: Gmail AI trust",
    "prompt": "Design Gmail AI without destroying trust.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 66,
    "company": "Google",
    "level": "Senior",
    "category": "Search",
    "title": "Google: Collaborative travel",
    "prompt": "Design planning across Search, Maps and Calendar.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 67,
    "company": "Google",
    "level": "Senior",
    "category": "Search",
    "title": "Google: One billion users",
    "prompt": "Design a public information product for one billion users.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 68,
    "company": "Google",
    "level": "Senior",
    "category": "AI",
    "title": "Google: Low-end Android",
    "prompt": "Design a media product for low-memory, low-bandwidth devices.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 69,
    "company": "Google",
    "level": "Senior",
    "category": "Search",
    "title": "Google: Multilingual India",
    "prompt": "Design discovery across multiple Indian languages.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 70,
    "company": "Google",
    "level": "Senior",
    "category": "Search",
    "title": "Google: AI search",
    "prompt": "Design a search experience that combines generated answers and sources.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 71,
    "company": "Google",
    "level": "Senior",
    "category": "Consumer",
    "title": "Google: Family safety",
    "prompt": "Design location sharing for families with privacy controls.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 72,
    "company": "Google",
    "level": "Senior",
    "category": "Search",
    "title": "Google: Education",
    "prompt": "Design homework support without simply giving answers.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 73,
    "company": "Google",
    "level": "Senior",
    "category": "AI",
    "title": "Google: Payments",
    "prompt": "Reduce payment failure anxiety.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 74,
    "company": "Google",
    "level": "Senior",
    "category": "Consumer",
    "title": "Google: Photos",
    "prompt": "Help users clean up duplicated/low-value photos safely.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 75,
    "company": "Google",
    "level": "Senior",
    "category": "Search",
    "title": "Google: Calendar",
    "prompt": "Help people find a meeting time across time zones.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 76,
    "company": "Google",
    "level": "Stretch",
    "category": "Accessibility",
    "title": "Google: Maps accessibility",
    "prompt": "Design pedestrian navigation for low-vision users.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 77,
    "company": "Google",
    "level": "Stretch",
    "category": "Consumer",
    "title": "Google: YouTube creators",
    "prompt": "Help creators understand why a video underperformed.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 78,
    "company": "Google",
    "level": "Stretch",
    "category": "Enterprise",
    "title": "Google: Workspace permissions",
    "prompt": "Make sharing permissions understandable at scale.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 79,
    "company": "Google",
    "level": "Stretch",
    "category": "Search",
    "title": "Google: Search misinformation",
    "prompt": "Help users evaluate conflicting information.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 80,
    "company": "Google",
    "level": "Stretch",
    "category": "Search",
    "title": "Google: Android onboarding",
    "prompt": "Design setup for first-time smartphone owners.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 81,
    "company": "Google",
    "level": "Stretch",
    "category": "Search",
    "title": "Google: Notifications",
    "prompt": "Reduce notification overload across a product ecosystem.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 82,
    "company": "Google",
    "level": "Stretch",
    "category": "Search",
    "title": "Google: Account recovery",
    "prompt": "Design secure recovery when the user lost their phone.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 83,
    "company": "Google",
    "level": "Stretch",
    "category": "AI",
    "title": "Google: AI memory",
    "prompt": "Let users understand and control what an assistant remembers.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 84,
    "company": "Google",
    "level": "Stretch",
    "category": "Search",
    "title": "Google: Cross-device task",
    "prompt": "Continue a task from Android phone to desktop web.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 85,
    "company": "Google",
    "level": "Stretch",
    "category": "Search",
    "title": "Google: Search zero results",
    "prompt": "Design recovery when no exact result exists.",
    "risk": "Scale; Internationalization; Accessibility; Abuse/privacy; Metric gaming",
    "notes": "Focus: Framing, scale, prioritization, systems thinking, evidence and metrics.\n\nClarifying questions: What population/context?, What does success mean?, What constraints are fixed?\n\nExpected interruptions: Now assume one billion users.; Engineering says 18 months.; Research contradicts you.; Connectivity is unreliable.; The metric improves but retention drops.; Remove AI entirely."
  },
  {
    "id": 86,
    "company": "Atlassian",
    "level": "Senior",
    "category": "AI",
    "title": "Atlassian: JSM AI agent assist",
    "prompt": "Design AI that helps an agent resolve tickets without unsafe autonomous actions.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 87,
    "company": "Atlassian",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Atlassian: Workflow builder",
    "prompt": "Design a workflow builder for novice admins and expert admins.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 88,
    "company": "Atlassian",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Atlassian: Permission debugging",
    "prompt": "Help an admin understand why a user cannot access an issue.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 89,
    "company": "Atlassian",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Atlassian: Automation rules",
    "prompt": "Design creation and troubleshooting of automation rules.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 90,
    "company": "Atlassian",
    "level": "Senior",
    "category": "Search",
    "title": "Atlassian: Search across work",
    "prompt": "Design search across projects, tickets, docs and people.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 91,
    "company": "Atlassian",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Atlassian: Incident response",
    "prompt": "Design a high-pressure incident coordination workspace.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 92,
    "company": "Atlassian",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Atlassian: Bulk operations",
    "prompt": "Design safe bulk editing of thousands of records.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 93,
    "company": "Atlassian",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Atlassian: Admin configuration",
    "prompt": "Reduce configuration complexity without hiding power.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 94,
    "company": "Atlassian",
    "level": "Senior",
    "category": "AI",
    "title": "Atlassian: AI summarization",
    "prompt": "Summarize a long issue while preserving traceability.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  },
  {
    "id": 95,
    "company": "Atlassian",
    "level": "Senior",
    "category": "Enterprise",
    "title": "Atlassian: Cross-product navigation",
    "prompt": "Design navigation across a suite of enterprise products.",
    "risk": "Permission leakage; Bulk destructive action; Hidden state; AI overreach; Auditability",
    "notes": "Focus: Roles, permissions, expert/novice balance, systems thinking and operational safety.\n\nClarifying questions: Who configures vs who uses?, What is reversible?, What data is authoritative?\n\nExpected interruptions: Now add an admin policy.; Now the user lacks permission.; Now 10,000 items are selected.; Now AI is unavailable."
  }
];

export const critiques: Critique[] = [
  {
    "id": 1,
    "type": "Product",
    "target": "Google",
    "title": "Google Search",
    "scenario": "Search results with high AI Overviews density, sponsored links, and fluctuating user trust.",
    "focus": "Information hierarchy, trust signals, and query recovery."
  },
  {
    "id": 2,
    "type": "Product",
    "target": "Google",
    "title": "Google Maps",
    "scenario": "Dense map view balancing discovery, business ads, real-time routing, and local recommendations.",
    "focus": "Cognitive load, glanceability while navigating, and modal transitions."
  },
  {
    "id": 3,
    "type": "Product",
    "target": "Google",
    "title": "Gmail",
    "scenario": "Crowded inbox with promotional tabs, integrated Meet/Chat shortcuts, and AI Smart Reply/Drafting.",
    "focus": "Triage speed, sender authenticity, and undo/send safety."
  },
  {
    "id": 4,
    "type": "Product",
    "target": "Google",
    "title": "YouTube",
    "scenario": "Video viewing experience balancing creator community, algorithmic recommendations, and Shorts distraction.",
    "focus": "Content discovery vs. consumption depth and comment accessibility."
  },
  {
    "id": 5,
    "type": "Product",
    "target": "Apple",
    "title": "Apple Settings",
    "scenario": "Deeply nested iOS settings hierarchy with over 60 root categories and inconsistent search discovery.",
    "focus": "Mental model alignment, search vs. browsing, and destructive resets."
  },
  {
    "id": 6,
    "type": "Product",
    "target": "Apple",
    "title": "Apple Maps",
    "scenario": "Flyover, detailed city experience, and transit curation competing against muscle memory of competitors.",
    "focus": "Visual elegance vs. functional density and search accuracy."
  },
  {
    "id": 7,
    "type": "Product",
    "target": "Apple",
    "title": "App Store",
    "scenario": "Discovery-first editorial editorial cards vs. transactional app search and subscription management.",
    "focus": "Monetization transparency, editorial trust, and update review flows."
  },
  {
    "id": 8,
    "type": "Product",
    "target": "Consumer",
    "title": "Spotify",
    "scenario": "Algorithmic home screen with endless carousels, podcast integration, and library management friction.",
    "focus": "Personal intent vs. algorithmic promotion and playback controls."
  },
  {
    "id": 9,
    "type": "Product",
    "target": "Consumer",
    "title": "Amazon",
    "scenario": "Hyper-dense e-commerce interface with sponsored placements, price variations, and review skepticism.",
    "focus": "Information architecture, decision confidence, and return friction."
  },
  {
    "id": 10,
    "type": "Product",
    "target": "Consumer",
    "title": "WhatsApp",
    "scenario": "High-utility chat interface adding Communities, Channels, and Status updates.",
    "focus": "Communication clarity vs. social broadcasting and privacy indicators."
  },
  {
    "id": 11,
    "type": "Product",
    "target": "Atlassian",
    "title": "Jira",
    "scenario": "Customizable issue tracking with complex field configurations, board views, and cross-team workflows.",
    "focus": "Information density, status progression, and onboarding novice users."
  },
  {
    "id": 12,
    "type": "Product",
    "target": "Enterprise",
    "title": "Slack",
    "scenario": "Channel sprawl, unread overload, thread fragmentation, and AI summary integration.",
    "focus": "Attention management, asynchronous clarity, and notification boundaries."
  },
  {
    "id": 13,
    "type": "Product",
    "target": "Productivity",
    "title": "Notion",
    "scenario": "Blank-canvas modular workspace with databases, nested docs, and AI writer prompts.",
    "focus": "Steep learning curve, mobile responsiveness, and template overload."
  },
  {
    "id": 14,
    "type": "Product",
    "target": "Public Sector",
    "title": "Government Service Portal",
    "scenario": "Citizen portal for license renewals or subsidy applications across disconnected departments.",
    "focus": "Plain-language guidance, accessibility compliance, and progress preservation."
  },
  {
    "id": 15,
    "type": "Product",
    "target": "AI",
    "title": "AI Productivity Assistant",
    "scenario": "Conversational agent that suggests actions, drafts content, and automates multi-step workflows.",
    "focus": "Hallucination defense, execution authority, and provenance inspection."
  },
  {
    "id": 16,
    "type": "Interaction",
    "target": "Search",
    "title": "Search Results Overload",
    "scenario": "A search page has excellent visual polish but 35% query reformulation rate.",
    "focus": "Snippet relevance, filter visibility, and empty-state recovery."
  },
  {
    "id": 17,
    "type": "Interaction",
    "target": "Enterprise",
    "title": "Enterprise Dashboard KPI Sprawl",
    "scenario": "A dashboard shows 18 KPI cards above the fold with no clear primary action.",
    "focus": "Visual hierarchy, progressive disclosure, and executive vs. operator views."
  },
  {
    "id": 18,
    "type": "Interaction",
    "target": "Commerce",
    "title": "Mobile Checkout Drop-off",
    "scenario": "Checkout completion is high on desktop but drops 40% on mobile devices.",
    "focus": "Form fatigue, auto-fill, payment method friction, and keyboard layouts."
  },
  {
    "id": 19,
    "type": "Interaction",
    "target": "Systems",
    "title": "Alphabetical Settings Clutter",
    "scenario": "A settings screen contains 70 toggles organized alphabetically rather than by user intent.",
    "focus": "Categorization, search discovery, and contextual presets."
  },
  {
    "id": 20,
    "type": "Interaction",
    "target": "AI",
    "title": "Unverified AI Copilot",
    "scenario": "An AI assistant gives fluent answers, but users repeatedly verify them in external tabs.",
    "focus": "Source citation, confidence transparency, and inline verification."
  },
  {
    "id": 21,
    "type": "Interaction",
    "target": "Craft",
    "title": "Illustration Without Next Step",
    "scenario": "A new empty workspace displays a friendly graphic but no obvious first action.",
    "focus": "Actionable empty states, template starters, and immediate time-to-value."
  },
  {
    "id": 22,
    "type": "Interaction",
    "target": "Forms",
    "title": "Submit-Only Validation",
    "scenario": "A 22-field application form validates only after hitting the final Submit button.",
    "focus": "Inline validation, field grouping, multi-step progress, and error recovery."
  },
  {
    "id": 23,
    "type": "Interaction",
    "target": "Consumer",
    "title": "Notification Opt-Out Cliff",
    "scenario": "Users mass-disable all notifications because alert volume is unmanaged.",
    "focus": "Granular categories, quiet hours, digest summaries, and contextual frequency."
  },
  {
    "id": 24,
    "type": "Interaction",
    "target": "Enterprise",
    "title": "Multi-Sidebar Navigation Maze",
    "scenario": "A B2B SaaS platform has seven top-level modules and three persistent sidebars.",
    "focus": "Wayfinding, role-based menus, breadcrumbs, and workspace scoping."
  },
  {
    "id": 25,
    "type": "Interaction",
    "target": "Mobile",
    "title": "Horizontal Scroll Enterprise Table",
    "scenario": "A dense 14-column desktop table is placed on mobile with plain horizontal scroll.",
    "focus": "Card transformation, key attribute pinning, and drill-down views."
  },
  {
    "id": 26,
    "type": "Interaction",
    "target": "Systems",
    "title": "Generic Error Toast",
    "scenario": "A failed transaction displays \"Something went wrong. Please try again later.\"",
    "focus": "Cause explanation, state preservation, actionable retry, and offline handling."
  },
  {
    "id": 27,
    "type": "Interaction",
    "target": "Onboarding",
    "title": "10-Step Feature Tour",
    "scenario": "A complex tool forces a 10-step modal tour explaining every icon before first use.",
    "focus": "Just-in-time contextual tips, interactive walkthroughs, and learning by doing."
  },
  {
    "id": 28,
    "type": "Interaction",
    "target": "Accessibility",
    "title": "Low-Contrast Elegance",
    "scenario": "A modern design relies on low-contrast gray-on-gray typography and subtle hover states.",
    "focus": "WCAG 2.2 AA compliance, touch target minimums, and focus indicators."
  },
  {
    "id": 29,
    "type": "Interaction",
    "target": "Motion",
    "title": "Over-Animated Spring Transitions",
    "scenario": "Every page navigation and modal open uses dramatic 600ms spring animations.",
    "focus": "Perceived performance, reduced-motion preferences, and functional micro-interactions."
  },
  {
    "id": 30,
    "type": "Interaction",
    "target": "Design Systems",
    "title": "Generic Component Fatigue",
    "scenario": "Every screen uses design-system components correctly, yet the product feels devoid of hierarchy.",
    "focus": "Rhythm, typographic scale, white space, and brand intentionality."
  }
];

export const mockLoops: MockLoop[] = [
  {
    "id": "apple-loop",
    "name": "Apple Full Interview Loop",
    "company": "Apple",
    "totalMinutes": 180,
    "rounds": [
      {
        "name": "Career Narrative & Introduction",
        "minutes": 10,
        "focus": "Background, design philosophy, why Apple, and intentionality."
      },
      {
        "name": "Portfolio Craft Interrogation",
        "minutes": 35,
        "focus": "One flagship project: scrutiny on typography, hierarchy, states, edge cases, and personal ownership."
      },
      {
        "name": "Platform Design Exercise",
        "minutes": 45,
        "focus": "Native interaction problem (Dynamic Type, iOS/macOS continuity, Apple Watch or visionOS)."
      },
      {
        "name": "Visual & Interaction Critique",
        "minutes": 25,
        "focus": "Teardown of an interface: restraint, platform conventions, and micro-decisions."
      },
      {
        "name": "Behavioral & Leadership",
        "minutes": 25,
        "focus": "Disagreements with engineering/PM, trade-offs, and maintaining quality standards."
      },
      {
        "name": "Candidate Questions",
        "minutes": 10,
        "focus": "Questions about team culture, craft expectations, and product vision."
      }
    ]
  },
  {
    "id": "google-loop",
    "name": "Google Full Interview Loop",
    "company": "Google",
    "totalMinutes": 200,
    "rounds": [
      {
        "name": "Career Narrative & Background",
        "minutes": 10,
        "focus": "Product perspective, systems thinking, and scale orientation."
      },
      {
        "name": "Portfolio Deep Dive",
        "minutes": 35,
        "focus": "Problem framing, research grounding, alternatives considered, and measurable impact."
      },
      {
        "name": "Product Design Whiteboard",
        "minutes": 45,
        "focus": "Unfamiliar large-scale problem (1B users, NBU, multimodal AI, cross-device workflows)."
      },
      {
        "name": "Product / UX Critique",
        "minutes": 35,
        "focus": "Structured evaluation of a Google or ecosystem product across user jobs, metrics, and trade-offs."
      },
      {
        "name": "Behavioral & \"Googlyness\"",
        "minutes": 30,
        "focus": "Navigating ambiguity, handling failure, psychological safety, and collaborative influence."
      },
      {
        "name": "AI / Systems Depth",
        "minutes": 20,
        "focus": "Human-AI interaction, nondeterministic states, trust boundaries, and technical constraints."
      }
    ]
  },
  {
    "id": "atlassian-loop",
    "name": "Atlassian Full Interview Loop",
    "company": "Atlassian",
    "totalMinutes": 195,
    "rounds": [
      {
        "name": "Values & Introduction",
        "minutes": 10,
        "focus": "Open company, no bullshit, customer empathy, and collaboration philosophy."
      },
      {
        "name": "Portfolio Presentation",
        "minutes": 35,
        "focus": "Complex enterprise or productivity case: systems thinking, trade-offs, and outcome verification."
      },
      {
        "name": "Enterprise Workflow Whiteboard",
        "minutes": 45,
        "focus": "Designing an admin tool, permission model, automation rule builder, or incident responder."
      },
      {
        "name": "Design Systems & Craft",
        "minutes": 30,
        "focus": "Component architecture, tokens, accessibility, and multi-product consistency."
      },
      {
        "name": "AI + Systems Integration",
        "minutes": 30,
        "focus": "Designing agent assist (Jira Service Management), bulk automation, and governance."
      },
      {
        "name": "Leadership & Collaboration",
        "minutes": 30,
        "focus": "Influence across engineering and product managers, resolving roadmap friction."
      }
    ]
  },
  {
    "id": "portfolio-defense",
    "name": "Flagship Portfolio Defense Round",
    "company": "General",
    "totalMinutes": 60,
    "rounds": [
      {
        "name": "Project Walkthrough",
        "minutes": 15,
        "focus": "Problem statement, evidence, your exact role, and initial constraints."
      },
      {
        "name": "Five Whys Scrutiny",
        "minutes": 25,
        "focus": "Interviewer challenges your decisions: Why this layout? Why not a simpler flow? What was rejected?"
      },
      {
        "name": "Shipped vs. Conceptual Outcomes",
        "minutes": 15,
        "focus": "Qualitative and quantitative metrics, what failed, and what you would change today."
      },
      {
        "name": "Wrap-up & Learnings",
        "minutes": 5,
        "focus": "Core takeaway about yourself as a designer from this project."
      }
    ]
  },
  {
    "id": "whiteboard-challenge",
    "name": "Live Whiteboard / App Design Round",
    "company": "General",
    "totalMinutes": 45,
    "rounds": [
      {
        "name": "Problem Framing & User Jobs",
        "minutes": 8,
        "focus": "Clarifying questions, target personas, constraints, and success metrics."
      },
      {
        "name": "Three-Way Ideation (Expected, Reframed, Radical)",
        "minutes": 12,
        "focus": "Exploring divergent mental models before committing to one direction."
      },
      {
        "name": "Detailed Flow & Core Interaction",
        "minutes": 15,
        "focus": "Key screens, state transitions, feedback, edge cases, and accessibility."
      },
      {
        "name": "Trade-offs, Edge Cases & Wrap-up",
        "minutes": 10,
        "focus": "Engineering feasibility, risks, guardrails, and validation plan."
      }
    ]
  }
];

export const lessons=[
 {title:'Frame the decision',category:'Product thinking',body:'Begin with the decision the team needs to make. Separate the requested feature from the user job, the business outcome, and the uncertainty. A useful problem statement identifies who struggles, in what situation, and what better outcome would mean.',example:'“Add a dashboard” may hide a need to notice overdue cases early. Compare a dashboard with targeted alerts and changing the process that creates overdue cases.',say:'The assumption I want to test first is…',task:'Rewrite one real feature request as a problem. Name evidence that could prove the problem is smaller than you think.',weak:'Starting with a favourite framework or screens before identifying the decision.'},
 {title:'Choose evidence for a reason',category:'Research',body:'Pick a research method according to the uncertainty. Observation reveals behaviour; interviews explore context and reasoning; usability tests examine an interaction; analytics reveals patterns. Proxy evidence is useful when direct access is unavailable, but label its limits.',example:'If people abandon a form, analytics can locate drop-off; a usability session can reveal whether confusing requirements or an interaction failure explains it.',say:'This evidence supports X, but it does not yet establish Y.',task:'For a portfolio decision, list what you observed, what you inferred, and what you still do not know.',weak:'Saying “users wanted it” without describing the participants, method, or limitations.'},
 {title:'Conventional, reframed, radical',category:'Product judgment',body:'Generate an expected approach, a reframed approach that changes the mental model, and a radical approach that questions whether the work must exist. Compare value, familiarity, feasibility, accessibility, risk, and scalability. Novelty is not itself evidence of quality.',example:'For reconciling records: improve the table; show only exceptions; eliminate duplicate entry at the source. Each option creates different operational and trust requirements.',say:'The conventional approach assumes… If we challenge that assumption…',task:'Generate all three approaches before polishing one. Name the strongest reason to reject your favourite.',weak:'Calling a different visual style an innovative product idea.'},
 {title:'Craft beyond usability',category:'Interaction craft',body:'An interface can be usable yet feel mediocre because hierarchy, spacing, language, states, and transitions do not reinforce one another. Inspect the complete task, including focus, loading, interruption, failure, and recovery. Explain choices through the task and context.',example:'A save button with no feedback leaves uncertainty even if saving succeeds. A clear saved state and recovery from failure make the interaction feel complete.',say:'I made this information prominent because the next decision depends on it.',task:'Pick one screen. Improve hierarchy, one piece of content, and one state. Explain what you deliberately left unchanged.',weak:'A laundry list of visual opinions with no user or task context.'},
 {title:'Design systems are shared decisions',category:'Systems',body:'A component library is only part of a system. Semantic tokens, patterns, content rules, accessibility, ownership, contribution, and deprecation help teams make coherent decisions. Reuse existing semantics when they fit; extend deliberately; create new components when the interaction genuinely differs.',example:'A danger action needs more than a red token. Its pattern may need a clear consequence, appropriate confirmation, permissions, and recovery.',say:'The component API should make valid states easy and contradictory states difficult.',task:'Document a component’s inputs, states, keyboard behaviour, error cases, and adoption criteria.',weak:'Measuring success only by the number of components.'},
 {title:'A metric improved. Did the product?',category:'Measurement',body:'Connect an outcome metric to plausible user value and use input metrics to diagnose behaviour. Guardrails reveal costs such as errors, returns, support load, or exclusion. Inspect cohorts and the measurement window; a before-and-after change does not automatically establish causation.',example:'Faster ticket closure can coexist with more reopened tickets. Track resolution quality and rework alongside time.',say:'I would pair that success metric with this guardrail…',task:'Choose one feature. Define an outcome, two diagnostic measures, and two guardrails. Explain a misleading result.',weak:'Using engagement or acceptance as a universal proxy for user value.'},
 {title:'Understand the system underneath',category:'Technical fluency',body:'A client displays and gathers input; a server coordinates data and rules. APIs exchange structured information. Authentication establishes identity; authorisation decides allowed actions. Latency, caching, pagination, and stale data shape what users can see and safely do.',example:'Optimistic UI can make a reversible reaction feel immediate. A consequential transaction may need confirmation from the authoritative system before showing success.',say:'What happens if the request succeeds but the response never reaches the user?',task:'Map one interaction from input to server response. Design loading, timeout, duplicate retry, and permission failure.',weak:'Treating every failure as the same generic error toast.'},
 {title:'AI proposes; authority is designed',category:'AI design',body:'AI outputs can vary and be wrong. Start with a job where AI offers value, specify inputs and grounding, and design review, correction, fallback, and evaluation. An authoritative system should still validate permissions and enforce transaction rules.',example:'A support copilot may draft a resolution. A separate permission check decides whether the agent can execute the change. Sources and undo do not replace authorisation.',say:'The model can suggest this; the product must independently validate that.',task:'Draw a boundary around what the model may propose, what a person approves, and what the system enforces.',weak:'Adding a confidence percentage without knowing how it is calibrated or understood.'},
 {title:'Seniority through decisions',category:'Leadership',body:'Demonstrate seniority by showing how you created clarity, identified risk, compared alternatives, helped others contribute, and followed through. Titles and years do not explain your contribution. Give the other side of a disagreement a fair account.',example:'A useful conflict story explains the engineer’s cost concern, the user outcome, the options explored, who decided, and what happened.',say:'There were two constraints pulling in opposite directions…',task:'Prepare one story of influence, one of failure, and one of improving another person’s work.',weak:'Presenting yourself as the only person who cared about users or quality.'},
 {title:'Defend the portfolio honestly',category:'Portfolio',body:'For each project, distinguish evidence, assumptions, prototype behaviour, and shipped outcomes. Make your personal decisions visible. If metrics are unavailable, describe the qualitative evidence and its limits. Keep confidential material out of practice exports.',example:'“We tested a prototype with participants” is different from “the product improved retention”. Claim only what the evidence supports.',say:'The evidence is not strong enough to claim… What I can show is…',task:'Audit one case study with Verified, Needs evidence, and Do not claim yet labels.',weak:'A polished process story that never explains a hard choice or the actual outcome.'},
 {title:'Speak in layers',category:'Communication',body:'Start with the answer, then develop it. In 30 seconds give the headline and one concrete example. In two minutes add the context, decision, trade-off, and result. In five minutes include evidence, alternatives, collaboration, and learning. Pause to check alignment.',example:'After an interruption, acknowledge the question, answer it directly, and bridge back only if needed: “That changes the constraint. I would revise…”',say:'The short answer is… The reason is… A concrete example is…',task:'Record the same decision at all three lengths. Remove background that does not change the listener’s understanding.',weak:'Memorising paragraphs or treating uninterrupted talking as success.'},
 {title:'Use company lenses carefully',category:'Interview preparation',body:'Use Apple practice to examine platform conventions, restraint, accessibility, and interaction detail. Use Google practice to examine evidence, scale, ecosystems, and inclusion. Use Atlassian practice to examine enterprise roles, permissions, workflow complexity, and AI collaboration. These are learning lenses, not verified hiring rubrics.',example:'The same approval flow can be critiqued for native interaction quality, international scale, or enterprise governance.',say:'For this role, the product context suggests I should emphasise…',task:'Read the actual job description and recruiter guidance. Select two case studies and the decisions most relevant to that role.',weak:'Assuming every team at a company follows one interview format.'}
];
export const resources=[
 ['Apple Human Interface Guidelines','Platform patterns, interaction, accessibility','https://developer.apple.com/design/human-interface-guidelines/','Inspect one control in a real app. Explain where its platform behaviour helps.'],
 ['Material Design','Components, layout, and interaction','https://m3.material.io/','Compare a component’s guidance with one implementation you use.'],
 ['Google People + AI Guidebook','Human-centred AI decisions','https://pair.withgoogle.com/guidebook/','Apply one principle to the ticket-resolution challenge.'],
 ['Atlassian Design','Enterprise patterns and AI design','https://atlassian.design/','Study an enterprise pattern and sketch its failure state.'],
 ['W3C Web Accessibility Initiative','Accessibility standards and techniques','https://www.w3.org/WAI/','Choose one guideline and check a complete task with a keyboard.'],
 ['Figma Help Center','Components, variables, and prototyping','https://help.figma.com/','Build a small component that demonstrates what you studied.'],
 ['GOV.UK Design System','Public-service patterns and content','https://design-system.service.gov.uk/','Rewrite a confusing service form using plain language.'],
 ['Microsoft Fluent','Cross-platform design-system guidance','https://fluent2.microsoft.design/','Compare a pattern with its Material equivalent and explain context.']
];

// ─────────────────────────────────────────────────────────────────────────────
// UX Encyclopedia — visual study guide of senior product-design domains.
// Extracted and expanded from the 2026 Masterbook (Parts I–V + Metrics chapter).
// commonTraps format: "weak/junior answer ~ senior refinement" (split on " ~ ").

export interface TopicEntry {
  id: string;
  category: string;
  title: string;
  eyebrow: string;
  summary: string;
  mentalModel: string;
  keyPrinciples: string[];
  realWorldExample: string;
  sayAloud: { thirtySec: string; twoMin: string };
  commonTraps: string;
  relatedSource: string;
}

export const uxDomains = [
  'Product Thinking & Strategy',
  'Research & Validation',
  'Journey Mapping & Service Blueprints',
  'Information Architecture',
  'Interaction & Cognitive Laws',
  'Visual Craft & Design Systems',
  'Accessibility & Universal Design',
  'Product Analytics & Metrics',
  'AI & Nondeterministic UX',
  'Technical Literacy for Designers',
] as const;

export const uxEncyclopedia: TopicEntry[] = [

  // ══ 1 · Product Thinking & Strategy ═════════════════════════════════════
  {
    id: 'jtbd',
    category: 'Product Thinking & Strategy',
    title: 'Jobs To Be Done',
    eyebrow: 'STRATEGY FRAMEWORK',
    summary: 'Reframes design around the progress a person is trying to make in a specific situation — not around personas, demographics, or feature requests. The job is stable even when solutions change.',
    mentalModel: 'When [situation], I want to [motivation], so I can [expected outcome].',
    keyPrinciples: [
      'Anchor the job to a struggling situation, not a persona label.',
      'Use JTBD when product categories hide the real need — not for every button.',
      'Evidence for a job comes from observed behaviour, not from the template.',
      'A well-stated job suggests a success measure for the outcome.',
    ],
    realWorldExample: 'Apple reframed portable music from “manage MP3 files” to “1,000 songs in your pocket” — that job decided the iPod’s storage bet, the wheel, and iTunes sync. Google Maps owns the job “get me there on time with low uncertainty”, which is why live traffic, rerouting, and ETA-sharing exist while map styling stays quiet.',
    sayAloud: {
      thirtySec: 'Jobs to be Done says people hire products to make progress in a situation, not to use features. So when a request arrives — “add filters” — I ask what progress is blocked. Often the real job is “help me predict the catalogue’s vocabulary”, which changes the solution, the empty states, and the metric I would watch.',
      twoMin: 'I use Jobs to be Done to separate the requested feature from the progress the person actually wants. The format — when this situation, I want this motivation, so I can get this outcome — forces three honest questions: what is the struggling moment, what evidence shows it, and what outcome would we measure? For example, “agents need a better ticket list” became “when a queue surges, help me see which ticket breaches its SLA next”. That reframing moved the work from list cosmetics to priority signals. I also know when not to use it: not every feature needs a JTBD statement, and a jobs frame with no behavioural evidence behind it is a slogan, not strategy. Senior use of JTBD means the artefact drives a decision — otherwise I drop it.',
    },
    commonTraps: 'Reciting the JTBD template with a persona bolted on and no evidence — a slogan, not a decision tool. ~ A senior answer names the situation, the struggling moment observed in real behaviour, what the frame deliberately excludes, and the outcome metric it implies.',
    relatedSource: 'Christensen, Competing Against Luck · Nielsen Norman Group on JTBD',
  },
  {
    id: 'problem-framing',
    category: 'Product Thinking & Strategy',
    title: 'Problem Framing & Reframing',
    eyebrow: 'FRAMING DISCIPLINE',
    summary: 'Turning symptoms and requests into a solvable, testable problem. A good frame excludes some solutions while leaving room for alternatives — and it can be proven wrong.',
    mentalModel: 'Actors → jobs → pain → context → evidence → constraints → desired outcome.',
    keyPrinciples: [
      'A useful frame is falsifiable: name evidence that would shrink the problem.',
      'Reframe when scope keeps shifting or evidence conflicts — then commit.',
      'Do not reframe endlessly when the team already has enough to act.',
      'Write the frame so it excludes solutions, not so wide it includes everything.',
    ],
    realWorldExample: 'On an enterprise service desk (Atlassian-style), “agents need a better ticket list” reframed as “agents cannot tell which ticket will breach its SLA next” — the work changed from list redesign to priority signalling and triage defaults. A Google help-centre request for “AI search” became a discovery-failure framing first: what are people failing to find today?',
    sayAloud: {
      thirtySec: 'Framing means converting a symptom into a testable problem. My structure is actors, jobs, pain, context, evidence, constraints, desired outcome. “Users need filters” may actually be “users cannot predict the catalogue’s vocabulary”. A senior frame states what would prove the problem smaller than we think.',
      twoMin: 'When a request lands, I frame before I design. I identify the actors and their jobs, locate the pain in a real context, ask what evidence exists versus what we are assuming, name the constraints, and define the desired outcome. The frame must do two kinds of work: exclude some solutions so the team can focus, and leave room for alternatives so we do not anchor on the first idea. Example: “add a dashboard” hid the need to notice overdue cases early — alerts or a process fix beat a new surface. I also time-box reframing: at project start, after conflicting evidence, or when scope keeps changing. Once evidence is sufficient, a senior designer commits instead of endlessly reopening the question.',
    },
    commonTraps: 'Writing a generic “How might we” with no evidence, no constraints, and no way to be wrong. ~ A senior frame cites observed behaviour, states what evidence would shrink the problem, and declares what a solution must not break.',
    relatedSource: 'Masterbook Part I · Nielsen Norman Group, problem-definition research',
  },
  {
    id: 'zero-to-scale',
    category: 'Product Thinking & Strategy',
    title: '0-to-1 vs Scale Thinking',
    eyebrow: 'STRATEGY LENS',
    summary: 'Designing something new rewards hypothesis speed; designing at scale rewards consistency, systems, and evidence discipline. Senior designers name which game they are playing before choosing process.',
    mentalModel: '0→1: hypothesis → riskiest assumption → cheapest test. Scale: system → pattern → metric → guardrail.',
    keyPrinciples: [
      'At 0→1, optimise for learning per week, not for polish.',
      'At scale, every exception multiplies cost across teams and locales.',
      'A pattern justified at scale can be pure waste in a two-week prototype.',
      'Migration and deprecation are design problems, not only engineering ones.',
    ],
    realWorldExample: 'A 0→1 product like the Kashi Sahayak prototype can validate behaviour with a concierge flow and manual backstage. Google Search runs the opposite game: a 0.1% regression means millions of failed tasks, so changes ship behind experiments with guardrails. Apple adds features only when they can meet platform-level quality across hundreds of millions of devices.',
    sayAloud: {
      thirtySec: '0-to-1 design buys evidence as cheaply as possible — riskiest assumption first, concierge flows welcome. Scale design protects a system — patterns, tokens, experiments, guardrails. I always state which mode I am in, because the fidelity, the process, and the definition of “done” are different in each.',
      twoMin: 'I treat 0-to-1 and scale as different disciplines. At 0-to-1 the product is a hypothesis: I identify the riskiest assumption and design the cheapest thing that tests it — a prototype, a manual backstage, a pilot cohort. Polish that does not change the learning is waste. At scale the product is a commitment: exceptions multiply across teams, languages, and accessibility needs, so I design through the system — semantic patterns, measurable success, hard guardrails, and a migration plan for what we are replacing. The honest move is to say the mode out loud: “this is a two-week hypothesis test” or “this ships to every user, so we need an experiment with retention guardrails”. Confusing the two produces either flimsy launches or suffocated exploration.',
    },
    commonTraps: 'Applying heavyweight process to a fragile prototype, or shipping a sketched exception into a scaled system. ~ A senior designer states the stage explicitly and matches fidelity, evidence, and rollout strategy to it.',
    relatedSource: 'Masterbook Part I · Google experimentation culture write-ups',
  },
  {
    id: 'three-ways',
    category: 'Product Thinking & Strategy',
    title: 'Conventional → Reframed → Radical',
    eyebrow: 'JUDGMENT PRACTICE',
    summary: 'The Masterbook’s critical chapter: a professional-looking solution can still be generic. Generate the expected answer, a reframed mental model, and a radical removal — then evaluate all three before polishing one.',
    mentalModel: 'A · Expected → B · Reframed mental model → C · Radical removal. Evaluate: user value, familiarity, feasibility, risk, accessibility, differentiation, scalability.',
    keyPrinciples: [
      'Generate all three before polishing any single direction.',
      'Evaluate each across value, feasibility, risk, accessibility, and scalability.',
      'Novelty is not evidence of quality; familiarity has real value.',
      'The strongest answer can be a deliberate conventional choice — with reasons.',
    ],
    realWorldExample: 'Government service portal: A — search plus departments and service cards; B — organise around citizen life events (having a child, moving house); C — radical: the citizen describes a need and the system assembles the cross-department journey automatically. The lens works anywhere: enterprise search, hospital booking, e-commerce returns.',
    sayAloud: {
      thirtySec: 'Before committing, I generate three answers: the expected one, a reframed mental model, and a radical version that questions whether the work should exist. Then I evaluate all three on value, familiarity, feasibility, risk, and accessibility. Responding to “generic” with visual novelty is decoration; reframing is strategy.',
      twoMin: 'Distinctive product thinking questions the mental model, not the colour palette. My drill: for any brief, I first design what a competent designer would probably build — say, a portal with search and service cards. Then I reframe: organise around life events instead of departments. Then the radical pass: can navigation itself disappear — the user states a need and the system assembles the journey? Next I score all three across user value, usability, familiarity, feasibility, risk, accessibility, differentiation, and scalability. Often the reframed option wins on value while the conventional option wins on learning cost — that trade-off is the real design conversation. And I can defend choosing conventional: when trust and predictability dominate, familiar architecture is the innovation.',
    },
    commonTraps: 'Answering “this feels generic” by adding visual novelty to the same architecture. ~ A senior designer challenges the assumption, category, or workflow model itself — then shows the evaluation, including why conventional might still be right.',
    relatedSource: 'Masterbook, Critical Chapter — Conventional ≠ Correct ≠ Distinctive',
  },

  // ══ 2 · Research & Validation ═══════════════════════════════════════════
  {
    id: 'choose-methods',
    category: 'Research & Validation',
    title: 'Choosing Research Methods',
    eyebrow: 'EVIDENCE DISCIPLINE',
    summary: 'Research exists to reduce the uncertainty behind a decision. The method follows the uncertainty — interviews for mental models, usability tests for interaction, analytics for patterns.',
    mentalModel: 'Decision → uncertainty → method → sample → synthesis → limitation.',
    keyPrinciples: [
      'Name the decision the research will change before choosing a method.',
      'Interviews explore reasoning; observation reveals behaviour; analytics show patterns.',
      'Do not run studies because “the process says so”.',
      'Every finding carries a stated limitation — that is what makes it credible.',
    ],
    realWorldExample: 'Apple’s health features: interviews explain motivations for tracking, but only observation of first-week use reveals abandoned watch-face complications and muted notifications. At Google, a search change is evaluated by usability sessions for comprehension and live experiments for behaviour — each answers a different uncertainty.',
    sayAloud: {
      thirtySec: 'I choose methods from the uncertainty, not from habit. If the decision depends on mental models, I interview; on interaction, I usability-test; on broad patterns, I read analytics. Then I state the limitation out loud. Research quality is judged by the decision it improves, not by the number of sessions.',
      twoMin: 'My structure is decision, uncertainty, method, sample, synthesis, limitation. First: what decision does this research change? If none, we should not run it. Second: what kind of uncertainty — motivation, comprehension, behaviour, or scale? Interviews surface mental models and language; observation exposes what people actually do; usability tests judge a specific interaction; analytics reveal patterns at volume. Third: sample honestly — five representative users per usability round beats thirty unrepresentative ones. Fourth: synthesise into a decision, not a highlight reel. Finally I attach the limitation: “this was five moderated sessions on a prototype; it supports direction, not magnitude”. Naming limits is what separates evidence from theatre.',
    },
    commonTraps: 'Listing methods — “I’d do interviews and surveys” — with no link to what the team must decide. ~ A senior answer starts from the decision, matches method to uncertainty, and volunteers the limitation before being asked.',
    relatedSource: 'Masterbook Part I · Nielsen Norman Group, “When to Use Which UX Research Method”',
  },
  {
    id: 'observation',
    category: 'Research & Validation',
    title: 'Behavioural Observation & the Say–Do Gap',
    eyebrow: 'FIELD METHOD',
    summary: 'What people say they do and what they actually do routinely differ. Observation — shadowing, contextual inquiry, session replay — grounds design in behaviour rather than self-report.',
    mentalModel: 'Claimed behaviour ≠ observed behaviour ≠ underlying motivation. Design follows behaviour; interview explains why.',
    keyPrinciples: [
      'Ask for the last concrete episode, not “how do you usually…”.',
      'Watch the workarounds — spreadsheets, sticky notes, screenshots. They are unmet needs.',
      'Record sequence and context, not just quotes.',
      'Pair observation with interviews: behaviour first, meaning second.',
    ],
    realWorldExample: 'Enterprise support agents insist they read every ticket field; shadowing shows they scan subject and priority and keep answers in a private notebook. Designing for the notebook — quick snippets and visible history — beats polishing fields nobody reads. The GOV.UK service manuals similarly mandate observation of real caseworkers.',
    sayAloud: {
      thirtySec: 'I trust behaviour over self-report. People say they read everything; observation shows scanning, shortcuts, and private workarounds. Those workarounds are the design brief. So I ask about the last concrete time, then watch the actual flow before committing to a solution.',
      twoMin: 'The say–do gap is the first thing I plan for. In interviews people reconstruct an idealised version of their behaviour; in observation you see the real one. My practice: ask for the most recent concrete episode — “walk me through the last ticket that went wrong” — then, where possible, shadow the actual work. I look for three signals: workarounds that reveal missing features, interruptions that reveal context the product ignores, and sequences that reveal the true order of decisions. In one enterprise study, agents who claimed to read every field were actually scanning two of them and pasting from a personal notebook — so we designed snippet support and made history visible instead of rearranging the form. Observation shows what happens; interviews explain why. I need both, in that order.',
    },
    commonTraps: 'Reporting what participants said as though it were what they do. ~ A senior designer triangulates self-report with observed behaviour, flags the say–do gap, and designs around documented workarounds.',
    relatedSource: 'Nielsen Norman Group, contextual inquiry · IDEO field methods',
  },
  {
    id: 'usability-testing',
    category: 'Research & Validation',
    title: 'Usability Testing & Task Evidence',
    eyebrow: 'VALIDATION METHOD',
    summary: 'Task-based sessions judge whether a specific interaction works. Around five participants per round surfaces the majority of severe problems; measure completion, errors, and recovery — not opinions.',
    mentalModel: 'Task → completion & errors → severity → fix → retest. Fidelity matches the question.',
    keyPrinciples: [
      'Write tasks as scenarios people would genuinely attempt, not feature tours.',
      'Measure completion, error rate, and recovery — opinions about taste are not usability data.',
      'Prototype fidelity should match the question: flow questions need flow fidelity, not pixels.',
      'Severe problems first: sorting feedback by severity beats counting comments.',
    ],
    realWorldExample: 'Testing a Google-style booking flow: “change this flight to Tuesday without paying more than ₹2,000 extra” reveals date-picker and fare-comparison failures a walkthrough never would. Apple’s platform QA culture similarly tests complete tasks — including with assistive technologies — rather than screen-by-screen aesthetics.',
    sayAloud: {
      thirtySec: 'Usability testing answers one question: can a real person complete this task? I give scenarios, not tours; I measure completion, errors, and recovery; roughly five participants per round expose most severe issues; and I match prototype fidelity to the question being asked.',
      twoMin: 'A usability test is an experiment about a task, not a focus group about colours. I write scenarios with realistic stakes — “reschedule this appointment because your train was cancelled” — and I stay quiet while participants attempt them. The data is behavioural: did they complete it, where did they err, could they recover, how long did it take. Five participants per round per distinct user group finds the majority of severe problems; after that, fix and retest rather than keep testing the same broken flow. Fidelity follows the question: a flow question needs a clickable skeleton, a comprehension question needs real content, and only hierarchy questions need finished visuals. The report ranks problems by severity and ties each to an observed moment, so the team fixes the task, not my opinion of it.',
    },
    commonTraps: 'Treating a demo-with-questions as a usability test, and reporting “users liked it”. ~ A senior designer reports task completion, error patterns, and recovery, ties findings to observed moments, and ranks fixes by severity.',
    relatedSource: 'Nielsen Norman Group, usability testing research · GOV.UK Service Manual',
  },
  {
    id: 'triangulation',
    category: 'Research & Validation',
    title: 'Triangulation & Proxy Evidence',
    eyebrow: 'EVIDENCE SYNTHESIS',
    summary: 'Single sources deceive. Combining analytics, interviews, support logs, and behavioural traces lets findings corroborate each other — and lets you label what each source cannot prove.',
    mentalModel: 'Pattern (analytics) + meaning (interviews) + pain (support logs) → claim. Label each claim: observed, inferred, assumed.',
    keyPrinciples: [
      'When sources agree, confidence rises; when they disagree, you found the interesting question.',
      'Proxy evidence is legitimate when labelled — sales calls, ticket tags, forum posts.',
      'Separate observed, inferred, and assumed in every synthesis.',
      'Analytics shows where; qualitative work explains why; neither alone is enough.',
    ],
    realWorldExample: 'For a B2B SEO platform with thin instrumentation (a NetElixir/LXR-style context), direct product analytics were weak — so triangulate support ticket tags, recorded sales calls, and session replays to validate which reporting views actually get used, each claim marked observed or inferred. Google’s search quality work pairs query-log patterns with human rater evidence for the same reason.',
    sayAloud: {
      thirtySec: 'I never let one source carry a conclusion. Analytics shows where the problem is; interviews explain why it exists; support logs show how much it hurts. And when I lack direct access, I use proxy evidence — labelled as proxy, with its bias stated.',
      twoMin: 'Triangulation means making different kinds of evidence check each other. My default stack: analytics to locate the pattern at scale — a 40% drop at step three; qualitative sessions to explain the mechanism — the requirement is confusing, not the layout; and support or sales signals to size the pain in the business’s own language. Where they agree I act; where they disagree I have found the next research question. When direct user access is impossible — common in enterprise and regulated work — I use proxies deliberately: ticket tags, sales-call notes, community posts, stakeholder interviews. Proxy evidence is admissible if labelled: “this reflects the loudest customers, not the median one.” Finally, my synthesis separates three verbs — observed, inferred, assumed — so the team knows exactly how much weight each claim can bear.',
    },
    commonTraps: 'Citing one survey or one dashboard as settled truth. ~ A senior designer corroborates across at least two source types, states what each cannot prove, and marks claims as observed, inferred, or assumed.',
    relatedSource: 'Masterbook Part I · Nielsen Norman Group on triangulation',
  },

  // ══ 3 · Journey Mapping & Service Blueprints ═════════════════════════════
  {
    id: 'journey-mapping',
    category: 'Journey Mapping & Service Blueprints',
    title: 'Journey Mapping',
    eyebrow: 'EXPERIENCE MODEL',
    summary: 'Visualising stages, actions, emotions, channels, and pain points across a longitudinal experience. The best maps change priorities — decorative maps with no owner change nothing.',
    mentalModel: 'Scope → stages → evidence → pain → opportunity → owner.',
    keyPrinciples: [
      'Scope one actor, one goal, one bounded journey — “the whole product” is not a journey.',
      'Every pain point needs an evidence tag and a named owner.',
      'Map what happens between channels, not just inside screens.',
      'A map that does not reprioritise the roadmap is wallpaper.',
    ],
    realWorldExample: 'Google Flights covers discovery → evaluation → booking → the post-purchase stage most maps skip — the anxious “did the price drop?” week, which is exactly where price-drop alerts live. An enterprise onboarding map for a new employee exposes that the gaps between IT, HR, and the tool cause more pain than any single screen.',
    sayAloud: {
      thirtySec: 'A journey map is a prioritisation tool, not a poster. I scope one actor and one goal, mark stages and channels, attach evidence to every pain point, and give each opportunity an owner. If a map has not changed what we build next, it failed — however pretty it looks.',
      twoMin: 'I treat journey mapping as organisational X-ray. Start narrow: one actor, one goal, one bounded time period — “a new employee’s first week”, not “the employee experience”. Along stages I record actions, touchpoints, emotional state, and the evidence behind each — observed, inferred, or assumed. The payload of the map is two things: pain points with evidence, and handoffs where ownership is ambiguous. Those are where experience actually breaks. Then the map earns its cost: each opportunity gets an owner and a place in the roadmap, and we define what improvement would look like measurably. Red flags I reject: maps built in a workshop with no research, maps so broad nothing has an owner, and maps that are presented once and never reopened. A living map is a management tool; a finished map is wallpaper.',
    },
    commonTraps: 'Producing a huge, beautiful map with no evidence tags, no owners, and no decision afterwards. ~ A senior designer scopes tightly, tags evidence, and converts pains into owned, measurable opportunities.',
    relatedSource: 'Nielsen Norman Group, journey mapping · Masterbook Part I',
  },
  {
    id: 'service-blueprints',
    category: 'Journey Mapping & Service Blueprints',
    title: 'Service Blueprints',
    eyebrow: 'SYSTEMS MODEL',
    summary: 'Extends the journey below the waterline: frontstage interactions connected to backstage processes, systems, and teams. Blueprints expose the operational causes of UX failure.',
    mentalModel: 'Frontstage actions | line of interaction | backstage processes | support systems | failure points.',
    keyPrinciples: [
      'If you only mapped screens, you mapped a journey, not a service.',
      'Every visible wait has a backstage cause — find it before redesigning the UI.',
      'Mark the systems of record: where truth lives and how fresh it is.',
      'Overkill for a self-contained interaction; essential for multi-team services.',
    ],
    realWorldExample: 'A citizen-service product like Kashi Sahayak: the citizen sees a status page; backstage sits a workflow engine, a department queue, an SMS gateway, and a support desk. If the gateway is the weakest link, polishing the status page will not fix trust — the blueprint makes that visible before a single screen is drawn.',
    sayAloud: {
      thirtySec: 'A service blueprint connects what the user sees to the machinery producing it — backstage teams, systems, and processes. Most UX failure has an operational cause: a queue, an integration, a stale database. The blueprint finds that cause before we redesign the interface.',
      twoMin: 'When a problem crosses teams or systems, I move from journey map to service blueprint. The map keeps the user’s actions on top; below the line of interaction I add frontstage channels, backstage processes, and supporting systems — and I mark where each system’s data lives and how fresh it is. Then the discipline: for every moment the user waits or fails, trace the operational cause. A citizen checking an application status who hears nothing for three weeks does not have a status-page problem; they have a department-queue problem and a notification-gateway problem. The blueprint forces us to design those: retries, escalation, honest messaging while the truth is unknown. I use blueprints for services, operations, healthcare, support, government, enterprise — and I deliberately skip them for a self-contained interaction, where they are ceremony.',
    },
    commonTraps: 'Mapping only the screens and calling it a blueprint. ~ A senior designer uses the frontstage/backstage structure to locate the operational cause of visible failure, then designs the system fix alongside the UI fix.',
    relatedSource: 'Nielsen Norman Group, service blueprinting · Masterbook Part I',
  },
  {
    id: 'touchpoints',
    category: 'Journey Mapping & Service Blueprints',
    title: 'Touchpoints, Channels & State Continuity',
    eyebrow: 'EXPERIENCE INVENTORY',
    summary: 'Every touchpoint — app, email, SMS, call, letter, kiosk — carries expectations and a share of the product’s credibility. State and tone must survive the crossing between channels.',
    mentalModel: 'Start here, finish there: inventory touchpoints → assign jobs per channel → keep state and voice continuous.',
    keyPrinciples: [
      'Each channel should do the job it is good at — SMS for urgency, email for record, app for action.',
      'The user’s task state must persist across channels: nothing “starts over”.',
      'Inconsistent stock-phrase tone across channels reads as different companies.',
      'Design the gaps: the hour between the confirmation email and the appointment.',
    ],
    realWorldExample: 'Apple’s Continuity model — start an email on iPhone, finish on Mac with cursor position intact — is the reference for state carrying across devices. Enterprise support carries the same burden across channels: a ticket raised by email must show its full history when the customer calls; Jira Service Management’s thread-preserving notifications exist for exactly this.',
    sayAloud: {
      thirtySec: 'Channels are one product. If a user starts on the web and finishes in the app or on the phone, state and tone must travel — nothing restarts, nothing contradicts. I inventory touchpoints, assign each channel the job it is good at, and design the gaps between them.',
      twoMin: 'I design the service as one product expressed across channels. First, an honest inventory: app, email, SMS, phone, paper, in-person — each touchpoint with its real reliability and latency, not its intended one. Second, channel jobs: SMS is for urgency and delivery confirmation, email is the durable record, the app is where decisions and actions happen. Third, the hard part — continuity: a ticket raised by email shows its full history when the agent calls; a form half-completed on mobile resumes on desktop. Apple’s Continuity is the consumer benchmark for invisible state transfer. Finally, voice: if the app is plain-spoken and the letters are legalese, users experience two companies and trust neither. I write one source of truth for status language and reuse it across every channel.',
    },
    commonTraps: 'Designing each channel’s screen locally and letting state and copy diverge. ~ A senior designer assigns jobs per channel, keeps task state continuous, and governs one voice across all touchpoints.',
    relatedSource: 'Apple HIG, Continuity · GOV.UK Service Manual, channel shift',
  },
  {
    id: 'fail-points',
    category: 'Journey Mapping & Service Blueprints',
    title: 'Fail Points & Handoffs',
    eyebrow: 'RISK ANALYSIS',
    summary: 'Most service pain lives where responsibility changes hands — between teams, queues, and systems. Design the handoff, the wait, and the re-entry before polishing the happy path.',
    mentalModel: 'For every transition: who owns it now? What can fail? What does the user see while it is uncertain?',
    keyPrinciples: [
      'List fail points first — they are the design brief, not an afterthought.',
      'Context must travel with the work: history, notes, and prior attachments cross every handoff.',
      'During a wait, honest status beats reassuring fiction.',
      'Design re-entry: returning after abandonment is the norm, not the exception.',
    ],
    realWorldExample: 'In Jira Service Management, a ticket escalated from tier one to tier two historically lost context — agents re-asked questions the customer already answered. Carrying internal notes, customer-visible history, and SLA state across the queue shift is a designed feature, not an accident. Hospital referrals and visa applications fail identically at the counter where one department hands to another.',
    sayAloud: {
      thirtySec: 'Experience breaks at handoffs: between teams, queues, and systems. So I design the transition first — what context travels, what the user sees during the wait, and how they re-enter after dropping out. The happy path is the easy part.',
      twoMin: 'When I map any service, I mark every point where ownership changes — user to system, agent to agent, department to department — because that is where trust is lost. For each handoff I answer three questions. First, what context travels with the work: history, notes, attachments, prior decisions — the user must never have to repeat themselves. Second, what can fail here: queue overflow, integration downtime, permission gaps — and what does the user see in that failure. Honest status — “your case is with the regional office, expected response by Friday” — beats a silent spinner for three weeks. Third, re-entry: people get interrupted, submissions time out, letters get lost; resuming must be designed, not hoped for. Mature products are distinguished by recovery quality at exactly these seams.',
    },
    commonTraps: 'Designing the ideal path and discovering the escalation flow after launch. ~ A senior designer inventories fail points first, moves context across every handoff, and designs waits, retries, and re-entry as primary screens.',
    relatedSource: 'Masterbook Parts I & VIII · Atlassian service-management patterns',
  },

  // ══ 4 · Information Architecture ════════════════════════════════════════
  {
    id: 'taxonomy-labelling',
    category: 'Information Architecture',
    title: 'Taxonomies & Labelling',
    eyebrow: 'STRUCTURAL DESIGN',
    summary: 'Categories and labels are the product’s promise about where things live. Build them from users’ vocabulary — tested with card sorts — not from the org chart or the database schema.',
    mentalModel: 'Mental model → inventory → taxonomy → label → test → iterate.',
    keyPrinciples: [
      'Labels are content design: concrete, in the user’s vocabulary, never internal jargon.',
      'Card-sort groupings before committing; tree-test findability after.',
      'Do not repair a bad label with another level of hierarchy.',
      'Watch category growth: a taxonomy must survive 10× the content.',
    ],
    realWorldExample: 'The Masterbook critique: a settings screen with 70 toggles sorted alphabetically — technically organised, practically unusable. Grouping by user intent (Account, Privacy, Notifications) and labelling in the user’s words beats both the alphabet and the engineering names. Apple’s System Settings search synonyms (“wifi” finds “network”) carry the same lesson.',
    sayAloud: {
      thirtySec: 'IA starts with the user’s vocabulary, not our org chart. I inventory the content, test groupings with card sorts, write concrete labels, and tree-test whether people can actually find things. A label problem is never fixed by adding hierarchy.',
      twoMin: 'Taxonomy work begins with a content inventory and ends in tested findability. I collect everything the product must hold, then test grouping with card sorts — open sorts to learn how users naturally cluster, closed sorts to validate my proposed structure. Labels come from how users describe the content in research, written concrete and short: “Billing history”, not “Financial artifact repository”. Then a tree test: give people find-tasks against the bare structure, no visuals, and measure success and directness. Two failure modes I watch: labels that mirror internal team names, and hierarchies that grow a level every time labelling gets hard. The test of senior IA is scale — the structure must survive ten times the content and three new product lines without a rebuild.',
    },
    commonTraps: 'Organising by department ownership, naming with internal jargon, and fixing confusion with deeper nesting. ~ A senior designer derives categories from user research, labels in the user’s words, and validates with tree tests.',
    relatedSource: 'Rosenfeld & Morville, Information Architecture · Optimal Workshop tree-testing guidance',
  },
  {
    id: 'wayfinding',
    category: 'Information Architecture',
    title: 'Wayfinding & Orientation',
    eyebrow: 'NAVIGATION BEHAVIOUR',
    summary: 'Users should always be able to answer: where am I, what is here, where can I go, how do I get back. Orientation is designed with landmarks and current-state signals — not left to the back button.',
    mentalModel: 'Locate → choose → confirm. Support: current-state indicators, breadcrumbs, page titles that match the link that led there.',
    keyPrinciples: [
      'Every screen needs a title matching the words used to reach it.',
      'Show the current location in navigation — orientation is a state, not a decoration.',
      'First-click testing predicts task success better than preference asks.',
      'Design for the information scent: links must smell like their destination.',
    ],
    realWorldExample: 'The Masterbook critique of a B2B product with seven top-level modules and three sidebars — nobody can tell where they are. Apple HIG’s region model (sidebar, content, inspector) and Material 3’s navigation bar/rail by window class both exist to keep orientation constant as layouts adapt.',
    sayAloud: {
      thirtySec: 'Wayfinding means users always know where they are, what they can do here, and how to get back. I design orientation deliberately — matching titles, current-state indicators, breadcrumbs — and validate with first-click testing, because a wrong first click usually means a failed task.',
      twoMin: 'I treat navigation as a continuous answer to three questions: where am I, what can I do here, where else can I go. The mechanics are unglamorous but decisive: every destination’s title repeats the words of the link that led to it — the information scent never breaks; the current location is visibly marked in whatever navigation exists; breadcrumbs show position in deep structures; and the way back is as designed as the way forward. I validate orientation with first-click testing — research shows users whose first click is correct succeed at dramatically higher rates, so it is a cheap, predictive instrument. The failure mode I refuse is navigation designed as a header-styling exercise: when a product needs seven top modules and three sidebars, the problem is the information architecture, and no amount of visual craft will fix orientation.',
    },
    commonTraps: 'Designing the nav bar as a visual styling task and testing by asking “do you like the menu?”. ~ A senior designer engineers the information scent, marks current state everywhere, and measures orientation with first-click tasks.',
    relatedSource: 'Nielsen Norman Group, first-click & information scent · Apple HIG, navigation',
  },
  {
    id: 'depth-vs-breadth',
    category: 'Information Architecture',
    title: 'Depth vs Breadth & Progressive Disclosure',
    eyebrow: 'STRUCTURAL TRADE-OFF',
    summary: 'Deep hierarchies hide content; broad ones overwhelm choice. Progressive disclosure resolves the tension — show what most people need now, keep the rest predictably reachable.',
    mentalModel: '20% of features serve 80% of sessions → surface them; everything else stays one predictable step away.',
    keyPrinciples: [
      'Tie the depth/breadth decision to task frequency data, not aesthetics.',
      'Each level down costs attention; each extra sibling costs choice-time (Hick’s Law).',
      'Disclose progressively by expertise: novice default, expert reach.',
      'Rare-but-dangerous actions belong deeper — with clear labels, never buried silently.',
    ],
    realWorldExample: 'An enterprise admin console surfaces daily work — users, licenses, incidents — and places rare destructive actions (delete organisation, purge logs) one deliberate level deeper behind explicit labelling. Apple’s Camera app shows the same judgment: Photo and Video up front; ProRAW and formats behind Settings, not cluttering capture.',
    sayAloud: {
      thirtySec: 'Depth hides, breadth overwhelms. I decide with frequency data: the tasks most people do most often get surfaced; everything else sits one predictable step deeper, disclosed progressively. Rare and dangerous actions go deeper on purpose — clearly labelled, never silently buried.',
      twoMin: 'The depth–breadth question is really about where you spend the user’s attention. A broad structure with twelve top-level items spends it on choosing; a deep one spends it on clicking and remembering where things went. My resolution is progressive disclosure driven by task-frequency data: identify the 20% of features behind 80% of sessions and give them the top level; keep the long tail exactly one predictable step deeper with honest labels. Then layer by expertise: defaults assume the novice; shortcuts, bulk actions, and advanced panels remain reachable for the expert without taxing the beginner. The nuance that marks senior judgment is intentional depth for risk: destructive or irreversible actions belong a level down where they cannot be triggered by accident — but labelled so clearly that the person who genuinely needs them never hunts.',
    },
    commonTraps: 'Hiding everything to look clean, or showing everything to look powerful. ~ A senior designer allocates visibility by measured task frequency and expertise, and uses deliberate depth as a safety tool.',
    relatedSource: 'Apple HIG, progressive disclosure · Nielsen Norman Group on progressive disclosure',
  },
  {
    id: 'findability',
    category: 'Information Architecture',
    title: 'Findability: Search, Browse & Retrieval Systems',
    eyebrow: 'RETRIEVAL SYSTEM',
    summary: 'Findability is a system — taxonomy, labels, search, filters, and contextual navigation cooperating. Zero-results pages and query reformulation are IA failures, not just search-engine problems.',
    mentalModel: 'Two strategies: browse (structure) + search (retrieval). Measure: success rate, zero-results rate, reformulation rate, time-to-find.',
    keyPrinciples: [
      'Design search for how people misspell, abbreviate, and guess vocabulary.',
      'Empty results need query correction and ways to broaden, not dead ends.',
      'Filters and facets must match the attributes users actually compare.',
      'Freshness is findability: surfacing stale content is surfacing wrong content.',
    ],
    realWorldExample: 'Google Search’s design treats synonyms, typo tolerance, and ranked snippets as core interface. The enterprise mirror: searching a 50,000-file workspace needs permission-aware indexing, document dates in results, and honest “I cannot see files created today” states — the retrieval system’s limits shown in the UI.',
    sayAloud: {
      thirtySec: 'Findability is a whole system, not a search box. Structure serves the browser; retrieval serves the searcher. I measure zero-results rate, reformulation, and time-to-find — and I design the empty state as rescue: corrections, broader paths, honest limits.',
      twoMin: 'I think of findability as two cooperating strategies. Browsing depends on structure: taxonomy, labels, and contextual links — when it works, users never need the search box. Searching depends on retrieval: tolerant of misspellings and abbreviations, ranked by relevance, filtered by attributes users actually compare, and honest about freshness. The metrics bind them together: search success rate, zero-results rate, reformulation rate, time-to-find. Rising query volume can mean thriving engagement or failing navigation — context decides. The moment that reveals design quality is failure: a zero-results page should correct the query, offer broader scopes, show what was searched, and never pretend unrelated recommendations are answers. In enterprise contexts, retrieval is permission-aware — results must respect access control, which is a designed state, not an error message discovered in production.',
    },
    commonTraps: 'Treating search as “a text field plus an engine” and the no-results page as an edge case. ~ A senior designer measures the retrieval funnel, designs failure as recovery, and models permission and freshness in the UX.',
    relatedSource: 'Masterbook Parts I & IV · Google Search quality documentation',
  },

  // ══ 5 · Interaction & Cognitive Laws ════════════════════════════════════
  {
    id: 'fitts-law',
    category: 'Interaction & Cognitive Laws',
    title: "Fitts's Law & Target Design",
    eyebrow: 'COGNITIVE PRINCIPLE',
    summary: 'The time to hit a target grows with distance and shrinks with size. Primary actions deserve large targets near the point of action; destructive actions deserve distance and isolation.',
    mentalModel: 'T ≈ a + b·log₂(1 + D/W). Bigger + closer = faster. Minimum sizes: 44pt (iOS), 48dp (Material), 24×24 CSS px (WCAG 2.2).',
    keyPrinciples: [
      'Put the primary action near the cursor, thumb, or previous step.',
      'Destructive actions: smaller, isolated, never adjacent to the safe action.',
      'Screen edges and corners are “infinite” targets — use them for high-frequency controls.',
      'Respect minimum target sizes — and the spacing between targets too.',
    ],
    realWorldExample: 'iOS places primary controls low for thumb reach — Safari’s address bar moved to the bottom for exactly this reason. Apple Maps’ driving view renders a huge “End” button because a moving user is an imprecise pointer. In enterprise tools, bulk “Delete” next to “Export” in a compact toolbar is a Fitts accident waiting to happen.',
    sayAloud: {
      thirtySec: 'Fitts’s Law: acquisition time scales with distance over size. So I make frequent actions big and close — bottom-of-screen on phones, near the cursor on desktop — and destructive actions small, distant, and isolated. Minimum sizes are constraints: 44 points on iOS, 24 for WCAG.',
      twoMin: 'Fitts’s Law says the time to acquire a target is a function of its distance and size — logarithmic, which means the first improvements in size pay off most. I apply it three ways. First, proximity: the primary action belongs where the hand already is — thumb zone on mobile, near the edited content on desktop. Second, sizing by frequency and consequence: high-frequency targets get generous areas, and destructive actions get deliberate friction — smaller, separated from safe actions, never stacked beside “Save”. Third, geometry: screen edges and corners are effectively infinite targets because the pointer stops at the boundary — that is why system menus live in corners and why FABs hug the edge. And the floor is accessibility: 44-by-44 points per Apple’s HIG, 48dp in Material, 24 CSS pixels minimum in WCAG 2.2 — with spacing, because mis-taps are a size problem too.',
    },
    commonTraps: 'Making everything the same size for visual tidiness and clustering destructive actions beside safe ones. ~ A senior designer allocates size and position by frequency and consequence, and quotes platform minimums as hard constraints.',
    relatedSource: 'Apple HIG, input & touch targets · Material 3 accessibility · WCAG 2.2 SC 2.5.8',
  },
  {
    id: 'hicks-law',
    category: 'Interaction & Cognitive Laws',
    title: "Hick's Law & Choice Reduction",
    eyebrow: 'COGNITIVE PRINCIPLE',
    summary: 'Decision time grows logarithmically with the number and complexity of choices. Reducing visible options, grouping related ones, and providing smart defaults shortens every decision.',
    mentalModel: 'T = b·log₂(n + 1). Reduce n where you can; group and default where you cannot.',
    keyPrinciples: [
      'Count the choices on the screen, not the features in the product.',
      'Defaults are decisions made once, well, on behalf of thousands of moments.',
      'Group related options — chunked menus beat flat long ones.',
      'Do not eliminate choice where judgment is the user’s job; simplify its presentation.',
    ],
    realWorldExample: 'Google Keep obeys the law at capture time: one field, structure later — while a twelve-field “new note” form would tax every idea. Conversely, Jira’s configuration power stays but is reached through grouped, task-oriented sections so administrators never face 70 simultaneous toggles.',
    sayAloud: {
      thirtySec: 'Hick’s Law: decision time grows with the number of choices. My levers are reduce, group, default, and disclose progressively. Capture flows get one box; settings get grouped sections; and sensible defaults decide once so users do not have to decide a thousand times.',
      twoMin: 'Hick’s Law tells me every visible choice costs decision time, logarithmically — going from two to four options hurts more than ten to twelve. So design spends its budget on the moments where the user is deciding, and economises elsewhere. Four levers. Reduce: remove options nobody chooses — check the data. Group: twelve settings in three labelled clusters are perceived as three choices, not twelve. Default: a well-researched default is a gift — most users never change notification granularity or playback quality, so choose well for them. Disclose progressively: expert options one step deeper, as with Camera’s ProRAW. The boundary case matters: where judgment is the user’s actual job — reviewing an AI suggestion, approving a payment — choice must stay legible and slow; simplifying there is a bug, not a courtesy.',
    },
    commonTraps: 'Equating simplicity with whitespace while leaving twelve simultaneous choices on screen. ~ A senior designer counts decisions, not pixels — and uses defaults, grouping, and disclosure to spend the user’s attention wisely.',
    relatedSource: 'Nielsen Norman Group, Hick’s Law · Laws of UX',
  },
  {
    id: 'feedback-states',
    category: 'Interaction & Cognitive Laws',
    title: 'Feedback Loops & System States',
    eyebrow: 'INTERACTION PRINCIPLE',
    summary: 'Every action deserves acknowledgment within about 100 milliseconds, and every object lives through states — default, focus, loading, success, error, empty, offline. Products are experienced as state transitions.',
    mentalModel: 'Intent → action → immediate acknowledgment → progress → outcome → recovery. Design every state, or the user design-invents the meaning of silence.',
    keyPrinciples: [
      'Acknowledge instantly (pressed state), then communicate progress and outcome.',
      'Silence after an action reads as failure or worse — as missing money.',
      'State inventory per component: default, hover/pressed, focus, loading, success, error, empty, offline, permission-denied.',
      'Recovery is part of feedback: undo beats “are you sure?” for reversible acts.',
    ],
    realWorldExample: 'Gmail’s “Undo send” turned an irreversible error into a forgiving loop — the message is held briefly, the user gets a way back, and trust rises without a confirmation dialog on every send. The Masterbook’s form pattern — input → validation → save → failure → recovery → confirmation — is the enterprise version of the same loop.',
    sayAloud: {
      thirtySec: 'Feedback means the system always answers: I heard you, here is what is happening, here is what happened. I inventory every state per component — including loading, empty, error, offline, and denied — because the state nobody designed is where trust leaks. And where an action is reversible, undo beats confirmation.',
      twoMin: 'I model products as state machines, and feedback as the rendering of state transitions. The timing rules: acknowledgment within about a hundred milliseconds — a pressed state or optimistic echo; progress when work takes longer; outcome when it completes; and always a designed path back when it fails. The practical tool is a state inventory per important component: default, focus, pressed, loading, success, error, empty, offline, and permission-denied. The states teams skip are the ones users hit: the retry that duplicates a payment, the form that loses input on error, the spinner over a dead connection. On defensive patterns my rule is: confirm for the irreversible, undo for the reversible, and never interrupt work with a dialog when a toast with undo is enough. Gmail’s undo-send is the canonical proof that forgiveness scales better than warning.',
    },
    commonTraps: 'Showing final mockups of the happy state only, and a generic toast for every failure. ~ A senior designer walks the full state inventory aloud, distinguishes pending from confirmed from failed, and designs recovery into each transition.',
    relatedSource: 'Masterbook Parts I–II · Nielsen Norman Group, visibility of system status',
  },
  {
    id: 'affordances',
    category: 'Interaction & Cognitive Laws',
    title: 'Affordances, Signifiers & Platform Conventions',
    eyebrow: 'INTERACTION PRINCIPLE',
    summary: 'An affordance is what an element can do; a signifier is how the user knows. Interactivity must be perceivable without touching — and it must speak the platform’s convention language.',
    mentalModel: 'Perceivable → predictable → consistent. If users must hover or tap to discover it, it is not signified.',
    keyPrinciples: [
      'Every interactive element must look interactive without interaction.',
      'Follow platform signifiers — iOS chevrons, Android nav patterns, web link conventions.',
      'Icon-only controls need either universal recognition or a label.',
      'Hover is an enhancement, never the sole carrier of meaning.',
    ],
    realWorldExample: 'The Masterbook’s critique of a beautiful interface relying on low-contrast text and hover-revealed actions: keyboard and touch users simply cannot perceive the controls. Apple’s back chevron with the previous screen’s title, and Material’s labelled navigation destinations, show convention doing quiet, reliable work.',
    sayAloud: {
      thirtySec: 'Affordance is what a thing can do; the signifier is how you know. My test: can you tell it is interactive before touching it, and can you predict what happens after? If meaning hides behind hover, low contrast, or mystery icons, the design is withholding information.',
      twoMin: 'I separate two questions on every element. First, the affordance: what actions does this actually support — tap, drag, type? Second, the signifier: what tells the user that before they touch it? Senior design is mostly signifier work: buttons that read as buttons, links that announce destinations, cards that only look tappable when they are. Platform conventions are free signifiers — iOS users know the chevron, web users know underlined links, and breaking those conventions charges users a learning cost that must buy something real. Two rules I enforce: hover never carries sole meaning, because touch and keyboard have none; and icon-only controls must be either universal — search, share, close — or labelled. The test I run is the squint-and-predict: blur the screen, find the interactive elements squinting, then predict aloud what each does. Ambiguity anywhere in that test is a defect.',
    },
    commonTraps: 'Prioritising a clean look over perceivable interactivity — ghost buttons, icon-only menus, hover-only actions. ~ A senior designer treats perceivability as a requirement, uses platform conventions, and charges novelty a usability tax.',
    relatedSource: 'Norman, The Design of Everyday Things · Apple HIG & Material 3 conventions',
  },

  // ══ 6 · Visual Craft & Design Systems ════════════════════════════════════
  {
    id: 'visual-hierarchy',
    category: 'Visual Craft & Design Systems',
    title: 'Visual Hierarchy & Density',
    eyebrow: 'CRAFT DISCIPLINE',
    summary: 'Hierarchy is decision guidance: size, weight, position, grouping, and contrast tell the user what matters now. Density is contextual — enterprise clarity is not synonymous with whitespace.',
    mentalModel: 'For each element: what decision does it support, and in what order should the eye reach it?',
    keyPrinciples: [
      'Rank content by the decision it changes, then make the ranking visible.',
      'One dominant action per view; competing primaries mean an undecided team.',
      'Density follows task frequency and expertise — match rhythm, not fashion.',
      'Grouping is meaning: things placed together claim to be related.',
    ],
    realWorldExample: 'The Masterbook’s dashboard critique: 18 KPI cards above the fold means zero priorities. The senior move is to compress to the three metrics that drive decisions and demote the rest to a detail layer. Apple’s marketing pages show the opposite extreme — one message, one action — tuned to a different task frequency.',
    sayAloud: {
      thirtySec: 'Hierarchy answers “what should I notice first, and why”. I rank content by the decision it supports, then express that ranking with size, weight, position, and grouping. Density is deliberate: a dispatch console earns density; a checkout page earns calm. Eighteen KPI cards is not density — it is indecision.',
      twoMin: 'Craft is decision quality made visible, and hierarchy is its first instrument. My method: list everything on the view, rank it by the decision it changes at this moment, and then check whether the rendering honours the ranking — the biggest, boldest, highest thing is genuinely the most important thing. The failure signals are familiar: two competing primary buttons, body text louder than headings, eighteen KPI cards above the fold. On density I push back on the cliché that clean means empty: density should track task frequency and expertise. A daily-use enterprise console with breathing room everywhere is slow, not elegant; a first-run consumer flow crammed with options is hostile, not efficient. The squint test closes the loop — blurred eyes should still find the primary path in under two seconds.',
    },
    commonTraps: 'Making every KPI, badge, and button equally loud so nothing leads. ~ A senior designer ranks content by decisions, enforces one dominant action per view, and tunes density to task frequency rather than taste.',
    relatedSource: 'Masterbook Part II · Nielsen Norman Group on visual hierarchy',
  },
  {
    id: 'spacing-tokens',
    category: 'Visual Craft & Design Systems',
    title: 'Spacing Systems & 8pt Spatial Tokens',
    eyebrow: 'CRAFT SYSTEM',
    summary: 'A spatial scale (multiples of 4/8) turns ad-hoc margins into rhythm and shared language. Spacing carries meaning — proximity signals relationship — and systems make that meaning consistent.',
    mentalModel: '4pt base → 8, 12, 16, 24, 32, 48, 64. Proximity = relationship. Numbers pick candidates; optical judgment makes the call.',
    keyPrinciples: [
      'Use the scale; reach for the nearest token before inventing a value.',
      'Inside-component spacing smaller than between-group spacing — relationship made visible.',
      'Equal numbers are not always visually equal: apply optical correction.',
      'Tokenise spacing like colour so density and modes can shift systematically.',
    ],
    realWorldExample: 'Material 3’s 4dp grid and Apple’s point system both create platform-wide spatial rhythm. In dense enterprise tables, row padding tunes scan-ability more than font choice — 8px rows read as a ledger, 16px rows as a report; the token choice is a product decision.',
    sayAloud: {
      thirtySec: 'Spacing is a system, not a vibe. I work on a 4-point base scale — 8, 16, 24, 32 — because proximity is meaning: tight groups read as related, wide gaps as separate. The scale picks the candidates; optical judgment makes the final call, especially around type and icons.',
      twoMin: 'The 8-point system exists to turn thousands of micro-decisions into one decision reused. A base unit of four or eight points generates a scale — 4, 8, 12, 16, 24, 32, 48 — and teams agree to reach for scale values before inventing new ones. The benefits compound: components from different teams align on screen, density modes become possible by scaling tokens, and handoff stops being a negotiation about whether the margin was 13 or 14. But I teach the limits too. First, spacing is semantics: the gap inside a card must be smaller than the gap between cards, or grouping breaks. Second, optical judgment beats numerals: a text label and an icon at the same numeric padding never look equal, so the system approves values and the eye approves the result. Tokenise spacing exactly like colour — foundations feeding semantic purposes like “stack-gap” and “section-gap”.',
    },
    commonTraps: 'Nudging pixels until comp review, with every screen using bespoke values. ~ A senior designer runs a tokenised scale, uses proximity to express relationships, and knows when optical correction overrides the number.',
    relatedSource: 'Material 3, layout & spacing · Masterbook Part II · Apple HIG layout',
  },
  {
    id: 'typography-interface',
    category: 'Visual Craft & Design Systems',
    title: 'Typography as Interface',
    eyebrow: 'CRAFT SYSTEM',
    summary: 'Type is the interface’s voice: a deliberate scale communicates rank, line length controls readability, and responsive sizing means the hierarchy survives Dynamic Type and 200% zoom.',
    mentalModel: 'Scale (rank) × line length (45–75 characters) × weight (structure) × responsiveness (relative units).',
    keyPrinciples: [
      'Define a small type scale; two overwhelming sizes beat five almost-equal ones.',
      'Body copy at 45–75 characters per line; card decks at short measures.',
      'Use tabular numerals anywhere digits are compared or scanned.',
      'Set type relatively so layout must survive the largest accessibility sizes.',
    ],
    realWorldExample: 'iOS Dynamic Type: a layout that clips at AX5 has failed its hierarchy obligations — Apple treats text sizing as user settings, not edge cases, so system apps scale structure with it. Enterprise data grids use tabular lining figures so ₹1,00,000 and ₹9,99,999 align for instant comparison.',
    sayAloud: {
      thirtySec: 'Typography carries hierarchy before colour does. I set a small scale with real contrast between levels, keep body text between 45 and 75 characters, use tabular numerals wherever numbers are compared, and build relatively so the design survives Dynamic Type and 200 percent zoom.',
      twoMin: 'I treat type as the primary structural material. First, the scale: a small set of steps with audible contrast — title, headline, body, caption — each with a job, not just a size. Second, measure and rhythm: body copy reads best around 45 to 75 characters; I would rather widen a column than stretch a line. Third, numerals in data get tabular figures so digits align down the column — comparison is the point of a data display. Fourth, responsiveness is a correctness property: sizes set in relative units, containers that grow, and truncation decisions made deliberately with the actual longest strings in German or Hindi. The test that reveals seniority is the largest Dynamic Type size: if “Available balance ₹4,50,000” clips to “₹4,50,…”, the hierarchy was decoration. Structure must survive the user’s own settings.',
    },
    commonTraps: 'Picking sizes by eye per screen, truncating whatever overflows, and treating large-text settings as somebody else’s edge case. ~ A senior designer defines a purpose-driven scale, designs for the longest real strings, and tests at maximum text sizes.',
    relatedSource: 'Apple HIG, typography & Dynamic Type · Material 3 type scale · WCAG 1.4.4',
  },
  {
    id: 'token-architecture',
    category: 'Visual Craft & Design Systems',
    title: 'Semantic Token Architecture',
    eyebrow: 'SYSTEMS PARADIGM',
    summary: 'Design systems are shared product infrastructure: foundations → semantic tokens → components → patterns → documentation → governance → adoption. Tokens name purpose, not appearance.',
    mentalModel: 'Primitive (blue-500) → semantic (surface-danger) → component (button-bg-danger). Change the meaning once; every component follows.',
    keyPrinciples: [
      'Name tokens by purpose — text-muted, surface-danger — never by value.',
      'Semantics enable modes: dark, high-contrast, and brand themes fall out of the architecture.',
      'Avoid token theatre: a variable for every pixel is governance debt, not a system.',
      'Adoption and contribution paths are the system; the library is just its warehouse.',
    ],
    realWorldExample: 'Material 3’s colour roles (primary, surface, error) retheme entire apps for dark mode because components reference roles, not hex values. A “danger action” needs more than a red token — confirmation pattern, permission state, recovery — which is why Atlassian ships danger as a pattern, not a colour.',
    sayAloud: {
      thirtySec: 'Tokens translate decisions into infrastructure. Primitives hold values; semantic tokens hold purpose — surface-danger, text-muted — and components consume the semantic layer. That is what makes dark mode and high-contrast themes nearly free, and it is why I name tokens for meaning, never for the colour they happen to be.',
      twoMin: 'A design system is shared decision-making infrastructure, and tokens are its smallest unit. The architecture runs in layers: primitive tokens are raw values like blue-500; semantic tokens assign purpose — surface-danger, action-primary, text-muted; components bind to the semantic layer only. The payoff is leverage: dark mode, high-contrast, or a rebrand becomes a remap of meanings rather than a thousand-component surgery. Two disciplines matter. Naming: a token called “red” lies the day the theme changes; a token called “danger” survives. Restraint: a variable for every pixel is token theatre — each token is a public API with maintenance cost, so I add one when a real decision needs to propagate. And the system is not done at the library: contribution rules, versioning, deprecation policy, and adoption metrics are the difference between infrastructure and a sticker sheet.',
    },
    commonTraps: 'Measuring the system by component count and variables created — the Masterbook calls the component count vanity. ~ A senior designer tracks adoption, defects, and delivery speed, and ships semantics with governance, not just a palette.',
    relatedSource: 'Material 3 design tokens · Masterbook Part III · Atlassian Design tokens',
  },
  {
    id: 'component-apis',
    category: 'Visual Craft & Design Systems',
    title: 'Component APIs & States',
    eyebrow: 'SYSTEMS ENGINEERING',
    summary: 'A component’s public interface — its props, states, and composition rules — determines what every team can build. Good APIs make valid states easy and contradictory states impossible.',
    mentalModel: 'Reuse → extend → create → fork → deprecate. Decide with: does the need differ semantically, or only in content?',
    keyPrinciples: [
      'Props should encode intent: isLoading, tone="danger", not style hooks.',
      'Enumerate states in the API — error, empty, disabled, loading — so no team improvises them.',
      'Document inputs, keyboard behaviour, error cases, and adoption criteria together.',
      'Forking is allowed with a convergence plan; silent forks are system decay.',
    ],
    realWorldExample: 'A Button whose API includes isLoading and isDisabled prevents the classic shipped bug: a double-submitted payment. Atlassian’s system publishes decision trees — when to reuse, extend, or create — so a new component is a governed act. Figma-side, variant properties mirror the same contract for designers.',
    sayAloud: {
      thirtySec: 'A component API is a design decision about what teams can express. I encode intent — isLoading, tone danger — and enumerate states so errors and empties are designed once, centrally. The ladder is reuse, extend, create, fork, deprecate — and a fork always carries a convergence plan.',
      twoMin: 'When I evaluate or design a component, I read its API before its pixels. The API’s job is to make valid states easy and contradictory states hard: a Button cannot be loading and idle simultaneously if the enum is single-valued; a form field exposes errorMessage rather than asking every team to restyle red borders. States are part of the contract — default, focus, loading, success, error, empty, disabled — designed once in the system instead of improvised in forty product teams. For evolution I use the Masterbook ladder: reuse when content differs but meaning does not; extend for a legitimate variant; create when the interaction is semantically distinct — forcing a tab to be a dropdown corrupts both; fork only with a dated convergence plan; deprecate with a migration path. Figma variants, code props, and documentation must describe the same contract, or the system has two truths.',
    },
    commonTraps: 'Exposing raw style props and letting each team invent error states — forty subtly different failure modes. ~ A senior designer ships intent-based APIs, enumerated states, and governed evolution with deprecation plans.',
    relatedSource: 'Masterbook Part III · Atlassian Design component guidance · Figma component best practices',
  },

  // ══ 7 · Accessibility & Universal Design ═════════════════════════════════
  {
    id: 'wcag-defaults',
    category: 'Accessibility & Universal Design',
    title: 'WCAG 2.2 AA as a Design Default',
    eyebrow: 'INCLUSIVE STANDARD',
    summary: 'Accessibility runs from discovery to implementation QA — perceivable, operable, understandable, robust. The senior move is encoding AA rules into components and defaults, so compliance is inherited.',
    mentalModel: 'POUR: Perceivable · Operable · Understandable · Robust → encoded into component rules → verified in flows → QA’d in builds.',
    keyPrinciples: [
      'Keyboard-complete flows with visible focus — every destination reachable and perceivable.',
      'Text contrast 4.5:1 body / 3:1 large; targets at least 24px (design to 44).',
      'Errors are identified, described, and suggest a fix — colour alone never convicts a field.',
      'Accessibility checked “at the end” means accessibility shipped never; put it in components.',
    ],
    realWorldExample: 'GOV.UK’s design system is the reference implementation: components ship with accessible markup, error-summary patterns, and plain-language rules, so hundreds of services inherit compliance. WCAG 2.2 added the designer-relevant criteria: 24px minimum targets, no dragging-only interactions, and accessible authentication without cognitive-function tests.',
    sayAloud: {
      thirtySec: 'I treat WCAG 2.2 AA as a floor built into defaults, not a checklist before launch. Keyboard-complete flows, visible focus, 4.5 to 1 contrast, real target sizes, errors that say what to fix — if these live in the components, every team inherits them instead of rediscovering them.',
      twoMin: 'The POUR principles — perceivable, operable, understandable, robust — become practical when they are encoded where decisions are made: the design system. My component rules: every interactive element keyboard-reachable with a visible focus indicator; contrast at 4.5:1 for text and 3:1 for large text and UI boundaries; target sizes designed at 44 points even though 2.2 sets a 24-pixel floor; error handling that identifies the field, says what is wrong, and suggests the fix — never red alone. WCAG 2.2 added things designers specifically own: alternatives to dragging, consistent help locations, and authentication that does not demand memory tests. Then verification happens at two altitudes: flow review in design — walking the task with keyboard and screen reader — and QA in implementation, because intent decays in code. The mature position: accessibility is a quality dimension of every story, not a phase.',
    },
    commonTraps: '“We check WCAG at the end” plus a contrast plugin screenshot. ~ A senior designer embeds criteria in components and acceptance tests, and can walk a complete task by keyboard and screen reader on demand.',
    relatedSource: 'W3C WCAG 2.2 · GOV.UK Design System accessibility · WAI resources',
  },
  {
    id: 'dynamic-type',
    category: 'Accessibility & Universal Design',
    title: 'Dynamic Type, Zoom & Reflow',
    eyebrow: 'ADAPTIVE LAYOUT',
    summary: 'Text sizing is a user setting, not an edge case. Layouts must survive WCAG’s 200% zoom, 400% reflow at 320px width, and iOS accessibility text sizes — without clipping, overlap, or two-dimensional scrolling.',
    mentalModel: 'Relative sizes + growing containers + deliberate truncation. Test with the largest size and the longest real string.',
    keyPrinciples: [
      'Set type and spacing relatively; containers grow with content.',
      'Reflow at 320 CSS px with no two-dimensional scrolling (WCAG 1.4.10).',
      'Truncation is a decision: what may clip, with what affordance to see the rest.',
      'Test largest text + longest real language strings together.',
    ],
    realWorldExample: 'Apple’s largest Dynamic Type size turns a tidy Settings row into a stress test — chevrons, values, and labels must re-wrap, not collide. A banking app that clips “Available balance ₹4,50,000” to “₹4,50,…” at 200% zoom fails WCAG 1.4.4 and the user’s trust simultaneously.',
    sayAloud: {
      thirtySec: 'Text size belongs to the user. So I build with relative units and containers that grow, verify reflow at 320 pixels without horizontal scrolling, and make truncation a deliberate decision. The exam question is always: what does this screen do at the largest accessibility type size?',
      twoMin: 'Dynamic Type thinking starts from respect: the person who sets enormous text needs the interface more, not less. Engineering-wise: type and spacing in relative units, min-heights instead of fixed heights, and layouts that re-wrap rather than clip. The WCAG checkpoints are concrete — 200 percent zoom without loss of content or function, and reflow at 320 CSS pixels so nobody scrolls in two directions to read a sentence. Then the judgment calls. Truncation: decide what may shorten — titles yes, balances never — and provide the expansion affordance. Content realism: test the largest size together with the longest real strings; German compound nouns and Hindi translations break layouts English mock data hides. On iOS I check the accessibility sizes specifically, because that is where Apple’s own apps prove their priorities. Large text is not the edge case of the design; it is the audit of its hierarchy.',
    },
    commonTraps: 'Designing at default zoom in a desktop browser, then filing clipping bugs as QA polish. ~ A senior designer specifies reflow and truncation behaviour in the design itself and reviews builds at maximum text size.',
    relatedSource: 'Apple HIG, Dynamic Type · WCAG 2.2 SC 1.4.4 & 1.4.10 · Masterbook Part VI',
  },
  {
    id: 'contrast-signals',
    category: 'Accessibility & Universal Design',
    title: 'Contrast & Non-Colour Signalling',
    eyebrow: 'PERCEPTION DESIGN',
    summary: 'Colour is a supporting channel, never the message itself. State — error, success, selection — must be perceivable through at least two channels: colour plus icon, text, pattern, or position.',
    mentalModel: 'Every state: at least two of [hue, icon, text, pattern, position]. Reserve strong colour for state, emphasis, and brand.',
    keyPrinciples: [
      'Contrast ratios are floors: 4.5:1 text, 3:1 graphics and focus indicators.',
      'Errors need icon + message, not a redder border.',
      'Data visualisation encodes in shape, label, and texture before hue.',
      'Strong colour is a scarce resource — spend it on meaning.',
    ],
    realWorldExample: 'A form that marks an invalid field with only a red outline is invisible to colour-blind users and silent to screen readers; “Payment failed — card ending 4242 was declined” with an icon and focus moved to the message works for everyone. Material’s data-viz guidance adds direct labels and patterns so charts survive greyscale printing and low vision.',
    sayAloud: {
      thirtySec: 'Colour must never be the only signal. Every state — error, success, selected — gets a second channel: icon, text, pattern, or position. Contrast floors are 4.5 to 1 for text and 3 to 1 for graphics. And restraint matters: strong colour spent everywhere means it signifies nothing.',
      twoMin: 'My rule is every state speaks at least twice. Take error: red hue is channel one; an icon, an explicit message with a suggestion, and programmatic association to the field are the channels that make it robust. The same logic runs everywhere — selected rows get a check or weight shift, not just a tint; chart series get shapes, dashes, or direct labels, never hue alone; focus gets a visible indicator at 3-to-1 against adjacent colours. Contrast numbers are floors, not targets: 4.5:1 for body text, 3:1 for large text and meaningful graphics. And there is a craft corollary the Masterbook states plainly: strong colour is for state, emphasis, and brand purpose — when everything shouts, nothing is a signal. The audits are cheap: check the greyscale screenshot, run the contrast checker, and view the flow with a colour-vision-deficiency simulator.',
    },
    commonTraps: 'Pale-grey secondary text, red-only errors, and rainbow charts — legible in the portfolio, unusable in the sun. ~ A senior designer designs the two-channel rule into components and audits contrast and CVD simulation on every flow.',
    relatedSource: 'WCAG 2.2 SC 1.4.1, 1.4.3, 1.4.11 · Material 3 accessible data visualisation',
  },
  {
    id: 'screen-readers',
    category: 'Accessibility & Universal Design',
    title: 'Screen Readers, Focus & Live Regions',
    eyebrow: 'ASSISTIVE TECHNOLOGY',
    summary: 'A screen reader experiences your product as a linear, semantic document: headings, landmarks, labels, and announcements. Design that reading order — and the async announcements — as deliberately as the pixels.',
    mentalModel: 'Semantic structure (heading/landmark/label) + focus management (where focus goes on change) + live regions (what gets announced, politely vs assertively).',
    keyPrinciples: [
      'Every control needs an accessible name; every icon-button reveals its action in words.',
      'Dialogs and toasts move focus deliberately — in on open, back on close.',
      'Async updates announce via live regions: polite by default, assertive for emergencies.',
      'If you have never completed the task in VoiceOver or NVDA, you have not designed it.',
    ],
    realWorldExample: 'An AI answer streaming into a chat must be announced without monopolising the reader — a polite live region plus a “response ready” summary beats announcing every token. A toast that vanishes before its announcement completes is a message only sighted users receive; iOS’s VoiceOver rotor and GOV.UK’s error-summary focus pattern are the working references.',
    sayAloud: {
      thirtySec: 'Screen-reader design is information architecture for the ear: headings, landmarks, labels, and announcements. I design focus order, accessible names, and live-region behaviour as part of the spec — and I validate by actually completing the flow with VoiceOver, not by reading markup.',
      twoMin: 'A screen reader linearises the page, so the design questions change. Structure first: is there a heading outline worth navigating by, landmarks that skip the repetitive chrome, and an accessible name on every control — “Save draft”, never “button”. Then focus: when a dialog opens, focus moves inside it and returns to the trigger on close; when content is deleted or replaced, focus lands somewhere sensible rather than evaporating to the top of the document. Then announcements: asynchronous changes — a form saved, an AI response streaming, a price updated — need live regions with judged politeness: polite for progress, assertive for failure that costs money or data, and summaries instead of token-by-token narration for long streams. My validation is behavioural: one complete task per flow using VoiceOver or NVDA, keyboard only, eyes closed for the hard parts. If I cannot do it, I have not finished designing it.',
    },
    commonTraps: 'Bolting aria-labels onto a div-built UI after the fact and calling it access. ~ A senior designer specs semantics, focus order, and announcement behaviour up front and verifies with a real assistive-technology pass.',
    relatedSource: 'WAI-ARIA Authoring Practices · Apple VoiceOver guidance · GOV.UK testing with assistive tech',
  },

  // ══ 8 · Product Analytics & Metrics ══════════════════════════════════════
  {
    id: 'heart-framework',
    category: 'Product Analytics & Metrics',
    title: 'The HEART Framework',
    eyebrow: 'MEASUREMENT FRAMEWORK',
    summary: 'Google’s HEART model organises UX measurement into Happiness, Engagement, Adoption, Retention, and Task Success. The discipline is choosing one or two per feature — never all five.',
    mentalModel: 'Goal → Signal → Metric, applied per HEART category. A metric without its goal and signal is a number looking for meaning.',
    keyPrinciples: [
      'Choose the category that matches the feature’s purpose — Task Success for flows, Adoption for launches.',
      'Walk Goal → Signal → Metric out loud so everyone sees the reasoning chain.',
      'Task Success for search-ish work: completion, time, errors — not raw volume.',
      'Treating engagement as universal value is the classic HEART misuse.',
    ],
    realWorldExample: 'For Google Search the goal is not “more searches” — query volume rises when people fail to find things. Task-success metrics (successful sessions, time-to-result, reformulation rate) aligned to the actual goal. For a new feature launch, leading with Adoption and Task Success beats leading with Happiness surveys churned once.',
    sayAloud: {
      thirtySec: 'HEART gives me five lenses — happiness, engagement, adoption, retention, task success — but the skill is choosing one or two that match the feature’s job, then walking goal to signal to metric. For a checkout, task success; for a launch, adoption. All five is a dashboard, not a strategy.',
      twoMin: 'HEART stops metrics debates from becoming opinion wars. The categories: Happiness — attitudes like satisfaction; Engagement — depth of use; Adoption — new users gaining value; Retention — continued value over time; Task Success — efficiency and completion. I pick deliberately: a redesigned flow gets Task Success — completion, time-on-task, error rate; a new capability gets Adoption first, Retention once we believe value lands. Then the Goal–Signal–Metric chain makes it concrete. Goal: users resolve issues without an agent. Signal: they find the answer article and leave satisfied. Metric: percentage of help sessions ending without a ticket, validated with a follow-up survey for honesty. Two cautions I state in interviews: engagement is not value — time-in-app rising on a failing flow is failure; and every HEART metric needs its segment and time window named, or the average will lie to you.',
    },
    commonTraps: 'Naming all five categories and calling it a measurement plan, with engagement implied as universal value. ~ A senior designer selects categories by the feature’s purpose, traces Goal→Signal→Metric explicitly, and names the segment and window.',
    relatedSource: 'Google HEART framework (Rodden, Hutchinson, Fu) · Masterbook metrics chapter',
  },
  {
    id: 'input-output-metrics',
    category: 'Product Analytics & Metrics',
    title: 'Input vs Output Metrics & the North Star',
    eyebrow: 'MEASUREMENT DISCIPLINE',
    summary: 'Output metrics (retention, resolutions) tell you outcomes happened — lagging and hard to move directly. Input metrics (drafts created, invites sent) are behaviours teams can move that plausibly drive the output.',
    mentalModel: 'North Star = value delivered repeatedly. Inputs (controllable behaviours) → Output (lagging outcome). Never steer by the output alone.',
    keyPrinciples: [
      'The North Star should measure user value, not business activity — MAU is activity.',
      'Pick inputs with a defensible causal story to the output.',
      'Outputs are for verification; inputs are for steering.',
      'When input rises and output does not, the causal story was wrong — revisit it.',
    ],
    realWorldExample: 'Jira Service Management: the output is faster, correct incident resolution; steerable inputs include knowledge articles viewed before ticket creation, first-response time, and reopen rate. Tracking resolution time alone made agents close tickets prematurely — input chosen without a quality story corrupted the behaviour it measured.',
    sayAloud: {
      thirtySec: 'Outputs verify, inputs steer. Retention and resolution quality lag by weeks; teams need daily levers — drafts created, articles viewed, invites accepted — each with a causal story to the outcome. And the North Star must encode user value delivered repeatedly, or you are measuring activity.',
      twoMin: 'I structure measurement in two layers. The output layer is the outcome we owe — retention, successful resolutions, completed applications — honest but slow, and impossible to move by willpower. The input layer is behaviour we can change this sprint: searches completed with a result clicked, drafts created, invites sent, time-to-first-value. Each input carries a defensible “because” to the output: users who read a knowledge article file fewer, better tickets; therefore we design to surface articles at the moment of ticket creation. The North Star sits above: value delivered repeatedly — nights booked, documents collaborated on — never raw activity like sign-ups. The diagnostic habit is the senior part: when inputs climb and outputs stall, the causal model was wrong, and I say so and change the model rather than doubling down. Metrics are a theory of the product; be ready to revise the theory.',
    },
    commonTraps: 'Reporting MAU and sign-ups as product health, with no mechanism linking team actions to outcomes. ~ A senior designer chains inputs to outputs with explicit causal stories and abandons inputs whose stories fail.',
    relatedSource: 'Masterbook metrics chapter · Amplitude North Star playbook',
  },
  {
    id: 'guardrail-metrics',
    category: 'Product Analytics & Metrics',
    title: 'Guardrails & Misleading Metrics',
    eyebrow: 'MEASUREMENT DEFENSE',
    summary: 'A metric can improve while the product gets worse. Every success metric needs a guardrail that must not degrade — errors, complaints, latency, rework — and a plausible-explanations drill before celebrating.',
    mentalModel: 'Success metric + guardrail metric + three plausible explanations + next evidence. Interpretation before celebration.',
    keyPrinciples: [
      'Pair every “win” metric with what it might be costing — the guardrail.',
      'Ask for three plausible explanations of any movement, including uncomfortable ones.',
      'Vanity metres rise while value falls: component counts, page views, acceptance rates.',
      'Before/after comparisons do not establish causation — cohorts and windows matter.',
    ],
    realWorldExample: 'Straight from the Masterbook drills: conversion up 20% while 30-day retention falls; AI acceptance-rate rising after citations were hidden; onboarding completion up after an explanatory step was removed. Each “win” is compatible with a worse product — accepting blindly, clicking without understanding, learning less.',
    sayAloud: {
      thirtySec: 'Guardrails exist because metrics lie upward. Conversion rises while retention falls; AI acceptance rises after we hide citations. So every success metric ships with a guardrail that must not degrade, plus the discipline of three plausible explanations before we claim a win.',
      twoMin: 'The Masterbook line I quote constantly: a metric can improve while the product gets worse. So I never let a success metric travel alone. The pattern: define the win, attach the guardrail — error rate, complaints, rework, latency, accessibility regressions — and pre-agree that a win with a broken guardrail is not a win. Then the interpretation drill, which is where seniority shows: three plausible explanations before celebration. Search click-through rose? Maybe results got better; maybe the first result became misleading enough to require clicks; maybe a bot segment grew. Each explanation demands different next evidence — reformulation rate, dwell distribution, cohort split. Causation deserves my scepticism too: a before/after lift during a marketing push is not a design win. And I am explicit about vanity: the design system’s component count, page views, and unexamined acceptance rates all rise most easily exactly when they mean least.',
    },
    commonTraps: 'Celebrating a moved metric and designing the next dashboard. ~ A senior designer ships success-and-guardrail pairs, runs the three-explanations drill, and names what evidence would change the interpretation.',
    relatedSource: 'Masterbook metric interpretation drills · Google experimentation culture writings',
  },
  {
    id: 'cohort-retention',
    category: 'Product Analytics & Metrics',
    title: 'Cohort Retention & Business Literacy (LTV/CAC)',
    eyebrow: 'BUSINESS LITERACY',
    summary: 'Aggregates hide decay; cohorts reveal it. Retention by signup cohort shows whether the product keeps its promises, and LTV against CAC connects design quality to whether the business can afford its growth.',
    mentalModel: 'Cohort table (signup week × weeks since) → retention curve shape. Viable business: LTV meaningfully > CAC, with payback the team can survive.',
    keyPrinciples: [
      'Always read retention by cohort — a healthy average can hide a dying newest cohort.',
      'A flattening curve means durable value; a cliff means an onboarding or expectation problem.',
      'Design moves retention through activation quality, not just acquisition volume.',
      'Know your funnel economics well enough to discuss LTV:CAC and payback honestly.',
    ],
    realWorldExample: 'The drill pattern: onboarding completion rose after deleting an explanation step — but the week-4 cohort retained worse. Completion was vanity; the removed step was doing expectation-setting work. Slack’s famous retention discipline — teams hitting message-count thresholds retained — is the canonical activation-cohort story.',
    sayAloud: {
      thirtySec: 'Averages flatter; cohorts tell the truth. I read retention as signup-week by weeks-alive: a curve that flattens means real value, a cliff means broken expectations. And LTV versus CAC is the translation layer — it tells the business whether our design quality is worth what growth costs.',
      twoMin: 'Cohort analysis is my antidote to vanity aggregates. The table is simple — rows of signup weeks, columns of weeks-since-signup — and the questions are sharp: does each new cohort retain better than the last, does the curve flatten at a healthy level, and where exactly is the cliff. The cliff location is diagnostic: day-one cliffs are expectation problems — the marketing promised what the product is not; week-two cliffs are habit problems — value never became routine. That is design territory: activation quality, time-to-first-value, honest onboarding. The Masterbook drill captures it — completion metrics rose when we removed an explanation step, and the week-four cohort quietly degraded. Business literacy closes the loop: LTV is what a retained customer is worth, CAC is what acquiring one costs, and the ratio decides whether a growth idea is a strategy or a bonfire. A senior designer can sit in that conversation and contribute, not spectate.',
    },
    commonTraps: 'Quoting blended retention and celebrating sign-up spikes as health. ~ A senior designer reads cohort curves, locates the cliff, ties it to product causes, and discusses LTV/CAC trade-offs with straight faces and numbers.',
    relatedSource: 'Masterbook metrics chapter · a16z/Reforge essays on retention & cohort analysis',
  },

  // ══ 9 · AI & Nondeterministic UX ═════════════════════════════════════════
  {
    id: 'grounding-citations',
    category: 'AI & Nondeterministic UX',
    title: 'Grounding, Sources & Freshness',
    eyebrow: 'AI TRUST PATTERN',
    summary: 'An AI answer is only as trustworthy as what it can see. Ground output in retrievable sources, show those sources and their age, and make the system’s blind spots explicit before users discover them.',
    mentalModel: 'Grounding: what did the model read, when was it updated, what can it NOT see? Show sources where they materially affect trust.',
    keyPrinciples: [
      'Citations must resolve to specific, inspectable passages — not decorative link farms.',
      'Display freshness: “from your March report” is different from an undated claim.',
      'State blind spots: files not indexed today, systems without access.',
      'Ungrounded fluency is a hallucination delivery channel — constrain or label it.',
    ],
    realWorldExample: 'The Masterbook’s AI research assistant must show its working: cited documents with dates, and honest statements like “I cannot see files created today”. Google’s AI Overviews and enterprise copilots over a 50,000-file workspace live or die on this — a citation to last year’s policy is worse than no answer when payroll depends on it.',
    sayAloud: {
      thirtySec: 'Grounding means the answer shows its foundation: which sources, how fresh, and what the system cannot see. I make citations inspectable down to the passage, timestamp everything, and state blind spots up front — because users calibrate trust from the first answer that surprises them.',
      twoMin: 'When an AI feature answers consequential questions, I design its epistemics before its chat bubble. Grounding is the contract: the model responds from retrievable material, not from parametric memory improvisation. That contract becomes interface in four places. Sources: every consequential claim carries a citation that opens the exact passage — a link to a 40-page PDF is governance theatre. Freshness: sources show their age, because two-year-old policy is a different answer than last week’s. Blind spots: the system declares what it cannot access — files indexing, systems without permission — before the user trips over them. And containment: where grounding coverage is thin, the interface narrows what the assistant may claim, or labels the answer as ungrounded generation. The failure I am designing against is calibration loss: one confident, wrong, citation-free answer teaches users to verify everything elsewhere, and the feature’s value collapses to zero.',
    },
    commonTraps: 'A fluent chat UI with a footnote saying “AI can make mistakes” — disclosure as liability text. ~ A senior designer builds inspectable grounding: passage-level citations, source dates, declared blind spots, and constrained claims when coverage is thin.',
    relatedSource: 'Masterbook Part IV · Google People + AI Guidebook (confidence & sources)',
  },
  {
    id: 'confidence-thresholds',
    category: 'AI & Nondeterministic UX',
    title: 'Confidence, Thresholds & Calibrated Trust',
    eyebrow: 'AI TRUST PATTERN',
    summary: 'Probabilistic output arrives with a confidence distribution, and different confidence deserves different UI. Design the thresholds: when to act, when to propose for review, when to stay silent or ask.',
    mentalModel: 'High confidence → act with undo · Medium → propose for human review · Low → ask, narrow, or defer. Never fake certainty with polished language.',
    keyPrinciples: [
      'Define the threshold bands with engineering; then design an interaction per band.',
      'A bare percentage without calibration is decoration — show confidence via behaviour and structure instead.',
      'Consequences set the bar: financial or safety actions demand higher thresholds and human approval.',
      'Fluency is not correctness — polish increases unwarranted trust.',
    ],
    realWorldExample: 'The Masterbook’s banking copilot: hallucination could cause financial loss, so low-confidence or money-moving intents route to deterministic flows or a human — with an explanation of why. Gmail’s spam filter is the quiet analogue: high confidence files silently, borderline lands in spam for review, and the thresholds are tuned product decisions.',
    sayAloud: {
      thirtySec: 'Confidence should change the interface, not just a tooltip. High confidence acts with undo; medium proposes for review; low confidence asks, narrows, or hands off. And the consequence of error sets the threshold — money and safety demand human approval regardless of the score.',
      twoMin: 'Probabilistic systems need explicit trust engineering. First I work with engineering on what the confidence actually means — calibrated against held-out data, not a vibe from the model — then we define bands: above the top threshold the system acts and offers undo; the middle band proposes for review with the reasoning visible; below the floor it asks a clarifying question, narrows its scope, or defers to a deterministic path or a person. Two rules keep this honest. Consequence governs: the same 85% score is plenty for a playlist recommendation and nowhere near enough for moving money — so thresholds are set per action class, not per model. And presentation must not outrun calibration: a raw percentage implies precision nobody validated, so I show confidence through structure — “here are three possibilities” versus “here is the answer” — and through behaviour like review queues. The tell of bad AI design is fluent language smoothing over a 60% guess.',
    },
    commonTraps: 'Bolting “92% confident” onto every answer with no calibration work and no behavioural difference between bands. ~ A senior designer co-defines calibrated thresholds per consequence class and gives each band a distinct interaction.',
    relatedSource: 'Google People + AI Guidebook · Masterbook Part IV',
  },
  {
    id: 'human-authority',
    category: 'AI & Nondeterministic UX',
    title: 'Human-in-the-Loop & Authority Boundaries',
    eyebrow: 'AI GOVERNANCE',
    summary: 'Design the boundary: what the model may infer, what it may propose, what a human must confirm, and what the system enforces deterministically. Suggestion is not state; authority remains with people and rules.',
    mentalModel: 'Suggest → review → approve → commit. The model drafts; the person decides; the deterministic system validates permissions and records.',
    keyPrinciples: [
      'Draw the authority map first: infer / propose / confirm / enforce are different lanes.',
      'Consequential actions need structured confirmation, not a chat “yes”.',
      'The authoritative system re-checks permissions and rules at commit time.',
      'Undo and audit trails are part of the authority design, not admin extras.',
    ],
    realWorldExample: 'Jira Service Management’s AI drafts a resolution and suggests closing a ticket — the agent reviews, edits, approves; the system independently validates SLA state and permissions before anything commits. The Masterbook’s banking copilot goes further: money movement is never in the model’s lane, however confident it sounds.',
    sayAloud: {
      thirtySec: 'My rule: AI proposes, authority is designed. I map the lanes — what the model infers, what it proposes, what a human confirms, and what the deterministic system enforces. The model can draft the resolution; it cannot close the ticket, move the money, or bypass the permission check.',
      twoMin: 'Before any AI interaction detail, I draw the authority boundary with the team, using four lanes. Infer: what the model may conclude from data — summarise the thread, classify the ticket. Propose: what it may stage for a human — draft a reply, pre-fill a form, suggest closing. Confirm: what only a person finalises — send, close, approve, pay. Enforce: what the deterministic system guarantees regardless of the model — permissions, transaction rules, audit logging. The design consequences follow. Suggestions look staged — editable, clearly attributed, one step from acceptance — never like committed state. Confirmations for consequential actions are structured: what exactly will change, shown before the button. And the safety net is engineered at commit time: the system re-validates authority server-side, because the model’s enthusiasm is not a permission. When I describe this in an interview, the sentence that matters is: the model can suggest this; the product must independently validate that.',
    },
    commonTraps: 'Letting the model “just do it” for flow, then scrambling for an undo button after the first incident. ~ A senior designer ships an explicit authority map with staged suggestions, structured confirmation, server-side enforcement, and audit trails.',
    relatedSource: 'Masterbook Part IV · Atlassian AI design guidance · NIST AI RMF',
  },
  {
    id: 'hallucination-recovery',
    category: 'AI & Nondeterministic UX',
    title: 'Hallucination, Memory & Failure Recovery',
    eyebrow: 'AI RESILIENCE',
    summary: 'AI systems fail in new shapes: hallucination, stale context, partial output, refusal, wrong memory. Design the fallback, the correction path, and the honest empty state — because the failures are the product too.',
    mentalModel: 'Failure catalogue → fallback (search / deterministic flow / human escalation / manual entry) → correction (fix the context) → undo → evaluation loop.',
    keyPrinciples: [
      'Enumerate the failure shapes first: hallucination, stale context, latency, refusal, partial output.',
      'Every AI path needs a non-AI fallback users can reach in one step.',
      'Let users inspect and correct what the system remembers — memory without editing is a liability.',
      'Measure outcomes: correctness, accept/edit rates, escalation — not response engagement.',
    ],
    realWorldExample: 'The Masterbook’s meeting assistant with months of memory must show what it remembers and let users strike wrong “facts” — otherwise a single misremembered decision poisons every future summary. Similarly, an assistant over stale enterprise data timestamps its claims; when uncertain, it falls back to search results and says so.',
    sayAloud: {
      thirtySec: 'I design AI failures as first-class flows. Catalogue the shapes — hallucination, stale context, partial output, refusal; give each a fallback one step away; let users correct the system’s memory; and measure outcomes like correctness and edit-accept rates, not how chatty the session was.',
      twoMin: 'Nondeterministic products need failure design at the same fidelity as success design. Step one is the catalogue: hallucination — confident invention; stale context — acting on outdated facts; partial output — truncated or derailed generation; refusal — the model declining something legitimate. Step two, fallbacks with zero dead ends: search results when synthesis fails, a deterministic form when generation is risky, human escalation with full context carried across, and manual entry always available. Step three, memory governance, because persistent assistants accumulate error: the user can inspect what is remembered, correct it, set expiry, and delete — a wrong memory silently shapes every later answer. Step four, evaluation that matches the product claim: correctness on sampled outputs, accept-versus-edit rates, escalation rates, task completion — explicitly not “users kept chatting”. The Masterbook’s line sets the bar: fluent output is not necessarily correct, and recovery quality distinguishes mature products.',
    },
    commonTraps: 'A polished assistant demo with no failure states; the first hallucination in production becomes the support team’s problem. ~ A senior designer ships the failure catalogue, reachable fallbacks, memory correction, and outcome-based evaluation as launch requirements.',
    relatedSource: 'Masterbook Part IV · Google PAIR Guidebook, error handling patterns',
  },

  // ══ 10 · Technical Literacy for Designers ════════════════════════════════
  {
    id: 'apis-contracts',
    category: 'Technical Literacy for Designers',
    title: 'APIs, REST & GraphQL as Design Material',
    eyebrow: 'TECHNICAL FLUENCY',
    summary: 'An API is a contract: what data exists, in what shape, at what cost, failing how. Designers who read contracts design honest loading, errors, and permissions; designers who don’t design fiction.',
    mentalModel: 'Contract: fields? freshness? cost? errors? permissions? REST: resource-shaped calls. GraphQL: client-shaped responses — loading partials and errors become UX decisions.',
    keyPrinciples: [
      'Ask what the API can actually return before drawing: nulls, missing fields, pagination.',
      'Every error class gets a designed response — 401 vs 403 vs 404 vs 500 mean different UX.',
      'Over-fetching wastes; under-fetching flickers — GraphQL shapes change loading design.',
      'Rate limits and expensive queries are design constraints, not engineering trivia.',
    ],
    realWorldExample: 'The Masterbook drill: the API cannot return a total result count cheaply — so “Page 1 of 4,213” becomes “Next”, count-free filters, and honest copy. Enterprise permission checks evaluated server-side can change mid-session — the UI must handle a denied action after a permitted-looking click.',
    sayAloud: {
      thirtySec: 'APIs design my screens before I do: the fields, the nulls, the errors, the costs. I ask what comes back and how it fails — a 403 is a designed state, not a crash. And GraphQL’s shaped responses mean I design partial loading and field-level errors deliberately.',
      twoMin: 'Technical literacy starts with reading the contract. For any screen I ask five questions of the API: What fields exist, and which can be null — because null-state design is where mockups lie. How fresh is the data, and at what query cost. How it errors — authentication expired, permission denied, object gone, server down — four different user experiences, four different designs. How it paginates. And what is rate-limited or expensive, because that decides whether autocomplete is a feature or an incident. REST versus GraphQL changes the design surface: REST delivers fixed resource shapes — often over-fetching, sometimes needing three calls per screen; GraphQL lets the client name its fields — one request, but partial errors become normal, and the loading model is per-field. The Masterbook drills are my practice: no cheap total count redesigns pagination; server-side permissions redesign button states; and every one of those conversations earns engineering trust because the design already respects the contract.',
    },
    commonTraps: 'Handing off pixel mocks then discovering the data does not exist, the count is unaffordable, or the error case crashes the layout. ~ A senior designer designs from the contract: nulls lifted into the UI, error classes mapped, costs converted into constraints.',
    relatedSource: 'Masterbook Part III · GraphQL Foundation guides · REST API design guidance',
  },
  {
    id: 'caching-stale',
    category: 'Technical Literacy for Designers',
    title: 'Caching, Stale Data & Eventual Consistency',
    eyebrow: 'TECHNICAL FLUENCY',
    summary: 'Speed often means showing data that might be old. Caching is a product decision: label freshness, offer refresh, and design for the moment two different truths exist at once.',
    mentalModel: 'Every read: how old can this be, and who would be hurt by staleness? Design: freshness labels, refresh affordances, conflict states.',
    keyPrinciples: [
      'Staleness tolerance varies by content: profile photos can lag; balances cannot.',
      'Show the data’s age when staleness has consequences (“updated 4 min ago”).',
      'Two users editing offline guarantees a conflict someday — design the merge surface now.',
      'Eventual consistency means “different truths for a while” — say so where it matters.',
    ],
    realWorldExample: 'The Masterbook drill: a real-time dashboard that can only refresh every five minutes must stop implying live truth — label the age, add manual refresh, and dim exactly the stale regions. Collaborative editors like Google Docs show the cured version: presence indicators and “edited by X just now” make consistency visible.',
    sayAloud: {
      thirtySec: 'Caching is a UX decision about truth age. I ask per screen: how stale can this safely be, and who suffers if it lies? Then I design the evidence — updated-two-minutes-ago labels, refresh affordances, and conflict surfaces for when two edits meet. A five-minute-old dashboard that looks live is a design lie.',
      twoMin: 'Every cached read is a promise about how old the truth may be, and designers make that promise whether they know it or not. My per-screen audit: what is the data’s staleness tolerance — a profile photo tolerates days, a bank balance tolerates nothing, an analytics chart tolerates its refresh cycle — and the interface must communicate exactly that tolerance: “updated 4 min ago”, a refresh control, a skeleton on reload, never silent freezing. Then the harder problem: eventual consistency. When writes take time to propagate, two screens legitimately disagree — the list vs the detail, my phone vs my laptop — so I decide where the UI holds its breath and where it proceeds optimistically with a queued indicator. And collaborative conflict is the certification exam: offline edits from two users will collide; the merge UI — what changed, whose version, field-level resolution — is designed in peacetime, not during the incident. Designers who model staleness ship systems people can trust; the rest ship mystery.',
    },
    commonTraps: 'Treating all data as equally live, then blaming engineering when the count was wrong in the demo. ~ A senior designer sets staleness budgets per content type, labels freshness where consequences exist, and pre-designs conflict flows.',
    relatedSource: 'Masterbook Part III · Offline-first literature (local-first movement)',
  },
  {
    id: 'latency-loading',
    category: 'Technical Literacy for Designers',
    title: 'Latency, Loading Strategy & Perceived Performance',
    eyebrow: 'TECHNICAL FLUENCY',
    summary: 'Speed is partially designed: skeletons, progressive rendering, streaming, and honest progress change how latency feels. A twelve-second AI response is an interaction problem, not just an infrastructure one.',
    mentalModel: '<100ms instant · <1s flow kept · <10s attention kept (with feedback) · beyond that: progress, partial results, or background it. Match the loading pattern to information smell.',
    keyPrinciples: [
      'Skeletons for predictable layouts; spinners only when shape is unknown and wait is short.',
      'Stream when content generates progressively — with a visible stop control.',
      'Long operations move to background with notification, or show staged honest progress.',
      'Pagination vs infinite scroll is a findability and performance decision, not a trend.',
    ],
    realWorldExample: 'An AI answer that takes 12 seconds: stream tokens with a stop button and a cited-sources footer, or hold and deliver with staged progress — but never a naked spinner. Google Search’s incremental rendering and Gmail’s “Sending…” grace window both manage perceived time deliberately.',
    sayAloud: {
      thirtySec: 'Perceived performance is designed. Under a second, protect flow; up to ten, show structured feedback — skeletons that match the coming layout; beyond that, stream, show staged progress, or background it with notification. And anything cancellable must have a visible stop.',
      twoMin: 'I budget attention like engineers budget milliseconds. The thresholds: under about a hundred milliseconds feels instant — preserve it; under a second, users stay in flow — do not flash loaders that cost more attention than the wait; under ten seconds, feedback is mandatory — skeleton screens matching the destination layout, because structure restores a sense of progress. Beyond ten seconds the strategy changes: stream progressively when content allows — AI answers, long reports — pair every stream with a working stop control and keep the partial result; or move to background with a notification contract. Pagination choices live here too: infinite scroll trades orientation — the footer, the scrollbar position, deep links — against frictionless browsing, so I choose it for consumption feeds and paged loading for worklists where selection and comparison matter. The test: describe out loud what the user sees at second one, five, fifteen, and at failure — if any answer is vague, the loading design is unfinished.',
    },
    commonTraps: 'One spinner component for everything from 200ms lists to 12-second AI generations. ~ A senior designer chooses per-context loading strategy — skeleton, stream, staged progress, background job — and specifies second-by-second experience including cancellation.',
    relatedSource: 'Masterbook Part III · Nielsen Norman Group, response-time limits',
  },
  {
    id: 'optimistic-ui',
    category: 'Technical Literacy for Designers',
    title: 'Optimistic UI & Rollback',
    eyebrow: 'TECHNICAL FLUENCY',
    summary: 'For reversible, high-confidence actions, render success before the server confirms — and keep a visible path back if it fails. For consequential actions, honesty beats speed: confirm with the authoritative system.',
    mentalModel: 'Optimise when: reversible + >99% success + low consequence. Rollback must be as visible as the action. The Masterbook question: what if the request succeeds but the response never arrives?',
    keyPrinciples: [
      'Candidate test: reversible, almost-always-successful, low-stakes — likes, saves, toggles.',
      'Never optimise money movement, deletions, or permission grants.',
      'Rollback must be perceivable — silent reversal looks like data loss.',
      'Design the duplicate: double-tap during flight must not create two of anything costly.',
    ],
    realWorldExample: 'Liking a post updates instantly — reverting quietly with a retry option if the call fails is fine because the cost is tiny. A bank transfer never pretends: pending → confirmed from the authoritative ledger, duplicate-submission guarded, because “what happens if the request succeeds but the response never reaches the user?” is a design question with money attached.',
    sayAloud: {
      thirtySec: 'Optimistic UI renders the likely success before the server confirms — perfect for reversible, high-success actions like likes and toggles, with visible rollback on failure. For consequential actions — payments, deletions, permissions — I keep an honest pending state until the authoritative system confirms.',
      twoMin: 'Optimistic UI is a trust trade, and I apply it with a checklist. Is the action reversible; does it succeed nearly always; is the consequence of being wrong small? Then render immediately — the like fills in, the item moves to the archive — and treat the network as a background confirmation. Two design obligations come with it: failure must be perceivable — a silent revert reads as the app eating the user’s data, so roll back with an explanation and a retry; and duplicates must be impossible — the button is idempotent during flight, so double-tapping never creates two payments or two comments. The boundary is consequence: money movement, deletions, permission changes, and anything with legal weight stays honest — visible pending, confirmation only when the server commits, and a designed answer to the Masterbook’s question: if the request succeeded but the response never arrived — did the user just retry into a duplicate? Senior technical fluency is mostly knowing which actions deserve patience.',
    },
    commonTraps: 'Making everything optimistic for snappiness — then inventing apologies when the transfer “went through twice”. ~ A senior designer applies the reversible/high-success/low-stakes test, designs visible rollback, and keeps consequential flows on the authoritative path.',
    relatedSource: 'Masterbook Part III · Offline-first & CRDT design literature',
  },
];

