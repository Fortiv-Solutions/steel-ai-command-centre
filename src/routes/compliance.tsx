import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  FileCheck,
  Scale,
  ShieldAlert,
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

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance & Safety · Steel AI Command Center" },
      { name: "description", content: "ISO 9001/14001, environmental standards, and safety certifications." },
    ],
  }),
  component: Page,
});

const complianceStandards = [
  { code: "ISO 9001:2015", standard: "Quality Management System", coverage: "100%", lastAudit: "12 May 2026", certStatus: "Valid", authority: "BSI Group" },
  { code: "ISO 14001:2015", standard: "Environmental Management", coverage: "100%", lastAudit: "04 Jun 2026", certStatus: "Valid", authority: "TÜV NORD" },
  { code: "ISO 45001:2018", standard: "Occupational Health & Safety", coverage: "98.4%", lastAudit: "18 Jan 2026", certStatus: "Valid", authority: "Bureau Veritas" },
  { code: "CPCB SPM-30", standard: "Stack Emission < 30 mg/Nm³", coverage: "100%", lastAudit: "Continuous", certStatus: "Compliant", authority: "Pollution Control Board" },
  { code: "IS 2062:2011", standard: "Structural Steel Standard", coverage: "100%", lastAudit: "Monthly", certStatus: "BIS Certified", authority: "Bureau of Indian Standards" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Business"
        title="Regulatory & Environmental Compliance"
        description="ISO certifications, BIS standards, emissions monitoring, and legal compliance register."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="ISO Certifications" value="6 Active" hint="100% compliant" icon={Award} />
        <StatCard label="BIS Product Seals" value="14 Standards" hint="all grades verified" icon={FileCheck} />
        <StatCard label="Stack Emission SPM" value="12 mg/Nm³" hint="limit < 30 mg/Nm³" icon={Scale} />
        <StatCard label="Audit Readiness" value="99.4%" hint="zero non-conformities" icon={CheckCircle2} />
      </div>

      <Panel title="Active Compliance Standards & ISO Certifications" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFFFFF]">
              <TableHead className="font-bold text-[#0F172A]">Standard Code</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Standard Name</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Facility Coverage</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Last Audit Date</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Certifying Body</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Compliance Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {complianceStandards.map((c) => (
              <TableRow key={c.code} className="hover:bg-[#FFFFFF]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{c.code}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{c.standard}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{c.coverage}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{c.lastAudit}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{c.authority}</TableCell>
                <TableCell><Pill tone="success">{c.certStatus}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
