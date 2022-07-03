import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/search";
import Table from "../components/table/table";
import styles from "../styles/Home.module.css";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_SEARCH_KEY = "Apple";
const API_KEY = "8171aba6f9fc48a29fada6fead638dce";

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
  searchKey: string;
};

const getArticles = async ({ page, pageSize, searchKey }: QueryParams) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?apiKey=${API_KEY}&searchIn=title&q=${searchKey}&sortBy=popularity&page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();
  console.log({ data });
  const { articles } = data;
  const strippedOutArticles = articles
    ? articles.map(({ author, title, publishedAt }: Articles) => ({
        author,
        title,
        publishedAt,
      }))
    : [];

  return strippedOutArticles;
};

const Home: NextPage<Props> = (props) => {
  const [articles, setArticles] = useState(props.articles);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchKey, setsearchKey] = useState(DEFAULT_SEARCH_KEY);

  const handlePageChange = async (page: number) => {
    const articles = await getArticles({ page, pageSize, searchKey });
    setArticles(articles);
    setCurrPage(page);
  };

  const handlePageSizeChange = async (pageSize: number) => {
    const articles = await getArticles({ page: currPage, pageSize, searchKey });
    setArticles(articles);
    setPageSize(pageSize);
  };

  const hanldeSearch = async (searchKey: string) => {
    console.log({ searchKey });
    const articles = await getArticles({ page: currPage, pageSize, searchKey });
    setArticles(articles);
    setPageSize(pageSize);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Made Neat Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search onSearch={hanldeSearch} searchKey={searchKey} />
        <Table items={articles} />
        <Pagination
          currPage={currPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
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
        searchKey: DEFAULT_SEARCH_KEY,
      }),
    },
  };
};

export default Home;
