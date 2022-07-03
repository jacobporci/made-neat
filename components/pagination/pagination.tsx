import { useState } from "react";

export default function Pagination() {
  const [currPage, setCurrPage] = useState(1);
  return (
    <div className="pagination">
      <button onClick={() => setCurrPage(currPage - 1)}>Prev</button>
      <div>{currPage}</div>
      <button onClick={() => setCurrPage(currPage + 1)}>Next</button>
    </div>
  );
}
