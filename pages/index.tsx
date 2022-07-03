import type { NextPage } from "next";
import Head from "next/head";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/search";
import Table from "../components/table/table";
import styles from "../styles/Home.module.css";

type Articles = {
  source: Object;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type StrippedArticle = Pick<
  Articles,
  "author" | "title" | "publishedAt"
>;

type Props = {
  articles: Array<StrippedArticle>;
};

const Home: NextPage<Props> = ({ articles }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Made Neat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search />
        <Table items={articles} />
        <Pagination />
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const pageSize = 10;
  const reponse = await fetch(
    `https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&pageSize=${pageSize}&apiKey=bf84d7431fa646c8922231ab4935ad89`
  );
  const { articles } = await reponse.json();
  const strippedOutArticles = articles.map(
    ({ author, title, publishedAt }: Articles) => ({
      author,
      title,
      publishedAt,
    })
  );

  return { props: { articles: strippedOutArticles } };
};

export default Home;
