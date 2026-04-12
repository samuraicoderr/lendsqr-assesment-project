"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import ServiceAccountTable from "@/components/layout/ServiceAccountTable/ServiceAccountTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL ACCOUNTS", value: 10, icon: "/media/icons/user-cog.svg", color: "#DF18FF" },
	{ id: "active", label: "ACTIVE", value: 8, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "synced", label: "RECENTLY SYNCED", value: 7, icon: "/media/icons/sliders.svg", color: "#5718FF" },
	{ id: "issues", label: "WITH ISSUES", value: 2, icon: "/media/icons/user-times.svg", color: "#E4033B" },
]; };
export default function ServiceAccountPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Service Account</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><ServiceAccountTable /></main>); }
