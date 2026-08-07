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
    title: "AI WORKSPACE & AGENT CATALOG",
    subtitle: "58 AI Agents, Live Copilots, 231 Automations & Workflow Studio",
    icon: Bot,
    submodules: [
      { label: "AI Agents Gallery", to: "/agents", icon: Bot },
      { label: "Live AI Copilots", to: "/copilots", icon: Sparkles },
      { label: "Automation Register", to: "/automation", icon: Zap },
      { label: "Workflow Studio", to: "/workflow-studio", icon: Workflow },
    ],
  },
  knowledge: {
    title: "COMPANY BRAIN & DOCUMENT INTELLIGENCE",
    subtitle: "Enterprise Vector Knowledge Layer, RAG Engine & MTC Processing",
    icon: Brain,
    submodules: [
      { label: "Company Brain", to: "/company-brain", icon: Brain },
      { label: "Document Intelligence", to: "/documents", icon: FileSearch },
      { label: "Knowledge Base", to: "/knowledge", icon: BookOpen },
      { label: "Executive Briefings", to: "/reports", icon: FileBarChart },
    ],
  },
  manufacturing: {
    title: "STEEL MANUFACTURING INTELLIGENCE",
    subtitle: "EAF Melt Shop Heat Control, Mill Test Certs (MTC), Production, Inventory & Logistics",
    icon: Factory,
    submodules: [
      { label: "Heat Intelligence", to: "/heat-intelligence", icon: Flame },
      { label: "Mill Test Certs (MTC)", to: "/mtc", icon: ScrollText },
      { label: "Steel Grades Master", to: "/materials", icon: Boxes },
      { label: "Rolling & Production", to: "/production", icon: Factory },
      { label: "Stockyard Inventory", to: "/inventory", icon: Warehouse },
      { label: "Rake Logistics", to: "/logistics", icon: Truck },
    ],
  },
  operations: {
    title: "PLANT OPERATIONS & WORKFLOW HUB",
    subtitle: "43 Steel Business Functions, Capex Projects, Action Tasks, Approvals & Quality",
    icon: Building2,
    submodules: [
      { label: "43 Departments", to: "/departments", icon: Building2 },
      { label: "Capex Projects", to: "/projects", icon: FolderKanban },
      { label: "Action Tasks", to: "/tasks", icon: ListTodo },
      { label: "Decision Approvals", to: "/approvals", icon: CheckCircle2 },
      { label: "Plant Risk Center", to: "/risk", icon: ShieldAlert },
      { label: "Quality Control", to: "/quality", icon: BadgeCheck },
    ],
  },
  business: {
    title: "COMMERCIAL, FINANCE & COMPLIANCE",
    subtitle: "Order Backlog, Raw Scrap Procurement, Cost Per Tonne Ledger & ISO Compliance",
    icon: Users,
    submodules: [
      { label: "Customer Backlog", to: "/customers", icon: Users },
      { label: "Vendors & Procurement", to: "/vendors", icon: Users },
      { label: "Cost Per Tonne", to: "/finance", icon: Wallet },
      { label: "Workforce & Safety", to: "/hr", icon: UserCog },
      { label: "ISO Compliance", to: "/compliance", icon: Scale },
    ],
  },
  platform: {
    title: "SECURITY, GOVERNANCE & INTEGRATIONS",
    subtitle: "ERP Connectors, SOC 2 Security, AI Safety Guardrails & User Administration",
    icon: Settings2,
    submodules: [
      { label: "ERP Connectors", to: "/integrations", icon: Plug },
      { label: "Security & SOC 2", to: "/security", icon: Lock },
      { label: "AI Safety Guardrails", to: "/governance", icon: Sliders },
      { label: "Administration", to: "/administration", icon: Settings2 },
      { label: "Settings", to: "/settings", icon: Settings2 },
    ],
  },
  executive: {
    title: "EXECUTIVE AI COMMAND CENTER",
    subtitle: "Enterprise Overview, Value Realization Cockpit & EBITDA Impact",
    icon: Crown,
    submodules: [
      { label: "Overview", to: "/", icon: LayoutDashboard },
      { label: "AI Value Cockpit", to: "/cockpit", icon: Crown },
      { label: "Analytics & ROI", to: "/analytics", icon: FileBarChart },
    ],
  },
};

export function ModuleControlHub() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  let key = "executive";
  if (pathname.startsWith("/agents") || pathname.startsWith("/copilots") || pathname.startsWith("/automation") || pathname.startsWith("/workflow-studio")) {
    key = "ai";
  } else if (pathname.startsWith("/company-brain") || pathname.startsWith("/documents") || pathname.startsWith("/knowledge") || pathname.startsWith("/reports")) {
    key = "knowledge";
  } else if (pathname.startsWith("/heat-intelligence") || pathname.startsWith("/mtc") || pathname.startsWith("/materials") || pathname.startsWith("/production") || pathname.startsWith("/inventory") || pathname.startsWith("/logistics")) {
    key = "manufacturing";
  } else if (pathname.startsWith("/departments") || pathname.startsWith("/projects") || pathname.startsWith("/tasks") || pathname.startsWith("/approvals") || pathname.startsWith("/risk") || pathname.startsWith("/quality")) {
    key = "operations";
  } else if (pathname.startsWith("/customers") || pathname.startsWith("/vendors") || pathname.startsWith("/finance") || pathname.startsWith("/hr") || pathname.startsWith("/compliance")) {
    key = "business";
  } else if (pathname.startsWith("/integrations") || pathname.startsWith("/security") || pathname.startsWith("/governance") || pathname.startsWith("/administration") || pathname.startsWith("/settings")) {
    key = "platform";
  }

  const hub = hubConfigs[key] || hubConfigs["executive"]!;
  const HubIcon = hub.icon;

  return (
    <div className="mb-6 rounded-[24px] border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-sm">
      {/* Secondary Horizontal Pill Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
            <HubIcon className="size-4.5 text-[#2563EB]" />
          </div>
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
              {hub.title}
            </h2>
            <p className="text-[11px] font-medium text-[#64748B]">{hub.subtitle}</p>
          </div>
        </div>

        {/* Horizontal Pills */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-full bg-[#F8FAFC] p-1 border border-[#E2E8F0]">
          {hub.submodules.map((sub) => {
            const active = sub.to === "/" ? pathname === "/" : pathname.startsWith(sub.to);
            const SubIcon = sub.icon;
            return (
              <Link
                key={sub.to}
                to={sub.to}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all duration-150",
                  active
                    ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                    : "text-[#475569] hover:bg-[#FFFFFF] hover:text-[#2563EB]",
                )}
              >
                <SubIcon className="size-3.5" />
                <span>{sub.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
