"use client";

import React, { useState, useEffect } from 'react';
import styles from './PreferencesView.module.scss';

interface ToggleFieldProps {
	label: string;
	description: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

const ToggleField: React.FC<ToggleFieldProps> = ({ label, description, checked, onChange }) => (
	<div className={styles.field}>
		<div className={styles.fieldInfo}>
			<p className={styles.fieldLabel}>{label}</p>
			<p className={styles.fieldDescription}>{description}</p>
		</div>
		<div className={styles.fieldControl}>
			<label className={styles.toggle}>
				<input type="checkbox" className={styles.toggleInput} checked={checked} onChange={(e) => onChange(e.target.checked)} />
				<span className={styles.toggleSlider} />
			</label>
		</div>
	</div>
);

interface SelectFieldProps {
	label: string;
	description: string;
	value: string;
	options: { label: string; value: string }[];
	onChange: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, description, value, options, onChange }) => (
	<div className={styles.field}>
		<div className={styles.fieldInfo}>
			<p className={styles.fieldLabel}>{label}</p>
			<p className={styles.fieldDescription}>{description}</p>
		</div>
		<div className={styles.fieldControl}>
			<select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>{opt.label}</option>
				))}
			</select>
		</div>
	</div>
);

interface PreferencesViewProps {
	className?: string;
}

const PreferencesView: React.FC<PreferencesViewProps> = ({ className = '' }) => {
	const [loading, setLoading] = useState(true);
	const [showToast, setShowToast] = useState(false);

	// Notification Preferences
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [smsNotifications, setSmsNotifications] = useState(true);
	const [pushNotifications, setPushNotifications] = useState(true);
	const [loanAlerts, setLoanAlerts] = useState(true);
	const [repaymentReminders, setRepaymentReminders] = useState(true);

	// Security
	const [twoFactorAuth, setTwoFactorAuth] = useState(false);
	const [loginAlerts, setLoginAlerts] = useState(true);
	const [sessionTimeout, setSessionTimeout] = useState("30");

	// Display
	const [language, setLanguage] = useState("en");
	const [timezone, setTimezone] = useState("WAT");
	const [currency, setCurrency] = useState("NGN");
	const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
	const [itemsPerPage, setItemsPerPage] = useState("10");

	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 800);
		return () => clearTimeout(timer);
	}, []);

	const handleSave = () => {
		setShowToast(true);
		setTimeout(() => setShowToast(false), 3000);
	};

	if (loading) {
		return (
			<div className={`${styles.container} ${className}`}>
				<div className={styles.skeleton}>
					{[1, 2, 3].map((i) => <div key={i} className={styles.skeletonCard} />)}
				</div>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.header}>
				<h1 className={styles.title}>Preferences</h1>
				<p className={styles.subtitle}>Manage your notification, security, and display settings</p>
			</div>

			<div className={styles.sections}>
				{/* Notifications */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Notification Preferences</h2>
					<div className={styles.fieldGroup}>
						<ToggleField label="Email Notifications" description="Receive notifications via email" checked={emailNotifications} onChange={setEmailNotifications} />
						<ToggleField label="SMS Notifications" description="Receive notifications via SMS" checked={smsNotifications} onChange={setSmsNotifications} />
						<ToggleField label="Push Notifications" description="Receive in-app push notifications" checked={pushNotifications} onChange={setPushNotifications} />
						<ToggleField label="Loan Application Alerts" description="Get notified of new loan applications" checked={loanAlerts} onChange={setLoanAlerts} />
						<ToggleField label="Repayment Reminders" description="Send automatic repayment reminders to borrowers" checked={repaymentReminders} onChange={setRepaymentReminders} />
					</div>
				</div>

				{/* Security */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Security Settings</h2>
					<div className={styles.fieldGroup}>
						<ToggleField label="Two-Factor Authentication" description="Require 2FA for all admin logins" checked={twoFactorAuth} onChange={setTwoFactorAuth} />
						<ToggleField label="Login Alerts" description="Send email alerts on new login attempts" checked={loginAlerts} onChange={setLoginAlerts} />
						<SelectField label="Session Timeout" description="Automatically log out after inactivity" value={sessionTimeout} onChange={setSessionTimeout} options={[{ label: "15 minutes", value: "15" }, { label: "30 minutes", value: "30" }, { label: "1 hour", value: "60" }, { label: "2 hours", value: "120" }, { label: "Never", value: "0" }]} />
					</div>
				</div>

				{/* Display */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Display Preferences</h2>
					<div className={styles.fieldGroup}>
						<SelectField label="Language" description="Set the dashboard display language" value={language} onChange={setLanguage} options={[{ label: "English", value: "en" }, { label: "French", value: "fr" }, { label: "Hausa", value: "ha" }, { label: "Yoruba", value: "yo" }, { label: "Igbo", value: "ig" }]} />
						<SelectField label="Timezone" description="Set your local timezone for date displays" value={timezone} onChange={setTimezone} options={[{ label: "West Africa Time (WAT)", value: "WAT" }, { label: "Greenwich Mean Time (GMT)", value: "GMT" }, { label: "Central European Time (CET)", value: "CET" }, { label: "Eastern Standard Time (EST)", value: "EST" }]} />
						<SelectField label="Currency" description="Default currency for financial displays" value={currency} onChange={setCurrency} options={[{ label: "Nigerian Naira (₦)", value: "NGN" }, { label: "US Dollar ($)", value: "USD" }, { label: "British Pound (£)", value: "GBP" }, { label: "Euro (€)", value: "EUR" }]} />
						<SelectField label="Date Format" description="Preferred date display format" value={dateFormat} onChange={setDateFormat} options={[{ label: "DD/MM/YYYY", value: "DD/MM/YYYY" }, { label: "MM/DD/YYYY", value: "MM/DD/YYYY" }, { label: "YYYY-MM-DD", value: "YYYY-MM-DD" }]} />
						<SelectField label="Items Per Page" description="Default number of rows in tables" value={itemsPerPage} onChange={setItemsPerPage} options={[{ label: "10", value: "10" }, { label: "20", value: "20" }, { label: "50", value: "50" }, { label: "100", value: "100" }]} />
					</div>
				</div>

				{/* Save */}
				<div className={styles.saveSection}>
					<button className={styles.saveButton} onClick={handleSave}>Save Preferences</button>
				</div>
			</div>

			{showToast && <div className={styles.toast}>Preferences saved successfully!</div>}
		</div>
	);
};

export default PreferencesView;
