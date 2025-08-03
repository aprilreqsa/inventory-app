"use client";
import clsx from "clsx"
import { signOut } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Suppliers", href: "/dashboard/suppliers" },
    { name: "Categories", href: "/dashboard/categories" },
    
]

export default function Navigation(){
    const pathName = usePathname()

    return (
        <nav className="bg-gray-800 h-16 flex justify-between p-2">
            <div>
                <Link href="/dashboard" className="text-white text-3xl font-bold p-4">
                    Inventory App
                </Link>
            </div>
            <div className="flex flex-row gap-2 p-1 justify-end h-10">
            {links.map((link)=> {
                return (
                    <Link
                    key={link.name}
                    href={link.href}
                    className={clsx('flex text-white items-center gap-2 p-2 rounded-md hover:bg-gray-700', {
                        'bg-gray-700': pathName === link.href}
                    )}
                    >
                    {link.name}
                    </Link>
                )
            })}
            <button
            className="flex items-center px-2 py-3 rounded-md  text-white hover:bg-gray-700"
            onClick={()=> signOut()}
            >Logout</button>
        </div>
        </nav>
        
    )
}