import { Link, useRouterState } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  Bot,
  Boxes,
  Brain,
  Building2,
  CheckCircle2,
  Crown,
  Factory,
  FileBarChart,
  FileSearch,
  Flame,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  Lock,
  Plug,
  Scale,
  ScrollText,
  Settings2,
  ShieldAlert,
  Sliders,
  Sparkles,
  Truck,
  UserCog,
  Users,
  Wallet,
  Warehouse,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ControlHubConfig = {
  title: string;
  subtitle: string;
  icon: any;
  submodules: { label: string; to: string; icon: any }[];
};

const hubConfigs: Record<string, ControlHubConfig> = {
  ai: {
    title: "AI WORKSPACE CONTROL HUB",
    subtitle: "AI Agents, Copilots, Automations & Workflow Studio",
    icon: Bot,
    submodules: [
      { label: "AI Agents", to: "/agents", icon: Bot },
      { label: "AI Copilots", to: "/copilots", icon: Sparkles },
      { label: "Automation Center", to: "/automation", icon: Zap },
      { label: "Workflow Studio", to: "/workflow-studio", icon: Workflow },
    ],
  },
  knowledge: {
    title: "KNOWLEDGE CONTROL HUB",
    subtitle: "Company Brain, Document Intelligence, Knowledge Center & Reports",
    icon: Brain,
    submodules: [
      { label: "Company Brain", to: "/company-brain", icon: Brain },
      { label: "Document Intelligence", to: "/documents", icon: FileSearch },
      { label: "Knowledge Center", to: "/knowledge", icon: BookOpen },
      { label: "Reports", to: "/reports", icon: FileBarChart },
    ],
  },
  manufacturing: {
    title: "MANUFACTURING CONTROL HUB",
    subtitle: "Heat Intelligence, Mill Test Certificates, Materials, Production, Inventory & Logistics",
    icon: Factory,
    submodules: [
      { label: "Heat Intelligence", to: "/heat-intelligence", icon: Flame },
      { label: "Mill Test Certificates", to: "/mtc", icon: ScrollText },
      { label: "Materials & Grades", to: "/materials", icon: Boxes },
      { label: "Production Documents", to: "/production", icon: Factory },
      { label: "Inventory & Stockyard", to: "/inventory", icon: Warehouse },
      { label: "Logistics & Dispatch", to: "/logistics", icon: Truck },
    ],
  },
  operations: {
    title: "OPERATIONS CONTROL HUB",
    subtitle: "Departments, Projects, Tasks, Approvals, Risk & Quality Control",
    icon: Building2,
    submodules: [
      { label: "Departments", to: "/departments", icon: Building2 },
      { label: "Projects", to: "/projects", icon: FolderKanban },
      { label: "Tasks", to: "/tasks", icon: ListTodo },
      { label: "Approvals", to: "/approvals", icon: CheckCircle2 },
      { label: "Risk Center", to: "/risk", icon: ShieldAlert },
      { label: "Quality Control", to: "/quality", icon: BadgeCheck },
    ],
  },
  business: {
    title: "BUSINESS CONTROL HUB",
    subtitle: "Customers, Vendors & Procurement, Finance, HR & Compliance",
    icon: Users,
    submodules: [
      { label: "Customers", to: "/customers", icon: Users },
      { label: "Vendors & Procurement", to: "/vendors", icon: Users },
      { label: "Finance & Commercial", to: "/finance", icon: Wallet },
      { label: "HR & Workforce", to: "/hr", icon: UserCog },
      { label: "Regulatory Compliance", to: "/compliance", icon: Scale },
    ],
  },
  platform: {
    title: "PLATFORM CONTROL HUB",
    subtitle: "Integrations, Security, Governance, Administration & Settings",
    icon: Settings2,
    submodules: [
      { label: "Integrations & Connectors", to: "/integrations", icon: Plug },
      { label: "Security & Audit", to: "/security", icon: Lock },
      { label: "AI Governance", to: "/governance", icon: Sliders },
      { label: "Administration", to: "/administration", icon: Settings2 },
      { label: "Settings", to: "/settings", icon: Settings2 },
    ],
  },
  executive: {
    title: "EXECUTIVE CONTROL HUB",
    subtitle: "Dashboard & Executive Cockpit",
    icon: Crown,
    submodules: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
      { label: "Executive Cockpit", to: "/cockpit", icon: Crown },
      { label: "Analytics", to: "/analytics", icon: FileBarChart },
    ],
  },
};

export function ModuleControlHub() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Determine active hub
  let key = "executive";
  if (
    pathname.startsWith("/agents") ||
    pathname.startsWith("/copilots") ||
    pathname.startsWith("/automation") ||
    pathname.startsWith("/workflow-studio")
  ) {
    key = "ai";
  } else if (
    pathname.startsWith("/company-brain") ||
    pathname.startsWith("/documents") ||
    pathname.startsWith("/knowledge") ||
    pathname.startsWith("/reports")
  ) {
    key = "knowledge";
  } else if (
    pathname.startsWith("/heat-intelligence") ||
    pathname.startsWith("/mtc") ||
    pathname.startsWith("/materials") ||
    pathname.startsWith("/production") ||
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/logistics")
  ) {
    key = "manufacturing";
  } else if (
    pathname.startsWith("/departments") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/approvals") ||
    pathname.startsWith("/risk") ||
    pathname.startsWith("/quality")
  ) {
    key = "operations";
  } else if (
    pathname.startsWith("/customers") ||
    pathname.startsWith("/vendors") ||
    pathname.startsWith("/finance") ||
    pathname.startsWith("/hr") ||
    pathname.startsWith("/compliance")
  ) {
    key = "business";
  } else if (
    pathname.startsWith("/integrations") ||
    pathname.startsWith("/security") ||
    pathname.startsWith("/governance") ||
    pathname.startsWith("/administration") ||
    pathname.startsWith("/settings")
  ) {
    key = "platform";
  }

  const hub = hubConfigs[key] || hubConfigs["executive"]!;
  const HubIcon = hub.icon;

  return (
    <div className="mb-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 shadow-sm">
      {/* Header Info */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-[#E05600] text-white shadow-sm">
            <HubIcon className="size-5" />
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              {hub.title}
            </h2>
            <p className="text-[11px] font-medium text-[#475569]">{hub.subtitle}</p>
          </div>
        </div>
        <span className="rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1 text-[11px] font-bold text-[#475569]">
          {hub.submodules.length} Submodules
        </span>
      </div>

      {/* Horizontal Submodule Navigation Pills */}
      <div className="flex flex-wrap gap-2 pt-1 border-t border-[#E2E8F0]">
        {hub.submodules.map((sub) => {
          const active = sub.to === "/" ? pathname === "/" : pathname.startsWith(sub.to);
          const SubIcon = sub.icon;
          return (
            <Link
              key={sub.to}
              to={sub.to}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-bold transition-all",
                active
                  ? "border-[#E05600] bg-[#E05600] text-white shadow-sm"
                  : "border-[#E2E8F0] bg-[#FFFFFF] text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F1F5F9] hover:text-[#0F172A]",
              )}
            >
              <SubIcon className={cn("size-3.5", active ? "text-white" : "text-[#475569]")} />
              <span>{sub.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
