"use client";

import { useState } from "react";
import Navbar from "@/components/layout/NavBar/NavBar";
import Sidebar from "@/components/layout/SideBar/SideBar";
import styles from "./layout.module.scss";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileMenuToggleSignal, setMobileMenuToggleSignal] = useState(0);

  return (
    <main className={styles.dashboard}>
      <Navbar onHamburgerClick={() => setMobileMenuToggleSignal((prev) => prev + 1)} />
      <div className={styles.body}>
        <Sidebar mobileMenuToggleSignal={mobileMenuToggleSignal} />
        <section className={styles.content}>{children}</section>
      </div>
    </main>
  );
}
