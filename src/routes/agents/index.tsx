import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Bot, ChevronRight, Filter, Plus, Search, Sparkles } from "lucide-react";
import { Pill, Meter, statusTone } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { agents } from "@/lib/data";

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "AI Agents Center · Steel AI Command Center" },
      {
        name: "description",
        content:
          "Enterprise marketplace of 63 Production AI agents across commercial, procurement, quality, finance, HR and plant functions.",
      },
      { property: "og:title", content: "AI Agents Center · Steel AI Command Center" },
      {
        property: "og:description",
        content: "Deploy, govern and monitor AI agents with prompt registry, memory, knowledge bindings, cost and performance.",
      },
    ],
  }),
  component: AgentsPage,
});

const filterStatuses = ["All", "Running", "Idle", "Paused", "Draft"];

const modelsList = ["GPT-5.5", "Claude Sonnet 4.6", "Gemini 3.6 Flash", "Azure OpenAI o5"];

function AgentsPage() {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const list = useMemo(
    () =>
      agents.filter((a) => {
        const sMatch =
          statusFilter === "All" ||
          (statusFilter === "Running" && a.status === "active") ||
          (statusFilter === "Idle" && a.status === "paused") ||
          (statusFilter === "Paused" && a.status === "error") ||
          (statusFilter === "Draft" && a.status === "draft");
        const qMatch = (a.name + a.department + a.model).toLowerCase().includes(q.toLowerCase());
        return sMatch && qMatch;
      }),
    [q, statusFilter],
  );

  return (
    <div className="space-y-5">
      {/* Top Main Section Header matching screenshot */}
      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 shadow-sm">
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold text-[#64748B]">
          <span>Command Center</span>
          <ChevronRight className="size-3 text-[#94A3B8]" />
          <span>AI Workspace</span>
          <ChevronRight className="size-3 text-[#94A3B8]" />
          <span className="text-[#E05600]">AI Agents</span>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#FFF7ED] px-2 py-0.5 text-[10px] font-extrabold uppercase text-[#E05600] border border-[#FDBA74]">
                AI WORKSPACE
              </span>
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A] lg:text-3xl">
              63 Production AI Agents
            </h1>
            <p className="mt-1 max-w-3xl text-xs font-medium leading-relaxed text-[#475569]">
              Every agent is versioned, permissioned, and monitored — with prompt registry, memory, knowledge bindings, connected systems, cost and execution logs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline">
              <Sparkles className="size-3.5" /> AI Assistant
            </Button>
            <Button size="sm">
              <Plus className="size-3.5" /> Provision New Agent
            </Button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-[#475569]">
            <Filter className="size-3.5 text-[#64748B]" /> Filters:
          </span>
          {filterStatuses.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                f === statusFilter
                  ? "bg-[#0F172A] text-white shadow-sm"
                  : "bg-[#FFFFFF] text-[#475569] border border-[#E2E8F0] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Count Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-[280px] flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-[#64748B]" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search 63 agents by name or department function…"
            className="h-9 bg-[#FFFFFF] border-[#E2E8F0] pl-9 text-xs text-[#0F172A] focus:border-[#E05600]"
          />
        </div>
        <span className="text-xs font-bold text-[#64748B]">
          Showing <strong className="text-[#0F172A]">{list.length}</strong> of 63 agents
        </span>
      </div>

      {/* 4-Column Grid of AI Agent Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((a, idx) => {
          const modelName = modelsList[idx % modelsList.length];
          const displayStatus =
            a.status === "active"
              ? "Running"
              : a.status === "paused"
                ? "Idle"
                : a.status === "error"
                  ? "Paused"
                  : "Draft";

          return (
            <Link key={a.slug} to="/agents/$slug" params={{ slug: a.slug }}>
              <div className="flex h-full flex-col justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-all hover:border-[#E05600] hover:shadow-md">
                <div>
                  {/* Card Top Row */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]">
                        <Bot className="size-4 text-[#E05600]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#0F172A]">{a.name}</p>
                        <p className="truncate text-[10px] font-semibold text-[#64748B]">
                          {a.department}
                        </p>
                      </div>
                    </div>
                    <Pill tone={statusTone(a.status)}>{displayStatus}</Pill>
                  </div>

                  {/* Metrics Box */}
                  <div className="my-3 grid grid-cols-3 gap-1 rounded-lg bg-[#F1F5F9] p-2 text-center border border-[#E2E8F0]">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#64748B]">
                        RUNS
                      </p>
                      <p className="text-xs font-bold text-[#0F172A]">{a.runs.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#64748B]">
                        ACCURACY
                      </p>
                      <p className="text-xs font-bold text-[#E05600]">{a.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-[#64748B]">
                        COST / MO
                      </p>
                      <p className="text-xs font-bold text-[#0F172A]">${a.monthlyCost}</p>
                    </div>
                  </div>

                  {/* Health Index */}
                  <div className="mb-3">
                    <div className="mb-1 flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-[#64748B]">Health Index</span>
                      <span className="font-bold text-[#B87514]">{82 + (idx % 16)}%</span>
                    </div>
                    <Meter value={82 + (idx % 16)} tone="success" />
                  </div>
                </div>

                {/* Footer Model & Latency */}
                <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-[10px]">
                  <span className="font-bold text-[#0F172A]">{modelName}</span>
                  <span className="font-mono text-[#64748B]">
                    {(0.6 + (idx % 8) * 0.4).toFixed(1)}s p95
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
