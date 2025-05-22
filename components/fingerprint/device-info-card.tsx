"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { deviceDetailsAtom } from "@/lib/atoms/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { Laptop, Monitor, Smartphone, Tablet } from "lucide-react";

export function DeviceInfoCard() {
	const deviceDetails = useAtomValue(deviceDetailsAtom);

	if (!deviceDetails) return null;

	const getDeviceIcon = () => {
		switch (deviceDetails.deviceType) {
			case "mobile":
				return <Smartphone className="h-5 w-5" />;
			case "tablet":
				return <Tablet className="h-5 w-5" />;
			case "desktop":
				return <Monitor className="h-5 w-5" />;
			default:
				return <Laptop className="h-5 w-5" />;
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.2 }}
		>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2">
						{getDeviceIcon()}
						Device Information
					</CardTitle>
					<CardDescription>Details about the visitor's device</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-2">
							<div className="text-sm font-medium">Device Type</div>
							<div className="text-sm flex items-center">
								<Badge variant="outline" className="capitalize">
									{deviceDetails.deviceType || "Unknown"}
								</Badge>
							</div>

							<div className="text-sm font-medium">Device Model</div>
							<div className="text-sm">{deviceDetails.device || "Unknown"}</div>

							<div className="text-sm font-medium">Operating System</div>
							<div className="text-sm">{deviceDetails.os || "Unknown"}</div>

							<div className="text-sm font-medium">OS Version</div>
							<div className="text-sm">
								{deviceDetails.osVersion || "Unknown"}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
