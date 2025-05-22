"use client";

import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import type { ReactNode } from "react";

interface FingerprintProviderProps {
	apiKey: string;
	children: ReactNode;
	endpoint?: string;
	scriptUrlPattern?: string;
	region?: "eu" | "ap" | "us";
}

const queryClient = new QueryClient();

export function FingerprintProvider({
	apiKey,
	children,
	endpoint,
	scriptUrlPattern,
	region,
}: FingerprintProviderProps) {
	return (
		<JotaiProvider>
			<QueryClientProvider client={queryClient}>
				<FpjsProvider
					loadOptions={{
						apiKey,
						endpoint,
						scriptUrlPattern,
						region,
					}}
				>
					{children}
				</FpjsProvider>
			</QueryClientProvider>
		</JotaiProvider>
	);
}
