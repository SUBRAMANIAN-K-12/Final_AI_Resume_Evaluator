"use client";

import HeaderSwitcher from "../components/HeaderSwitcher";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

const ClientWrapper = ({ children }) => {
  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard"; 

  return (
    <>
      <HeaderSwitcher />
      {children}
      {!isDashboardPage && <Footer />} 
    </>
  );
};

export default ClientWrapper;
