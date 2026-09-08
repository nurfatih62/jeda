"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase/client";
import { TabsLink } from "./tabs-link";
import type { TabsLinkKey } from "./tabs-link";

export function PersonalizedTabs({
  activeTab,
  basePath,
}: {
  activeTab: TabsLinkKey;
  basePath: string;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Gagal memeriksa status login:", error);
        if (mounted) setIsLoggedIn(false);
        return;
      }
      if (mounted) setIsLoggedIn(Boolean(data.session?.user));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setIsLoggedIn(Boolean(session?.user));
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loggedIn = isLoggedIn === true;

  return (
    <TabsLink
      activeTab={loggedIn && activeTab === "untukmu" ? "untukmu" : activeTab === "terbaru" ? "terbaru" : "populer"}
      basePath={basePath}
      variant={loggedIn ? "logged-in" : "default"}
    />
  );
}
