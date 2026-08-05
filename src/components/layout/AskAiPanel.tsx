import { useState } from "react";
import { Sparkles, Send, Quote } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Msg = { role: "user" | "ai"; text: string; sources?: string[] };

const suggestions = [
  "Summarise pending approvals above ₹1 Cr",
  "Which heats have chemistry deviations this month?",
  "Draft the Q3 board briefing on automation ROI",
  "Top 5 vendors by spend variance vs rate contract",
  "Which departments have the lowest AI adoption?",
];

const canned: Record<string, Msg> = {
  default: {
    role: "ai",
    text:
      "Across the enterprise, 51 of 58 AI agents are active and 231 automation opportunities are tracked, with 64.1% of eligible process steps automated. Current run-rate saving is ₹4.31 Cr / month (₹51.7 Cr annualised, 198 FTE equivalent). The largest remaining value pools are Tendering & Bidding, Accounts Receivable and Export Documentation — all dependent on Company Brain coverage that is now at 94% of target sources.",
    sources: [
      "Company Brain · Automation register",
      "SAP S/4HANA · FI/CO extract",
      "AI Governance · usage analytics",
    ],
  },
};

export function AskAiPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [value, setValue] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }, canned["default"]!]);
    setValue("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 border-[#E2E8F0] bg-[#FFFFFF] text-[#0F172A] p-0 sm:max-w-xl">
        <SheetHeader className="border-b border-[#E2E8F0] bg-[#FFFFFF] p-5">
          <SheetTitle className="flex items-center gap-2 font-display text-[#0F172A]">
            <span className="grid size-7 place-items-center rounded-md bg-[#E05600]">
              <Sparkles className="size-4 text-white" />
            </span>
            Ask Enterprise AI
          </SheetTitle>
          <SheetDescription className="text-xs text-[#475569]">
            Grounded on the Company Brain with permission-aware retrieval and source citation.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#475569]">
                Suggested prompts
              </p>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="w-full rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-3 text-left text-xs font-bold text-[#0F172A] transition-colors hover:border-[#E05600] hover:bg-[#FFF7ED]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-auto max-w-[85%] rounded-lg bg-[#FFF7ED] border border-[#FDBA74] p-3 text-xs font-bold text-[#0F172A]"
                  : "max-w-[95%] space-y-3 rounded-lg border border-[#E2E8F0] bg-[#FFFFFF] p-3 text-xs leading-relaxed font-semibold text-[#0F172A]"
              }
            >
              <p>{m.text}</p>
              {m.sources && (
                <div className="flex flex-wrap gap-1.5 border-t border-[#E2E8F0] pt-2">
                  {m.sources.map((s) => (
                    <Badge key={s} variant="outline" className="gap-1 text-[10px] border-[#E2E8F0] bg-[#FFFFFF] text-[#475569]">
                      <Quote className="size-2.5" /> {s}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t border-[#E2E8F0] bg-[#FFFFFF] p-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(value)}
            placeholder="Ask about any department, document, heat, order or KPI…"
            className="h-10 border-[#E2E8F0] bg-[#FFFFFF] text-xs text-[#0F172A] placeholder:text-[#475569]"
          />
          <Button size="icon" className="size-10 shrink-0 bg-[#E05600] text-white hover:bg-[#C84600]" onClick={() => send(value)}>
            <Send className="size-4" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
