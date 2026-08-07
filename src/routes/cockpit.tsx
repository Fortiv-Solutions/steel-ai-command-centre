import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Crown, Sparkles, CalendarCheck, ShieldAlert, Target, Wallet, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, Meter, statusTone } from "@/components/ui-kit";
import { AreaTrend, RadarSpread, LineSeries } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  executiveRoles,
  insights,
  riskRegister,
  salesPerformance,
  workingCapital,
} from "@/lib/data";

export const Route = createFileRoute("/cockpit")({
  head: () => ({
    meta: [
      { title: "Executive Value Cockpit · Fortiv Solutions Steel AI" },
      {
        name: "description",
        content:
          "Role-based cockpits for Chairman, Board, MD, CEO, COO, CFO and plant leadership with EBITDA intelligence and decision automation.",
      },
      { property: "og:title", content: "Executive Value Cockpit · Fortiv Solutions Steel AI" },
      {
        property: "og:description",
        content: "AI briefings, board reports, EBITDA realization intelligence and risk alerts for steel enterprise leadership.",
      },
    ],
  }),
  component: Cockpit,
});

const briefing = [
  "Order book closed the week at ₹1,284 Cr, 6.2% ahead of plan, driven by structural tenders in the western region.",
  "Export realization improved $18/MT after the Quotation Generator enforced a 36-hour response SLA.",
  "Receivables above 90 days remain concentrated in five accounts; a dunning sequence awaits CFO approval.",
  "Quality: 17 heats flagged for sulfur near the upper limit on IF-2 — lab documentation review recommended.",
  "Automation program is 72% through Phase 2 with 68 core automations in build.",
];

const decisions = [
  ["Shift 30% Q4 scrap volume to Eastern cluster", "₹2.7 Cr saving", "success"],
  ["Approve credit limit increase for Meghna Structurals", "₹2.5 Cr exposure", "warning"],
  ["Renew ferro silicon rate contract with dual sourcing", "Risk reduction", "info"],
  ["Defer Phase 3 multi-plant rollout by one month", "Capacity constraint", "neutral"],
] as const;

const radar = [
  { subject: "Commercial", value: 82 },
  { subject: "Supply chain", value: 74 },
  { subject: "Quality", value: 88 },
  { subject: "Finance", value: 79 },
  { subject: "Compliance", value: 94 },
  { subject: "People", value: 66 },
];

function Cockpit() {
  const [role, setRole] = useState(executiveRoles[0]!.role);
  const active = executiveRoles.find((r) => r.role === role)!;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive Cockpit"
        title="Leadership Value Realization & EBITDA Cockpit"
        description="Permission-scoped executive cockpits grounded on Company Brain RAG, refreshed continuously from ERP, SCADA, CRM, and workflow telemetry."
        actions={
          <Button size="sm" className="bg-[#0B1F4D] text-white hover:bg-[#081636]">
            <Sparkles className="size-4" /> Generate Executive Briefing
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {executiveRoles.map((r) => (
          <button
            key={r.role}
            onClick={() => setRole(r.role)}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-extrabold transition-all ${
              r.role === role
                ? "border-[#0B1F4D] bg-[#0B1F4D] text-white shadow-sm"
                : "border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B] hover:border-[#0B1F4D] hover:text-[#0B1F4D]"
            }`}
          >
            <Crown className="size-3.5" /> {r.role}
            {r.alerts > 0 && (
              <span className="rounded-full bg-[#DC2626] px-1.5 py-0.2 text-[9px] font-extrabold text-white">
                {r.alerts}
              </span>
            )}
          </button>
        ))}
      </div>

      <Panel className="mb-4" title={`${active.role} Executive Cockpit`} description={active.focus}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Order Book" value="₹1,284 Cr" delta={6.2} hint="vs plan" icon={Wallet} />
          <StatCard label="EBITDA Margin" value="14.8%" delta={1.4} hint="trailing quarter" icon={TrendingUp} />
          <StatCard label="On-Time Dispatch" value="94.1%" delta={2.8} hint="documented" icon={Clock} />
          <StatCard label="Open Risk Alerts" value={`${active.alerts}`} delta={-1} hint="assigned to role" icon={ShieldAlert} />
        </div>
      </Panel>

      <Tabs defaultValue="briefing">
        <TabsList className="mb-4 flex-wrap border-[#E2E8F0] bg-[#FFFFFF]">
          <TabsTrigger value="briefing" className="data-[state=active]:bg-[#0B1F4D] data-[state=active]:text-white font-bold">Executive Briefing</TabsTrigger>
          <TabsTrigger value="decisions" className="data-[state=active]:bg-[#0B1F4D] data-[state=active]:text-white font-bold">Decision Intelligence</TabsTrigger>
          <TabsTrigger value="board" className="data-[state=active]:bg-[#0B1F4D] data-[state=active]:text-white font-bold">Board Packs</TabsTrigger>
          <TabsTrigger value="kpi" className="data-[state=active]:bg-[#0B1F4D] data-[state=active]:text-white font-bold">KPI Monitoring</TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-[#0B1F4D] data-[state=active]:text-white font-bold">Action Tracker</TabsTrigger>
          <TabsTrigger value="meetings" className="data-[state=active]:bg-[#0B1F4D] data-[state=active]:text-white font-bold">Meeting Intelligence</TabsTrigger>
          <TabsTrigger value="risk" className="data-[state=active]:bg-[#0B1F4D] data-[state=active]:text-white font-bold">Risk Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="briefing" className="grid gap-4 xl:grid-cols-3">
          <Panel className="xl:col-span-2" title="This Week's Executive Briefing (5 Points)" bare>
            <ol className="divide-y divide-[#E2E8F0]">
              {briefing.map((b, i) => (
                <li key={i} className="flex gap-3 p-4 text-xs font-medium text-[#0F172A] leading-relaxed">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#0B1F4D] text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  {b}
                </li>
              ))}
            </ol>
          </Panel>
          <Panel title="Enterprise Health Index" description="Composite AI-scored index by pillar">
            <RadarSpread data={radar} height={280} />
          </Panel>
        </TabsContent>

        <TabsContent value="decisions" className="grid gap-4 xl:grid-cols-2">
          <Panel title="Recommended Executive Decisions" bare>
            <div className="divide-y divide-[#E2E8F0]">
              {decisions.map(([title, impact, tone]) => (
                <div key={title} className="flex items-center gap-3 p-4">
                  <Target className="size-4 text-[#0B1F4D]" />
                  <p className="flex-1 text-xs font-bold text-[#0F172A]">{title}</p>
                  <Pill tone={tone}>{impact}</Pill>
                  <Button size="sm" variant="outline" className="border-[#0B1F4D]/30 text-[#0B1F4D]">
                    Decide
                  </Button>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Real-Time AI Insights" bare>
            <div className="divide-y divide-[#E2E8F0]">
              {insights.map((i) => (
                <div key={i.title} className="p-4">
                  <div className="flex items-center gap-2">
                    <p className="flex-1 text-xs font-bold text-[#0F172A]">{i.title}</p>
                    <Pill tone={i.tone}>{i.impact}</Pill>
                  </div>
                  <p className="mt-1 text-xs text-[#64748B]">{i.body}</p>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="board" className="grid gap-4 xl:grid-cols-2">
          <Panel title="Board Pack Library" bare>
            <div className="divide-y divide-[#E2E8F0]">
              {[
                ["Q3 FY performance review", "Ready for approval", "warning"],
                ["Annual AI transformation review", "Published", "success"],
                ["Capital allocation & capex pipeline", "Draft", "neutral"],
                ["Enterprise risk & compliance report", "Published", "success"],
                ["ESG & statutory compliance summary", "In build", "warning"],
              ].map(([t, s, tone]) => (
                <div key={t} className="flex items-center gap-3 p-4">
                  <p className="flex-1 text-xs font-bold text-[#0F172A]">{t}</p>
                  <Pill tone={tone as never}>{s}</Pill>
                  <Button size="sm" variant="outline" className="border-[#0B1F4D]/30 text-[#0B1F4D]">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Board Report Generator" description="Assembled from ERP, MIS and Company Brain sources">
            <div className="space-y-3 text-xs">
              {[
                "Financial performance & variance commentary",
                "Order book, pipeline and win-rate analysis",
                "Quality, complaints and CAPA status",
                "Working capital and cash flow outlook",
                "AI program benefits realization",
                "Risk register and compliance attestations",
              ].map((s, i) => (
                <div key={s} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-bold text-[#0F172A]">{s}</span>
                    <span className="text-[#64748B] font-semibold">{92 - i * 3}% drafted</span>
                  </div>
                  <Meter value={92 - i * 3} tone="success" />
                </div>
              ))}
              <Button className="w-full bg-[#0B1F4D] text-white hover:bg-[#081636]" size="sm">
                <Sparkles className="size-4" /> Assemble Board Pack
              </Button>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="kpi" className="grid gap-4 xl:grid-cols-2">
          <Panel title="Revenue & Dispatch Trend">
            <AreaTrend
              data={salesPerformance}
              x="month"
              series={[
                { key: "domestic", label: "Domestic" },
                { key: "export", label: "Export" },
              ]}
            />
          </Panel>
          <Panel title="Working Capital Cycle">
            <LineSeries
              data={workingCapital}
              x="month"
              series={[
                { key: "dso", label: "DSO" },
                { key: "dpo", label: "DPO" },
                { key: "dio", label: "DIO" },
              ]}
            />
          </Panel>
        </TabsContent>

        <TabsContent value="actions">
          <Panel title="Executive Action Tracker" bare>
            <div className="divide-y divide-[#E2E8F0]">
              {[
                ["Close 90+ day receivables in top 5 accounts", "CFO", "Due in 6 days", 62],
                ["Dual-source ferro silicon", "Procurement Head", "Due in 12 days", 34],
                ["Lab documentation calibration review", "Plant Head", "Due in 3 days", 78],
                ["Phase 2 copilot rollout to Export Sales", "CDO", "Due in 20 days", 45],
                ["ISO 9001 surveillance audit readiness", "QA Head", "Due in 30 days", 88],
              ].map(([t, o, d, p]) => (
                <div key={t as string} className="flex flex-wrap items-center gap-4 p-4">
                  <p className="min-w-64 flex-1 text-xs font-bold text-[#0F172A]">{t}</p>
                  <span className="text-xs font-semibold text-[#64748B]">{o}</span>
                  <span className="text-xs font-semibold text-[#64748B]">{d}</span>
                  <span className="w-32">
                    <Meter value={p as number} tone="success" />
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="meetings">
          <Panel title="Meeting Intelligence & Decision Extraction" bare>
            <div className="divide-y divide-[#E2E8F0]">
              {[
                ["Monthly business review", "12 decisions · 27 actions extracted", "2 days ago"],
                ["Commercial pipeline review", "8 decisions · 14 actions extracted", "5 days ago"],
                ["Quality council", "5 decisions · 11 actions extracted", "1 week ago"],
                ["Board audit committee", "6 decisions · 9 actions extracted", "3 weeks ago"],
              ].map(([t, s, w]) => (
                <div key={t} className="flex items-center gap-3 p-4">
                  <CalendarCheck className="size-4 text-[#0B1F4D]" />
                  <p className="flex-1 text-xs font-bold text-[#0F172A]">{t}</p>
                  <span className="text-xs text-[#64748B]">{s}</span>
                  <span className="text-xs text-[#64748B]">{w}</span>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="risk">
          <Panel title="Plant Risk Register Alerts" bare>
            <div className="divide-y divide-[#E2E8F0]">
              {riskRegister.map((r) => (
                <div key={r.id as string} className="flex flex-wrap items-center gap-3 p-4">
                  <ShieldAlert className="size-4 text-[#D97706]" />
                  <span className="font-mono text-[11px] font-bold text-[#0B1F4D]">{r.id}</span>
                  <p className="min-w-56 flex-1 text-xs font-bold text-[#0F172A]">{r.title}</p>
                  <Pill tone={statusTone(String(r.severity))}>{r.severity}</Pill>
                  <span className="text-xs text-[#64748B]">{r.owner}</span>
                  <span className="w-28">
                    <Meter
                      value={r.score as number}
                      tone={(r.score as number) > 70 ? "destructive" : "warning"}
                    />
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}
