import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { departments } from "@/lib/data";

export const Route = createFileRoute("/copilots")({
  head: () => ({
    meta: [
      { title: "AI Copilot Center · Steel AI Command Center" },
      {
        name: "description",
        content:
          "A context-aware AI copilot for every department: enterprise search, report generation, workflow execution and approval support.",
      },
      { property: "og:title", content: "AI Copilot Center · Steel AI Command Center" },
      {
        property: "og:description",
        content: "43 departmental copilots grounded on the Company Brain with permission-aware retrieval.",
      },
    ],
  }),
  component: Copilots,
});

const capabilities = [
  "Context awareness",
  "Enterprise search",
  "Ask questions",
  "Generate reports",
  "Execute workflows",
  "Create documents",
  "Recommend actions",
  "Explain data",
  "Connected knowledge",
  "Approval support",
  "Smart notifications",
];

function Copilots() {
  const [active, setActive] = useState(departments[4]!.slug);
  const dept = departments.find((d) => d.slug === active)!;
  const [thread, setThread] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setThread((t) => [
      ...t,
      { role: "user", text: input },
      {
        role: "ai",
        text: `Based on ${dept.name} records in the Company Brain: adoption is at ${dept.adoption}%, ${dept.automations} automations are mapped and ${dept.hoursSaved.toLocaleString()} hours are released annually. I can draft the supporting document, open the relevant workflow, or route an approval — tell me which.`,
      },
    ]);
    setInput("");
  };

  return (
    <div>
      <PageHeader
        eyebrow="AI Copilot Center"
        title="A copilot for every business function"
        description="Copilots inherit the user's role, see only permitted knowledge, cite their sources, and can trigger workflows or approvals on the user's behalf."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Copilots live" value="43" delta={3} hint="one per function" />
        <StatCard label="Conversations / month" value="184,300" delta={22.6} />
        <StatCard label="Grounded answer rate" value="97.4%" delta={1.8} />
        <StatCard label="Actions executed" value="26,410" delta={17.2} hint="workflows + approvals" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
        <Panel title="Select copilot" bare className="max-h-[620px] overflow-y-auto">
          <div className="divide-y divide-border">
            {departments.map((d) => (
              <button
                key={d.slug}
                onClick={() => {
                  setActive(d.slug);
                  setThread([]);
                }}
                className={`flex w-full items-center gap-2 px-4 py-3 text-left text-xs transition-colors hover:bg-elevated/60 ${
                  d.slug === active ? "bg-elevated text-foreground" : "text-muted-foreground"
                }`}
              >
                <Sparkles className="size-3.5 shrink-0 text-primary" />
                <span className="truncate">{d.copilot}</span>
              </button>
            ))}
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel
            title={dept.copilot}
            description={`${dept.name} · ${dept.cluster} · ${dept.maturity}`}
            actions={<Pill tone="success">Grounded</Pill>}
          >
            <div className="mb-4 flex flex-wrap gap-1.5">
              {capabilities.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-elevated/60 px-2.5 py-1 text-[10px] text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="min-h-64 space-y-3 rounded-lg border border-border bg-background/50 p-4">
              {thread.length === 0 && (
                <div className="flex h-56 flex-col items-center justify-center gap-2 text-center">
                  <MessageSquare className="size-6 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Ask {dept.copilot} about documents, KPIs, approvals or workflows for{" "}
                    {dept.name}.
                  </p>
                </div>
              )}
              {thread.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto max-w-[80%] rounded-lg bg-primary/15 p-3 text-xs"
                      : "max-w-[92%] rounded-lg border border-border bg-elevated/60 p-3 text-xs leading-relaxed"
                  }
                >
                  {m.text}
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={`Ask ${dept.copilot}…`}
                className="h-10 bg-background text-xs"
              />
              <Button className="size-10 shrink-0" size="icon" onClick={send}>
                <Send className="size-4" />
              </Button>
            </div>
          </Panel>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {dept.kpis.map((k) => (
              <StatCard key={k.label} label={k.label} value={k.value} delta={k.delta} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
