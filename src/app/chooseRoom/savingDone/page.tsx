'use client'

import React from "react";
import styles from '@/styles/savingDone/page.module.scss';
import { useSaving } from '../../contexts/SavingContext';
import Link from "next/link";

export default function SavingDone() {
    const { amount, roomName } = useSaving();

    return (
        <div className={styles.savingDoneContainer}>
            <div className={styles.mainContainer}>
                <div className={styles.roomName}>
                    {roomName}に
                </div>
                <div className={styles.price}>
                    ￥{amount}
                </div>
                <div className={styles.chargeDone}>
                    <Link href={'/indexRoom'}><button className={styles.chargeDoneBtn}>チャージ完了</button></Link>
                </div>
            </div>
        </div>
    );
}