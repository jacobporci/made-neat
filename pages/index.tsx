import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/search";
import Table from "../components/table/table";
import styles from "../styles/Home.module.css";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;

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

type QueryParams = {
  page: number;
  pageSize?: number;
};

const getArticles = async ({
  page,
  pageSize = DEFAULT_PAGE_SIZE,
}: QueryParams) => {
  const reponse = await fetch(
    `https://newsapi.org/v2/everything?apiKey=bf84d7431fa646c8922231ab4935ad89&q=Apple&sortBy=popularity&page=${page}&pageSize=${pageSize}`
  );
  const { articles } = await reponse.json();
  const strippedOutArticles = articles.map(
    ({ author, title, publishedAt }: Articles) => ({
      author,
      title,
      publishedAt,
    })
  );

  return strippedOutArticles;
};

const Home: NextPage<Props> = (props) => {
  const [articles, setArticles] = useState(props.articles);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE);

  const handlePageChange = async (page: number) => {
    const articles = await getArticles({ page });
    setArticles(articles);
    setCurrPage(page);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Made Neat Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search />
        <Table items={articles} />
        <Pagination currPage={currPage} onPageChange={handlePageChange} />
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      articles: await getArticles({
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE,
      }),
    },
  };
};

export default Home;
