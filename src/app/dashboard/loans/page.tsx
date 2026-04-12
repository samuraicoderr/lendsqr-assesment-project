"use client";

import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import LoansTable from "@/components/layout/LoansTable/LoansTable";

const fetchLoansStats = async (): Promise<StatisticItem[]> => {
	await new Promise((r) => setTimeout(r, 800));
	return [
		{ id: "total", label: "TOTAL LOANS", value: 1243, icon: "/media/icons/sack.svg", color: "#DF18FF" },
		{ id: "active", label: "ACTIVE LOANS", value: 487, icon: "/media/icons/fancy/users_with_loan.svg", color: "#39CDCC" },
		{ id: "disbursed", label: "TOTAL DISBURSED", value: 856000000, icon: "/media/icons/coins-solid.svg", color: "#F55F44" },
		{ id: "defaulted", label: "DEFAULTED", value: 38, icon: "/media/icons/user-times.svg", color: "#E4033B" },
	];
};

export default function LoansPage() {
	return (
		<main style={{ padding: "32px" }}>
			<h1 className="main-title">Loans</h1>
			<StatisticsCards fetchStats={fetchLoansStats} className="mb-40" />
			<LoansTable />
		</main>
	);
}
