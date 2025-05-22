import { Card } from "@/components/ui/card";
import React from "react";

function isRenderableASN(asn: unknown): asn is string | number {
  return typeof asn === "string" || typeof asn === "number";
}

interface RiskSignalsCardProps {
  products: Record<string, unknown>;
}

export const RiskSignalsCard: React.FC<RiskSignalsCardProps> = ({ products }) => {
  if (!products || typeof products !== "object" || Array.isArray(products) || Object.keys(products).length === 0) return null;
  return (
    <Card className="p-4">
      <div className="font-semibold mb-2">Risk/Smart Signals</div>
      <ul className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-x-auto">
        {Object.entries(products).map(([key, value]) => (
          <li key={String(key)} className="flex justify-between gap-2 border-b last:border-b-0 border-slate-200 dark:border-slate-700 py-1">
            <span className="font-medium text-slate-600 dark:text-slate-300">{String(key)}</span>
            <span className="text-right text-slate-900 dark:text-slate-100">{isRenderableASN(value) ? value : ""}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
