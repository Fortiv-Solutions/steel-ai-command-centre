import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Key,
  Plus,
  Search,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";
import { PageHeader, Pill, StatCard } from "@/components/ui-kit";
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

export const Route = createFileRoute("/administration")({
  head: () => ({
    meta: [
      { title: "User & Tenant Administration · Steel AI Command Center" },
      { name: "description", content: "Multi-plant user provisioning, roles, licensing, and access management." },
    ],
  }),
  component: Page,
});

type UserAccount = {
  id: string;
  name: string;
  email: string;
  role: string;
  plantScope: string;
  license: "Executive" | "Operations" | "Read Only";
  status: "Active" | "Pending Approval" | "Suspended";
};

const usersData: UserAccount[] = [
  { id: "USR-101", name: "Aaditya Verma", email: "a.verma@steelco.com", role: "Plant Operations Director", plantScope: "All Plants (5)", license: "Executive", status: "Active" },
  { id: "USR-102", name: "Dr. Rajesh Sharma", email: "r.sharma@steelco.com", role: "Chief Metallurgist", plantScope: "Melt Shop 1 & 2", license: "Operations", status: "Active" },
  { id: "USR-103", name: "Vikram Kumar", email: "v.kumar@steelco.com", role: "Head of Logistics", plantScope: "Jamshedpur Unit", license: "Operations", status: "Active" },
  { id: "USR-104", name: "Ananya Patel", email: "a.patel@steelco.com", role: "Finance Controller", plantScope: "Corporate HQ", license: "Executive", status: "Active" },
  { id: "USR-105", name: "Sunil Singh", email: "s.singh@steelco.com", role: "Maintenance Engineer", plantScope: "Rolling Mill 2", license: "Operations", status: "Active" },
  { id: "USR-106", name: "Pooja Nair", email: "p.nair@steelco.com", role: "Quality Auditor", plantScope: "Lab & Testing", license: "Read Only", status: "Active" },
];

function Page() {
  const [search, setSearch] = useState("");

  const filtered = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Platform"
        title="User & License Administration"
        description="Multi-plant user provisioning, role assignments, license allocation, and security credentials."
        actions={
          <Button size="sm">
            <Plus className="size-3.5" /> Provision New User
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Users" value="3,842" delta={5.2} hint="across 5 plants" icon={Users} />
        <StatCard label="Executive Licenses" value="120 / 150" hint="80% utilized" icon={UserCheck} />
        <StatCard label="Operations Licenses" value="2,450 / 2,500" hint="98% utilized" icon={Key} />
        <StatCard label="Roles Configured" value="48 Roles" hint="RBAC matrix" icon={Shield} />
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Configured Enterprise Users</h2>
        <div className="relative w-72">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-[#64748B]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name, role or email…"
            className="h-8 border-[#E2E8F0] bg-[#FFFFFF] pl-8 text-xs text-[#0F172A]"
          />
        </div>
      </div>

      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F1F5F9]">
              <TableHead className="font-bold text-[#0F172A]">User ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Full Name</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Enterprise Role</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Plant Facility Scope</TableHead>
              <TableHead className="font-bold text-[#0F172A]">License Tier</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => (
              <TableRow key={u.id} className="hover:bg-[#F1F5F9]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{u.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">
                  {u.name}
                  <p className="text-[10px] font-normal text-[#475569]">{u.email}</p>
                </TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{u.role}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{u.plantScope}</TableCell>
                <TableCell><Pill tone="primary">{u.license}</Pill></TableCell>
                <TableCell><Pill tone="success">{u.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
