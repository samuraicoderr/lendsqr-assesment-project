"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import SystemsMessagesTable from "@/components/layout/SystemsMessagesTable/SystemsMessagesTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL MESSAGES", value: 248, icon: "/media/icons/bell.svg", color: "#DF18FF" },
	{ id: "sent", label: "SENT", value: 210, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "draft", label: "DRAFT", value: 18, icon: "/media/icons/clipboard-list.svg", color: "#545F7D" },
	{ id: "scheduled", label: "SCHEDULED", value: 20, icon: "/media/icons/fancy/active_users.svg", color: "#5718FF" },
]; };
export default function SystemsMessagesPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Systems Messages</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><SystemsMessagesTable /></main>); }
