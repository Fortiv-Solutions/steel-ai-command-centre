import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Factory,
  FileCheck,
  FileText,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
import { BarSeries } from "@/components/charts";
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
      { title: "Production & Shop-Floor Documents · Steel AI Command Center" },
      { name: "description", content: "Production plans, shift logs, melting and rolling documentation, and yield reporting." },
    ],
  }),
  component: Page,
});

const productionDocs = [
  { id: "DOC-PRD-401", title: "Melt Shop Shift Log A - EAF Heat Output", shopUnit: "Melt Shop 1", shift: "Shift A", tonnage: "1,240 MT", adherence: 96, status: "Validated" },
  { id: "DOC-PRD-402", title: "Bar & TMT Rolling Mill 2 Daily Yield Report", shopUnit: "Rolling Mill 2", shift: "Shift A", tonnage: "1,850 MT", adherence: 94, status: "Validated" },
  { id: "DOC-PRD-403", title: "Continuous Caster 2 Strand Tonnage Record", shopUnit: "Concast Unit 2", shift: "Shift B", tonnage: "1,120 MT", adherence: 92, status: "Pending Review" },
  { id: "DOC-PRD-404", title: "Billet Reheating Furnace Fuel Consumption Log", shopUnit: "Reheating Furnace", shift: "Shift B", tonnage: "1,680 MT", adherence: 98, status: "Validated" },
];

const millProductionOutput = [
  { month: "Jan", meltOutput: 42000, rolledOutput: 39500 },
  { month: "Feb", meltOutput: 44500, rolledOutput: 41800 },
  { month: "Mar", meltOutput: 46800, rolledOutput: 44200 },
  { month: "Apr", meltOutput: 48200, rolledOutput: 45600 },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Production Documentation"
        title="Planning & Shop-Floor Documentation OS"
        description="Production plans, shift logs, melting and rolling documentation, yield reporting, and maintenance records."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Monthly Production Docs" value="41,200" delta={7.4} hint="digitized shop logs" icon={FileText} />
        <StatCard label="Plan Adherence" value="94.2%" delta={2.6} hint="production target" icon={CheckCircle2} />
        <StatCard label="Shift Log Automation" value="88%" delta={12.4} hint="straight-through" icon={FileCheck} />
        <StatCard label="Report Turnaround" value="9 mins" delta={-71.0} hint="instant processing" icon={Clock} />
      </div>

      <Panel title="Shop-Floor Production Log & Plan Adherence Register" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Doc ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Document Title</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Mill / Shop Unit</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Shift</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Shift Tonnage Output</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Plan Adherence %</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Validation Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productionDocs.map((p) => (
              <TableRow key={p.id} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{p.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{p.title}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{p.shopUnit}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{p.shift}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#D95A00]">{p.tonnage}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#B87514]">{p.adherence}%</TableCell>
                <TableCell><Pill tone={statusTone(p.status)}>{p.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>

      <Panel title="Liquid Melt Output vs Finished Rolled Steel Production Tonnage (MT)">
        <BarSeries data={millProductionOutput} x="month" series={[{ key: "meltOutput", label: "Melt Shop Liquid Tonnage" }, { key: "rolledOutput", label: "Finished Rolled Tonnage" }]} height={220} />
      </Panel>
    </div>
  );
}
