import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle2,
  Database,
  Globe,
  Layers,
  Plug,
  RefreshCw,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations & Connectors · Steel AI Command Center" },
      { name: "description", content: "SAP, Oracle, MES, WMS, and custom API enterprise connectors." },
    ],
  }),
  component: Page,
});

const connectors = [
  { name: "SAP S/4HANA ERP", type: "Core ERP / FI / CO", status: "Connected", syncRate: "99.98%", dailyCalls: "1,420,000", latency: "38ms", lastSync: "2 mins ago" },
  { name: "Oracle Cloud SCM", type: "Supply Chain & Procurement", status: "Connected", syncRate: "99.94%", dailyCalls: "850,000", latency: "45ms", lastSync: "5 mins ago" },
  { name: "Salesforce CRM", type: "Sales & Order Backlog", status: "Connected", syncRate: "100%", dailyCalls: "340,000", latency: "52ms", lastSync: "1 min ago" },
  { name: "Microsoft SharePoint", type: "Document Repository", status: "Connected", syncRate: "99.85%", dailyCalls: "180,000", latency: "64ms", lastSync: "10 mins ago" },
  { name: "Custom REST / GraphQL Gateway", type: "Internal Mill APIs", status: "Connected", syncRate: "99.99%", dailyCalls: "2,840,000", latency: "18ms", lastSync: "Real-time" },
  { name: "LIMS Lab System Gateway", type: "Chemical Spectrometry", status: "Connected", syncRate: "100%", dailyCalls: "92,000", latency: "24ms", lastSync: "Real-time" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Platform"
        title="Enterprise System Integrations"
        description="Pre-built connectors for SAP S/4HANA, Oracle ERP, Salesforce, LIMS, and REST/GraphQL APIs."
        actions={
          <Button size="sm">
            <Plug className="size-3.5" /> Add Connector
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Connected Systems" value="32 APIs" hint="100% operational" icon={Plug} />
        <StatCard label="Sync Reliability" value="99.98%" hint="zero data loss" icon={CheckCircle2} />
        <StatCard label="Daily API Calls" value="5.7 Million" hint="real-time stream" icon={Activity} />
        <StatCard label="Avg Latency" value="38 ms" hint="sub-second sync" icon={RefreshCw} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {connectors.map((c) => (
          <div key={c.name} className="flex flex-col justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-colors hover:border-[#CBD5E1]">
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded bg-[#E05600] text-white">
                    <Plug className="size-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A]">{c.name}</h3>
                    <p className="text-[10px] text-[#475569]">{c.type}</p>
                  </div>
                </div>
                <Pill tone="success">{c.status}</Pill>
              </div>

              <div className="my-3 grid grid-cols-2 gap-2 rounded-lg bg-[#F1F5F9] p-2 text-center border border-[#E2E8F0]">
                <div>
                  <p className="text-[10px] font-semibold text-[#475569]">Sync Rate</p>
                  <p className="text-xs font-bold text-[#0F172A]">{c.syncRate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-[#475569]">Latency</p>
                  <p className="text-xs font-bold text-[#E05600]">{c.latency}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10px] font-medium text-[#475569]">
              <span>Daily: {c.dailyCalls}</span>
              <span>Sync: {c.lastSync}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
