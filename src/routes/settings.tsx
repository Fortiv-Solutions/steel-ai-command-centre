import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Building,
  Database,
  Globe,
  Lock,
  Save,
  Sliders,
} from "lucide-react";
import { PageHeader, Panel, StatCard } from "@/components/ui-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Platform Settings · Steel AI Command Center" },
      { name: "description", content: "Tenancy, plant scope, system limits, and global configuration." },
    ],
  }),
  component: Page,
});

function Page() {
  const [plantScope, setPlantScope] = useState("Integrated Plant 1 (Jamshedpur)");
  const [retentionDays, setRetentionDays] = useState("365");
  const [autoSignMtc, setAutoSignMtc] = useState(true);

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Platform"
        title="Platform & Multi-Plant Settings"
        description="System configuration, tenancy, data retention, and automated approval rules."
        actions={
          <Button size="sm">
            <Save className="size-3.5" /> Save Changes
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Plant Scope" value="5 Plants" hint="multi-tenancy" icon={Building} />
        <StatCard label="Data Retention" value="365 Days" hint="compliance audit" icon={Database} />
        <StatCard label="API Gateway" value="v2.4 Active" hint="100% uptime" icon={Globe} />
        <StatCard label="Security Protocol" value="TLS 1.3" hint="zero hardware" icon={Lock} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Multi-Plant Tenancy & Scope">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold text-[#1A1D20]">Default Plant Facility Scope</label>
              <Input
                value={plantScope}
                onChange={(e) => setPlantScope(e.target.value)}
                className="border-[#A6ACB6] bg-[#DCE0E6] text-xs font-bold text-[#1A1D20]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-[#1A1D20]">Data Retention (Days)</label>
              <Input
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                className="border-[#A6ACB6] bg-[#DCE0E6] text-xs font-bold text-[#1A1D20]"
              />
            </div>
          </div>
        </Panel>

        <Panel title="Automated Approval Rules">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-[#A6ACB6] bg-[#C8D0DC] p-3">
              <div>
                <p className="text-xs font-bold text-[#1A1D20]">Auto-Sign Mill Test Certificates</p>
                <p className="text-[10px] text-[#4A5059]">When chemical & mechanical properties match PO specs 100%</p>
              </div>
              <Button size="sm" variant={autoSignMtc ? "default" : "secondary"} onClick={() => setAutoSignMtc(!autoSignMtc)}>
                {autoSignMtc ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#A6ACB6] bg-[#C8D0DC] p-3">
              <div>
                <p className="text-xs font-bold text-[#1A1D20]">High Value Approval Threshold</p>
                <p className="text-[10px] text-[#4A5059]">Require Vice President approval for POs exceeding ₹1.0 Cr</p>
              </div>
              <span className="text-xs font-bold text-[#D95A00]">₹1.0 Cr</span>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
