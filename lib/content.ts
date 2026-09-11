"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase";
import { seedContent } from "./seed";
import type {
  MapLocation,
  Partner,
  Project,
  SiteContent,
  System,
} from "./types";

function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

export function featuredSystems(systems: System[]) {
  return sortByOrder(systems.filter((system) => system.featured)).slice(0, 4);
}

export function microSystems(systems: System[]) {
  return sortByOrder(
    systems.filter((system) => system.kind === "micro" && !system.featured),
  );
}

async function readCollection<T>(name: string): Promise<T[] | null> {
  const db = getDb();
  if (!db) return null;
  const snap = await getDocs(query(collection(db, name), orderBy("order")));
  if (snap.empty) return null;
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
}

export async function loadSiteContent(): Promise<SiteContent> {
  if (!isFirebaseConfigured()) return seedContent;

  try {
    const [systems, projects, partners, locations] = await Promise.all([
      readCollection<System>("systems"),
      readCollection<Project>("projects"),
      readCollection<Partner>("partners"),
      readCollection<MapLocation>("locations"),
    ]);

    return {
      systems: systems?.length ? sortByOrder(systems) : seedContent.systems,
      projects: projects?.length ? sortByOrder(projects) : seedContent.projects,
      partners: partners?.length ? sortByOrder(partners) : seedContent.partners,
      locations: locations?.length
        ? sortByOrder(locations)
        : seedContent.locations,
    };
  } catch {
    return seedContent;
  }
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(seedContent);
  const [ready, setReady] = useState(!isFirebaseConfigured());

  useEffect(() => {
    let active = true;
    loadSiteContent().then((next) => {
      if (!active) return;
      setContent(next);
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return { ...content, ready };
}

export function getSystemBySlug(systems: System[], slug: string) {
  return systems.find((system) => system.slug === slug);
}
