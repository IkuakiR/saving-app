"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/appLogin/login/page.module.scss";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Firebase初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM要素の取得
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById(
    "loginForm"
  ) as HTMLFormElement | null;
  const emailInput = document.getElementById(
    "email"
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    "password"
  ) as HTMLInputElement | null;
  const messageElement = document.getElementById(
    "message"
  ) as HTMLParagraphElement | null;

  if (!loginForm || !emailInput || !passwordInput || !messageElement) {
    console.error("必要なHTML要素が見つかりません");
    return;
  }

  // フォーム送信イベント
  loginForm.addEventListener("submit", async (event: SubmitEvent) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      messageElement.textContent = `ログイン成功！ユーザーID: ${userCredential.user.uid}`;
    } catch (error: any) {
      console.error("ログインエラー:", error.message);
      messageElement.textContent = `ログイン失敗: ${error.message}`;
    }
  });
});

export default function Login() {
  return (
    <>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>おかえりなさい</h1>
        <form className={styles.loginWrap} id="loginForm">
          <p>メールアドレス</p>
          <input
            type="email"
            name="email"
            placeholder="sample@email.com"
            id="email"
          />
          <p>パスワード</p>
          <input
            type="password"
            name="password"
            placeholder="パスワード"
            id="password"
          />
          <button type="submit" className={styles.loginBtn}>
            ログイン
          </button>
        </form>
        <p id="message"></p>
        <p>
          <Link href="/appLogin/signup">
            アカウントをお持ちでない場合はこちら
          </Link>
        </p>
      </div>
    </>
  );
}
