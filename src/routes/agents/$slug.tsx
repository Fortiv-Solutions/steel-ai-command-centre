import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bot,
  Brain,
  KeyRound,
  Play,
  Plug,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, Meter, statusTone } from "@/components/ui-kit";
import { AreaTrend } from "@/components/charts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agentBySlug, automationTrend, inr } from "@/lib/data";

export const Route = createFileRoute("/agents/$slug")({
  loader: ({ params }) => {
    const agent = agentBySlug(params.slug);
    if (!agent) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.agent.name ?? "AI Agent"} · Steel AI Command Center` },
      {
        name: "description",
        content:
          loaderData?.agent.description ??
          "AI agent configuration, knowledge, permissions, cost and execution history.",
      },
      { property: "og:title", content: `${loaderData?.agent.name ?? "AI Agent"} · Steel AI Command Center` },
      {
        property: "og:description",
        content: loaderData?.agent.description ?? "Enterprise AI agent detail.",
      },
    ],
  }),
  component: AgentDetail,
});

const logs = [
  ["12:41:08", "Retrieved 14 grounded chunks from Company Brain", "info"],
  ["12:41:09", "Extracted 22 fields from source document (confidence 0.97)", "success"],
  ["12:41:11", "Cross-validated against ERP master data — 1 variance", "warning"],
  ["12:41:12", "Draft generated, routed for human approval", "success"],
  ["12:41:12", "Audit record written to governance ledger", "info"],
] as const;

function AgentDetail() {
  const { agent } = Route.useLoaderData();

  return (
    <div>
      <Link
        to="/agents"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All agents
      </Link>

      <PageHeader
        eyebrow={agent.category}
        title={agent.name}
        description={agent.description}
        actions={
          <>
            <Pill tone={statusTone(agent.status)}>{agent.status}</Pill>
            <Button size="sm" variant="outline">
              <ScrollText className="size-4" /> Logs
            </Button>
            <Button size="sm">
              <Play className="size-4" /> Run agent
            </Button>
          </>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Accuracy" value={`${agent.accuracy}%`} delta={0.7} />
        <StatCard label="Executions" value={agent.runs.toLocaleString()} delta={12.4} />
        <StatCard label="Hours saved" value={agent.hoursSaved.toLocaleString()} delta={8.1} />
        <StatCard label="Monthly cost" value={inr(agent.monthlyCost * 84)} delta={-4.2} />
        <StatCard label="Model" value={agent.model} hint={agent.owner} />
      </div>

      <Tabs defaultValue="config">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge & memory</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="logs">Execution history</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="grid gap-4 xl:grid-cols-2">
          <Panel title="System prompt" description="Versioned in the prompt registry (v4.2)">
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-background/60 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
{`You are the ${agent.name} for a multi-plant steel manufacturing group.
Scope: ${agent.department}. Operate on business documents, ERP records and
enterprise knowledge only — never reference plant telemetry, PLC, SCADA or
sensor data, which are explicitly out of scope.

Rules
1. Ground every answer in retrieved Company Brain context and cite sources.
2. Never fabricate chemistry, mechanical properties or certificate values.
3. Respect the requesting user's role-based permissions.
4. Route any commercial, quality or financial commitment to human approval.
5. Emit structured output matching the registered schema for downstream
   workflows and audit logging.`}
            </pre>
          </Panel>
          <div className="space-y-4">
            <Panel title="Connected systems">
              <div className="flex flex-wrap gap-2">
                {agent.systems.map((s: string) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-elevated/60 px-2.5 py-1.5 text-[11px]"
                  >
                    <Plug className="size-3.5 text-accent" /> {s}
                  </span>
                ))}
              </div>
            </Panel>
            <Panel title="Guardrails">
              <div className="space-y-3 text-xs">
                {[
                  ["Hallucination detection", 98],
                  ["PII redaction", 100],
                  ["Grounding enforcement", 96],
                  ["Human approval gate", 100],
                ].map(([l, v]) => (
                  <div key={l as string}>
                    <div className="mb-1 flex justify-between">
                      <span>{l}</span>
                      <span className="text-muted-foreground">{v}%</span>
                    </div>
                    <Meter value={v as number} tone="success" />
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="grid gap-4 xl:grid-cols-2">
          <Panel title="Grounded knowledge sources">
            <div className="space-y-2">
              {agent.knowledge.map((k: string) => (
                <div
                  key={k}
                  className="flex items-center gap-2 rounded-lg border border-border bg-elevated/50 p-3 text-xs"
                >
                  <Brain className="size-4 text-primary" /> {k}
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Agent memory" description="Rolling episodic + semantic memory">
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>· 18,420 retained interactions across 9 months</p>
              <p>· Customer specification preferences per account</p>
              <p>· Approved phrasing library for commercial documents</p>
              <p>· Prior deviation resolutions and their outcomes</p>
              <p>· Human corrections fed back as preference signals</p>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="permissions">
          <Panel title="Permission matrix" bare>
            <div className="divide-y divide-border">
              {agent.permissions.concat([
                "No access to payroll or personal data",
                "Cannot post financial documents without approval",
              ]).map((p: string) => (
                <div key={p} className="flex items-center gap-3 px-5 py-3.5 text-xs">
                  <KeyRound className="size-4 text-accent" /> {p}
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="performance" className="grid gap-4 xl:grid-cols-2">
          <Panel title="Utilisation trend">
            <AreaTrend
              data={automationTrend}
              x="month"
              series={[{ key: "automated", label: "Automation %" }]}
            />
          </Panel>
          <Panel title="Hours released">
            <AreaTrend data={automationTrend} x="month" series={[{ key: "hours", label: "Hours" }]} />
          </Panel>
        </TabsContent>

        <TabsContent value="logs">
          <Panel title="Latest execution trace" bare>
            <div className="divide-y divide-border font-mono text-[11px]">
              {logs.map(([t, m, tone]) => (
                <div key={t + m} className="flex items-center gap-4 px-5 py-3">
                  <span className="text-muted-foreground">{t}</span>
                  <span className="flex-1">{m}</span>
                  <Pill tone={tone}>{tone}</Pill>
                </div>
              ))}
            </div>
          </Panel>
          <p className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" /> Every execution is immutably logged for
            AI governance, audit and hallucination review.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
