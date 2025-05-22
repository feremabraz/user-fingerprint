import { Card } from "@/components/ui/card";
import React from "react";

interface IncognitoCardProps {
  incognito: unknown;
}

export const IncognitoCard: React.FC<IncognitoCardProps> = ({ incognito }) => {
  if (!incognito) return null;
  return (
    <Card className="p-4">
      <div className="font-semibold mb-2">Incognito Detection</div>
      <pre className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-x-auto">
        {typeof incognito === "string"
          ? incognito
          : String(JSON.stringify(incognito, null, 2))}
      </pre>
    </Card>
  );
};
