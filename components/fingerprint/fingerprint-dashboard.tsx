"use client";

import { Button } from "@/components/ui/button";

function isRenderableASN(asn: unknown): asn is string | number {
  return typeof asn === "string" || typeof asn === "number";
}
import { Card } from "@/components/ui/card";
import { ASNCard } from "./asn-card";
import { RiskSignalsCard } from "./risk-signals-card";
import { IncognitoCard } from "./incognito-card";
import { RawDeviceAttributesCard } from "./raw-device-attributes-card";
import { VelocitySignalsCard } from "./velocity-signals-card";
import {
	extendedFingerprintDataAtom,
	fingerprintDataAtom,
	fingerprintErrorAtom,
	fingerprintLoadingAtom,
} from "@/lib/atoms/fingerprint";
import { useFingerprintData } from "@/lib/queries/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { BrowserInfoCard } from "./browser-info-card";
import { DeviceInfoCard } from "./device-info-card";
import { FingerprintError } from "./fingerprint-error";
import { FingerprintLoading } from "./fingerprint-loading";
import { LocationInfoCard } from "./location-info-card";
import { VisitorIdCard } from "./visitor-id-card";

export function FingerprintDashboard() {
	const { getData } = useFingerprintData();
	const extendedData = useAtomValue(extendedFingerprintDataAtom);
	const basicData = useAtomValue(fingerprintDataAtom);
	const isLoading = useAtomValue(fingerprintLoadingAtom);
	const error = useAtomValue(fingerprintErrorAtom);

	const data = extendedData ?? basicData;
	// Heuristic: minimal data if missing advanced keys
	const isMinimal =
		extendedData &&
		!('products' in extendedData) &&
		!('ipLocation' in extendedData);

	// Type guards for extended-only fields
	type ProductsType = Record<string, unknown> | undefined;
	type IpLocationType = Record<string, unknown> | undefined;
	type IpInfoType = { v4?: { asn?: unknown }, v6?: { asn?: unknown } } | undefined;
	const products: ProductsType = data && 'products' in data ? (data as ProductsType) : undefined;
	const ipLocation: IpLocationType = data && 'ipLocation' in data ? (data as IpLocationType) : undefined;
	const ipInfo: IpInfoType = data && 'ipInfo' in data ? (data as IpInfoType) : undefined;

  const handleRefresh = () => {
    getData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Fingerprint Data</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isMinimal && (
        <Card className="bg-yellow-50 border-yellow-300 mb-4">
          <div className="flex items-center gap-2 p-4">
            <AlertTriangle className="text-yellow-500 h-5 w-5" />
            <span className="text-yellow-700 text-sm">
              Only minimal fingerprint data is available. You may need to upgrade your API key, check your region, or enable advanced signals in your Fingerprint Pro dashboard.
            </span>
          </div>
        </Card>
      )}

      {error && <FingerprintError />}
      {isLoading && <FingerprintLoading />}

      {!isLoading && data && (
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <VisitorIdCard />
          <BrowserInfoCard />
          <DeviceInfoCard />
          <LocationInfoCard />

          {ipLocation && (
            <Card className="p-4">
              <div className="font-semibold mb-2">Geolocation</div>
              {typeof ipLocation === "string" ? (
                <span className="text-xs">{ipLocation}</span>
              ) : ipLocation && typeof ipLocation === "object" && !Array.isArray(ipLocation) && Object.keys(ipLocation).length > 0 ? (
                <ul className="text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded overflow-x-auto">
                  {Object.entries(ipLocation).map(([key, value]) => (
                    <li key={key} className="flex justify-between gap-2 border-b last:border-b-0 border-slate-200 dark:border-slate-700 py-1">
                      <span className="font-medium text-slate-600 dark:text-slate-300">{key}</span>
                      <span className="text-right text-slate-900 dark:text-slate-100">{isRenderableASN(value) ? value : ""}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-xs italic text-slate-400">No geolocation data</span>
              )}
            </Card>
          )}
          {/* ASN (IPv4) */}
          {ipInfo?.v4 && (
            <ASNCard label="ASN (IPv4)" asn={ipInfo.v4.asn} />
          )}

          {/* ASN (IPv6) */}
          {ipInfo?.v6 && (
            <ASNCard label="ASN (IPv6)" asn={ipInfo.v6.asn} />
          )}

          {/* Risk/Smart Signals */}
          {products && typeof products === "object" && !Array.isArray(products) && Object.keys(products).length > 0 && (
            <RiskSignalsCard products={products} />
          )}

          {/* Incognito Detection */}
          {products && 'incognito' in products && (
            <IncognitoCard incognito={products.incognito} />
          )}

          {/* Raw Device Attributes */}
          {products && 'rawDeviceAttributes' in products && (
            <RawDeviceAttributesCard rawDeviceAttributes={products.rawDeviceAttributes} />
          )}

          {/* Velocity Signals */}
          {products && 'velocity' in products && (
            <VelocitySignalsCard velocity={products.velocity} />
          )}
        </motion.div>
      )}
    </div>
  );
}

