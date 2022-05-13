import React from "react";
import styles from "../nav/navBar.module.css";
import Link from "next/link";
import Image from 'next/image';

const NavBar = (props) => {
  const { username } = props;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image src={'/static/netflixLogo.png'} alt="logo" width="300px" height="100%"/>
          </div>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem}>Home</li>
          <li className={styles.navItem2}>My List</li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
              {/*Expand Icon goes here*/}
            </button>

            <div className={styles.navDropdown}>
              <div>
                <a className={styles.linkName} href="">
                  Sign Out
                </a>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
