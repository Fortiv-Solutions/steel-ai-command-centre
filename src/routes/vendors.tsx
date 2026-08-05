import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  Package,
  ShoppingBag,
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

export const Route = createFileRoute("/vendors")({
  head: () => ({
    meta: [
      { title: "Vendors & Procurement · Steel AI Command Center" },
      { name: "description", content: "Scrap suppliers, refractory vendors, ferro-alloy rate contracts, and SLA scorecards." },
    ],
  }),
  component: Page,
});

const vendorPerformanceData = [
  { vendor: "Jindal Refractories Ltd", category: "Refractory Bricks & Mass", rating: 4.9, slaDelivery: "99.4%", qualityPass: "100%", activeContract: "RC-2026-04" },
  { vendor: "ScrapCorp International", category: "HMS 1/2 Heavy Scrap", rating: 4.6, slaDelivery: "96.2%", qualityPass: "98.4%", activeContract: "RC-2026-11" },
  { vendor: "FerroAlloys India Ltd", category: "Ferro Manganese (FeMn 75)", rating: 4.8, slaDelivery: "98.8%", qualityPass: "99.2%", activeContract: "RC-2026-08" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Business"
        title="Vendors & Procurement Operating System"
        description="Raw material scrap suppliers, ferro-alloy rate contracts, delivery SLA scorecards, and quality pass rates."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Rate Contracts" value="142 Contracts" hint="annual commitments" icon={ShoppingBag} />
        <StatCard label="Scrap Suppliers" value="38 Vendors" hint="HMS 1/2 certified" icon={Users} />
        <StatCard label="Delivery SLA Compliance" value="98.4%" delta={1.4} hint="zero mill stoppage" icon={CheckCircle2} />
        <StatCard label="Quality Pass Rate" value="99.2%" delta={0.8} hint="spectro certified" icon={Award} />
      </div>

      <Panel title="Raw Material Supplier Quality & Delivery SLA Scorecards" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Vendor Entity Name</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Supply Category</TableHead>
              <TableHead className="font-bold text-[#0F172A]">SLA Rating</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Delivery SLA %</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Quality Pass %</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Active Rate Contract</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorPerformanceData.map((v) => (
              <TableRow key={v.vendor} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-bold text-xs text-[#0F172A]">{v.vendor}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{v.category}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#E05600]">{v.rating} / 5.0</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{v.slaDelivery}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#B87514]">{v.qualityPass}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#475569]">{v.activeContract}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
