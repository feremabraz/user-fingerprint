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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import {
	AlertTriangle,
	CheckCircle,
	Loader2,
	RefreshCw,
	XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

export function FingerprintDebug() {
	const [networkStatus, setNetworkStatus] = useState<"online" | "offline">(
		typeof navigator !== "undefined"
			? navigator.onLine
				? "online"
				: "offline"
			: "online",
	);
	const [scriptStatus, setScriptStatus] = useState<
		"loading" | "loaded" | "error" | "not-found"
	>("loading");
	const [corsStatus, setCorsStatus] = useState<"checking" | "ok" | "error">(
		"checking",
	);

	const { isLoading, error, data, getData } = useVisitorData(
		{ extendedResult: true },
		{ immediate: true },
	);

	// Check network status
	useEffect(() => {
		const handleOnline = () => setNetworkStatus("online");
		const handleOffline = () => setNetworkStatus("offline");

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	// Check if the script is loaded
	useEffect(() => {
		// Check if the script is already in the document
		const scriptExists =
			document.querySelector('script[src*="fingerprintjs"]') !== null;

		if (scriptExists) {
			setScriptStatus("loaded");
			return;
		}

		// Set a timeout to check if the script gets loaded
		const timeout = setTimeout(() => {
			const scriptLoaded =
				document.querySelector('script[src*="fingerprintjs"]') !== null;
			setScriptStatus(scriptLoaded ? "loaded" : "not-found");
		}, 5000);

		// Listen for script load errors
		const handleError = (event: ErrorEvent) => {
			if (
				event.message.includes("fingerprintjs") ||
				event.message.includes("fpjs") ||
				event.filename?.includes("fpjs") ||
				event.filename?.includes("fingerprintjs")
			) {
				setScriptStatus("error");
				clearTimeout(timeout);
			}
		};

		window.addEventListener("error", handleError);

		return () => {
			clearTimeout(timeout);
			window.removeEventListener("error", handleError);
		};
	}, []);

	// Check CORS status
	useEffect(() => {
		const checkCors = async () => {
			try {
				// Try to fetch the Fingerprint CDN to check CORS
				const response = await fetch("https://cdn.fpjs.io/", {
					mode: "no-cors",
				});
				setCorsStatus("ok");
			} catch (err) {
				setCorsStatus("error");
			}
		};

		checkCors();
	}, []);

	const handleRefresh = () => {
		getData({ ignoreCache: true });
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					Fingerprint Diagnostics
				</CardTitle>
				<CardDescription>
					Troubleshoot Fingerprint Pro integration issues
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="status">
					<TabsList className="mb-4">
						<TabsTrigger value="status">Status</TabsTrigger>
						<TabsTrigger value="data">Data</TabsTrigger>
						<TabsTrigger value="error">Error</TabsTrigger>
					</TabsList>

					<TabsContent value="status">
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
									<span className="font-medium">Network</span>
									<Badge
										variant={
											networkStatus === "online" ? "default" : "destructive"
										}
									>
										{networkStatus === "online" ? (
											<CheckCircle className="h-3 w-3 mr-1" />
										) : (
											<XCircle className="h-3 w-3 mr-1" />
										)}
										{networkStatus}
									</Badge>
								</div>

								<div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
									<span className="font-medium">Script</span>
									<Badge
										variant={
											scriptStatus === "loaded"
												? "default"
												: scriptStatus === "loading"
													? "outline"
													: "destructive"
										}
									>
										{scriptStatus === "loaded" ? (
											<CheckCircle className="h-3 w-3 mr-1" />
										) : scriptStatus === "loading" ? (
											<Loader2 className="h-3 w-3 mr-1 animate-spin" />
										) : (
											<XCircle className="h-3 w-3 mr-1" />
										)}
										{scriptStatus}
									</Badge>
								</div>

								<div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
									<span className="font-medium">CORS</span>
									<Badge
										variant={
											corsStatus === "ok"
												? "default"
												: corsStatus === "checking"
													? "outline"
													: "destructive"
										}
									>
										{corsStatus === "ok" ? (
											<CheckCircle className="h-3 w-3 mr-1" />
										) : corsStatus === "checking" ? (
											<Loader2 className="h-3 w-3 mr-1 animate-spin" />
										) : (
											<XCircle className="h-3 w-3 mr-1" />
										)}
										{corsStatus}
									</Badge>
								</div>

								<div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
									<span className="font-medium">API</span>
									<Badge
										variant={
											!isLoading && !error && data
												? "default"
												: isLoading
													? "outline"
													: "destructive"
										}
									>
										{!isLoading && !error && data ? (
											<CheckCircle className="h-3 w-3 mr-1" />
										) : isLoading ? (
											<Loader2 className="h-3 w-3 mr-1 animate-spin" />
										) : (
											<XCircle className="h-3 w-3 mr-1" />
										)}
										{!isLoading && !error && data
											? "connected"
											: isLoading
												? "loading"
												: "error"}
									</Badge>
								</div>
							</div>

							<div className="pt-4">
								<Button
									onClick={handleRefresh}
									className="w-full"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<Loader2 className="h-4 w-4 mr-2 animate-spin" />
											Testing Connection...
										</>
									) : (
										<>
											<RefreshCw className="h-4 w-4 mr-2" />
											Test Connection
										</>
									)}
								</Button>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="data">
						<div className="space-y-4">
							{isLoading ? (
								<div className="flex items-center justify-center p-8">
									<Loader2 className="h-8 w-8 animate-spin text-slate-400" />
								</div>
							) : data ? (
								<pre className="font-mono text-xs bg-slate-100 dark:bg-slate-800 p-4 rounded-md overflow-x-auto max-h-96">
									{JSON.stringify(data, null, 2)}
								</pre>
							) : (
								<div className="flex flex-col items-center justify-center p-8 text-center">
									<AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
									<p>No data available. Try testing the connection.</p>
								</div>
							)}
						</div>
					</TabsContent>

					<TabsContent value="error">
						<div className="space-y-4">
							{error ? (
								<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
									<h3 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
										Error Details
									</h3>
									<p className="text-sm text-red-700 dark:text-red-400 mb-4">
										{error.message}
									</p>
									<pre className="font-mono text-xs bg-white dark:bg-slate-800 p-3 rounded-md overflow-x-auto max-h-96 border border-red-100 dark:border-red-800/50">
										{JSON.stringify(error, null, 2)}
									</pre>
								</div>
							) : (
								<div className="flex flex-col items-center justify-center p-8 text-center">
									<CheckCircle className="h-8 w-8 text-green-500 mb-2" />
									<p>No errors detected.</p>
								</div>
							)}

							<div className="pt-2 space-y-4">
								<h3 className="text-sm font-medium">Common Solutions</h3>
								<ul className="space-y-2 text-sm">
									<li className="flex items-start gap-2">
										<div className="min-w-4 pt-0.5">1.</div>
										<div>
											<strong>Check API Key:</strong> Ensure your API key is
											correct and has the proper permissions.
										</div>
									</li>
									<li className="flex items-start gap-2">
										<div className="min-w-4 pt-0.5">2.</div>
										<div>
											<strong>Region Setting:</strong> Verify you're using the
											correct region (eu, us, ap).
										</div>
									</li>
									<li className="flex items-start gap-2">
										<div className="min-w-4 pt-0.5">3.</div>
										<div>
											<strong>Content Blockers:</strong> Disable ad blockers or
											privacy extensions that might block the script.
										</div>
									</li>
									<li className="flex items-start gap-2">
										<div className="min-w-4 pt-0.5">4.</div>
										<div>
											<strong>CORS Issues:</strong> If testing locally, ensure
											your development server allows CORS.
										</div>
									</li>
								</ul>
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
