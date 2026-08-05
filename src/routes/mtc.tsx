import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  FileCheck,
  FileText,
  ScrollText,
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

export const Route = createFileRoute("/mtc")({
  head: () => ({
    meta: [
      { title: "Mill Test Certificates (MTC) · Steel AI Command Center" },
      { name: "description", content: "Automated generation, digital signing, and chemical/tensile verification for MTCs." },
    ],
  }),
  component: Page,
});

const mtcCertificatesData = [
  { certNo: "MTC-2026-8891", heat: "H-4921", customer: "Tata Projects", grade: "304L HR Plate", yieldMPa: 345, tensileMPa: 590, elong: "42%", aiAudit: "100% Match Spec" },
  { certNo: "MTC-2026-8892", heat: "H-4922", customer: "L&T Construction", grade: "Fe 550D TMT Bar", yieldMPa: 575, tensileMPa: 660, elong: "18%", aiAudit: "Auto-Signed" },
  { certNo: "MTC-2026-8893", heat: "H-4923", customer: "Precision Wires Corp", grade: "SAE 1008 Rod", yieldMPa: 310, tensileMPa: 440, elong: "38%", aiAudit: "Verified" },
  { certNo: "MTC-2026-8894", heat: "H-4924", customer: "Jindal Infra", grade: "IS 2062 Beam", yieldMPa: 280, tensileMPa: 450, elong: "26%", aiAudit: "Verified" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Manufacturing"
        title="Mill Test Certificates (MTC) & Quality Register"
        description="Automated chemical spectro verification, tensile test validation, and tamper-proof digital signing of EN 10204 / 3.1 MTCs."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MTCs Issued (30d)" value="14,800 Certs" delta={8.4} hint="100% digital signed" icon={ScrollText} />
        <StatCard label="Auto Audit Match" value="99.94%" hint="zero spec mismatch" icon={CheckCircle2} />
        <StatCard label="Avg Issuance Time" value="42 seconds" delta={-35.0} hint="instant dispatch" icon={FileCheck} />
        <StatCard label="Customer Complaints" value="0 MTC Rejects" hint="zero defect quality" icon={Award} />
      </div>

      <Panel title="Verified Mill Test Certificates (Trailing 90 Days)" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFFFFF]">
              <TableHead className="font-bold text-[#0F172A]">Cert No</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Heat #</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Customer Entity</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Grade & Spec</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Yield (MPa)</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Tensile (MPa)</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Elongation</TableHead>
              <TableHead className="font-bold text-[#0F172A]">AI Audit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mtcCertificatesData.map((m) => (
              <TableRow key={m.certNo} className="hover:bg-[#FFFFFF]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{m.certNo}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{m.heat}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{m.customer}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{m.grade}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{m.yieldMPa}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{m.tensileMPa}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{m.elong}</TableCell>
                <TableCell><Pill tone="success">{m.aiAudit}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
