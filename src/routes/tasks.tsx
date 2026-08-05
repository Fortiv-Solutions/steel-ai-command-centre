import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ListTodo,
  Plus,
  Zap,
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

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Task Center & Action Items · Steel AI Command Center" },
      { name: "description", content: "Plant tasks, maintenance work orders, quality checks, and AI assigned action items." },
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
  dueDate: string;
  status: "In Progress" | "Pending Review" | "Completed";
};

const tasksData: TaskItem[] = [
  { id: "TSK-301", title: "Recalibrate Bar Mill 2 Laser Sizing Sensor", department: "Rolling Mill", assignee: "Sunil Singh", priority: "P1", dueDate: "Today 16:00", status: "In Progress" },
  { id: "TSK-302", title: "Verify Spectro Calibration for 304L Heat #H-4921", department: "Quality Lab", assignee: "Dr. Rajesh Sharma", priority: "P2", dueDate: "Today 18:00", status: "Pending Review" },
  { id: "TSK-303", title: "Review Railway Rake 04 Dispatch Clearance Documents", department: "Logistics", assignee: "Vikram Kumar", priority: "P1", dueDate: "Today 14:00", status: "Completed" },
  { id: "TSK-304", title: "Inspect EAF Unit 1 Ladle Relining Brick Thickness", department: "Maintenance", assignee: "Aaditya Verma", priority: "P2", dueDate: "Tomorrow 10:00", status: "In Progress" },
];

function Page() {
  const [filter, setFilter] = useState("All");

  const filtered = tasksData.filter((t) => {
    if (filter === "All") return true;
    if (filter === "High Priority") return t.priority === "P1";
    if (filter === "In Progress") return t.status === "In Progress";
    return true;
  });

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Operations"
        title="Plant Task & Maintenance Work Order Center"
        description="Assigned action items, preventive maintenance work orders, lab test tasks, and AI copilot task execution."
        actions={
          <Button size="sm">
            <Plus className="size-3.5" /> Create Task
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Tasks" value="142 Tasks" delta={-8} hint="across 43 depts" icon={ListTodo} />
        <StatCard label="High Priority (P1)" value="12 Critical" hint="sub-4h SLA" icon={Clock} />
        <StatCard label="AI Assigned Tasks" value="68 Tasks" delta={14.2} hint="auto-generated" icon={Zap} />
        <StatCard label="Completed (30d)" value="1,840 Signed" delta={9.2} hint="100% verified" icon={CheckCircle2} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">Plant Action Item Queue</h2>
        <div className="flex gap-1.5">
          {["All", "High Priority", "In Progress"].map((f) => (
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

      <Panel title="Action Item Register & Work Order Queue" bare>
        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFFFFF]">
              <TableHead className="font-bold text-[#0F172A]">Task ID</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Task Description</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Department</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Assignee</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Priority</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Due Date</TableHead>
              <TableHead className="font-bold text-[#0F172A]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((t) => (
              <TableRow key={t.id} className="hover:bg-[#FFFFFF]">
                <TableCell className="font-mono text-xs font-bold text-[#E05600]">{t.id}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{t.title}</TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{t.department}</TableCell>
                <TableCell className="text-xs font-bold text-[#0F172A]">{t.assignee}</TableCell>
                <TableCell>
                  <Pill tone={t.priority === "P1" ? "destructive" : "warning"}>{t.priority}</Pill>
                </TableCell>
                <TableCell className="text-xs font-semibold text-[#475569]">{t.dueDate}</TableCell>
                <TableCell><Pill tone={statusTone(t.status)}>{t.status}</Pill></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    </div>
  );
}
