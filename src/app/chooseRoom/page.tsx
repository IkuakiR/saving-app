'use client'

import React from "react";
import styles from '@/styles/chooseRoom/page.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSaving } from '../contexts/SavingContext';
import Navbar from "../components/navbar";
import Image from 'next/image';

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
                    <div className={styles.roomCard} onClick={() => handleChooseRoom("インドネシア旅行")}>
                        <h2 className={styles.roomName}>インドネシア旅行</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>旅行</p>
                            <p>/</p>
                            <p className={styles.members}>3人</p>
                        </div>
                        <div className={styles.price}>
                            <p>35,000円</p>
                            <p>/</p>
                            <p>50,000円</p>
                        </div>
                        <Image src={'/img/indRoomImg.svg'} alt="Indonesia" width={150} height={75} className={styles.roomImg} />
                    </div>
                    <div className={styles.roomCard} onClick={() => handleChooseRoom("節約")}>
                        <h2 className={styles.roomName}>節約</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>生活</p>
                            <p>/</p>
                            <p className={styles.members}>5人</p>
                        </div>
                        <div className={styles.price}>
                            <p>15,000円</p>
                            <p>/</p>
                            <p>50,000円</p>
                        </div>
                        <Image src={'/img/pigRoomImg.svg'} alt="Indonesia" width={150} height={75} className={styles.roomImg} />
                    </div>
                    <div className={styles.roomCard} onClick={() => handleChooseRoom("ベンツ買おう")}>
                        <h2 className={styles.roomName}>ベンツ買おう</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>趣味</p>
                            <p>/</p>
                            <p className={styles.members}>10人</p>
                        </div>
                        <div className={styles.price}>
                            <p>50,000円</p>
                            <p>/</p>
                            <p>500,000円</p>
                        </div>
                        <Image src={'/img/benzRoomImg.svg'} alt="Indonesia" width={150} height={75} className={styles.roomImg} />
                    </div>
                    <div className={styles.roomCard} onClick={() => handleChooseRoom("PS5購入計画")}>
                        <h2 className={styles.roomName}>PS5購入計画</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>趣味</p>
                            <p>/</p>
                            <p className={styles.members}>4人</p>
                        </div>
                        <div className={styles.price}>
                            <p>7,000円</p>
                            <p>/</p>
                            <p>80,000円</p>
                        </div>
                        <Image src={'/img/gameRoomImg.svg'} alt="Indonesia" width={150} height={75} className={styles.roomImg} />
                    </div>
                    <div className={styles.roomCard} onClick={() => handleChooseRoom("PS5購入計画")}>
                        <h2 className={styles.roomName}>推し活グッズ</h2>
                        <div className={styles.description}>
                            <p className={styles.category}>趣味</p>
                            <p>/</p>
                            <p className={styles.members}>2人</p>
                        </div>
                        <div className={styles.price}>
                            <p>2,000円</p>
                            <p>/</p>
                            <p>30,000円</p>
                        </div>
                        <Image src={'/img/idolRoomImg.svg'} alt="Indonesia" width={150} height={75} className={styles.roomImg} />
                    </div>
                </div>
                <div className={styles.navbar}><Navbar></Navbar></div>
            </div>
        </>
    );
}
