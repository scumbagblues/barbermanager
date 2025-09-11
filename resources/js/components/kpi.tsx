// src/components/Kpi.tsx
import * as React from "react";

export function Kpi({ label, value, icon }: { label: string; value: number | string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-3">
      <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">{icon}{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
