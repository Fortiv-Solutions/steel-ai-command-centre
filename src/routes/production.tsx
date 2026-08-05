import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle2,
  Factory,
  FileText,
  Sliders,
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

export const Route = createFileRoute("/production")({
  head: () => ({
    meta: [
      { title: "Production Documents & Schedules · Steel AI Command Center" },
      { name: "description", content: "Daily melt shop schedules, rolling mill campaigns, and shift production logs." },
    ],
  }),
  component: Page,
});

const productionSchedules = [
  { docNo: "PROD-SCH-2026-081", mill: "Bar Mill Unit 2", targetTonnage: "1,250 MT", grade: "Fe 550D TMT (16mm)", shift: "Shift A & B", status: "In Progress" },
  { docNo: "PROD-SCH-2026-082", mill: "Hot Strip Mill 1", targetTonnage: "2,400 MT", grade: "304L HR Coil (4mm)", shift: "Shift A", status: "Scheduled" },
  { docNo: "PROD-SCH-2026-083", mill: "Wire Rod Mill", targetTonnage: "850 MT", grade: "SAE 1008 Rod (5.5mm)", shift: "Shift C", status: "Completed" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Manufacturing"
        title="Production Documents & Rolling Campaigns"
        description="Daily melt shop heat plans, rolling mill campaign schedules, billet sizing, and shift production logs."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Daily Target Tonnage" value="4,500 MT" delta={2.4} hint="vs capacity 4,600 MT" icon={Factory} />
        <StatCard label="Rolling Mill Utilization" value="94.2%" hint="OEE benchmark 92%" icon={Activity} />
        <StatCard label="Campaign Accuracy" value="99.6%" hint="zero roll change delay" icon={CheckCircle2} />
        <StatCard label="Shift Logs Filed" value="100% Digital" hint="instant ERP sync" icon={FileText} />
      </div>

      <Panel title="Active Production Campaign Schedules & Shift Work Orders" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Document No</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Mill / Unit</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Target Tonnage</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Grade & Section</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Assigned Shift</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Execution Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productionSchedules.map((p) => (
              <TableRow key={p.docNo} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{p.docNo}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{p.mill}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{p.targetTonnage}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{p.grade}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{p.shift}</TableCell>
                <TableCell><Pill tone="info">{p.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
