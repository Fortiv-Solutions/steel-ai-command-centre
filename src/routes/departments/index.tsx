import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Building2, Search, ArrowRight } from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, Meter, statusTone } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { departments, inr } from "@/lib/data";

export const Route = createFileRoute("/departments/")({
  head: () => ({
    meta: [
      { title: "43 Steel Business Functions Hub · Fortiv Solutions Steel AI" },
      {
        name: "description",
        content:
          "Dedicated AI workspaces for all 43 steel manufacturing business functions with copilots, workflows, approvals, document intelligence and analytics.",
      },
      { property: "og:title", content: "43 Steel Business Functions Hub · Fortiv Solutions Steel AI" },
      {
        property: "og:description",
        content: "Every business function gets tailored dashboards, copilots, agents, documents and automation registers.",
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
    <div className="space-y-6">
      <PageHeader
        eyebrow="43 Business Functions"
        title="Steel Enterprise Department AI Workspaces"
        description="Each steel manufacturing business function has a dedicated executive AI workspace: copilot, agents, document intelligence, automated decision queues, and EBITDA value metrics."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Business Functions" value="43 Mapped" hint="100% steel domain" icon={Building2} />
        <StatCard
          label="Automations Mapped"
          value={String(departments.reduce((s, d) => s + d.automations, 0))}
          delta={11}
          hint="zero hardware OS"
        />
        <StatCard
          label="Avg AI Adoption"
          value={`${Math.round(departments.reduce((s, d) => s + d.adoption, 0) / departments.length)}%`}
          delta={5.4}
          hint="target 85%"
        />
        <StatCard
          label="Annualized Savings"
          value={inr(departments.reduce((s, d) => s + d.annualSavings, 0))}
          delta={12.2}
          hint="6.8x net ROI"
        />
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search 43 business functions by name or cluster…"
          className="h-10 border-[#E2E8F0] bg-[#FFFFFF] pl-9 text-xs text-[#0F172A] focus:border-[#0B1F4D]"
        />
      </div>

      <div className="space-y-8">
        {clusters.map((cluster) => {
          const items = filtered.filter((d) => d.cluster === cluster);
          if (!items.length) return null;
          return (
            <div key={cluster}>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[#0B1F4D] flex items-center gap-2 border-b border-[#E2E8F0] pb-2">
                <span>{cluster}</span>
                <span className="rounded-full bg-[#F0F4FF] px-2.5 py-0.5 text-[10px] text-[#0B1F4D] border border-[#0B1F4D]/20">
                  {items.length} Functions
                </span>
              </p>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {items.map((d) => (
                  <Link key={d.slug} to="/departments/$slug" params={{ slug: d.slug }}>
                    <Panel className="h-full transition-all hover:border-[#0B1F4D] hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#F0F4FF] border border-[#0B1F4D]/20 text-[#0B1F4D]">
                          <Building2 className="size-4 text-[#0B1F4D]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-extrabold text-[#0F172A]">{d.name}</p>
                          <p className="text-[11px] text-[#64748B]">
                            {d.headcount} FTEs · {d.copilot}
                          </p>
                        </div>
                        <Pill tone={statusTone(d.maturity)}>{d.maturity}</Pill>
                      </div>
                      <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold text-[#64748B]">
                          <span>AI Adoption Rate</span>
                          <span className="tabular-nums text-[#0F172A]">{d.adoption}%</span>
                        </div>
                        <Meter value={d.adoption} tone="success" />
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-[#E2E8F0] pt-3 text-[11px]">
                        <div>
                          <p className="text-[10px] font-bold text-[#64748B] uppercase">Automations</p>
                          <p className="font-extrabold text-[#0F172A]">{d.automations}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#64748B] uppercase">AI Agents</p>
                          <p className="font-extrabold text-[#0B1F4D]">{d.agents}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#64748B] uppercase">Savings</p>
                          <p className="font-extrabold text-[#059669]">{inr(d.annualSavings)}</p>
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
