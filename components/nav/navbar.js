import { React, useState, useEffect } from "react";
import styles from "../nav/navBar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { magic } from '../../lib/magic-client';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('...');
  const router = useRouter();

  useEffect( ()  => {
    async function fetchMetaData() {
    try {
      const { email } = await magic.user.getMetadata();
      if (email) {
        setUsername(email);
      }
      console.log({email})
    } catch (error) {
      console.error('Error getting user metadata', error)
    }
    }
    fetchMetaData();
  }, []);




  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  const handleCloseDropdownOnWindowClick = (e) => {
    e.preventDefault();
    setShowDropdown(false);
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      router.push("/login")
      console.log(await magic.user.isLoggedIn()); // => `false`
    } catch (error) {
      console.log("error logging out", error);
    }
  }




  return (
    <div className='fixed top-0 z-100 w-full bg-gradient-to-b from-black'>
      <div className='flex p-5 px-12'>
        <Link className='flex items-center mb-4 text-base font-medium' href="/">
          <div className='w-32 cursor-pointer'>
            <Image
              src={"/static/netflixLogo.svg"}
              alt="Netflix logo"
              width="300px"
              height="100%"
            />
          </div>
        </Link>

        <ul className='flex flex-row items-center w-6/12 ml-12 gap-x-8 text-base leading-5'>
          <li className='mr-3 text-base font-semibold cursor-pointer' onClick={handleOnClickHome}>
            Home
          </li>
          <li className='cursor-pointer min-w-max' onClick={handleOnClickMyList}>
            My List
          </li>
          {/* <li>
            <input id='search-bar' type="search" className='rounded p-2 focus:outline-none text-black10' placeholder="Search"/>
          </li> */}
        </ul>

        <nav className='flex items-start ml-auto'>
          <div>
            <button className='flex items-center overflow-hidden' onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image src='/static/expand_more.svg' alt='expand more' width='32px' height='32px'></Image>
            </button>

            {showDropdown && (
              <div className='relative'>
                <Link href='/login' >
                  <div onClick={handleSignout} className='absolute right-0 ml-auto mt-2 flex items-center justify-center rounded cursor-pointer bg-black p-2 border border-transparent hover:border-[#666666]'>
                      Sign Out
                  </div>
                </Link>
                <div className="w-screen h-screen left-0 top-[100px] fixed " onClick={handleCloseDropdownOnWindowClick}></div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
