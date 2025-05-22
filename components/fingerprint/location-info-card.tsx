"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { locationDetailsAtom } from "@/lib/atoms/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { Globe, MapPin } from "lucide-react";

export function LocationInfoCard() {
	const locationDetails = useAtomValue(locationDetailsAtom);
	if (!locationDetails) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.3 }}
		>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2">
						<MapPin className="h-5 w-5" />
						Location Information
					</CardTitle>
					<CardDescription>
						Approximate location based on IP address
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Globe className="h-4 w-4 text-slate-500" />
								<span className="text-sm font-medium">
									{[
										locationDetails.city?.name,
										locationDetails.subdivisions?.[0]?.name,
										locationDetails.country?.name,
									]
										.filter(Boolean)
										.join(", ")}
								</span>
							</div>
							{locationDetails.country?.code && (
								<div className="text-sm font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
									{locationDetails.country.code}
								</div>
							)}
						</div>

						<Separator />

						<div className="grid grid-cols-2 gap-2">
							{locationDetails.continent?.name && (
								<>
									<div className="text-sm font-medium">Continent</div>
									<div className="text-sm">
										{locationDetails.continent.name}
									</div>
								</>
							)}

							{locationDetails.postalCode && (
								<>
									<div className="text-sm font-medium">Postal Code</div>
									<div className="text-sm">{locationDetails.postalCode}</div>
								</>
							)}

							{locationDetails.timezone && (
								<>
									<div className="text-sm font-medium">Timezone</div>
									<div className="text-sm">{locationDetails.timezone}</div>
								</>
							)}

							{locationDetails.accuracyRadius && (
								<>
									<div className="text-sm font-medium">Accuracy Radius</div>
									<div className="text-sm">
										{locationDetails.accuracyRadius} km
									</div>
								</>
							)}
						</div>

						{locationDetails.latitude && locationDetails.longitude && (
							<div className="pt-2">
								<div className="text-sm font-medium mb-1">Coordinates</div>
								<div className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
									{locationDetails.latitude.toFixed(6)},{" "}
									{locationDetails.longitude.toFixed(6)}
								</div>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
