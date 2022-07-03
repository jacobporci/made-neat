import { useState } from "react";

const DEFAULT_OPTIONS = [10, 20, 30, 40, 50];
export default function Pagination() {
  const [currPage, setCurrPage] = useState(1);
  return (
    <div className="pagination">
      <button onClick={() => setCurrPage(currPage - 1)}>Prev</button>
      <div>{currPage}</div>
      <button onClick={() => setCurrPage(currPage + 1)}>Next</button>
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
