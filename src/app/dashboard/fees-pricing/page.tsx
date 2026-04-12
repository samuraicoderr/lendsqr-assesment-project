"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import FeesPricingTable from "@/components/layout/FeesPricingView/FeesPricingView";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "FEE STRUCTURES", value: 10, icon: "/media/icons/badge-percent.svg", color: "#DF18FF" },
	{ id: "active", label: "ACTIVE", value: 9, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "tiers", label: "PRICING TIERS", value: 4, icon: "/media/icons/coins-solid.svg", color: "#5718FF" },
	{ id: "pct", label: "PERCENTAGE BASED", value: 6, icon: "/media/icons/badge-percent.svg", color: "#F55F44" },
]; };
export default function FeesPricingPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Fees and Pricing</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><FeesPricingTable /></main>); }
