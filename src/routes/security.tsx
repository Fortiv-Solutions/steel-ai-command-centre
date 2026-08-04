import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Lock,
  ShieldCheck,
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

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Audit Matrix · Steel AI Command Center" },
      { name: "description", content: "Active sessions, security policies, TLS encryption, and audit log." },
    ],
  }),
  component: Page,
});

const securityLogs = [
  { id: "SEC-9041", event: "Multi-Factor Auth Verified", user: "a.verma@steelco.com", ip: "192.168.4.12", location: "Jamshedpur HQ", timestamp: "10 mins ago", status: "Passed" },
  { id: "SEC-9042", event: "API Key Generated for SAP Connector", user: "SYSTEM_BOT", ip: "10.0.8.4", location: "Server Room 1", timestamp: "25 mins ago", status: "Passed" },
  { id: "SEC-9043", event: "Failed Password Attempt (1/3)", user: "k.das@steelco.com", ip: "192.168.12.88", location: "Lab Station 3", timestamp: "1 hr ago", status: "Flagged" },
  { id: "SEC-9044", event: "Document Export Sealed with SHA-256", user: "p.nair@steelco.com", ip: "192.168.2.14", location: "QA Office", timestamp: "2 hrs ago", status: "Passed" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Platform"
        title="Security & Access Audit Matrix"
        description="Zero-trust network access, encrypted credentials, active sessions, and audit logging."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Sessions" value="284" hint="authenticated" icon={KeyRound} />
        <StatCard label="MFA Coverage" value="100%" hint="enforced for all" icon={ShieldCheck} />
        <StatCard label="Failed Logins 24h" value="3" hint="zero breaches" icon={AlertTriangle} />
        <StatCard label="Encryption" value="AES-256" hint="at rest & transit" icon={Lock} />
      </div>

      <Panel title="Real-Time Security & Audit Trail" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Log ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Security Event</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">User Principal</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">IP Address</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Location Scope</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Timestamp</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Audit Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {securityLogs.map((l) => (
              <TableRow key={l.id} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{l.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20]">{l.event}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{l.user}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#1A1D20]">{l.ip}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{l.location}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{l.timestamp}</TableCell>
                <TableCell>
                  <Pill tone={l.status === "Passed" ? "success" : "warning"}>{l.status}</Pill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
