"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import TransactionsTable from "@/components/layout/TransactionsTable/TransactionsTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL TRANSACTIONS", value: 24589, icon: "/media/icons/icon.svg", color: "#DF18FF" },
	{ id: "completed", label: "COMPLETED", value: 22847, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "pending", label: "PENDING", value: 156, icon: "/media/icons/fancy/active_users.svg", color: "#E9B200" },
	{ id: "volume", label: "TOTAL VOLUME (₦)", value: 2450000000, icon: "/media/icons/coins-solid.svg", color: "#5718FF" },
]; };
export default function TransactionsPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Transactions</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><TransactionsTable /></main>); }
