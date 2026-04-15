"use client";

import { useState } from "react";
import Navbar from "@/components/layout/NavBar/NavBar";
import NotificationsPanel from "@/components/layout/NotificationsPanel/NotificationsPanel";
import Sidebar from "@/components/layout/SideBar/SideBar";
import styles from "./layout.module.scss";
import { ProtectedRoute, useAuth } from "@/lib/api/auth/authContext";
import appConfig from "@/lib/appconfig";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { logout, user } = useAuth();
  const [mobileMenuToggleSignal, setMobileMenuToggleSignal] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <ProtectedRoute>
      <main className={styles.dashboard}>
        <Navbar
          userName={user?.first_name ?? "Williams"}
          userAvatar={user?.profile_picture ?? user?.picture_url ?? appConfig.media.avatarExample}
          onHamburgerClick={() => setMobileMenuToggleSignal((prev) => prev + 1)}
          onNotificationClick={() => setIsNotificationsOpen((prev) => !prev)}
          onLogout={() => void logout()}
        />
        <div className={styles.body}>
          <Sidebar mobileMenuToggleSignal={mobileMenuToggleSignal} />
          <section className={styles.content}>{children}</section>
        </div>
        <NotificationsPanel open={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      </main>
    </ProtectedRoute>
  );
}
