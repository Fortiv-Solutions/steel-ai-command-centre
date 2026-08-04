import {
  LayoutDashboard,
  Crown,
  Bot,
  Sparkles,
  Building2,
  Zap,
  Workflow,
  Brain,
  FileSearch,
  FileBarChart,
  CheckCircle2,
  ListTodo,
  FolderKanban,
  BookOpen,
  ShieldAlert,
  BadgeCheck,
  Users,
  Truck,
  Boxes,
  Flame,
  ScrollText,
  Warehouse,
  Factory,
  Wallet,
  UserCog,
  Scale,
  Plug,
  Lock,
  Settings2,
  Sliders,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavGroup = {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    title: "EXECUTIVE",
    icon: Crown,
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
      { label: "Executive Cockpit", to: "/cockpit", icon: Crown },
      { label: "Reports", to: "/reports", icon: FileBarChart },
      { label: "Analytics", to: "/analytics", icon: FileBarChart },
    ],
  },
  {
    title: "AI",
    icon: Bot,
    items: [
      { label: "AI Agents", to: "/agents", icon: Bot, badge: "58" },
      { label: "AI Copilots", to: "/copilots", icon: Sparkles },
      { label: "Automation Center", to: "/automation", icon: Zap, badge: "231" },
      { label: "Workflow Studio", to: "/workflow-studio", icon: Workflow },
    ],
  },
  {
    title: "KNOWLEDGE",
    icon: Brain,
    items: [
      { label: "Company Brain", to: "/company-brain", icon: Brain },
      { label: "Document Intelligence", to: "/documents", icon: FileSearch },
      { label: "Knowledge Center", to: "/knowledge", icon: BookOpen },
    ],
  },
  {
    title: "OPERATIONS",
    icon: Building2,
    items: [
      { label: "Departments", to: "/departments", icon: Building2, badge: "43" },
      { label: "Projects", to: "/projects", icon: FolderKanban },
      { label: "Tasks", to: "/tasks", icon: ListTodo },
      { label: "Approvals", to: "/approvals", icon: CheckCircle2, badge: "18" },
      { label: "Risk", to: "/risk", icon: ShieldAlert },
      { label: "Quality", to: "/quality", icon: BadgeCheck },
    ],
  },
  {
    title: "MANUFACTURING",
    icon: Factory,
    items: [
      { label: "Heat Intelligence", to: "/heat-intelligence", icon: Flame },
      { label: "Mill Test Certificates", to: "/mtc", icon: ScrollText },
      { label: "Materials & Grades", to: "/materials", icon: Boxes },
      { label: "Production Documents", to: "/production", icon: Factory },
      { label: "Inventory", to: "/inventory", icon: Warehouse },
      { label: "Logistics", to: "/logistics", icon: Truck },
    ],
  },
  {
    title: "BUSINESS",
    icon: Users,
    items: [
      { label: "Customers", to: "/customers", icon: Users },
      { label: "Vendors", to: "/vendors", icon: Users },
      { label: "Finance", to: "/finance", icon: Wallet },
      { label: "HR", to: "/hr", icon: UserCog },
      { label: "Compliance", to: "/compliance", icon: Scale },
    ],
  },
  {
    title: "PLATFORM",
    icon: Settings2,
    items: [
      { label: "Integrations", to: "/integrations", icon: Plug },
      { label: "Security", to: "/security", icon: Lock },
      { label: "Governance", to: "/governance", icon: Sliders },
      { label: "Administration", to: "/administration", icon: Settings2 },
      { label: "Settings", to: "/settings", icon: Settings2 },
    ],
  },
];
