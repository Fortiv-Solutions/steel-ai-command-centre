import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  FileCheck,
  FileText,
  ScrollText,
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

export const Route = createFileRoute("/mtc")({
  head: () => ({
    meta: [
      { title: "Mill Test Certificates · Steel AI Command Center" },
      { name: "description", content: "MTC auto-generation, customer spec matching, and digital certificate verification." },
    ],
  }),
  component: Page,
});

const mtcRecords = [
  { certNo: "MTC-2026-8891", heat: "H-4921", customer: "Tata Projects", grade: "304L HR Plate", yieldMPa: 345, tensileMPa: 590, elong: "42%", aiAudit: "100% Match Spec" },
  { certNo: "MTC-2026-8892", heat: "H-4922", customer: "L&T Construction", grade: "Fe 550D TMT Bar", yieldMPa: 575, tensileMPa: 660, elong: "18%", aiAudit: "Auto-Signed" },
  { certNo: "MTC-2026-8893", heat: "H-4923", customer: "Precision Wires Corp", grade: "SAE 1008 Rod", yieldMPa: 310, tensileMPa: 440, elong: "38%", aiAudit: "Verified" },
  { certNo: "MTC-2026-8894", heat: "H-4924", customer: "Jindal Infra", grade: "IS 2062 Beam", yieldMPa: 280, tensileMPa: 450, elong: "26%", aiAudit: "Verified" },
];

const tensileDistributionData = [
  { month: "Fe 550D", yieldStrength: 575, tensileStrength: 660 },
  { month: "304L HR", yieldStrength: 345, tensileStrength: 590 },
  { month: "SAE 1008", yieldStrength: 310, tensileStrength: 440 },
  { month: "IS 2062", yieldStrength: 280, tensileStrength: 450 },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Steel Intelligence"
        title="Mill Test Certificates (MTC)"
        description="Digital MTC generation, tensile test mechanical verification, and auto-signing for customer dispatch."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MTCs Issued (90d)" value="4,820" delta={12.4} hint="100% digital" icon={ScrollText} />
        <StatCard label="Auto-Signed Rate" value="98.2%" delta={3.1} hint="AI spec matching" icon={FileCheck} />
        <StatCard label="Customer Acceptance" value="100%" hint="zero rejections" icon={CheckCircle2} />
        <StatCard label="Verification Time" value="1.2 sec" hint="instant PDF seal" icon={Award} />
      </div>

      <Panel title="Verified Mill Test Certificate Register" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Certificate No</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Heat #</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Customer Entity</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Grade & Product</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Yield (MPa)</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Tensile (MPa)</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Elongation</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">AI Audit Seal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mtcRecords.map((m) => (
              <TableRow key={m.certNo} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{m.certNo}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{m.heat}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{m.customer}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{m.grade}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{m.yieldMPa}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{m.tensileMPa}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{m.elong}</TableCell>
                <TableCell><Pill tone="success">{m.aiAudit}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>

      <Panel title="Mechanical Property Distribution (Yield Strength vs Tensile Strength MPa)">
        <BarSeries data={tensileDistributionData} x="month" series={[{ key: "yieldStrength", label: "Yield Strength (MPa)" }, { key: "tensileStrength", label: "Tensile Strength (MPa)" }]} height={220} />
      </Panel>
    </div>
  );
}
