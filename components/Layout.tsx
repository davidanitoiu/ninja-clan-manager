import Link from "next/link";
import { ReactNode } from "react";
import { FaUserNinja, FaUsers } from "react-icons/fa";
import { GiGrainBundle, GiPagoda, GiPestleMortar, GiRunningNinja, GiTavernSign, GiTiedScroll, GiWizardStaff } from "react-icons/gi";

interface LayoutProps {
    children: ReactNode,
}

function Layout({ children }: LayoutProps) {

    return (
        <div className="flex h-screen">
            <aside className="w-full max-w-xs bg-theme-black text-theme-white " aria-label="Sidebar">
                <div className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <GiWizardStaff className="text-xl" />
                                    Headmaster
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/ninja">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <FaUserNinja className="text-xl" />
                                    Ninjas
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <GiTavernSign className="text-xl" />
                                    Den
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <GiPagoda className="text-xl" />
                                    School
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <GiTiedScroll className="text-xl" />
                                    Messages
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <FaUsers className="text-xl" />
                                    Staff
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <GiGrainBundle className="text-xl" />
                                    Finances
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <GiRunningNinja className="text-xl" />
                                    Training
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center px-4 py-2 gap-4">
                                    <GiPestleMortar className="text-xl" />
                                    Doctor
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
            {children}
        </div>
    )
}

export default Layout;
