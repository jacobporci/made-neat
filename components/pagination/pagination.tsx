import { useState } from "react";
import { QueryParams } from "../../pages";
import styles from "./pagination.module.css";

const DEFAULT_OPTIONS = [10, 20, 30, 40, 50];

type Props = {
  currPage: number;
  onPaginationChange: (params: QueryParams) => void;
  lastPage: number;
  hasNoArticles: boolean;
};

export default function Pagination({
  currPage,
  onPaginationChange,
  lastPage,
  hasNoArticles,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          onClick={() => onPaginationChange({ page: currPage - 1 })}
          disabled={hasNoArticles || currPage === 1}
        >
          {"<<"}
        </button>
        <div className={styles.currentPage}>{currPage}</div>
        <button
          onClick={() => onPaginationChange({ page: currPage + 1 })}
          disabled={hasNoArticles || currPage === lastPage}
        >
          {">>"}
        </button>
      </div>
      <label htmlFor="items-per-page">Items per page:&nbsp;</label>
      <select
        id="items-per-page"
        onChange={(e) =>
          onPaginationChange({ pageSize: parseInt(e.target.value) })
        }
      >
        {DEFAULT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
