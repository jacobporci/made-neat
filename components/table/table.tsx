import { StrippedArticle } from "../../pages";

type Props = {
  items: Array<StrippedArticle>;
};
export default function Table({ items }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <td>Author</td>
          <td>Title</td>
          <td>Date</td>
        </tr>
      </thead>
      <tbody>
        {items.map(({ author, title, publishedAt }) => {
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
