import { useState } from "react";
import { CheckCircle2, ShieldCheck, Sparkles, Building, Mail, User, Phone, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AssessmentModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    plantType: "Integrated Steel Plant (Blast Furnace / EAF)",
    tonnage: "1,000,000 MT / year",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
    }, 4000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-[#E2E8F0] bg-[#FFFFFF] p-6 text-[#0F172A] sm:rounded-2xl shadow-xl">
        <DialogHeader>
          <div className="mb-2 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-[#F0F4FF] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0B1F4D] border border-[#0B1F4D]/20">
              <Sparkles className="size-3 text-[#0B1F4D]" /> FORTIV SOLUTIONS ENTERPRISE AI
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-[#0B1F4D]">
            Book Executive AI Readiness Assessment
          </DialogTitle>
          <DialogDescription className="text-xs text-[#64748B] leading-relaxed">
            Our manufacturing AI principals will perform a 3-day zero-hardware assessment of your steel plant functions to quantify exact EBITDA savings and pilot 3 production AI agents in 14 days.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="my-6 rounded-xl border border-[#059669]/30 bg-[#ECFDF5] p-5 text-center space-y-2">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#059669] text-white">
              <CheckCircle2 className="size-6" />
            </div>
            <h3 className="text-base font-bold text-[#047857]">Assessment Request Received</h3>
            <p className="text-xs text-[#065F46] max-w-xs mx-auto">
              A Fortiv Solutions Steel Manufacturing Partner will contact your executive office within 4 business hours with custom ROI estimates.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div>
              <label className="mb-1 block text-xs font-bold text-[#0F172A]">Full Name & Executive Title</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Aaditya Verma, VP Operations"
                  className="h-9 border-[#E2E8F0] bg-[#FFFFFF] pl-9 text-xs text-[#0F172A]"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#0F172A]">Corporate Work Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="a.verma@steelco.com"
                    className="h-9 border-[#E2E8F0] bg-[#FFFFFF] pl-9 text-xs text-[#0F172A]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#0F172A]">Direct Phone / Mobile</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="h-9 border-[#E2E8F0] bg-[#FFFFFF] pl-9 text-xs text-[#0F172A]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-[#0F172A]">Company / Steel Enterprise Name</label>
              <div className="relative">
                <Building className="pointer-events-none absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
                <Input
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. SteelCo Industries Ltd"
                  className="h-9 border-[#E2E8F0] bg-[#FFFFFF] pl-9 text-xs text-[#0F172A]"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#0F172A]">Plant Facility Type</label>
                <select
                  value={formData.plantType}
                  onChange={(e) => setFormData({ ...formData, plantType: e.target.value })}
                  className="h-9 w-full rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-xs text-[#0F172A] font-semibold"
                >
                  <option>Integrated Steel Plant (Blast Furnace / EAF)</option>
                  <option>Mini-Mill & Induction Furnace</option>
                  <option>Rebar & Rolling Mill Facility</option>
                  <option>Specialty Alloy & Stainless Steel Mill</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-[#0F172A]">Annual Steel Capacity</label>
                <select
                  value={formData.tonnage}
                  onChange={(e) => setFormData({ ...formData, tonnage: e.target.value })}
                  className="h-9 w-full rounded-md border border-[#E2E8F0] bg-[#FFFFFF] px-3 text-xs text-[#0F172A] font-semibold"
                >
                  <option>250,000 - 500,000 MT / year</option>
                  <option>500,000 - 1,500,000 MT / year</option>
                  <option>1,500,000 - 5,000,000 MT / year</option>
                  <option>5,000,000+ MT / year</option>
                </select>
              </div>
            </div>

            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-[11px] text-[#64748B] flex items-center gap-2">
              <ShieldCheck className="size-4 text-[#059669] shrink-0" />
              <span>100% NDA protected. Zero hardware required. Software-only integration over standard REST/OData APIs.</span>
            </div>

            <Button type="submit" size="lg" className="w-full bg-[#0B1F4D] text-white hover:bg-[#081636] font-bold">
              <span>Submit Assessment Request</span>
              <ArrowRight className="size-4" />
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
