import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  CheckCircle2,
  Database,
  FileSearch,
  Search,
  Zap,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
  Lock,
  FileText,
  Plug,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/company-brain")({
  head: () => ({
    meta: [
      { title: "Company Brain & RAG Knowledge Layer · Fortiv Solutions Steel AI" },
      { name: "description", content: "Enterprise Knowledge Layer, RAG architecture, SAP integration, document intelligence, and zero-hallucination grounded search." },
    ],
  }),
  component: Page,
});

const vectorIndexes = [
  { repository: "Melt Shop SOPs & Maintenance Manuals", chunks: "1.4M Chunks", dimension: "1536d Vector", sourceCount: "4,250 PDFs", lastSync: "Real-time", status: "Indexed" },
  { repository: "Mill Test Certificates (MTC Archives)", chunks: "1.8M Chunks", dimension: "1536d Vector", sourceCount: "14,800 Files", lastSync: "5 mins ago", status: "Indexed" },
  { repository: "SAP S/4HANA Master Data & Ledgers", chunks: "850K Chunks", dimension: "1536d Vector", sourceCount: "Database Tables", lastSync: "1 min ago", status: "Indexed" },
  { repository: "Regulatory Compliance & ISO Standards", chunks: "120K Chunks", dimension: "1536d Vector", sourceCount: "48 Docs", lastSync: "Yesterday", status: "Indexed" },
];

const connectedSources = [
  { system: "SAP S/4HANA ERP", type: "Master Data & Materials", status: "Live API", records: "1.2M Records" },
  { system: "Microsoft 365 & SharePoint", type: "SOPs, Manuals & Emails", status: "Real-Time Sync", records: "18,400 Docs" },
  { system: "Salesforce CRM", type: "Customer Orders & Backlog", status: "Live Webhook", records: "45,500 Orders" },
  { system: "LIMS Spectrometry System", type: "Heat Chemical Logs", status: "Real-Time Direct", records: "14,800 Heats" },
];

function Page() {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#0B1F4D]/20 bg-gradient-to-r from-[#0B1F4D] via-[#081636] to-[#050E24] p-6 lg:p-8 text-white shadow-xl">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#0284C7]/20 border border-[#0284C7]/40 px-3 py-0.5 text-[10px] font-extrabold uppercase text-[#0284C7]">
              ENTERPRISE RAG KNOWLEDGE LAYER
            </span>
            <span className="text-xs text-emerald-400 font-semibold">• 99.8% Zero Hallucination</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
            Company Brain & Enterprise Knowledge Architecture
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Unified retrieval augmented generation (RAG) layer connecting your SAP S/4HANA ERP, Mill Test Certificates, SOP manuals, and plant SCADA logs into a single permission-aware executive knowledge engine.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Vector Chunks" value="4.17 Million" hint="1536d embeddings" icon={Brain} />
        <StatCard label="Ingested Documents" value="19,100 Docs" hint="100% permissioned" icon={Database} />
        <StatCard label="Retrieval Speed" value="34 ms" hint="sub-second response" icon={Zap} />
        <StatCard label="Grounded Accuracy" value="99.8%" hint="citation audited" icon={CheckCircle2} />
      </div>

      {/* RAG Architecture Diagram Section */}
      <Panel title="How the Company Brain Works: Unified RAG Architecture" description="Enterprise knowledge retrieval without data leakage or technical complexity">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center space-y-2">
            <div className="mx-auto grid size-10 place-items-center rounded-lg bg-[#0B1F4D] text-white font-bold">
              1
            </div>
            <h4 className="text-xs font-bold text-[#0F172A]">Enterprise Data Connectors</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Connects to SAP, SharePoint, SCADA, and LIMS via secure REST/OData APIs.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center space-y-2">
            <div className="mx-auto grid size-10 place-items-center rounded-lg bg-[#0B1F4D] text-white font-bold">
              2
            </div>
            <h4 className="text-xs font-bold text-[#0F172A]">Document Intelligence</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Extracts chemical specs, MTC certificates, invoices, and plant manuals.
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center space-y-2">
            <div className="mx-auto grid size-10 place-items-center rounded-lg bg-[#0B1F4D] text-white font-bold">
              3
            </div>
            <h4 className="text-xs font-bold text-[#0F172A]">Permissioned Vector Index</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Indexes 4.17M chunks with strict role-based access control (RBAC).
            </p>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center space-y-2">
            <div className="mx-auto grid size-10 place-items-center rounded-lg bg-[#059669] text-white font-bold">
              4
            </div>
            <h4 className="text-xs font-bold text-[#0F172A]">Grounded AI Answers</h4>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Delivers instant answers with exact source document citations.
            </p>
          </div>
        </div>
      </Panel>

      {/* Connected Systems Grid */}
      <Panel title="Connected Enterprise Systems & Live Sources" description="Real-time synchronized data pipelines">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {connectedSources.map((s) => (
            <div key={s.system} className="rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#F0F4FF] px-2 py-0.5 text-[9px] font-bold text-[#0B1F4D]">
                  {s.status}
                </span>
                <span className="text-[10px] font-bold text-[#059669]">{s.records}</span>
              </div>
              <h4 className="text-xs font-bold text-[#0F172A]">{s.system}</h4>
              <p className="text-[11px] text-[#64748B]">{s.type}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Ingested Repositories Table */}
      <Panel title="Active Vector Repositories & Ingested Knowledge Index" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F8FAFC]">
              <TableHead className="font-bold text-[#0F172A]">Knowledge Repository</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Vector Chunk Count</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Embedding Dimension</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Source Count</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Sync Frequency</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Index Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vectorIndexes.map((v) => (
              <TableRow key={v.repository} className="hover:bg-[#F8FAFC]">
                <TableCell className="font-bold text-xs text-[#0F172A]">{v.repository}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#0B1F4D]">{v.chunks}</TableCell>
                <TableCell className="text-xs font-semibold text-[#64748B]">{v.dimension}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{v.sourceCount}</TableCell>
                <TableCell className="text-xs font-semibold text-[#64748B]">{v.lastSync}</TableCell>
                <TableCell><Pill tone="success">{v.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
