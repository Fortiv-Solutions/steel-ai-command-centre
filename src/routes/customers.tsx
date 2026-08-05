import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  CreditCard,
  Package,
  ShoppingBag,
  Users,
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

export const Route = createFileRoute("/customers")({
  head: () => ({
    meta: [
      { title: "Customers & Commercial Sales · Steel AI Command Center" },
      { name: "description", content: "Order backlog, credit limit management, sales contracts, and customer satisfaction." },
    ],
  }),
  component: Page,
});

const customerOrders = [
  { customer: "L&T Heavy Engineering", grade: "304L HR Plate", quantity: "12,400 MT", creditUtil: 68, limit: "₹25.0 Cr", status: "In Production", delivery: "15 Aug 2026" },
  { customer: "Tata Projects Ltd", grade: "Fe 550D TMT Bar", quantity: "18,500 MT", creditUtil: 82, limit: "₹40.0 Cr", status: "Dispatching", delivery: "10 Aug 2026" },
  { customer: "Jindal Infra Corp", grade: "IS 2062 Beam", quantity: "8,200 MT", creditUtil: 45, limit: "₹15.0 Cr", status: "Allocated", delivery: "20 Aug 2026" },
  { customer: "Precision Wires India", grade: "SAE 1008 Rod", quantity: "6,400 MT", creditUtil: 55, limit: "₹12.0 Cr", status: "In Production", delivery: "18 Aug 2026" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Business"
        title="Customers & Order Backlog Operating System"
        description="Customer order backlog, credit limit utilization, sales contract commitments, and dispatch schedules."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Order Backlog" value="45,500 MT" delta={6.2} hint="firm contracts" icon={Package} />
        <StatCard label="Active Customers" value="84 Accounts" hint="EPC & Infrastructure" icon={Users} />
        <StatCard label="Credit Utilization" value="65.4%" hint="risk controlled" icon={CreditCard} />
        <StatCard label="Customer Satisfaction" value="96.4%" delta={1.8} hint="OTIF delivery 98%" icon={CheckCircle2} />
      </div>

      <Panel title="Customer Order Backlog & Credit Limit Utilization" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Customer Entity</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Steel Grade Ordered</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Order Tonnage</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Credit Sanction Limit</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Credit Utilization</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Production Status</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Promised Delivery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerOrders.map((c) => (
              <TableRow key={c.customer} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-bold text-xs text-[#0F172A]">{c.customer}</TableCell>
                <TableCell className="text-xs font-bold text-[#E05600]">{c.grade}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{c.quantity}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#475569]">{c.limit}</TableCell>
                <TableCell className="w-40">
                  <div className="flex items-center gap-2">
                    <Meter value={c.creditUtil} tone={c.creditUtil > 80 ? "warning" : "primary"} />
                    <span className="text-[10px] font-bold text-[#475569]">{c.creditUtil}%</span>
                  </div>
                </TableCell>
                <TableCell><Pill tone={statusTone(c.status)}>{c.status}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#475569]">{c.delivery}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
