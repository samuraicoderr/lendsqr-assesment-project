"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import AuditLogsTable from "@/components/layout/AuditLogsTable/AuditLogsTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL LOGS", value: 48752, icon: "/media/icons/clipboard-list.svg", color: "#DF18FF" },
	{ id: "today", label: "TODAY", value: 127, icon: "/media/icons/fancy/active_users.svg", color: "#5718FF" },
	{ id: "week", label: "THIS WEEK", value: 843, icon: "/media/icons/chart-bar.svg", color: "#39CDCC" },
	{ id: "month", label: "THIS MONTH", value: 3291, icon: "/media/icons/scroll.svg", color: "#F55F44" },
]; };
export default function AuditLogsPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Audit Logs</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><AuditLogsTable /></main>); }
