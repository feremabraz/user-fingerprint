import { Card } from "@/components/ui/card";
import React from "react";

interface VelocitySignalsCardProps {
  velocity: unknown;
}

export const VelocitySignalsCard: React.FC<VelocitySignalsCardProps> = ({ velocity }) => {
  if (!velocity) return null;
  return (
    <Card className="p-4">
      <div className="font-semibold mb-2">Velocity Signals</div>
      <pre className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-x-auto max-h-60">
        {typeof velocity === "string"
          ? velocity
          : String(JSON.stringify(velocity, null, 2))}
      </pre>
    </Card>
  );
};
