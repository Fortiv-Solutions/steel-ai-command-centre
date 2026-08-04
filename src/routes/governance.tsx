import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  FileCheck,
  Lock,
  ShieldAlert,
  Sliders,
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

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      { title: "AI Governance & Guardrails · Steel AI Command Center" },
      { name: "description", content: "LLM guardrails, data anonymization, model auditing, and policy enforcement." },
    ],
  }),
  component: Page,
});

const guardrails = [
  { ruleId: "GRD-01", policy: "PII & Salary Masking", scope: "HR & Finance Queries", enforcement: "Strict Block", auditStatus: "Active", violationCount: 0 },
  { ruleId: "GRD-02", policy: "Grounding Verification (>95%)", scope: "Company Brain RAG", enforcement: "Fallback to Human", auditStatus: "Active", violationCount: 2 },
  { ruleId: "GRD-03", policy: "Chemistry Spec Modification Limit", scope: "Melt Shop Copilot", enforcement: "Human Approval Required", auditStatus: "Active", violationCount: 0 },
  { ruleId: "GRD-04", policy: "PO Value Cap Auto-Sign (₹10L)", scope: "Procurement Agent", enforcement: "Hard Limit", auditStatus: "Active", violationCount: 0 },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Platform"
        title="AI Governance & Safety Guardrails"
        description="LLM policy enforcement, grounding verification, hallucination protection, and model audit trails."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Guardrails" value="18 Rules" hint="100% enforced" icon={Sliders} />
        <StatCard label="Grounding Accuracy" value="99.8%" hint="vector grounded" icon={CheckCircle2} />
        <StatCard label="Hallucination Risk" value="0.01%" hint="blocked at gate" icon={ShieldAlert} />
        <StatCard label="Model Provider" value="Grounded LLM" hint="zero data leakage" icon={Lock} />
      </div>

      <Panel title="Active AI Model Guardrails & Enforcement Rules" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Rule ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Governance Policy</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Module Scope</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Enforcement Action</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Violations 30d</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Rule Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guardrails.map((g) => (
              <TableRow key={g.ruleId} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{g.ruleId}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{g.policy}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{g.scope}</TableCell>
                <TableCell className="text-xs font-bold text-[#D95A00]">{g.enforcement}</TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#1A1D20]">{g.violationCount}</TableCell>
                <TableCell><Pill tone="success">{g.auditStatus}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
