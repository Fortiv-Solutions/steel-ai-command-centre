import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Bot,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Crown,
  Factory,
  FileSearch,
  Flame,
  FolderKanban,
  LayoutDashboard,
  Plug,
  Scale,
  ScrollText,
  Settings2,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Warehouse,
  Zap,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, Meter, statusTone } from "@/components/ui-kit";
import { AreaTrend, BarSeries, DonutChart, LineSeries } from "@/components/charts";
import { Button } from "@/components/ui/button";
import {
  approvals,
  automationTrend,
  departments,
  gradeMix,
  inr,
  insights,
  mtcStatus,
  procurementSpend,
  roadmap,
  salesPerformance,
  workingCapital,
} from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Command Center · Steel Manufacturing OS" },
      {
        name: "description",
        content:
          "Enterprise Steel Manufacturing OS: AI adoption, automation coverage, plant health, and business function intelligence.",
      },
      { property: "og:title", content: "AI Command Center · Steel Manufacturing OS" },
      {
        property: "og:description",
        content:
          "Executive Operating System for Steel Manufacturing: 43 business functions, 231 automations, 58 AI agents.",
      },
    ],
  }),
  component: Dashboard,
});

// Domain cards configuration mapping the 6 enterprise domains
const domainCards = [
  {
    title: "Manufacturing",
    icon: Factory,
    modulesCount: 6,
    automationsCount: 68,
    agentsCount: 16,
    completion: 88,
    primaryRoute: "/heat-intelligence",
    modules: [
      { label: "Heat Intelligence", to: "/heat-intelligence", icon: Flame },
      { label: "Mill Test Certificates", to: "/mtc", icon: ScrollText },
      { label: "Materials & Grades", to: "/materials", icon: Factory },
      { label: "Production Documents", to: "/production", icon: Factory },
      { label: "Inventory", to: "/inventory", icon: Warehouse },
      { label: "Logistics", to: "/logistics", icon: Truck },
    ],
  },
  {
    title: "Operations",
    icon: Building2,
    modulesCount: 6,
    automationsCount: 54,
    agentsCount: 14,
    completion: 82,
    primaryRoute: "/departments",
    modules: [
      { label: "Departments", to: "/departments", icon: Building2 },
      { label: "Projects", to: "/projects", icon: FolderKanban },
      { label: "Tasks", to: "/tasks", icon: CheckCircle2 },
      { label: "Approvals", to: "/approvals", icon: CheckCircle2 },
      { label: "Risk", to: "/risk", icon: ShieldAlert },
      { label: "Quality", to: "/quality", icon: BadgeCheck },
    ],
  },
  {
    title: "Business",
    icon: Users,
    modulesCount: 5,
    automationsCount: 42,
    agentsCount: 10,
    completion: 76,
    primaryRoute: "/finance",
    modules: [
      { label: "Customers", to: "/customers", icon: Users },
      { label: "Vendors", to: "/vendors", icon: Users },
      { label: "Finance", to: "/finance", icon: Wallet },
      { label: "HR", to: "/hr", icon: Users },
      { label: "Compliance", to: "/compliance", icon: Scale },
    ],
  },
  {
    title: "Knowledge",
    icon: Brain,
    modulesCount: 3,
    automationsCount: 28,
    agentsCount: 8,
    completion: 91,
    primaryRoute: "/company-brain",
    modules: [
      { label: "Company Brain", to: "/company-brain", icon: Brain },
      { label: "Document Intelligence", to: "/documents", icon: FileSearch },
      { label: "Knowledge Center", to: "/knowledge", icon: Brain },
    ],
  },
  {
    title: "AI & Automation",
    icon: Bot,
    modulesCount: 4,
    automationsCount: 231,
    agentsCount: 58,
    completion: 94,
    primaryRoute: "/agents",
    modules: [
      { label: "AI Agents", to: "/agents", icon: Bot },
      { label: "AI Copilots", to: "/copilots", icon: Sparkles },
      { label: "Automation Center", to: "/automation", icon: Zap },
      { label: "Workflow Studio", to: "/workflow-studio", icon: LayoutDashboard },
    ],
  },
  {
    title: "Platform",
    icon: Settings2,
    modulesCount: 5,
    automationsCount: 18,
    agentsCount: 6,
    completion: 98,
    primaryRoute: "/administration",
    modules: [
      { label: "Integrations", to: "/integrations", icon: Plug },
      { label: "Security", to: "/security", icon: ShieldAlert },
      { label: "Governance", to: "/governance", icon: Settings2 },
      { label: "Administration", to: "/administration", icon: Crown },
      { label: "Settings", to: "/settings", icon: Settings2 },
    ],
  },
];

// Single horizontal Executive KPI Strip data
const kpiStripData = [
  { label: "AI Adoption", value: "78.4%", delta: 4.2, hint: "target 85%" },
  { label: "Active AI Agents", value: "58", delta: 6, hint: "across 43 depts" },
  { label: "Automations Running", value: "231", delta: 18, hint: "zero hardware" },
  { label: "Hours Saved", value: "142,800", delta: 12400, hint: "annualised" },
  { label: "Monthly Savings", value: "₹4.8 Cr", delta: 14.2, hint: "net ROI 6.8x" },
  { label: "Accuracy", value: "99.8%", delta: 0.4, hint: "grounded LLM" },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState<"sales" | "procurement" | "working">("sales");

  return (
    <div className="space-y-5">
      {/* 1. Light Industrial Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#A6ACB6] bg-[#E4E8EE] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded bg-[#D95A00] text-white">
            <Flame className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold uppercase tracking-wider text-[#1A1D20]">
                AI Command Center
              </h1>
              <span className="rounded bg-[#C8D0DC] px-2 py-0.5 text-[10px] font-bold text-[#B87514] border border-[#A6ACB6]">
                Integrated Plant Scope
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#4A5059]">
              Software-only enterprise platform · 43 business functions · 231 automations
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-[#4A5059]">Last updated: <strong className="text-[#1A1D20]">Just now</strong></span>
          <Button asChild size="sm" variant="secondary">
            <Link to="/cockpit">
              <Crown className="size-3.5" /> Executive Cockpit
            </Link>
          </Button>
          <Button asChild size="sm" variant="default">
            <Link to="/automation">
              <Zap className="size-3.5" /> 231 Automations
            </Link>
          </Button>
        </div>
      </div>

      {/* 2. Executive KPI Strip (Single Horizontal Row) */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#D95A00]">
            Executive KPI Strip
          </h2>
          <span className="text-[11px] font-semibold text-[#4A5059]">Consolidated Plant Metrics</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {kpiStripData.map((k) => (
            <StatCard key={k.label} {...k} />
          ))}
        </div>
      </div>

      {/* 3. Business Function Overview (6 Large Enterprise Domain Cards) */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#D95A00]">
            Business Function Overview
          </h2>
          <span className="text-[11px] font-semibold text-[#4A5059]">Replaces deep navigation hierarchy</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {domainCards.map((domain) => {
            const DomainIcon = domain.icon;
            return (
              <div
                key={domain.title}
                className="flex flex-col justify-between rounded-xl border border-[#A6ACB6] bg-[#E4E8EE] p-4 transition-colors hover:border-[#7A808A]"
              >
                <div>
                  {/* Domain Header */}
                  <div className="flex items-center justify-between border-b border-[#A6ACB6] pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="grid size-8 place-items-center rounded bg-[#C8D0DC] text-[#D95A00] border border-[#A6ACB6]">
                        <DomainIcon className="size-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
                          {domain.title}
                        </h3>
                        <p className="text-[10px] font-medium text-[#4A5059]">
                          {domain.modulesCount} Modules · {domain.automationsCount} Automations
                        </p>
                      </div>
                    </div>
                    <Link
                      to={domain.primaryRoute}
                      className="text-[#4A5059] hover:text-[#D95A00]"
                      title="Open domain"
                    >
                      <ChevronRight className="size-4" />
                    </Link>
                  </div>

                  {/* Domain Metrics */}
                  <div className="my-3 grid grid-cols-3 gap-2 rounded-lg bg-[#C8D0DC] p-2.5 text-center border border-[#A6ACB6]">
                    <div>
                      <p className="text-[10px] font-semibold text-[#4A5059]">Modules</p>
                      <p className="text-sm font-bold text-[#1A1D20]">{domain.modulesCount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-[#4A5059]">AI Agents</p>
                      <p className="text-sm font-bold text-[#D95A00]">{domain.agentsCount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-[#4A5059]">Adoption</p>
                      <p className="text-sm font-bold text-[#B87514]">{domain.completion}%</p>
                    </div>
                  </div>

                  {/* Meter */}
                  <div className="mb-3">
                    <div className="mb-1 flex justify-between text-[10px]">
                      <span className="font-semibold text-[#4A5059]">Automation Maturity</span>
                      <span className="font-bold text-[#1A1D20]">{domain.completion}%</span>
                    </div>
                    <Meter value={domain.completion} tone="success" />
                  </div>

                  {/* Module List Links */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {domain.modules.map((m) => {
                      const MIcon = m.icon;
                      return (
                        <Link
                          key={m.to}
                          to={m.to}
                          className="flex items-center gap-1.5 rounded border border-[#A6ACB6] bg-[#DCE0E6] px-2 py-1 text-[11px] font-bold text-[#1A1D20] hover:border-[#7A808A] hover:bg-[#C8D0DC]"
                        >
                          <MIcon className="size-3 text-[#4A5059]" />
                          <span>{m.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Operational Intelligence (Two-Column Layout) */}
      <div className="pt-2">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#D95A00]">
            Operational Intelligence
          </h2>
          <span className="text-[11px] font-semibold text-[#4A5059]">Live Activity & Plant Status</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Left Column: Recent Activity, AI Recommendations & Approvals */}
          <div className="space-y-4">
            {/* AI Insights & Recommendations */}
            <Panel
              title="AI Recommendations & Insights"
              description="Executive copilot findings grounded on plant data"
              actions={
                <Button size="sm" variant="ghost">
                  <Sparkles className="size-3.5" /> Refresh
                </Button>
              }
              bare
            >
              <div className="divide-y divide-[#A6ACB6]">
                {insights.map((i) => (
                  <div key={i.title} className="flex gap-3 p-3.5">
                    <TrendingUp className="mt-0.5 size-4 shrink-0 text-[#D95A00]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-[#1A1D20]">{i.title}</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#4A5059]">{i.body}</p>
                    </div>
                    <Pill tone={i.tone}>{i.impact}</Pill>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Pending Approvals */}
            <Panel
              title="Pending Approvals"
              description="AI recommendations awaiting executive action"
              actions={
                <Button asChild size="sm" variant="ghost">
                  <Link to="/approvals">View All ({approvals.length})</Link>
                </Button>
              }
              bare
            >
              <div className="divide-y divide-[#A6ACB6]">
                {approvals.slice(0, 5).map((a) => (
                  <div key={a.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-[#1A1D20]">{a.title}</p>
                      <p className="text-[10px] text-[#4A5059]">
                        {a.department} · {a.age} ago
                      </p>
                    </div>
                    <Pill tone={statusTone(a.aiRecommendation)}>
                      {a.aiRecommendation} · {a.confidence}%
                    </Pill>
                  </div>
                ))}
              </div>
            </Panel>
          </div>

          {/* Right Column: Plant Health, Workflows & Automation Performance */}
          <div className="space-y-4">
            {/* Department Leaderboard & Adoption */}
            <Panel
              title="Department AI Adoption"
              description="Top performing business functions by annual savings"
              actions={
                <Button asChild size="sm" variant="ghost">
                  <Link to="/departments">All 43 Depts</Link>
                </Button>
              }
              bare
            >
              <div className="divide-y divide-[#A6ACB6]">
                {[...departments]
                  .sort((a, b) => b.annualSavings - a.annualSavings)
                  .slice(0, 5)
                  .map((d) => (
                    <Link
                      key={d.slug}
                      to="/departments/$slug"
                      params={{ slug: d.slug }}
                      className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[#C8D0DC]"
                    >
                      <Bot className="size-3.5 text-[#9E521D]" />
                      <span className="min-w-0 flex-1 truncate text-xs font-bold text-[#1A1D20]">
                        {d.name}
                      </span>
                      <span className="w-24">
                        <Meter value={d.adoption} />
                      </span>
                      <span className="w-20 text-right text-[11px] tabular-nums font-bold text-[#4A5059]">
                        {inr(d.annualSavings)}
                      </span>
                    </Link>
                  ))}
              </div>
            </Panel>

            {/* Workflow & Automation Performance */}
            <Panel title="Automation Coverage & Roadmap" description="Automated vs manual process steps (%)">
              <AreaTrend
                data={automationTrend}
                x="month"
                series={[
                  { key: "automated", label: "Automated %" },
                  { key: "manual", label: "Manual %" },
                ]}
                height={160}
              />
              <div className="mt-3 space-y-2">
                {roadmap.map((p) => (
                  <div key={p.phase}>
                    <div className="mb-1 flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#1A1D20]">{p.phase}</span>
                      <span className="text-[#4A5059]">{p.window}</span>
                    </div>
                    <Meter value={p.progress} tone={p.progress === 100 ? "success" : "primary"} />
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* 5. Financial & Operational Analytics Panel */}
      <Panel
        title="Plant Operational & Commercial Trends"
        description="Dispatches, procurement, MTC compliance, and working capital"
        actions={
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={activeTab === "sales" ? "default" : "secondary"}
              onClick={() => setActiveTab("sales")}
            >
              Sales & Grades
            </Button>
            <Button
              size="sm"
              variant={activeTab === "procurement" ? "default" : "secondary"}
              onClick={() => setActiveTab("procurement")}
            >
              Procurement & MTC
            </Button>
            <Button
              size="sm"
              variant={activeTab === "working" ? "default" : "secondary"}
              onClick={() => setActiveTab("working")}
            >
              Working Capital
            </Button>
          </div>
        }
      >
        {activeTab === "sales" && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="mb-2 text-[11px] font-bold text-[#4A5059]">
                Domestic vs Export Dispatches (₹ Cr)
              </p>
              <AreaTrend
                data={salesPerformance}
                x="month"
                series={[
                  { key: "domestic", label: "Domestic" },
                  { key: "export", label: "Export" },
                  { key: "target", label: "Target" },
                ]}
                height={220}
              />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold text-[#4A5059]">
                Steel Grade Production Share
              </p>
              <DonutChart data={gradeMix} height={220} />
            </div>
          </div>
        )}

        {activeTab === "procurement" && (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[11px] font-bold text-[#4A5059]">
                Procurement Spend (₹ Cr)
              </p>
              <BarSeries
                data={procurementSpend}
                x="month"
                stacked
                series={[
                  { key: "scrap", label: "Scrap" },
                  { key: "alloys", label: "Ferro alloys" },
                  { key: "refractory", label: "Refractory" },
                  { key: "consumables", label: "Consumables" },
                ]}
                height={220}
              />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-bold text-[#4A5059]">
                Mill Test Certificate Status
              </p>
              <DonutChart data={mtcStatus} inner={50} height={220} />
            </div>
          </div>
        )}

        {activeTab === "working" && (
          <div>
            <p className="mb-2 text-[11px] font-bold text-[#4A5059]">
              Working Capital Cycle (DSO / DPO / DIO Days)
            </p>
            <LineSeries
              data={workingCapital}
              x="month"
              series={[
                { key: "dso", label: "DSO (Days Sales Outstanding)" },
                { key: "dpo", label: "DPO (Days Payable Outstanding)" },
                { key: "dio", label: "DIO (Days Inventory Outstanding)" },
              ]}
              height={220}
            />
          </div>
        )}
      </Panel>
    </div>
  );
}
