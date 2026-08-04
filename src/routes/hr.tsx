import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  Clock,
  UserCheck,
  Users,
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

export const Route = createFileRoute("/hr")({
  head: () => ({
    meta: [
      { title: "HR & Workforce OS · Steel AI Command Center" },
      { name: "description", content: "Shift manning, operator certifications, safety training, and attendance." },
    ],
  }),
  component: Page,
});

const shiftRoster = [
  { shift: "Shift A (06:00 - 14:00)", plantArea: "EAF Melt Shop 1", operators: 42, reqManning: 42, certRate: "100%", status: "Fully Manned" },
  { shift: "Shift A (06:00 - 14:00)", plantArea: "Bar & TMT Mill 2", operators: 58, reqManning: 60, certRate: "98.2%", status: "Optimal" },
  { shift: "Shift B (14:00 - 22:00)", plantArea: "Continuous Caster 2", operators: 36, reqManning: 36, certRate: "100%", status: "Fully Manned" },
  { shift: "Shift B (14:00 - 22:00)", plantArea: "Stockyard & Dispatch", operators: 28, reqManning: 30, certRate: "96.5%", status: "Optimal" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Business"
        title="HR & Workforce Operating System"
        description="Shift manning levels, crane & EAF operator certifications, contract labor compliance, and safety training logs."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Workforce" value="3,842 Staff" hint="permanent & contract" icon={Users} />
        <StatCard label="Shift Manning Rate" value="98.6%" delta={1.2} hint="optimal shift allocation" icon={UserCheck} />
        <StatCard label="Operator Certifications" value="98.2%" hint="crane & ladle qualified" icon={Award} />
        <StatCard label="Safety Training Log" value="100%" hint="toolbox talks completed" icon={CheckCircle2} />
      </div>

      <Panel title="Live Shift Manning Level & Plant Area Allocation" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Shift Schedule</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Plant Facility / Mill</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Active Operators</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Required Manning</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Certified Operator %</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Manning Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shiftRoster.map((s, idx) => (
              <TableRow key={idx} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-bold text-xs text-[#D95A00]">{s.shift}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{s.plantArea}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{s.operators}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#4A5059]">{s.reqManning}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#B87514]">{s.certRate}</TableCell>
                <TableCell><Pill tone="success">{s.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
