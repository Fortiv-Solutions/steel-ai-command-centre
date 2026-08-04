import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ModuleWorkspace } from "@/components/ModuleWorkspace";
import { departmentBySlug, inr } from "@/lib/data";

export const Route = createFileRoute("/departments/$slug")({
  loader: ({ params }) => {
    const department = departmentBySlug(params.slug);
    if (!department) throw notFound();
    return { department };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.department.name ?? "Department"} · Steel AI Command Center` },
      {
        name: "description",
        content: `AI workspace for ${loaderData?.department.name ?? "this business function"}: copilot, agents, workflows, approvals, documents and automation backlog.`,
      },
      {
        property: "og:title",
        content: `${loaderData?.department.name ?? "Department"} · Steel AI Command Center`,
      },
      {
        property: "og:description",
        content: "Departmental AI workspace with copilot, agents, workflows and analytics.",
      },
    ],
  }),
  component: DepartmentDetail,
});

function DepartmentDetail() {
  const { department } = Route.useLoaderData();

  return (
    <div>
      <Link
        to="/departments"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Department Center
      </Link>
      <ModuleWorkspace
        eyebrow={`${department.cluster} · ${department.maturity}`}
        title={department.name}
        description={`${department.copilot} serves ${department.headcount} people with ${department.agents} dedicated agents and ${department.automations} mapped automations, delivering ${inr(department.annualSavings)} of annualised value.`}
        matchDepartments={[department.name]}
        kpis={department.kpis.map((k: { label: string; value: string; delta: number }) => ({
          label: k.label,
          value: k.value,
          delta: k.delta,
        }))}
      />
    </div>
  );
}
