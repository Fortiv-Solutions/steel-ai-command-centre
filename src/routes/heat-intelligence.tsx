import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle2,
  Flame,
  Layers,
  Sparkles,
  Thermometer,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import { AreaTrend } from "@/components/charts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/heat-intelligence")({
  head: () => ({
    meta: [
      { title: "Heat & Batch Intelligence · Steel AI Command Center" },
      { name: "description", content: "Melt shop heat history, EAF thermal curves, chemical analysis, and grade matching." },
    ],
  }),
  component: Page,
});

const heatLogs = [
  { id: "H-4921", furnace: "EAF Unit 1", grade: "304L Stainless", temp: "1,625 °C", carbon: "0.04%", sulfur: "0.012%", status: "Ready for Tapping", action: "Add 120kg FeMn" },
  { id: "H-4922", furnace: "EAF Unit 2", grade: "Fe 550D TMT", temp: "1,595 °C", carbon: "0.18%", sulfur: "0.028%", status: "Refining", action: "Oxygen Lance 4m" },
  { id: "H-4923", furnace: "LRF Unit 1", grade: "SAE 1008 Wire", temp: "1,610 °C", carbon: "0.07%", sulfur: "0.015%", status: "Desulfurization", action: "Argon Purge" },
  { id: "H-4924", furnace: "EAF Unit 1", grade: "IS 2062 E250", temp: "1,580 °C", carbon: "0.21%", sulfur: "0.031%", status: "Melting", action: "Power 42 MW" },
  { id: "H-4925", furnace: "Concast 2", grade: "EN8 Carbon Steel", temp: "1,540 °C", carbon: "0.40%", sulfur: "0.020%", status: "Casting", action: "Cooling Flow 18L/s" },
];

const thermalEnergyTrend = [
  { month: "Heat 1", temp: 1520, powerKWh: 420 },
  { month: "Heat 2", temp: 1560, powerKWh: 435 },
  { month: "Heat 3", temp: 1610, powerKWh: 450 },
  { month: "Heat 4", temp: 1625, powerKWh: 440 },
  { month: "Heat 5", temp: 1590, powerKWh: 425 },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Steel Intelligence"
        title="Heat & Batch Intelligence"
        description="Melt shop heat history, EAF thermal curves, chemical analysis, and customer grade matching."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Heats This Month" value="284 Heats" delta={5.1} hint="EAF & LRF total" icon={Flame} />
        <StatCard label="Traceability" value="100%" hint="melt to dispatch" icon={CheckCircle2} />
        <StatCard label="Spec Match Rate" value="96.8%" delta={2.1} hint="first-time right" icon={BadgeCheckIcon} />
        <StatCard label="Grades Mastered" value="148 Grades" hint="carbon & alloy" icon={Layers} />
      </div>

      {/* Heat Chemistry Table */}
      <Panel title="Live Melt Shop Heat Log & Chemical Composition" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Heat ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Furnace Unit</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Target Steel Grade</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Tap Temp</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Carbon %</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Sulfur %</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Status</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">AI Addition Guidance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heatLogs.map((h) => (
              <TableRow key={h.id} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{h.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{h.furnace}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{h.grade}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{h.temp}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{h.carbon}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{h.sulfur}</TableCell>
                <TableCell><Pill tone="success">{h.status}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#B87514]">{h.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>

      {/* EAF Thermal Energy Curve */}
      <Panel title="EAF Thermal Temperature & Specific Power Consumption (kWh / Tonne)">
        <AreaTrend
          data={thermalEnergyTrend}
          x="month"
          series={[
            { key: "temp", label: "Melt Temperature °C" },
            { key: "powerKWh", label: "Power kWh/MT" },
          ]}
          height={220}
        />
      </Panel>
    </div>
  );
}

function BadgeCheckIcon(props: any) {
  return <CheckCircle2 {...props} />;
}
