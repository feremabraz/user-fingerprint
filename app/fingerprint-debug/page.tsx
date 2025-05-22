"use client";

import { EnhancedFingerprintProvider } from "@/components/fingerprint/enhanced-fingerprint-provider";
import { FingerprintDebug } from "@/components/fingerprint/fingerprint-debug";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";

export default function FingerprintDebugPage() {
	return (
		<div className="container mx-auto py-10 px-4">
			<h1 className="text-3xl font-bold mb-6">
				Fingerprint Pro Troubleshooting
			</h1>

			<div className="grid gap-6">
				<EnhancedFingerprintProvider apiKey={process.env.NEXT_PUBLIC_FINGERPRINT_API_KEY as string} region="eu">
					<FingerprintDebug />

					<Card>
						<CardHeader>
							<CardTitle>Basic Visitor Data Example</CardTitle>
							<CardDescription>
								Simple implementation of useVisitorData hook
							</CardDescription>
						</CardHeader>
						<CardContent>
							<BasicVisitorData />
						</CardContent>
					</Card>
				</EnhancedFingerprintProvider>
			</div>
		</div>
	);
}

// Simple component to demonstrate the basic usage
function BasicVisitorData() {
	const { isLoading, error, data, getData } = useVisitorData(
		{ extendedResult: true },
		{ immediate: true },
	);

	return (
		<div className="space-y-4">
			<button
				type="button"
				onClick={() => getData({ ignoreCache: true })}
				className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-md transition-colors"
			>
				Reload data
			</button>

			<div>
				<p className="font-medium mb-1">VisitorId:</p>
				<p className="font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
					{isLoading
						? "Loading..."
						: error
							? "Error loading data"
							: data?.visitorId || "No data"}
				</p>
			</div>

			{error && (
				<div className="text-red-500 text-sm mt-2">Error: {error.message}</div>
			)}
		</div>
	);
}
