import { createFileRoute } from "@tanstack/react-router";
import { ModuleWorkspace } from "@/components/ModuleWorkspace";

export const Route = createFileRoute("/workflow-studio")({
  head: () => ({
    meta: [
      { title: "No-code enterprise workflow orchestration · Steel AI Command Center" },
      { name: "description", content: "Compose AI, ERP, email, SQL, API, OCR, document AI, approval, notification, schedule, condition, loop, webhook, LLM and Company Brain nodes into governed end-" },
      { property: "og:title", content: "No-code enterprise workflow orchestration · Steel AI Command Center" },
      { property: "og:description", content: "Compose AI, ERP, email, SQL, API, OCR, document AI, approval, notification, schedule, condition, loop, webhook, LLM and Company Brain nodes into governed end-" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <ModuleWorkspace
      eyebrow={"Workflow Studio"}
      title={"No-code enterprise workflow orchestration"}
      description={"Compose AI, ERP, email, SQL, API, OCR, document AI, approval, notification, schedule, condition, loop, webhook, LLM and Company Brain nodes into governed end-to-end processes."}
      matchDepartments={["Quality", "Sales", "Accounts", "Dispatch", "Tendering", "Human"]}
      kpis={[{"label": "Workflows", "value": "312", "delta": 18, "hint": "running"}, {"label": "Executions / month", "value": "96,400", "delta": 14.2}, {"label": "Success rate", "value": "98.1%", "delta": 0.6}, {"label": "Human approval steps", "value": "1,284", "hint": "in-loop"}]}
    />
  );
}
