import type { MapLocation, Partner, Project, SiteContent, System } from "./types";
import { COUNTRY_COORDS, projectLonLat } from "./map";

export const seedSystems: System[] = [
  {
    id: "nera-social",
    name: "Nera Social",
    slug: "nera-social",
    kind: "external",
    tag: "Management",
    tagline:
      "Nera Social manages social media, content, and campaigns through an integrated marketing system.",
    description:
      "The growth agency behind Nera. Strategy, creative and media execution that turns visibility into a sales opportunity.",
    heroTitle: "A growth agency built around systems.",
    heroSubtitle:
      "Nera Social plans, creates and runs the work that feeds every system in the Nera stack, from social and ads to CRM and sales tracking.",
    appUrl: "https://nerasocial.com",
    featured: true,
    hasDetailPage: true,
    order: 3,
    icon: "share",
    logo: "/images/systems/icons/nera-social.webp",
    image: "/images/systems/nera-social.webp",
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
    tag: "Automate",
    tagline:
      "Flowin helps teams turn LinkedIn outreach into a scalable growth engine by automating profile visits, connection requests, personalized messages, and follow-ups while tracking every lead interaction in one place.",
    description:
      "Helps teams turn LinkedIn outreach into a scalable growth engine by automating profile visits, connection requests, personalized messages, and follow-ups while tracking every lead interaction in one place.",
    heroTitle: "Flowin LinkedIn Growth Automation",
    heroSubtitle:
      "Flowin helps teams turn LinkedIn outreach into a scalable growth engine by automating profile visits, connection requests, personalized messages, and follow-ups while tracking every lead interaction in one place.",
    appUrl: "https://flowin.nerainnovations.com",
    ctaLabel: "Request a Demo",
    ctaHref: "/growth-review",
    featured: true,
    hasDetailPage: true,
    order: 2,
    icon: "workflow",
    logo: "/images/systems/icons/flowin.webp",
    image: "/images/systems/flowin.webp",
    features: [
      {
        title: "Smart Outreach Flow Builder",
        body: "A visual automation flow that lets teams design LinkedIn outreach sequences with profile visits, connection requests, wait steps, conditional replies, InMail actions, and follow-up messages based on lead behavior.",
        image: "/images/systems/flowin-overview.webp",
      },
      {
        title: "Growth & Campaign Intelligence",
        body: "A performance dashboard that shows campaign activity, sent messages, new connections, response rates, key alerts, and trend insights so teams can quickly understand what drives pipeline growth.",
        image: "/images/systems/flowin-flow-builder.webp",
      },
    ],
    faqs: [
      {
        question: "Is Flowin safe to use with LinkedIn?",
        answer:
          "Yes. Flowin is built for measured outreach, with pacing and controls that keep activity inside a professional range instead of spraying the network.",
      },
      {
        question: "How long does it take to see results?",
        answer:
          "Most teams see a cleaner pipeline within the first two weeks once one live flow is running. The first useful signal is usually reply quality, not volume.",
      },
      {
        question: "Can I use my own LinkedIn account?",
        answer:
          "Yes. Flowin works with the account your team already uses, so outreach stays in your name and your relationships.",
      },
      {
        question: "Do you provide onboarding?",
        answer:
          "Yes. We help you map the first journey, connect the account and launch one campaign you can actually measure.",
      },
      {
        question: "Can I pause or stop campaigns anytime?",
        answer:
          "Yes. Every campaign can be paused or stopped immediately. Nothing continues in the background without you.",
      },
    ],
    resourceTitle: "LinkedIn Growth Playbook",
    resourceDescription:
      "Learn how B2B teams build a repeatable LinkedIn outreach system, with practical examples and campaign templates you can adapt.",
  },
  {
    id: "score",
    name: "Score",
    slug: "score",
    kind: "app",
    tag: "Analyze",
    tagline:
      "Score analyzes your content across 30+ micro-criteria and shows why it underperforms, with actionable suggestions in seconds.",
    description:
      "See what is working across channels, compare performance and decide where the next budget should go.",
    heroTitle:
      "Why isn't your content performing? Let Score AI tell you in seconds.",
    heroSubtitle:
      "Score AI analyzes your content across 30+ micro-criteria, understands your brand, and automatically delivers actionable suggestions for better results.",
    appUrl: "https://usescore.net",
    ctaLabel: "Try for Free",
    featured: true,
    hasDetailPage: true,
    order: 1,
    icon: "chart",
    logo: "/images/systems/icons/score.webp",
    image: "/images/systems/score.webp",
    features: [
      {
        title: "Makes your content better.",
        body: "It analyzes your content against 30+ micro quality criteria, learns your brand, and delivers actionable recommendations to improve performance.",
        points: ["Every post becomes stronger than the one before."],
        image: "/images/systems/score-improve.webp",
      },
      {
        title: "Score AI learns how your brand communicates.",
        body: "It stores your tone, visual language, and winning content patterns over time.",
        points: [
          "Extracts your Brand DNA.",
          "Learns from past content.",
          "Delivers more accurate recommendations through insights.",
          "Builds an evolving memory for your brand.",
        ],
        image: "/images/systems/score-branddna.webp",
      },
    ],
    faqs: [
      {
        question: "What exactly does Score AI do?",
        answer:
          "Score AI analyzes your content with 30+ micro criteria, gives a 0-100 score, and provides actionable suggestions to improve performance. It learns your brand, derives insights from past data, and speeds up your content workflow.",
      },
      {
        question: "Is my content secure?",
        answer:
          "Yes. Your content is stored securely and is not shared with third parties.",
      },
      {
        question: "Is Score AI free?",
        answer:
          "You can try the Starter plan free for 7 days, no credit card required. Upgrade to Pro when you need regular analysis.",
      },
      {
        question: "Can I change my plan later?",
        answer:
          "Yes. You can upgrade or change your plan anytime as your analysis volume grows.",
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
    tag: "Report",
    tagline:
      "Repora helps brands track social media performance across platforms, measure content impact, and turn data into clear, actionable insights.",
    description:
      "Helps brands track social media performance across platforms, measure content impact, and turn data into clear, actionable insights.",
    heroTitle: "Repora Social Media Performance Dashboard",
    heroSubtitle:
      "Repora helps brands track social media performance across platforms, measure content impact, and turn data into clear, actionable insights.",
    appUrl: "https://repora.nerainnovations.com",
    ctaLabel: "Request a Demo",
    ctaHref: "/growth-review",
    featured: true,
    hasDetailPage: true,
    order: 4,
    icon: "report",
    logo: "/images/systems/icons/repora.webp",
    image: "/images/systems/repora.webp",
    features: [
      {
        title: "Detailed Performance Analytics",
        body: "A detailed analytics screen that brings together views, follower growth, audience insights, demographics, and video performance for the selected platform.",
        image: "/images/systems/repora-performance.webp",
      },
      {
        title: "AI Supported Social Media Optimizations",
        body: "A monthly overview dashboard summarizing key metrics, top-performing content, platform growth, report status, and Repora’s performance insights.",
        image: "/images/systems/repora-home.webp",
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
    hasDetailPage: false,
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
    hasDetailPage: false,
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
    hasDetailPage: false,
    order: 7,
    icon: "users",
    image: "/images/systems/nera-leads.webp",
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
    hasDetailPage: false,
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
    hasDetailPage: false,
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
    id: "free-source-qualified-lead",
    name: "From Free Source to Qualified Lead",
    category: "Lead Generation",
    description:
      "A lead generation project that transforms free data sources into structured, qualified sales opportunities.",
    details:
      "A lead generation project that transforms free data sources into structured, qualified sales opportunities.",
    tags: ["Lead Generation", "Qualification"],
    accent: "#E8D5C4",
    icon: "users",
    image: "/images/projects/free-source-qualified-lead.webp",
    order: 1,
  },
  {
    id: "giveaway-conversion",
    name: "From Giveaway to Conversion",
    category: "Giveaway Funnel",
    description:
      "A campaign flow that turns giveaway participants into qualified prospects through follow-up and segmentation.",
    details:
      "A campaign flow that turns giveaway participants into qualified prospects through follow-up and segmentation.",
    tags: ["Giveaway Funnel", "Lead Conversion"],
    accent: "#E6D3C6",
    icon: "gift",
    image: "/images/projects/giveaway-conversion.webp",
    order: 2,
  },
  {
    id: "google-review-boost",
    name: "Google Review Boost",
    category: "Reputation",
    description:
      "A review generation project that encourages satisfied customers to leave high-quality Google reviews.",
    details:
      "A review generation project that encourages satisfied customers to leave high-quality Google reviews.",
    tags: ["Reputation", "Reviews"],
    accent: "#E8D5C4",
    icon: "star",
    image: "/images/projects/google-review-boost.webp",
    order: 3,
  },
  {
    id: "internal-comms-mailing",
    name: "Internal Communication Mailing Project",
    category: "Internal Comms",
    description:
      "A targeted mailing workflow designed to improve employee engagement and deliver internal updates with clarity.",
    details:
      "A targeted mailing workflow designed to improve employee engagement and deliver internal updates with clarity.",
    tags: ["Internal Comms", "Employee Engagement"],
    accent: "#C9A27A",
    icon: "mail",
    image: "/images/projects/internal-comms-mailing.webp",
    order: 4,
  },
  {
    id: "anniversary",
    name: "Anniversary Communication",
    category: "Milestone Campaigns",
    description:
      "A milestone-based communication system for celebrating customer or company anniversaries such as 10th, 20th, and 50th years.",
    details:
      "A milestone-based communication system for celebrating customer or company anniversaries such as 10th, 20th, and 50th years.",
    tags: ["Milestone Campaigns", "Loyalty"],
    accent: "#D9D2E8",
    icon: "user",
    image: "/images/projects/anniversary-communication.webp",
    order: 5,
  },
  {
    id: "smart-popup",
    name: "Smart Pop-up System",
    category: "Smart Targeting",
    description:
      "An intelligent pop-up system that shows the right message to visitors based on timing, behavior, and intent.",
    details:
      "An intelligent pop-up system that shows the right message to visitors based on timing, behavior, and intent.",
    tags: ["Smart Targeting", "Conversion"],
    accent: "#C5CDD6",
    icon: "spark",
    image: "/images/projects/smart-popup.webp",
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

function pin(
  id: string,
  country: string,
  company: string,
  lon: number,
  lat: number,
  order: number,
): MapLocation {
  return { id, country, company, ...projectLonLat(lon, lat), order };
}

export const seedLocations: MapLocation[] = [
  pin("canada-altnok", "Canada", "Altnok", -114.0, 56.1, 1),
  pin("usa-bimaks", "USA", "Bimaks", -87.6, 41.9, 2),
  pin("germany-siskon", "Germany", "SISKON", 10.45, 51.16, 3),
  pin("estonia-tallinn", "Estonia", "Tallinn", 24.75, 59.44, 4),
  pin("turkiye-nera", "Türkiye", "Nera", 27.14, 38.42, 5),
  pin("uae-uniba", "UAE", "UNIBA", 55.27, 25.2, 6),
  pin("japan-barart", "Japan", "Barart", 139.69, 35.68, 7),
];

export const seedContent: SiteContent = {
  systems: seedSystems,
  projects: seedProjects,
  partners: seedPartners,
  locations: seedLocations,
};

export const COUNTRY_PRESETS: { country: string; x: number; y: number }[] =
  Object.entries(COUNTRY_COORDS).map(([country, { lon, lat }]) => ({
    country,
    ...projectLonLat(lon, lat),
  }));
