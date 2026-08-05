import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Truck,
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

export const Route = createFileRoute("/logistics")({
  head: () => ({
    meta: [
      { title: "Logistics & Dispatch Operating System · Steel AI Command Center" },
      { name: "description", content: "Railway rake loading, truck convoy tracking, freight cost optimization, and port dispatches." },
    ],
  }),
  component: Page,
});

const logisticsDispatchData = [
  { rakeId: "RAKE-NDLS-04", destination: "Delhi Freight Terminal", wagons: 59, netTonnage: "3,540 MT", status: "Dispatched", eta: "14 hrs" },
  { rakeId: "TRK-FLEET-88", destination: "Mumbai Port Yard", wagons: 18, netTonnage: "720 MT", status: "Loading", eta: "22 hrs" },
  { rakeId: "RAKE-HALD-12", destination: "Haldia Export Dock", wagons: 58, netTonnage: "3,480 MT", status: "Customs Cleared", eta: "6 hrs" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Manufacturing"
        title="Logistics & Railway Rake Dispatch"
        description="Railway rake freight tracking, export convoy clearance, demurrage minimization, and truck fleet logistics."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Dispatched Today" value="7,740 MT" delta={12.4} hint="rail + road fleet" icon={Truck} />
        <StatCard label="Active Railway Rakes" value="12 Rakes" hint="59 wagons per rake" icon={Navigation} />
        <StatCard label="Demurrage Savings" value="₹24 Lakhs" delta={18.2} hint="zero turnaround delay" icon={CheckCircle2} />
        <StatCard label="On-Time Delivery" value="98.4%" delta={1.2} hint="sub-24h regional SLA" icon={Clock} />
      </div>

      <Panel title="Active Dispatch Railway Rakes & Export Convoys" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Rake / Fleet ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Destination Terminal</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Wagon Count</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Net Tonnage</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Clearance Status</TableHead>
              <TableHead className="font-bold text-[#0F172A]">ETA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logisticsDispatchData.map((log) => (
              <TableRow key={log.rakeId} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{log.rakeId}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{log.destination}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{log.wagons}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{log.netTonnage}</TableCell>
                <TableCell><Pill tone={statusTone(log.status)}>{log.status}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#475569]">{log.eta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
