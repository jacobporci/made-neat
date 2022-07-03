import styles from "./layout.module.css";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Made Neat Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>
          Brought to you by{" "}
          <a href="https://newsapi.org/">https://newsapi.org/</a>
        </p>
      </footer>
    </div>
  );
}
