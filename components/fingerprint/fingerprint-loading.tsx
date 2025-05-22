"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fingerprintLoadingAtom } from "@/lib/atoms/fingerprint";
import { motion } from "motion/react";
import { useAtomValue } from "jotai";

export function FingerprintLoading() {
	const isLoading = useAtomValue(fingerprintLoadingAtom);

	if (!isLoading) return null;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Card>
				<CardContent className="p-6">
					<div className="space-y-4">
						<Skeleton className="h-8 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
						<div className="space-y-2 pt-4">
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}
