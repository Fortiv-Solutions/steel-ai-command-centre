import { createFileRoute } from "@tanstack/react-router";
import {
  Box,
  CheckCircle2,
  Layers,
  Package,
  Warehouse,
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

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory & Stockyard · Steel AI Command Center" },
      { name: "description", content: "Finished steel coils, billets, scrap yard inventory, and reorder triggers." },
    ],
  }),
  component: Page,
});

const stockyardBays = [
  { location: "Bay B-4", category: "HR Coils (Hot Rolled)", tonnage: 4250, maxCap: 5000, grade: "IS 2062 E250", status: "Available", aiRec: "Dispatch to Pipe Mill" },
  { location: "Bay C-1", category: "Billets (150x150)", tonnage: 2840, maxCap: 3500, grade: "Fe 550D TMT", status: "Allocated", aiRec: "Feed Bar Mill 2" },
  { location: "Yard S-2", category: "Heavy Melting Scrap 1/2", tonnage: 1850, maxCap: 4000, grade: "Heavy Scrap", status: "Low Stock", aiRec: "Trigger Reorder" },
  { location: "Bay A-3", category: "Ferro Silicon 75%", tonnage: 340, maxCap: 500, grade: "FeSi Alloy", status: "Sufficient", aiRec: "Optimal Buffer" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Manufacturing"
        title="Stockyard & Inventory Operating System"
        description="Finished steel coils, billets, scrap yard inventory, and automated reorder triggers."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Inventory" value="9,280 MT" delta={4.2} hint="across 4 bays" icon={Warehouse} />
        <StatCard label="HR Coils Stock" value="4,250 MT" hint="85% bay capacity" icon={Box} />
        <StatCard label="Billet Stock" value="2,840 MT" hint="ready for rolling" icon={Layers} />
        <StatCard label="Yard Turnover" value="4.2 days" delta={-12.1} hint="fast dispatch" icon={Package} />
      </div>

      <Panel title="Stockyard Bay Capacity & Tonnage Allocation" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Bay / Yard</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Material Category</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Tonnage Stock</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Grade Specification</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Capacity Utilization</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Status</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">AI Yard Recommendation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockyardBays.map((inv) => {
              const util = Math.round((inv.tonnage / inv.maxCap) * 100);
              return (
                <TableRow key={inv.location} className="hover:bg-[#C8D0DC]">
                  <TableCell className="font-bold text-xs text-[#D95A00]">{inv.location}</TableCell>
                  <TableCell className="text-xs font-bold text-[#1A1D20]">{inv.category}</TableCell>
                  <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{inv.tonnage.toLocaleString()} MT</TableCell>
                  <TableCell className="text-xs font-bold text-[#1A1D20]">{inv.grade}</TableCell>
                  <TableCell className="w-44">
                    <div className="flex items-center gap-2">
                      <Meter value={util} tone={util > 80 ? "primary" : "warning"} />
                      <span className="text-[10px] font-bold text-[#4A5059]">{util}%</span>
                    </div>
                  </TableCell>
                  <TableCell><Pill tone={statusTone(inv.status)}>{inv.status}</Pill></TableCell>
                  <TableCell className="text-xs font-bold text-[#B87514]">{inv.aiRec}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
