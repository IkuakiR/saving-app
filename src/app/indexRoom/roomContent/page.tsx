"use client";

import styles from '@/styles/roomContent/page.module.scss';
import Navbar from "../../components/navbar";
import Image from 'next/image';
import Link from "next/link";

export default function RoomContent() {
    return (
        <>
            <div className={styles.roomContainer}>
                <div className={styles.imageWrapper}>
                    <Link href={'/indexRoom'}>
                        <Image src={'/img/roomContent.svg'} alt="Indonesia" width={402} height={754} className={styles.roomImg} />
                    </Link>
                </div>
                <div className={styles.navbar}><Navbar></Navbar></div>
            </div>
        </>
    );
}