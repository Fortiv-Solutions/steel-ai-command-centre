import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Filter,
  ListTodo,
  Plus,
  Search,
  User,
} from "lucide-react";
import { PageHeader, Pill, StatCard, statusTone } from "@/components/ui-kit";
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

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Task Orchestration · Steel AI Command Center" },
      { name: "description", content: "Accountable task queue across 43 steel manufacturing business functions." },
    ],
  }),
  component: Page,
});

type TaskItem = {
  id: string;
  title: string;
  department: string;
  assignee: string;
  priority: "P1" | "P2" | "P3";
  status: "In Progress" | "Pending Review" | "Backlog" | "Completed";
  dueDate: string;
  source: "AI Agent" | "Workflow" | "Human";
};

const initialTasks: TaskItem[] = [
  { id: "TSK-8812", title: "Approve 304L Heat Chemistry Variance for Order #4921", department: "Quality Control", assignee: "Dr. R. Sharma", priority: "P1", status: "In Progress", dueDate: "Today, 18:00", source: "AI Agent" },
  { id: "TSK-8813", title: "Verify Railway Rake #NDLS-04 Customs Clearance Documents", department: "Logistics", assignee: "V. Kumar", priority: "P1", status: "Pending Review", dueDate: "Today, 19:30", source: "Workflow" },
  { id: "TSK-8814", title: "Reconcile EAF Unit 1 Energy Tariff Discount Invoice", department: "Finance", assignee: "A. Patel", priority: "P2", status: "In Progress", dueDate: "Tomorrow, 12:00", source: "Human" },
  { id: "TSK-8815", title: "Inspect Ladle Refractory Wear Score at Bay 2", department: "Melt Shop Maintenance", assignee: "S. Singh", priority: "P1", status: "Pending Review", dueDate: "Tomorrow, 15:00", source: "AI Agent" },
  { id: "TSK-8816", title: "Update Rate Contract for Heavy Melting Scrap Supplier", department: "Procurement", assignee: "M. Verma", priority: "P3", status: "Backlog", dueDate: "08 Aug 2026", source: "Human" },
  { id: "TSK-8817", title: "Issue Digital MTC #8894 for Jindal Infra Beam Order", department: "Quality Control", assignee: "P. Nair", priority: "P2", status: "Completed", dueDate: "Yesterday", source: "Workflow" },
  { id: "TSK-8818", title: "Calibrate Spectrometry Gas Analyzer Oxygen Channel", department: "Lab Operations", assignee: "K. Das", priority: "P2", status: "In Progress", dueDate: "06 Aug 2026", source: "AI Agent" },
];

function Page() {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filtered = initialTasks.filter((t) => {
    const matchesFilter = filter === "All" || t.status === filter;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Enterprise Task Orchestration"
        description="Accountable task queue across 43 business functions with SLA tracking. Zero charts required."
        actions={
          <Button size="sm">
            <Plus className="size-3.5" /> Create Task
          </Button>
        }
      />

      {/* Task KPIs */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open Tasks" value="842" delta={-6.1} hint="across 43 depts" icon={ListTodo} />
        <StatCard label="AI Generated" value="61%" delta={8.4} hint="workflow triggers" icon={CheckCircle2} />
        <StatCard label="Overdue Tasks" value="37" delta={-14.2} hint="SLA breach alerts" icon={Clock} />
        <StatCard label="Avg Resolution" value="2.1 days" delta={-18.6} hint="100% accountable" icon={CheckCircle2} />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#A6ACB6] bg-[#E4E8EE] p-3">
        <div className="flex flex-wrap gap-1.5">
          {["All", "In Progress", "Pending Review", "Backlog", "Completed"].map((s) => (
            <Button
              key={s}
              size="sm"
              variant={filter === s ? "default" : "secondary"}
              onClick={() => setFilter(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <div className="relative w-72">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-[#4A5059]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter tasks by title or ID…"
            className="h-8 border-[#A6ACB6] bg-[#DCE0E6] pl-8 text-xs text-[#1A1D20]"
          />
        </div>
      </div>

      {/* Task List Table */}
      <div className="rounded-xl border border-[#A6ACB6] bg-[#E4E8EE]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#DCE0E6]">
              <TableHead className="font-bold text-[#1A1D20]">Task ID</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Task Description</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Department</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Assignee</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Priority</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Status</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Source</TableHead>
              <TableHead className="font-bold text-[#1A1D20]">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((t) => (
              <TableRow key={t.id} className="hover:bg-[#C8D0DC]">
                <TableCell className="font-mono text-xs font-bold text-[#D95A00]">{t.id}</TableCell>
                <TableCell className="max-w-md text-xs font-bold text-[#1A1D20]">{t.title}</TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{t.department}</TableCell>
                <TableCell className="text-xs font-bold text-[#1A1D20] flex items-center gap-1.5 py-3">
                  <User className="size-3 text-[#7A808A]" />
                  <span>{t.assignee}</span>
                </TableCell>
                <TableCell>
                  <Pill tone={t.priority === "P1" ? "destructive" : t.priority === "P2" ? "warning" : "neutral"}>
                    {t.priority}
                  </Pill>
                </TableCell>
                <TableCell>
                  <Pill tone={statusTone(t.status)}>{t.status}</Pill>
                </TableCell>
                <TableCell className="text-xs font-semibold text-[#4A5059]">{t.source}</TableCell>
                <TableCell className="text-xs font-bold text-[#4A5059]">{t.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
