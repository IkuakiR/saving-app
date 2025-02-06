'use client';

import React, { useState, useEffect } from "react";
import styles from '@/styles/saveCalendar/page.module.scss';
import Navbar from "../components/navbar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/Firebase/firebase";

interface Saving {
    id: string;
    amount: number;
    createdAt: Date;
    roomName: string;
}

export default function SaveCalender() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [savings, setSavings] = useState<Saving[]>([]);
    const [selectedSavings, setSelectedSavings] = useState<Saving[]>([]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const today = new Date();

    const firstDay = new Date(year, month - 1, 1);
    const startIndex = firstDay.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();

    const calendarDays: (number | string)[] = [];
    for (let i = 0; i < startIndex; i++) {
        calendarDays.push("");
    }
    for (let d = 1; d <= daysInMonth; d++) {
        calendarDays.push(d);
    }
    const rows = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
        rows.push(calendarDays.slice(i, i + 7));
    }
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

    const fetchSavings = async () => {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 1);
        const q = query(
            collection(db, "savings"),
            where("createdAt", ">=", startOfMonth),
            where("createdAt", "<", endOfMonth)
        );
        const snapshot = await getDocs(q);
        const data: Saving[] = snapshot.docs.map(doc => {
            const d = doc.data();
            const createdAt = d.createdAt && d.createdAt.toDate ? d.createdAt.toDate() : d.createdAt;
            return {
                id: doc.id,
                amount: d.amount,
                createdAt: createdAt,
                roomName: d.roomName,
            };
        });
        setSavings(data);
    };

    useEffect(() => {
        fetchSavings();
        setSelectedSavings([]);
    }, [year, month]);

    const handlePreviousMonth = () => {
        const prevMonth = new Date(year, currentDate.getMonth() - 1, 1);
        setCurrentDate(prevMonth);
    };
    const handleNextMonth = () => {
        const nextMonth = new Date(year, currentDate.getMonth() + 1, 1);
        setCurrentDate(nextMonth);
    };

    const handleDayClick = (day: number) => {
        const daySavings = savings.filter(s => {
            const d = s.createdAt.getDate();
            const m = s.createdAt.getMonth() + 1;
            const y = s.createdAt.getFullYear();
            return d === day && m === month && y === year;
        });
        setSelectedSavings(daySavings);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.year}>{year}年</p>
                <div className={styles.month}>
                    <span onClick={handlePreviousMonth} style={{ cursor: 'pointer' }}>&lt;</span>
                    <span style={{ margin: "0 10px" }}>{month}月</span>
                    <span onClick={handleNextMonth} style={{ cursor: 'pointer' }}>&gt;</span>
                </div>
                <div className={styles.monthTotal}>
                    今月の貯金額：{savings.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString()}円
                </div>
            </div>
            <div className={styles.calendarContainer}>
                <table className={styles.calendarTable}>
                    <thead className={styles.calendarHeader}>
                        <tr>
                            {weekdays.map((day, index) => (
                                <th key={index}>{day}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => {
                                    if (typeof cell === "number") {
                                        const hasSaving = savings.some(s => {
                                            const d = s.createdAt.getDate();
                                            const m = s.createdAt.getMonth() + 1;
                                            const y = s.createdAt.getFullYear();
                                            return d === cell && m === month && y === year;
                                        });
                                        const isToday =
                                            today.getFullYear() === year &&
                                            (today.getMonth() + 1) === month &&
                                            today.getDate() === cell;
                                        return (
                                            <td
                                                key={cellIndex}
                                                onClick={() => handleDayClick(cell)}
                                                style={{ cursor: hasSaving ? 'pointer' : 'default' }}
                                            >
                                                <div className={isToday ? styles.today : undefined}>
                                                    {cell}
                                                </div>
                                                {hasSaving && (
                                                    <span className={styles.savingDot}></span>
                                                )}
                                            </td>
                                        );
                                    } else {
                                        return <td key={cellIndex}></td>;
                                    }
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.savingDetail}>
                {selectedSavings.length > 0 &&
                    selectedSavings.map((saving) => (
                        <div key={saving.id} className={styles.savingRow}>
                            <div className={styles.addAmount}>+{saving.amount.toLocaleString()}円</div>
                            <div className={styles.chosenRoom}>{saving.roomName}</div>
                            <p>に貯金しました</p>
                        </div>
                    ))
                }
            </div>
            <div className={styles.navbar}>
                <Navbar />
            </div>
        </div>
    );
}
