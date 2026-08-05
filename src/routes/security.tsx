import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Key,
  Lock,
  Shield,
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
      { title: "Security & Audit Logs · Steel AI Command Center" },
      { name: "description", content: "Role-based access control (RBAC), single sign-on (SSO), data encryption, and audit logs." },
    ],
  }),
  component: Page,
});

const securityAuditLogs = [
  { id: "LOG-8801", event: "Executive Copilot Query Execution", user: "a.verma@steelco.com", ip: "10.4.12.84", location: "Angul Plant HQ", timestamp: "Today 11:14:02", status: "Verified Audit" },
  { id: "LOG-8802", event: "MTC Certificate Auto-Signature Key Access", user: "r.sharma@steelco.com", ip: "10.4.14.12", location: "Quality Lab", timestamp: "Today 10:45:18", status: "Verified Audit" },
  { id: "LOG-8803", event: "Scrap Rate Contract Policy Override Attempt", user: "v.kumar@steelco.com", ip: "10.2.04.55", location: "Jamshedpur Unit", timestamp: "Today 09:12:40", status: "Logged & Approved" },
];

function Page() {
  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Platform"
        title="Security & Enterprise Audit Center"
        description="Role-based access control (RBAC), SOC 2 compliance, TLS encryption, API key management, and audit logs."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Security Status" value="SOC 2 Type II" hint="100% compliant" icon={ShieldCheck} />
        <StatCard label="SSO & MFA Status" value="Enforced" hint="SAML 2.0 / Azure AD" icon={Key} />
        <StatCard label="API Key Encryption" value="AES-256 GCM" hint="rotated 90 days" icon={Lock} />
        <StatCard label="Audit Log Retention" value="7 Years" hint="tamper-proof ledger" icon={Shield} />
      </div>

      <Panel title="Real-Time Enterprise Security & Access Audit Trail" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFFFFF]">
              <TableHead className="font-bold text-[#0F172A]">Log ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Security Event</TableHead>
              <TableHead className="font-bold text-[#0F172A]">User Principal</TableHead>
              <TableHead className="font-bold text-[#0F172A]">IP Address</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Location Scope</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Timestamp</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Audit Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {securityAuditLogs.map((l) => (
              <TableRow key={l.id} className="hover:bg-[#FFFFFF]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{l.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{l.event}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{l.user}</TableCell>
                <TableCell className="font-mono text-xs font-bold text-[#0F172A]">{l.ip}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{l.location}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{l.timestamp}</TableCell>
                <TableCell><Pill tone="success">{l.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
