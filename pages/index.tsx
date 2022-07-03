import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/search";
import Table from "../components/table/table";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SEARCH_KEY,
} from "../utils/constants";
import { getArticles } from "../utils/utils";
import { QueryParams, StrippedArticle } from "./types";

type Props = {
  articles: Array<StrippedArticle>;
  totalResults: number;
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
    <Layout>
      <>
        <Search onSearch={handlePaginationChange} searchKey={searchKey} />
        <Table items={articles} />
        <Pagination
          currPage={currPage}
          onPaginationChange={handlePaginationChange}
          lastPage={totalResults / pageSize}
          hasNoArticles={!totalResults}
        />
      </>
    </Layout>
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
