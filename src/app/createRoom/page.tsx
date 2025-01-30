"use client";

import React, { useState } from "react";
import { db } from "@/app/Firebase/firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";
import styles from '@/styles/createRoom/page.module.scss';

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [amountMoney, setAmountMoney] = useState<number | "">("");
  const [showPrice, setShowPrice] = useState("show");
  const [category, setCategory] = useState("trip");
  const [numberOfPeople, setNumberOfPeople] = useState("1");

  // Handle form submission
  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roomName || amountMoney === "") {
      alert("ルーム名と目標金額を入力してください");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        roomName,
        amountMoney,
        showPrice,
        category,
        numberOfPeople,
        createdAt: new Date()
      });
      alert("ルームが作成されました！");
      console.log("Room added with ID:", docRef.id);

      // Reset form
      setRoomName("");
      setAmountMoney("");
      setShowPrice("show");
      setCategory("trip");
      setNumberOfPeople("1");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className={styles.createRoomContainer}>
      <div className={styles.top}>
        <div className={styles.backButton}></div>
        <h1 className={styles.title}>グループ作成</h1>
      </div>

      <form onSubmit={handleCreateRoom}>
        <div className={styles.roomTop}>
          <div className={styles.groupIcon}></div>
          <input
            type="text"
            name="groupName"
            placeholder="ルーム名"
            className={styles.nameBar}
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>

        <div className={styles.setPrice}>
          <h2>目標金額を入力</h2>
          <p>¥
            <input
              type="number"
              name="price"
              value={amountMoney}
              onChange={(e) => setAmountMoney(Number(e.target.value))}
            />
          </p>
        </div>

        <div className={styles.choseShowPrice}>
          <h2>目標金額公開</h2>
          <select name="showPrice" value={showPrice} onChange={(e) => setShowPrice(e.target.value)}>
            <option value="show">公開する</option>
            <option value="hide">公開しない</option>
          </select>
        </div>

        <div className={styles.choseCategory}>
          <h2>分野を選ぶ</h2>
          <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="trip">旅行</option>
            <option value="hobby">趣味</option>
            <option value="shopping">買い物</option>
          </select>
        </div>

        <div className={styles.addMembers}>
          <h2>人数制限</h2>
          <select name="numberOfPeople" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)}>
            <option value="1">1人</option>
            <option value="2">2人</option>
            <option value="3">3人</option>
            <option value="4">4人</option>
          </select>
        </div>

        <div className={styles.confirmBtn}>
          <button type="submit" className={styles.done}>作成する</button>
        </div>
      </form>
    </div>
  );
}
