import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/search";
import Table from "../components/table/table";
import styles from "../styles/Home.module.css";

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_SEARCH_KEY = "Apple";
const API_KEY = "745863a9d5df450e9a0e3831cfa4ac2c";

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

export type QueryParams = {
  page?: number;
  pageSize?: number;
  searchKey?: string;
};

type Props = {
  articles: Array<StrippedArticle>;
  totalResults: number;
};

const getArticles = async ({ page, pageSize, searchKey }: QueryParams) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?apiKey=${API_KEY}&searchIn=title&q=${searchKey}&sortBy=popularity&page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();
  console.log({ data });
  const { articles, totalResults } = data;
  const strippedOutArticles = articles
    ? articles.map(({ author, title, publishedAt }: Articles) => ({
        author,
        title,
        publishedAt,
      }))
    : [];

  return { articles: strippedOutArticles, totalResults };
};

const Home: NextPage<Props> = (props) => {
  const [articles, setArticles] = useState(props.articles);
  const [currPage, setCurrPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchKey, setSearchKey] = useState(DEFAULT_SEARCH_KEY);
  const [totalResults, setTotalResults] = useState(props.totalResults);

  const handlePaginationChange = async (params: QueryParams) => {
    const queryParams = {
      page: params.page || currPage,
      pageSize: params.pageSize || pageSize,
      searchKey: params.searchKey || searchKey,
    };

    const { articles, totalResults } = await getArticles(queryParams);

    setArticles(articles);
    setTotalResults(totalResults);

    setCurrPage(queryParams.page);
    setPageSize(queryParams.pageSize);
    setSearchKey(queryParams.searchKey);
  };

  useEffect(() => {
    if (!totalResults) setCurrPage(1);
  }, [totalResults]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Made Neat Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search onSearch={handlePaginationChange} searchKey={searchKey} />
        <Table items={articles} />
        <Pagination
          currPage={currPage}
          onPaginationChange={handlePaginationChange}
          lastPage={totalResults / pageSize}
          hasNoArticles={!totalResults}
        />
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const { articles, totalResults } = await getArticles({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    searchKey: DEFAULT_SEARCH_KEY,
  });

  return {
    props: {
      articles,
      totalResults,
    },
  };
};

export default Home;
