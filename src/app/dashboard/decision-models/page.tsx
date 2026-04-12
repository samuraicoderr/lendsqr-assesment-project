"use client";

import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import DecisionModelsTable from "@/components/layout/DecisionModelsTable/DecisionModelsTable";

const fetchStats = async (): Promise<StatisticItem[]> => {
	await new Promise((r) => setTimeout(r, 800));
	return [
		{ id: "total", label: "TOTAL MODELS", value: 10, icon: "/media/icons/handshake-regular.svg", color: "#DF18FF" },
		{ id: "active", label: "ACTIVE MODELS", value: 8, icon: "/media/icons/user-check.svg", color: "#39CD62" },
		{ id: "rule_based", label: "RULE BASED", value: 3, icon: "/media/icons/clipboard-list.svg", color: "#5718FF" },
		{ id: "ml", label: "MACHINE LEARNING", value: 2, icon: "/media/icons/galaxy.svg", color: "#F55F44" },
	];
};

export default function DecisionModelsPage() {
	return (
		<main style={{ padding: "32px" }}>
			<h1 className="main-title">Decision Models</h1>
			<StatisticsCards fetchStats={fetchStats} className="mb-40" />
			<DecisionModelsTable />
		</main>
	);
}
