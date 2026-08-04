import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  FileCheck,
  FileSearch,
  FileText,
  Search,
} from "lucide-react";
import { Meter, PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
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
      { name: "description", content: "Automated OCR extraction for Mill Test Certificates, Invoices, Purchase Orders, and Lab Reports." },
    ],
  }),
  component: Page,
});

const documentTypes = [
  { docType: "Mill Test Certificates (MTC)", count: 4820, accuracy: "99.8%", autoStraight: 94, sampleFile: "MTC-2026-8891.pdf" },
  { docType: "Scrap Purchase Orders & Invoices", count: 1240, accuracy: "99.4%", autoStraight: 88, sampleFile: "PO-SCRAP-492.pdf" },
  { docType: "Chemical Lab Spectrometry Reports", count: 3120, accuracy: "100%", autoStraight: 98, sampleFile: "LAB-SPECTRO-991.pdf" },
  { docType: "Railway Rake Freight Waybills", count: 850, accuracy: "98.8%", autoStraight: 91, sampleFile: "RAKE-WAYBILL-04.pdf" },
  { docType: "Customs Export Shipping Bills", count: 420, accuracy: "99.2%", autoStraight: 86, sampleFile: "CUSTOMS-EXP-12.pdf" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Knowledge"
        title="Document Intelligence & OCR Library"
        description="Automated document extraction, OCR parsing, key-value mapping, and straight-through processing for mill documentation."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Processed Documents" value="10,450" delta={14.2} hint="trailing 30 days" icon={FileText} />
        <StatCard label="OCR Extraction Accuracy" value="99.4%" hint="zero keying errors" icon={FileCheck} />
        <StatCard label="Straight-Through Processing" value="92.4%" delta={4.1} hint="auto-verified" icon={CheckCircle2} />
        <StatCard label="Avg Parse Latency" value="480 ms" hint="per document" icon={FileSearch} />
      </div>

      <Panel title="Ingested Enterprise Document Types & OCR Extraction Quality" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Document Category</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Processed Volume</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Extraction Accuracy</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Straight-Through Auto %</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Sample Extracted File</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Parser Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documentTypes.map((d) => (
              <TableRow key={d.docType} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-bold text-xs text-[#1A1D20]">{d.docType}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{d.count.toLocaleString()}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#D95A00]">{d.accuracy}</TableCell>
                <TableCell className="w-44">
                  <div className="flex items-center gap-2">
                    <Meter value={d.autoStraight} tone="success" />
                    <span className="text-[10px] font-bold text-[#4A5059]">{d.autoStraight}%</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#4A5059]">{d.sampleFile}</TableCell>
                <TableCell><Pill tone="success">Active Parser</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
