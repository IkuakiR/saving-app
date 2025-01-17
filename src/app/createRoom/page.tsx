'use client'

import React from "react";
import styles from '@/styles/createRoom/page.module.scss';
// import Image from 'next/image';

export default function CreateRoom() {
  return (
    <>
      <div className={styles.createRoomContainer}>
        <div className={styles.top}>
          <div className={styles.backButton}></div>
          <h1 className={styles.title}>グループ作成</h1>
        </div>
        <div className={styles.roomTop}>
          <div className={styles.groupIcon}></div>
          <form className={styles.nameForm} action="#" method="post">
            <input type="text" name="groupName" placeholder="ルーム名" className={styles.nameBar} />
          </form>
        </div>

        <div className={styles.setPrice}>
          <h2>目標金額を入力</h2>
          <p>¥<input type="number" name="price" /></p>
        </div>

        <div className={styles.choseShowPrice}>
          <h2>目標金額公開</h2>
          <select name="showPrice" id="showPrice">
            <option value="show">公開する</option>
            <option value="hide">公開しない</option>
          </select>
        </div>

        <div className={styles.choseCategory}>
          <h2>分野を選ぶ</h2>
          <select name="category" id="category">
            <option value="trip">旅行</option>
            <option value="hobby">趣味</option>
            <option value="shopping">買い物</option>
          </select>
        </div>

        <div className={styles.addMembers}>
          <h2>人数制限</h2>
          <select name="numberOfPeople" id="numberOfPeople">
            <option value="1">1人</option>
            <option value="2">2人</option>
            <option value="3">3人</option>
            <option value="4">4人</option>
          </select>
        </div>


        <div className={styles.confirmBtn}><button className={styles.done}>作成する</button></div>
      </div>
    </>
  );
}
