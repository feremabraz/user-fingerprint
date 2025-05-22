import { Card } from "@/components/ui/card";
import React from "react";

interface RawDeviceAttributesCardProps {
  rawDeviceAttributes: unknown;
}

export const RawDeviceAttributesCard: React.FC<RawDeviceAttributesCardProps> = ({ rawDeviceAttributes }) => {
  if (!rawDeviceAttributes) return null;
  return (
    <Card className="p-4">
      <div className="font-semibold mb-2">Raw Device Attributes</div>
      <pre className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-x-auto max-h-60">
        {typeof rawDeviceAttributes === "string"
          ? rawDeviceAttributes
          : String(JSON.stringify(rawDeviceAttributes, null, 2))}
      </pre>
    </Card>
  );
};
