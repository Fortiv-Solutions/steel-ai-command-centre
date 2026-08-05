import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  Clock,
  FolderKanban,
  Zap,
} from "lucide-react";
import { Meter, PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Plant Projects & Capital Expansion · Steel AI Command Center" },
      { name: "description", content: "Capex projects, furnace debottlenecking, solar installation, and mill upgrades." },
    ],
  }),
  component: Page,
});

const plantProjects = [
  { id: "PRJ-2026-01", name: "EAF Unit 3 Oxygen Injection System Upgrade", budget: "₹18.5 Cr", spent: "₹14.2 Cr", progress: 78, lead: "Dr. Rajesh Sharma", status: "In Progress" },
  { id: "PRJ-2026-02", name: "Bar Mill 2 Flying Shear Automation & AI Cobble Sensor", budget: "₹4.2 Cr", spent: "₹4.2 Cr", progress: 100, lead: "Sunil Singh", status: "Completed" },
  { id: "PRJ-2026-03", name: "15 MW Roof Solar PV Plant Installation", budget: "₹35.0 Cr", spent: "₹12.0 Cr", progress: 35, lead: "Vikas Gupta", status: "In Progress" },
  { id: "PRJ-2026-04", name: "Slag Recycling & Zero-Waste Processing Facility", budget: "₹8.0 Cr", spent: "₹1.5 Cr", progress: 20, lead: "Ananya Patel", status: "In Progress" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Plant Projects & Capex Expansion Workspace"
        description="Debottlenecking projects, furnace automation, renewable energy integration, and capital expenditure tracking."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Capex Projects" value="12 Projects" hint="₹65.7 Cr allocated" icon={FolderKanban} />
        <StatCard label="Budget Variance" value="-2.4%" delta={-2.4} hint="under budget" icon={CheckCircle2} />
        <StatCard label="On-Time Delivery" value="94.2%" delta={4.1} hint="milestone tracking" icon={Clock} />
        <StatCard label="Completed 2026" value="8 Milestones" hint="fully commissioned" icon={Zap} />
      </div>

      <Panel title="Capital Expenditure Projects & Commissioning Milestones" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Project ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Project Name & Scope</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Capex Budget</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Spent to Date</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Milestone Progress</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Project Lead</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plantProjects.map((p) => (
              <TableRow key={p.id} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{p.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{p.name}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{p.budget}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#475569]">{p.spent}</TableCell>
                <TableCell className="w-36">
                  <div className="flex items-center gap-2">
                    <Meter value={p.progress} tone={p.progress === 100 ? "success" : "primary"} />
                    <span className="text-[10px] font-bold text-[#475569]">{p.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{p.lead}</TableCell>
                <TableCell><Pill tone={statusTone(p.status)}>{p.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
