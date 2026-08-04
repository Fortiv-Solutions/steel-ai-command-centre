import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  FileText,
  ShoppingBag,
  Users,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import { BarSeries } from "@/components/charts";
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
      { title: "Vendor & Procurement OS · Steel AI Command Center" },
      { name: "description", content: "Vendor scorecards, rate contracts, raw material bidding, and delivery SLA." },
    ],
  }),
  component: Page,
});

const vendorScorecards = [
  { vendor: "Jindal Refractories Ltd", category: "Refractory Bricks", rating: 4.9, slaDelivery: "99.4%", qualityPass: "100%", activeContract: "RC-2026-04" },
  { vendor: "ScrapCorp International", category: "HMS 1/2 Scrap", rating: 4.6, slaDelivery: "96.2%", qualityPass: "98.4%", activeContract: "RC-2026-11" },
  { vendor: "FerroAlloys India Ltd", category: "Ferro Manganese", rating: 4.8, slaDelivery: "98.8%", qualityPass: "99.2%", activeContract: "RC-2026-08" },
  { vendor: "Global Electrode Corp", category: "Graphite Electrodes", rating: 4.7, slaDelivery: "97.5%", qualityPass: "99.0%", activeContract: "RC-2026-14" },
];

const vendorQualityData = [
  { month: "Jindal Refractories", quality: 100, delivery: 99 },
  { month: "ScrapCorp", quality: 98, delivery: 96 },
  { month: "FerroAlloys India", quality: 99, delivery: 98 },
  { month: "Global Electrode", quality: 99, delivery: 97 },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Business"
        title="Vendor & Procurement Operating System"
        description="Raw material vendor rating scorecards, active rate contracts, delivery SLA tracking, and scrap bidding."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Vendors" value="142 Suppliers" hint="raw material & spares" icon={Users} />
        <StatCard label="Rate Contracts" value="38 Agreements" hint="price protected" icon={FileText} />
        <StatCard label="On-Time Delivery SLA" value="98.4%" delta={2.1} hint="contractual SLA" icon={CheckCircle2} />
        <StatCard label="Quality Pass Rate" value="99.2%" delta={0.6} hint="zero batch rejects" icon={Award} />
      </div>

      <Panel title="Vendor Performance Scorecard & Active Rate Contracts" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Vendor / Supplier Name</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Material Category</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Rating Score</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Delivery SLA %</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Quality Pass Rate</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Active Rate Contract</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorScorecards.map((v) => (
              <TableRow key={v.vendor} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-bold text-xs text-[#1A1D20]">{v.vendor}</TableCell>
                <TableCell className="text-xs font-bold text-[#4A5059]">{v.category}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#D95A00]">{v.rating} / 5.0</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{v.slaDelivery}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#B87514]">{v.qualityPass}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#4A5059]">{v.activeContract}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>

      <Panel title="Key Raw Material Supplier Quality vs Delivery Performance (%)">
        <BarSeries data={vendorQualityData} x="month" series={[{ key: "quality", label: "Quality Acceptance %" }, { key: "delivery", label: "Delivery SLA %" }]} height={220} />
      </Panel>
    </div>
  );
}
