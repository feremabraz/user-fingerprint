"use client";

import { FingerprintDashboard } from "@/components/fingerprint/fingerprint-dashboard";
import { FingerprintDebug } from "@/components/fingerprint/fingerprint-debug";
import { FingerprintProvider } from "@/components/fingerprint/fingerprint-provider";
import { FingerprintVisualization } from "@/components/fingerprint/fingerprint-visualization";
import { RawDataViewer } from "@/components/fingerprint/raw-data-viewer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FingerprintDemo() {
	return (
		<FingerprintProvider apiKey={process.env.NEXT_PUBLIC_FINGERPRINT_API_KEY as string}>
			<div className="container mx-auto py-10 px-4">
				<h1 className="text-3xl font-bold mb-6">Fingerprint Pro Dashboard</h1>

				<Tabs defaultValue="dashboard" className="space-y-6">
					<TabsList>
						<TabsTrigger value="dashboard">Dashboard</TabsTrigger>
						<TabsTrigger value="raw">Raw Data</TabsTrigger>
						<TabsTrigger value="visualization">Visualization</TabsTrigger>
					</TabsList>

					<TabsContent value="dashboard">
						<FingerprintDashboard />
					</TabsContent>

					<TabsContent value="raw">
						<Card className="p-6">
							<RawDataViewer />
						</Card>
					</TabsContent>

					<TabsContent value="visualization">
						<Card className="p-6">
							<div className="grid gap-6 md:grid-cols-2">
								<FingerprintVisualization />
							</div>
						</Card>
					</TabsContent>

					<TabsContent value="debug">
						<Card className="p-6">
							<div className="grid gap-6">
								{/* Debug tools for diagnostics */}
								<FingerprintDebug />
							</div>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</FingerprintProvider>
	);
}
