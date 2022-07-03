import type { NextPage } from "next";
import Head from "next/head";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/search";
import Table from "../components/table/table";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Made Neat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search />
        <Table />
        <Pagination />
      </main>
    </div>
  );
};

export default Home;
