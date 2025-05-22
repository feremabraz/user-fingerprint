"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	confidenceScoreAtom,
	incognitoAtom,
	visitorIdAtom,
} from "@/lib/atoms/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { Copy, Fingerprint } from "lucide-react";

export function VisitorIdCard() {
	const visitorId = useAtomValue(visitorIdAtom);
	const confidenceScore = useAtomValue(confidenceScoreAtom);
	const incognito = useAtomValue(incognitoAtom);

	const copyToClipboard = () => {
		if (visitorId) {
			navigator.clipboard.writeText(visitorId);
		}
	};

	if (!visitorId) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<div className="flex flex-col space-y-1.5">
						<CardTitle className="flex items-center gap-2">
							<Fingerprint className="h-5 w-5" />
							Visitor Identification
						</CardTitle>
						<CardDescription>
							Unique identifier for this visitor
						</CardDescription>
					</div>
					{incognito && <Badge variant="destructive">Incognito</Badge>}
				</CardHeader>
				<CardContent>
					<div className="flex flex-col space-y-4">
						<div className="flex items-center justify-between">
							<div className="font-mono text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded-md overflow-x-auto max-w-[calc(100%-40px)]">
								{visitorId}
							</div>
							<Button variant="ghost" size="icon" onClick={copyToClipboard}>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
						{confidenceScore !== null && (
							<div className="flex items-center justify-between">
								<span className="text-sm text-slate-500 dark:text-slate-400">
									Confidence Score
								</span>
								<Badge
									variant={
										confidenceScore > 0.7
											? "default"
											: confidenceScore > 0.4
												? "outline"
												: "destructive"
									}
									className="ml-2"
								>
									{(confidenceScore * 100).toFixed(1)}%
								</Badge>
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
