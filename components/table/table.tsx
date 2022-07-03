import { useEffect, useState } from "react";
import { StrippedArticle } from "../../pages";

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
    <table>
      <thead>
        <tr>
          {items.length
            ? Object.keys(items[0]).map((item) => {
                const isSorted = sortKey === item;

                return (
                  <th key={item}>
                    <button
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
                      {`${item} ${
                        isSorted ? (sortOrder === "asc" ? " ▼" : " ▲") : ""
                      }`}
                    </button>
                  </th>
                );
              })
            : null}
        </tr>
      </thead>
      <tbody>
        {sortedItems?.map(({ author, title, publishedAt }) => {
          return (
            <tr key={publishedAt}>
              <td>{author}</td>
              <td>{title}</td>
              <td>{publishedAt}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
