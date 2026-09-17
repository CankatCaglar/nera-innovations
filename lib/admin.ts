"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDb } from "./firebase";
import { seedContent } from "./seed";
import type { Lead, MapLocation, Partner, Project, System } from "./types";

function requireDb() {
  const db = getDb();
  if (!db) throw new Error("Firebase is not configured");
  return db;
}

export async function seedDatabase() {
  const db = requireDb();
  await Promise.all(
    seedContent.systems.map((item) =>
      setDoc(doc(db, "systems", item.id), item),
    ),
  );
  await Promise.all(
    seedContent.projects.map((item) =>
      setDoc(doc(db, "projects", item.id), item),
    ),
  );
  await Promise.all(
    seedContent.partners.map((item) =>
      setDoc(doc(db, "partners", item.id), item),
    ),
  );
  await Promise.all(
    seedContent.locations.map((item) =>
      setDoc(doc(db, "locations", item.id), item),
    ),
  );
}

export async function saveSystem(system: System) {
  const db = requireDb();
  await setDoc(doc(db, "systems", system.id), system);
}

export async function toggleFeatured(system: System, featured: boolean, current: System[]) {
  if (featured) {
    const already = current.filter((item) => item.featured && item.id !== system.id);
    if (already.length >= 4) {
      throw new Error("You can feature up to 4 systems");
    }
  }
  await saveSystem({ ...system, featured });
}

export async function saveLocation(location: Omit<MapLocation, "id"> & { id?: string }) {
  const db = requireDb();
  if (location.id) {
    const { id, ...data } = location;
    await setDoc(doc(db, "locations", id), { ...data, id });
    return id;
  }
  const created = await addDoc(collection(db, "locations"), location);
  await updateDoc(created, { id: created.id });
  return created.id;
}

export async function removeDoc(path: string, id: string) {
  const db = requireDb();
  await deleteDoc(doc(db, path, id));
}

export async function savePartner(partner: Omit<Partner, "id"> & { id?: string }) {
  const db = requireDb();
  if (partner.id) {
    await setDoc(doc(db, "partners", partner.id), partner);
    return partner.id;
  }
  const created = await addDoc(collection(db, "partners"), partner);
  await updateDoc(created, { id: created.id });
  return created.id;
}

export async function saveProject(project: Project) {
  const db = requireDb();
  await setDoc(doc(db, "projects", project.id), project);
}

export async function loadLeads(): Promise<Lead[]> {
  const db = requireDb();
  const snap = await getDocs(query(collection(db, "leads"), orderBy("createdAt", "desc")));
  return snap.docs.map((item) => {
    const data = item.data();
    return {
      id: item.id,
      type: data.type,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      website: data.website,
      subject: data.subject,
      message: data.message,
      systemSlug: data.systemSlug,
      createdAt:
        typeof data.createdAt === "string"
          ? data.createdAt
          : data.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    };
  });
}

