"use client";

import React from "react";
import styles from '@/styles/savingPage/page.module.scss';
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import Navbar from './components/navbar';
import { db } from '../../Firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const [displayValue, setDisplayValue] = useState("");

  const handleKeyPress = (value: string) => {
    if (value === "←") {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "savings"), {
        amount: Number(displayValue),
        createdAt: new Date(),
        roomName: "", // roomNameは後で更新
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div className={styles.savingPageContainer}>
        <div className={styles.mainContainer}>
          <Image src={'/images/wallet.svg'} alt="Wallet" width={50} height={50} className={styles.walletImg} />
          <div className={styles.numHolder}>{displayValue}</div>
          <button className={styles.savingButton} onClick={handleSave}>
            <Link href={`/chooseRoom?amount=${displayValue}`}>貯金する</Link>
          </button>
        </div>
        <table className={styles.numberKeys}>
          <tbody>
            <tr>
              <td><button onClick={() => handleKeyPress("1")}>1</button></td>
              <td><button onClick={() => handleKeyPress("2")}>2</button></td>
              <td><button onClick={() => handleKeyPress("3")}>3</button></td>
            </tr>
            <tr>
              <td><button onClick={() => handleKeyPress("4")}>4</button></td>
              <td><button onClick={() => handleKeyPress("5")}>5</button></td>
              <td><button onClick={() => handleKeyPress("6")}>6</button></td>
            </tr>
            <tr>
              <td><button onClick={() => handleKeyPress("7")}>7</button></td>
              <td><button onClick={() => handleKeyPress("8")}>8</button></td>
              <td><button onClick={() => handleKeyPress("9")}>9</button></td>
            </tr>
            <tr>
              <td><button onClick={() => handleKeyPress("00")}>00</button></td>
              <td><button onClick={() => handleKeyPress("0")}>0</button></td>
              <td><button onClick={() => handleKeyPress("←")}>←</button></td>
            </tr>
          </tbody>
        </table>
        <Navbar></Navbar>
      </div>
    </>
  );
}
