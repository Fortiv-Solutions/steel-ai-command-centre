import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-[#E2E8F0] pb-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#E05600]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-xl font-bold tracking-tight text-[#0F172A] lg:text-2xl">{title}</h1>
        {description && (
          <p className="mt-1 max-w-3xl text-xs text-[#64748B]">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  bare,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bare?: boolean;
}) {
  return (
    <section
      className={cn("rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] text-[#0F172A] shadow-sm", className)}
    >
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] px-4 py-3">
          <div className="min-w-0">
            {title && <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-[11px] text-[#64748B]">{description}</p>
            )}
          </div>
          {actions}
        </div>
      )}
      <div className={bare ? "" : "p-4"}>{children}</div>
    </section>
  );
}

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon?: LucideIcon;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="flex h-[88px] flex-col justify-between rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] p-3.5 shadow-sm transition-colors hover:border-[#E05600]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
          {label}
        </p>
        {Icon && <Icon className="size-3.5 text-[#E05600]" />}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xl font-bold tabular-nums text-[#0F172A]">{value}</p>
        <div className="flex items-center gap-1">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center text-[10px] font-bold tabular-nums",
                up ? "text-[#B87514]" : "text-[#9B3227]",
              )}
            >
              {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
              {Math.abs(delta)}
              {String(delta).includes(".") ? "%" : ""}
            </span>
          )}
          {hint && <span className="truncate text-[10px] text-[#64748B]">{hint}</span>}
        </div>
      </div>
    </div>
  );
}

const toneMap = {
  success: "border-[#B87514]/40 bg-[#FFFBEB] text-[#7B4C05]",
  warning: "border-[#B8561B]/40 bg-[#FFF7ED] text-[#863A08]",
  destructive: "border-[#9B3227]/40 bg-[#FEF2F2] text-[#772118]",
  info: "border-[#64748B]/30 bg-[#FFFFFF] text-[#1E293B]",
  neutral: "border-[#E2E8F0] bg-[#FFFFFF] text-[#334155]",
  primary: "border-[#FDBA74] bg-[#FFF7ED] text-[#C2410C]",
} as const;

export type Tone = keyof typeof toneMap;

export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        toneMap[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function statusTone(status: string): Tone {
  const s = status.toLowerCase();
  if (["active", "live", "released", "connected", "synced", "approve", "complete", "low", "completed", "approved", "verified audit", "logged & approved", "biscertified", "valid", "compliant", "indexed", "active pipeline", "active standard", "enforcing", "available"].includes(s))
    return "success";
  if (["paused", "hold", "pending review", "in build", "piloting", "partial", "degraded", "medium", "review", "in progress", "indexing", "under test", "loading", "customs cleared", "scheduled", "conditional pass"].includes(s))
    return "warning";
  if (["error", "reject", "high", "deviation flagged", "high risk", "low stock"].includes(s)) return "destructive";
  if (["draft", "backlog", "planned"].includes(s)) return "neutral";
  return "info";
}

export function Meter({ value, tone = "primary" }: { value: number; tone?: Tone }) {
  const bar =
    tone === "success"
      ? "bg-[#B87514]"
      : tone === "warning"
        ? "bg-[#B8561B]"
        : tone === "destructive"
          ? "bg-[#9B3227]"
          : "bg-[#E05600]";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded bg-[#E2E8F0]">
      <div
        className={cn("h-full rounded transition-all duration-300", bar)}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-[#E2E8F0] p-5 text-center text-xs text-[#64748B]">
      {children}
    </div>
  );
}
