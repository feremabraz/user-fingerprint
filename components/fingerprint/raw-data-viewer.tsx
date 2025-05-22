"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	extendedFingerprintDataAtom,
	fingerprintDataAtom,
} from "@/lib/atoms/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { Check, Copy, Database } from "lucide-react";
import { useState } from "react";

export function RawDataViewer() {
	const extendedData = useAtomValue(extendedFingerprintDataAtom);
	const basicData = useAtomValue(fingerprintDataAtom);
	const [copied, setCopied] = useState(false);

	const data = extendedData ?? basicData;
	if (!data) return null;

	const copyToClipboard = (jsonData: unknown) => {
		// Only stringify objects or arrays; fallback to string otherwise
		let str: string;
		if (typeof jsonData === "object" && jsonData !== null) {
			str = JSON.stringify(jsonData, null, 2);
		} else {
			str = String(jsonData);
		}
		navigator.clipboard.writeText(str);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: 0.4 }}
		>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="flex items-center gap-2">
						<Database className="h-5 w-5" />
						Raw Fingerprint Data
					</CardTitle>
					<CardDescription>
						Complete fingerprint data in JSON format
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="standard">
						<div className="flex items-center justify-between mb-4">
							<TabsList>
								<TabsTrigger value="standard">Standard</TabsTrigger>
								{extendedData && (
									<TabsTrigger value="extended">Extended</TabsTrigger>
								)}
							</TabsList>

							<Button
								variant="outline"
								size="sm"
								onClick={() => copyToClipboard(extendedData || data)}
								className="flex items-center gap-1"
							>
								{copied ? (
									<>
										<Check className="h-4 w-4" />
										Copied
									</>
								) : (
									<>
										<Copy className="h-4 w-4" />
										Copy JSON
									</>
								)}
							</Button>
						</div>

						<TabsContent value="standard">
							<pre className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto max-h-96">
								{JSON.stringify(data, null, 2)}
							</pre>
						</TabsContent>

						{extendedData && (
							<TabsContent value="extended">
								<pre className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto max-h-96">
									{JSON.stringify(extendedData, null, 2)}
								</pre>
							</TabsContent>
						)}
					</Tabs>
				</CardContent>
			</Card>
		</motion.div>
	);
}
