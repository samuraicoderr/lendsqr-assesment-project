"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import ReportsTable from "@/components/layout/ReportsTable/ReportsTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL REPORTS", value: 10, icon: "/media/icons/chart-bar.svg", color: "#DF18FF" },
	{ id: "active", label: "ACTIVE", value: 9, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "scheduled", label: "SCHEDULED", value: 7, icon: "/media/icons/bell.svg", color: "#5718FF" },
	{ id: "ondemand", label: "ON DEMAND", value: 2, icon: "/media/icons/sliders.svg", color: "#F55F44" },
]; };
export default function ReportsPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Reports</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><ReportsTable /></main>); }
