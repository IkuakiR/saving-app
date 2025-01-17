"use client";

import React from "react";
import Link from "next/link";
import styles from "@/styles/appLogin/login/page.module.scss";

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
