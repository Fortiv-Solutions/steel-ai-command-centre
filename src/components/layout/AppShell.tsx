import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  CircleDot,
  Menu,
  Sparkles,
  X,
  Calculator,
  CalendarCheck,
  Building2,
  Bot,
  Brain,
  Zap,
  Shield,
  Calendar,
  LayoutDashboard,
  Crown,
} from "lucide-react";
import { plants } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AskAiPanel } from "./AskAiPanel";
import { ModuleControlHub } from "./ModuleControlHub";
import { AssessmentModal } from "@/components/AssessmentModal";
import { RoiCalculatorModal } from "@/components/RoiCalculatorModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Top Bar Main Navigation Items
const topNavTabs = [
  { label: "Overview", fullLabel: "Executive Overview", to: "/", icon: LayoutDashboard },
  { label: "AI Agents", fullLabel: "AI Agents", to: "/agents", icon: Bot },
  { label: "Departments", fullLabel: "Departments", to: "/departments", icon: Building2 },
  { label: "Company Brain", fullLabel: "Company Brain", to: "/company-brain", icon: Brain },
  { label: "Workflows", fullLabel: "AI Workflows", to: "/automation", icon: Zap },
  { label: "ROI", fullLabel: "ROI Dashboard", to: "/cockpit", icon: Crown },
  { label: "Security", fullLabel: "Security", to: "/security", icon: Shield },
  { label: "Roadmap", fullLabel: "Roadmap", to: "/reports", icon: Calendar },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [roiOpen, setRoiOpen] = useState(false);
  const [plant, setPlant] = useState("Anand Plant");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      {/* TOP NAVIGATION: 3 DISTINCT FLOATING CARDS WITH IDENTICAL UNIFIED HEIGHT (52px) */}
      <header className="sticky top-3.5 z-40 mx-auto w-full max-w-[1800px] px-4 lg:px-6">
        <div className="flex items-center justify-between gap-3">
          
          {/* 1. LEFT CARD: Brand Card */}
          <div className="flex h-13 items-center gap-3 rounded-[24px] border border-[#E2E8F0] bg-[#FFFFFF] px-4 shadow-md shrink-0">
            <Link to="/" className="flex items-center gap-2.5 min-w-0">
              <img src="/logo.png" alt="Steel AI Logo" className="size-8 rounded-full object-contain shadow-sm" />
              <div className="min-w-0 hidden sm:block">
                <p className="truncate text-xs font-extrabold uppercase tracking-wider text-[#0F172A] leading-none">
                  STEEL AI OS
                </p>
                <p className="truncate text-[10px] font-semibold text-[#64748B] mt-0.5">
                  Fortiv Solutions
                </p>
              </div>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="ml-1 grid size-8 place-items-center rounded-full border border-[#E2E8F0] text-[#0F172A] lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>

          {/* 2. CENTER CARD: Navigation Pill */}
          <nav className="hidden h-13 items-center gap-1 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-2 shadow-md lg:flex shrink min-w-0 overflow-x-auto">
            {topNavTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive =
                tab.to === "/"
                  ? pathname === "/"
                  : pathname.startsWith(tab.to);

              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  title={tab.fullLabel}
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-full px-3.5 text-xs font-extrabold transition-all duration-150 whitespace-nowrap",
                    isActive
                      ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                      : "text-[#475569] hover:bg-[#F1F5F9] hover:text-[#2563EB]",
                  )}
                >
                  <TabIcon className={cn("size-3.5", isActive ? "text-white" : "text-[#64748B]")} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT CARD: Utility Actions Card */}
          <div className="flex h-13 items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] px-3 shadow-md shrink-0">
            {/* Ask AI CTA */}
            <Button
              size="sm"
              onClick={() => setAskOpen(true)}
              className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-extrabold text-xs px-3.5 h-8 rounded-full shadow-md shadow-[#2563EB]/20"
            >
              <Sparkles className="size-3.5 text-white" />
              <span>Ask AI</span>
            </Button>

            {/* ROI Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRoiOpen(true)}
              className="bg-[#FFFFFF] text-[#1D4ED8] border border-[#E2E8F0] hover:bg-[#EFF6FF] font-extrabold text-xs px-3 h-8 rounded-full"
            >
              <Calculator className="size-3.5 text-[#2563EB]" />
              <span>ROI</span>
            </Button>

            {/* Compact Plant Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden xl:flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 h-8 text-[11px] font-extrabold text-[#0F172A] hover:border-[#2563EB] transition-colors max-w-[135px]">
                <span className="text-[11px]">🏭</span>
                <span className="truncate flex-1 text-left">{plant.replace(" Plant", "").replace(" Manufacturing Unit", "")}</span>
                <ChevronDown className="size-3 text-[#64748B] shrink-0" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 border-[#E2E8F0] bg-[#FFFFFF] rounded-2xl p-2 shadow-lg">
                <DropdownMenuLabel className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider">
                  Select Steel Facility
                </DropdownMenuLabel>
                {plants.map((p) => {
                  const shortName = p.split("-")[0]?.trim() || p;
                  return (
                    <DropdownMenuItem
                      key={p}
                      className="rounded-xl text-xs font-bold text-[#0F172A] hover:bg-[#F1F5F9]"
                      onClick={() => setPlant(shortName)}
                    >
                      🏭 {shortName}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications Bell */}
            <button
              title="Notifications"
              className="relative grid size-8 place-items-center rounded-full border border-[#E2E8F0] bg-[#FFFFFF] text-[#64748B] transition-colors hover:text-[#2563EB] hover:bg-[#F1F5F9]"
            >
              <Bell className="size-3.5" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#2563EB]" />
            </button>

            {/* User Profile Avatar */}
            <div className="grid size-8 place-items-center rounded-full border border-[#2563EB]/20 bg-[#EFF6FF] text-xs font-extrabold text-[#1D4ED8]">
              AV
            </div>
          </div>

        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex w-[280px] flex-col border-r border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-2xl z-50 rounded-r-3xl">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="Steel AI Logo" className="size-8 rounded-full object-contain shadow-sm" />
                <div>
                  <p className="truncate text-xs font-extrabold text-[#0F172A]">Steel AI OS</p>
                  <p className="truncate text-[10px] text-[#64748B]">Fortiv Solutions</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="grid size-8 place-items-center rounded-full text-[#64748B]">
                <X className="size-5" />
              </button>
            </div>

            <nav className="mt-4 space-y-1.5 overflow-y-auto">
              {topNavTabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = tab.to === "/" ? pathname === "/" : pathname.startsWith(tab.to);
                return (
                  <Link
                    key={tab.to}
                    to={tab.to}
                    className={cn(
                      "flex items-center gap-3 rounded-full px-4 py-2.5 text-xs font-bold transition-all",
                      isActive
                        ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                        : "text-[#475569] hover:bg-[#F1F5F9]",
                    )}
                  >
                    <TabIcon className="size-4" />
                    <span>{tab.fullLabel}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-[#E2E8F0] pt-4 space-y-2">
              <Button
                size="sm"
                className="w-full bg-[#2563EB] text-white font-bold rounded-full"
                onClick={() => setAskOpen(true)}
              >
                <Sparkles className="size-4" /> Ask Enterprise AI
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full font-bold rounded-full"
                onClick={() => setAssessmentOpen(true)}
              >
                <CalendarCheck className="size-4" /> Book Readiness Assessment
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* EXPANDED FULL-WIDTH MAIN CONTENT VIEWPORT */}
      <main className="mx-auto w-full max-w-[1800px] px-4 lg:px-6 py-5">
        {/* Secondary Module Header Navigation */}
        <ModuleControlHub />
        {children}
      </main>

      {/* ENTERPRISE FOOTER */}
      <footer className="mt-12 border-t border-[#E2E8F0] bg-[#FFFFFF] py-6 text-xs text-[#64748B]">
        <div className="mx-auto w-full max-w-[1800px] px-4 lg:px-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <strong>Fortiv Solutions Enterprise Steel AI OS</strong> · 43 business functions · 231 automations · 58 AI agents
          </div>
          <div className="flex gap-4 text-[11px] font-bold text-[#475569]">
            <span>SOC 2 Type II Certified</span>
            <span>·</span>
            <span>Software-Only AI</span>
            <span>·</span>
            <span>Zero Hardware OS</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <AskAiPanel open={askOpen} onOpenChange={setAskOpen} />
      <AssessmentModal open={assessmentOpen} onOpenChange={setAssessmentOpen} />
      <RoiCalculatorModal
        open={roiOpen}
        onOpenChange={setRoiOpen}
        onOpenAssessment={() => setAssessmentOpen(true)}
      />
    </div>
  );
}
