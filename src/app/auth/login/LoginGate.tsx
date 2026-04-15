"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FrontendLinks from "@/lib/FrontendLinks";
import { useAuth } from "@/lib/api/auth/authContext";
import { getSafeNextPath } from "@/lib/api/auth/redirect";

export default function LoginGate() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }

    const next = getSafeNextPath(searchParams.get("next"), FrontendLinks.dashboard);
    router.replace(next);
  }, [isAuthenticated, isLoading, router, searchParams]);

  return null;
}
