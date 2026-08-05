import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  CircleDot,
  Flame,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { navGroups } from "@/lib/nav";
import { plants } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AskAiPanel } from "./AskAiPanel";
import { ModuleControlHub } from "./ModuleControlHub";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const workspacePrimaryRoutes: Record<string, string> = {
  EXECUTIVE: "/",
  "AI & AUTOMATION": "/agents",
  KNOWLEDGE: "/company-brain",
  OPERATIONS: "/departments",
  MANUFACTURING: "/heat-intelligence",
  BUSINESS: "/customers",
  PLATFORM: "/integrations",
};

const workspaceSubtitles: Record<string, string> = {
  EXECUTIVE: "Dashboard & Executive Cockpit",
  "AI & AUTOMATION": "AI Agents, Copilots & Automations",
  KNOWLEDGE: "Company Brain & Documents",
  OPERATIONS: "Departments, Projects & Quality",
  MANUFACTURING: "Heat, MTC, Materials & Logistics",
  BUSINESS: "Customers, Vendors & Finance",
  PLATFORM: "Integrations, Security & Governance",
};

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [plant, setPlant] = useState(plants[0]!);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const groups = useMemo(() => {
    if (!query.trim()) return navGroups;
    const q = query.toLowerCase();
    return navGroups.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        (workspaceSubtitles[g.title] || "").toLowerCase().includes(q) ||
        g.items.some((i) => i.label.toLowerCase().includes(q)),
    );
  }, [query]);

  const renderNavItems = (isCollapsedState: boolean) => {
    if (isCollapsedState) {
      return (
        <nav className="flex-1 space-y-2.5 overflow-y-auto px-2 py-4">
          {navGroups.map((group) => {
            const GroupIcon = group.icon;
            const primaryRoute = workspacePrimaryRoutes[group.title] || group.items[0]?.to || "/";
            const hasActiveItem = group.items.some((i) =>
              i.to === "/" ? pathname === "/" : pathname.startsWith(i.to),
            );

            return (
              <div key={group.title} className="group relative text-center">
                <Link
                  to={primaryRoute}
                  title={`Workspace: ${group.title}`}
                  className={cn(
                    "mx-auto flex size-10 items-center justify-center rounded-xl text-[#64748B] transition-all hover:bg-[#FFF7ED] hover:text-[#E05600]",
                    hasActiveItem &&
                      "bg-[#FFF7ED] text-[#E05600] border-2 border-[#E05600] font-bold shadow-sm",
                  )}
                >
                  <GroupIcon className={cn("size-5", hasActiveItem && "text-[#E05600]")} />
                </Link>
                <span className="mt-0.5 block text-[9px] font-extrabold uppercase tracking-tight text-[#64748B]">
                  {group.title.slice(0, 4)}
                </span>
              </div>
            );
          })}
        </nav>
      );
    }

    return (
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-3">
        <p className="px-1 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8]">
          MAIN MODULES
        </p>

        {groups.map((group) => {
          const GroupIcon = group.icon;
          const primaryRoute = workspacePrimaryRoutes[group.title] || group.items[0]?.to || "/";
          const hasActiveItem = group.items.some((i) =>
            i.to === "/" ? pathname === "/" : pathname.startsWith(i.to),
          );

          return (
            <Link
              key={group.title}
              to={primaryRoute}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all",
                hasActiveItem
                  ? "border-[#E05600] bg-[#FFF7ED] shadow-sm"
                  : "border-transparent hover:border-[#E2E8F0] hover:bg-[#FFF7ED]",
              )}
            >
              <div
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg transition-colors",
                  hasActiveItem
                    ? "bg-[#E05600] text-white"
                    : "bg-[#FFFFFF] text-[#64748B]",
                )}
              >
                <GroupIcon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "truncate text-xs font-bold uppercase tracking-wide",
                    hasActiveItem ? "text-[#E05600]" : "text-[#0F172A]",
                  )}
                >
                  {group.title}
                </p>
                <p className="truncate text-[10px] font-medium text-[#94A3B8]">
                  {workspaceSubtitles[group.title]}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FFFFFF] text-[#0F172A]">
      {/* Desktop Left Sidebar */}
      <aside
        className={cn(
          "sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-[#E2E8F0] bg-[#FFFFFF] transition-all duration-200 lg:flex",
          collapsed ? "w-[68px]" : "w-[260px]",
        )}
      >
        {/* Brand Header */}
        <div className="flex h-14 items-center justify-between border-b border-[#E2E8F0] px-3">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              title="Expand Workspace Sidebar"
              className="mx-auto flex size-9 items-center justify-center rounded-md bg-[#E05600] text-white transition-colors hover:bg-[#C84600] shadow-sm"
            >
              <Flame className="size-5" />
            </button>
          ) : (
            <>
              <Link to="/" className="flex items-center gap-2.5 min-w-0">
                <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#E05600] text-white">
                  <Flame className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    Steel AI OS
                  </p>
                  <p className="truncate text-[10px] font-semibold text-[#64748B]">Command Center</p>
                </div>
              </Link>
              <button
                onClick={() => setCollapsed(true)}
                title="Collapse Workspace Sidebar"
                className="grid size-7 place-items-center rounded text-[#94A3B8] hover:text-[#0F172A]"
              >
                <PanelLeftClose className="size-4" />
              </button>
            </>
          )}
        </div>

        {/* Search Jump */}
        {!collapsed && (
          <div className="px-3 pt-3 pb-1">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-[#94A3B8]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search main module…"
                className="h-8 border-[#E2E8F0] bg-[#FFFFFF] pl-8 text-xs text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#E05600]"
              />
            </div>
          </div>
        )}

        {renderNavItems(collapsed)}

        {/* Sidebar Collapse Toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex h-10 items-center justify-center gap-2 border-t border-[#E2E8F0] text-xs font-bold text-[#94A3B8] transition-colors hover:text-[#E05600]"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4 text-[#E05600]" />
          ) : (
            <>
              <PanelLeftClose className="size-4" />
              <span>Collapse Sidebar</span>
            </>
          )}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex w-[260px] flex-col border-r border-[#E2E8F0] bg-[#FFFFFF] p-0 z-50">
            <div className="flex h-14 items-center justify-between border-b border-[#E2E8F0] px-3.5">
              <div className="flex items-center gap-3">
                <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#E05600] text-white">
                  <Flame className="size-4" />
                </div>
                <div>
                  <p className="truncate text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    Steel AI OS
                  </p>
                  <p className="truncate text-[10px] font-semibold text-[#64748B]">Command Center</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="grid size-8 place-items-center rounded text-[#94A3B8]">
                <X className="size-5" />
              </button>
            </div>
            {renderNavItems(false)}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Sticky Top Bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#E2E8F0] bg-[#FFFFFF] px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed((c) => !c)}
              title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="hidden lg:flex items-center gap-1.5 rounded-md border border-[#E2E8F0] px-2.5 py-1 text-xs font-bold text-[#64748B] hover:border-[#E05600] hover:text-[#E05600] transition-colors"
            >
              {collapsed ? <PanelLeftOpen className="size-4" /> : <PanelLeftClose className="size-4" />}
              <span>{collapsed ? "Expand" : "Collapse"}</span>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className="grid size-8 place-items-center rounded-md border border-[#E2E8F0] text-[#0F172A] lg:hidden"
            >
              <Menu className="size-4" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-[#E2E8F0] px-3 py-1 text-xs font-bold text-[#0F172A] hover:border-[#E05600] transition-colors">
                <CircleDot className="size-3 text-[#E05600]" />
                <span className="max-w-[200px] truncate">{plant}</span>
                <ChevronDown className="size-3 text-[#94A3B8]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 border-[#E2E8F0] bg-[#FFFFFF]">
                <DropdownMenuLabel className="text-xs text-[#64748B]">
                  Select Steel Plant / Facility
                </DropdownMenuLabel>
                {plants.map((p) => (
                  <DropdownMenuItem
                    key={p}
                    className="text-xs text-[#0F172A] hover:bg-[#FFF7ED]"
                    onClick={() => setPlant(p)}
                  >
                    {p}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="hidden text-xs text-[#E2E8F0] sm:inline">|</span>
            <span className="hidden items-center gap-1.5 text-[11px] font-mono font-bold text-[#64748B] md:flex">
              <span className="size-1.5 rounded-full bg-[#E05600]" />
              Operational · 99.8% AI Accuracy
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              title="Notifications"
              className="relative grid size-8 place-items-center rounded-md border border-[#E2E8F0] text-[#64748B] transition-colors hover:border-[#E05600] hover:text-[#E05600]"
            >
              <Bell className="size-3.5" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#E05600]" />
            </button>

            <button
              onClick={() => setAskOpen(true)}
              className="flex items-center gap-1.5 rounded-md bg-[#E05600] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#C84600] shadow-sm"
            >
              <Sparkles className="size-3.5" />
              <span>Ask Enterprise AI</span>
            </button>

            <div className="grid size-8 place-items-center rounded-md border border-[#E2E8F0] text-xs font-extrabold text-[#E05600]">
              AV
            </div>
          </div>
        </header>

        {/* Body Viewport */}
        <main className="min-w-0 flex-1 bg-[#FFFFFF] px-4 py-5 lg:px-6">
          <ModuleControlHub />
          {children}
        </main>

        <footer className="border-t border-[#E2E8F0] bg-[#FFFFFF] px-4 py-3 text-[11px] font-medium text-[#94A3B8] lg:px-6">
          Steel Manufacturing Operating System · 43 business functions · 231 automation opportunities
        </footer>
      </div>

      <AskAiPanel open={askOpen} onOpenChange={setAskOpen} />
    </div>
  );
}
