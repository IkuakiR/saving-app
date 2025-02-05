'use client'

import React from "react";
import styles from '@/styles/saveCalendar/page.module.scss';

export default function SaveCalender() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p className={styles.year}>2025年</p>
                    <p className={styles.month}>2月</p>
                </div>
            </div>
        </>
    );
}