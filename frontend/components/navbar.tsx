"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const navItems = {
  "/": { name: "home" },
  "/about": { name: "about" },
};

export default function Sidebar() {
  let pathname = usePathname() || "/";

  return (
    <header className="fixed top-0 left-0 py-8 px-[50px] bg-white w-full z-10">
      <nav
        className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
        id="nav"
      >
        <div className="flex flex-row ml-auto">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname;
            return (
              <Link
                key={path}
                href={path}
                className={clsx(
                  "transition-all duration-300 tracking-wide text-gray-400 hover:text-gray-700 text-left ml-auto mr-auto px-5 py-2 no-underline inline-block relative uppercase text-xs font-serif-medium",
                  {
                    "": !isActive,
                    "text-gray-800 font-serif-semibold": isActive,
                  }
                )}
              >
                {name}
              </Link>
            );
          })}
          {/* <ThemeToggle /> */}
        </div>
      </nav>
    </header>
  );
}
