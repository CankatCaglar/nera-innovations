import { SiteShell } from "@/components/layout/SiteShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="container-wide py-24">
        <p className="eyebrow">404</p>
        <h1 className="heading-display mt-3 text-5xl">This page is not here.</h1>
        <p className="mt-4 max-w-md text-muted">
          The path may have moved. The systems, the company and the contact page are still one click away.
        </p>
        <div className="mt-8">
          <Button href="/" arrow>
            Back home
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
