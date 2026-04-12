"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import ServicesTable from "@/components/layout/ServicesTable/ServicesTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL SERVICES", value: 10, icon: "/media/icons/galaxy.svg", color: "#DF18FF" },
	{ id: "active", label: "ACTIVE", value: 8, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "maint", label: "MAINTENANCE", value: 1, icon: "/media/icons/sliders.svg", color: "#E9B200" },
	{ id: "inactive", label: "INACTIVE", value: 1, icon: "/media/icons/user-times.svg", color: "#E4033B" },
]; };
export default function ServicesPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Services</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><ServicesTable /></main>); }
