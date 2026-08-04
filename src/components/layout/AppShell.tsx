import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppShell({ children }: { children: ReactNode }) {
  // Collapsed state: false = Full Sidebar (260px), true = 7 Main Module Icons Strip (68px)
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [plant, setPlant] = useState(plants[0]!);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Accordion state: Only one group expanded at a time
  const activeGroupTitle = useMemo(() => {
    const found = navGroups.find((g) =>
      g.items.some((i) => (i.to === "/" ? pathname === "/" : pathname.startsWith(i.to))),
    );
    return found ? found.title : navGroups[0]!.title;
  }, [pathname]);

  const [expandedGroup, setExpandedGroup] = useState<string>(activeGroupTitle);

  // Keep expanded group in sync when active route changes
  useEffect(() => {
    setExpandedGroup(activeGroupTitle);
    setMobileOpen(false); // Close mobile drawer on route change
  }, [activeGroupTitle, pathname]);

  const groups = useMemo(() => {
    if (!query.trim()) return navGroups;
    const q = query.toLowerCase();
    return navGroups
      .map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q)) }))
      .filter((g) => g.items.length);
  }, [query]);

  const renderNavItems = (isCollapsedState: boolean) => {
    // When sidebar is collapsed, display ONLY the 7 main module icons cleanly without overlapping elements
    if (isCollapsedState) {
      return (
        <nav className="flex-1 space-y-2.5 overflow-y-auto px-2 py-4">
          {navGroups.map((group) => {
            const GroupIcon = group.icon;
            const hasActiveItem = group.items.some((i) =>
              i.to === "/" ? pathname === "/" : pathname.startsWith(i.to),
            );

            return (
              <div key={group.title} className="group relative text-center">
                <button
                  onClick={() => {
                    setCollapsed(false);
                    setExpandedGroup(group.title);
                  }}
                  title={`Main Module: ${group.title} (Click to expand sub-modules)`}
                  className={cn(
                    "mx-auto flex size-10 items-center justify-center rounded-xl text-[#4A5059] transition-all hover:bg-[#B8BEC8] hover:text-[#1A1D20]",
                    hasActiveItem &&
                      "bg-[#E4E8EE] text-[#D95A00] border-2 border-[#D95A00] font-bold shadow-md",
                  )}
                >
                  <GroupIcon className={cn("size-5", hasActiveItem && "text-[#D95A00]")} />
                </button>
                <span className="mt-0.5 block text-[9px] font-extrabold uppercase tracking-tight text-[#4A5059]">
                  {group.title.slice(0, 4)}
                </span>
              </div>
            );
          })}
        </nav>
      );
    }

    return (
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
        {groups.map((group) => {
          const GroupIcon = group.icon;
          const isExpanded = query.trim() ? true : expandedGroup === group.title;
          const hasActiveItem = group.items.some((i) =>
            i.to === "/" ? pathname === "/" : pathname.startsWith(i.to),
          );

          return (
            <div key={group.title} className="rounded-lg border border-transparent">
              {/* Group Accordion Button */}
              <button
                onClick={() =>
                  setExpandedGroup((prev) => (prev === group.title ? "" : group.title))
                }
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#4A5059] transition-colors hover:bg-[#B8BEC8] hover:text-[#1A1D20]",
                  hasActiveItem && "text-[#D95A00]",
                )}
              >
                <div className="flex items-center gap-2">
                  <GroupIcon className="size-3.5 shrink-0 text-[#7A808A]" />
                  <span>{group.title}</span>
                </div>
                <ChevronRight
                  className={cn(
                    "size-3 shrink-0 text-[#4A5059] transition-transform duration-150",
                    isExpanded && "rotate-90",
                  )}
                />
              </button>

              {/* Group Items */}
              {isExpanded && (
                <div className="mt-0.5 space-y-0.5 pl-2.5">
                  {group.items.map((item) => {
                    const active =
                      item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        title={item.label}
                        className={cn(
                          "group relative flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-bold text-[#4A5059] transition-colors hover:bg-[#B8BEC8] hover:text-[#1A1D20]",
                          active &&
                            "bg-[#E4E8EE] text-[#1A1D20] font-extrabold border-l-2 border-[#D95A00]",
                        )}
                      >
                        <ItemIcon
                          className={cn(
                            "size-3.5 shrink-0 text-[#7A808A]",
                            active && "text-[#D95A00]",
                          )}
                        />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.badge && (
                          <span className="rounded bg-[#C8D0DC] px-1.5 py-0.2 text-[10px] font-bold text-[#4A5059] border border-[#A6ACB6]">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  };

  return (
    <div className="flex min-h-screen w-full bg-[#D5DCE4] text-[#1A1D20]">
      {/* Desktop Left Sidebar (Full 260px vs Main Module Icons Only 68px) */}
      <aside
        className={cn(
          "sticky top-0 z-30 hidden h-screen shrink-0 flex-col border-r border-[#A6ACB6] bg-[#C8CDD5] transition-all duration-200 lg:flex",
          collapsed ? "w-[68px]" : "w-[260px]",
        )}
      >
        {/* Brand Header: Single centered button when collapsed to prevent overlap */}
        <div className="flex h-14 items-center justify-between border-b border-[#A6ACB6] px-3 bg-[#BCC2CD]">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              title="Expand Full Sidebar"
              className="mx-auto flex size-9 items-center justify-center rounded-md bg-[#D95A00] text-white transition-colors hover:bg-[#B8561B] shadow-sm"
            >
              <Flame className="size-5" />
            </button>
          ) : (
            <>
              <Link to="/" className="flex items-center gap-2.5 min-w-0">
                <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#D95A00] text-white">
                  <Flame className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
                    Steel AI OS
                  </p>
                  <p className="truncate text-[10px] font-semibold text-[#4A5059]">Command Center</p>
                </div>
              </Link>
              <button
                onClick={() => setCollapsed(true)}
                title="Collapse to Main Module Icons"
                className="grid size-7 place-items-center rounded text-[#4A5059] hover:bg-[#B8BEC8] hover:text-[#1A1D20]"
              >
                <PanelLeftClose className="size-4" />
              </button>
            </>
          )}
        </div>

        {/* Search Jump (only shown when full sidebar) */}
        {!collapsed && (
          <div className="px-3 pt-3 pb-1">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-[#4A5059]" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to module…"
                className="h-8 border-[#A6ACB6] bg-[#E4E8EE] pl-8 text-xs text-[#1A1D20] placeholder:text-[#4A5059] focus:border-[#D95A00]"
              />
            </div>
          </div>
        )}

        {renderNavItems(collapsed)}

        {/* Sidebar Collapse / Main Module Icon Toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex h-11 items-center justify-center gap-2 border-t border-[#A6ACB6] bg-[#BCC2CD] text-xs font-bold text-[#4A5059] transition-colors hover:bg-[#B8BEC8] hover:text-[#1A1D20]"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4 text-[#D95A00]" />
          ) : (
            <>
              <PanelLeftClose className="size-4" />
              <span>Main Modules Only</span>
            </>
          )}
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex w-[280px] flex-col border-r border-[#A6ACB6] bg-[#C8CDD5] p-0 z-50">
            <div className="flex h-14 items-center justify-between border-b border-[#A6ACB6] px-3.5 bg-[#BCC2CD]">
              <div className="flex items-center gap-3">
                <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#D95A00] text-white">
                  <Flame className="size-4" />
                </div>
                <div>
                  <p className="truncate text-xs font-bold uppercase tracking-wider text-[#1A1D20]">
                    Steel AI OS
                  </p>
                  <p className="truncate text-[10px] font-semibold text-[#4A5059]">Command Center</p>
                </div>
              </div>
              <button onClick={() => setMobileOpen(false)} className="grid size-8 place-items-center rounded text-[#1A1D20]">
                <X className="size-5" />
              </button>
            </div>
            {renderNavItems(false)}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Sticky Executive Top Bar */}
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#A6ACB6] bg-[#D5DCE4]/95 px-4 lg:px-6">
          <div className="flex items-center gap-3">
            {/* Sidebar Expand / Main Module Icons Toggle Button */}
            <button
              onClick={() => setCollapsed((c) => !c)}
              title={collapsed ? "Expand Full Sidebar" : "Show Main Module Icons Only"}
              className="hidden lg:flex items-center gap-1.5 rounded-md border border-[#A6ACB6] bg-[#E4E8EE] px-2.5 py-1 text-xs font-bold text-[#1A1D20] hover:bg-[#C8D0DC]"
            >
              {collapsed ? <PanelLeftOpen className="size-4 text-[#D95A00]" /> : <PanelLeftClose className="size-4 text-[#D95A00]" />}
              <span>{collapsed ? "Expand Sidebar" : "Main Modules Only"}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="grid size-8 place-items-center rounded-md border border-[#A6ACB6] bg-[#E4E8EE] text-[#1A1D20] lg:hidden"
            >
              <Menu className="size-4" />
            </button>

            {/* Scope / Plant Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-[#A6ACB6] bg-[#E4E8EE] px-3 py-1 text-xs font-bold text-[#1A1D20] hover:bg-[#C8D0DC]">
                <CircleDot className="size-3 text-[#B87514]" />
                <span className="max-w-[200px] truncate">{plant}</span>
                <ChevronDown className="size-3 text-[#4A5059]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-72 border-[#A6ACB6] bg-[#E4E8EE]">
                <DropdownMenuLabel className="text-xs text-[#4A5059]">
                  Select Steel Plant / Facility
                </DropdownMenuLabel>
                {plants.map((p) => (
                  <DropdownMenuItem
                    key={p}
                    className="text-xs text-[#1A1D20] hover:bg-[#C8D0DC]"
                    onClick={() => setPlant(p)}
                  >
                    {p}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="hidden text-xs text-[#A6ACB6] sm:inline">|</span>
            <span className="hidden items-center gap-1.5 text-[11px] font-mono font-bold text-[#4A5059] md:flex">
              <span className="size-1.5 rounded-full bg-[#B87514]" />
              Operational · 99.8% AI Accuracy
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden text-[11px] font-bold text-[#4A5059] xl:inline">Updated 2m ago</span>
            <Badge
              variant="outline"
              className="hidden border-[#A6ACB6] bg-[#E4E8EE] text-[10px] font-bold text-[#4A5059] md:flex"
            >
              Zero-Hardware OS
            </Badge>

            <button
              title="Notifications"
              className="relative grid size-8 place-items-center rounded-md border border-[#A6ACB6] bg-[#E4E8EE] text-[#1A1D20] transition-colors hover:bg-[#C8D0DC]"
            >
              <Bell className="size-3.5" />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#D95A00]" />
            </button>

            <button
              onClick={() => setAskOpen(true)}
              className="flex items-center gap-1.5 rounded-md bg-[#D95A00] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#B8561B]"
            >
              <Sparkles className="size-3.5" />
              <span>Ask Enterprise AI</span>
            </button>

            <div className="grid size-8 place-items-center rounded-md border border-[#A6ACB6] bg-[#C8D0DC] text-xs font-extrabold text-[#1A1D20]">
              AV
            </div>
          </div>
        </header>

        {/* Body Viewport */}
        <main className="min-w-0 flex-1 px-4 py-5 lg:px-6">{children}</main>

        <footer className="border-t border-[#A6ACB6] bg-[#D5DCE4] px-4 py-3 text-[11px] font-medium text-[#4A5059] lg:px-6">
          Steel Manufacturing Operating System · 43 business functions · 231 automation opportunities
          · zero-hardware architecture
        </footer>
      </div>

      <AskAiPanel open={askOpen} onOpenChange={setAskOpen} />
    </div>
  );
}
