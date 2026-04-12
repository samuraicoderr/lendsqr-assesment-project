"use client";

import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import GuarantorsTable from "@/components/layout/GuarantorsTable/GuarantorsTable";

const fetchGuarantorsStats = async (): Promise<StatisticItem[]> => {
	await new Promise((r) => setTimeout(r, 800));
	return [
		{ id: "total", label: "TOTAL GUARANTORS", value: 324, icon: "/media/icons/users.svg", color: "#DF18FF" },
		{ id: "verified", label: "VERIFIED", value: 247, icon: "/media/icons/user-check.svg", color: "#39CD62" },
		{ id: "pending", label: "PENDING VERIFICATION", value: 52, icon: "/media/icons/user-friends.svg", color: "#E9B200" },
		{ id: "active_guarantees", label: "ACTIVE GUARANTEES", value: 189, icon: "/media/icons/handshake-regular.svg", color: "#5718FF" },
	];
};

export default function GuarantorsPage() {
	return (
		<main style={{ padding: "32px" }}>
			<h1 className="main-title">Guarantors</h1>
			<StatisticsCards fetchStats={fetchGuarantorsStats} className="mb-40" />
			<GuarantorsTable />
		</main>
	);
}
