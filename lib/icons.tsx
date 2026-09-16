import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Check,
  ChartNoAxesColumn,
  ClipboardList,
  Clock,
  FileText,
  FileX,
  Gift,
  Globe,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Phone,
  Share2,
  Sparkles,
  Star,
  Trash2,
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
  page: FileText,
  "page-off": FileX,
  star: Star,
  mail: Mail,
  gift: Gift,
  blocks: Boxes,
  bars: ChartNoAxesColumn,
  clock: Clock,
  chat: MessageCircle,
  user: User,
  arrow: ArrowRight,
  "arrow-down": ArrowDown,
  "arrow-left": ArrowLeft,
  external: ArrowUpRight,
  pin: MapPin,
  phone: Phone,
  globe: Globe,
  check: Check,
  plus: Plus,
  minus: Minus,
  trash: Trash2,
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
