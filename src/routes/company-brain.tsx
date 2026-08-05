import { createFileRoute } from "@tanstack/react-router";
import {
  Brain,
  CheckCircle2,
  Database,
  FileSearch,
  Search,
  Zap,
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
      { title: "Company Brain & Knowledge Base · Steel AI Command Center" },
      { name: "description", content: "Enterprise vector knowledge base, SOPs, plant manuals, and grounded AI search." },
    ],
  }),
  component: Page,
});

const vectorIndexes = [
  { repository: "Melt Shop SOPs & Maintenance Manuals", chunks: "1.4M Chunks", dimension: "1536d Vector", sourceCount: "4,250 PDFs", lastSync: "Real-time", status: "Indexed" },
  { repository: "Mill Test Certificates (MTC Archives)", chunks: "1.8M Chunks", dimension: "1536d Vector", sourceCount: "14,800 Files", lastSync: "5 mins ago", status: "Indexed" },
  { repository: "SAP S/4HANA Master Data & Ledgers", chunks: "850K Chunks", dimension: "1536d Vector", sourceCount: "Database Table", lastSync: "1 min ago", status: "Indexed" },
  { repository: "Regulatory Compliance & ISO Standards", chunks: "120K Chunks", dimension: "1536d Vector", sourceCount: "48 Docs", lastSync: "Yesterday", status: "Indexed" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Knowledge"
        title="Company Brain & Vector Knowledge Base"
        description="Enterprise vector search, SOP manuals, chemical libraries, and grounded LLM retrieval for plant operations."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Vector Chunks" value="4.17 Million" hint="1536d embeddings" icon={Brain} />
        <StatCard label="Source Documents" value="19,100 Docs" hint="100% permissioned" icon={Database} />
        <StatCard label="Retrieval Latency" value="34 ms" hint="sub-second RAG" icon={Zap} />
        <StatCard label="Grounded Accuracy" value="99.8%" hint="zero hallucination" icon={CheckCircle2} />
      </div>

      <Panel title="Active Vector Repositories & Ingested Knowledge Sources" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
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
              <TableRow key={v.repository} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-bold text-xs text-[#0F172A]">{v.repository}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{v.chunks}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{v.dimension}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{v.sourceCount}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{v.lastSync}</TableCell>
                <TableCell><Pill tone="success">{v.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
