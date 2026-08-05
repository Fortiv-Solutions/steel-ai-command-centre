import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { PageHeader, Panel, Pill, StatCard, statusTone } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Human-in-the-Loop Decision Queue · Steel AI Command Center" },
      { name: "description", content: "AI recommendations above policy thresholds routed to human authorities with full audit trail." },
    ],
  }),
  component: Page,
});

type ApprovalItem = {
  id: string;
  title: string;
  department: string;
  requester: string;
  risk: "High" | "Medium" | "Low";
  value: string;
  aiRecommendation: string;
  confidence: number;
  age: string;
};

const approvalQueueData: ApprovalItem[] = [
  { id: "APR-9901", title: "Approve 304L Heat Chemistry Addition (FeMn +120kg)", department: "Melt Shop / Metallurgy", requester: "EAF Copilot", risk: "Low", value: "₹45,000", aiRecommendation: "Approve", confidence: 98, age: "12 mins" },
  { id: "APR-9902", title: "Scrap Purchase Order #PO-4921 Rate Exemption", department: "Procurement", requester: "Procurement Agent", risk: "High", value: "₹1.4 Cr", aiRecommendation: "Approve", confidence: 94, age: "45 mins" },
  { id: "APR-9903", title: "Credit Limit Extension for Tata Projects Order #8892", department: "Finance / Accounts", requester: "Sales Copilot", risk: "Medium", value: "₹12.5 Cr", aiRecommendation: "Review", confidence: 88, age: "1 hr" },
  { id: "APR-9904", title: "Override Ladle Refractory Wear Warning (14 Heats left)", department: "Maintenance", requester: "Plant Safety Bot", risk: "High", value: "Safety Critical", aiRecommendation: "Reject", confidence: 96, age: "2 hrs" },
  { id: "APR-9905", title: "Railway Rake Freight Dispatch Discount Waiver", department: "Logistics", requester: "Dispatch Agent", risk: "Low", value: "₹85,000", aiRecommendation: "Approve", confidence: 99, age: "3 hrs" },
];

function Page() {
  const [filter, setFilter] = useState("All");

  const filtered = approvalQueueData.filter((a) => {
    if (filter === "All") return true;
    if (filter === "High Risk") return a.risk === "High";
    if (filter === "AI Approved") return a.aiRecommendation === "Approve";
    return true;
  });

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Human-in-the-Loop Decision Queue"
        description="Every AI recommendation above a policy threshold is routed to a named human authority with full context, confidence score and audit trail."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pending Decisions" value="18 Queue" delta={-5} hint="requiring human signoff" icon={Clock} />
        <StatCard label="Approved (30d)" value="1,284 Signed" delta={7.2} hint="full audit trail" icon={CheckCircle2} />
        <StatCard label="Avg Decision Time" value="3.4 hours" delta={-22.1} hint="sub-4h SLA" icon={ShieldCheck} />
        <StatCard label="AI Alignment Rate" value="93.6%" delta={1.4} hint="human vs AI agreement" icon={CheckCircle2} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Pending Approval Action Queue</h2>
        <div className="flex gap-1.5">
          {["All", "High Risk", "AI Approved"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "secondary"}
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <Panel title="Decision Action Queue" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Approval ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Decision Subject</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Department</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Risk Level</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Impact Value</TableHead>
              <TableHead className="font-bold text-[#0F172A]">AI Rec & Confidence</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Age</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => (
              <TableRow key={a.id} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{a.id}</TableCell>
                <TableCell className="max-w-md text-xs font-bold text-[#0F172A]">{a.title}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{a.department}</TableCell>
                <TableCell><Pill tone={statusTone(a.risk)}>{a.risk} Risk</Pill></TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{a.value}</TableCell>
                <TableCell>
                  <Pill tone={statusTone(a.aiRecommendation)}>
                    {a.aiRecommendation} · {a.confidence}%
                  </Pill>
                </TableCell>
                <TableCell className="text-xs font-bold text-[#475569]">{a.age}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <Button size="sm" variant="default" className="h-7 px-2 text-[10px]">
                      Approve
                    </Button>
                    <Button size="sm" variant="secondary" className="h-7 px-2 text-[10px]">
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
