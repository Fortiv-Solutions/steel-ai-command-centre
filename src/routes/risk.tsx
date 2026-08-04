import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Flame,
  Scale,
  ShieldAlert,
} from "lucide-react";
import { Meter, PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/risk")({
  head: () => ({
    meta: [
      { title: "Risk Center & Hazard Monitor · Steel AI Command Center" },
      { name: "description", content: "Plant operational risk, Baghouse SPM emissions, refractory wear, and safety hazard monitoring." },
    ],
  }),
  component: Page,
});

const hazardRisks = [
  { riskId: "RSK-401", area: "EAF Unit 1 Ladle Refractory", hazardType: "Refractory Wear Score", score: 92, limit: "100 Max", status: "Safe (14 Heats left)", action: "Schedule Relining next week" },
  { riskId: "RSK-402", area: "Melt Shop Baghouse Filter", hazardType: "SPM Emission (Dust)", score: 12, limit: "30 mg/Nm³", status: "Compliant", action: "Normal Operation" },
  { riskId: "RSK-403", area: "Substation Transformer 3", hazardType: "Thermal Load Temp", score: 68, limit: "90 °C Max", status: "Normal", action: "Cooling Fan Active" },
  { riskId: "RSK-404", area: "Argon Gas Line Pressure", hazardType: "Gas Pipeline Pressure", score: 85, limit: "100 PSI", status: "Normal", action: "Pressure Regulated" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Plant Risk Center & Hazard Monitor"
        description="Refractory wear monitoring, EAF baghouse SPM emissions, high-voltage transformer loads, and safety hazard warnings."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Overall Risk Score" value="Low (12/100)" hint="plant operational" icon={ShieldAlert} />
        <StatCard label="SPM Stack Emission" value="12 mg/Nm³" hint="limit < 30 mg/Nm³" icon={Scale} />
        <StatCard label="Refractory Wear" value="92% Health" hint="+14 heats remaining" icon={Flame} />
        <StatCard label="Safety LTI Record" value="142 Days" hint="zero lost time injuries" icon={CheckCircle2} />
      </div>

      <Panel title="Operational Risk Register & Equipment Wear Monitor" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Risk ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Plant Facility / Area</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Hazard Parameter</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Current Level vs Limit</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Risk Status</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">AI Corrective Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hazardRisks.map((r) => (
              <TableRow key={r.riskId} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{r.riskId}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{r.area}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{r.hazardType}</TableCell>
                <TableCell className="w-40">
                  <div className="flex items-center gap-2">
                    <Meter value={r.score} tone={r.score > 85 ? "warning" : "primary"} />
                    <span className="text-[10px] font-bold text-[#4A5059]">{r.score}%</span>
                  </div>
                </TableCell>
                <TableCell><Pill tone="success">{r.status}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#B87514]">{r.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
