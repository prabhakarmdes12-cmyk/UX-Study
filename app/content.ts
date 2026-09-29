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
