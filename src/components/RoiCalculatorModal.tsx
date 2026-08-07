import { useState } from "react";
import { Calculator, ArrowRight, TrendingUp, Zap, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function RoiCalculatorModal({
  open,
  onOpenChange,
  onOpenAssessment,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onOpenAssessment: () => void;
}) {
  const [capacity, setCapacity] = useState(1000000); // 1 million MT/yr default
  const [powerCost, setPowerCost] = useState(7.5); // ₹7.5 / kWh

  // Calculations based on Fortiv Solutions Steel Enterprise Benchmarks
  const annualScrapSavings = Math.round((capacity * 180) / 10000000); // ₹ Cr from scrap linear solver (~₹180/ton)
  const annualEnergySavings = Math.round((capacity * 485 * 0.035 * powerCost) / 10000000); // ~3.5% power optimization
  const annualDemurrageSavings = Math.round((capacity * 58) / 10000000); // Rake turnaround delay reduction
  const annualFteSavings = Math.round((capacity / 25000) * 12) / 10; // FTE equivalent hours automated
  const totalAnnualSavings = annualScrapSavings + annualEnergySavings + annualDemurrageSavings + Math.round(annualFteSavings * 0.8);
  const projectedRoi = ((totalAnnualSavings * 10000000) / 7500000).toFixed(1); // vs platform implementation cost

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-[#E2E8F0] bg-[#FFFFFF] p-6 text-[#0F172A] sm:rounded-2xl shadow-xl">
        <DialogHeader>
          <div className="mb-1 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-[#F0F4FF] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0B1F4D] border border-[#0B1F4D]/20">
              <Calculator className="size-3 text-[#0B1F4D]" /> STEEL ENTERPRISE ROI ESTIMATOR
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-[#0B1F4D]">
            Calculate Your Steel Enterprise AI Value Realization
          </DialogTitle>
          <DialogDescription className="text-xs text-[#64748B]">
            Adjust your annual liquid steel production capacity and power tariff to project estimated annual EBITDA savings across 231 proven AI use cases.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {/* Sliders */}
          <div className="grid gap-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-bold text-[#0F172A]">Annual Steel Production Capacity</label>
                <span className="rounded bg-[#0B1F4D] px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                  {(capacity / 1000000).toFixed(2)} Million MT / year
                </span>
              </div>
              <input
                type="range"
                min={250000}
                max={5000000}
                step={50000}
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-[#0B1F4D]"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#64748B] font-semibold">
                <span>250,000 MT (Mini-Mill)</span>
                <span>2.5M MT (Mid-Size)</span>
                <span>5,000,000 MT (Integrated Mega-Plant)</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-bold text-[#0F172A]">Grid Power Tariff (EAF Electricity)</label>
                <span className="rounded bg-[#0284C7] px-2.5 py-0.5 font-mono text-xs font-bold text-white">
                  ₹{powerCost.toFixed(1)} / kWh
                </span>
              </div>
              <input
                type="range"
                min={5.0}
                max={12.0}
                step={0.5}
                value={powerCost}
                onChange={(e) => setPowerCost(Number(e.target.value))}
                className="h-2 w-full cursor-pointer accent-[#0284C7]"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#64748B] font-semibold">
                <span>₹5.0/kWh (Subsidized)</span>
                <span>₹7.5/kWh (Standard)</span>
                <span>₹12.0/kWh (Peak Tariff)</span>
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="rounded-xl border border-[#0B1F4D]/20 bg-[#F0F4FF] p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0B1F4D]/15 pb-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#0B1F4D]">
                  TOTAL ESTIMATED ANNUAL SAVINGS
                </p>
                <p className="text-3xl font-extrabold text-[#0B1F4D] tracking-tight mt-0.5">
                  ₹{totalAnnualSavings.toLocaleString()} Crore <span className="text-xs font-normal text-[#475569]">/ year</span>
                </p>
              </div>
              <div className="rounded-lg bg-[#059669] px-3.5 py-2 text-white text-center shadow-sm">
                <p className="text-[10px] font-extrabold uppercase tracking-wider">PROJECTED ROI</p>
                <p className="text-xl font-extrabold tabular-nums">{projectedRoi}x</p>
              </div>
            </div>

            {/* Savings Breakdown */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs">
              <div className="rounded-lg bg-[#FFFFFF] p-2.5 border border-[#E2E8F0]">
                <p className="text-[10px] font-bold text-[#64748B] uppercase">Scrap Mix & Additive</p>
                <p className="mt-1 font-bold text-[#0B1F4D] text-sm">₹{annualScrapSavings} Cr</p>
                <p className="text-[9px] text-[#059669] font-semibold mt-0.5">Linear Solver</p>
              </div>

              <div className="rounded-lg bg-[#FFFFFF] p-2.5 border border-[#E2E8F0]">
                <p className="text-[10px] font-bold text-[#64748B] uppercase">Power Efficiency</p>
                <p className="mt-1 font-bold text-[#0B1F4D] text-sm">₹{annualEnergySavings} Cr</p>
                <p className="text-[9px] text-[#059669] font-semibold mt-0.5">3.5% Power Reduction</p>
              </div>

              <div className="rounded-lg bg-[#FFFFFF] p-2.5 border border-[#E2E8F0]">
                <p className="text-[10px] font-bold text-[#64748B] uppercase">Rake Demurrage</p>
                <p className="mt-1 font-bold text-[#0B1F4D] text-sm">₹{annualDemurrageSavings} Cr</p>
                <p className="text-[9px] text-[#059669] font-semibold mt-0.5">Zero Detention</p>
              </div>

              <div className="rounded-lg bg-[#FFFFFF] p-2.5 border border-[#E2E8F0]">
                <p className="text-[10px] font-bold text-[#64748B] uppercase">FTE Productivity</p>
                <p className="mt-1 font-bold text-[#0B1F4D] text-sm">{annualFteSavings} FTEs</p>
                <p className="text-[9px] text-[#059669] font-semibold mt-0.5">Automated Workflows</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-semibold">
              <ShieldCheck className="size-4 text-[#059669]" />
              <span>Grounded on 43 steel plant deployments. Zero hardware cost.</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button
                size="sm"
                className="bg-[#0B1F4D] text-white hover:bg-[#081636]"
                onClick={() => {
                  onOpenChange(false);
                  onOpenAssessment();
                }}
              >
                <span>Book Readiness Assessment</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
