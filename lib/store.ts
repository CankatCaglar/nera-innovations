import { promises as fs } from "fs";
import path from "path";
import { getAdminDb, isFirebaseAdminConfigured } from "./firebase-admin";
import { seedContent, seedLocations, seedSystems } from "./seed";
import type { MapLocation, SiteContent, System } from "./types";

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

function mergeSeededHomeFields(systems: System[]) {
  return systems.map((system) => {
    const seeded = seedSystems.find((item) => item.id === system.id);
    if (!seeded) return system;

    const next = { ...system };
    if (seeded.tag && !system.tag) {
      next.tag = seeded.tag;
      next.tagline = seeded.tagline;
      next.order = seeded.order;
    }
    if (system.id === "flowin" && seeded.image) {
      next.image = seeded.image;
    }
    if (seeded.logo) {
      next.logo = seeded.logo;
    }
    if (seeded.features?.length) {
      next.features = seeded.features;
    }
    if (seeded.faqs?.length) {
      next.faqs = seeded.faqs;
    }
    if (seeded.resourceTitle) {
      next.resourceTitle = seeded.resourceTitle;
      next.resourceDescription = seeded.resourceDescription;
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
      ? sortByOrder(parsed.projects)
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
