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
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#E2E8F0] pb-5">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A] lg:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1.5 max-w-3xl text-xs font-medium text-[#64748B] leading-relaxed">{description}</p>
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
      className={cn("rounded-[28px] border border-[#E2E8F0] bg-[#FFFFFF] text-[#0F172A] shadow-sm transition-all duration-200", className)}
    >
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] px-6 py-4">
          <div className="min-w-0">
            {title && <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-[11px] font-medium text-[#64748B]">{description}</p>
            )}
          </div>
          {actions}
        </div>
      )}
      <div className={bare ? "" : "p-6"}>{children}</div>
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
    <div className="flex flex-col justify-between rounded-[28px] border border-[#E2E8F0] bg-[#FFFFFF] p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[#2563EB]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B]">
          {label}
        </p>
        {Icon && (
          <div className="grid size-9 place-items-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
            <Icon className="size-4.5 text-[#2563EB]" />
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-2xl font-extrabold tabular-nums tracking-tight text-[#0F172A] lg:text-3xl">{value}</p>
        <div className="flex items-center gap-1.5 pt-0.5">
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums",
                up ? "bg-[#ECFDF5] text-[#059669]" : "bg-[#FEF2F2] text-[#DC2626]",
              )}
            >
              {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
              {Math.abs(delta)}
              {String(delta).includes(".") ? "%" : ""}
            </span>
          )}
          {hint && <span className="truncate text-[10px] font-medium text-[#64748B]">{hint}</span>}
        </div>
      </div>
    </div>
  );
}

const toneMap = {
  success: "border-[#059669]/30 bg-[#ECFDF5] text-[#059669]",
  warning: "border-[#D97706]/30 bg-[#FFFBEB] text-[#B45309]",
  destructive: "border-[#DC2626]/30 bg-[#FEF2F2] text-[#DC2626]",
  info: "border-[#0284C7]/30 bg-[#F0F9FF] text-[#0284C7]",
  neutral: "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]",
  primary: "border-[#2563EB]/30 bg-[#EFF6FF] text-[#1D4ED8]",
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
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider",
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
      ? "bg-[#059669]"
      : tone === "warning"
        ? "bg-[#D97706]"
        : tone === "destructive"
          ? "bg-[#DC2626]"
          : "bg-[#2563EB]";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
      <div
        className={cn("h-full rounded-full transition-all duration-300", bar)}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#E2E8F0] p-6 text-center text-xs text-[#64748B]">
      {children}
    </div>
  );
}
