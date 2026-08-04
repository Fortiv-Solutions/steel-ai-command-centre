import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  Navigation,
  Ship,
  Truck,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
import { LineSeries } from "@/components/charts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/logistics")({
  head: () => ({
    meta: [
      { title: "Logistics & Freight OS · Steel AI Command Center" },
      { name: "description", content: "Railway rake allocation, truck dispatch, export shipping, and freight cost optimization." },
    ],
  }),
  component: Page,
});

const rakesData = [
  { rakeId: "RAKE-NDLS-04", destination: "Delhi Freight Terminal", wagons: 59, netTonnage: "3,540 MT", status: "Dispatched", eta: "14 hrs", costPerTon: "₹1,240 / MT" },
  { rakeId: "TRK-FLEET-88", destination: "Mumbai Port Yard", wagons: 18, netTonnage: "720 MT", status: "Loading", eta: "22 hrs", costPerTon: "₹1,850 / MT" },
  { rakeId: "RAKE-HALD-12", destination: "Haldia Export Dock", wagons: 58, netTonnage: "3,480 MT", status: "Customs Cleared", eta: "6 hrs", costPerTon: "₹980 / MT" },
];

const freightCostTrend = [
  { month: "Jan", railCost: 1180, roadCost: 1920 },
  { month: "Feb", railCost: 1150, roadCost: 1890 },
  { month: "Mar", railCost: 1120, roadCost: 1850 },
  { month: "Apr", railCost: 1090, roadCost: 1820 },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Manufacturing"
        title="Logistics & Dispatch Operating System"
        description="Railway rake allocation, truck convoy fleet management, export shipping port clearance, and freight optimization."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Dispatched Tonnage 30d" value="142,800 MT" delta={8.4} hint="rail & road" icon={Truck} />
        <StatCard label="Active Rakes" value="12 Rakes" hint="59 wagons each" icon={Navigation} />
        <StatCard label="Export Shipping" value="22,000 MT" hint="Haldia Port" icon={Ship} />
        <StatCard label="Avg Transit Time" value="18.2 hrs" delta={-6.4} hint="route optimized" icon={Clock} />
      </div>

      <Panel title="Active Railway Rakes & Export Truck Convoy Status" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Rake / Fleet ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Destination Terminal</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Wagon / Vehicle Count</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Net Tonnage</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Freight Cost / Tonne</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Clearance Status</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">ETA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rakesData.map((log) => (
              <TableRow key={log.rakeId} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{log.rakeId}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{log.destination}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{log.wagons}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{log.netTonnage}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#D95A00]">{log.costPerTon}</TableCell>
                <TableCell><Pill tone={statusTone(log.status)}>{log.status}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#4A5059]">{log.eta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>

      <Panel title="Freight Cost Per Tonne Optimization (Railway Freight vs Road Fleet ₹ / MT)">
        <LineSeries data={freightCostTrend} x="month" series={[{ key: "railCost", label: "Railway Freight ₹/MT" }, { key: "roadCost", label: "Road Transport ₹/MT" }]} height={220} />
      </Panel>
    </div>
  );
}
