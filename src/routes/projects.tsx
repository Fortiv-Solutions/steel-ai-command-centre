import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  FolderKanban,
  Plus,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Meter, PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
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
      { title: "Programme & Project Delivery · Steel AI Command Center" },
      { name: "description", content: "Plant transformation projects, AI rollouts, and roadmaps." },
    ],
  }),
  component: Page,
});

type ProjectItem = {
  id: string;
  title: string;
  facility: string;
  owner: string;
  phase: string;
  progress: number;
  budget: string;
  benefits: string;
  status: "In Build" | "Piloting" | "Live" | "Planned";
};

const projectInitiatives: ProjectItem[] = [
  { id: "PRJ-101", title: "EAF Melt Shop Oxygen Injection AI Optimization", facility: "Melt Shop 1", owner: "Dr. R. Sharma", phase: "Phase 2: Intelligence", progress: 85, budget: "₹1.4 Cr", benefits: "₹4.8 Cr / yr", status: "In Build" },
  { id: "PRJ-102", title: "Scrap Yard Stockyard Inventory AI Vision System", facility: "Raw Material Yard", owner: "V. Kumar", phase: "Phase 2: Intelligence", progress: 92, budget: "₹85 L", benefits: "₹2.1 Cr / yr", status: "Piloting" },
  { id: "PRJ-103", title: "Mill Test Certificate (MTC) Auto-Verification Pipeline", facility: "Quality Lab", owner: "P. Nair", phase: "Phase 1: Foundation", progress: 100, budget: "₹40 L", benefits: "₹1.8 Cr / yr", status: "Live" },
  { id: "PRJ-104", title: "Bar & TMT Mill Reheating Furnace Fuel Efficiency", facility: "Rolling Mill 2", owner: "S. Singh", phase: "Phase 3: Autonomous", progress: 45, budget: "₹2.2 Cr", benefits: "₹6.4 Cr / yr", status: "In Build" },
  { id: "PRJ-105", title: "SAP S/4HANA Accounts Payable Automation Agent", facility: "Corporate HQ", owner: "A. Patel", phase: "Phase 1: Foundation", progress: 100, budget: "₹60 L", benefits: "₹3.2 Cr / yr", status: "Live" },
];

function Page() {
  const [filter, setFilter] = useState("All");

  const filtered = projectInitiatives.filter(
    (p) => filter === "All" || p.status === filter,
  );

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Programme & Project Delivery Workspace"
        description="Plant transformation projects, AI implementation roadmaps, and business benefit realization."
        actions={
          <Button size="sm">
            <Plus className="size-3.5" /> New Initiative
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Projects" value="46 Initiatives" delta={4} hint="across 5 plants" icon={FolderKanban} />
        <StatCard label="On Schedule Rate" value="82%" delta={5.2} hint="milestone tracking" icon={Clock} />
        <StatCard label="Phase 2 Progress" value="72%" delta={6.0} hint="Intelligence phase" icon={Rocket} />
        <StatCard label="Benefits Realised" value="₹31.4 Cr" delta={12.8} hint="annualised ROI" icon={TrendingUp} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#A6ACB6] bg-[#E4E8EE] p-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">Active Transformation Initiatives</h2>
        <div className="flex gap-1.5">
          {["All", "In Build", "Piloting", "Live", "Planned"].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filter === s ? "default" : "secondary"}
              onClick={() => setFilter(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#A6ACB6] bg-[#E4E8EE]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Project ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Initiative Name</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Plant Facility</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Project Lead</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Roadmap Phase</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Progress</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Annual Benefits</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{p.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{p.title}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{p.facility}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{p.owner}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{p.phase}</TableCell>
                <TableCell className="w-40">
                  <div className="flex items-center gap-2">
                    <Meter value={p.progress} tone={p.progress === 100 ? "success" : "primary"} />
                    <span className="text-[10px] font-bold text-[#4A5059]">{p.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#D95A00]">{p.benefits}</TableCell>
                <TableCell><Pill tone={statusTone(p.status)}>{p.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
