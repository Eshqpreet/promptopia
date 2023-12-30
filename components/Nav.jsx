"use client";
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
    const { data:session}=useSession();
    const [providers, setProviders] = useState(null);
    const [toggledrop, setToggledrop] = useState(false);
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setUpProviders();
    }, [])
    return (
        <nav className="flex justify-between w-full mb-16 pt-3">
            <Link href={"/"} className="flex gap-2 justify-center items-center">
                <Image src={"/assets/images/logo.svg"} alt="promptopia-logo" width={30} height={30} className="object-contain" />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* {alert(session?.user)} */}
            <div className="md:flex hidden">
                {session?.user && (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn"
                        >Create Post
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href={"/profile"}>
                            <Image src={session?.user.image} width={37} height={37} className="rounded-full" />
                        </Link>
                    </div>
                )}
                {!session?.user && (
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                    Sign In
                                </button>
                            ))
                        }
                    </div>
                )}
            </div>
            <div className="md:hidden flex relative">
                {session?.user && (
                    <div className="flex">
                        <Image src={session?.user.image}
                            width={30} height={30}
                            className="rounded-full" onClick={() => { setToggledrop((prev) => !prev) }} />
                        {toggledrop && (
                            <div className="dropdown">
                                <Link href={"/profile"} className="dropdown_link" onClick={() => setToggledrop(false)}>
                                    My Profile
                                </Link>
                                <Link href={"/create-prompt"} className="dropdown_link" onClick={() => setToggledrop(false)}>
                                    Create Prompt
                                </Link>
                                <button type="button" onClick={()=>{setToggledrop(false); signOut()}} className="mt-5 w-full black_btn">
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                )}
                {!session?.user && (
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className="black_btn">
                                    Sign In
                                </button>
                            ))
                        }
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Nav;