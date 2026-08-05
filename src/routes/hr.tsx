import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  Clock,
  UserCheck,
  UserCog,
  Users,
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

export const Route = createFileRoute("/hr")({
  head: () => ({
    meta: [
      { title: "HR & Workforce Operating System · Steel AI Command Center" },
      { name: "description", content: "Plant shift rostering, safety training compliance, overtime tracking, and headcount analytics." },
    ],
  }),
  component: Page,
});

const shiftData = [
  { shift: "Shift A (06:00 - 14:00)", plant: "Melt Shop Unit 1", headcount: 142, attendance: "98.5%", safetyPass: "100%", overtimeHours: "12 hrs", status: "Active" },
  { shift: "Shift B (14:00 - 22:00)", plant: "Rolling Bar Mill 2", headcount: 185, attendance: "97.2%", safetyPass: "99.2%", overtimeHours: "18 hrs", status: "Active" },
  { shift: "Shift C (22:00 - 06:00)", plant: "Refractory & Maintenance", headcount: 96, attendance: "96.8%", safetyPass: "100%", overtimeHours: "24 hrs", status: "Active" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Business"
        title="HR & Workforce Operating System"
        description="Plant shift rosters, safety certification compliance, contractor workforce tracking, and headcount productivity."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Plant Headcount" value="4,250 FTE" hint="3 shifts operating" icon={Users} />
        <StatCard label="Shift Attendance" value="98.2%" delta={1.1} hint="zero unexcused absence" icon={UserCheck} />
        <StatCard label="Safety Training %" value="99.4%" hint="100% mandatory compliance" icon={Award} />
        <StatCard label="Overtime Hours" value="1,240 hrs/mo" delta={-14.2} hint="optimized shift balance" icon={Clock} />
      </div>

      <Panel title="Live Plant Shift Rostering & Safety Compliance" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Shift Schedule</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Plant Facility / Mill</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Headcount On-Duty</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Attendance Rate</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Safety Pass %</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Shift Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shiftData.map((s) => (
              <TableRow key={s.shift} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-bold text-xs text-[#0F172A]">{s.shift}</TableCell>
                <TableCell className="text-xs font-bold text-[#E05600]">{s.plant}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{s.headcount}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{s.attendance}</TableCell>
                <TableCell><Pill tone="success">{s.safetyPass}</Pill></TableCell>
                <TableCell><Pill tone="info">{s.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
