import React from 'react';

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
	active: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62' },
	inactive: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' },
	pending: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
	blacklisted: { bg: 'rgba(228, 3, 59, 0.1)', color: '#E4033B' },
	approved: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62' },
	rejected: { bg: 'rgba(228, 3, 59, 0.1)', color: '#E4033B' },
	completed: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62' },
	disbursed: { bg: 'rgba(57, 205, 204, 0.1)', color: '#39CDCC' },
	defaulted: { bg: 'rgba(228, 3, 59, 0.1)', color: '#E4033B' },
	processing: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
	verified: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62' },
	expired: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' },
	draft: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' },
	scheduled: { bg: 'rgba(87, 24, 255, 0.1)', color: '#5718FF' },
	sent: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62' },
	sending: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
	cancelled: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' },
	failed: { bg: 'rgba(228, 3, 59, 0.1)', color: '#E4033B' },
	error: { bg: 'rgba(228, 3, 59, 0.1)', color: '#E4033B' },
	maintenance: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
	running: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
	under_review: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
	converted: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62' },
	written_off: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' },
	dormant: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' },
	frozen: { bg: 'rgba(87, 24, 255, 0.1)', color: '#5718FF' },
	closed: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' },
	suspended: { bg: 'rgba(228, 3, 59, 0.1)', color: '#E4033B' },
	released: { bg: 'rgba(57, 205, 204, 0.1)', color: '#39CDCC' },
	called_upon: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
	on_track: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62' },
	late: { bg: 'rgba(228, 3, 59, 0.1)', color: '#E4033B' },
	waived: { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' },
	paid: { bg: 'rgba(57, 205, 98, 0.06)', color: '#39CD62' },
	on_demand: { bg: 'rgba(57, 205, 204, 0.1)', color: '#39CDCC' },
	rule_based: { bg: 'rgba(57, 205, 204, 0.1)', color: '#39CDCC' },
	scorecard: { bg: 'rgba(87, 24, 255, 0.1)', color: '#5718FF' },
	machine_learning: { bg: 'rgba(245, 95, 68, 0.1)', color: '#F55F44' },
	hybrid: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
	pending_verification: { bg: 'rgba(233, 178, 0, 0.1)', color: '#E9B200' },
};

interface StatusPillProps {
	status: string;
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
	const key = status.toLowerCase().replace(/[\s-]+/g, '_');
	const style = STATUS_STYLES[key] || { bg: 'rgba(84, 95, 125, 0.06)', color: '#545F7D' };

	return (
		<span
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: 30,
				padding: '0 12px',
				borderRadius: 100,
				fontSize: 14,
				fontWeight: 400,
				lineHeight: '16px',
				backgroundColor: style.bg,
				color: style.color,
				whiteSpace: 'nowrap',
			}}
		>
			{status}
		</span>
	);
};

export default StatusPill;
