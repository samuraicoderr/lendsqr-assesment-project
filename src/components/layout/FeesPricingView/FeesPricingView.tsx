"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import GenericTable, { Column, FilterConfig, FilterValues, RowAction } from "@/components/layout/GenericTable/GenericTable";
import StatusPill from "@/components/ui/StatusPill";

type FPRecord = { id: string; name: string; fee_type: string; tier: string; calculation: string; rate: string; min_amount: string; max_amount: string; status: string; effective_from: string };
type ListParams = { filters: FilterValues; page: number; pageSize: number };
type ListResponse = { rows: FPRecord[]; totalPages: number; totalItems: number };
const PAGE_SIZE = 10; const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const seed: FPRecord[] = [
	{ id: "1", name: "Basic Plan – Processing Fee", fee_type: "Processing", tier: "Basic", calculation: "Percentage", rate: "2.0%", min_amount: "₦100", max_amount: "₦5,000", status: "Active", effective_from: "2024-01-01" },
	{ id: "2", name: "Basic Plan – Late Payment", fee_type: "Penalty", tier: "Basic", calculation: "Flat", rate: "₦2,500", min_amount: "—", max_amount: "—", status: "Active", effective_from: "2024-01-01" },
	{ id: "3", name: "Standard Plan – Processing Fee", fee_type: "Processing", tier: "Standard", calculation: "Percentage", rate: "1.5%", min_amount: "₦100", max_amount: "₦10,000", status: "Active", effective_from: "2024-01-01" },
	{ id: "4", name: "Standard Plan – Late Payment", fee_type: "Penalty", tier: "Standard", calculation: "Flat", rate: "₦2,000", min_amount: "—", max_amount: "—", status: "Active", effective_from: "2024-01-01" },
	{ id: "5", name: "Premium Plan – Processing Fee", fee_type: "Processing", tier: "Premium", calculation: "Percentage", rate: "1.0%", min_amount: "₦50", max_amount: "₦25,000", status: "Active", effective_from: "2024-01-01" },
	{ id: "6", name: "Premium Plan – Late Payment", fee_type: "Penalty", tier: "Premium", calculation: "Flat", rate: "₦1,500", min_amount: "—", max_amount: "—", status: "Active", effective_from: "2024-01-01" },
	{ id: "7", name: "Enterprise Plan – Processing Fee", fee_type: "Processing", tier: "Enterprise", calculation: "Percentage", rate: "0.5%", min_amount: "₦0", max_amount: "₦50,000", status: "Active", effective_from: "2024-06-01" },
	{ id: "8", name: "Insurance Premium", fee_type: "Insurance", tier: "All", calculation: "Percentage", rate: "0.5%", min_amount: "₦500", max_amount: "₦25,000", status: "Active", effective_from: "2024-01-01" },
	{ id: "9", name: "Loan Restructuring Fee", fee_type: "Processing", tier: "All", calculation: "Percentage", rate: "1.0%", min_amount: "₦1,000", max_amount: "₦50,000", status: "Active", effective_from: "2024-03-01" },
	{ id: "10", name: "Legacy Processing Fee", fee_type: "Processing", tier: "Legacy", calculation: "Percentage", rate: "3.0%", min_amount: "₦200", max_amount: "₦3,000", status: "Inactive", effective_from: "2022-01-01" },
];
let db: FPRecord[] = [...seed];
const listFP = async ({ filters, page, pageSize }: ListParams): Promise<ListResponse> => {
	await delay(300);
	const filtered = db.filter((i) => { const n = !filters.name || i.name.toLowerCase().includes(filters.name.toLowerCase()); const t = !filters.tier || i.tier === filters.tier; const ft = !filters.fee_type || i.fee_type === filters.fee_type; const s = !filters.status || i.status.toLowerCase() === filters.status.toLowerCase(); return n && t && ft && s; });
	const tp = Math.max(1, Math.ceil(filtered.length / pageSize)); const cp = Math.min(page, tp); const start = (cp - 1) * pageSize;
	return { rows: filtered.slice(start, start + pageSize), totalPages: tp, totalItems: filtered.length };
};
export default function FeesPricingTable() {
	const [rows, setRows] = useState<FPRecord[]>([]); const [loading, setLoading] = useState(true); const [page, setPage] = useState(1); const [itemsPerPage, setItemsPerPage] = useState(PAGE_SIZE); const [totalPages, setTotalPages] = useState(1); const [totalItems, setTotalItems] = useState(0); const [filters, setFilters] = useState<FilterValues>({});
	const runList = useCallback(async () => { setLoading(true); try { const res = await listFP({ filters, page, pageSize: itemsPerPage }); setRows(res.rows); setTotalPages(res.totalPages); setTotalItems(res.totalItems); } finally { setLoading(false); } }, [filters, itemsPerPage, page]);
	useEffect(() => { runList(); }, [runList]);
	const columns: Column<FPRecord>[] = useMemo(() => [
		{ key: "name", title: "NAME", sortable: true, filterable: true },
		{ key: "fee_type", title: "FEE TYPE", sortable: true, filterable: true },
		{ key: "tier", title: "TIER", sortable: true, filterable: true, render: (v: string) => <StatusPill status={v} /> },
		{ key: "calculation", title: "CALCULATION", sortable: true },
		{ key: "rate", title: "RATE", sortable: true },
		{ key: "min_amount", title: "MINIMUM", sortable: true },
		{ key: "max_amount", title: "MAXIMUM", sortable: true },
		{ key: "status", title: "STATUS", sortable: true, filterable: true },
		{ key: "effective_from", title: "EFFECTIVE FROM", sortable: true, render: (v: string) => { const d = new Date(v); return isNaN(d.getTime()) ? v : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }); } },
	], []);
	const filterConfig: FilterConfig[] = useMemo(() => [
		{ key: "name", label: "Name", type: "text", placeholder: "Search fees" },
		{ key: "fee_type", label: "Fee Type", type: "select", options: Array.from(new Set(seed.map((s) => s.fee_type))).map((t) => ({ label: t, value: t })) },
		{ key: "tier", label: "Tier", type: "select", options: [{ label: "Basic", value: "Basic" }, { label: "Standard", value: "Standard" }, { label: "Premium", value: "Premium" }, { label: "Enterprise", value: "Enterprise" }, { label: "All", value: "All" }] },
		{ key: "status", label: "Status", type: "select", options: [{ label: "Active", value: "Active" }, { label: "Inactive", value: "Inactive" }] },
	], []);
	const handleFilter = useCallback((f: FilterValues) => { setPage(1); setFilters(f); }, []);
	const handleReset = useCallback(() => { setPage(1); setFilters({}); }, []);
	const handleItemsPerPageChange = useCallback((n: number) => { setItemsPerPage(n); setPage(1); }, []);
	const rowActions: RowAction[] = useMemo(() => [
		{ id: "view", label: "View Details", icon: <img src="/media/icons/eye.svg" alt="" width={16} height={16} />, onClick: (row: FPRecord) => { console.log("View:", row.id); } },
		{ id: "toggle", label: "Toggle Status", icon: <img src="/media/icons/sliders.svg" alt="" width={16} height={16} />, onClick: async (row: FPRecord) => { setLoading(true); db = db.map((f) => f.id === row.id ? { ...f, status: f.status === "Active" ? "Inactive" : "Active" } : f); await runList(); } },
	], [runList]);
	return (<GenericTable<FPRecord> columns={columns} data={rows} filters={filterConfig} rowActions={rowActions} showRowActions onFilter={handleFilter} onReset={handleReset} loading={loading} emptyMessage="No fee structures found" pagination={{ currentPage: page, totalPages, totalItems, itemsPerPage, onPageChange: setPage, onItemsPerPageChange: handleItemsPerPageChange }} />);
}
