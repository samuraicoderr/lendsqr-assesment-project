"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import FeesChargesTable from "@/components/layout/FeesChargesTable/FeesChargesTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL FEE TYPES", value: 10, icon: "/media/icons/coins-solid.svg", color: "#DF18FF" },
	{ id: "active", label: "ACTIVE", value: 9, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "flat", label: "FLAT FEES", value: 6, icon: "/media/icons/badge-percent.svg", color: "#5718FF" },
	{ id: "pct", label: "PERCENTAGE FEES", value: 4, icon: "/media/icons/badge-percent.svg", color: "#F55F44" },
]; };
export default function FeesChargesPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Fees and Charges</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><FeesChargesTable /></main>); }
