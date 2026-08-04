import { createFileRoute } from "@tanstack/react-router";
import { ModuleWorkspace } from "@/components/ModuleWorkspace";

export const Route = createFileRoute("/automation")({
  head: () => ({
    meta: [
      { title: "231 AI automation opportunities · Steel AI Command Center" },
      { name: "description", content: "Every opportunity carries business function, ROI, hours saved, annual savings, complexity, priority, dependencies, status, timeline, owner, KPIs and the AI te" },
      { property: "og:title", content: "231 AI automation opportunities · Steel AI Command Center" },
      { property: "og:description", content: "Every opportunity carries business function, ROI, hours saved, annual savings, complexity, priority, dependencies, status, timeline, owner, KPIs and the AI te" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ModuleWorkspace
      eyebrow={"Automation Center"}
      title={"231 AI automation opportunities"}
      description={"Every opportunity carries business function, ROI, hours saved, annual savings, complexity, priority, dependencies, status, timeline, owner, KPIs and the AI technologies used."}
      matchDepartments={[""]}
      kpis={[{"label": "Opportunities", "value": "231", "delta": 11, "hint": "blueprint scope"}, {"label": "Live", "value": "61", "delta": 6, "hint": "in production"}, {"label": "Hours saved / yr", "value": "412,600", "delta": 9.8}, {"label": "Annual savings", "value": "₹51.7 Cr", "delta": 11.2}]}
    />
  );
}
