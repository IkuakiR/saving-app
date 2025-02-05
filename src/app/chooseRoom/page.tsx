'use client'

import React, { useState } from "react";
import styles from '@/styles/chooseRoom/page.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSaving } from '../contexts/SavingContext';
import Navbar from "../components/navbar";
import Image from 'next/image';
import { collection, getDocs, query, orderBy, DocumentData, where } from "firebase/firestore";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/app/Firebase/firebase";
import { useEffect } from "react";

interface Room {
    roomName: string;
    category: string;
    numberOfPeople: number;
    showPrice: number;
    currentAmount?: number;
}

export default function ChooseRoom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAmount, setRoomName } = useSaving();
    const [rooms, setRooms] = useState<Room[]>([]);

    const categoryMapping: { [key: string]: string } = {
        trip: "旅行",
        hobby: "趣味",
        shopping: "買い物",
        life: "生活",
    };

    const handleChooseRoom = async (roomName: string) => {
        const amount = searchParams.get('amount') || '';

        try {
            const roomQuery = query(collection(db, "rooms"), where("roomName", "==", roomName));
            const querySnapshot = await getDocs(roomQuery);

            if (querySnapshot.empty) {
                console.error("Room not found");
                alert("部屋が見つかりませんでした");
                return;
            }

            const roomDocRef = doc(db, "rooms", querySnapshot.docs[0].id);

            await updateDoc(roomDocRef, {
                currentAmount: increment(Number(amount)),
            });

            setAmount(amount);
            setRoomName(roomName);

            router.push('chooseRoom/savingDone');
        } catch (error) {
            console.error("Error updating currentAmount:", error);
        }
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsQuery = query(collection(db, "rooms"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(roomsQuery);
                const roomsData = querySnapshot.docs.map(
                    (doc: DocumentData) => doc.data() as Room
                );
                setRooms(roomsData);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <>
            <div className={styles.chooseRoomContainer}>
                <div className={styles.roomList}>
                    {/* 実際のデータベースから取得するように変更 */}
                    {rooms.map((room: Room, index: number) => (
                        <div
                            className={styles.roomCard}
                            key={index}
                            onClick={() => handleChooseRoom(room.roomName)}
                        >
                            <h2 className={styles.roomName}>{room.roomName}</h2>
                            <div className={styles.description}>
                                <p className={styles.category}>{categoryMapping[room.category]}</p>
                                <p>/</p>
                                <p className={styles.members}>{room.numberOfPeople}人</p>
                            </div>
                            <div className={styles.price}>
                                <p className={styles.currentAmount}>{room.currentAmount ? `${room.currentAmount.toLocaleString()}円` : "0円"}</p>
                                <p>/</p>
                                <p>{room.showPrice === "show" ? `${room.amountMoney?.toLocaleString()}円` : "非公開"}</p>
                            </div>
                            <Image
                                src={"/img/koreaRoomImg.svg"}
                                alt="Room Image"
                                width={150}
                                height={75}
                                className={styles.roomImg}
                            />
                        </div>
                    ))}
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
