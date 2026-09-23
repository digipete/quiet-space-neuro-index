import type { PillarPage } from './pillarPages';
import { getPillarPage } from './pillarPages';

// Audience and location landing pages. Same shape and renderer as the pillar
// guides, but each one answers a single reader's question and ends in a single
// action: find a space, or list a space.
export const landingPages: PillarPage[] = [
  {
    path: '/for/hr-teams',
    title: 'Neuroinclusion for HR Teams: What to Put in Place First',
    metaTitle: 'Neuroinclusion for HR Teams | Where to Start',
    metaDescription:
      'A practical starting order for UK HR teams on neuroinclusion: the adjustments process, the physical environment, manager capability and the evidence you need to show it works.',
    keywords:
      'neuroinclusion HR, neurodiversity policy UK, reasonable adjustments process, HR neurodiversity training, workplace adjustments passport, neurodiversity HR checklist',
    intro:
      'Most UK employers already have a neurodiversity commitment. What neurodivergent staff report missing is the delivery: a request route they trust, an environment that does not overload them, and a manager who knows what to do. This page sets out the order to fix those in.',
    updated: 'September 23, 2026',
    relatedSlugs: [
      'neurodivergent-workplace-adjustments-disclosure-2026',
      'manager-training-gap-neurodiversity-2026',
      'neurodiversity-tribunal-risk-uk-2026',
    ],
    content: [
      {
        type: 'paragraph',
        text: '<strong>Short answer:</strong> start with the adjustments process, not the policy. Make it possible to ask for an adjustment without disclosing a diagnosis to a line manager, answer every request in writing within a fixed number of days, and record what was agreed so it survives a change of manager. Everything else — training, environment, data — works better once that route exists.',
      },
      { type: 'heading', level: 2, id: 'order-of-work', text: 'The order of work' },
      {
        type: 'table',
        headers: ['Priority', 'What to put in place', 'How you know it worked'],
        rows: [
          ['1', 'A named, low-disclosure route to request an adjustment, with a written response deadline', 'Requests logged, median response time, proportion answered in writing'],
          ['2', 'An adjustments record that travels with the employee across teams and managers', 'Share of staff who do not have to re-ask after a reorganisation'],
          ['3', 'Manager capability: what to do when someone asks, and what not to say', 'Manager confidence survey, and complaints about the process rather than the outcome'],
          ['4', 'The physical environment: bookable quiet space, lighting control, predictable desks', 'Quiet-room utilisation, and sensory issues raised in exit interviews'],
          ['5', 'Recruitment: questions in advance, work samples instead of social performance tests', 'Offer-stage drop-out, and adjustment requests made at application stage'],
        ],
      },
      { type: 'heading', level: 2, id: 'adjustments-process', text: 'Designing an adjustments process people will use' },
      {
        type: 'paragraph',
        text: 'The barrier is rarely willingness to grant an adjustment. It is that asking feels like a career risk, and that most people do not know what they can ask for. Understood.org\'s 2026 research found 70% of neurodivergent employees fear disclosure will damage their career, and the same proportion do not know what adjustments they are entitled to.',
      },
      {
        type: 'list',
        items: [
          'Publish a list of adjustments available by default, so asking is choosing from a menu rather than making a case.',
          'Allow requests to go to HR or occupational health rather than only to the line manager.',
          'Set a response deadline in working days and publish how often you meet it.',
          'Answer refusals in writing with reasons and an alternative. Silence is the most common trigger for a tribunal claim.',
          'Separate the adjustment from any diagnosis: you need to know the barrier, not the label.',
        ],
      },
      {
        type: 'protip',
        text: 'An adjustments passport — a short record the employee owns and shares — removes the single most demoralising part of the process: having to explain yourself again to every new manager.',
      },
      { type: 'heading', level: 2, id: 'environment', text: 'The part HR usually cannot fix alone' },
      {
        type: 'paragraph',
        text: 'Noise, lighting and unpredictable space are the most frequently cited barriers, and they sit with facilities or with a landlord rather than with HR. If your office cannot offer bookable quiet space and lighting control, adjustments granted on paper will still fail in practice. That is the gap NeuroIndex exists to close: every listed workspace is scored on noise, lighting, sensory load and quiet-space provision, so you can check a building before you sign or before you send someone there.',
      },
      { type: 'heading', level: 2, id: 'measure', text: 'What to measure' },
      {
        type: 'list',
        items: [
          'Requests made, granted, refused and withdrawn — withdrawals are the signal most organisations miss.',
          'Median days to a written response.',
          'Retention and promotion rates of staff with recorded adjustments against the rest of the workforce.',
          'Anonymous experience score, asked of employees rather than of managers. Employer confidence consistently overstates employee experience by 30 percentage points or more.',
        ],
      },
      {
        type: 'faq',
        question: 'Do we need a diagnosis before making an adjustment?',
        answer:
          'No. The duty to make reasonable adjustments under the Equality Act 2010 is triggered by knowledge the employer has or ought reasonably to have, not by a formal diagnosis. Requiring proof delays support and increases legal exposure.',
      },
      {
        type: 'faq',
        question: 'How much should we budget per adjustment?',
        answer:
          'Most workplace adjustments for neurodivergent staff cost under £100, and many cost nothing. Access to Work can fund larger items such as coaching or assistive technology.',
      },
      {
        type: 'faq',
        question: 'Where does workspace choice fit into an HR neuroinclusion plan?',
        answer:
          'It sits alongside the adjustments process. A quiet, controllable environment removes the need for many individual adjustments, which is why building selection belongs in the plan rather than after it.',
      },
    ],
  },
  {
    path: '/for/managers',
    title: 'For Managers: What to Do When Someone on Your Team Is Neurodivergent',
    metaTitle: 'Managing a Neurodivergent Team Member | Manager Guide',
    metaDescription:
      'What to say, what to change and what to avoid when a team member is neurodivergent or asks for an adjustment. A short, practical guide for UK line managers.',
    keywords:
      'managing neurodivergent employees, line manager neurodiversity, ADHD employee management, autistic employee support, adjustment request manager, neurodiversity manager training',
    intro:
      'You do not need to become an expert in autism or ADHD to manage well. You need to change a handful of habits — how you give instructions, how you handle noise and interruption, and how you respond the first time someone tells you something is hard.',
    updated: 'September 23, 2026',
    relatedSlugs: [
      'managing-neurodivergent-employees',
      'manager-training-gap-neurodiversity-2026',
      'neurodivergent-burnout-crisis-uk-2026',
    ],
    content: [
      {
        type: 'paragraph',
        text: '<strong>Short answer:</strong> when someone tells you they are neurodivergent or asks for a change, respond to the barrier, not the label. Ask what specifically gets in the way, agree one or two concrete changes, write them down, and check back in a month. Do not ask for a diagnosis, do not tell the wider team, and do not treat it as a performance conversation.',
      },
      { type: 'heading', level: 2, id: 'first-conversation', text: 'The first conversation' },
      {
        type: 'list',
        items: [
          'Thank them. Most people weigh this conversation for months before having it.',
          'Ask: "What part of the work is hardest, and what would make it easier?" Not: "What is your condition?"',
          'Agree one or two changes you can make this week, not a plan for next quarter.',
          'Confirm in writing what you agreed, and who else needs to know. Ask before telling anyone.',
          'Put a review date in the calendar. An adjustment that is never reviewed quietly stops happening.',
        ],
      },
      { type: 'heading', level: 2, id: 'habits-that-help', text: 'Six habits that help almost everyone' },
      {
        type: 'table',
        headers: ['Habit', 'Why it matters'],
        rows: [
          ['Follow verbal instructions with a short written summary', 'Removes memory and processing load, and stops disputes about what was asked'],
          ['Give one prioritised task list, not a stream of competing asks', 'Executive-function load, not motivation, is usually what stalls work'],
          ['Send agendas and questions in advance', 'Lets people prepare rather than perform under time pressure'],
          ['Protect focus blocks and respect them yourself', 'Interruption cost is far higher when switching is hard'],
          ['Be specific in feedback: the behaviour, the impact, the change', 'Hints and tone are frequently missed, then read as hostility later'],
          ['Let people choose where they work when the task allows it', 'Sensory environment is the most common reported barrier'],
        ],
      },
      { type: 'heading', level: 2, id: 'avoid', text: 'What to avoid' },
      {
        type: 'list',
        items: [
          'Asking for medical evidence before making a low-cost change.',
          'Disclosing to the team, even positively, without explicit permission.',
          'Penalising lateness, communication style or absence that stems from the condition — this is where most discrimination claims land.',
          'Replacing a concrete adjustment with a wellbeing initiative.',
          'Promising to look into it and then going quiet. An unanswered request is the most common trigger for escalation.',
        ],
      },
      {
        type: 'protip',
        text: 'If the honest answer is "the office is the problem and I cannot change the office", say so and escalate it. Noise and lighting are facilities decisions, and pretending otherwise leaves the person carrying it alone.',
      },
      {
        type: 'faq',
        question: 'What if I think the request is unreasonable?',
        answer:
          'Say so in writing, give your reasons, and offer an alternative you can deliver. A documented refusal with an alternative is defensible; silence is not.',
      },
      {
        type: 'faq',
        question: 'Someone has not told me anything, but I suspect they are struggling. What now?',
        answer:
          'Do not diagnose. Describe what you have noticed factually, ask what would help, and offer the changes you can make for anyone. The duty to adjust can be triggered by what you reasonably ought to know, so acting on what you see is the safer course.',
      },
    ],
  },
  {
    path: '/for/neurodivergent-professionals',
    title: 'For Neurodivergent Professionals: Finding Somewhere You Can Actually Work',
    metaTitle: 'Finding a Neurodivergent-Friendly Workspace | NeuroIndex',
    metaDescription:
      'How to judge whether an office or coworking space will work for you before you commit: the questions to ask, the things to check in person, and what you can ask your employer to fund.',
    keywords:
      'neurodivergent friendly workspace, quiet coworking space, autism friendly office, ADHD friendly workspace, sensory friendly coworking, quiet desk to rent UK',
    intro:
      'Photographs never show noise. This page is about how to work out, before you sign or commit to a commute, whether a space will actually let you think — and what you are entitled to ask your employer to pay for.',
    updated: 'September 23, 2026',
    relatedSlugs: [
      'neurodivergent-workplace-adjustments-disclosure-2026',
      'neurodivergent-burnout-crisis-uk-2026',
      'create-sensory-friendly-meeting-room-process',
    ],
    content: [
      {
        type: 'paragraph',
        text: '<strong>Short answer:</strong> judge a space on four things you can check in ten minutes — background noise and where it comes from, whether you can control light at your own desk, whether there is somewhere quiet you can actually book, and whether your desk is the same one every day. Everything else is decoration.',
      },
      { type: 'heading', level: 2, id: 'what-to-check', text: 'What to check on a tour' },
      {
        type: 'table',
        headers: ['Check', 'What to look for', 'Question to ask'],
        rows: [
          ['Noise', 'Hard floors, glass walls, coffee machine or phone booths near desks', '"What is it like in here at 11am on a Tuesday?"'],
          ['Light', 'Overhead fluorescent only, glare on screens, no desk lamps', '"Can I turn the light above my desk down?"'],
          ['Quiet space', 'A room that is bookable and actually used for quiet, not overflow meetings', '"How do I book it, and how often is it free?"'],
          ['Consistency', 'Hot-desking with no fixed option', '"Can I have the same desk every day?"'],
          ['Arrival', 'Busy reception, barriers, unclear route in', '"Is there a quiet way in and somewhere to settle?"'],
          ['Air and smell', 'Kitchen or scent diffusers near desks', '"Where do people eat?"'],
        ],
      },
      {
        type: 'protip',
        text: 'Visit at the busiest time of day, not the quietest slot the sales team offers you. If they will not allow that, treat it as an answer.',
      },
      { type: 'heading', level: 2, id: 'asking-your-employer', text: 'Asking your employer to fund it' },
      {
        type: 'paragraph',
        text: 'A quieter place to work is a reasonable adjustment, not a perk. Under the Equality Act 2010 your employer has a duty to make reasonable adjustments where a condition has a substantial, long-term effect on day-to-day activities, and that duty is triggered by what they know or ought reasonably to know. You do not need a formal diagnosis to ask, and you do not have to disclose one to explain a barrier.',
      },
      {
        type: 'list',
        items: [
          'Frame the request around the barrier and the work: "Open-plan noise costs me most of the morning; a quiet desk two days a week would fix it."',
          'Ask for a written answer. It protects you either way.',
          'Access to Work can fund equipment, coaching and support that your employer will not.',
          'If the answer is no, ask for the reasons in writing and an alternative. That record matters if it escalates.',
        ],
      },
      { type: 'heading', level: 2, id: 'how-neuroindex-helps', text: 'How to use the index' },
      {
        type: 'paragraph',
        text: 'Every workspace listed on NeuroIndex carries a Neuro Index score built from noise, lighting, sensory load and quiet-space provision, plus a written sensory profile — so you can rule places out before spending a morning travelling to them.',
      },
      {
        type: 'faq',
        question: 'Do I have to tell my employer I am neurodivergent to get a quieter space?',
        answer:
          'No. You can describe the barrier and the adjustment without naming a condition. Many employers handle requests through HR or occupational health precisely so you do not have to disclose to your manager.',
      },
      {
        type: 'faq',
        question: 'What if my employer will not pay for a coworking desk?',
        answer:
          'Ask for the refusal and its reasons in writing, then ask what they will provide instead — a fixed desk away from noise, a bookable quiet room, or agreed home-working days. Access to Work may fund support your employer declines.',
      },
    ],
  },
  {
    path: '/quiet-workspaces/london',
    title: 'Quiet Workspaces in London: How to Find One That Holds Up',
    metaTitle: 'Quiet Workspaces in London | Sensory-Friendly Offices',
    metaDescription:
      'What to look for in a quiet, sensory-friendly workspace in London, which areas suit different tolerances, and the London spaces scored on the Neuro Index.',
    keywords:
      'quiet workspace london, quiet coworking london, sensory friendly office london, autism friendly coworking london, ADHD friendly workspace london, quiet office space to rent london',
    intro:
      'London has more coworking space per square mile than anywhere in Europe and very little of it is quiet. The difference is rarely the brand — it is the floor plate, the flooring, and whether the quiet room is genuinely protected.',
    updated: 'September 23, 2026',
    relatedSlugs: [
      'defining-inclusive-workspaces-for-neurodiverse-professionals',
      'create-sensory-friendly-meeting-room-process',
      'return-to-office-neurodiversity-accommodations-2026',
    ],
    content: [
      {
        type: 'paragraph',
        text: '<strong>Short answer:</strong> in London, the quietest spaces are usually upper floors of older buildings with carpet, cellular rooms and separated social areas — not open glass-and-concrete floor plates with a central coffee bar. Ask where the coffee machine, phone booths and events space sit relative to the desks; that one answer predicts the noise level better than any brochure.',
      },
      { type: 'heading', level: 2, id: 'what-makes-london-hard', text: 'Why London is harder than most cities' },
      {
        type: 'list',
        items: [
          'Floor plates are subdivided tightly, so social space and focus space often share a room.',
          'Exposed concrete and polished floors — the prevailing design language — reflect sound rather than absorb it.',
          'Events programming is a core part of the coworking offer, and evening setup starts in the afternoon.',
          'Commuting load arrives with you: an hour on the Central line before a bright, busy reception is part of the sensory cost.',
        ],
      },
      { type: 'heading', level: 2, id: 'areas', text: 'Choosing an area' },
      {
        type: 'table',
        headers: ['Area', 'Character', 'Best for'],
        rows: [
          ['Bloomsbury and Clerkenwell', 'Older buildings, cellular rooms, carpet, lower footfall', 'Sustained focus work'],
          ['Southbank and Borough', 'Mixed stock, river-facing quiet corners, good escape routes outdoors', 'People who need to step out mid-day'],
          ['King\'s Cross and Shoreditch', 'Newer open floor plates, heavy events programming', 'Team days rather than deep work'],
          ['Outer hubs (Richmond, Croydon, Walthamstow)', 'Smaller sites, shorter commute, quieter by default', 'Avoiding the commute entirely'],
        ],
      },
      {
        type: 'protip',
        text: 'A short commute to a mediocre space usually beats a long commute to a perfect one. The journey is part of the sensory budget.',
      },
      { type: 'heading', level: 2, id: 'checklist', text: 'The ten-minute viewing checklist' },
      {
        type: 'list',
        items: [
          'Stand at the desk you would use and listen for thirty seconds. Name every sound source.',
          'Look up: overhead fluorescent only, or dimmable zones and desk lamps?',
          'Ask to see the quiet room, then ask how it is booked and how often it is free.',
          'Ask whether you can keep the same desk every day.',
          'Find the route from the front door to your desk and count the interactions.',
          'Ask what happens in the space after 5pm.',
        ],
      },
      { type: 'heading', level: 2, id: 'scored-london-spaces', text: 'London spaces scored on the Neuro Index' },
      {
        type: 'paragraph',
        text: 'NeuroIndex assesses each space on noise, lighting, sensory load and quiet-space provision and publishes the score with a written sensory profile. Use the <a href="/spaces/">workspace search</a> and filter by London to see current listings, each with its own detail page covering amenities, capacity and what the assessment found.',
      },
      {
        type: 'faq',
        question: 'Is a private office always quieter than a coworking desk?',
        answer:
          'Not reliably. A private office off a busy corridor with a glass wall can be louder than a well-placed desk in a carpeted, cellular building. Position within the floor plate matters more than the product type.',
      },
      {
        type: 'faq',
        question: 'Can I try a space before committing?',
        answer:
          'Most London operators offer a day pass. Use one on a Tuesday or Wednesday late morning, which is when occupancy and noise typically peak.',
      },
      {
        type: 'faq',
        question: 'What counts as a good Neuro Index score?',
        answer:
          'The score reflects how much of the sensory environment you can control, not how new the building is. Read the sensory profile alongside the number — a space can score well overall and still fail on the one factor that matters most to you.',
      },
    ],
  },
];

// Guides and landing pages share one renderer, so resolve across both sets.
export const getLandingPage = (path: string) =>
  landingPages.find((p) => p.path === path);

export const getGuidePage = (path: string) =>
  getLandingPage(path) || getPillarPage(path);
