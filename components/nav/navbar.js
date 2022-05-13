import { React, useState, useRef, useEffect } from "react";
import styles from "../nav/navBar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const NavBar = (props) => {
  const { username } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

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

  const dropdown = useRef(null);

  useEffect(() => {
    if(!showDropdown) return;
    function handleClick(e) {
      if (dropdown.current && !dropdown.current(e.target)) {
        setShowDropdown(false);
        consol.log('hllllllo');
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src={"/static/netflixLogo.png"}
              alt="logo"
              width="300px"
              height="100%"
            />
          </div>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username} &#9660; </p>
              {/*Expand Icon goes here*/}
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <Link href="/login">
                  <div>
                    <div>
                      <p className={styles.linkName}>Sign Out</p>
                    </div>
                    <div className={styles.lineWrapper}></div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
