import { createFileRoute } from "@tanstack/react-router";
import {
  Banknote,
  Building,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Wallet,
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

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance & Commercial · Steel AI Command Center" },
      { name: "description", content: "Working capital, cost per tonne ledgers, EBITDA optimization, and cashflow forecast." },
    ],
  }),
  component: Page,
});

const costLedgerData = [
  { component: "Raw Scrap & Hot Metal Charge", costPerTon: "₹28,400 / MT", budgetVar: "-1.8%", trend: "Favorable", aiInsight: "Scrap mix ratio optimized via AI linear solver" },
  { component: "EAF Electrical Power & Gas Energy", costPerTon: "₹7,250 / MT", budgetVar: "+0.4%", trend: "Stable", aiInsight: "Off-peak power tariff utilization at 88%" },
  { component: "Refractory Bricks & Mass", costPerTon: "₹2,100 / MT", budgetVar: "-3.2%", trend: "Favorable", aiInsight: "Ladle lining life extended by +14 heats" },
  { component: "Conversion & Rolling Operational Cost", costPerTon: "₹4,750 / MT", budgetVar: "-0.9%", trend: "Favorable", aiInsight: "Rolling mill cobble rate reduced to 0.08%" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Business"
        title="Finance & Cost Per Tonne Commercial Intelligence"
        description="Steel manufacturing cost ledgers, working capital cycle, conversion cost variance, and EBITDA margin tracking."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Liquid Steel Cost" value="₹42,500 / MT" delta={-2.4} hint="vs budget ₹43,500" icon={Wallet} />
        <StatCard label="Monthly Net ROI" value="6.8x ROI" delta={14.2} hint="₹4.8 Cr monthly savings" icon={TrendingUp} />
        <StatCard label="DSO (Days Sales)" value="38 Days" delta={-4} hint="target 35 days" icon={Banknote} />
        <StatCard label="EBITDA Margin" value="18.4%" delta={1.2} hint="industry benchmark 16%" icon={CheckCircle2} />
      </div>

      <Panel title="Cost Per Tonne Conversion & Material Ledger" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Cost Component</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Cost Per Tonne</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Budget Variance</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Variance Trend</TableHead>
              <TableHead className="font-bold text-[#0F172A]">AI Cost Optimization Insight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costLedgerData.map((f) => (
              <TableRow key={f.component} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-bold text-xs text-[#0F172A]">{f.component}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#E05600]">{f.costPerTon}</TableCell>
                <TableCell className="text-xs font-bold text-[#B87514]">{f.budgetVar}</TableCell>
                <TableCell><Pill tone="success">{f.trend}</Pill></TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{f.aiInsight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
