import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  CheckCircle2,
  Package,
  Sparkles,
  Warehouse,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
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
      { title: "Inventory & Stockyard Master · Steel AI Command Center" },
      { name: "description", content: "Finished steel coils, billets, scrap yard buffers, and AI replenishment." },
    ],
  }),
  component: Page,
});

const inventoryStockData = [
  { location: "Bay B-4", category: "Hot Rolled Coils", tonnage: "4,250 MT", grade: "IS 2062 E250", status: "Available", aiRec: "Dispatch to Pipe Mill" },
  { location: "Bay C-1", category: "Continuous Cast Billets (150x150)", tonnage: "2,840 MT", grade: "Fe 550D TMT", status: "Allocated", aiRec: "Feed Bar Mill 2" },
  { location: "Yard S-2", category: "Heavy Melting Scrap HMS 1/2", tonnage: "1,850 MT", grade: "Heavy Scrap", status: "Low Stock", aiRec: "Trigger Reorder (RC-11)" },
  { location: "Bay A-3", category: "Ferro Silicon (FeSi 75%)", tonnage: "340 MT", grade: "Alloy Additive", status: "Sufficient", aiRec: "Optimal Buffer Level" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Manufacturing"
        title="Inventory & Stockyard Operating System"
        description="Finished steel stockyards, raw scrap buffers, ferro-alloy storage, and automated reorder triggers."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Stock Tonnage" value="18,450 MT" delta={4.8} hint="across 6 bays" icon={Warehouse} />
        <StatCard label="Finished Steel Coils" value="9,200 MT" hint="ready for dispatch" icon={Boxes} />
        <StatCard label="Scrap Yard Buffer" value="5,800 MT" hint="12 days EAF melt supply" icon={Package} />
        <StatCard label="Stock Accuracy" value="99.8%" delta={0.4} hint="barcode & RFID verified" icon={CheckCircle2} />
      </div>

      <Panel title="Stockyard Bay Locations & Raw Material Buffers" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFFFFF]">
              <TableHead className="font-bold text-[#0F172A]">Bay / Yard Location</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Category</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Current Tonnage</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Grade Specification</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Buffer Status</TableHead>
              <TableHead className="font-bold text-[#0F172A]">AI Logistics Guidance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryStockData.map((inv) => (
              <TableRow key={inv.location} className="hover:bg-[#FFFFFF]">
                <TableCell className="font-bold text-xs text-[#E05600]">{inv.location}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{inv.category}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{inv.tonnage}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{inv.grade}</TableCell>
                <TableCell><Pill tone={statusTone(inv.status)}>{inv.status}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#B87514]">{inv.aiRec}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
