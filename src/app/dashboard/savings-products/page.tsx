"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import SavingsProductsTable from "@/components/layout/SavingsProductsTable/SavingsProductsTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL PRODUCTS", value: 8, icon: "/media/icons/piggy-bank.svg", color: "#DF18FF" },
	{ id: "active", label: "ACTIVE", value: 7, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "regular", label: "REGULAR SAVINGS", value: 3, icon: "/media/icons/np_bank.svg", color: "#5718FF" },
	{ id: "fixed", label: "FIXED DEPOSITS", value: 2, icon: "/media/icons/coins-solid.svg", color: "#F55F44" },
]; };
export default function SavingsProductsPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Savings Products</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><SavingsProductsTable /></main>); }
