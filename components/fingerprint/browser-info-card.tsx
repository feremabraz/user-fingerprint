"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { browserDetailsAtom } from "@/lib/atoms/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { ChromeIcon as Browser, Info } from "lucide-react";

export function BrowserInfoCard() {
	const browserDetails = useAtomValue(browserDetailsAtom);

	if (!browserDetails) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.1 }}
		>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2">
						<Browser className="h-5 w-5" />
						Browser Information
					</CardTitle>
					<CardDescription>Details about the visitor's browser</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-2">
							<div className="text-sm font-medium">Browser</div>
							<div className="text-sm">
								{browserDetails.browserName || "Unknown"}
							</div>

							<div className="text-sm font-medium">Version</div>
							<div className="text-sm">
								{browserDetails.browserVersion || "Unknown"}
							</div>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium">User Agent</div>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<Info className="h-4 w-4 text-slate-400" />
										</TooltipTrigger>
										<TooltipContent>
											<p className="max-w-xs text-xs">
												The user agent string sent by the browser
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<div className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded-md overflow-x-auto max-h-20">
								{browserDetails.userAgent || "Not available"}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
