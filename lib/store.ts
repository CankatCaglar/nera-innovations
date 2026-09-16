import { promises as fs } from "fs";
import path from "path";
import { getAdminDb, isFirebaseAdminConfigured } from "./firebase-admin";
import { seedContent, seedLocations, seedProjects, seedSystems } from "./seed";
import type { MapLocation, Project, SiteContent, System } from "./types";

const FILE = path.join(process.cwd(), "data", "content.json");
const CONTENT_DOC = "site/content";

function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

function mergeSeededLocations(locations: MapLocation[]) {
  return locations.map((location) => {
    const seeded =
      seedLocations.find((item) => item.id === location.id) ??
      seedLocations.find(
        (item) =>
          item.country === location.country &&
          item.company === location.company,
      );
    if (!seeded) return location;
    return { ...location, id: seeded.id, x: seeded.x, y: seeded.y };
  });
}

function mergeSeededProjects(projects: Project[]) {
  const byId = new Map(projects.map((project) => [project.id, project]));

  return seedProjects.map((seeded) => {
    const existing = byId.get(seeded.id);
    return existing
      ? { ...existing, ...seeded, image: toOptimizedAsset(existing.image ?? seeded.image) }
      : seeded;
  });
}

function toOptimizedAsset(url?: string) {
  if (!url) return url;
  if (url.includes("/uploads/") || url.endsWith("favicon.png") || url.endsWith("apple-icon.png")) {
    return url;
  }
  if (url.includes("score-brand-dna")) return "/images/systems/score-branddna.webp";
  if (
    url === "/images/systems/flowin-hero.webp" ||
    url === "/images/systems/flowin.jpg"
  ) {
    return "/images/systems/flowin.webp";
  }
  return url.replace(/\.(png|jpe?g)$/i, ".webp");
}

function mergeSeededHomeFields(systems: System[]) {
  return systems.map((system) => {
    const seeded = seedSystems.find((item) => item.id === system.id);
    if (!seeded) return system;

    const next = { ...system };
    if (system.id === "score" || system.id === "flowin" || system.id === "repora") {
      next.tagline = system.tagline || seeded.tagline;
      next.description = system.description || seeded.description;
      next.appUrl = seeded.appUrl;
      next.ctaLabel = system.ctaLabel || seeded.ctaLabel;
      next.ctaHref = seeded.ctaHref;
    }
    if (system.id === "nera-social") {
      next.tagline = system.tagline || seeded.tagline;
    }
    if (typeof system.hasDetailPage !== "boolean") {
      next.hasDetailPage = seeded.hasDetailPage ?? seeded.kind !== "micro";
    }
    if (seeded.tag && !system.tag) {
      next.tag = seeded.tag;
      next.order = seeded.order;
    }
    if (seeded.logo && !system.logo) {
      next.logo = seeded.logo;
    }
    if (seeded.features?.length && !system.features?.length) {
      next.features = seeded.features;
    } else if (next.features?.length) {
      next.features = next.features.map((feature) => ({
        ...feature,
        image: toOptimizedAsset(feature.image),
      }));
    }
    if (seeded.faqs?.length && !system.faqs?.length) {
      next.faqs = seeded.faqs;
    }
    if (seeded.resourceTitle && !system.resourceTitle) {
      next.resourceTitle = seeded.resourceTitle;
      next.resourceDescription = seeded.resourceDescription;
    }
    if (seeded.image && !system.image) {
      next.image = seeded.image;
    }
    if (seeded.heroTitle && !system.heroTitle) {
      next.heroTitle = seeded.heroTitle;
      next.heroSubtitle = seeded.heroSubtitle;
    }
    next.image = toOptimizedAsset(next.image);
    next.logo = toOptimizedAsset(next.logo);
    if (next.id === "flowin" || next.slug === "flowin") {
      next.image = "/images/systems/flowin.webp";
    }
    return next;
  });
}

function normalizeContent(parsed: Partial<SiteContent> | undefined): SiteContent {
  return {
    systems: parsed?.systems?.length
      ? sortByOrder(mergeSeededHomeFields(parsed.systems))
      : seedContent.systems,
    projects: parsed?.projects?.length
      ? sortByOrder(mergeSeededProjects(parsed.projects))
      : seedContent.projects,
    partners: parsed?.partners?.length
      ? sortByOrder(parsed.partners)
      : seedContent.partners,
    locations: parsed?.locations?.length
      ? sortByOrder(mergeSeededLocations(parsed.locations))
      : seedContent.locations,
  };
}

function cloneContent(content: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

async function readLocalFile(): Promise<SiteContent | null> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return normalizeContent(JSON.parse(raw) as Partial<SiteContent>);
  } catch {
    return null;
  }
}

async function writeLocalFile(content: SiteContent) {
  try {
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(content, null, 2));
  } catch {
    // Vercel and other serverless hosts are read-only.
  }
}

export async function readStoredContent(): Promise<SiteContent> {
  if (isFirebaseAdminConfigured()) {
    const db = getAdminDb();
    if (db) {
      try {
        const snap = await db.doc(CONTENT_DOC).get();
        if (snap.exists) {
          return normalizeContent(snap.data() as Partial<SiteContent>);
        }

        const fallback = (await readLocalFile()) ?? seedContent;
        await db.doc(CONTENT_DOC).set(cloneContent(fallback));
        return fallback;
      } catch (error) {
        console.warn("Firestore unavailable, using local content.", error);
      }
    }
  }

  return (await readLocalFile()) ?? seedContent;
}

export async function writeStoredContent(content: SiteContent) {
  const next = cloneContent(content);

  if (isFirebaseAdminConfigured()) {
    const db = getAdminDb();
    if (db) {
      try {
        await db.doc(CONTENT_DOC).set(next);
      } catch (error) {
        console.warn("Firestore write failed, saved locally only.", error);
      }
    }
  }

  await writeLocalFile(next);
}
