import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Flame,
  ShieldAlert,
  Thermometer,
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

export const Route = createFileRoute("/risk")({
  head: () => ({
    meta: [
      { title: "Risk Center & Plant Safety · Steel AI Command Center" },
      { name: "description", content: "Ladle lining wear alerts, EAF transformer overload, scrap moisture risks, and safety monitoring." },
    ],
  }),
  component: Page,
});

const plantRiskLogs = [
  { riskId: "RSK-401", area: "EAF Melt Shop 1", hazardType: "Refractory Lining Wear (14 heats left)", limit: "15 Heats Min", score: 85, status: "Medium Risk", corrective: "Schedule Ladle Relining" },
  { riskId: "RSK-402", area: "Scrap Storage Yard S-2", hazardType: "Scrap Moisture Content High (> 2.5%)", limit: "1.5% Max", score: 92, status: "High Risk", corrective: "Drying Pre-chamber Route" },
  { riskId: "RSK-403", area: "Bar Mill Transformer", hazardType: "Oil Temperature High (78 °C)", limit: "85 °C Max", score: 60, status: "Low Risk", corrective: "Cooler Fan Assist" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Plant Risk Center & Hazard Prevention"
        description="Predictive risk monitoring for refractory wear, transformer thermal overloads, scrap moisture explosion risks, and safety compliance."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Risk Alerts" value="3 Flags" delta={-2} hint="requiring monitoring" icon={ShieldAlert} />
        <StatCard label="Zero Incident Record" value="482 Days" delta={12} hint="LTI-free operations" icon={CheckCircle2} />
        <StatCard label="Refractory Health" value="88% Index" hint="ladle & furnace lining" icon={Flame} />
        <StatCard label="Environmental Safety" value="100% Compliant" hint="CPCB SPM emissions" icon={Thermometer} />
      </div>

      <Panel title="Live Plant Risk Flags & Predictive Hazard Mitigations" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFFFFF]">
              <TableHead className="font-bold text-[#0F172A]">Risk ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Plant Facility / Area</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Hazard Parameter</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Current Level vs Limit</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Risk Status</TableHead>
              <TableHead className="font-bold text-[#0F172A]">AI Corrective Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plantRiskLogs.map((r) => (
              <TableRow key={r.riskId} className="hover:bg-[#FFFFFF]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{r.riskId}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{r.area}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{r.hazardType}</TableCell>
                <TableCell className="w-40">
                  <div className="flex items-center gap-2">
                    <Meter value={r.score} tone={r.score > 80 ? "destructive" : "warning"} />
                    <span className="text-[10px] font-bold text-[#475569]">{r.score}%</span>
                  </div>
                </TableCell>
                <TableCell><Pill tone={statusTone(r.status)}>{r.status}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#B87514]">{r.corrective}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
