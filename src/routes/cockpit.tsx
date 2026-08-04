import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Crown, Sparkles, CalendarCheck, ShieldAlert, Target } from "lucide-react";
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
      { title: "Executive Cockpit · AI Command Center for Steel" },
      {
        name: "description",
        content:
          "Role-based cockpits for Chairman, Board, MD, CEO, COO, CFO and plant leadership with AI briefings and decision intelligence.",
      },
      { property: "og:title", content: "Executive Cockpit · AI Command Center for Steel" },
      {
        property: "og:description",
        content: "AI briefings, board reports, decision intelligence and risk alerts for steel leadership.",
      },
    ],
  }),
  component: Cockpit,
});

const briefing = [
  "Order book closed the week at ₹1,284 Cr, 6.2% ahead of plan, driven by structural tenders in the western region.",
  "Export realisation improved $18/MT after the Quotation Generator enforced a 36-hour response SLA.",
  "Receivables above 90 days remain concentrated in five accounts; a dunning sequence awaits CFO approval.",
  "Quality: 17 heats flagged for sulphur near the upper limit on IF-2 — lab documentation review recommended.",
  "Automation programme is 72% through Phase 2 with 68 core automations in build.",
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
    <div>
      <PageHeader
        eyebrow="Executive Cockpit"
        title="Decision intelligence for leadership"
        description="Every cockpit is permission-scoped, grounded on the Company Brain and refreshed continuously from ERP, CRM, document and workflow signals."
        actions={
          <Button size="sm">
            <Sparkles className="size-4" /> Generate executive briefing
          </Button>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {executiveRoles.map((r) => (
          <button
            key={r.role}
            onClick={() => setRole(r.role)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
              r.role === role
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "border-border bg-surface text-muted-foreground hover:bg-elevated"
            }`}
          >
            <Crown className="size-3.5" /> {r.role}
            {r.alerts > 0 && (
              <span className="rounded-full bg-destructive/20 px-1.5 text-[10px] text-destructive">
                {r.alerts}
              </span>
            )}
          </button>
        ))}
      </div>

      <Panel className="mb-4" title={`${active.role} cockpit`} description={active.focus}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Order book" value="₹1,284 Cr" delta={6.2} hint="vs plan" />
          <StatCard label="EBITDA margin" value="14.8%" delta={1.4} hint="trailing quarter" />
          <StatCard label="On-time dispatch" value="94.1%" delta={2.8} hint="documented" />
          <StatCard label="Open risks" value={`${active.alerts}`} delta={-1} hint="assigned to role" />
        </div>
      </Panel>

      <Tabs defaultValue="briefing">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="briefing">Executive briefing</TabsTrigger>
          <TabsTrigger value="decisions">Decision intelligence</TabsTrigger>
          <TabsTrigger value="board">Board reports</TabsTrigger>
          <TabsTrigger value="kpi">KPI monitoring</TabsTrigger>
          <TabsTrigger value="actions">Action tracker</TabsTrigger>
          <TabsTrigger value="meetings">Meeting intelligence</TabsTrigger>
          <TabsTrigger value="risk">Risk alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="briefing" className="grid gap-4 xl:grid-cols-3">
          <Panel className="xl:col-span-2" title="This week, in five points" bare>
            <ol className="divide-y divide-border">
              {briefing.map((b, i) => (
                <li key={i} className="flex gap-3 p-5 text-sm leading-relaxed">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  {b}
                </li>
              ))}
            </ol>
          </Panel>
          <Panel title="Enterprise health" description="Composite AI-scored index by pillar">
            <RadarSpread data={radar} height={300} />
          </Panel>
        </TabsContent>

        <TabsContent value="decisions" className="grid gap-4 xl:grid-cols-2">
          <Panel title="Recommended decisions" bare>
            <div className="divide-y divide-border">
              {decisions.map(([title, impact, tone]) => (
                <div key={title} className="flex items-center gap-3 p-5">
                  <Target className="size-4 text-primary" />
                  <p className="flex-1 text-sm">{title}</p>
                  <Pill tone={tone}>{impact}</Pill>
                  <Button size="sm" variant="outline">
                    Decide
                  </Button>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="AI insights" bare>
            <div className="divide-y divide-border">
              {insights.map((i) => (
                <div key={i.title} className="p-5">
                  <div className="flex items-center gap-2">
                    <p className="flex-1 text-sm font-medium">{i.title}</p>
                    <Pill tone={i.tone}>{i.impact}</Pill>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{i.body}</p>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="board" className="grid gap-4 xl:grid-cols-2">
          <Panel title="Board pack library" bare>
            <div className="divide-y divide-border">
              {[
                ["Q3 FY performance review", "Ready for approval", "warning"],
                ["Annual AI transformation review", "Published", "success"],
                ["Capital allocation & capex pipeline", "Draft", "neutral"],
                ["Enterprise risk & compliance report", "Published", "success"],
                ["ESG & statutory compliance summary", "In build", "warning"],
              ].map(([t, s, tone]) => (
                <div key={t} className="flex items-center gap-3 p-5">
                  <p className="flex-1 text-sm">{t}</p>
                  <Pill tone={tone as never}>{s}</Pill>
                  <Button size="sm" variant="outline">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Board report generator" description="Assembled from ERP, MIS and Company Brain sources">
            <div className="space-y-3 text-xs">
              {[
                "Financial performance & variance commentary",
                "Order book, pipeline and win-rate analysis",
                "Quality, complaints and CAPA status",
                "Working capital and cash flow outlook",
                "AI programme benefits realisation",
                "Risk register and compliance attestations",
              ].map((s, i) => (
                <div key={s} className="rounded-lg border border-border bg-elevated/50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">{s}</span>
                    <span className="text-muted-foreground">{92 - i * 3}% drafted</span>
                  </div>
                  <Meter value={92 - i * 3} />
                </div>
              ))}
              <Button className="w-full" size="sm">
                <Sparkles className="size-4" /> Assemble board pack
              </Button>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="kpi" className="grid gap-4 xl:grid-cols-2">
          <Panel title="Revenue & dispatch trend">
            <AreaTrend
              data={salesPerformance}
              x="month"
              series={[
                { key: "domestic", label: "Domestic" },
                { key: "export", label: "Export" },
              ]}
            />
          </Panel>
          <Panel title="Working capital cycle">
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
          <Panel title="Action tracker" bare>
            <div className="divide-y divide-border">
              {[
                ["Close 90+ day receivables in top 5 accounts", "CFO", "Due in 6 days", 62],
                ["Dual-source ferro silicon", "Procurement Head", "Due in 12 days", 34],
                ["Lab documentation calibration review", "Plant Head", "Due in 3 days", 78],
                ["Phase 2 copilot rollout to Export Sales", "CDO", "Due in 20 days", 45],
                ["ISO 9001 surveillance audit readiness", "QA Head", "Due in 30 days", 88],
              ].map(([t, o, d, p]) => (
                <div key={t as string} className="flex flex-wrap items-center gap-4 p-5">
                  <p className="min-w-64 flex-1 text-sm">{t}</p>
                  <span className="text-xs text-muted-foreground">{o}</span>
                  <span className="text-xs text-muted-foreground">{d}</span>
                  <span className="w-32">
                    <Meter value={p as number} />
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="meetings">
          <Panel title="Meeting intelligence" bare>
            <div className="divide-y divide-border">
              {[
                ["Monthly business review", "12 decisions · 27 actions extracted", "2 days ago"],
                ["Commercial pipeline review", "8 decisions · 14 actions extracted", "5 days ago"],
                ["Quality council", "5 decisions · 11 actions extracted", "1 week ago"],
                ["Board audit committee", "6 decisions · 9 actions extracted", "3 weeks ago"],
              ].map(([t, s, w]) => (
                <div key={t} className="flex items-center gap-3 p-5">
                  <CalendarCheck className="size-4 text-accent" />
                  <p className="flex-1 text-sm font-medium">{t}</p>
                  <span className="text-xs text-muted-foreground">{s}</span>
                  <span className="text-xs text-muted-foreground">{w}</span>
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="risk">
          <Panel title="Risk alerts" bare>
            <div className="divide-y divide-border">
              {riskRegister.map((r) => (
                <div key={r.id as string} className="flex flex-wrap items-center gap-3 p-5">
                  <ShieldAlert className="size-4 text-warning" />
                  <span className="font-mono text-[11px] text-muted-foreground">{r.id}</span>
                  <p className="min-w-56 flex-1 text-sm">{r.title}</p>
                  <Pill tone={statusTone(String(r.severity))}>{r.severity}</Pill>
                  <span className="text-xs text-muted-foreground">{r.owner}</span>
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
