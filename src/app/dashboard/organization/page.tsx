"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import OrganizationTable from "@/components/layout/OrganizationTable/OrganizationTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL ORGANIZATIONS", value: 10, icon: "/media/icons/briefcase.svg", color: "#DF18FF" },
	{ id: "active", label: "ACTIVE", value: 7, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "pending", label: "PENDING", value: 1, icon: "/media/icons/fancy/active_users.svg", color: "#E9B200" },
	{ id: "suspended", label: "SUSPENDED", value: 1, icon: "/media/icons/user-times.svg", color: "#E4033B" },
]; };
export default function OrganizationPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Organization</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><OrganizationTable /></main>); }
