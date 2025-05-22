"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { extendedFingerprintDataAtom, fingerprintDataAtom } from "@/lib/atoms/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { BarChart2, PieChart } from "lucide-react";

export function FingerprintVisualization() {
	const extendedData = useAtomValue(extendedFingerprintDataAtom);
	const basicData = useAtomValue(fingerprintDataAtom);
	const data = extendedData ?? basicData;

	if (!data) return null;

	// Extract data for visualization
	const confidenceScore = data.confidence?.score || 0;

	// Create a simple visualization of the confidence score
	const confidencePercentage = confidenceScore * 100;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.5 }}
		>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2">
						<PieChart className="h-5 w-5" />
						Confidence Visualization
					</CardTitle>
					<CardDescription>
						Visual representation of fingerprint confidence
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Confidence Score</span>
								<span className="font-medium">
									{confidencePercentage.toFixed(1)}%
								</span>
							</div>
							<div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
								<motion.div
									className="h-full bg-green-500 dark:bg-green-600 rounded-full"
									initial={{ width: 0 }}
									animate={{ width: `${confidencePercentage}%` }}
									transition={{ duration: 1, delay: 0.2 }}
								/>
							</div>
						</div>

						<div className="pt-4">
							<h4 className="text-sm font-medium mb-3 flex items-center gap-2">
								<BarChart2 className="h-4 w-4" />
								Identification Factors
							</h4>

							<div className="space-y-3">
								{/* These are example factors - in a real app, you'd use actual data from the fingerprint */}
								{[
									{ name: "Browser Fingerprint", value: 0.85 },
									{ name: "Canvas Fingerprint", value: 0.75 },
									{ name: "WebGL Fingerprint", value: 0.9 },
									{ name: "Audio Fingerprint", value: 0.6 },
								].map((factor) => (
									<div key={factor.name} className="space-y-1">
										<div className="flex justify-between text-xs">
											<span>{factor.name}</span>
											<span>{(factor.value * 100).toFixed(0)}%</span>
										</div>
										<div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
											<motion.div
												className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
												initial={{ width: 0 }}
												animate={{ width: `${factor.value * 100}%` }}
												transition={{ duration: 0.8, delay: 0.4 }}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
