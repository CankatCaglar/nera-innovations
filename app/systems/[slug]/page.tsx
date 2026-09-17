"use client";

import { use, useState, type ReactNode } from "react";
import Image from "next/image";
import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { EditableText } from "@/components/admin/EditableText";
import { ReplaceImage } from "@/components/admin/ReplaceImage";
import { RestoreOriginal } from "@/components/admin/RestoreOriginal";
import { useAdmin } from "@/components/admin/AdminProvider";
import { getSystemBySlug, hasSystemDetailPage, systemDisplayImage, useSiteContent } from "@/lib/content";
import { usePatchSystem } from "@/lib/use-patch-system";
import {
  getSeededSystem,
  isDetailPageChanged,
  isFeatureChanged,
  isHeroChanged,
  restoreDetailDefaults,
} from "@/lib/system-defaults";
import { Icon } from "@/lib/icons";
import { Minus, Plus, RotateCcw, Trash2 } from "lucide-react";
import type { System, SystemFaq, SystemFeature } from "@/lib/types";

export default function SystemDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { systems, ready } = useSiteContent();
  const system = getSystemBySlug(systems, slug);

  if (ready && (!system || !hasSystemDetailPage(system))) {
    return (
      <SiteShell>
        <div className="container-wide py-24">
          <h1 className="text-3xl font-semibold">System not found</h1>
          <p className="mt-3 text-muted">This system is not available.</p>
        </div>
      </SiteShell>
    );
  }

  if (!system) {
    return (
      <SiteShell>
        <div className="container-wide py-24 text-muted">Loading...</div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageRestoreBar system={system} />
      <Hero system={system} />
      <Features system={system} />
      <Faqs system={system} />
      <ResourceBanner system={system} />
    </SiteShell>
  );
}

function PageRestoreBar({ system }: { system: System }) {
  const { isAdmin } = useAdmin();
  const patch = usePatchSystem(system.id);
  const seeded = getSeededSystem(system.id);
  const [confirm, setConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!isAdmin || !seeded || !isDetailPageChanged(system, seeded)) return null;

  async function restorePage() {
    setSaving(true);
    try {
      await patch((current) => restoreDetailDefaults(current, seeded!));
      setConfirm(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="border-b border-nera/15 bg-sand">
        <div className="container-wide flex flex-wrap items-center justify-between gap-3 py-3">
          <p className="text-sm text-muted">
            This page is different from the original. You can restore the first version at any time.
          </p>
          <button
            type="button"
            onClick={() => setConfirm(true)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-nera shadow-sm hover:bg-cream"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={2} />
            Restore original page
          </button>
        </div>
      </div>
      {confirm ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          onClick={() => setConfirm(false)}
        >
          <div
            className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-[0_18px_50px_rgba(148,93,60,0.12)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="eyebrow">Restore original</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              Restore the first version?
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">
              The intro, image and sections will go back to the original copy.
              Your latest edits on this page will be replaced.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => void restorePage()}
                className="rounded-full bg-nera px-5 py-3 text-sm font-semibold text-white"
              >
                {saving ? "Restoring..." : "Yes, restore original"}
              </button>
              <button
                type="button"
                onClick={() => setConfirm(false)}
                className="rounded-full border border-black/8 bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function goldTitle(title: string) {
  const parts = title.trim().split(" ");
  const last = parts.pop() ?? "";
  return (
    <>
      {parts.join(" ")}{" "}
      <span className="text-gold">{last}</span>
    </>
  );
}

function HeroTitleDisplay({ title }: { title: string }) {
  const marker = "Score AI";
  const index = title.indexOf(marker);
  if (index === -1) return goldTitle(title);
  return (
    <>
      {title.slice(0, index)}
      <span className="text-gold">{marker}</span>
      {title.slice(index + marker.length)}
    </>
  );
}

function systemCta(system: System) {
  const href = system.ctaHref ?? system.appUrl;
  const external = href.startsWith("http");
  const label =
    system.ctaLabel ??
    (system.slug === "score" ? "Try for Free" : "Try the application");
  return { href, external, label };
}

function Hero({ system }: { system: System }) {
  const { isAdmin } = useAdmin();
  const patch = usePatchSystem(system.id);
  const seeded = getSeededSystem(system.id);
  const framed = system.slug !== "score" && system.slug !== "flowin";
  const cta = systemCta(system);

  return (
    <section className="flex min-h-[calc(100svh-84px)] items-center overflow-hidden bg-[#fbf8f3]">
      <div className="container-wide grid w-full items-center gap-12 py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:py-0">
        <div>
          {isAdmin && seeded && isHeroChanged(system, seeded) ? (
            <div className="mb-4">
              <RestoreOriginal
                show
                label="Restore original intro"
                onRestore={() =>
                  void patch({
                    name: seeded.name,
                    heroTitle: seeded.heroTitle,
                    heroSubtitle: seeded.heroSubtitle,
                    image: seeded.image,
                    ctaLabel: seeded.ctaLabel,
                  })
                }
              />
            </div>
          ) : null}
          <p className="eyebrow">
            <EditableText
              enabled={isAdmin}
              value={system.name}
              placeholder="System name"
              onSave={(name) => patch({ name })}
            />
          </p>
          <RestoreOriginal
            show={Boolean(isAdmin && seeded && system.name !== seeded.name)}
            onRestore={() => void patch({ name: seeded!.name })}
          />
          <h1 className="heading-display mt-4 max-w-xl text-5xl text-ink sm:text-6xl">
            <EditableText
              enabled={isAdmin}
              value={system.heroTitle}
              placeholder="Hero title"
              className="heading-display text-5xl text-ink sm:text-6xl"
              renderDisplay={(title) => <HeroTitleDisplay title={title} />}
              onSave={(heroTitle) => patch({ heroTitle })}
            />
          </h1>
          <RestoreOriginal
            show={Boolean(isAdmin && seeded && system.heroTitle !== seeded.heroTitle)}
            onRestore={() => void patch({ heroTitle: seeded!.heroTitle })}
          />
          <p className="mt-6 max-w-lg text-base leading-8 text-muted">
            <EditableText
              enabled={isAdmin}
              multiline
              value={system.heroSubtitle}
              placeholder="Hero description"
              onSave={(heroSubtitle) => patch({ heroSubtitle })}
            />
          </p>
          <RestoreOriginal
            show={Boolean(isAdmin && seeded && system.heroSubtitle !== seeded.heroSubtitle)}
            onRestore={() => void patch({ heroSubtitle: seeded!.heroSubtitle })}
          />
          <div className="mt-8">
            {isAdmin ? (
              <div className="flex flex-wrap items-center gap-3">
                <Button href={cta.href} arrow external={cta.external}>
                  {cta.label}
                </Button>
                <div className="min-w-40 max-w-56">
                  <EditableText
                    enabled
                    value={cta.label}
                    placeholder="Button label"
                    displayClassName="text-xs font-medium text-soft"
                    onSave={(ctaLabel) => patch({ ctaLabel })}
                  />
                  <RestoreOriginal
                    show={Boolean(seeded && (system.ctaLabel ?? "") !== (seeded.ctaLabel ?? ""))}
                    onRestore={() => void patch({ ctaLabel: seeded!.ctaLabel })}
                  />
                </div>
              </div>
            ) : (
              <Button href={cta.href} arrow external={cta.external}>
                {cta.label}
              </Button>
            )}
          </div>
        </div>

        <div className="relative">
          {system.image ? (
            <div
              className={
                framed
                  ? "relative overflow-hidden rounded-[36px] shadow-[0_28px_70px_rgba(148,93,60,0.16)] lg:translate-x-2"
                  : system.slug === "flowin"
                    ? "relative overflow-hidden rounded-[20px]"
                    : "relative"
              }
            >
              <Image
                src={systemDisplayImage(system) ?? system.image ?? ""}
                alt=""
                width={system.slug === "flowin" ? 883 : 980}
                height={system.slug === "flowin" ? 587 : 720}
                sizes="(min-width: 1024px) 46vw, 90vw"
                unoptimized={
                  system.slug === "flowin" ||
                  Boolean(system.image?.startsWith("http"))
                }
                className={
                  framed
                    ? "relative z-10 max-h-[min(560px,62svh)] w-full bg-white object-contain"
                    : system.slug === "flowin"
                      ? "relative z-10 block h-auto w-full rounded-[20px] object-contain"
                      : "relative z-10 max-h-[min(600px,66svh)] w-full bg-transparent object-contain"
                }
                style={
                  system.slug === "flowin"
                    ? { width: "100%", height: "auto", aspectRatio: "auto", borderRadius: 20 }
                    : undefined
                }
                priority
              />
              <ReplaceImage
                enabled={isAdmin}
                slug={system.slug}
                onUploaded={(image) => patch({ image })}
              />
            </div>
          ) : (
            <div className="relative flex min-h-[280px] items-center justify-center rounded-[36px] bg-white shadow-[0_28px_70px_rgba(148,93,60,0.16)]">
              <Icon name={system.icon} className="h-16 w-16 text-nera" />
              <ReplaceImage
                enabled={isAdmin}
                slug={system.slug}
                onUploaded={(image) => patch({ image })}
              />
            </div>
          )}
          <RestoreOriginal
            show={Boolean(isAdmin && seeded && (system.image ?? "") !== (seeded.image ?? ""))}
            label="Restore original image"
            onRestore={() => void patch({ image: seeded!.image })}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureShot({
  src,
  icon,
  bleed,
  children,
}: {
  src?: string;
  icon: string;
  bleed: "left" | "right";
  children?: ReactNode;
}) {
  return (
    <div
      className={`relative min-w-0 ${
        bleed === "left" ? "lg:-ml-4 xl:-ml-8" : "lg:-mr-4 xl:-mr-8"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[56px] bg-[radial-gradient(ellipse_at_center,rgba(221,160,109,0.22),transparent_68%)]"
      />
      <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_28px_72px_rgba(70,42,18,0.14)] ring-1 ring-black/5 sm:rounded-[36px] lg:rounded-[20px]">
        {src ? (
          <Image
            src={src}
            alt=""
            width={1920}
            height={1080}
            sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 54vw, 100vw"
            unoptimized={src.startsWith("http")}
            className="block h-auto w-full"
            style={{ width: "100%", height: "auto", aspectRatio: "auto" }}
          />
        ) : (
          <div className="flex min-h-[280px] items-center justify-center bg-[#fbf8f3] sm:min-h-[340px]">
            <Icon name={icon} className="h-14 w-14 text-nera/70" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function Features({ system }: { system: System }) {
  const { isAdmin } = useAdmin();
  const patch = usePatchSystem(system.id);
  const seeded = getSeededSystem(system.id);

  async function updateFeature(index: number, next: Partial<SystemFeature>) {
    await patch((current) => ({
      ...current,
      features: current.features.map((feature, featureIndex) =>
        featureIndex === index ? { ...feature, ...next } : feature,
      ),
    }));
  }

  async function updatePoint(index: number, pointIndex: number, value: string) {
    await patch((current) => ({
      ...current,
      features: current.features.map((feature, featureIndex) => {
        if (featureIndex !== index) return feature;
        const points = [...(feature.points ?? [])];
        points[pointIndex] = value;
        return { ...feature, points };
      }),
    }));
  }

  async function addPoint(index: number) {
    await patch((current) => ({
      ...current,
      features: current.features.map((feature, featureIndex) =>
        featureIndex === index
          ? { ...feature, points: [...(feature.points ?? []), ""] }
          : feature,
      ),
    }));
  }

  async function removePoint(index: number, pointIndex: number) {
    await patch((current) => ({
      ...current,
      features: current.features.map((feature, featureIndex) =>
        featureIndex === index
          ? { ...feature, points: (feature.points ?? []).filter((_, i) => i !== pointIndex) }
          : feature,
      ),
    }));
  }

  async function addFeature() {
    await patch((current) => ({
      ...current,
      features: [
        ...current.features,
        { title: "", body: "" },
      ],
    }));
  }

  async function removeFeature(index: number) {
    await patch((current) => ({
      ...current,
      features: current.features.filter((_, featureIndex) => featureIndex !== index),
    }));
  }

  return (
    <section className="overflow-x-clip bg-white py-20">
      <div className="container-wide space-y-24 lg:space-y-28">
        {system.features.map((feature, index) => {
          const reverse = index % 2 === 1;
          const original = seeded?.features[index];
          const changed = isAdmin && isFeatureChanged(feature, original);
          return (
            <div key={`${system.id}-feature-${index}`} className="relative">
              {isAdmin ? (
                <div className="absolute -top-3 right-0 z-10 flex gap-2">
                  {original && changed ? (
                    <button
                      type="button"
                      aria-label="Restore original section"
                      title="Restore original section"
                      onClick={() => void updateFeature(index, original)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/8 bg-white text-nera shadow-sm"
                    >
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </button>
                  ) : null}
                  <button
                    type="button"
                    aria-label="Remove section"
                    onClick={() => void removeFeature(index)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/8 bg-white text-nera shadow-sm"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </div>
              ) : null}
              <div
                className={`grid items-center gap-10 lg:gap-12 xl:gap-16 ${
                  reverse
                    ? "lg:grid-cols-[minmax(0,1.22fr)_minmax(0,0.78fr)] lg:[&>*:first-child]:order-2"
                    : "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
                }`}
              >
              <div>
                <h2 className="heading-display max-w-lg text-4xl text-ink sm:text-5xl">
                  <EditableText
                    enabled={isAdmin}
                    value={feature.title}
                    placeholder="Section title"
                    className="heading-display text-4xl text-ink sm:text-5xl"
                    renderDisplay={(title) => goldTitle(title)}
                    onSave={(title) => updateFeature(index, { title })}
                  />
                </h2>
                <RestoreOriginal
                  show={Boolean(isAdmin && original && feature.title !== original.title)}
                  onRestore={() => void updateFeature(index, { title: original!.title })}
                />
                <p className="mt-5 max-w-md text-base leading-8 text-muted">
                  <EditableText
                    enabled={isAdmin}
                    multiline
                    value={feature.body}
                    placeholder="Section description"
                    onSave={(body) => updateFeature(index, { body })}
                  />
                </p>
                <RestoreOriginal
                  show={Boolean(isAdmin && original && feature.body !== original.body)}
                  onRestore={() => void updateFeature(index, { body: original!.body })}
                />
                {feature.points?.length || isAdmin ? (
                  <ul className="mt-6 space-y-3">
                    {(feature.points ?? []).map((point, pointIndex) => (
                      <li key={`${index}-${pointIndex}`} className="flex items-start gap-3 text-sm text-ink">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sand text-nera">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <EditableText
                            enabled={isAdmin}
                            value={point}
                            placeholder="Bullet point"
                            displayClassName="text-sm text-ink"
                            onSave={(value) => updatePoint(index, pointIndex, value)}
                          />
                          <RestoreOriginal
                            show={Boolean(
                              isAdmin &&
                                original?.points?.[pointIndex] !== undefined &&
                                point !== original.points[pointIndex],
                            )}
                            onRestore={() =>
                              void updatePoint(index, pointIndex, original!.points![pointIndex])
                            }
                          />
                        </div>
                        {isAdmin ? (
                          <button
                            type="button"
                            aria-label="Remove point"
                            onClick={() => void removePoint(index, pointIndex)}
                            className="mt-0.5 text-soft hover:text-nera"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                          </button>
                        ) : null}
                      </li>
                    ))}
                    {isAdmin ? (
                      <li>
                        <button
                          type="button"
                          onClick={() => void addPoint(index)}
                          className="text-xs font-semibold text-nera hover:text-nera-deep"
                        >
                          + Add point
                        </button>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
              <div className="min-w-0">
                <FeatureShot
                  src={feature.image ?? system.image}
                  icon={system.icon}
                  bleed={reverse ? "left" : "right"}
                >
                  <ReplaceImage
                    enabled={isAdmin}
                    slug={`${system.slug}-feature-${index}`}
                    onUploaded={(image) => updateFeature(index, { image })}
                  />
                </FeatureShot>
                <RestoreOriginal
                  show={Boolean(
                    isAdmin && original && (feature.image ?? "") !== (original.image ?? ""),
                  )}
                  label="Restore original image"
                  onRestore={() => void updateFeature(index, { image: original!.image })}
                />
              </div>
              </div>
            </div>
          );
        })}
        {isAdmin ? (
          <button
            type="button"
            onClick={() => void addFeature()}
            className="rounded-full border border-dashed border-nera/40 px-5 py-3 text-sm font-semibold text-nera hover:bg-sand"
          >
            + Add section
          </button>
        ) : null}
      </div>
    </section>
  );
}

function Faqs({ system }: { system: System }) {
  const { isAdmin } = useAdmin();
  const patch = usePatchSystem(system.id);
  const seeded = getSeededSystem(system.id);
  const [openFaq, setOpenFaq] = useState(0);

  async function updateFaq(index: number, next: Partial<SystemFaq>) {
    await patch((current) => ({
      ...current,
      faqs: current.faqs.map((faq, faqIndex) =>
        faqIndex === index ? { ...faq, ...next } : faq,
      ),
    }));
  }

  async function addFaq() {
    const nextIndex = system.faqs.length;
    await patch((current) => ({
      ...current,
      faqs: [
        ...current.faqs,
        { question: "", answer: "" },
      ],
    }));
    setOpenFaq(nextIndex);
  }

  async function removeFaq(index: number) {
    await patch((current) => ({
      ...current,
      faqs: current.faqs.filter((_, faqIndex) => faqIndex !== index),
    }));
    setOpenFaq((current) => {
      if (current === index) return -1;
      if (current > index) return current - 1;
      return current;
    });
  }

  if (!system.faqs.length && !isAdmin) return null;

  return (
    <section className="bg-[#fbf8f3] py-20">
      <div className="container-wide grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Frequently asked questions</p>
          <h2 className="heading-display mt-3 max-w-sm text-4xl text-ink sm:text-5xl">
            Everything you need to <span className="text-gold">know</span>.
          </h2>
        </div>
        <div className="space-y-3">
          {system.faqs.map((faq, index) => {
            const open = openFaq === index;
            const original = seeded?.faqs[index];
            return (
              <div
                key={`${system.id}-faq-${index}`}
                className="rounded-[22px] border border-black/6 bg-white px-5"
              >
                <div className="flex items-start gap-3 py-4">
                  {isAdmin ? (
                    <>
                      <div className="min-w-0 flex-1">
                        <EditableText
                          enabled
                          value={faq.question}
                          placeholder="Question"
                          displayClassName="text-base font-semibold text-ink"
                          onSave={(question) => updateFaq(index, { question })}
                        />
                      </div>
                      <button
                        type="button"
                        aria-label={open ? "Collapse answer" : "Expand answer"}
                        onClick={() => setOpenFaq(open ? -1 : index)}
                        className="mt-1 shrink-0 text-nera"
                      >
                        {open ? (
                          <Minus className="h-4 w-4" strokeWidth={1.75} />
                        ) : (
                          <Plus className="h-4 w-4" strokeWidth={1.75} />
                        )}
                      </button>
                      <button
                        type="button"
                        aria-label="Remove question"
                        onClick={() => void removeFaq(index)}
                        className="mt-1 shrink-0 text-soft hover:text-nera"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="flex min-w-0 flex-1 items-center justify-between gap-4 text-left text-base font-semibold text-ink"
                      onClick={() => setOpenFaq(open ? -1 : index)}
                    >
                      <span>{faq.question}</span>
                      {open ? (
                        <Minus className="h-4 w-4 shrink-0 text-nera" strokeWidth={1.75} />
                      ) : (
                        <Plus className="h-4 w-4 shrink-0 text-nera" strokeWidth={1.75} />
                      )}
                    </button>
                  )}
                </div>
                {open ? (
                  <div className="pb-5">
                    <p className="text-sm leading-7 text-muted">
                      <EditableText
                        enabled={isAdmin}
                        multiline
                        value={faq.answer}
                        placeholder="Answer"
                        displayClassName="text-sm leading-7 text-muted"
                        onSave={(answer) => updateFaq(index, { answer })}
                      />
                    </p>
                    <RestoreOriginal
                      show={Boolean(
                        isAdmin &&
                          original &&
                          (faq.question !== original.question || faq.answer !== original.answer),
                      )}
                      onRestore={() =>
                        void updateFaq(index, {
                          question: original!.question,
                          answer: original!.answer,
                        })
                      }
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
          {isAdmin ? (
            <button
              type="button"
              onClick={() => void addFaq()}
              className="rounded-full border border-dashed border-nera/40 px-5 py-3 text-sm font-semibold text-nera hover:bg-sand"
            >
              + Add question
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ResourceBanner({ system }: { system: System }) {
  return (
    <section className="bg-white py-20">
      <div className="container-wide">
        <div className="grid items-center gap-10 rounded-[36px] bg-[#fbf8f3] px-6 py-10 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-12 lg:px-12 lg:py-14">
          <div>
            <p className="eyebrow">Free resource</p>
            <h2 className="heading-display mt-3 max-w-md text-4xl text-ink sm:text-5xl">
              {goldTitle(system.resourceTitle)}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">
              {system.resourceDescription}
            </p>
          </div>

          <div className="mx-auto flex h-72 w-48 items-start rounded-md bg-gradient-to-br from-[#f3e7d8] via-white to-[#ead7c4] px-5 pt-8 pb-6 shadow-[0_22px_50px_rgba(148,93,60,0.16)] sm:h-80 sm:w-52">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-soft uppercase">
                {system.name}
              </p>
              <p className="heading-display mt-5 text-[1.7rem] leading-8 font-bold text-ink">
                {system.resourceTitle}
              </p>
              <p className="mt-4 text-xl font-light tracking-tight text-nera">
                2026
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-black/5 bg-white p-6 sm:p-7">
            <p className="text-lg font-semibold tracking-tight text-ink">
              Download the free guide
            </p>
            <div className="mt-5">
              <LeadForm
                type="resource"
                systemSlug={system.slug}
                fields={["fullName", "email"]}
                submitLabel="Download guide"
                successTitle="On its way."
                successBody="We will send the resource to your work email."
              />
            </div>
            <p className="mt-3 text-center text-[11px] text-soft">
              We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
