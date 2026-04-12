"use client";

import React, { useState, useEffect } from 'react';
import StatisticsCards, { type StatisticItem } from '@/components/layout/StatisticsCards/StatisticsCards';
import styles from './DashboardView.module.scss';

interface ActivityItem {
	id: string;
	action: string;
	user: string;
	timestamp: string;
	color: string;
	icon: string;
}

interface QuickAction {
	id: string;
	title: string;
	description: string;
	href: string;
	icon: string;
	color: string;
}

const fetchDashboardStats = async (): Promise<StatisticItem[]> => {
	await new Promise((r) => setTimeout(r, 800));
	return [
		{ id: 'users', label: 'USERS', value: 2453, icon: '/media/icons/fancy/all_users.svg', color: '#DF18FF' },
		{ id: 'active_users', label: 'ACTIVE USERS', value: 2453, icon: '/media/icons/fancy/active_users.svg', color: '#5718FF' },
		{ id: 'users_with_loans', label: 'USERS WITH LOANS', value: 12453, icon: '/media/icons/fancy/users_with_loan.svg', color: '#F55F44' },
		{ id: 'users_with_savings', label: 'USERS WITH SAVINGS', value: 102453, icon: '/media/icons/fancy/users_with_savings.svg', color: '#FF3366' },
	];
};

const RECENT_ACTIVITY: ActivityItem[] = [
	{ id: '1', action: 'submitted a loan request for ₦250,000', user: 'Adeyemi Okafor', timestamp: '2 minutes ago', color: '#F55F44', icon: '/media/icons/sack.svg' },
	{ id: '2', action: 'completed KYC verification', user: 'Tolani Bakare', timestamp: '15 minutes ago', color: '#39CD62', icon: '/media/icons/user-check.svg' },
	{ id: '3', action: 'made a loan repayment of ₦45,000', user: 'Obinna Chukwu', timestamp: '32 minutes ago', color: '#39CDCC', icon: '/media/icons/coins-solid.svg' },
	{ id: '4', action: 'registered a new account', user: 'Khadija Ibrahim', timestamp: '1 hour ago', color: '#5718FF', icon: '/media/icons/user-friends.svg' },
	{ id: '5', action: 'was blacklisted due to loan default', user: 'David Nwankwo', timestamp: '2 hours ago', color: '#E4033B', icon: '/media/icons/user-times.svg' },
	{ id: '6', action: 'opened a target savings account', user: 'Favour Adichie', timestamp: '3 hours ago', color: '#DF18FF', icon: '/media/icons/piggy-bank.svg' },
	{ id: '7', action: 'had loan request approved for ₦500,000', user: 'Kingsley Obi', timestamp: '4 hours ago', color: '#39CD62', icon: '/media/icons/handshake-regular.svg' },
	{ id: '8', action: 'updated profile information', user: 'Gloria Osei', timestamp: '5 hours ago', color: '#545F7D', icon: '/media/icons/user-cog.svg' },
];

const QUICK_ACTIONS: QuickAction[] = [
	{ id: 'users', title: 'Manage Users', description: 'View and manage all platform users', href: '/dashboard/users', icon: '/media/icons/user-friends.svg', color: '#DF18FF' },
	{ id: 'loans', title: 'Active Loans', description: 'Monitor active loan portfolio', href: '/dashboard/loans', icon: '/media/icons/sack.svg', color: '#F55F44' },
	{ id: 'requests', title: 'Loan Requests', description: 'Review pending loan applications', href: '/dashboard/loan-requests', icon: '/media/icons/Group.svg', color: '#E9B200' },
	{ id: 'savings', title: 'Savings Accounts', description: 'Track savings and deposits', href: '/dashboard/savings', icon: '/media/icons/piggy-bank.svg', color: '#39CDCC' },
];

interface DashboardViewProps {
	className?: string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ className = '' }) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	const now = new Date();
	const dateStr = now.toLocaleDateString('en-GB', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	if (loading) {
		return (
			<div className={`${styles.container} ${className}`}>
				<div className={styles.skeletonCards}>
					{[1, 2, 3, 4].map((i) => (
						<div key={i} className={styles.skeletonCard} />
					))}
				</div>
				<div className={styles.contentGrid}>
					<div className={styles.skeletonFullCard} />
					<div className={styles.skeletonFullCard} />
				</div>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${className}`}>
			{/* Welcome Header */}
			<div className={styles.welcomeHeader}>
				<h1 className={styles.greeting}>Dashboard</h1>
				<span className={styles.dateText}>{dateStr}</span>
			</div>

			{/* Statistics Cards */}
			<StatisticsCards fetchStats={fetchDashboardStats} className="mb-40" />

			{/* Content Grid */}
			<div className={styles.contentGrid}>
				{/* Recent Activity */}
				<div className={styles.card}>
					<h2 className={styles.cardTitle}>Recent Activity</h2>
					<div className={styles.activityList}>
						{RECENT_ACTIVITY.map((activity) => (
							<div key={activity.id} className={styles.activityItem}>
								<div
									className={styles.activityIconWrapper}
									style={{ backgroundColor: `${activity.color}15` }}
								>
									<img src={activity.icon} alt="" className={styles.activityIcon} />
								</div>
								<div className={styles.activityContent}>
									<p className={styles.activityText}>
										<strong>{activity.user}</strong> {activity.action}
									</p>
									<span className={styles.activityTime}>{activity.timestamp}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Quick Actions */}
				<div className={styles.card}>
					<h2 className={styles.cardTitle}>Quick Actions</h2>
					<div className={styles.quickActionsGrid}>
						{QUICK_ACTIONS.map((action) => (
							<a key={action.id} className={styles.quickAction} href={action.href}>
								<div
									className={styles.quickActionIcon}
									style={{ backgroundColor: `${action.color}15` }}
								>
									<img src={action.icon} alt="" />
								</div>
								<div className={styles.quickActionText}>
									<span className={styles.quickActionTitle}>{action.title}</span>
									<span className={styles.quickActionDesc}>{action.description}</span>
								</div>
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardView;
