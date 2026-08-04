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
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-[#A6ACB6] pb-4">
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#D95A00]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-xl font-bold tracking-tight text-[#1A1D20] lg:text-2xl">{title}</h1>
        {description && (
          <p className="mt-1 max-w-3xl text-xs text-[#4A5059]">{description}</p>
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
      className={cn("rounded-xl border border-[#A6ACB6] bg-[#E4E8EE] text-[#1A1D20]", className)}
    >
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#A6ACB6] px-4 py-3 bg-[#DCE0E6]">
          <div className="min-w-0">
            {title && <h2 className="text-xs font-bold uppercase tracking-wider text-[#1A1D20]">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-[11px] text-[#4A5059]">{description}</p>
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
    <div className="flex h-[88px] flex-col justify-between rounded-xl border border-[#A6ACB6] bg-[#E4E8EE] p-3.5 transition-colors hover:border-[#7A808A]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#4A5059]">
          {label}
        </p>
        {Icon && <Icon className="size-3.5 text-[#7A808A]" />}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xl font-bold tabular-nums text-[#1A1D20]">{value}</p>
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
          {hint && <span className="truncate text-[10px] text-[#4A5059]">{hint}</span>}
        </div>
      </div>
    </div>
  );
}

const toneMap = {
  success: "border-[#B87514]/40 bg-[#B87514]/15 text-[#7B4C05]", // Industrial Amber
  warning: "border-[#B8561B]/40 bg-[#B8561B]/15 text-[#863A08]", // Burnt Orange
  destructive: "border-[#9B3227]/40 bg-[#9B3227]/15 text-[#772118]", // Brick Red
  info: "border-[#7A808A]/40 bg-[#7A808A]/15 text-[#2C3036]", // Steel Silver
  neutral: "border-[#A6ACB6] bg-[#C8D0DC] text-[#33373E]", // Steel Slate
  primary: "border-[#D95A00]/40 bg-[#D95A00]/15 text-[#A04200]", // Molten Orange
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
  if (["active", "live", "released", "connected", "synced", "approve", "complete", "low"].includes(s))
    return "success";
  if (["paused", "hold", "pending review", "in build", "piloting", "partial", "degraded", "medium", "review", "in progress", "indexing", "under test"].includes(s))
    return "warning";
  if (["error", "reject", "high", "deviation flagged"].includes(s)) return "destructive";
  if (["draft", "backlog", "planned", "available"].includes(s)) return "neutral";
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
          : "bg-[#D95A00]";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded bg-[#C8D0DC]">
      <div
        className={cn("h-full rounded transition-all duration-300", bar)}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-[#A6ACB6] p-5 text-center text-xs text-[#4A5059]">
      {children}
    </div>
  );
}
