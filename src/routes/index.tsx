import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  Bot,
  Boxes,
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
  UserCog,
  Users,
  Wallet,
  Warehouse,
  Workflow as WorkflowIcon,
  Zap,
  ArrowRight,
  ShieldCheck,
  Lock,
  Clock,
  Calculator,
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, Meter, statusTone } from "@/components/ui-kit";
import { AreaTrend, BarSeries, DonutChart, LineSeries } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { AssessmentModal } from "@/components/AssessmentModal";
import { RoiCalculatorModal } from "@/components/RoiCalculatorModal";
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
      { title: "Fortiv Solutions · Enterprise AI Command Center for Steel Manufacturing" },
      {
        name: "description",
        content:
          "Software-only AI Command Center for Steel Manufacturing. Digitally transform steel enterprise operations across 43 business functions and 231 AI use cases with zero hardware.",
      },
      { property: "og:title", content: "Fortiv Solutions · Enterprise AI Command Center for Steel Manufacturing" },
      {
        property: "og:description",
        content:
          "Deploy 58 production AI agents, Company Brain RAG knowledge layer, and software-only process automation across steel manufacturing.",
      },
    ],
  }),
  component: Dashboard,
});

// 8 Executive Outcome KPI Cards
const executiveKpiCards = [
  { label: "Annualized EBITDA Savings", value: "₹51.7 Cr / yr", delta: 18.4, hint: "6.8x net ROI", icon: Wallet },
  { label: "Process Hours Automated", value: "420,000 hrs", delta: 24.2, hint: "198 FTE equivalent", icon: Clock },
  { label: "Enterprise AI Adoption", value: "64.1%", delta: 8.5, hint: "target 85%", icon: TrendingUp },
  { label: "Active Production Agents", value: "58 Agents", delta: 12, hint: "across 43 functions", icon: Bot },
  { label: "Documents Processed / Mo", value: "36,150 Docs", delta: 14.2, hint: "99.6% accuracy", icon: FileSearch },
  { label: "Decision Turnaround SLA", value: "3.4 Hours", delta: -42.0, hint: "vs 48h manual", icon: Zap },
  { label: "Compliance & Safety Score", value: "99.4%", delta: 0.8, hint: "zero non-conformity", icon: CheckCircle2 },
  { label: "Projected 3-Yr ROI Multiplier", value: "6.8x ROI", delta: 15.0, hint: "90-day payback", icon: Crown },
];

// Department Opportunity Heatmap Data
const opportunityHeatmap = [
  { dept: "Melt Shop & EAF Operations", valuePool: "₹18.4 Cr / yr", useCases: 28, maturity: 88, mainAgent: "EAF Metallurgy Copilot", impact: "High EBITDA" },
  { dept: "Procurement & Raw Scrap", valuePool: "₹14.2 Cr / yr", useCases: 34, maturity: 82, mainAgent: "Scrap Purchase Agent", impact: "High EBITDA" },
  { dept: "Rolling Mill & Concast", valuePool: "₹8.5 Cr / yr", useCases: 26, maturity: 76, mainAgent: "Cobble Sensor Copilot", impact: "Medium EBITDA" },
  { dept: "Logistics & Rake Dispatch", valuePool: "₹5.8 Cr / yr", useCases: 22, maturity: 92, mainAgent: "Rake Demurrage Agent", impact: "High EBITDA" },
  { dept: "Finance & Working Capital", valuePool: "₹4.8 Cr / yr", useCases: 38, maturity: 74, mainAgent: "DSO Collector Agent", impact: "Medium EBITDA" },
  { dept: "Quality Lab & MTC Signing", valuePool: "₹3.2 Cr / yr", useCases: 24, maturity: 96, mainAgent: "MTC Spectro Audit Bot", impact: "Zero Defect" },
];

// Savings Waterfall Value Realization Items
const savingsWaterfallItems = [
  { driver: "Scrap Charge Mix Linear Solver", value: "₹18.4 Cr", share: 35.5, detail: "Optimal scrap mix & FeMn addition linear solver in EAF" },
  { driver: "EAF Power Tariff Optimization", value: "₹14.2 Cr", share: 27.4, detail: "3.5% kWh/MT power reduction via thermal profile AI" },
  { driver: "Scrap Rate Exemption Agent", value: "₹8.5 Cr", share: 16.4, detail: "Automated PO rate exemption audit against market benchmarks" },
  { driver: "Railway Rake Demurrage Avoidance", value: "₹5.8 Cr", share: 11.2, detail: "59-wagon rake loading optimization & fast customs clearance" },
  { driver: "Working Capital & DSO Reduction", value: "₹4.8 Cr", share: 9.5, detail: "Days Sales Outstanding reduced by 4 days via credit automation" },
];

// 6 Core Enterprise Modules
const domainCards = [
  {
    title: "Manufacturing Intelligence",
    icon: Factory,
    modulesCount: 6,
    automationsCount: 68,
    agentsCount: 16,
    completion: 88,
    primaryRoute: "/heat-intelligence",
    modules: [
      { label: "EAF Heat Intelligence", to: "/heat-intelligence", icon: Flame },
      { label: "Mill Test Certs (MTC)", to: "/mtc", icon: ScrollText },
      { label: "Steel Grades Master", to: "/materials", icon: Boxes },
      { label: "Rolling & Production", to: "/production", icon: Factory },
      { label: "Stockyard Inventory", to: "/inventory", icon: Warehouse },
      { label: "Rake Logistics", to: "/logistics", icon: Truck },
    ],
  },
  {
    title: "Plant Operations",
    icon: Building2,
    modulesCount: 6,
    automationsCount: 54,
    agentsCount: 14,
    completion: 82,
    primaryRoute: "/departments",
    modules: [
      { label: "43 Departments", to: "/departments", icon: Building2 },
      { label: "Capex Projects", to: "/projects", icon: FolderKanban },
      { label: "Action Tasks", to: "/tasks", icon: CheckCircle2 },
      { label: "Decision Approvals", to: "/approvals", icon: CheckCircle2 },
      { label: "Plant Risk Center", to: "/risk", icon: ShieldAlert },
      { label: "Quality Control", to: "/quality", icon: BadgeCheck },
    ],
  },
  {
    title: "Commercial & Business",
    icon: Users,
    modulesCount: 5,
    automationsCount: 42,
    agentsCount: 10,
    completion: 76,
    primaryRoute: "/finance",
    modules: [
      { label: "Customer Backlog", to: "/customers", icon: Users },
      { label: "Vendors & Procurement", to: "/vendors", icon: Users },
      { label: "Cost Per Tonne", to: "/finance", icon: Wallet },
      { label: "Workforce & Safety", to: "/hr", icon: UserCog },
      { label: "ISO Compliance", to: "/compliance", icon: Scale },
    ],
  },
  {
    title: "Company Brain Knowledge",
    icon: Brain,
    modulesCount: 4,
    automationsCount: 31,
    agentsCount: 8,
    completion: 94,
    primaryRoute: "/company-brain",
    modules: [
      { label: "Company Brain", to: "/company-brain", icon: Brain },
      { label: "Document Intelligence", to: "/documents", icon: FileSearch },
      { label: "SOP & Manuals", to: "/knowledge", icon: Brain },
      { label: "Executive Briefings", to: "/reports", icon: ScrollText },
    ],
  },
  {
    title: "AI & Automations",
    icon: Bot,
    modulesCount: 4,
    automationsCount: 231,
    agentsCount: 58,
    completion: 94,
    primaryRoute: "/agents",
    modules: [
      { label: "58 AI Agents", to: "/agents", icon: Bot },
      { label: "Live AI Copilot", to: "/copilots", icon: Sparkles },
      { label: "Automation Register", to: "/automation", icon: Zap },
      { label: "Workflow Studio", to: "/workflow-studio", icon: WorkflowIcon },
    ],
  },
  {
    title: "Security & Governance",
    icon: Settings2,
    modulesCount: 5,
    automationsCount: 18,
    agentsCount: 6,
    completion: 98,
    primaryRoute: "/administration",
    modules: [
      { label: "ERP Connectors", to: "/integrations", icon: Plug },
      { label: "Security & SOC 2", to: "/security", icon: ShieldAlert },
      { label: "AI Safety Guardrails", to: "/governance", icon: Settings2 },
      { label: "User Administration", to: "/administration", icon: Crown },
      { label: "Platform Settings", to: "/settings", icon: Settings2 },
    ],
  },
];

// Steel Sub-Sectors Served
const steelSectors = [
  { name: "Integrated Blast Furnace / BOF Plants", desc: "Raw material blending, sinter plant optimization, hot metal desulfurization & BOF refining." },
  { name: "EAF Mini-Mills & Electric Steelmaking", desc: "Arc furnace power optimization, scrap charge linear solver, ladle furnace secondary refining." },
  { name: "Rebar, TMT & Merchant Bar Mills", desc: "Billet sizing, flying shear cobble sensors, roll pass wear tracking, TMT quenching controls." },
  { name: "Flat Rolling & Coil Strip Mills", desc: "HR/CR coil thickness accuracy, surface defect computer vision, automated coil dispatch." },
  { name: "Specialty Alloy & Stainless Steel", desc: "304L/316L chemical alloy tolerances, MTC EN 10204 3.1 automated spectro verification." },
];

// Enterprise FAQs
const faqs = [
  { q: "Is any hardware installation or IoT sensor required?", a: "No. Fortiv Solutions is a 100% software-only AI platform. We connect directly to your existing SAP/ERP, SCADA databases, LIMS spectrometry software, and email/document servers via secure REST/OData APIs without hardware changes." },
  { q: "How fast can we see measurable EBITDA impact?", a: "Our 4-Phase Deployment Roadmap delivers initial production AI agent pilots in 14 days and full enterprise value realization across 43 business functions within 90 days." },
  { q: "How is our proprietary plant metallurgical data protected?", a: "Fortiv Solutions operates under SOC 2 Type II security standards. Your data is isolated in your private cloud or on-prem environment with zero multi-tenant data bleed. LLMs are strictly permission-aware and trained with zero public data sharing." },
  { q: "How do human executives maintain control over AI decisions?", a: "Every AI recommendation above your specified policy threshold (e.g. ₹1.0 Cr purchase or high-risk ladle wear warning) is automatically routed to a named human authority via our Human-in-the-Loop Decision Queue." },
];

function Dashboard() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [roiOpen, setRoiOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* 1. EXECUTIVE HOMEPAGE HERO SECTION - Ultra-Premium Electric Sapphire Theme */}
      <div className="relative overflow-hidden rounded-[32px] border border-[#2563EB]/20 bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#1E40AF] p-8 lg:p-12 text-white shadow-2xl">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[#3B82F6]/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 size-96 rounded-full bg-[#059669]/15 blur-3xl" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#60A5FA] border border-white/15 backdrop-blur-md">
              <Sparkles className="size-3.5 text-[#60A5FA]" /> FORTIV SOLUTIONS · ENTERPRISE AI PLATFORM
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-3.5 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck className="size-3.5" /> Software-Only · Zero Hardware OS
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
            Digitally Transform Your Steel Enterprise with <span className="text-[#60A5FA]">Autonomous AI</span>
          </h1>

          <p className="max-w-3xl text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
            Deploy <strong>231 proven AI automation opportunities</strong> across <strong>43 steel business functions</strong> in 90 days. Software-only intelligence grounded on your plant data with zero hardware requirements.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {["231 AI Use Cases", "43 Business Functions", "Software-Only AI", "Zero Hardware OS", "58 AI Agents", "Company Brain RAG", "Executive AI Copilots"].map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-bold text-slate-200">
                ✓ {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Button
              size="lg"
              onClick={() => setAssessmentOpen(true)}
              className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-extrabold text-sm px-6 rounded-full shadow-lg shadow-[#2563EB]/40 hover:shadow-xl"
            >
              <CalendarCheck className="size-4" />
              <span>Book AI Readiness Assessment</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setRoiOpen(true)}
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 font-extrabold text-sm px-5 rounded-full backdrop-blur-md"
            >
              <Calculator className="size-4" />
              <span>Calculate EBITDA Savings</span>
            </Button>

            <Button asChild size="lg" variant="ghost" className="text-slate-200 hover:text-white hover:bg-white/10 text-sm font-bold rounded-full">
              <Link to="/automation">
                <span>Explore 231 Workflows</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* 20-Second Executive Summary Bar */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-4 lg:grid-cols-6">
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Annualized Impact</p>
            <p className="text-2xl font-extrabold text-white">₹51.7 Cr / yr</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Hours Automated</p>
            <p className="text-2xl font-extrabold text-[#60A5FA]">420,000 hrs</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Implementation</p>
            <p className="text-2xl font-extrabold text-emerald-300">90 Days</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Security Standard</p>
            <p className="text-2xl font-extrabold text-white">SOC 2 Type II</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Hardware Cost</p>
            <p className="text-2xl font-extrabold text-emerald-300">₹0 (Zero)</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Net ROI Multiplier</p>
            <p className="text-2xl font-extrabold text-[#60A5FA]">6.8x ROI</p>
          </div>
        </div>
      </div>

      {/* 2. TOP EXECUTIVE OUTCOME KPI CARDS (Responsive 12-Column Grid) */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
              EXECUTIVE OUTCOMES & VALUE REALIZATION
            </h2>
            <p className="text-xs text-[#64748B]">Consolidated plant metrics across 43 business functions</p>
          </div>
          <span className="rounded-full bg-[#EFF6FF] px-3.5 py-1 text-[11px] font-extrabold text-[#1D4ED8] border border-[#BFDBFE]">
            Real-Time Enterprise Telemetry
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {executiveKpiCards.map((k) => (
            <StatCard key={k.label} {...k} />
          ))}
        </div>
      </div>

      {/* 3. SAVINGS WATERFALL & VALUE REALIZATION BREAKDOWN */}
      <Panel
        title="Annualized EBITDA Savings Waterfall & Value Realization"
        description="Quantified financial value pools across top manufacturing and commercial drivers"
        actions={
          <Button size="sm" onClick={() => setRoiOpen(true)} className="bg-[#2563EB] text-white hover:bg-[#1D4ED8]">
            <Calculator className="size-3.5" /> Launch ROI Solver
          </Button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {savingsWaterfallItems.map((item, idx) => (
            <div key={item.driver} className="rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB] hover:bg-[#FFFFFF] hover:shadow-md">
              <div>
                <div className="flex items-center justify-between text-[10px] font-extrabold text-[#64748B] mb-1">
                  <span>DRIVER #{idx + 1}</span>
                  <span className="text-[#059669]">{item.share}% OF TOTAL</span>
                </div>
                <h4 className="text-xs font-extrabold text-[#0F172A] leading-snug">{item.driver}</h4>
                <p className="mt-2 text-2xl font-extrabold text-[#2563EB]">{item.value}</p>
              </div>
              <p className="mt-3 text-[11px] text-[#64748B] border-t border-[#E2E8F0] pt-2 font-medium">{item.detail}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* 4. DEPARTMENT OPPORTUNITY HEATMAP & MATURITY MATRIX */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel
            title="Department Opportunity Heatmap & Value Pools"
            description="Proven value realization pools across key steel manufacturing functions"
            actions={
              <Button asChild size="sm" variant="outline">
                <Link to="/departments">View All 43 Depts</Link>
              </Button>
            }
            bare
          >
            <div className="divide-y divide-[#E2E8F0]">
              {opportunityHeatmap.map((h) => (
                <div key={h.dept} className="flex flex-wrap items-center justify-between gap-4 p-5 hover:bg-[#F8FAFC] transition-colors">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-extrabold text-[#0F172A]">{h.dept}</h4>
                      <Pill tone={h.impact === "High EBITDA" ? "primary" : "success"}>{h.impact}</Pill>
                    </div>
                    <p className="mt-1 text-[11px] text-[#64748B]">
                      Main Agent: <strong className="text-[#2563EB]">{h.mainAgent}</strong> · {h.useCases} AI Use Cases
                    </p>
                  </div>
                  <div className="flex items-center gap-5 text-right">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase text-[#64748B]">Value Pool</p>
                      <p className="text-sm font-extrabold text-[#059669]">{h.valuePool}</p>
                    </div>
                    <div className="w-28">
                      <p className="text-[10px] font-extrabold text-[#64748B] text-left mb-1">Maturity {h.maturity}%</p>
                      <Meter value={h.maturity} tone="success" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div>
          <Panel title="Automation Coverage & Roadmap" description="Automated vs manual process steps over time">
            <AreaTrend
              data={automationTrend}
              x="month"
              series={[
                { key: "automated", label: "Automated %" },
                { key: "manual", label: "Manual %" },
              ]}
              height={180}
            />
            <div className="mt-4 space-y-3 border-t border-[#E2E8F0] pt-4">
              {roadmap.map((p) => (
                <div key={p.phase}>
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="font-bold text-[#0F172A]">{p.phase}</span>
                    <span className="text-[#64748B]">{p.window}</span>
                  </div>
                  <Meter value={p.progress} tone={p.progress === 100 ? "success" : "primary"} />
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* 5. 6 MAIN ENTERPRISE MODULES & 43 SUBMODULE COVERAGE MAP */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
              BUSINESS FUNCTION COVERAGE (43 FUNCTIONS)
            </h2>
            <p className="text-xs text-[#64748B]">Organized under 6 core enterprise steel workspace modules</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domainCards.map((domain) => {
            const DomainIcon = domain.icon;
            return (
              <div
                key={domain.title}
                className="flex flex-col justify-between rounded-[28px] border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#2563EB]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                        <DomainIcon className="size-5" />
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                          {domain.title}
                        </h3>
                        <p className="text-[10px] font-semibold text-[#64748B]">
                          {domain.modulesCount} Submodules · {domain.automationsCount} Automations
                        </p>
                      </div>
                    </div>
                    <Link
                      to={domain.primaryRoute}
                      className="text-[#64748B] hover:text-[#2563EB]"
                      title="Open module"
                    >
                      <ChevronRight className="size-5" />
                    </Link>
                  </div>

                  <div className="my-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#F8FAFC] p-3 text-center border border-[#E2E8F0]">
                    <div>
                      <p className="text-[10px] font-extrabold text-[#64748B]">Submodules</p>
                      <p className="text-sm font-extrabold text-[#0F172A]">{domain.modulesCount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-[#64748B]">AI Agents</p>
                      <p className="text-sm font-extrabold text-[#2563EB]">{domain.agentsCount}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-[#64748B]">Maturity</p>
                      <p className="text-sm font-extrabold text-[#059669]">{domain.completion}%</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="mb-1 flex justify-between text-[10px]">
                      <span className="font-bold text-[#64748B]">Automation Maturity</span>
                      <span className="font-extrabold text-[#0F172A]">{domain.completion}%</span>
                    </div>
                    <Meter value={domain.completion} tone="success" />
                  </div>

                  <div>
                    <p className="mb-2 text-[10px] font-extrabold uppercase tracking-wider text-[#64748B]">
                      Included Submodules:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {domain.modules.map((m) => {
                        const MIcon = m.icon;
                        return (
                          <Link
                            key={m.to}
                            to={m.to}
                            className="flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-1 text-[11px] font-bold text-[#0F172A] hover:border-[#2563EB] hover:bg-[#EFF6FF] hover:text-[#2563EB] transition-colors"
                          >
                            <MIcon className="size-3 text-[#64748B]" />
                            <span>{m.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. TRUST & ENTERPRISE CREDIBILITY SECTION */}
      <div className="rounded-[32px] border border-[#E2E8F0] bg-[#FFFFFF] p-8 lg:p-10 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF6FF] px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8] border border-[#BFDBFE]">
            <ShieldCheck className="size-3.5 text-[#2563EB]" /> TRUST & ENTERPRISE ARCHITECTURE
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F172A]">
            Why Steel Manufacturing Executives Choose Fortiv Solutions
          </h2>
          <p className="text-xs font-medium text-[#64748B]">
            Engineered specifically for steel manufacturing enterprises with zero hardware changes, enterprise SOC 2 compliance, and guaranteed time-to-value.
          </p>
        </div>

        {/* 4 Key Pillars */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-2">
            <div className="grid size-10 place-items-center rounded-full bg-[#2563EB] text-white">
              <Zap className="size-5" />
            </div>
            <h3 className="text-xs font-extrabold text-[#0F172A]">Software-Only & Zero Hardware</h3>
            <p className="text-[11px] text-[#64748B] leading-relaxed font-medium">
              No new sensors or hardware installation required. Connects to SAP, SCADA, and LIMS via secure REST/OData APIs.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-2">
            <div className="grid size-10 place-items-center rounded-full bg-[#2563EB] text-white">
              <Lock className="size-5" />
            </div>
            <h3 className="text-xs font-extrabold text-[#0F172A]">SOC 2 Type II Certified</h3>
            <p className="text-[11px] text-[#64748B] leading-relaxed font-medium">
              Air-gapped deployment, private cloud tenancy, AES-256 encryption, and zero LLM data training leakage.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-2">
            <div className="grid size-10 place-items-center rounded-full bg-[#2563EB] text-white">
              <CheckCircle2 className="size-5" />
            </div>
            <h3 className="text-xs font-extrabold text-[#0F172A]">Human-in-the-Loop Governance</h3>
            <p className="text-[11px] text-[#64748B] leading-relaxed font-medium">
              Automated policy thresholds route high-value decisions to named human authorities with audit trails.
            </p>
          </div>

          <div className="rounded-[24px] border border-[#E2E8F0] bg-[#F8FAFC] p-5 space-y-2">
            <div className="grid size-10 place-items-center rounded-full bg-[#2563EB] text-white">
              <TrendingUp className="size-5" />
            </div>
            <h3 className="text-xs font-extrabold text-[#0F172A]">Rapid 90-Day ROI Payback</h3>
            <p className="text-[11px] text-[#64748B] leading-relaxed font-medium">
              Initial AI agents pilot live within 14 days, driving full EBITDA value realization across 43 functions in 90 days.
            </p>
          </div>
        </div>

        {/* Steel Sub-Sectors Served */}
        <div className="border-t border-[#E2E8F0] pt-6">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB] mb-4 text-center">
            Steel Sub-Sectors & Manufacturing Environments Served
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {steelSectors.map((s) => (
              <div key={s.name} className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 text-left shadow-sm">
                <p className="text-xs font-extrabold text-[#1D4ED8]">{s.name}</p>
                <p className="mt-1 text-[10px] text-[#64748B] leading-normal font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise FAQs */}
        <div className="border-t border-[#E2E8F0] pt-6 max-w-3xl mx-auto">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB] mb-4 text-center">
            Frequently Asked Executive Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={faq.q} className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-4 text-left text-xs font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="size-4 text-[#2563EB]" />
                    {faq.q}
                  </span>
                  {openFaq === idx ? <ChevronUp className="size-4 text-[#64748B]" /> : <ChevronDown className="size-4 text-[#64748B]" />}
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-[#64748B] leading-relaxed border-t border-[#E2E8F0] pt-3 bg-[#F8FAFC]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Assessment Banner */}
        <div className="rounded-[28px] bg-[#1E3A8A] p-8 text-white flex flex-wrap items-center justify-between gap-4 text-left shadow-xl">
          <div className="space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#60A5FA]">READY TO DIGITALLY TRANSFORM YOUR STEEL ENTERPRISE?</p>
            <h3 className="text-xl font-extrabold">Schedule Your 3-Day Zero-Hardware AI Readiness Assessment</h3>
            <p className="text-xs text-slate-200 font-medium">Quantify your exact EBITDA value pools and pilot 3 production AI agents in 14 days.</p>
          </div>
          <Button
            size="lg"
            onClick={() => setAssessmentOpen(true)}
            className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-extrabold text-sm px-6 rounded-full shadow-lg shadow-[#2563EB]/40"
          >
            <CalendarCheck className="size-4" />
            <span>Book Assessment Now</span>
          </Button>
        </div>
      </div>

      <AssessmentModal open={assessmentOpen} onOpenChange={setAssessmentOpen} />
      <RoiCalculatorModal
        open={roiOpen}
        onOpenChange={setRoiOpen}
        onOpenAssessment={() => setAssessmentOpen(true)}
      />
    </div>
  );
}
