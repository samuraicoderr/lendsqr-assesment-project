"use client";

import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import LoanRequestsTable from "@/components/layout/LoanRequestsTable/LoanRequestsTable";

const fetchStats = async (): Promise<StatisticItem[]> => {
	await new Promise((r) => setTimeout(r, 800));
	return [
		{ id: "total", label: "TOTAL REQUESTS", value: 567, icon: "/media/icons/Group.svg", color: "#DF18FF" },
		{ id: "pending", label: "PENDING REVIEW", value: 89, icon: "/media/icons/fancy/active_users.svg", color: "#E9B200" },
		{ id: "approved", label: "APPROVED", value: 342, icon: "/media/icons/user-check.svg", color: "#39CD62" },
		{ id: "rejected", label: "REJECTED", value: 136, icon: "/media/icons/user-times.svg", color: "#E4033B" },
	];
};

export default function LoanRequestsPage() {
	return (
		<main style={{ padding: "32px" }}>
			<h1 className="main-title">Loan Requests</h1>
			<StatisticsCards fetchStats={fetchStats} className="mb-40" />
			<LoanRequestsTable />
		</main>
	);
}
