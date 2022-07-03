import { Articles, QueryParams } from "./types";
import { API_KEY } from "./constants";

export const getArticles = async ({
  page,
  pageSize,
  searchKey,
}: QueryParams) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?apiKey=${API_KEY}&searchIn=title&q=${searchKey}&sortBy=popularity&page=${page}&pageSize=${pageSize}`
  );
  const { articles, totalResults } = await response.json();
  const strippedOutArticles = articles
    ? articles.map(({ author, title, publishedAt }: Articles) => ({
        author,
        title,
        publishedAt,
      }))
    : [];

  return { articles: strippedOutArticles, totalResults };
};
