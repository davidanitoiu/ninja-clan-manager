import Link from "next/link";
import { ReactNode } from "react";
import { GiRunningNinja, GiPestleMortar, GiWizardStaff, GiGrainBundle, GiPagoda, GiTavernSign, GiTiedScroll } from "react-icons/gi";
import { FaUserNinja, FaUsers } from "react-icons/fa";
import { useRouter } from "next/router";

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    const router = useRouter();

    return (
        <div className="flex h-screen">
            <aside className="w-full max-w-xs bg-theme-black text-theme-white " aria-label="Sidebar">
                <div className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <GiWizardStaff className="text-xl" />
                                    <span className="ml-3">Headmaster</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <FaUserNinja className="text-xl" />
                                    <span className="ml-3">Ninjas</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <GiTavernSign className="text-xl" />
                                    <span className="ml-3">Den</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <GiPagoda className="text-xl" />
                                    <span className="ml-3">School</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <GiTiedScroll className="text-xl" />
                                    <span className="ml-3">Messages</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <FaUsers className="text-xl" />
                                    <span className="ml-3">Staff</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <GiGrainBundle className="text-xl" />
                                    <span className="ml-3">Finances</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <GiRunningNinja className="text-xl" />
                                    <span className="ml-3">Training</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className="flex items-center p-2">
                                    <GiPestleMortar className="text-xl" />
                                    <span className="ml-3">Doctor</span>
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
