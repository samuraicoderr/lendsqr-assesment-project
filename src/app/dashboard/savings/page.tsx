"use client";

import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import SavingsTable from "@/components/layout/SavingsTable/SavingsTable";

const fetchStats = async (): Promise<StatisticItem[]> => {
	await new Promise((r) => setTimeout(r, 800));
	return [
		{ id: "total", label: "TOTAL ACCOUNTS", value: 1847, icon: "/media/icons/piggy-bank.svg", color: "#DF18FF" },
		{ id: "active", label: "ACTIVE ACCOUNTS", value: 1562, icon: "/media/icons/fancy/users_with_savings.svg", color: "#39CD62" },
		{ id: "balance", label: "TOTAL BALANCE", value: 485000000, icon: "/media/icons/coins-solid.svg", color: "#5718FF" },
		{ id: "target", label: "TARGET SAVINGS", value: 342, icon: "/media/icons/piggy-bank.svg", color: "#F55F44" },
	];
};

export default function SavingsPage() {
	return (
		<main style={{ padding: "32px" }}>
			<h1 className="main-title">Savings</h1>
			<StatisticsCards fetchStats={fetchStats} className="mb-40" />
			<SavingsTable />
		</main>
	);
}
