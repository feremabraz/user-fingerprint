import { Card } from "@/components/ui/card";
import React from "react";

function isRenderableASN(asn: unknown): asn is string | number {
  return typeof asn === "string" || typeof asn === "number";
}

interface ASNCardProps {
  label: string;
  asn: unknown;
}

export const ASNCard: React.FC<ASNCardProps> = ({ label, asn }) => {
  if (!isRenderableASN(asn)) return null;
  return (
    <Card className="p-4">
      <div className="font-semibold mb-2">{label}</div>
      <span className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded block overflow-x-auto">
        {asn}
      </span>
    </Card>
  );
};
