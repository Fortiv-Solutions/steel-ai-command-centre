import { createFileRoute } from "@tanstack/react-router";
import {
  Flame,
  Gauge,
  Sparkles,
  Thermometer,
  Zap,
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

export const Route = createFileRoute("/heat-intelligence")({
  head: () => ({
    meta: [
      { title: "Heat & Melt Shop Intelligence · Steel AI Command Center" },
      { name: "description", content: "EAF temperature profiles, chemical spectrometry, slag foaming, and alloy optimization." },
    ],
  }),
  component: Page,
});

const heatLogsData = [
  { id: "H-4921", furnace: "EAF Unit 1", grade: "304L Stainless", temp: "1,625 °C", carbon: "0.04%", sulfur: "0.012%", status: "Ready for Tapping", action: "Add 120kg FeMn" },
  { id: "H-4922", furnace: "EAF Unit 2", grade: "Fe 550D TMT", temp: "1,595 °C", carbon: "0.18%", sulfur: "0.028%", status: "Refining", action: "Oxygen Lance 4m" },
  { id: "H-4923", furnace: "LRF Unit 1", grade: "SAE 1008 Wire", temp: "1,610 °C", carbon: "0.07%", sulfur: "0.015%", status: "Desulfurization", action: "Argon Purge" },
  { id: "H-4924", furnace: "EAF Unit 1", grade: "IS 2062 E250", temp: "1,580 °C", carbon: "0.21%", sulfur: "0.031%", status: "Melting", action: "Power 42 MW" },
  { id: "H-4925", furnace: "Concast 2", grade: "EN8 Carbon Steel", temp: "1,540 °C", carbon: "0.40%", sulfur: "0.020%", status: "Casting", action: "Cooling Flow 18L/s" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Manufacturing"
        title="EAF Heat & Chemistry Intelligence"
        description="Real-time Electric Arc Furnace thermal profile, slag foaming optimization, alloy additions solver, and spectrometry RAG."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Heats" value="5 Furnaces" hint="EAF / LRF / Concast" icon={Flame} />
        <StatCard label="Power Efficiency" value="482 kWh / MT" delta={-3.4} hint="vs target 495 kWh" icon={Zap} />
        <StatCard label="Tap Temperature" value="1,620 °C Avg" hint="optimal ±5 °C" icon={Thermometer} />
        <StatCard label="Alloy Savings" value="₹18.4 Lakhs" delta={8.2} hint="monthly linear optimization" icon={Sparkles} />
      </div>

      <Panel title="EAF Melt Shop Heat Log & Chemical Composition" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Heat ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Furnace Unit</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Target Steel Grade</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Tap Temp</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Carbon %</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Sulfur %</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Status</TableHead>
              <TableHead className="font-bold text-[#0F172A]">AI Addition Guidance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heatLogsData.map((h) => (
              <TableRow key={h.id} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{h.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{h.furnace}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{h.grade}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{h.temp}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{h.carbon}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{h.sulfur}</TableCell>
                <TableCell><Pill tone={statusTone(h.status)}>{h.status}</Pill></TableCell>
                <TableCell className="text-xs font-bold text-[#B87514]">{h.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
