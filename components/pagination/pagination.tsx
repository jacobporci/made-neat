import { useState } from "react";
import styles from "./pagination.module.css";

const DEFAULT_OPTIONS = [10, 20, 30, 40, 50];

type Props = {
  currPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currPage, onPageChange }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button onClick={() => onPageChange(currPage - 1)}>{"<<"}</button>
        <div className={styles.currentPage}>{currPage}</div>
        <button onClick={() => onPageChange(currPage + 1)}>{">>"}</button>
      </div>
      <label htmlFor="items-per-page">Items per page:&nbsp;</label>
      <select id="items-per-page">
        {DEFAULT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
