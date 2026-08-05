import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  FileCheck,
  FileSearch,
  FileText,
  Sparkles,
} from "lucide-react";
import { Meter, PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Document Intelligence · Steel AI Command Center" },
      { name: "description", content: "Automated extraction for Mill Test Certificates, Invoices, POs, and Inspection Reports." },
    ],
  }),
  component: Page,
});

const docCategories = [
  { docType: "Mill Test Certificates (MTC)", count: 18400, accuracy: "99.9%", autoStraight: 94, sampleFile: "MTC_2026_8891.pdf", status: "Active Pipeline" },
  { docType: "Scrap Purchase Orders & Invoices", count: 8250, accuracy: "99.4%", autoStraight: 88, sampleFile: "PO_Scrap_4921.pdf", status: "Active Pipeline" },
  { docType: "Refractory Inspection Certificates", count: 3100, accuracy: "99.1%", autoStraight: 85, sampleFile: "INSP_Ladle_102.pdf", status: "Active Pipeline" },
  { docType: "Logistics Rake Bills of Lading", count: 6400, accuracy: "99.8%", autoStraight: 96, sampleFile: "BOL_RAKE_04.pdf", status: "Active Pipeline" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Knowledge"
        title="Document Intelligence & OCR Parsing"
        description="Automated AI document processing for Mill Test Certificates, Purchase Orders, Bills of Lading, and Quality Inspection Reports."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Processed Docs (30d)" value="36,150 Docs" delta={14.2} hint="zero manual entry" icon={FileText} />
        <StatCard label="Extraction Accuracy" value="99.6%" hint="multimodal LLM" icon={CheckCircle2} />
        <StatCard label="Straight-Through %" value="92.4%" delta={3.8} hint="no human touch" icon={Sparkles} />
        <StatCard label="Active OCR Parsers" value="12 Schema" hint="custom steel formats" icon={FileCheck} />
      </div>

      <Panel title="Active Document Intelligence Parsers & Extraction Performance" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFFFFF]">
              <TableHead className="font-bold text-[#0F172A]">Document Category</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Processed Volume</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Extraction Accuracy</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Straight-Through Auto %</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Sample Extracted File</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Parser Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docCategories.map((d) => (
              <TableRow key={d.docType} className="hover:bg-[#FFFFFF]">
                <TableCell className="font-bold text-xs text-[#0F172A]">{d.docType}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{d.count.toLocaleString()}</TableCell>
                <TableCell className="text-xs font-bold text-[#E05600]">{d.accuracy}</TableCell>
                <TableCell className="w-36">
                  <div className="flex items-center gap-2">
                    <Meter value={d.autoStraight} tone="success" />
                    <span className="text-[10px] font-bold text-[#475569]">{d.autoStraight}%</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#475569]">{d.sampleFile}</TableCell>
                <TableCell><Pill tone="success">{d.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
