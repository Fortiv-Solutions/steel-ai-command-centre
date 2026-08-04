import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  BadgeCheck,
  CheckCircle2,
  FileCheck,
  Search,
  ShieldCheck,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import { BarSeries } from "@/components/charts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/quality")({
  head: () => ({
    meta: [
      { title: "Quality Control & NDT · Steel AI Command Center" },
      { name: "description", content: "Ultrasonic NDT inspection, chemical spectrometer scans, and RCA defect analysis." },
    ],
  }),
  component: Page,
});

const qualityScans = [
  { batchId: "COIL-C9041", testType: "UT Ultrasonic Scan", grade: "304L Stainless", defectDepth: "0.00 mm", result: "Pass - Zero Defects", inspector: "P. Nair" },
  { batchId: "BAR-B4922", testType: "Tensile Yield Test", grade: "Fe 550D TMT", defectDepth: "N/A", result: "Pass - 575 MPa", inspector: "Dr. R. Sharma" },
  { batchId: "ROD-R1008", testType: "Spectro Scan (O2/N2)", grade: "SAE 1008 Rod", defectDepth: "N/A", result: "Pass - O2 12ppm", inspector: "K. Das" },
  { batchId: "BEAM-BM2062", testType: "Surface Camera Vision", grade: "IS 2062 Beam", defectDepth: "0.12 mm", result: "Minor Surface Scale", inspector: "AI Vision" },
];

const defectTrend = [
  { month: "Jan", firstTimeRight: 98.2, defectRate: 1.8 },
  { month: "Feb", firstTimeRight: 98.6, defectRate: 1.4 },
  { month: "Mar", firstTimeRight: 99.1, defectRate: 0.9 },
  { month: "Apr", firstTimeRight: 99.4, defectRate: 0.6 },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Quality Control & NDT Inspection OS"
        description="Ultrasonic non-destructive testing (NDT), spectrometer chemical scans, surface vision AI, and Root Cause Analysis."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="First Time Right (FTR)" value="99.4%" delta={0.6} hint="target >99.0%" icon={BadgeCheck} />
        <StatCard label="UT Scans Conducted" value="1,420" hint="100% verified" icon={ShieldCheck} />
        <StatCard label="Defect Rate" value="0.6%" delta={-0.3} hint="historical low" icon={CheckCircle2} />
        <StatCard label="Spectro Scans" value="284 Heats" hint="chemical accuracy" icon={Activity} />
      </div>

      <Panel title="Live Ultrasonic NDT & Chemical Spectrometer Inspection Log" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Batch / Coil ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Inspection Test Type</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Steel Grade</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Defect Depth / Value</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Certified Result</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Quality Inspector</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualityScans.map((q) => (
              <TableRow key={q.batchId} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{q.batchId}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{q.testType}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{q.grade}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#4A5059]">{q.defectDepth}</TableCell>
                <TableCell><Pill tone="success">{q.result}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#4A5059]">{q.inspector}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>

      <Panel title="First Time Right (FTR %) Quality Yield vs Surface Defect Rate (%)">
        <BarSeries data={defectTrend} x="month" series={[{ key: "firstTimeRight", label: "First Time Right %" }, { key: "defectRate", label: "Defect Rate %" }]} height={220} />
      </Panel>
    </div>
  );
}
