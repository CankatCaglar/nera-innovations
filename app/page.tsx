import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/home/Hero";
import { Systems } from "@/components/home/Systems";
import { Trusted } from "@/components/home/Trusted";
import { Projects } from "@/components/home/Projects";
import { SocialProof } from "@/components/home/SocialProof";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Systems />
      <Trusted />
      <Projects />
      <SocialProof />
    </SiteShell>
  );
}
