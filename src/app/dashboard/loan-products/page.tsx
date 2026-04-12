"use client";
import StatisticsCards, { type StatisticItem } from "@/components/layout/StatisticsCards/StatisticsCards";
import LoanProductsTable from "@/components/layout/LoanProductsTable/LoanProductsTable";
const fetchStats = async (): Promise<StatisticItem[]> => { await new Promise((r) => setTimeout(r, 800)); return [
	{ id: "total", label: "TOTAL PRODUCTS", value: 8, icon: "/media/icons/sack.svg", color: "#DF18FF" },
	{ id: "active", label: "ACTIVE", value: 7, icon: "/media/icons/user-check.svg", color: "#39CD62" },
	{ id: "guarantor", label: "REQUIRE GUARANTOR", value: 4, icon: "/media/icons/users.svg", color: "#E9B200" },
	{ id: "avg_rate", label: "AVG INTEREST RATE", value: 15, icon: "/media/icons/badge-percent.svg", color: "#5718FF" },
]; };
export default function LoanProductsPage() { return (<main style={{ padding: "32px" }}><h1 className="main-title">Loan Products</h1><StatisticsCards fetchStats={fetchStats} className="mb-40" /><LoanProductsTable /></main>); }
