"use client";

import { Home, Calendar, User, Bot, ChartBar } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
import { ROUTES } from "@/constants/routes";
export const BottomTabs = () => {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-10 bg-white border-t">
      <div className="flex justify-between items-center px-4 py-2">
        <NavItem
          href={ROUTES.HOME}
          icon={<Home size={24} />}
          label="홈"
          isActive={pathname === ROUTES.HOME}
        />
        <NavItem
          href={ROUTES.SCHEDULE}
          icon={<Calendar size={24} />}
          label="일정"
          isActive={pathname === ROUTES.SCHEDULE}
        />
        <NavItem
          href={ROUTES.CHATBOT}
          icon={<Bot size={24} />}
          label="챗봇"
          isActive={pathname === ROUTES.CHATBOT}
        />
        <NavItem
          href={ROUTES.ANALYSIS}
          icon={<ChartBar size={24} />}
          label="분석"
          isActive={pathname === ROUTES.ANALYSIS}
        />
        <NavItem
          href={ROUTES.PROFILE}
          icon={<User size={24} />}
          label="프로필"
          isActive={pathname === ROUTES.PROFILE}
        />
      </div>
    </nav>
  );
};
