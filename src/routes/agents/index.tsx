import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bot, Filter, Plus, Search } from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { agents, inr } from "@/lib/data";

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "AI Agents Marketplace · Steel AI Command Center" },
      {
        name: "description",
        content:
          "Enterprise marketplace of 58 AI agents across commercial, procurement, quality, finance, HR and platform functions.",
      },
      { property: "og:title", content: "AI Agents Marketplace · Steel AI Command Center" },
      {
        property: "og:description",
        content: "Deploy, govern and monitor AI agents with owners, permissions, cost and performance.",
      },
    ],
  }),
  component: AgentsPage,
});

const categories = ["All", "Executive", "Commercial", "Supply Chain", "Quality", "Finance", "Corporate", "Manufacturing", "Platform"];

function AgentsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const list = useMemo(
    () =>
      agents.filter(
        (a) =>
          (cat === "All" || a.category === cat) &&
          (a.name + a.department).toLowerCase().includes(q.toLowerCase()),
      ),
    [q, cat],
  );

  const totalHours = agents.reduce((s, a) => s + a.hoursSaved, 0);
  const cost = agents.reduce((s, a) => s + a.monthlyCost, 0);

  return (
    <div>
      <PageHeader
        eyebrow="AI Agents Center"
        title="Enterprise agent marketplace"
        description="Every agent carries an owner, a department, a prompt registry entry, grounded knowledge, memory, connected systems, permissions, cost and full execution history."
        actions={
          <Button size="sm">
            <Plus className="size-4" /> Deploy agent
          </Button>
        }
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Agents deployed" value={String(agents.length)} delta={4} hint="marketplace" />
        <StatCard
          label="Active now"
          value={String(agents.filter((a) => a.status === "active").length)}
          delta={3}
        />
        <StatCard label="Hours saved / yr" value={totalHours.toLocaleString()} delta={9.4} />
        <StatCard label="Monthly AI cost" value={inr(cost * 84)} delta={-3.1} hint="gateway spend" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search agents by name or department…"
            className="h-10 bg-surface pl-9 text-xs"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="size-3.5 text-muted-foreground" />
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-md border px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                c === cat
                  ? "border-primary/60 bg-primary/10"
                  : "border-border bg-surface text-muted-foreground hover:bg-elevated"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => (
          <Link key={a.slug} to="/agents/$slug" params={{ slug: a.slug }}>
            <Panel className="h-full transition-colors hover:border-primary/50">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/12">
                  <Bot className="size-4 text-primary" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{a.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{a.department}</p>
                </div>
                <Pill tone={statusTone(a.status)}>{a.status}</Pill>
              </div>
              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {a.description}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[11px]">
                <div>
                  <p className="text-muted-foreground">Accuracy</p>
                  <p className="font-semibold tabular-nums">{a.accuracy}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Runs</p>
                  <p className="font-semibold tabular-nums">{a.runs.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Hours saved</p>
                  <p className="font-semibold tabular-nums">{a.hoursSaved.toLocaleString()}</p>
                </div>
              </div>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  );
}
