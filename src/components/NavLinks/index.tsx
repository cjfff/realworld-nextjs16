"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLinks = ({
  navs,
}: {
  navs: Array<{
    name: string;
    href: string;
  }>;
}) => {
  const pathname = usePathname()

  return (
    <ul className="nav nav-pills outline-active">
      {navs.map((item) => {
        return (
          <li className="nav-item" key={item.name}>
            <Link
              className={clsx("nav-link", {
                active: pathname === item.href,
              })}
              href={item.href}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
