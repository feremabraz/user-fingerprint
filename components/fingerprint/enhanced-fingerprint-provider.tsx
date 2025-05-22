"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { AlertTriangle } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

interface EnhancedFingerprintProviderProps {
	apiKey: string;
	children: ReactNode;
	region?: "eu" | "ap" | "us";
	endpoint?: string;
	scriptUrlPattern?: string;
}

const queryClient = new QueryClient();

export function EnhancedFingerprintProvider({
	apiKey,
	children,
	region = "eu",
	endpoint,
	scriptUrlPattern,
}: EnhancedFingerprintProviderProps) {
	const [error, setError] = useState<string | null>(null);

	// Clear error on props change
	useEffect(() => {
		setError(null);
	}, []);

	// Handle window errors that might be related to Fingerprint script loading
	useEffect(() => {
		const handleError = (event: ErrorEvent) => {
			if (
				event.message.includes("fingerprintjs") ||
				event.message.includes("fpjs") ||
				event.filename?.includes("fpjs") ||
				event.filename?.includes("fingerprintjs")
			) {
				setError(`Script loading error: ${event.message}`);
			}
		};

		window.addEventListener("error", handleError);
		return () => window.removeEventListener("error", handleError);
	}, []);

	return (
		<JotaiProvider>
			<QueryClientProvider client={queryClient}>
				{error && (
					<Alert variant="destructive" className="mb-4">
						<AlertTriangle className="h-4 w-4" />
						<AlertTitle>Fingerprint Script Error</AlertTitle>
						<AlertDescription>
							{error}
							<div className="mt-2 text-sm">
								Please check your API key, region settings, and network
								connection. You may also need to disable any content blockers or
								privacy extensions.
							</div>
						</AlertDescription>
					</Alert>
				)}
				<FpjsProvider
					loadOptions={{
						apiKey,
						region,
						endpoint,
						scriptUrlPattern,
					}}
				>
					{children}
				</FpjsProvider>
			</QueryClientProvider>
		</JotaiProvider>
	);
}
