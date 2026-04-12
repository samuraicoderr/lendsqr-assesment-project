"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import SettlementsTable from "@/components/layout/SettlementsTable/SettlementsTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL SETTLEMENTS", value: 156, icon: "/media/icons/scroll.svg", color: "#DF18FF" },
	{ id: "completed", label: "COMPLETED", value: 148, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "pending", label: "IN PROGRESS", value: 8, icon: "/media/icons/fancy/active_users.svg", color: "#E9B200" },
	{ id: "net", label: "TOTAL NET (₦)", value: 2800000000, icon: "/media/icons/coins-solid.svg", color: "#5718FF" },
]; };
export default function SettlementsPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Settlements</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><SettlementsTable /></main>); }
