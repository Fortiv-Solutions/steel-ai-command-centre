import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  CheckCircle2,
  Globe,
  Lock,
  Save,
  Settings2,
  Sliders,
} from "lucide-react";
import { PageHeader, Panel } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Platform Settings · Steel AI Command Center" },
      { name: "description", content: "Platform preferences, default plant scope, notification rules, and API configurations." },
    ],
  }),
  component: Page,
});

function Page() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Platform"
        title="Platform & Operating System Settings"
        description="Configure default steel plant facility scope, AI notification threshold rules, system themes, and API credentials."
        actions={
          <Button size="sm" onClick={handleSave}>
            <Save className="size-3.5" /> Save Changes
          </Button>
        }
      />

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-[#FDBA74] bg-[#FFF7ED] p-3 text-xs font-bold text-[#E05600]">
          <CheckCircle2 className="size-4" /> Platform settings updated successfully!
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Plant Scope & Regional Preferences">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-[#0F172A]">Default Plant Facility Scope</label>
              <Input defaultValue="Integrated Plant · Angul" className="h-9 border-[#E2E8F0] bg-[#FFFFFF] text-xs text-[#0F172A]" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-[#0F172A]">Currency & Unit System</label>
              <Input defaultValue="INR (₹) · Metric Tonnes (MT) · Celsius (°C)" className="h-9 border-[#E2E8F0] bg-[#FFFFFF] text-xs text-[#0F172A]" />
            </div>
          </div>
        </Panel>

        <Panel title="AI Copilot & Approval Thresholds">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-[#0F172A]">Human Signoff Approval Threshold</label>
              <Input defaultValue="₹1,00,00,000 (₹1.0 Crore)" className="h-9 border-[#E2E8F0] bg-[#FFFFFF] text-xs text-[#0F172A]" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-[#0F172A]">AI RAG Minimum Confidence Threshold</label>
              <Input defaultValue="90% Confidence Score" className="h-9 border-[#E2E8F0] bg-[#FFFFFF] text-xs text-[#0F172A]" />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
