import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bot,
  ChevronRight,
  Filter,
  Plus,
  Search,
  Sparkles,
  Zap,
  Plug,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Wallet,
  Scale,
  Users,
  Factory,
  Flame,
  ArrowRight,
} from "lucide-react";
import { Pill, Meter, statusTone } from "@/components/ui-kit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { agents } from "@/lib/data";

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "AI Agent Showcase & Marketplace · Fortiv Solutions Steel AI" },
      {
        name: "description",
        content:
          "Enterprise catalog of 58 Production AI agents across Sales, Procurement, Quality, EAF Metallurgy, Finance, HR and Plant Logistics.",
      },
      { property: "og:title", content: "AI Agent Showcase & Marketplace · Fortiv Solutions Steel AI" },
      {
        property: "og:description",
        content: "Deploy, govern and monitor autonomous AI agents with prompt registry, memory, RAG knowledge bindings, and ERP connectors.",
      },
    ],
  }),
  component: AgentsPage,
});

const filterStatuses = ["All", "Running", "Idle", "Paused", "Draft"];

const connectedSystemsMap: Record<string, string[]> = {
  active: ["SAP S/4HANA", "Spectro LIMS", "Company Brain RAG"],
  paused: ["Salesforce CRM", "Microsoft 365", "ERP Finance"],
  error: ["SCADA / PLC", "Railway Rake System", "SAP MM"],
  draft: ["SharePoint", "PostgreSQL", "REST API"],
};

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
    <div className="space-y-6">
      {/* Top Showcase Banner - Royal Sapphire & Electric Blue Theme */}
      <div className="rounded-[32px] border border-[#2563EB]/20 bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#1E40AF] p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 border border-white/20 px-3.5 py-0.5 text-[10px] font-extrabold uppercase text-[#60A5FA]">
                ENTERPRISE AI AGENT GALLERY
              </span>
              <span className="text-xs text-slate-200 font-bold">• 58 Production Agents Live</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
              Autonomous Steel Enterprise AI Agents
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              Every agent is pre-trained on steel manufacturing domain knowledge, permission-aware, and connected to your SAP ERP, SCADA, and LIMS systems. Software-only deployment with zero hardware.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-extrabold rounded-full shadow-md">
              <Plus className="size-3.5" /> Deploy Custom Agent
            </Button>
          </div>
        </div>

        {/* Quick Agent Stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-4 sm:grid-cols-4">
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Active Production Agents</p>
            <p className="text-xl font-extrabold text-white">58 Live Agents</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Monthly Executions</p>
            <p className="text-xl font-extrabold text-[#60A5FA]">1,420,000 / mo</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Grounded Accuracy</p>
            <p className="text-xl font-extrabold text-emerald-300">99.8% Zero Hallucination</p>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-300 uppercase">Human Sign-off Policy</p>
            <p className="text-xl font-extrabold text-white">SOC 2 Enforced</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-[28px] border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative min-w-[280px] flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-[#64748B]" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 58 agents by function, purpose or connected system…"
              className="h-10 bg-[#F8FAFC] border-[#E2E8F0] pl-10 text-xs text-[#0F172A] focus:border-[#2563EB] rounded-full"
            />
          </div>
          <span className="text-xs font-bold text-[#64748B]">
            Showing <strong className="text-[#2563EB]">{list.length}</strong> of 58 agents
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-[#E2E8F0] pt-3">
          <span className="text-xs font-extrabold text-[#2563EB] mr-1">Status:</span>
          {filterStatuses.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`rounded-full px-3.5 py-1 text-xs font-extrabold transition-all ${
                f === statusFilter
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Enterprise AI Agent Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => {
          const displayStatus =
            a.status === "active"
              ? "Running"
              : a.status === "paused"
                ? "Idle"
                : a.status === "error"
                  ? "Paused"
                  : "Draft";

          const systems = connectedSystemsMap[a.status] || ["SAP S/4HANA", "Company Brain RAG"];

          return (
            <div
              key={a.slug}
              className="flex h-full flex-col justify-between rounded-[28px] border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#2563EB]"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                      <Bot className="size-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <h3 className="text-xs font-extrabold text-[#0F172A] leading-snug">{a.name}</h3>
                      <p className="text-[11px] font-bold text-[#2563EB]">{a.department}</p>
                    </div>
                  </div>
                  <Pill tone={statusTone(a.status)}>{displayStatus}</Pill>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed font-medium line-clamp-2">
                  Automates {a.department.toLowerCase()} workflows with grounded RAG retrieval, policy validation, and audit trail.
                </p>

                <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] p-3 border border-[#E2E8F0] text-xs">
                  <div>
                    <p className="text-[9px] font-extrabold uppercase text-[#64748B]">
                      EST. SAVINGS / MO
                    </p>
                    <p className="text-xs font-extrabold text-[#059669]">
                      ₹{(a.monthlyCost * 120).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-extrabold uppercase text-[#64748B]">
                      ACCURACY
                    </p>
                    <p className="text-xs font-extrabold text-[#2563EB]">{a.accuracy}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-extrabold uppercase text-[#64748B]">
                      RUNS / MO
                    </p>
                    <p className="text-xs font-extrabold text-[#0F172A]">{a.runs.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-extrabold uppercase text-[#64748B] mb-2 flex items-center gap-1">
                    <Plug className="size-3 text-[#2563EB]" /> Connected Enterprise Systems:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {systems.map((s) => (
                      <span key={s} className="rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 py-0.5 text-[10px] font-bold text-[#475569]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                <span className="text-[10px] font-bold text-[#64748B]">
                  Model: <strong className="text-[#0F172A]">{a.model}</strong>
                </span>
                <Button asChild size="sm" variant="outline" className="h-8 rounded-full border-[#2563EB]/30 text-[#2563EB] hover:bg-[#EFF6FF] text-xs font-bold">
                  <Link to="/agents/$slug" params={{ slug: a.slug }}>
                    <span>Inspect Agent</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
