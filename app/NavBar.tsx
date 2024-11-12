'use client';

import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import { FaCarRear } from "react-icons/fa6";
import classnames from 'classnames';

const NavBar = () => {

    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Modules', href: '/modules' }
    ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><FaCarRear /></Link>
        <ul className='flex space-x-6'>
            { links.map(link => 
            <li>
                <Link 
                key={link.href} 
                className={
                    classnames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath, 
                        'hover:text-zinc-800 transition-colors': true
                    })
                }
                href={link.href}>{link.label}</Link>
            </li> 
            )}
        </ul>
    </nav>
  )
}

export default NavBar