import type { BlogSection } from './blogPosts';

export interface PillarPage {
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  intro: string;
  updated: string;
  relatedSlugs: string[];
  content: BlogSection[];
}

export const pillarPages: PillarPage[] = [
  {
    path: '/neurodiversity-in-the-workplace',
    title: 'Neurodiversity in the Workplace: The 2026 UK Guide',
    metaTitle: 'Neurodiversity in the Workplace: 2026 UK Guide',
    metaDescription:
      'A practical UK guide to neurodiversity in the workplace in 2026: the law, reasonable adjustments, sensory environments, manager training and the evidence behind what actually works.',
    keywords:
      'neurodiversity in the workplace, neurodiversity at work, neurodiversity uk, neurodivergent employees, reasonable adjustments neurodiversity, autism at work, ADHD at work, workplace accommodations UK, neuroinclusion',
    intro:
      'Around one in four employees is neurodivergent, yet most UK workplaces still fail them on the basics: the physical environment, the adjustments process, and the manager in the middle. This guide pulls together what the 2026 evidence says and what to do about it.',
    updated: 'September 2, 2026',
    relatedSlugs: [
      'neurodiversity-index-2026-delivery-gap-uk',
      'neurodivergent-workplace-adjustments-disclosure-2026',
      'manager-training-gap-neurodiversity-2026',
      'neurodivergent-burnout-crisis-uk-2026',
      'return-to-office-neurodiversity-accommodations-2026',
      'neurodiversity-tribunal-risk-uk-2026',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Neurodiversity in the workplace describes the reality that human brains process information, attention, sensory input and social interaction in meaningfully different ways — and that organisations are designed, almost always by default, around one narrow slice of that range. Neurodivergent covers autism, ADHD, dyslexia, dyspraxia, dyscalculia, Tourette syndrome and acquired conditions. Neurotypical describes people whose processing broadly fits the design assumptions everyone else is working to.',
      },
      {
        type: 'paragraph',
        text: 'The practical question for a UK employer in 2026 is no longer "should we do something about this?" It is "why does what we are already doing not reach the people it is meant to help?" Across every major UK data set published in the last two years, employers rate their own neuroinclusion far higher than their neurodivergent staff do. That gap — not a lack of policy — is the problem this guide addresses.',
      },
      { type: 'heading', level: 2, id: 'what-the-2026-data-shows', text: 'What the 2026 UK data actually shows' },
      {
        type: 'table',
        headers: ['Measure', 'Finding', 'Source'],
        rows: [
          ['Share of the workforce that is neurodivergent', 'Around 1 in 4', 'City & Guilds Neurodiversity Index 2026'],
          ['Employer confidence in their own neuroinclusion vs. employee experience', '30–35 percentage point gap', 'City & Guilds Neurodiversity Index 2026'],
          ['Neurodivergent employees who fear disclosure will damage their career', '70% (up from 59% in 2024)', 'Understood.org Neurodiversity at Work, 2026'],
          ['Neurodivergent employees who do not know what adjustments they are entitled to', '70%', 'Understood.org Neurodiversity at Work, 2026'],
          ['UK workers saying their employer is ineffective at manager training on neurodiversity', '35%', 'Acas / YouGov, 2026'],
          ['Rise in neurodiversity-related employment tribunal claims', '164% over four years', 'UK employment tribunal records'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Read together, these numbers describe one failure repeated in different places: awareness is high, delivery is not. Policies exist; the people they are written for cannot find them, do not trust them, or ask and are turned down. Every section below is aimed at closing that delivery gap rather than adding another statement of intent.',
      },
      { type: 'heading', level: 2, id: 'legal-duties-uk', text: 'The legal position in the UK' },
      {
        type: 'paragraph',
        text: 'Under the <a href="https://www.legislation.gov.uk/ukpga/2010/15/contents" target="_blank" rel="noopener noreferrer">Equality Act 2010</a>, a condition counts as a disability where it has a substantial and long-term adverse effect on a person\'s ability to carry out normal day-to-day activities. Autism, ADHD, dyslexia and dyspraxia frequently meet that threshold, and tribunals have repeatedly accepted them. Where it applies, the employer has a duty to make reasonable adjustments — a positive duty, not a favour, and it is triggered by knowledge the employer has or reasonably ought to have.',
      },
      {
        type: 'list',
        items: [
          'The duty can be triggered without formal disclosure: if a manager could reasonably have known, "nobody told us" is a weak defence.',
          'Cost alone rarely makes an adjustment unreasonable — most workplace adjustments for neurodivergent staff cost under £100, and Access to Work funding can cover more.',
          'Discrimination arising from disability (s.15) is where most neurodiversity claims land: penalising lateness, communication style or sickness absence that stems from the condition.',
          'A rejected adjustment request should always be answered in writing with reasons, and a documented alternative offered. Silence is the single most common trigger for a claim.',
        ],
      },
      { type: 'heading', level: 2, id: 'reasonable-adjustments-that-work', text: 'Reasonable adjustments that actually work' },
      {
        type: 'paragraph',
        text: 'The most useful adjustments are small, specific and about control — over noise, light, timing and communication. Broad "wellbeing" initiatives do not substitute for them.',
      },
      {
        type: 'table',
        headers: ['Barrier', 'Adjustment', 'Typical cost'],
        rows: [
          ['Open-plan noise and unpredictable interruption', 'Bookable quiet room, noise-cancelling headphones, agreed focus blocks', 'Low'],
          ['Overhead fluorescent lighting and glare', 'Desk lamp, dimmable zone, screen filters, seat away from harsh light', 'Low'],
          ['Verbal-only instructions and shifting priorities', 'Written follow-up after meetings, one prioritised task list, agendas in advance', 'None'],
          ['Rush-hour commuting and sensory load on arrival', 'Flexible start times, hybrid pattern, quiet arrival space', 'None'],
          ['Interview formats that test social performance, not the job', 'Questions in advance, work-sample tasks, skills-based assessment', 'None'],
          ['Executive-function load in planning and admin', 'Coaching, task-management tooling, Access to Work support', 'Medium (fundable)'],
        ],
      },
      {
        type: 'protip',
        text: 'Adjustments fail most often at handover. Record them in an adjustments passport that travels with the employee when their manager, team or office changes — so nobody has to disclose and negotiate from scratch every time.',
      },
      { type: 'heading', level: 2, id: 'the-physical-environment', text: 'The physical environment is the adjustment employers keep skipping' },
      {
        type: 'paragraph',
        text: 'Policy work is cheap and visible. Changing the room is neither, so it gets deferred — even though noise, lighting and unpredictability are the barriers neurodivergent employees name first. Return-to-office mandates have made this sharper: staff who managed well at home are being placed back into environments that were never designed for sensory difference, and the adjustment conversation is restarting from zero.',
      },
      {
        type: 'list',
        items: [
          'Acoustics: measured ambient noise, absorptive surfaces, enforced quiet zones and bookable focus booths — not just a "quiet policy" nobody polices.',
          'Lighting: natural light where possible, individually adjustable task lighting, no bare fluorescent tubes over desks.',
          'Predictability: consistent desks or a reliable booking system, clear wayfinding, stable layouts. Hot-desking is a hidden accessibility barrier.',
          'Retreat: somewhere to decompress that is not a toilet cubicle or a stairwell.',
          'Choice: several environment types in one building so people can match the space to the task.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If your own building cannot offer these yet, external space can bridge the gap. NeuroIndex scores real offices, coworking spaces and meeting rooms on noise, lighting and sensory load, so you can <a href="/spaces">book somewhere already assessed</a> instead of guessing from a photo gallery. Our <a href="/how-it-works">scoring framework</a> explains exactly what is measured.',
      },
      { type: 'heading', level: 2, id: 'managers-are-the-bottleneck', text: 'Managers are the bottleneck' },
      {
        type: 'paragraph',
        text: 'Almost every adjustment passes through a line manager, and 35% of UK workers say their employer is ineffective at training them. Untrained managers do not usually refuse adjustments outright — they delay, they escalate unnecessarily, or they agree informally and never implement. The employee reads that as a no, stops asking, and starts looking elsewhere. Our guide to <a href="/blog/managing-neurodivergent-employees">managing neurodivergent employees</a> sets out what to train managers to actually do.',
      },
      {
        type: 'list',
        items: [
          'Give managers authority to approve low-cost adjustments on the spot, with a budget line and no HR gatekeeping.',
          'Train on the response, not the diagnosis: what to say when someone discloses, and what happens in the following 48 hours.',
          'Set a service standard — every adjustment request acknowledged within five working days and resolved or answered in writing within twenty.',
          'Measure it: track requests, approval rates and time-to-implement, and report them alongside other people metrics.',
        ],
      },
      { type: 'heading', level: 2, id: 'building-the-business-case', text: 'Building the business case' },
      {
        type: 'paragraph',
        text: 'The return on neuroinclusion is mostly retention and productivity, not recruitment marketing. Replacing an experienced employee typically costs six to nine months of their salary; nearly a quarter of neurodivergent UK employees say they are planning to leave. Set against adjustments that usually cost under £100, the arithmetic is not close. Add avoided tribunal exposure — claims up 164% in four years, with awards for injury to feelings uncapped — and the case is straightforward. The detail is in our <a href="/blog/neuroinclusion-roi-business-case-uk-2026">neuroinclusion ROI analysis</a> and the <a href="/neuroinclusion-for-employers">employer implementation guide</a>.',
      },
      { type: 'heading', level: 2, id: 'a-90-day-plan', text: 'A realistic 90-day plan' },
      {
        type: 'list',
        items: [
          'Days 1–30: Ask your own staff. Run an anonymous survey on the adjustments process, sensory environment and manager response. Publish the results internally, unedited.',
          'Days 31–60: Fix the route. One named owner for adjustments, a published request process, a devolved budget, and an adjustments passport template.',
          'Days 61–90: Fix one room. Deliver a genuine quiet space, task lighting and a bookable focus area — then train managers on the new process and start reporting time-to-implement.',
        ],
      },
      { type: 'heading', level: 2, id: 'faqs', text: 'Frequently asked questions' },
      {
        type: 'faq',
        question: 'What does neurodiversity in the workplace mean?',
        answer:
          'It means recognising that employees process information, sensory input, attention and social interaction differently, and designing work — environments, processes and management practice — so that difference is supported rather than penalised. In practice it covers autism, ADHD, dyslexia, dyspraxia and related conditions, and around one in four UK employees is neurodivergent.',
      },
      {
        type: 'faq',
        question: 'Are UK employers legally required to support neurodivergent employees?',
        answer:
          'Yes, where the condition meets the Equality Act 2010 definition of disability. Employers must make reasonable adjustments, and the duty is triggered by knowledge they have or reasonably ought to have — a formal diagnosis or disclosure is not always required. Neurodiversity-related tribunal claims have risen 164% in four years.',
      },
      {
        type: 'faq',
        question: 'What are the most effective workplace adjustments for neurodivergent staff?',
        answer:
          'The most effective adjustments give people control over their environment and information: access to quiet space and noise-cancelling headphones, adjustable lighting, written follow-ups to verbal instructions, flexible start times, agendas in advance, and a single prioritised task list. Most cost under £100 and many cost nothing.',
      },
      {
        type: 'faq',
        question: 'Why do neurodivergent employees still not ask for adjustments?',
        answer:
          'Because 70% fear disclosure will harm their career and 70% do not know what they are entitled to. Fixing that requires a published, named, low-friction request route with a service standard, plus managers trained to respond well — not another awareness campaign.',
      },
      {
        type: 'faq',
        question: 'How do we know whether an office is genuinely neuro-inclusive?',
        answer:
          'Measure it rather than describe it: ambient noise levels, lighting adjustability, availability and bookability of quiet space, layout predictability, and whether staff can choose between environment types. NeuroIndex applies that assessment to real UK workspaces and publishes the scores.',
      },
    ],
  },
  {
    path: '/neuroinclusion-for-employers',
    title: 'Neuroinclusion for Employers: How to Implement It in 2026',
    metaTitle: 'Neuroinclusion for Employers: 2026 Implementation Guide',
    metaDescription:
      'How UK employers implement neuroinclusion in 2026: the business case, an adjustments process that works, manager training, sensory environment standards and the metrics to report.',
    keywords:
      'neuroinclusion, neuroinclusion for employers, neuroinclusive workplace, neurodiversity strategy UK, workplace adjustments process, neurodiversity manager training, neuroinclusive office design, neurodiversity ROI',
    intro:
      'Neuroinclusion is an operating change, not a campaign. This is the implementation guide: what to build, who owns it, what it costs, and which numbers prove it is working.',
    updated: 'September 2, 2026',
    relatedSlugs: [
      'neuroinclusion-roi-business-case-uk-2026',
      'neurodiversity-confidence-gap-employer-employee-2026',
      'neurodivergent-talent-retention-crisis-uk-2026',
      'neurodiversity-tribunal-risk-uk-2026',
      'manager-training-gap-neurodiversity-2026',
      'neurodivergent-career-ceiling-management-gap-2026',
    ],
    content: [
      {
        type: 'paragraph',
        text: 'Neuroinclusion is the deliberate design of work — recruitment, environment, management and progression — so that neurodivergent employees can do their best work without first having to negotiate for it. It is distinct from awareness, which most UK organisations already have in abundance, and from diversity reporting, which measures who is in the building rather than whether the building works.',
      },
      {
        type: 'paragraph',
        text: 'The distinguishing feature of employers who get this right is unglamorous: they treat adjustments as an operational service with an owner, a budget, a service standard and reported metrics — the same way they treat IT provisioning. Everyone else treats it as a series of individual negotiations, which is exactly why their employees report a very different experience from the one their annual report describes.',
      },
      { type: 'heading', level: 2, id: 'the-commercial-case', text: 'The commercial case, in plain numbers' },
      {
        type: 'table',
        headers: ['Lever', 'Mechanism', 'Order of magnitude'],
        rows: [
          ['Retention', 'Nearly 1 in 4 neurodivergent UK employees plan to leave; replacement costs 6–9 months of salary', 'Largest single saving for most employers'],
          ['Productivity', 'Sensory and executive-function barriers removed; fewer lost days to overload and burnout', 'Compounds across the whole team, not just disclosed staff'],
          ['Legal exposure', 'Neurodiversity tribunal claims up 164% in four years; injury-to-feelings awards uncapped', 'Low probability, high severity, fully avoidable'],
          ['Absence and burnout', 'Only around 5% of UK workers report getting the support they need', 'Direct cover and sick-pay cost'],
          ['Talent access', 'Skills-based hiring reaches candidates conventional interviews screen out', 'Strongest in technical and analytical roles'],
          ['Cost side', 'Most adjustments under £100; Access to Work funds higher-cost support', 'Small relative to any of the above'],
        ],
      },
      {
        type: 'paragraph',
        text: 'Present it as a retention and risk case, not a moral one. Finance approves retention and risk. The full breakdown, with published employer programme results, is in our <a href="/blog/neuroinclusion-roi-business-case-uk-2026">2026 ROI analysis</a>.',
      },
      { type: 'heading', level: 2, id: 'build-the-adjustments-service', text: 'Step 1: Build an adjustments service, not a policy' },
      {
        type: 'list',
        items: [
          'One named owner, published internally, who is accountable for adjustments end to end.',
          'One request route, reachable without going through a line manager, and usable before diagnosis or formal disclosure.',
          'A devolved budget so managers can approve low-cost adjustments immediately, with a fast escalation path for anything larger.',
          'A service standard: acknowledged in five working days, resolved or answered in writing within twenty.',
          'An adjustments passport that follows the employee through manager, team and office changes.',
          'A written-reasons rule: every decline is documented with an alternative offered. This is your best protection in a tribunal and your best signal to staff.',
        ],
      },
      { type: 'heading', level: 2, id: 'train-managers', text: 'Step 2: Train managers on the response' },
      {
        type: 'paragraph',
        text: 'Manager capability is where most neuroinclusion strategies quietly die. Train the behaviour, not the condition: what to say in the disclosure conversation, what happens in the next 48 hours, what they can approve alone, and how to run one-to-ones, feedback and workload planning in ways that do not penalise executive-function differences. Detail in the <a href="/blog/managing-neurodivergent-employees">manager guide</a> and the evidence in our <a href="/blog/manager-training-gap-neurodiversity-2026">manager training gap analysis</a>.',
      },
      { type: 'heading', level: 2, id: 'fix-the-environment', text: 'Step 3: Fix the environment' },
      {
        type: 'paragraph',
        text: 'Environment is the adjustment employers most often promise and least often deliver, and return-to-office mandates have made it urgent. A workable minimum standard for any office people are required to attend:',
      },
      {
        type: 'list',
        items: [
          'A genuinely quiet, bookable room per floor — enforced, not aspirational.',
          'Individually adjustable task lighting, and no bare overhead fluorescents above desks.',
          'A choice of environment types: focus, collaboration and low-stimulus retreat.',
          'Predictable seating, or a booking system reliable enough that arrival is not a daily unknown.',
          'Measured ambient noise, reviewed after any layout change.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Where your estate cannot meet that yet, use assessed external space in the interim: <a href="/spaces">browse scored neuro-inclusive workspaces</a>, or if you operate space yourself, <a href="/workspace-providers">get your building assessed</a> so employers searching for it can find you.',
      },
      { type: 'heading', level: 2, id: 'fix-hiring-and-progression', text: 'Step 4: Fix hiring and progression' },
      {
        type: 'list',
        items: [
          'Send interview questions in advance to every candidate — this removes the disclosure dilemma entirely.',
          'Assess with work samples rather than unstructured conversation.',
          'Strip vague behavioural criteria ("good cultural fit", "high energy") from scoring rubrics.',
          'Audit promotion data: neurodivergent staff are heavily under-represented in management, and that gap is where retention losses accumulate.',
        ],
      },
      { type: 'heading', level: 2, id: 'measure-it', text: 'Step 5: Measure it and report it' },
      {
        type: 'table',
        headers: ['Metric', 'Why it matters', 'Target direction'],
        rows: [
          ['Adjustment requests received', 'Low volume signals a broken or distrusted route, not an inclusive workplace', 'Up, then stable'],
          ['Median time from request to implementation', 'The number employees actually feel', 'Under 20 working days'],
          ['Approval rate and documented declines', 'Exposes inconsistent manager decisions', 'High approval, 100% documented'],
          ['Retention of neurodivergent staff vs. overall', 'The main financial return', 'Gap closing'],
          ['Employee-reported experience vs. leadership confidence', 'Directly tracks the 30–35 point national confidence gap', 'Gap closing'],
        ],
      },
      {
        type: 'protip',
        text: 'If adjustment requests fall after you launch a programme, that is not success. It usually means people tried the new route, got nowhere, and stopped.',
      },
      { type: 'heading', level: 2, id: 'faqs', text: 'Frequently asked questions' },
      {
        type: 'faq',
        question: 'What is neuroinclusion?',
        answer:
          'Neuroinclusion is the deliberate design of recruitment, work environment, management practice and progression so neurodivergent employees can perform without having to negotiate for basic conditions. It goes beyond awareness training by changing processes, budgets and physical space, and by measuring the outcome.',
      },
      {
        type: 'faq',
        question: 'How much does neuroinclusion cost an employer?',
        answer:
          'Most individual adjustments cost under £100, and many cost nothing at all — agendas in advance, written follow-ups, flexible start times. Higher-cost support such as coaching or assistive technology can be part-funded through Access to Work. The main investment is management time and environmental improvement, set against replacement costs of six to nine months salary per departure.',
      },
      {
        type: 'faq',
        question: 'Who should own neuroinclusion in an organisation?',
        answer:
          'One named individual with budget authority, usually in HR or people operations, working with facilities for environmental standards. Shared ownership without a named accountable person is the most common reason adjustment requests stall.',
      },
      {
        type: 'faq',
        question: 'How do we prove neuroinclusion is working?',
        answer:
          'Track adjustment request volume, median time to implementation, approval rates with documented declines, retention of neurodivergent staff against the overall rate, and the gap between employee-reported experience and leadership confidence. Report them with other people metrics rather than in a separate diversity document.',
      },
      {
        type: 'faq',
        question: 'Does neuroinclusion only benefit neurodivergent employees?',
        answer:
          'No. Clearer written communication, agendas in advance, quiet space and predictable planning improve conditions for everyone, which is why the productivity return typically shows up across whole teams rather than only among disclosed employees.',
      },
    ],
  },
];

export const getPillarPage = (path: string): PillarPage | undefined =>
  pillarPages.find((p) => p.path === path);
