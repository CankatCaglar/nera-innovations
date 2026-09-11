import type { MapLocation, Partner, Project, SiteContent, System } from "./types";

export const seedSystems: System[] = [
  {
    id: "nera-social",
    name: "Nera Social",
    slug: "nera-social",
    kind: "external",
    tagline: "Where brands grow, connect and convert.",
    description:
      "The growth agency behind Nera. Strategy, creative and media execution that turns visibility into a sales opportunity.",
    heroTitle: "A growth agency built around systems.",
    heroSubtitle:
      "Nera Social plans, creates and runs the work that feeds every system in the Nera stack, from social and ads to CRM and sales tracking.",
    appUrl: "https://nerasocial.com",
    featured: true,
    order: 1,
    icon: "share",
    image: "/images/nera-social-phone.png",
    features: [
      {
        title: "Strategy that starts with the sale",
        body: "We do not treat social, ads and content as isolated channels. Every brief is designed to move a person from first impression to a measurable sales opportunity.",
      },
      {
        title: "Execution that compounds",
        body: "Creative, media and community work run as one system, so the brand stays consistent while performance keeps improving week after week.",
      },
    ],
    faqs: [
      {
        question: "Is Nera Social an application or an agency?",
        answer:
          "Nera Social is our growth agency. It is the team and the practice that feeds our product systems with strategy, creative and paid media.",
      },
      {
        question: "Can we work with Nera Social without using the other systems?",
        answer:
          "Yes. Many brands start with the agency. The systems become useful when you want the same work to be measurable, repeatable and easier to scale.",
      },
    ],
    resourceTitle: "How Nera connects marketing to sales",
    resourceDescription:
      "A short briefing on how we join social, ads, web, CRM and sales tracking into one growth structure.",
  },
  {
    id: "flowin",
    name: "Flowin",
    slug: "flowin",
    kind: "app",
    tagline: "Automate the path from interest to opportunity.",
    description:
      "Workflow automation that connects campaigns, CRM and follow-up so no lead is left waiting.",
    heroTitle: "Automation that keeps growth moving.",
    heroSubtitle:
      "Flowin connects the steps between a first click and a sales conversation, reminders, routing, follow-up and the quiet work in between.",
    appUrl: "https://flowin.nerainnovations.com",
    featured: true,
    order: 2,
    icon: "workflow",
    features: [
      {
        title: "Flows that match how you sell",
        body: "Build automation around real handoffs: a form submission, a qualified lead, a missed call, a proposal that needs a nudge. Flowin keeps the next step from depending on memory.",
      },
      {
        title: "Less busywork, clearer ownership",
        body: "Every flow has an owner and a result. Teams spend less time chasing updates and more time on conversations that can close.",
      },
    ],
    faqs: [
      {
        question: "What can Flowin automate?",
        answer:
          "Lead routing, follow-up sequences, internal notifications, CRM updates and the repetitive steps that sit between marketing activity and a sales opportunity.",
      },
      {
        question: "Does Flowin replace our CRM?",
        answer:
          "No. Flowin sits next to the tools you already use and makes the path between them reliable.",
      },
      {
        question: "How do we start?",
        answer:
          "Open the application, map one high-value journey, for example inbound leads, and expand from there.",
      },
    ],
    resourceTitle: "Flowin setup guide",
    resourceDescription:
      "A practical walkthrough for launching your first growth automation without adding operational noise.",
  },
  {
    id: "score",
    name: "Score",
    slug: "score",
    kind: "app",
    tagline: "Marketing intelligence that makes the next decision obvious.",
    description:
      "See what is working across channels, compare performance and decide where the next budget should go.",
    heroTitle: "Know what is working before you spend more.",
    heroSubtitle:
      "Score brings channel performance into one view so teams can stop guessing and start allocating attention and budget with evidence.",
    appUrl: "https://score.nerainnovations.com",
    featured: true,
    order: 3,
    icon: "chart",
    features: [
      {
        title: "One score for the whole picture",
        body: "Social, ads and site activity stop living in separate exports. Score shows which efforts create attention, which ones create opportunity, and which ones only create noise.",
      },
      {
        title: "Decisions with a shorter distance",
        body: "Instead of monthly reconstruction, you get a live read on performance, so creative, media and sales can react while the window is still open.",
      },
    ],
    faqs: [
      {
        question: "Which channels can Score read?",
        answer:
          "Score is built for the channels Nera already runs with brands: social, advertising, web and the conversion points that sit after them.",
      },
      {
        question: "Is Score only for large teams?",
        answer:
          "No. It is most useful when a small team needs a clear weekly picture without hiring a full reporting function.",
      },
    ],
    resourceTitle: "Reading performance the Nera way",
    resourceDescription:
      "A one-page method for turning channel numbers into a decision you can act on this week.",
  },
  {
    id: "repora",
    name: "Repora",
    slug: "repora",
    kind: "app",
    tagline: "Reports that leadership can actually use.",
    description:
      "Clean, repeatable reporting across campaigns and systems, without rebuilding the same deck every Monday.",
    heroTitle: "Reporting that stays out of the way.",
    heroSubtitle:
      "Repora turns scattered campaign data into a consistent story: what moved, what stalled, and what deserves the next conversation.",
    appUrl: "https://repora.nerainnovations.com",
    featured: true,
    order: 4,
    icon: "report",
    features: [
      {
        title: "A report that does not need translation",
        body: "Repora is written for operators and for the people they report to. The same numbers, two altitudes, so weekly work and monthly decisions stay aligned.",
      },
      {
        title: "Less assembly, more judgment",
        body: "When the report builds itself from the systems you already run, the team spends time on interpretation instead of screenshots.",
      },
    ],
    faqs: [
      {
        question: "Who is Repora for?",
        answer:
          "Growth, marketing and leadership teams that want a shared, repeatable view of performance without a new analytics project every quarter.",
      },
      {
        question: "Can the report change by brand?",
        answer:
          "Yes. Each workspace can emphasize the metrics that matter for that brand while keeping the structure familiar.",
      },
    ],
    resourceTitle: "The Repora reporting brief",
    resourceDescription:
      "A compact template for the weekly questions every growth team should be able to answer.",
  },
  {
    id: "nera-luma",
    name: "Nera Luma",
    slug: "nera-luma",
    kind: "micro",
    tagline: "Lighter creative systems for faster brand output.",
    description: "A compact studio tool for producing on-brand visual variations without opening a full production cycle.",
    heroTitle: "Faster creative, still on brand.",
    heroSubtitle: "Nera Luma helps teams produce consistent visual output when the calendar moves faster than the studio.",
    appUrl: "https://luma.nerainnovations.com",
    featured: false,
    order: 5,
    icon: "spark",
    features: [
      {
        title: "Variations without starting over",
        body: "Generate on-brand alternatives for the formats you already use, instead of reopening a full design brief for every size and channel.",
      },
      {
        title: "Guardrails, not guesswork",
        body: "Brand colors, type and composition stay inside a defined frame so speed does not turn into visual drift.",
      },
    ],
    faqs: [
      {
        question: "Does Luma replace a design team?",
        answer: "No. It removes the repetitive production layer so designers and marketers can focus on the idea.",
      },
    ],
    resourceTitle: "Nera Luma overview",
    resourceDescription: "How we keep creative speed without losing the brand.",
  },
  {
    id: "nera-popup",
    name: "Nera Pop Up",
    slug: "nera-popup",
    kind: "micro",
    tagline: "On-site moments that capture intent.",
    description: "Timed, targeted site prompts that collect the right lead at the right moment.",
    heroTitle: "Catch intent while it is still there.",
    heroSubtitle: "Nera Pop Up turns high-intent visits into captured conversations, without covering the whole page in noise.",
    appUrl: "https://popup.nerainnovations.com",
    featured: false,
    order: 6,
    icon: "layers",
    features: [
      {
        title: "The right prompt, not every prompt",
        body: "Triggers follow behavior: time on page, exit intent, campaign source. Visitors see a reason to leave their details, not a wall.",
      },
      {
        title: "Built to hand off",
        body: "Every capture can move into Flowin, a CRM or a simple inbox so the moment does not die in a spreadsheet.",
      },
    ],
    faqs: [
      {
        question: "Will this hurt the site experience?",
        answer: "Only if it is used badly. Nera Pop Up is designed for restraint: one clear offer, one clear next step.",
      },
    ],
    resourceTitle: "High-intent capture notes",
    resourceDescription: "When a pop-up helps, and when it should stay quiet.",
  },
  {
    id: "nera-leads",
    name: "Nera Leads",
    slug: "nera-leads",
    kind: "micro",
    tagline: "A cleaner way to collect and qualify demand.",
    description: "Lead intake built for growth teams that need signal, not another unsorted inbox.",
    heroTitle: "Leads with context, not just a name.",
    heroSubtitle: "Nera Leads captures demand and the details that tell you whether it is worth a conversation.",
    appUrl: "https://leads.nerainnovations.com",
    featured: false,
    order: 7,
    icon: "users",
    features: [
      {
        title: "Intake that asks better questions",
        body: "Collect the fields that change routing, need, timing, channel, instead of a generic name-and-email dump.",
      },
      {
        title: "Qualification without a meeting",
        body: "Simple rules surface who should hear from sales first, so the team does not treat every row as equal.",
      },
    ],
    faqs: [
      {
        question: "Can Nera Leads sit on our existing site?",
        answer: "Yes. It is built to be embedded or linked from campaigns, landing pages and the Nera stack.",
      },
    ],
    resourceTitle: "Lead quality checklist",
    resourceDescription: "The five fields that usually tell you if a lead is real.",
  },
  {
    id: "nera-realtime",
    name: "Nera Real Time",
    slug: "nera-realtime",
    kind: "micro",
    tagline: "See activity as it happens.",
    description: "Live visibility on campaign and site movement for teams that cannot wait for yesterday's export.",
    heroTitle: "A live pulse on the work.",
    heroSubtitle: "Nera Real Time shows what is moving now, visits, actions, spikes, so you can respond in the same window.",
    appUrl: "https://realtime.nerainnovations.com",
    featured: false,
    order: 8,
    icon: "activity",
    features: [
      {
        title: "Now, not next week",
        body: "When a campaign lands, waiting for a Monday report is too late. Real Time keeps a simple pulse on the activity that matters.",
      },
      {
        title: "Alerts with a reason",
        body: "Unusual spikes or drops can notify the people who can actually do something about them.",
      },
    ],
    faqs: [
      {
        question: "Is this a full analytics suite?",
        answer: "No. It is a live layer. Score and Repora remain the places for deeper reading and reporting.",
      },
    ],
    resourceTitle: "Working in real time",
    resourceDescription: "A short guide to which live signals are worth a human response.",
  },
  {
    id: "nera-forms",
    name: "Nera Forms",
    slug: "nera-forms",
    kind: "micro",
    tagline: "Forms that feel like part of the brand.",
    description: "On-brand intake forms for reviews, briefings and campaign landings.",
    heroTitle: "Ask well. Capture cleanly.",
    heroSubtitle: "Nera Forms gives teams a consistent, branded way to collect the information every system downstream depends on.",
    appUrl: "https://forms.nerainnovations.com",
    featured: false,
    order: 9,
    icon: "form",
    features: [
      {
        title: "Brand-first intake",
        body: "The form should feel like the rest of the site: clear type, quiet fields, one obvious action.",
      },
      {
        title: "Ready for the next system",
        body: "Submissions can move into Leads, Flowin or email so the form is a door, not a dead end.",
      },
    ],
    faqs: [
      {
        question: "Can we use Nera Forms for Growth Review?",
        answer: "The public Growth Review on this site is a dedicated flow. Nera Forms is for the custom intake you need on campaigns and products.",
      },
    ],
    resourceTitle: "Form design notes",
    resourceDescription: "How we keep intake short enough to finish and complete enough to use.",
  },
];

export const seedProjects: Project[] = [
  {
    id: "review-boost",
    name: "Review Boost",
    category: "Google My Business",
    description: "Automatically request and manage Google reviews.",
    details:
      "A compact system for asking the right customers for a review at the right moment, then keeping Google Business Profile activity from going quiet. Built for local brands that already have demand and need proof in public.",
    tags: ["Automation", "Google Business"],
    accent: "#E8D5C4",
    icon: "star",
    order: 1,
  },
  {
    id: "mailing-project",
    name: "Mailing Project",
    category: "Email Marketing",
    description: "Automatically personalized email campaigns.",
    details:
      "A mailing setup that treats email as a system, not a blast. Sequences follow behavior and timing so the message feels written for one person even when it is sent to many.",
    tags: ["CRM", "Automation"],
    accent: "#C9A27A",
    icon: "mail",
    order: 2,
  },
  {
    id: "giveaway-conversion",
    name: "From Giveaway to Conversion",
    category: "Social Media",
    description: "Turn audience engagement into real opportunities.",
    details:
      "Giveaways create attention. This project designs the path after the attention, qualification, follow-up and an offer that is allowed to be useful, not only viral.",
    tags: ["Social", "Automation"],
    accent: "#E6D3C6",
    icon: "gift",
    order: 3,
  },
  {
    id: "campaign-kit",
    name: "Campaign Automation Kit",
    category: "Campaign Tools",
    description: "Plan, launch and optimize campaigns with ready workflows.",
    details:
      "A repeatable kit for launching campaigns without rebuilding the operating system each time: briefs, assets, tracking and the follow-through that usually gets dropped.",
    tags: ["Automation", "Advertising"],
    accent: "#B8B3A8",
    icon: "blocks",
    order: 4,
  },
  {
    id: "local-growth",
    name: "Local Growth Toolkit",
    category: "Growth Tools",
    description: "Find and engage local opportunities with data-driven tools.",
    details:
      "A practical stack for brands that win in a city or a region: local search, neighborhood-level messaging, and a short list of actions that actually move the store or the service.",
    tags: ["Research", "Experiment"],
    accent: "#C5CDD6",
    icon: "bars",
    order: 5,
  },
  {
    id: "anniversary",
    name: "Anniversary Communication",
    category: "CRM Systems",
    description: "Automate special-day communications for stronger customer relationships.",
    details:
      "Birthdays, renewals and milestones are easy to miss and expensive to ignore. This project turns those dates into a quiet, branded communication that keeps the relationship warm.",
    tags: ["CRM", "Retention"],
    accent: "#D9D2E8",
    icon: "user",
    order: 6,
  },
];

export const seedPartners: Partner[] = [
  { id: "linkedin", name: "LinkedIn", label: "Marketing Partner", order: 1 },
  { id: "tiktok", name: "TikTok", label: "Marketing Partner", order: 2 },
  { id: "google", name: "Google", label: "Partner", order: 3 },
  { id: "meta", name: "Meta", label: "Business Partner", order: 4 },
  { id: "openai", name: "OpenAI", label: "Partner", order: 5 },
  { id: "microsoft", name: "Microsoft", label: "for Startups", order: 6 },
];

export const seedLocations: MapLocation[] = [
  { id: "canada-altnok", country: "Canada", company: "Altnok", x: 18, y: 28, order: 1 },
  { id: "usa-bimaks", country: "USA", company: "Bimaks", x: 20, y: 40, order: 2 },
  { id: "germany-siskon", country: "Germany", company: "SISKON", x: 51, y: 26, order: 3 },
  { id: "estonia-tallinn", country: "Estonia", company: "Tallinn", x: 56, y: 20, order: 4 },
  { id: "turkiye-nera", country: "Türkiye", company: "Nera", x: 58, y: 38, order: 5 },
  { id: "uae-uniba", country: "UAE", company: "UNIBA", x: 63, y: 48, order: 6 },
  { id: "japan-barart", country: "Japan", company: "Barart", x: 88, y: 36, order: 7 },
];

export const seedContent: SiteContent = {
  systems: seedSystems,
  projects: seedProjects,
  partners: seedPartners,
  locations: seedLocations,
};

export const COUNTRY_PRESETS: { country: string; x: number; y: number }[] = [
  { country: "Canada", x: 18, y: 28 },
  { country: "USA", x: 20, y: 40 },
  { country: "Mexico", x: 18, y: 52 },
  { country: "Brazil", x: 36, y: 68 },
  { country: "United Kingdom", x: 45, y: 26 },
  { country: "Germany", x: 51, y: 26 },
  { country: "France", x: 47, y: 32 },
  { country: "Estonia", x: 56, y: 20 },
  { country: "Türkiye", x: 58, y: 38 },
  { country: "UAE", x: 63, y: 48 },
  { country: "India", x: 70, y: 48 },
  { country: "Japan", x: 88, y: 36 },
  { country: "Australia", x: 86, y: 78 },
  { country: "South Africa", x: 54, y: 78 },
];
