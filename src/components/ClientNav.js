import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const ClientNav = () => {
    
    const session = useSession();


    
    const menu = [
        {
            name: "Home", url: "/client"
        },
        {
            name: "Assessments", url: "/client/assessments"
        },
    ]
    
    const profilemenu = [
        {
            name: "profile", url: "/client/profile"
        },
        {
            name: "logout", url: "/api/auth/signout?callbackUrl=/"
        },
    ]

    return (
        <nav className="flex-between w-full pt-3 drop-shadow-lg rounded">
            {/*<Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/icons/a.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
            </Link>*/}

            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <button
                        className="btn btn-ghost normal-case text-xl"
                    >
                            Assessor
                    </button>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex items-center">
                        {
                            menu.map((item, key) => (
                                <li key={key}>
                                    <Link href={item.url}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))
                        }
                        <li>
                            {
                                session ? 
                                //<Link href="/api/auth/signout?callbackUrl=/">
                                  //  Logout
                                //</Link> 
                                <div className="dropdown dropdown-bottom">
                                    <div tabIndex={0} role="button" className="avatar">
                                        <div className="w-8 rounded-full">
                                            <Image 
                                                src={session.data?.userData?.image}
                                                height={100}
                                                width={100}
                                                />
                                        </div>
                                    </div>
                                    <div tabIndex={0} className="dropdown-content card bg-base-100 shadow-xl">
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {session.data?.userData?.name}
                                            </h2>
                                            <div className="badge badge-secondary">
                                                {session.data?.userData?.points || 0}
                                            </div>
                                        </div>
                                        <ul className="menu menu-sm mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                            {
                                                profilemenu.map((item, key) => (
                                                    <li key={key}>
                                                        <Link href={item.url}>
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                :
                                <Link href="/api/auth/signin">
                                    Login
                                </Link>
                            }
                        </li>
                    </ul>
                </div>

                <div className="navbar-end lg:hidden">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                menu.map((item, key) => (
                                    <li key={key}>
                                        <Link href={item.url}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))
                            }
                            <li>
                                {
                                    session ?
                                    <Link href="/api/auth/signout?callbackUrl=/">
                                        Logout
                                    </Link> :
                                    <Link href="/api/auth/signin">
                                        Login
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default ClientNav