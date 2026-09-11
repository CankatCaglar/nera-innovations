import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  ChartNoAxesColumn,
  ClipboardList,
  FileText,
  Gift,
  Globe,
  Layers,
  Mail,
  MapPin,
  Phone,
  Share2,
  Sparkles,
  Star,
  User,
  Users,
  Workflow,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  share: Share2,
  workflow: Workflow,
  chart: BarChart3,
  report: FileText,
  spark: Sparkles,
  layers: Layers,
  users: Users,
  activity: Activity,
  form: ClipboardList,
  star: Star,
  mail: Mail,
  gift: Gift,
  blocks: Boxes,
  bars: ChartNoAxesColumn,
  user: User,
  arrow: ArrowRight,
  external: ArrowUpRight,
  pin: MapPin,
  phone: Phone,
  globe: Globe,
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Lucide = icons[name] ?? Sparkles;
  return <Lucide className={className} strokeWidth={1.75} aria-hidden />;
}
