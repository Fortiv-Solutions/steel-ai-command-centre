import { createFileRoute } from "@tanstack/react-router";
import { ModuleWorkspace } from "@/components/ModuleWorkspace";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Enterprise analytics workbench \u00b7 Steel AI Command Center" },
      { name: "description", content: "Executive, AI, financial, commercial, quality, procurement, inventory, customer, risk and predictive analytics on one governed semantic layer." },
      { property: "og:title", content: "Enterprise analytics workbench \u00b7 Steel AI Command Center" },
      { property: "og:description", content: "Executive, AI, financial, commercial, quality, procurement, inventory, customer, risk and predictive analytics on one governed semantic layer." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ModuleWorkspace
      eyebrow={"Analytics"}
      title={"Enterprise analytics workbench"}
      description={"Executive, AI, financial, commercial, quality, procurement, inventory, customer, risk and predictive analytics on one governed semantic layer."}
      matchDepartments={["Costing", "Strategy", "IT & Digital"]}
      kpis={[{"label": "Dashboards", "value": "148", "delta": 12}, {"label": "Models in use", "value": "26", "delta": 3, "hint": "predictive"}, {"label": "Data freshness", "value": "4 min", "delta": -32.0, "hint": "median lag"}, {"label": "Self-serve users", "value": "1,284", "delta": 184}]}
    />
  );
}
