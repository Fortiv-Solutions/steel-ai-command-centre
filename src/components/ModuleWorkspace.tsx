import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  BadgeCheck,
  Bot,
  Box,
  Brain,
  Building2,
  CheckCircle2,
  ChevronRight,
  Database,
  Factory,
  FileCheck,
  FileSearch,
  FileText,
  Flame,
  FolderKanban,
  Layers,
  Lock,
  Package,
  Plug,
  RefreshCw,
  Scale,
  ScrollText,
  Search,
  Settings,
  ShieldAlert,
  Sparkles,
  Thermometer,
  Truck,
  Users,
  Wallet,
  Warehouse,
  Workflow as WorkflowIcon,
  Zap,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, Meter, statusTone } from "@/components/ui-kit";
import { AreaTrend, BarSeries, DonutChart, LineSeries } from "@/components/charts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  agents,
  automations,
  approvals,
  automationTrend,
  docTypes,
  inr,
  workflows,
  departments,
} from "@/lib/data";

export type ModuleKpi = { label: string; value: string; delta?: number; hint?: string };

export type CustomTab = {
  id: string;
  label: string;
  badge?: string;
  content: React.ReactNode;
};

// Domain Mock Data Builders for specialized modules
const heatLogsData = [
  { id: "H-4921", furnace: "EAF Unit 1", grade: "304L Stainless", temp: "1,625 °C", carbon: "0.04%", sulfur: "0.012%", status: "Ready for Tapping", action: "Add 120kg FeMn" },
  { id: "H-4922", furnace: "EAF Unit 2", grade: "Fe 550D TMT", temp: "1,595 °C", carbon: "0.18%", sulfur: "0.028%", status: "Refining", action: "Oxygen Lance 4m" },
  { id: "H-4923", furnace: "LRF Unit 1", grade: "SAE 1008 Wire", temp: "1,610 °C", carbon: "0.07%", sulfur: "0.015%", status: "Desulfurization", action: "Argon Purge" },
  { id: "H-4924", furnace: "EAF Unit 1", grade: "IS 2062 E250", temp: "1,580 °C", carbon: "0.21%", sulfur: "0.031%", status: "Melting", action: "Power 42 MW" },
  { id: "H-4925", furnace: "Concast 2", grade: "EN8 Carbon Steel", temp: "1,540 °C", carbon: "0.40%", sulfur: "0.020%", status: "Casting", action: "Cooling Flow 18L/s" },
];

const mtcCertificatesData = [
  { certNo: "MTC-2026-8891", heat: "H-4921", customer: "Tata Projects", grade: "304L HR Plate", yieldMPa: 345, tensileMPa: 590, elong: "42%", aiAudit: "100% Match Spec" },
  { certNo: "MTC-2026-8892", heat: "H-4922", customer: "L&T Construction", grade: "Fe 550D TMT Bar", yieldMPa: 575, tensileMPa: 660, elong: "18%", aiAudit: "Auto-Signed" },
  { certNo: "MTC-2026-8893", heat: "H-4923", customer: "Precision Wires Corp", grade: "SAE 1008 Rod", yieldMPa: 310, tensileMPa: 440, elong: "38%", aiAudit: "Verified" },
  { certNo: "MTC-2026-8894", heat: "H-4924", customer: "Jindal Infra", grade: "IS 2062 Beam", yieldMPa: 280, tensileMPa: 450, elong: "26%", aiAudit: "Verified" },
];

const inventoryStockData = [
  { location: "Bay B-4", category: "HR Coils", tonnage: "4,250 MT", grade: "IS 2062 E250", status: "Available", aiRec: "Dispatch to Pipe Mill" },
  { location: "Bay C-1", category: "Billets (150x150)", tonnage: "2,840 MT", grade: "Fe 550D", status: "Allocated", aiRec: "Feed Bar Mill 2" },
  { location: "Yard S-2", category: "Scrap HMS 1/2", tonnage: "1,850 MT", grade: "Heavy Melt", status: "Low Stock", aiRec: "Trigger Reorder" },
  { location: "Bay A-3", category: "Ferro Silicon", tonnage: "340 MT", grade: "FeSi 75%", status: "Sufficient", aiRec: "Optimal Stock Level" },
];

const logisticsDispatchData = [
  { rakeId: "RAKE-NDLS-04", destination: "Delhi Freight Terminal", wagons: 59, netTonnage: "3,540 MT", status: "Dispatched", eta: "14 hrs" },
  { rakeId: "TRK-FLEET-88", destination: "Mumbai Port Yard", wagons: 18, netTonnage: "720 MT", status: "Loading", eta: "22 hrs" },
  { rakeId: "RAKE-HALD-12", destination: "Haldia Export Dock", wagons: 58, netTonnage: "3,480 MT", status: "Customs Cleared", eta: "6 hrs" },
];

const financeLedgerData = [
  { component: "Raw Scrap & Hot Metal", costPerTon: "₹28,400 / MT", budgetVar: "-1.8%", trend: "Favorable", aiInsight: "Scrap mix ratio optimized" },
  { component: "EAF Power & Gas Energy", costPerTon: "₹7,250 / MT", budgetVar: "+0.4%", trend: "Stable", aiInsight: "Off-peak tariff utilized 88%" },
  { component: "Refractory & Consumables", costPerTon: "₹2,100 / MT", budgetVar: "-3.2%", trend: "Favorable", aiInsight: "Ladle life extended +14 heats" },
  { component: "Conversion & Rolling", costPerTon: "₹4,750 / MT", budgetVar: "-0.9%", trend: "Favorable", aiInsight: "Cobble rate reduced to 0.08%" },
];

const vendorPerformanceData = [
  { vendor: "Jindal Refractories Ltd", category: "Refractory Bricks", rating: 4.9, slaDelivery: "99.4%", qualityPass: "100%", activeContract: "RC-2026-04" },
  { vendor: "ScrapCorp International", category: "HMS 1/2 Scrap", rating: 4.6, slaDelivery: "96.2%", qualityPass: "98.4%", activeContract: "RC-2026-11" },
  { vendor: "FerroAlloys India Ltd", category: "Ferro Manganese", rating: 4.8, slaDelivery: "98.8%", qualityPass: "99.2%", activeContract: "RC-2026-08" },
];

export function ModuleWorkspace({
  eyebrow,
  title,
  description,
  kpis,
  matchDepartments,
  customTabs,
  extra,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kpis: ModuleKpi[];
  matchDepartments: string[];
  customTabs?: CustomTab[];
  extra?: React.ReactNode;
}) {
  const match = (name: string) => matchDepartments.some((d) => name.includes(d));
  const relAgents = agents.filter((a) => match(a.department));
  const relAutomations = automations.filter((a) => match(a.department));
  const relApprovals = approvals.filter((a) => match(a.department));
  const relWorkflows = workflows.filter((w) => match(w.department));
  const relDepts = departments.filter((d) => match(d.name));

  const tKey = title.toLowerCase();

  const domainTabs: CustomTab[] = customTabs || (
    tKey.includes("heat") || tKey.includes("smelt") ? [
      {
        id: "heats",
        label: "Heat Log & Chemistry",
        badge: "Live",
        content: (
          <Panel title="EAF Melt Shop Heat Log & Chemical Composition" bare>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC]">
                  <TableHead className="font-bold text-[#0F172A]">Heat ID</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Furnace / Unit</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Steel Grade</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Tap Temp</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Carbon %</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Sulfur %</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Status</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">AI Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heatLogsData.map((h) => (
                  <TableRow key={h.id} className="hover:bg-[#F8FAFC]">
                    <TableCell className="font-mono text-xs font-bold text-[#0B1F4D]">{h.id}</TableCell>
                    <TableCell className="text-xs font-bold text-[#0F172A]">{h.furnace}</TableCell>
                    <TableCell className="text-xs font-bold text-[#0F172A]">{h.grade}</TableCell>
                    <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{h.temp}</TableCell>
                    <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{h.carbon}</TableCell>
                    <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{h.sulfur}</TableCell>
                    <TableCell><Pill tone={statusTone(h.status)}>{h.status}</Pill></TableCell>
                    <TableCell className="text-xs font-bold text-[#D97706]">{h.action}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        )
      },
      {
        id: "thermal",
        label: "Furnace Thermal Profile",
        content: (
          <Panel title="Electric Arc Furnace kWh/Tonne Energy Trend">
            <AreaTrend data={automationTrend} x="month" series={[{ key: "automated", label: "Power Efficiency %" }]} height={220} />
          </Panel>
        )
      },
      {
        id: "slag",
        label: "AI Alloy Optimizer",
        content: (
          <Panel title="Slag Foaming & Ferro-Alloy Addition Guidance">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-3 text-xs font-bold text-[#0F172A]">
                <Flame className="mb-2 size-4 text-[#0B1F4D]" />
                Target Carbon: 0.045% · Current: 0.040% (Add 15kg Injection Carbon)
              </div>
              <div className="rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-3 text-xs font-bold text-[#0F172A]">
                <Sparkles className="mb-2 size-4 text-[#059669]" />
                Ferro Silicon 75%: Add 85kg before Tapping
              </div>
            </div>
          </Panel>
        )
      }
    ] :
    tKey.includes("mtc") || tKey.includes("mill test") || tKey.includes("certificate") ? [
      {
        id: "mtc-reg",
        label: "MTC Certificate Register",
        badge: "Verified",
        content: (
          <Panel title="Verified Mill Test Certificates (Trailing 90 Days)" bare>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC]">
                  <TableHead className="font-bold text-[#0F172A]">Cert No</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Heat #</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Customer</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Grade & Spec</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Yield (MPa)</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Tensile (MPa)</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Elongation</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">AI Audit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mtcCertificatesData.map((m) => (
                  <TableRow key={m.certNo} className="hover:bg-[#F8FAFC]">
                    <TableCell className="font-mono text-xs font-bold text-[#0B1F4D]">{m.certNo}</TableCell>
                    <TableCell className="text-xs font-bold text-[#0F172A]">{m.heat}</TableCell>
                    <TableCell className="text-xs font-bold text-[#0F172A]">{m.customer}</TableCell>
                    <TableCell className="text-xs font-bold text-[#0F172A]">{m.grade}</TableCell>
                    <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{m.yieldMPa}</TableCell>
                    <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{m.tensileMPa}</TableCell>
                    <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{m.elong}</TableCell>
                    <TableCell><Pill tone="success">{m.aiAudit}</Pill></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        )
      }
    ] :
    [
      {
        id: "domain-overview",
        label: `${title} Overview`,
        badge: "Active",
        content: (
          <div className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-2">
              <Panel title={`${title} Automation Adoption`} description="Process step coverage %">
                <AreaTrend
                  data={automationTrend}
                  x="month"
                  series={[
                    { key: "automated", label: "Automated %" },
                    { key: "manual", label: "Manual %" },
                  ]}
                />
              </Panel>
              <Panel title={`${title} Productive Capacity`} description="Hours saved annualised">
                <BarSeries data={automationTrend} x="month" series={[{ key: "hours", label: "Hours Released" }]} />
              </Panel>
            </div>
            {relDepts.length > 0 && (
              <Panel title="Linked Business Functions" bare>
                <div className="divide-y divide-[#E2E8F0]">
                  {relDepts.map((d) => (
                    <Link
                      key={d.slug}
                      to="/departments/$slug"
                      params={{ slug: d.slug }}
                      className="flex flex-wrap items-center gap-4 px-4 py-3 text-xs font-bold transition-colors hover:bg-[#F8FAFC]"
                    >
                      <span className="min-w-52 flex-1 font-bold text-[#0F172A]">{d.name}</span>
                      <Pill tone={statusTone(d.maturity)}>{d.maturity}</Pill>
                      <span className="text-xs text-[#64748B]">
                        {d.automations} automations · {d.agents} agents
                      </span>
                      <span className="w-28">
                        <Meter value={d.adoption} />
                      </span>
                      <span className="w-24 text-right text-xs tabular-nums font-bold text-[#059669]">
                        {inr(d.annualSavings)}
                      </span>
                    </Link>
                  ))}
                </div>
              </Panel>
            )}
          </div>
        )
      },
      {
        id: "domain-agents",
        label: `AI Copilot & Agents (${relAgents.length})`,
        content: (
          <Panel title={`Dedicated AI Agents for ${title}`} bare>
            <div className="divide-y divide-[#E2E8F0]">
              {relAgents.map((a) => (
                <Link
                  key={a.slug}
                  to="/agents/$slug"
                  params={{ slug: a.slug }}
                  className="flex flex-wrap items-center gap-3 px-4 py-3 transition-colors hover:bg-[#F8FAFC]"
                >
                  <Bot className="size-4 text-[#0B1F4D]" />
                  <span className="min-w-48 flex-1 text-xs font-bold text-[#0F172A]">{a.name}</span>
                  <Pill tone={statusTone(a.status)}>{a.status}</Pill>
                  <span className="text-xs font-semibold text-[#64748B]">{a.model}</span>
                  <span className="text-xs tabular-nums font-bold text-[#0F172A]">
                    {a.accuracy}% accuracy · {a.runs.toLocaleString()} runs
                  </span>
                </Link>
              ))}
              {relAgents.length === 0 && (
                <p className="px-4 py-5 text-xs text-[#64748B]">
                  Platform shared agents serve this module.
                </p>
              )}
            </div>
          </Panel>
        )
      },
      {
        id: "domain-automations",
        label: `Automations (${relAutomations.length})`,
        content: (
          <Panel title={`Automation Opportunities in ${title}`} bare>
            <Table>
              <TableHeader>
                <TableRow className="bg-[#F8FAFC]">
                  <TableHead className="font-bold text-[#0F172A]">ID</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Opportunity</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Priority</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Complexity</TableHead>
                  <TableHead className="font-bold text-[#0F172A]">Status</TableHead>
                  <TableHead className="text-right font-bold text-[#0F172A]">Savings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {relAutomations.map((a) => (
                  <TableRow key={a.id} className="hover:bg-[#F8FAFC]">
                    <TableCell className="font-mono text-xs font-bold text-[#0B1F4D]">{a.id}</TableCell>
                    <TableCell className="max-w-md text-xs font-bold text-[#0F172A]">{a.title}</TableCell>
                    <TableCell>
                      <Pill tone={a.priority === "P1" ? "destructive" : a.priority === "P2" ? "warning" : "neutral"}>
                        {a.priority}
                      </Pill>
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-[#64748B]">{a.complexity}</TableCell>
                    <TableCell><Pill tone={statusTone(a.status)}>{a.status}</Pill></TableCell>
                    <TableCell className="text-right text-xs font-bold tabular-nums text-[#059669]">{inr(a.annualSavings)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Panel>
        )
      }
    ]
  );

  return (
    <div>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <>
            <Button variant="outline" size="sm">
              <FileText className="size-4" /> Generate Executive Briefing
            </Button>
            <Button size="sm" className="bg-[#0B1F4D] text-white hover:bg-[#081636]">
              <Sparkles className="size-4" /> Open Copilot
            </Button>
          </>
        }
      />

      {/* KPI Cards Strip */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <StatCard key={k.label} {...k} />
        ))}
      </div>

      {/* Dynamic Domain-Tailored Tabs */}
      <Tabs defaultValue={domainTabs[0]?.id || "domain-overview"}>
        <TabsList className="mb-4 flex-wrap border-[#E2E8F0] bg-[#FFFFFF]">
          {domainTabs.map((t) => (
            <TabsTrigger
              key={t.id}
              value={t.id}
              className="font-bold text-[#0F172A] data-[state=active]:bg-[#0B1F4D] data-[state=active]:text-white"
            >
              {t.label}
              {t.badge && (
                <span className="ml-1.5 rounded bg-[#0284C7] px-1.5 py-0.2 text-[9px] font-extrabold text-white">
                  {t.badge}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {domainTabs.map((t) => (
          <TabsContent key={t.id} value={t.id} className="space-y-4">
            {t.content}
          </TabsContent>
        ))}
      </Tabs>

      {extra}

      <p className="mt-6 flex items-center gap-2 text-[11px] font-bold text-[#64748B]">
        <Zap className="size-3.5 text-[#059669]" /> Software-only architecture: zero IoT / PLC / SCADA / machine telemetry required.
      </p>
    </div>
  );
}
