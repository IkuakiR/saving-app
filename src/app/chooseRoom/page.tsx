'use client'

import React from "react";
import styles from '@/styles/chooseRoom/page.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSaving } from '../contexts/SavingContext';
import Navbar from "../components/navbar";

// import { useState } from "react";

export default function ChooseRoom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAmount, setRoomName } = useSaving();

    const handleChooseRoom = (roomName: string) => {
        const amount = searchParams.get('amount') || '';
        setAmount(amount);
        setRoomName(roomName);
        router.push('chooseRoom/savingDone');
    };

    return (
        <>
            <div className={styles.chooseRoomContainer}>
                <div className={styles.roomList}>
                    <div className={styles.roomCard}>
                        <h2 className={styles.roomName}>インドネシア旅行</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>旅行</p>
                            <p>/</p>
                            <p className={styles.members}>3人</p>
                            <p>/</p>
                            <p className={styles.price}>50,000円</p>
                        </div>
                        <button onClick={() => handleChooseRoom("インドネシア旅行")}>選ぶ</button>
                    </div>
                    <div className={styles.roomCard}>
                        <h2 className={styles.roomName}>節約</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>生活</p>
                            <p>/</p>
                            <p className={styles.members}>5人</p>
                            <p>/</p>
                            <p className={styles.price}>非公開</p>
                        </div>
                        <button onClick={() => handleChooseRoom("節約")}>選ぶ</button>
                    </div>
                    <div className={styles.roomCard}>
                        <h2 className={styles.roomName}>ベンツ買おう</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>趣味</p>
                            <p>/</p>
                            <p className={styles.members}>10人</p>
                            <p>/</p>
                            <p className={styles.price}>非公開</p>
                        </div>
                        <button onClick={() => handleChooseRoom("ベンツ買おう")}>選ぶ</button>
                    </div>
                    <div className={styles.roomCard}>
                        <h2 className={styles.roomName}>PS5購入計画</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>趣味</p>
                            <p>/</p>
                            <p className={styles.members}>4人</p>
                            <p>/</p>
                            <p className={styles.price}>50,000円</p>
                        </div>
                        <button onClick={() => handleChooseRoom("PS5購入計画")}>選ぶ</button>
                    </div>
                </div>
            </div>
            <Navbar></Navbar>
        </>
    );
}
