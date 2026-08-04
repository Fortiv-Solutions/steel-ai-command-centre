import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Search,
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

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Center · Steel AI Command Center" },
      { name: "description", content: "Plant SOPs, maintenance guides, chemistry formulas, and operational manuals." },
    ],
  }),
  component: Page,
});

const sopLibrary = [
  { code: "SOP-EAF-01", title: "Electric Arc Furnace Slag Foaming Protocol", dept: "Melt Shop", lastUpdate: "15 Jun 2026", views: "1,420", status: "Verified" },
  { code: "SOP-LRF-04", title: "Ladle Refining Argon Purging & Desulfurization", dept: "Metallurgy", lastUpdate: "02 Jul 2026", views: "980", status: "Verified" },
  { code: "SOP-ROLL-12", title: "TMT Bar Thermex Quenching Pressure Control", dept: "Rolling Mill", lastUpdate: "28 May 2026", views: "2,150", status: "Verified" },
  { code: "SOP-QA-08", title: "Ultrasonic NDT Defect Depth Classification", dept: "Quality Control", lastUpdate: "10 Jul 2026", views: "840", status: "Verified" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Knowledge"
        title="Knowledge Center & SOP Library"
        description="Standard Operating Procedures (SOPs), melt shop maintenance protocols, and metallurgical chemistry manuals."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Standard SOPs" value="340 Procedures" hint="100% digital" icon={BookOpen} />
        <StatCard label="Operator Searches" value="14,200 / mo" hint="sub-second response" icon={Search} />
        <StatCard label="Verified Guidelines" value="100%" hint="QA approved" icon={CheckCircle2} />
        <StatCard label="Avg Reading Time" value="1.5 mins" hint="summarized by AI" icon={FileText} />
      </div>

      <Panel title="Standard Operating Procedures (SOP) & Plant Guidelines" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">SOP Code</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Procedure Title</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Department</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Last Revised</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Views</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sopLibrary.map((s) => (
              <TableRow key={s.code} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{s.code}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{s.title}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{s.dept}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{s.lastUpdate}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{s.views}</TableCell>
                <TableCell><Pill tone="success">{s.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
