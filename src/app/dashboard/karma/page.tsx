"use client";

import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import KarmaTable from "@/components/layout/KarmaTable/KarmaTable";

const fetchStats = async (): Promise<StatisticItem[]> => {
	await new Promise((r) => setTimeout(r, 800));
	return [
		{ id: "total", label: "TRACKED USERS", value: 2453, icon: "/media/icons/user-times.svg", color: "#DF18FF" },
		{ id: "avg", label: "AVG KARMA SCORE", value: 67, icon: "/media/icons/fancy/active_users.svg", color: "#5718FF" },
		{ id: "blacklisted", label: "BLACKLISTED", value: 38, icon: "/media/icons/userx.svg", color: "#E4033B" },
		{ id: "clean", label: "CLEAN RECORDS", value: 2415, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	];
};

export default function KarmaPage() {
	return (
		<main style={{ padding: "32px" }}>
			<h1 className="main-title">Karma</h1>
			<StatisticsCards fetchStats={fetchStats} className="mb-40" />
			<KarmaTable />
		</main>
	);
}
