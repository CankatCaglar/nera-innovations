import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/home/Hero";
import { Systems } from "@/components/home/Systems";
import { Trusted } from "@/components/home/Trusted";
import { Projects } from "@/components/home/Projects";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Systems />
      <Trusted />
      <Projects />
    </SiteShell>
  );
}
