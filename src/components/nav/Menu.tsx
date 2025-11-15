"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactElement } from "react"

export const Menu = ({ menus }: {
    menus: Array<{
        path: string,
        children: string | ReactElement
    }>
}) => {
    const pathanme = usePathname()
    return <>
        {
            menus.map(item => {
                return <li className="nav-item" key={item.path}>
                    <Link className={clsx("nav-link", pathanme === item.path ? 'active' : '')} href={item.path}>
                        {item.children}
                    </Link>
                </li>
            })
        }
    </>
}