import { useEffect, useState } from "react";
import { StrippedArticle } from "../../pages/types";
import styles from "./table.module.css";

type SortHeaderProps = {
  header: string;
  sorted: boolean;
  handleSorting: (header: string) => void;
};
type Props = {
  items: Array<StrippedArticle>;
};

export default function Table({ items }: Props) {
  const [sortedItems, setSortedItems] = useState(items);
  const [sortKey, setSortKey] = useState<keyof StrippedArticle | null>();
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setSortedItems(items);
    setSortKey(null);
    setSortOrder("asc");
  }, [items]);

  const handleSorting = (sortKey: keyof StrippedArticle, reverse: boolean) => {
    setSortKey(sortKey);
    let sortedItems = items.sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));

    if (reverse) {
      sortedItems.reverse();
      setSortOrder("desc");
    }

    setSortedItems(sortedItems);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          {items.length ? (
            Object.keys(items[0]).map((item) => {
              const isSorted = sortKey === item;

              return (
                <th key={item}>
                  <button
                    className={styles.headers}
                    onClick={() => {
                      handleSorting(
                        item as keyof StrippedArticle,
                        isSorted && sortOrder === "asc"
                      );
                      setSortOrder(
                        isSorted && sortOrder === "asc" ? "desc" : "asc"
                      );
                    }}
                    style={{
                      textTransform: "capitalize",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item}

                    <div className={styles.sorter}>
                      {" "}
                      {isSorted ? (sortOrder === "asc" ? " ▼" : " ▲") : ""}
                    </div>
                  </button>
                </th>
              );
            })
          ) : (
            <h2>No content</h2>
          )}
        </tr>
      </thead>
      <tbody>
        {sortedItems?.map(({ author, title, publishedAt }) => {
          const date = new Date(publishedAt).toLocaleString("en-AU", {
            timeZone: "Australia/Sydney",
            dateStyle: "medium",
            timeStyle: "short",
          });

          return (
            <tr className={styles.rows} key={publishedAt}>
              <td className={styles.cell}>{author || "Anonymous"}</td>
              <td className={styles.cell}>{title}</td>
              <td className={styles.cell}>{date}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
