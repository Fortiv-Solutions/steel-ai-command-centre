import { createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  CheckCircle2,
  Factory,
  Layers,
  Sparkles,
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

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Materials & Grades Master · Steel AI Command Center" },
      { name: "description", content: "IS 2062, 304L Stainless, Fe 550D TMT, and chemical alloy specification registry." },
    ],
  }),
  component: Page,
});

const steelGrades = [
  { code: "IS 2062 E250", category: "Structural Carbon Steel", yieldMPa: "250 MPa", tensileMPa: "410 MPa", carbonMax: "0.23%", status: "Active Standard" },
  { code: "304L Stainless", category: "Austenitic Stainless", yieldMPa: "215 MPa", tensileMPa: "505 MPa", carbonMax: "0.030%", status: "Active Standard" },
  { code: "Fe 550D TMT", category: "High Ductility Rebar", yieldMPa: "550 MPa", tensileMPa: "600 MPa", carbonMax: "0.25%", status: "Active Standard" },
  { code: "SAE 1008 Wire", category: "Low Carbon Wire Rod", yieldMPa: "280 MPa", tensileMPa: "420 MPa", carbonMax: "0.10%", status: "Active Standard" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Manufacturing"
        title="Steel Materials & Chemical Grade Registry"
        description="Master registry of structural carbon, stainless, alloy rebar, and high-strength wire rod grade specifications."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Registered Grades" value="128 Grades" hint="IS / ASTM / EN" icon={Boxes} />
        <StatCard label="Yield Strength Range" value="215 - 600 MPa" hint="verified chemistry" icon={Layers} />
        <StatCard label="Chemical Tolerances" value="100% Validated" hint="automated spectro check" icon={CheckCircle2} />
        <StatCard label="Customer Custom Specs" value="42 Active" hint="tailored heat recipes" icon={Factory} />
      </div>

      <Panel title="Configured Steel Grades & Chemical/Mechanical Tolerances" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Grade Code</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Category</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Yield Strength</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Tensile Strength</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Carbon Max</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Registry Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {steelGrades.map((g) => (
              <TableRow key={g.code} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{g.code}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{g.category}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{g.yieldMPa}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{g.tensileMPa}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{g.carbonMax}</TableCell>
                <TableCell><Pill tone="success">{g.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
