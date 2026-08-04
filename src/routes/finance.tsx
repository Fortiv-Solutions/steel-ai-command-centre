import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import { LineSeries } from "@/components/charts";
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
      { title: "Finance & Commercial OS · Steel AI Command Center" },
      { name: "description", content: "Conversion cost per tonne, working capital, AR/AP ledgers, and margin analysis." },
    ],
  }),
  component: Page,
});

const costComponents = [
  { component: "Raw Scrap & Hot Metal", costPerTon: "₹28,400 / MT", budgetVar: "-1.8%", trend: "Favorable", aiInsight: "Scrap mix ratio optimized via linear programming" },
  { component: "EAF Power & Natural Gas Energy", costPerTon: "₹7,250 / MT", budgetVar: "+0.4%", trend: "Stable", aiInsight: "Off-peak tariff utilized 88% in shift B & C" },
  { component: "Refractory & Consumables", costPerTon: "₹2,100 / MT", budgetVar: "-3.2%", trend: "Favorable", aiInsight: "Ladle refractory life extended +14 heats" },
  { component: "Conversion & Rolling Mill Cost", costPerTon: "₹4,750 / MT", budgetVar: "-0.9%", trend: "Favorable", aiInsight: "Cobble rate reduced to 0.08%" },
];

const workingCapitalDays = [
  { month: "Jan", dso: 48, dpo: 62, dio: 45 },
  { month: "Feb", dso: 46, dpo: 60, dio: 43 },
  { month: "Mar", dso: 44, dpo: 58, dio: 41 },
  { month: "Apr", dso: 42, dpo: 56, dio: 39 },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Business"
        title="Finance & Commercial Operating System"
        description="Conversion cost per tonne, working capital cycle, accounts receivable/payable ledgers, and margin analytics."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Liquid Steel Cost" value="₹42,500 / MT" delta={-2.4} hint="net conversion cost" icon={Wallet} />
        <StatCard label="Monthly EBITDA" value="₹24.8 Cr" delta={14.2} hint="margin +3.4%" icon={TrendingUp} />
        <StatCard label="Working Capital DSO" value="42 Days" delta={-12.5} hint="receivables collected" icon={CreditCard} />
        <StatCard label="Raw Material Hedging" value="₹18.4 Cr" hint="scrap locked" icon={DollarSign} />
      </div>

      <Panel title="Liquid Steel Conversion Cost Per Tonne Ledger" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Cost Component</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Cost Per Tonne</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Budget Variance</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Variance Trend</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">AI Cost Optimization Insight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costComponents.map((f) => (
              <TableRow key={f.component} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-bold text-xs text-[#1A1D20]">{f.component}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#D95A00]">{f.costPerTon}</TableCell>
                <TableCell className="text-xs font-bold text-[#B87514]">{f.budgetVar}</TableCell>
                <TableCell><Pill tone="success">{f.trend}</Pill></TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{f.aiInsight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>

      <Panel title="Working Capital Cycle Days (DSO / DPO / DIO Trailing Trend)">
        <LineSeries data={workingCapitalDays} x="month" series={[{ key: "dso", label: "DSO (Days Sales Outstanding)" }, { key: "dpo", label: "DPO (Days Payable Outstanding)" }, { key: "dio", label: "DIO (Days Inventory Outstanding)" }]} height={220} />
      </Panel>
    </div>
  );
}
