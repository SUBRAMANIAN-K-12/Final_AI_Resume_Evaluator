"use client";

import { usePathname } from "next/navigation";
import Header from "./Header"; // Homepage Header
import SecondHeader from "./SecondHeader"; // New Header for Other Pages

const HeaderSwitcher = () => {
  const pathname = usePathname();
  
  // Use SecondHeader for all pages except Home
  const useAuthHeader = pathname !== "/";

  return useAuthHeader ? <SecondHeader /> : <Header />;
};

export default HeaderSwitcher;
