"use client";

import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import WhitelistTable from "@/components/layout/WhitelistTable/WhitelistTable";

const fetchStats = async (): Promise<StatisticItem[]> => {
	await new Promise((r) => setTimeout(r, 800));
	return [
		{ id: "total", label: "TOTAL ENTRIES", value: 156, icon: "/media/icons/user-check.svg", color: "#DF18FF" },
		{ id: "active", label: "ACTIVE", value: 134, icon: "/media/icons/fancy/active_users.svg", color: "#39CD62" },
		{ id: "expiring", label: "EXPIRING SOON", value: 12, icon: "/media/icons/bell.svg", color: "#E9B200" },
		{ id: "permanent", label: "PERMANENT", value: 22, icon: "/media/icons/user-friends.svg", color: "#5718FF" },
	];
};

export default function WhitelistPage() {
	return (
		<main style={{ padding: "32px" }}>
			<h1 className="main-title">Whitelist</h1>
			<StatisticsCards fetchStats={fetchStats} className="mb-40" />
			<WhitelistTable />
		</main>
	);
}
