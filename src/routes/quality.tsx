import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
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
      { title: "Quality Control & Spectrometry · Steel AI Command Center" },
      { name: "description", content: "First-Time Right %, spectro chemical analysis, tensile testing, and defect logging." },
    ],
  }),
  component: Page,
});

const qualityInspectionLogs = [
  { batchId: "B-8801", testType: "Optical Emission Spectrometry (OES)", grade: "304L Stainless", defectDepth: "Zero (Pass)", result: "Approved", inspector: "Quality AI Bot" },
  { batchId: "B-8802", testType: "Universal Tensile Test (UTM 1000kN)", grade: "Fe 550D TMT", defectDepth: "Yield 575 MPa", result: "Approved", inspector: "Lab Tech 04" },
  { batchId: "B-8803", testType: "Ultrasonic Flaw Inspection (UT)", grade: "IS 2062 Beam", defectDepth: "0.2mm Surface Micro", result: "Conditional Pass", inspector: "Quality AI Bot" },
  { batchId: "B-8804", testType: "X-Ray Fluorescence Analysis (XRF)", grade: "SAE 1008 Rod", defectDepth: "Zero (Pass)", result: "Approved", inspector: "Quality AI Bot" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Quality Assurance & Chemical Spectrometry"
        description="First-Time Right (FTR) manufacturing yield, chemical composition spectrometry, mechanical testing, and defect root-cause analysis."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="First-Time Right (FTR)" value="99.4%" delta={0.6} hint="target 99.0%" icon={BadgeCheck} />
        <StatCard label="Spectro Tests (30d)" value="12,450 Tests" hint="instant AI verification" icon={FileCheck} />
        <StatCard label="Defect Rate" value="0.08%" delta={-0.03} hint="sub-0.10% threshold" icon={CheckCircle2} />
        <StatCard label="MTC Auto-Sign" value="100% Passed" hint="zero customer rejects" icon={ShieldCheck} />
      </div>

      <Panel title="Recent Chemical Spectrometry & Mechanical Quality Logs" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Batch / Coil ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Inspection Test Type</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Steel Grade</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Defect Depth / Value</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Certified Result</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Quality Inspector</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qualityInspectionLogs.map((q) => (
              <TableRow key={q.batchId} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{q.batchId}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{q.testType}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{q.grade}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#475569]">{q.defectDepth}</TableCell>
                <TableCell><Pill tone={statusTone(q.result)}>{q.result}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#475569]">{q.inspector}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
