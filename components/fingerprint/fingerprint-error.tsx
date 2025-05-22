"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fingerprintErrorAtom } from "@/lib/atoms/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";
import { AlertTriangle } from "lucide-react";

export function FingerprintError() {
	const error = useAtomValue(fingerprintErrorAtom);

	if (!error) return null;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Alert variant="destructive">
				<AlertTriangle className="h-4 w-4" />
				<AlertTitle>Error loading fingerprint data</AlertTitle>
				<AlertDescription>
					{error.message ||
						"An unknown error occurred while loading fingerprint data."}
				</AlertDescription>
			</Alert>
		</motion.div>
	);
}
