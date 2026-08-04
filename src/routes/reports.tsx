import { createFileRoute } from "@tanstack/react-router";
import { ModuleWorkspace } from "@/components/ModuleWorkspace";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Report factory \u00b7 Steel AI Command Center" },
      { name: "description", content: "Daily, weekly, monthly, quarterly and annual packs plus board, MIS, sales, quality, finance, dispatch, procurement, HR, compliance and AI reports \u2014 assembled " },
      { property: "og:title", content: "Report factory \u00b7 Steel AI Command Center" },
      { property: "og:description", content: "Daily, weekly, monthly, quarterly and annual packs plus board, MIS, sales, quality, finance, dispatch, procurement, HR, compliance and AI reports \u2014 assembled " },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ModuleWorkspace
      eyebrow={"Executive Reports"}
      title={"Report factory"}
      description={"Daily, weekly, monthly, quarterly and annual packs plus board, MIS, sales, quality, finance, dispatch, procurement, HR, compliance and AI reports — assembled and narrated automatically."}
      matchDepartments={["Costing", "Strategy", "Board"]}
      kpis={[{"label": "Report packs", "value": "212", "delta": 8, "hint": "scheduled"}, {"label": "Auto-generated", "value": "96%", "delta": 5.2}, {"label": "Avg prep time", "value": "11 min", "delta": -88.0, "hint": "was 1.5 days"}, {"label": "Distribution lists", "value": "64", "delta": 4}]}
    />
  );
}
