import Link from "next/link";
import { ReactNode } from "react";
import { FaUserNinja, FaUsers } from "react-icons/fa";
import { GiGrainBundle, GiPagoda, GiPestleMortar, GiRunningNinja, GiTavernSign, GiTiedScroll, GiWizardStaff } from "react-icons/gi";

interface LayoutProps {
    children: ReactNode,
}

function Layout({ children }: LayoutProps) {

    return (
        <div className="grid grid-cols-[auto_1fr] h-screen">
            <nav className="bg-theme-black text-theme-white">
                <ul className="grid gap-4 p-4">
                    <li>
                        <Link 
                            href="/ninja"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <FaUserNinja />
                            <span>Ninjas</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <GiTavernSign />
                            <span>Den</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <GiPagoda />
                            <span>School</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <GiTiedScroll />
                            <span>Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <FaUsers />
                            <span>Staff</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <GiGrainBundle />
                            <span>Finances</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <GiRunningNinja />
                            <span>Training</span>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            href="/"
                            className="flex items-center gap-2 hover:text-primary transition-colors"
                        >
                            <GiPestleMortar />
                            <span>Doctor</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            {children}
        </div>
    )
}

export default Layout;
