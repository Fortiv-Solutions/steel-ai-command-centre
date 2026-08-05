import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  FileText,
  Search,
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

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Knowledge Center · Steel AI Command Center" },
      { name: "description", content: "SOP procedures, chemical specifications, plant safety guidelines, and metallurgical manuals." },
    ],
  }),
  component: Page,
});

const sopsData = [
  { code: "SOP-EAF-012", title: "Electric Arc Furnace Tap Temperature & Slag Foaming Procedure", dept: "Melt Shop", lastUpdate: "14 May 2026", views: "1,420 views", status: "Verified Active" },
  { code: "SOP-MTC-004", title: "EN 10204 3.1 Spectro Tensile Audit & Auto-Signing Protocol", dept: "Quality Lab", lastUpdate: "02 Jun 2026", views: "2,150 views", status: "Verified Active" },
  { code: "SOP-ROLL-088", title: "Bar Mill Flying Shear Cobble Prevention & Laser Calibration", dept: "Rolling Mill", lastUpdate: "28 Apr 2026", views: "890 views", status: "Verified Active" },
  { code: "SOP-LOG-019", title: "Railway Rake 59-Wagon Loading & Demurrage Prevention", dept: "Logistics", lastUpdate: "10 Jun 2026", views: "1,120 views", status: "Verified Active" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Knowledge"
        title="Plant Knowledge Center & Standard Operating Procedures"
        description="Searchable repository of metallurgical manuals, melt shop SOPs, equipment maintenance guides, and safety protocols."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active SOP Manuals" value="482 Documents" hint="100% vector indexed" icon={BookOpen} />
        <StatCard label="Monthly RAG Searches" value="14,200 Queries" delta={18.4} hint="by plant engineers" icon={Search} />
        <StatCard label="Grounded Accuracy" value="99.8%" hint="verified against ISO" icon={CheckCircle2} />
        <StatCard label="AI Summaries Generated" value="3,840 Answers" delta={12.1} hint="instant copilot retrieval" icon={Sparkles} />
      </div>

      <Panel title="Configured Plant SOPs & Metallurgical Operating Manuals" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">SOP Code</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Procedure Title</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Department</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Last Revised</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Views</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sopsData.map((s) => (
              <TableRow key={s.code} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{s.code}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{s.title}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{s.dept}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{s.lastUpdate}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{s.views}</TableCell>
                <TableCell><Pill tone="success">{s.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
