import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award,
  BookOpen,
  Boxes,
  CheckCircle2,
  Database,
  Layers,
  Search,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      { title: "Grade Master & Chemistry Library · Steel AI Command Center" },
      { name: "description", content: "Steel grade master, chemical windows, mechanical envelopes, and international standards." },
    ],
  }),
  component: Page,
});

type SteelGrade = {
  grade: string;
  standard: string;
  category: string;
  carbonRange: string;
  siliconRange: string;
  manganeseRange: string;
  yieldStrength: string;
  tensileStrength: string;
  application: string;
};

const steelGradesData: SteelGrade[] = [
  { grade: "304L Stainless", standard: "ASTM A240", category: "Austenitic Stainless", carbonRange: "0.030% Max", siliconRange: "0.75% Max", manganeseRange: "2.00% Max", yieldStrength: "≥ 205 MPa", tensileStrength: "≥ 515 MPa", application: "Chemical Vessels, Marine Plates" },
  { grade: "Fe 550D TMT", standard: "IS 1786:2008", category: "High Strength TMT", carbonRange: "0.15 - 0.22%", siliconRange: "0.15 - 0.35%", manganeseRange: "0.60 - 1.00%", yieldStrength: "≥ 550 MPa", tensileStrength: "≥ 600 MPa", application: "High-Rise Construction, Bridges" },
  { grade: "SAE 1008 Wire Rod", standard: "ASTM A510", category: "Low Carbon Wire", carbonRange: "0.06 - 0.10%", siliconRange: "0.10 - 0.25%", manganeseRange: "0.30 - 0.50%", yieldStrength: "≥ 240 MPa", tensileStrength: "≥ 380 MPa", application: "Fasteners, Electrode Core Wire" },
  { grade: "IS 2062 E250", standard: "IS 2062:2011", category: "Structural Carbon Steel", carbonRange: "0.22% Max", siliconRange: "0.40% Max", manganeseRange: "1.50% Max", yieldStrength: "≥ 250 MPa", tensileStrength: "≥ 410 MPa", application: "Structural Beams, Heavy Framing" },
  { grade: "EN8 / C45", standard: "BS 970 / DIN 17200", category: "Medium Carbon Alloy", carbonRange: "0.35 - 0.45%", siliconRange: "0.10 - 0.40%", manganeseRange: "0.60 - 0.90%", yieldStrength: "≥ 350 MPa", tensileStrength: "≥ 650 MPa", application: "Shafts, Axles, Automotive Forgings" },
];

function Page() {
  const [search, setSearch] = useState("");

  const filtered = steelGradesData.filter(
    (g) =>
      g.grade.toLowerCase().includes(search.toLowerCase()) ||
      g.standard.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Steel Intelligence"
        title="Steel Grade Master & Chemistry Library"
        description="Steel grade master, chemical windows, mechanical property envelopes, international standards mapping, and customer spec matching."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Mastered Steel Grades" value="148 Grades" delta={6} hint="carbon & alloy" icon={Boxes} />
        <StatCard label="Standards Mapped" value="6 Families" hint="ASTM · BIS · DIN · EN" icon={BookOpen} />
        <StatCard label="Customer Specs" value="1,284 Specs" delta={9.1} hint="auto-matched" icon={Database} />
        <StatCard label="Spec Conflicts Open" value="12 Conflicts" delta={-6} hint="resolved by AI" icon={CheckCircle2} />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-[#A6ACB6] bg-[#E4E8EE] p-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">Master Steel Grade Specification Register</h2>
        <div className="relative w-72">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-[#4A5059]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search grade, standard or category…"
            className="h-8 border-[#A6ACB6] bg-[#DCE0E6] pl-8 text-xs text-[#1A1D20]"
          />
        </div>
      </div>

      <Panel title="Grade Master & Chemical Property Envelopes" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Grade Name</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Standard Code</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Category</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Carbon (C) Range</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Silicon (Si) Range</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Manganese (Mn) Range</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Min Yield Strength</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Min Tensile Strength</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Application Scope</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((g) => (
              <TableRow key={g.grade} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-bold text-xs text-[#D95A00]">{g.grade}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#1A1D20]">{g.standard}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{g.category}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{g.carbonRange}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{g.siliconRange}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{g.manganeseRange}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#B87514]">{g.yieldStrength}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#B87514]">{g.tensileStrength}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{g.application}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
