"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/navbar.module.scss";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/indexRoom/">
              <Image
                src="/img/group.svg"
                alt="group icon"
                width={58}
                height={53}
              />
            </Link>
          </li>
          <li className={styles.navItemMain}>
            <Link href="/">
              <Image
                src="/img/wallet.svg"
                alt="group icon"
                width={50}
                height={45}
              />
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/saveCalendar/">
              <Image
                src="/img/calendar.svg"
                alt="group icon"
                width={50}
                height={45}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
