"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './StatisticsCards.module.scss';

export interface StatisticItem {
	id: string;
	label: string;
	value: number;
	icon: string;
	color: string;
}

interface StatisticsCardsProps {
	fetchStats: () => Promise<StatisticItem[]>;
	className?: string;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ fetchStats, className = '' }) => {
	const [statistics, setStatistics] = useState<StatisticItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const fetchStatsRef = useRef(fetchStats);
	fetchStatsRef.current = fetchStats;

	useEffect(() => {
		let cancelled = false;

		const loadData = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await fetchStatsRef.current();
				if (!cancelled) {
					setStatistics(data);
				}
			} catch (err) {
				if (!cancelled) {
					setError('Failed to load statistics');
					console.error('Statistics fetch error:', err);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

		loadData();
		return () => {
			cancelled = true;
		};
	}, []);

	const formatNumber = (num: number): string => num.toLocaleString('en-US');

	if (loading) {
		return (
			<div className={`${styles.container} ${className}`}>
				<div className={styles.skeletonGrid}>
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className={styles.skeletonCard}>
							<div className={styles.skeletonIcon} />
							<div className={styles.skeletonLabel} />
							<div className={styles.skeletonValue} />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={`${styles.container} ${className}`}>
				<div className={styles.error}>
					<span>{error}</span>
					<button onClick={() => window.location.reload()}>Retry</button>
				</div>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.grid}>
				{statistics.map((stat) => (
					<div key={stat.id} className={styles.card}>
						<div
							className={styles.iconWrapper}
						>
							<img
								src={stat.icon}
								alt=""
								className={styles.icon}
								style={{ color: stat.color }}
							/>
						</div>
						<span className={styles.label}>{stat.label}</span>
						<span className={styles.value}>{formatNumber(stat.value)}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default StatisticsCards;
