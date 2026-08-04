import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Building2, Search } from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, Meter, statusTone } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { departments, inr } from "@/lib/data";

export const Route = createFileRoute("/departments/")({
  head: () => ({
    meta: [
      { title: "Department Center · 43 Business Functions" },
      {
        name: "description",
        content:
          "Dedicated AI workspaces for all 43 steel manufacturing business functions with copilots, workflows, approvals and analytics.",
      },
      { property: "og:title", content: "Department Center · 43 Business Functions" },
      {
        property: "og:description",
        content: "Every business function gets dashboards, copilots, agents, documents and automation.",
      },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  const [q, setQ] = useState("");
  const clusters = useMemo(
    () => [...new Set(departments.map((d) => d.cluster))],
    [],
  );

  const filtered = departments.filter((d) =>
    (d.name + d.cluster).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        eyebrow="Department Center"
        title="43 business functions, one operating system"
        description="Each function has its own workspace: dashboard, KPIs, copilot, agents, reports, analytics, document library, workflows, approvals, tasks, projects, knowledge and automation backlog."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Business functions" value="43" hint="fully mapped" />
        <StatCard
          label="Automations mapped"
          value={String(departments.reduce((s, d) => s + d.automations, 0))}
          delta={11}
        />
        <StatCard
          label="Avg adoption"
          value={`${Math.round(departments.reduce((s, d) => s + d.adoption, 0) / departments.length)}%`}
          delta={5.4}
        />
        <StatCard
          label="Annualised savings"
          value={inr(departments.reduce((s, d) => s + d.annualSavings, 0))}
          delta={12.2}
        />
      </div>

      <div className="relative mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search business functions…"
          className="h-10 bg-surface pl-9 text-xs"
        />
      </div>

      <div className="space-y-6">
        {clusters.map((cluster) => {
          const items = filtered.filter((d) => d.cluster === cluster);
          if (!items.length) return null;
          return (
            <div key={cluster}>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {cluster} · {items.length}
              </p>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {items.map((d) => (
                  <Link key={d.slug} to="/departments/$slug" params={{ slug: d.slug }}>
                    <Panel className="h-full transition-colors hover:border-primary/50">
                      <div className="flex items-start gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent/12">
                          <Building2 className="size-4 text-accent" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{d.name}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {d.headcount} people · {d.copilot}
                          </p>
                        </div>
                        <Pill tone={statusTone(d.maturity)}>{d.maturity}</Pill>
                      </div>
                      <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>AI adoption</span>
                          <span className="tabular-nums">{d.adoption}%</span>
                        </div>
                        <Meter value={d.adoption} />
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[11px]">
                        <div>
                          <p className="text-muted-foreground">Automations</p>
                          <p className="font-semibold tabular-nums">{d.automations}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Agents</p>
                          <p className="font-semibold tabular-nums">{d.agents}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Savings</p>
                          <p className="font-semibold tabular-nums">{inr(d.annualSavings)}</p>
                        </div>
                      </div>
                    </Panel>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
