import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Lock,
  ShieldCheck,
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
      { title: "AI Governance & Policy Engine · Steel AI Command Center" },
      { name: "description", content: "Prompt registry, guardrails, model evaluations, and compliance enforcement." },
    ],
  }),
  component: Page,
});

const governanceRules = [
  { ruleId: "GOV-101", policy: "Grounded RAG Output Constraint (Zero Spec Fabrication)", scope: "MTC & Lab Agents", action: "Strict Block", violationCount: 0, status: "Enforcing" },
  { ruleId: "GOV-102", policy: "High-Value Commercial Sign-off Threshold (> ₹1.0 Cr)", scope: "Sales & Procurement", action: "Route to Approval Queue", violationCount: 0, status: "Enforcing" },
  { ruleId: "GOV-103", policy: "PII & Executive Payroll Anonymization Filter", scope: "HR & Finance Copilots", action: "Auto Masking", violationCount: 2, status: "Enforcing" },
  { ruleId: "GOV-104", policy: "Model Hallucination & Citation Verification Check", scope: "Company Brain RAG", action: "Fallback to Grounded Answer", violationCount: 1, status: "Enforcing" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Platform"
        title="AI Governance & Safety Policy Engine"
        description="Prompt safety guardrails, model evaluation benchmarks, hallucination prevention, and human-in-the-loop escalation rules."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Enforced Policies" value="42 Rules" hint="100% active" icon={Sliders} />
        <StatCard label="Guardrail Pass Rate" value="99.98%" delta={0.02} hint="zero data breach" icon={ShieldCheck} />
        <StatCard label="Model Evaluations" value="58 Benchmark" hint="daily accuracy checks" icon={CheckCircle2} />
        <StatCard label="Blocked Injections" value="14 Attempted" hint="prompt injection defense" icon={Lock} />
      </div>

      <Panel title="Configured AI Safety Policies & Guardrail Enforcement Rules" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">Rule ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Governance Policy</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Module Scope</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Enforcement Action</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Violations 30d</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Rule Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {governanceRules.map((g) => (
              <TableRow key={g.ruleId} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{g.ruleId}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{g.policy}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{g.scope}</TableCell>
                <TableCell><Pill tone="warning">{g.action}</Pill></TableCell>
                <TableCell className="text-xs font-bold tabular-nums text-[#0F172A]">{g.violationCount}</TableCell>
                <TableCell><Pill tone="success">{g.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
