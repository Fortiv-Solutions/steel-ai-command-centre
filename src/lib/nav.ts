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
  Calculator,
  ShieldCheck,
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
    title: "EXECUTIVE OVERVIEW",
    icon: Crown,
    items: [
      { label: "Executive Home", to: "/", icon: LayoutDashboard },
      { label: "AI Value Dashboard", to: "/cockpit", icon: Crown },
      { label: "Analytics & ROI", to: "/analytics", icon: FileBarChart },
    ],
  },
  {
    title: "DEPARTMENT AI AGENTS",
    icon: Bot,
    items: [
      { label: "AI Agent Showcase", to: "/agents", icon: Bot, badge: "58" },
      { label: "Live AI Copilots", to: "/copilots", icon: Sparkles },
      { label: "Department Hub", to: "/departments", icon: Building2, badge: "43" },
    ],
  },
  {
    title: "COMPANY BRAIN",
    icon: Brain,
    items: [
      { label: "Knowledge Layer", to: "/company-brain", icon: Brain },
      { label: "Document Intelligence", to: "/documents", icon: FileSearch },
      { label: "SOP & Manuals", to: "/knowledge", icon: BookOpen },
      { label: "Executive Briefings", to: "/reports", icon: FileBarChart },
    ],
  },
  {
    title: "AI WORKFLOWS",
    icon: Zap,
    items: [
      { label: "Automation Register", to: "/automation", icon: Zap, badge: "231" },
      { label: "Workflow Studio", to: "/workflow-studio", icon: Workflow },
      { label: "Decision Queue", to: "/approvals", icon: CheckCircle2, badge: "18" },
      { label: "Action Tasks", to: "/tasks", icon: ListTodo },
    ],
  },
  {
    title: "STEEL MANUFACTURING",
    icon: Factory,
    items: [
      { label: "EAF Heat Intelligence", to: "/heat-intelligence", icon: Flame },
      { label: "Mill Test Certs (MTC)", to: "/mtc", icon: ScrollText },
      { label: "Steel Grades Master", to: "/materials", icon: Boxes },
      { label: "Rolling & Production", to: "/production", icon: Factory },
      { label: "Stockyard Inventory", to: "/inventory", icon: Warehouse },
      { label: "Rake Logistics", to: "/logistics", icon: Truck },
    ],
  },
  {
    title: "COMMERCIAL & FINANCE",
    icon: Users,
    items: [
      { label: "Customer Backlog", to: "/customers", icon: Users },
      { label: "Scrap & Vendors", to: "/vendors", icon: Users },
      { label: "Cost Per Tonne", to: "/finance", icon: Wallet },
      { label: "Workforce & Safety", to: "/hr", icon: UserCog },
      { label: "ISO Compliance", to: "/compliance", icon: Scale },
      { label: "Plant Capex Projects", to: "/projects", icon: FolderKanban },
      { label: "Quality Control", to: "/quality", icon: BadgeCheck },
      { label: "Risk Center", to: "/risk", icon: ShieldAlert },
    ],
  },
  {
    title: "SECURITY & GOVERNANCE",
    icon: ShieldCheck,
    items: [
      { label: "ERP Integrations", to: "/integrations", icon: Plug },
      { label: "Security & SOC 2", to: "/security", icon: Lock },
      { label: "AI Safety Guardrails", to: "/governance", icon: Sliders },
      { label: "User Administration", to: "/administration", icon: Settings2 },
      { label: "Platform Settings", to: "/settings", icon: Settings2 },
    ],
  },
];
