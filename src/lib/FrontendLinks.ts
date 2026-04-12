const FrontendLinks = {
    home: "/",
    mainWebsite: "https://lendsqr.com/",
    // auth
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    // dashboard
    dashboard: "/dashboard",
    // customers
    users: "/dashboard/users",
    userDetails: (id: string) => `/dashboard/users/${id}`,
    guarantors: "/dashboard/guarantors",
    loans: "/dashboard/loans",
    loanDetails: (id: string) => `/dashboard/loans/${id}`,
    decisionModels: "/dashboard/decision-models",
    savings: "/dashboard/savings",
    loanRequests: "/dashboard/loan-requests",
    whitelist: "/dashboard/whitelist",
    karma: "/dashboard/karma",
    borrowers: "/dashboard/borrowers",
    borrowerDetails: (id: string) => `/dashboard/borrowers/${id}`,
    // businesses
    organization: "/dashboard/organization",
    loanProducts: "/dashboard/loan-products",
    savingsProducts: "/dashboard/savings-products",
    feesCharges: "/dashboard/fees-charges",
    transactions: "/dashboard/transactions",
    services: "/dashboard/services",
    serviceAccount: "/dashboard/service-account",
    settlements: "/dashboard/settlements",
    reports: "/dashboard/reports",
    // settings
    preferences: "/dashboard/preferences",
    feesPricing: "/dashboard/fees-pricing",
    auditLogs: "/dashboard/audit-logs",
    systemsMessages: "/dashboard/systems-messages",
}

export default FrontendLinks;